'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            autoDisplay: boolean;
            layout?: number;
          },
          elementId: string
        ) => void;
      };
    };
  }
}

export const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    // 1. Initialize Google Translate Element silently in the background using Simple Inline layout
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,si,ta',
            autoDisplay: false,
            layout: (window.google.translate.TranslateElement as any).InlineLayout?.SIMPLE || 0,
          },
          'google_translate_element'
        );
      }
    };

    // 2. Hide any leftover banner frames without locking body scroll
    const suppressGoogleBanner = () => {
      if (document.body && document.body.style.top && document.body.style.top !== '0px') {
        document.body.style.setProperty('top', '0px', 'important');
      }

      const selectors = [
        '.goog-te-banner-frame',
        'iframe.goog-te-banner-frame',
        'iframe[id*=":1.container"]',
        '.VIpgJd-ZVi9I-OR9QNe-HandL',
        '.VIpgJd-yAWNEb-VIpgJd-fmcmS-sn54Q',
        '#goog-gt-tt',
        '.goog-te-balloon-frame',
      ];

      selectors.forEach((sel) => {
        const elements = document.querySelectorAll<HTMLElement>(sel);
        elements.forEach((el) => {
          el.style.setProperty('display', 'none', 'important');
          el.style.setProperty('visibility', 'hidden', 'important');
          el.style.setProperty('height', '0px', 'important');
          el.style.setProperty('position', 'absolute', 'important');
          el.style.setProperty('top', '-9999px', 'important');
        });
      });
    };

    suppressGoogleBanner();
    const observer = new MutationObserver(suppressGoogleBanner);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div id="google_translate_element" style={{ display: 'none' }} aria-hidden="true" />
      <Script
        id="google-translate-script"
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
};
