import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const i18nFilePath = path.join(__dirname, '..', 'lib', 'i18n.ts');

async function translateText(text, targetLang) {
  if (!text || typeof text !== 'string' || text.trim() === '') return text;
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data && data[0]) {
      return data[0].map(item => item[0]).join('');
    }
    return text;
  } catch (err) {
    console.warn(`Translation error for "${text}" (${targetLang}):`, err.message);
    return text;
  }
}

function parseSection(source, sectionName) {
  const regex = new RegExp(`\\b${sectionName}:\\s*\\{([\\s\\S]*?)\\n  \\},?`, 'm');
  const match = source.match(regex);
  if (!match) return { text: '', keys: new Map(), start: -1, end: -1 };

  const block = match[1];
  const keys = new Map();
  const lineRegex = /^\s*([a-zA-Z0-9_]+)\s*:\s*(['"`])([\s\S]*?)\2\s*,?/gm;
  let lineMatch;
  while ((lineMatch = lineRegex.exec(block)) !== null) {
    keys.set(lineMatch[1], lineMatch[3]);
  }

  return {
    rawBlock: block,
    keys,
    matchIndex: match.index,
    fullMatch: match[0],
  };
}

async function main() {
  console.log('🔄 Checking i18n translations in lib/i18n.ts...');
  let content = fs.readFileSync(i18nFilePath, 'utf8');

  const enSection = parseSection(content, 'en');
  const siSection = parseSection(content, 'si');
  const taSection = parseSection(content, 'ta');

  if (enSection.keys.size === 0) {
    console.error('❌ Could not parse English keys from lib/i18n.ts');
    process.exit(1);
  }

  console.log(`📋 Found ${enSection.keys.size} English keys.`);

  const missingSi = [];
  const missingTa = [];

  for (const [key, value] of enSection.keys.entries()) {
    if (!siSection.keys.has(key)) {
      missingSi.push({ key, value });
    }
    if (!taSection.keys.has(key)) {
      missingTa.push({ key, value });
    }
  }

  if (missingSi.length === 0 && missingTa.length === 0) {
    console.log('✅ All translations are fully up to date! (0 missing keys)');
    return;
  }

  console.log(`⚡ Translating ${missingSi.length} keys for Sinhala (si)...`);
  const siNewEntries = [];
  for (const item of missingSi) {
    const translated = await translateText(item.value, 'si');
    const safeTranslated = translated.replace(/'/g, "\\'");
    siNewEntries.push(`    ${item.key}: '${safeTranslated}',`);
    console.log(`   [si] ${item.key} -> ${translated}`);
  }

  console.log(`⚡ Translating ${missingTa.length} keys for Tamil (ta)...`);
  const taNewEntries = [];
  for (const item of missingTa) {
    const translated = await translateText(item.value, 'ta');
    const safeTranslated = translated.replace(/'/g, "\\'");
    taNewEntries.push(`    ${item.key}: '${safeTranslated}',`);
    console.log(`   [ta] ${item.key} -> ${translated}`);
  }

  // Append new keys into si and ta blocks
  if (siNewEntries.length > 0) {
    const siClosingRegex = /(\n  si: \{[\s\S]*?)(\n  \},)/;
    content = content.replace(siClosingRegex, (m, p1, p2) => {
      return `${p1}\n    // Auto-translated entries\n${siNewEntries.join('\n')}${p2}`;
    });
  }

  if (taNewEntries.length > 0) {
    const taClosingRegex = /(\n  ta: \{[\s\S]*?)(\n  \}\s*\n\};)/;
    content = content.replace(taClosingRegex, (m, p1, p2) => {
      return `${p1}\n    // Auto-translated entries\n${taNewEntries.join('\n')}${p2}`;
    });
  }

  fs.writeFileSync(i18nFilePath, content, 'utf8');
  console.log('🎉 Successfully updated lib/i18n.ts with automated translations!');
}

main().catch((err) => {
  console.error('Fatal error during auto-translation:', err);
  process.exit(1);
});
