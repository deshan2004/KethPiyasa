(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/MarketPriceTicker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MarketPriceTicker",
    ()=>MarketPriceTicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.mjs [app-client] (ecmascript) <export default as Building2>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const MarketPriceTicker = ()=>{
    _s();
    const { marketPrices, lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTranslation"])(lang);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-[#064e3b] text-white py-2 px-4 shadow-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto flex items-center gap-4 text-xs",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] bg-[#043e2f] px-2.5 py-1 rounded border border-emerald-700/60 whitespace-nowrap",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                            className: "w-3.5 h-3.5 text-emerald-300"
                        }, void 0, false, {
                            fileName: "[project]/components/MarketPriceTicker.tsx",
                            lineNumber: 17,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "NATIONAL MARKET PRICES"
                        }, void 0, false, {
                            fileName: "[project]/components/MarketPriceTicker.tsx",
                            lineNumber: 18,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/MarketPriceTicker.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-6 overflow-x-auto scrollbar-none py-0.5",
                    children: marketPrices.map((item)=>{
                        const cropNameTranslated = lang === 'si' ? item.cropNameSi : lang === 'ta' ? item.cropNameTa : item.cropName;
                        const isUp = item.change24h > 0;
                        const isDown = item.change24h < 0;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 bg-[#043e2f]/80 px-3 py-1 rounded border border-emerald-700/50 text-emerald-50 min-w-max",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold text-white",
                                    children: cropNameTranslated
                                }, void 0, false, {
                                    fileName: "[project]/components/MarketPriceTicker.tsx",
                                    lineNumber: 35,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-emerald-300/80 text-[10px]",
                                    children: [
                                        "(",
                                        item.centerName,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/MarketPriceTicker.tsx",
                                    lineNumber: 36,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-extrabold text-amber-300",
                                    children: [
                                        "LKR ",
                                        item.avgPriceLkr,
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[9px] font-normal text-emerald-200",
                                            children: [
                                                "/",
                                                item.unit
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/MarketPriceTicker.tsx",
                                            lineNumber: 38,
                                            columnNumber: 42
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/MarketPriceTicker.tsx",
                                    lineNumber: 37,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `text-[10px] font-bold px-1 rounded ${isUp ? 'text-emerald-300' : isDown ? 'text-rose-300' : 'text-slate-300'}`,
                                    children: item.change24h > 0 ? `+${item.change24h}%` : `${item.change24h}%`
                                }, void 0, false, {
                                    fileName: "[project]/components/MarketPriceTicker.tsx",
                                    lineNumber: 40,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, item.id, true, {
                            fileName: "[project]/components/MarketPriceTicker.tsx",
                            lineNumber: 31,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0));
                    })
                }, void 0, false, {
                    fileName: "[project]/components/MarketPriceTicker.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/MarketPriceTicker.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/MarketPriceTicker.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(MarketPriceTicker, "jR5Z/kGLRMyvGpAFlg/14abFuAo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"]
    ];
});
_c = MarketPriceTicker;
var _c;
__turbopack_context__.k.register(_c, "MarketPriceTicker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navbar",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sprout$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sprout$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sprout.mjs [app-client] (ecmascript) <export default as Sprout>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.mjs [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.mjs [app-client] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.mjs [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.mjs [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-check.mjs [app-client] (ecmascript) <export default as UserCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$in$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogIn$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-in.mjs [app-client] (ecmascript) <export default as LogIn>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.mjs [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.mjs [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/store.mjs [app-client] (ecmascript) <export default as Store>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-plus.mjs [app-client] (ecmascript) <export default as UserPlus>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
const Navbar = ()=>{
    _s();
    const { lang, setLang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const { user, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTranslation"])(lang);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const getPortalLinkForRole = ()=>{
        if (!user) return null;
        switch(user.role){
            case 'farmer':
                return {
                    href: '/farmer',
                    label: 'My Farmer Portal',
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sprout$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sprout$3e$__["Sprout"], {
                        className: "w-4 h-4 text-emerald-600"
                    }, void 0, false, {
                        fileName: "[project]/components/Navbar.tsx",
                        lineNumber: 39,
                        columnNumber: 68
                    }, ("TURBOPACK compile-time value", void 0))
                };
            case 'buyer':
                return {
                    href: '/buyer',
                    label: 'My Buyer Portal',
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                        className: "w-4 h-4 text-amber-600"
                    }, void 0, false, {
                        fileName: "[project]/components/Navbar.tsx",
                        lineNumber: 41,
                        columnNumber: 66
                    }, ("TURBOPACK compile-time value", void 0))
                };
            case 'logistics':
                return {
                    href: '/logistics',
                    label: 'Logistics Hub',
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                        className: "w-4 h-4 text-blue-600"
                    }, void 0, false, {
                        fileName: "[project]/components/Navbar.tsx",
                        lineNumber: 43,
                        columnNumber: 68
                    }, ("TURBOPACK compile-time value", void 0))
                };
            case 'admin':
                return {
                    href: '/admin',
                    label: 'System Admin Console',
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                        className: "w-4 h-4 text-indigo-600"
                    }, void 0, false, {
                        fileName: "[project]/components/Navbar.tsx",
                        lineNumber: 45,
                        columnNumber: 71
                    }, ("TURBOPACK compile-time value", void 0))
                };
            default:
                return null;
        }
    };
    const userPortal = getPortalLinkForRole();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-slate-900 text-slate-100 py-1.5 px-3 sm:px-8 text-xs",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto scrollbar-none",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center gap-1 font-semibold text-emerald-400 text-[11px] sm:text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Navbar.tsx",
                                            lineNumber: 60,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " Direct Farmer-to-Buyer B2B Platform"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden md:inline text-slate-700",
                                    children: "|"
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden md:inline text-slate-400 text-[11px]",
                                    children: "SE3106 Software Construction"
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Navbar.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 shrink-0 ml-auto",
                            children: [
                                user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: user.role === 'farmer' ? '/farmer' : user.role === 'buyer' ? '/buyer' : user.role === 'logistics' ? '/logistics' : '/admin',
                                            className: "flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700 text-[11px] transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__["UserCheck"], {
                                                    className: "w-3.5 h-3.5 text-emerald-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Navbar.tsx",
                                                    lineNumber: 76,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold",
                                                    children: user.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Navbar.tsx",
                                                    lineNumber: 77,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "bg-emerald-950 text-emerald-300 font-extrabold text-[9px] px-1.5 py-0.2 rounded-md uppercase tracking-wider",
                                                    children: user.role
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Navbar.tsx",
                                                    lineNumber: 78,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Navbar.tsx",
                                            lineNumber: 70,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                logout();
                                                router.push('/login');
                                            },
                                            className: "flex items-center gap-1 text-slate-400 hover:text-rose-400 text-[11px] font-semibold transition-colors px-1",
                                            title: "Logout",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                    className: "w-3.5 h-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Navbar.tsx",
                                                    lineNumber: 91,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "hidden sm:inline",
                                                    children: "Logout"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Navbar.tsx",
                                                    lineNumber: 92,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Navbar.tsx",
                                            lineNumber: 83,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 69,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/login",
                                            className: "flex items-center gap-1 text-slate-300 hover:text-white text-[11px] font-medium px-2 py-0.5 rounded-md hover:bg-slate-800 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$in$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogIn$3e$__["LogIn"], {
                                                    className: "w-3 h-3 text-emerald-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Navbar.tsx",
                                                    lineNumber: 101,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Login"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Navbar.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Navbar.tsx",
                                            lineNumber: 97,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/register",
                                            className: "flex items-center gap-1 text-emerald-300 hover:text-emerald-200 text-[11px] font-semibold bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-800 hover:bg-emerald-900 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                                                    className: "w-3 h-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Navbar.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Register"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Navbar.tsx",
                                                    lineNumber: 109,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Navbar.tsx",
                                            lineNumber: 104,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 96,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded-lg text-xs border border-slate-700 text-slate-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                            className: "w-3.5 h-3.5 text-emerald-400"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Navbar.tsx",
                                            lineNumber: 116,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: lang,
                                            onChange: (e)=>setLang(e.target.value),
                                            className: "bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "en",
                                                    className: "bg-slate-900 text-white",
                                                    children: "English"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Navbar.tsx",
                                                    lineNumber: 122,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "si",
                                                    className: "bg-slate-900 text-white",
                                                    children: "සිංහල"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Navbar.tsx",
                                                    lineNumber: 123,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "ta",
                                                    className: "bg-slate-900 text-white",
                                                    children: "தமிழ்"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Navbar.tsx",
                                                    lineNumber: 124,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Navbar.tsx",
                                            lineNumber: 117,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 115,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Navbar.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Navbar.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/Navbar.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-8 py-2.5 flex items-center justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "flex items-center gap-2.5 group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative p-0.5 rounded-full bg-gradient-to-tr from-amber-400 via-emerald-600 to-amber-300 shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/logo.png",
                                    alt: "KethPiyasa Logo",
                                    className: "w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover bg-[#042e23]"
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 136,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xl font-extrabold tracking-tight text-slate-900 font-sans leading-none",
                                        children: "kethpiyasa"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 143,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] sm:text-xs font-bold text-[#064e3b] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80 w-fit",
                                        children: "(කෙත්පියස)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 144,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Navbar.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "hidden lg:flex items-center gap-1 text-xs font-semibold",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: `flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${pathname === '/' ? 'bg-emerald-50 text-[#064e3b] font-bold border border-emerald-200/60 shadow-2xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__["Store"], {
                                        className: "w-4 h-4 text-emerald-600"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 158,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: t.navMarketplace
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 159,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            userPortal ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: userPortal.href,
                                className: `flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${pathname === userPortal.href ? 'bg-emerald-600 text-white font-bold shadow-sm' : 'text-emerald-800 bg-emerald-50/80 border border-emerald-200 hover:bg-emerald-100'}`,
                                children: [
                                    userPortal.icon,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: userPortal.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 172,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 163,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/login?role=farmer",
                                        className: `flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sprout$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sprout$3e$__["Sprout"], {
                                                className: "w-4 h-4 text-emerald-600"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 180,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: t.navFarmer
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 181,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 176,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/login?role=buyer",
                                        className: `flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                                className: "w-4 h-4 text-amber-600"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 187,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: t.navBuyer
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 188,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 183,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/login?role=logistics",
                                        className: `flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                                className: "w-4 h-4 text-blue-600"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 194,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: t.navLogistics
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 195,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 190,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 175,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Navbar.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 sm:gap-3",
                        children: [
                            user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: userPortal?.href || '/',
                                        className: "hidden sm:flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs hover:border-emerald-300 transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__["UserCheck"], {
                                                className: "w-3.5 h-3.5 text-[#064e3b]"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 209,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-left",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-slate-800 block text-[11px] leading-tight",
                                                        children: user.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Navbar.tsx",
                                                        lineNumber: 211,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[9px] text-[#064e3b] font-bold uppercase tracking-wider",
                                                        children: [
                                                            user.role,
                                                            " • Verified"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/Navbar.tsx",
                                                        lineNumber: 212,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 210,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 205,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            logout();
                                            router.push('/login');
                                        },
                                        className: "hidden sm:flex items-center gap-1 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 font-bold text-xs px-3 py-2 rounded-lg border border-slate-200 transition-all cursor-pointer",
                                        title: "Log Out",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                className: "w-3.5 h-3.5 text-rose-600"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 224,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Logout"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 225,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 216,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 204,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden sm:flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/login",
                                        className: "flex items-center gap-1.5 bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition-all active:scale-95",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$in$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogIn$3e$__["LogIn"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 234,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Login"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 235,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 230,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/register",
                                        className: "flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg shadow-sm transition-all active:scale-95",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 241,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Register"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 242,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 237,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 229,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setMobileMenuOpen(!mobileMenuOpen),
                                className: "lg:hidden p-2.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 focus:outline-none touch-manipulation active:bg-slate-200",
                                "aria-label": "Toggle Navigation Menu",
                                children: mobileMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-6 h-6 text-slate-800"
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 253,
                                    columnNumber: 31
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                    className: "w-6 h-6 text-slate-800"
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 253,
                                    columnNumber: 74
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Navbar.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/Navbar.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            mobileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-lg px-4 py-4 shadow-xl space-y-4 animate-in slide-in-from-top duration-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-1",
                        children: user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-9 h-9 rounded-full bg-[#064e3b] text-white flex items-center justify-center font-bold text-sm shadow-xs",
                                            children: user.name.charAt(0)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Navbar.tsx",
                                            lineNumber: 266,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-slate-900 block text-sm",
                                                    children: user.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Navbar.tsx",
                                                    lineNumber: 270,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-bold text-[#064e3b] uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-0.5",
                                                    children: [
                                                        user.role,
                                                        " • Verified"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/Navbar.tsx",
                                                    lineNumber: 271,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Navbar.tsx",
                                            lineNumber: 269,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 265,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        logout();
                                        setMobileMenuOpen(false);
                                        router.push('/login');
                                    },
                                    className: "flex items-center gap-1 text-xs font-bold text-rose-600 bg-white px-3 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 shadow-2xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Navbar.tsx",
                                            lineNumber: 285,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Logout"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Navbar.tsx",
                                            lineNumber: 286,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 277,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Navbar.tsx",
                            lineNumber: 264,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/login",
                                    onClick: ()=>setMobileMenuOpen(false),
                                    className: "flex items-center justify-center gap-2 bg-[#064e3b] text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$in$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogIn$3e$__["LogIn"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Navbar.tsx",
                                            lineNumber: 296,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Login"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Navbar.tsx",
                                            lineNumber: 297,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 291,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/register",
                                    onClick: ()=>setMobileMenuOpen(false),
                                    className: "flex items-center justify-center gap-2 bg-amber-600 text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Navbar.tsx",
                                            lineNumber: 304,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Register"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Navbar.tsx",
                                            lineNumber: 305,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Navbar.tsx",
                                    lineNumber: 299,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Navbar.tsx",
                            lineNumber: 290,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/Navbar.tsx",
                        lineNumber: 262,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2",
                                children: "Navigation Portals"
                            }, void 0, false, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 313,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                onClick: ()=>setMobileMenuOpen(false),
                                className: `flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all ${pathname === '/' ? 'bg-[#064e3b] text-white shadow-md font-bold' : 'text-slate-700 hover:bg-slate-100 active:bg-slate-200'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `p-1.5 rounded-lg ${pathname === '/' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__["Store"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Navbar.tsx",
                                                    lineNumber: 326,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 325,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: t.navMarketplace
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 328,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 324,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        className: `w-4 h-4 ${pathname === '/' ? 'text-white' : 'text-slate-400'}`
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 330,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 315,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            userPortal ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: userPortal.href,
                                onClick: ()=>setMobileMenuOpen(false),
                                className: `flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all ${pathname === userPortal.href ? 'bg-[#064e3b] text-white shadow-md font-bold' : 'text-emerald-900 bg-emerald-50 border border-emerald-200'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `p-1.5 rounded-lg ${pathname === userPortal.href ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'}`,
                                                children: userPortal.icon
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 344,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: userPortal.label
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 347,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 343,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        className: `w-4 h-4 ${pathname === userPortal.href ? 'text-white' : 'text-slate-400'}`
                                    }, void 0, false, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 349,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 334,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/login?role=farmer",
                                        onClick: ()=>setMobileMenuOpen(false),
                                        className: "flex items-center justify-between p-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-1.5 rounded-lg bg-emerald-50 text-emerald-700",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sprout$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sprout$3e$__["Sprout"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Navbar.tsx",
                                                            lineNumber: 360,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Navbar.tsx",
                                                        lineNumber: 359,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: t.navFarmer
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Navbar.tsx",
                                                        lineNumber: 362,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 358,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                className: "w-4 h-4 text-slate-400"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 364,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 353,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/login?role=buyer",
                                        onClick: ()=>setMobileMenuOpen(false),
                                        className: "flex items-center justify-between p-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-1.5 rounded-lg bg-amber-50 text-amber-700",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Navbar.tsx",
                                                            lineNumber: 374,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Navbar.tsx",
                                                        lineNumber: 373,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: t.navBuyer
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Navbar.tsx",
                                                        lineNumber: 376,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 372,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                className: "w-4 h-4 text-slate-400"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 378,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 367,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/login?role=logistics",
                                        onClick: ()=>setMobileMenuOpen(false),
                                        className: "flex items-center justify-between p-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-1.5 rounded-lg bg-blue-50 text-blue-700",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Navbar.tsx",
                                                            lineNumber: 388,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Navbar.tsx",
                                                        lineNumber: 387,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: t.navLogistics
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Navbar.tsx",
                                                        lineNumber: 390,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 386,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                className: "w-4 h-4 text-slate-400"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Navbar.tsx",
                                                lineNumber: 392,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Navbar.tsx",
                                        lineNumber: 381,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Navbar.tsx",
                                lineNumber: 352,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Navbar.tsx",
                        lineNumber: 312,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/Navbar.tsx",
                lineNumber: 260,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/Navbar.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Navbar, "PlyPbuisnzBPfwf7jPwlJEFyWw8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/auth.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "defaultProfiles",
    ()=>defaultProfiles,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const defaultProfiles = {
    farmer: {
        id: 'usr-farmer-01',
        name: 'Bandara Organic Farms',
        role: 'farmer',
        nicOrBrn: '781920394V',
        phone: '+94 77 123 4567',
        district: 'Nuwara Eliya',
        bankAccount: {
            bankName: 'Commercial Bank of Ceylon',
            accountNumber: '8001928374',
            branchName: 'Nuwara Eliya Branch'
        },
        verified: true
    },
    buyer: {
        id: 'usr-buyer-01',
        name: 'Keells Agri Procurement',
        role: 'buyer',
        nicOrBrn: 'BRN-2024-98124',
        phone: '+94 11 234 5678',
        district: 'Colombo',
        bankAccount: {
            bankName: 'Hatton National Bank',
            accountNumber: '1002938475',
            branchName: 'Head Office Colombo'
        },
        verified: true
    },
    logistics: {
        id: 'usr-log-01',
        name: 'Lanka Logistics Express',
        role: 'logistics',
        nicOrBrn: 'BRN-2022-44120',
        phone: '+94 71 444 5566',
        district: 'Colombo',
        bankAccount: {
            bankName: 'Sampath Bank PLC',
            accountNumber: '0092817263',
            branchName: 'Welisara Hub Branch'
        },
        verified: true
    },
    admin: {
        id: 'usr-admin-01',
        name: 'Dambulla Agri Governance',
        role: 'admin',
        nicOrBrn: 'GOV-SL-89201',
        phone: '+94 66 222 3344',
        district: 'Dambulla',
        bankAccount: {
            bankName: 'Central Bank of Sri Lanka',
            accountNumber: '0000111222',
            branchName: 'Colombo HQ'
        },
        verified: true
    }
};
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AuthProvider = ({ children })=>{
    _s();
    const { setRole } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultProfiles.farmer);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            try {
                const savedAuth = localStorage.getItem('kp_auth_user');
                if (savedAuth) {
                    const parsed = JSON.parse(savedAuth);
                    setUser(parsed);
                    setRole(parsed.role);
                } else {
                    // Default initial session to farmer
                    setUser(defaultProfiles.farmer);
                    setRole('farmer');
                }
            } catch  {
                setUser(defaultProfiles.farmer);
            }
        }
    }["AuthProvider.useEffect"], [
        setRole
    ]);
    const login = (emailOrPhone, selectedRole)=>{
        const profile = defaultProfiles[selectedRole] || {
            id: `usr-${Date.now()}`,
            name: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Sri Lanka Registered User',
            role: selectedRole,
            nicOrBrn: '891029384V',
            phone: emailOrPhone,
            district: 'Colombo',
            bankAccount: {
                bankName: 'Bank of Ceylon',
                accountNumber: '77281923',
                branchName: 'Main'
            },
            verified: true
        };
        setUser(profile);
        setRole(selectedRole);
        try {
            localStorage.setItem('kp_auth_user', JSON.stringify(profile));
        } catch  {
        // ignore
        }
    };
    const register = (profileData)=>{
        // Prevent registering as admin
        const safeRole = profileData.role === 'admin' ? 'farmer' : profileData.role;
        const newProfile = {
            ...profileData,
            role: safeRole,
            id: `usr-${Date.now()}`,
            verified: true
        };
        setUser(newProfile);
        setRole(safeRole);
        try {
            localStorage.setItem('kp_auth_user', JSON.stringify(newProfile));
        } catch  {
        // ignore
        }
    };
    const logout = ()=>{
        setUser(null);
        try {
            localStorage.removeItem('kp_auth_user');
        } catch  {
        // ignore
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            isAuthenticated: !!user,
            login,
            register,
            logout
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/auth.tsx",
        lineNumber: 148,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AuthProvider, "ulZD4m+66NCOOnqNKAKFebaMpjg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"]
    ];
});
_c = AuthProvider;
const useAuth = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/i18n.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getTranslation",
    ()=>getTranslation,
    "i18n",
    ()=>i18n
]);
const i18n = {
    en: {
        // Brand & Header
        brandName: 'KethPiyasa',
        subBrand: 'කෙත්පියස',
        tagline: 'Direct Farmer-to-Buyer B2B Agricultural Marketplace Platform',
        roleLabel: 'Active View:',
        roleFarmer: 'Farmer Portal',
        roleBuyer: 'Buyer Portal',
        roleLogistics: 'Logistics Partner',
        roleAdmin: 'Administrator',
        navMarketplace: 'Marketplace',
        navFarmer: 'Farmer Hub',
        navBuyer: 'Procurement',
        navLogistics: 'Logistics',
        navAdmin: 'Governance',
        navContract: 'Contracts & Escrow',
        // Ticker & Market Prices
        livePrices: 'National Economic Center Daily Baseline Prices:',
        centerDambulla: 'Dambulla Central Market',
        centerPettah: 'Pettah Wholesale Center',
        centerKeppetipola: 'Keppetipola Center',
        centerMeegoda: 'Meegoda Economic Center',
        perKg: '/Kg',
        // Landing Page
        heroTitle: 'Direct Farmer-to-Buyer B2B Marketplace',
        heroSubtitle: 'Eliminate 3-5 intermediary tiers, book advance harvests, trade with escrow security, and lower Sri Lanka post-harvest losses.',
        enterMarketplace: 'Enter Marketplace',
        postHarvest: 'List Produce / Pre-Harvest',
        statVerifiedFarmers: '5,000+ Verified Farmers',
        statEscrowVolume: 'LKR 145M+ Escrow Secured',
        statWasteSaved: '32% Waste Reduction',
        feature1Title: 'Intermediary-Free Trade',
        feature1Desc: 'Direct connections between commercial buyers & smallholder farmers, ensuring baseline farm-gate prices cover production costs.',
        feature2Title: 'Escrow Payment Security',
        feature2Desc: 'Automated escrow accounts holding buyer deposits, releasing funds to farmers upon delivery verification.',
        feature3Title: 'Advanced Harvest Booking',
        feature3Desc: 'Secure forward contracts for pre-harvest crops 2–6 weeks ahead, locking in supply and fair prices.',
        // Farmer Portal
        farmerTitle: 'Farmer Produce & Sales Dashboard',
        farmerSubtitle: 'Manage crop listings, receive buyer price quotations, counter-offer, and track direct bank payouts.',
        totalRevenue: 'Total Finalized Sales',
        activeBids: 'Active Bids & Offers',
        upcomingHarvest: 'Upcoming Harvest Yield',
        pendingPayouts: 'Pending Escrow Release',
        createNewListing: 'Add New Produce Listing',
        listingsTab: 'Current Stock & Pre-Harvest',
        offersInboxTab: 'Negotiation Offers Inbox',
        bankPayoutsTab: 'Bank Payouts & Orders',
        // Listing Modal Form
        modalListingTitle: 'Create New Produce Listing',
        cropType: 'Crop Variety',
        gradeLabel: 'Quality Grade',
        gradeA: 'Grade A (Premium Export/Supermarket Quality)',
        gradeB: 'Grade B (Standard Commercial Grade)',
        gradeC: 'Grade C (Processing & Canning Grade)',
        quantityKg: 'Available Quantity (Kg)',
        pricePerKg: 'Baseline Price per Kg (LKR)',
        harvestDate: 'Harvest / Ready Date',
        locationDistrict: 'Farm District Location',
        locationHub: 'Nearest Economic Center Hub',
        isPreHarvest: 'Mark as Pre-Harvest (Advance Booking Forward Contract)',
        organicCert: 'Certified Organic / Good Agricultural Practice (GAP)',
        moistureContent: 'Moisture / Freshness Level',
        minOrderQty: 'Minimum Order Quantity (Kg)',
        cropDescription: 'Produce Notes & Field Description',
        submitListing: 'Publish Produce Listing',
        // Buyer Portal
        buyerTitle: 'Commercial Buyer Procurement Engine',
        buyerSubtitle: 'Search bulk crops, verify quality grades, request custom price quotations, and place advance bookings.',
        searchPlaceholder: 'Search Leeks, Carrots, Samba Paddy, Tomatoes, Red Onions...',
        filterAllDistricts: 'All Districts',
        filterAllGrades: 'All Grades',
        filterPreHarvestOnly: 'Pre-Harvest Only',
        filterImmediateStock: 'Ready Stock Only',
        districtMapTitle: 'Sri Lanka Produce Origin & Logistics Map',
        requestQuote: 'Make Price Offer / Quote',
        bookAdvance: 'Book Advance Contract',
        viewDetails: 'View Crop Details',
        inEscrow: 'Deposited in Escrow',
        // Bidding & Negotiation Engine
        negotiateTitle: 'B2B Price Quote & Counter-Offer Engine',
        targetQty: 'Requested Volume (Kg)',
        offeredPrice: 'Offered Price per Kg (LKR)',
        proposedDelivery: 'Requested Delivery Window',
        negotiationHistory: 'Negotiation Activity Timeline',
        sendCounterOffer: 'Send Counter-Offer',
        acceptOffer: 'Accept Offer & Generate Contract',
        rejectOffer: 'Decline Offer',
        contractGenerated: 'Forward Contract Created! Proceeding to Escrow Payment.',
        // Escrow & Invoice
        escrowCheckoutTitle: 'Secure Escrow Payment Deposit',
        invoiceNumber: 'Tax Invoice Number',
        produceAmount: 'Produce Total',
        escrowFee: 'Platform Escrow Fee (1.5%)',
        transportFee: 'Estimated Transport Fee',
        totalPayable: 'Total Payable to Escrow',
        confirmDeposit: 'Deposit Funds to Escrow Account',
        invoiceDownloaded: 'Invoice Generated with QR Code Verification',
        // Logistics Portal
        logisticsTitle: 'Logistics Fleet & Dispatch Management',
        logisticsSubtitle: 'View available bulk transport jobs, track haulage routes across Sri Lanka, and sign digital delivery proofs.',
        availableJobs: 'Available Transport Requests',
        activeShipments: 'Live Deliveries in Transit',
        acceptJob: 'Accept Freight Job',
        routeMapTitle: 'Live Dispatch Route Checkpoint Tracker',
        scanQrDelivery: 'Verify Delivery (QR / Signature)',
        // Admin Governance Portal
        adminTitle: 'Platform Governance & Moderation Portal',
        adminSubtitle: 'Verify identity records, monitor escrow transactions, manage quality disputes, and set daily baseline market prices.',
        verificationsTab: 'Identity & NIC Verifications',
        escrowLedgerTab: 'Escrow Account Balances & Release',
        disputesTab: 'Quality & Transport Disputes',
        marketPricesTab: 'National Economic Center Baseline Prices',
        verifyUser: 'Approve Verification',
        releaseEscrow: 'Release Funds to Seller',
        resolveDispute: 'Execute Dispute Decision',
        // General Actions & Status
        statusActive: 'Active Listing',
        statusNegotiating: 'Under Negotiation',
        statusContracted: 'Contract Locked',
        statusSold: 'Completed & Paid',
        statusHolding: 'Holding in Escrow',
        statusInTransit: 'In Transit',
        statusDelivered: 'Delivered & Verified',
        close: 'Close',
        save: 'Save Changes',
        cancel: 'Cancel'
    },
    si: {
        // Brand & Header
        brandName: 'KethPiyasa',
        subBrand: 'කෙත්පියස',
        tagline: 'ගොවියාගෙන් සෘජුවම වෙළෙන්දාට කෘෂිකාර්මික B2B වෙළඳපොළ',
        roleLabel: 'වර්තමාන දර්ශනය:',
        roleFarmer: 'ගොවි ද්වාරය',
        roleBuyer: 'මිලදී ගැනීමේ ද්වාරය',
        roleLogistics: 'ප්‍රවාහන පාර්ශවකරු',
        roleAdmin: 'පද්ධති පරිපාලක',
        navMarketplace: 'වෙළඳපොළ',
        navFarmer: 'ගොවි මධ්‍යස්ථානය',
        navBuyer: 'මිලදී ගැනීම්',
        navLogistics: 'ප්‍රවාහනය',
        navAdmin: 'පරිපාලනය',
        navContract: 'ගිවිසුම් සහ එස්ක්‍රෝ',
        // Ticker & Market Prices
        livePrices: 'ජාතික ආර්ථික මධ්‍යස්ථාන දෛනික තොග මිල ගණන්:',
        centerDambulla: 'දඹුල්ල මධ්‍යම වෙළඳපොළ',
        centerPettah: 'පිටකොටුව තොග මධ්‍යස්ථානය',
        centerKeppetipola: 'කැප්පෙටිපොළ ආර්ථික මධ්‍යස්ථානය',
        centerMeegoda: 'මීගොඩ ආර්ථික මධ්‍යස්ථානය',
        perKg: '/කිලෝග්‍රෑම්',
        // Landing Page
        heroTitle: 'ගොවියාගෙන් සෘජුවම වෙළෙන්දාට B2B වෙළඳපොළ',
        heroSubtitle: 'මැදිහත්කරුවන් 3-5 දෙනෙකු ඉවත් කර, අස්වැන්නට පෙර ඇණවුම් කර, එස්ක්‍රෝ ආරක්ෂාව ඇතිව කෘෂිකාර්මික අපතේ යාම අවම කරන්න.',
        enterMarketplace: 'වෙළඳපොළට පිවිසෙන්න',
        postHarvest: 'අස්වැන්න ලැයිස්තුගත කරන්න',
        statVerifiedFarmers: '5,000+ තහවුරු කළ ගොවීන්',
        statEscrowVolume: 'රු. මිලියන 145+ එස්ක්‍රෝ ආරක්ෂිතයි',
        statWasteSaved: '32% අපතේ යාම අඩුවීම',
        feature1Title: 'මැදිහත්කරුවන්ගෙන් තොර වෙළඳාම',
        feature1Desc: 'ගොවියා සහ වාණිජ මිලදී ගන්නා අතර සෘජු සබඳතාවය තුළින් නිවැරදි සාධාරණ මිලක් ලබා ගැනීම.',
        feature2Title: 'එස්ක්‍රෝ ගෙවීම් ආරක්ෂාව',
        feature2Desc: 'භාණ්ඩ ලැබී පරීක්ෂා කිරීමෙන් පසුව පමණක් ගොවියාගේ ගිණුමට මුදල් නිදහස් කරන එස්ක්‍රෝ ක්‍රමය.',
        feature3Title: 'පූර්ව අස්වැන්න වෙන්කර ගැනීම',
        feature3Desc: 'සති 2-6 කට පෙර අස්වැන්න සාධාරණ මිලකට අත්පිටින් වෙන් කරගැනීමේ පූර්ව ගිවිසුම්.',
        // Farmer Portal
        farmerTitle: 'ගොවි අස්වැන්න සහ අලෙවි පුවරුව',
        farmerSubtitle: 'ඔබේ අස්වැන්න ලැයිස්තුගත කරන්න, මිල ගණන් සාකච්ඡා කරන්න, සහ සෘජු බැංකු ගෙවීම් ලබාගන්න.',
        totalRevenue: 'මුළු අවසන් අලෙවිය',
        activeBids: 'සක්‍රිය මිල ගණන් යෝජනා',
        upcomingHarvest: 'ඉදිරි අස්වැන්න ප්‍රමාණය',
        pendingPayouts: 'ලැබීමට ඇති එස්ක්‍රෝ මුදල්',
        createNewListing: 'නව අස්වැන්නක් එක් කරන්න',
        listingsTab: 'වර්තමාන තොග සහ ඉදිරි අස්වැන්න',
        offersInboxTab: 'මිල සාකච්ඡා යෝජනා',
        bankPayoutsTab: 'බැංකු ගෙවීම් සහ ඇණවුම්',
        // Listing Modal Form
        modalListingTitle: 'නව අස්වැන්න ලැයිස්තුගත කිරීම',
        cropType: 'බෝග වර්ගය',
        gradeLabel: 'තත්ත්ව ශ්‍රේණිය',
        gradeA: 'ශ්‍රේණිය A (සුපිරි අපනයන / සුපර්මාර්කට් තත්ත්වය)',
        gradeB: 'ශ්‍රේණිය B (සාමාන්‍ය වාණිජ තත්ත්වය)',
        gradeC: 'ශ්‍රේණිය C (කර්මාන්ත / කෑන් නිෂ්පාදන)',
        quantityKg: 'පවතින ප්‍රමාණය (කිලෝග්‍රෑම්)',
        pricePerKg: 'කිලෝග්‍රෑම් එකක පදනම් මිල (රු.)',
        harvestDate: 'අස්වැන්න නෙළන දිනය',
        locationDistrict: 'ගොවිපල පිහිටි දිස්ත්‍රික්කය',
        locationHub: 'ආසන්නතම ආර්ථික මධ්‍යස්ථානය',
        isPreHarvest: 'පූර්ව අස්වැන්නක් ලෙස ලකුණු කරන්න (Forward Contract)',
        organicCert: 'කාබනික / GAP සහතික ලත් අස්වැන්න',
        moistureContent: 'තෙතමනය / تازගතිය',
        minOrderQty: 'අවම ඇණවුම් ප්‍රමාණය (කිලෝග්‍රෑම්)',
        cropDescription: 'බෝගය පිළිබඳ විස්තර',
        submitListing: 'ලැයිස්තුගත කිරීම ප්‍රකාශයට පත් කරන්න',
        // Buyer Portal
        buyerTitle: 'වාණිජ මිලදී ගැනීමේ පද්ධතිය',
        buyerSubtitle: 'තොග බෝග සොයන්න, ශ්‍රේණි පරීක්ෂා කරන්න, සහ සෘජු මිල ගණන් සාකච්ඡා කරන්න.',
        searchPlaceholder: 'ලීක්ස්, කැරට්, සම්බා වී, තක්කාලි, රතු ලූණු සොයන්න...',
        filterAllDistricts: 'සියලුම දිස්ත්‍රික්ක',
        filterAllGrades: 'සියලුම ශ්‍රේණි',
        filterPreHarvestOnly: 'පූර්ව අස්වැන්න පමණි',
        filterImmediateStock: 'වර්තමාන තොග පමණි',
        districtMapTitle: 'ශ්‍රී ලංකා කෘෂි සහ ප්‍රවාහන සිතියම',
        requestQuote: 'මිල ගණන් ඉදිරිපත් කරන්න',
        bookAdvance: 'පූර්ව ගිවිසුම වෙන් කරන්න',
        viewDetails: 'විස්තර බලන්න',
        inEscrow: 'එස්ක්‍රෝ හි තැන්පත් කර ඇත',
        // Bidding & Negotiation Engine
        negotiateTitle: 'මිල සාකච්ඡා කිරීමේ පද්ධතිය',
        targetQty: 'අවශ්‍ය ප්‍රමාණය (කිලෝග්‍රෑම්)',
        offeredPrice: 'ඉදිරිපත් කරන මිල/කිලෝ (රු.)',
        proposedDelivery: 'අපේක්ෂිත ලබාදීමේ දිනය',
        negotiationHistory: 'සාකච්ඡා කාලරාමුව',
        sendCounterOffer: 'ප්‍රති-යෝජනාවක් යවන්න',
        acceptOffer: 'යෝජනාව පිළිගෙන ගිවිසුම සාදන්න',
        rejectOffer: 'යෝජනාව ප්‍රතික්ෂේප කරන්න',
        contractGenerated: 'ගිවිසුම සාදන ලදී! එස්ක්‍රෝ ගෙවීමට පිවිසෙන්න.',
        // Escrow & Invoice
        escrowCheckoutTitle: 'එස්ක්‍රෝ ආරක්ෂිත තැන්පතුව',
        invoiceNumber: 'බදු ඉන්වොයිස් අංකය',
        produceAmount: 'අස්වැන්න මුළු වටිනාකම',
        escrowFee: 'එස්ක්‍රෝ සේවා ගාස්තුව (1.5%)',
        transportFee: 'ප්‍රවාහන ගාස්තුව',
        totalPayable: 'එස්ක්‍රෝ ගිණුමට ගෙවිය යුතු මුළු මුදල',
        confirmDeposit: 'මුදල් එස්ක්‍රෝ ගිණුමට තැන්පත් කරන්න',
        invoiceDownloaded: 'QR කේතය සහිත ඉන්වොයිසිය සාදන ලදී',
        // Logistics Portal
        logisticsTitle: 'ප්‍රවාහන සහ නිකුත් කිරීම් කළමනාකරණය',
        logisticsSubtitle: 'පවතින ප්‍රවාහන ඇණවුම් බලා, මාර්ග සිතියම ඔස්සේ බෙදාහැරීම තහවුරු කරන්න.',
        availableJobs: 'පවතින ප්‍රවාහන ඇණවුම්',
        activeShipments: 'ගමනේ යෙදෙන ප්‍රවාහන',
        acceptJob: 'ප්‍රවාහන භාරගන්න',
        routeMapTitle: 'සජීවී ප්‍රවාහන මාර්ග සිතියම',
        scanQrDelivery: 'බාරදීම තහවුරු කරන්න (QR / අත්සන)',
        // Admin Governance Portal
        adminTitle: 'පද්ධති පරිපාලන හා මධ්‍යස්ථතා පුවරුව',
        adminSubtitle: 'ජාතික හැඳුනුම්පත් තහවුරු කරන්න, එස්ක්‍රෝ මුදල් පාලනය කරන්න සහ ගැටලු විසඳන්න.',
        verificationsTab: 'ගොවි සහ ව්‍යාපාර තහවුරු කිරීම්',
        escrowLedgerTab: 'එස්ක්‍රෝ ගිණුම් සහ මුදල් නිදහස් කිරීම',
        disputesTab: 'තත්ත්ව සහ ප්‍රවාහන ආරවුල්',
        marketPricesTab: 'ජාතික ආර්ථික මධ්‍යස්ථාන මිල ගණන්',
        verifyUser: 'තහවුරු කිරීම අනුමත කරන්න',
        releaseEscrow: 'ගොවියාට මුදල් නිදහස් කරන්න',
        resolveDispute: 'ආරවුල විසඳන්න',
        // General Actions & Status
        statusActive: 'සක්‍රිය අස්වැන්න',
        statusNegotiating: 'සාකච්ඡා මට්ටමේ',
        statusContracted: 'ගිවිසුම සාදන ලදී',
        statusSold: 'විකුණා අවසන්',
        statusHolding: 'එස්ක්‍රෝ හි රඳවා ඇත',
        statusInTransit: 'ප්‍රවාහනයේ යෙදේ',
        statusDelivered: 'ලබා දී තහවුරු කරන ලදී',
        close: 'වහන්න',
        save: 'සුරකින්න',
        cancel: 'අවලංගු කරන්න'
    },
    ta: {
        // Brand & Header
        brandName: 'KethPiyasa',
        subBrand: 'கெத்பியச',
        tagline: 'விவசாயி நேரடியாக வணிகருக்கு B2B சந்தை தளம்',
        roleLabel: 'தற்போதைய காட்சி:',
        roleFarmer: 'விவசாயி போர்ட்டல்',
        roleBuyer: 'கொள்முதல் போர்ட்டல்',
        roleLogistics: 'போக்குவரத்து பங்குதாரர்',
        roleAdmin: 'நிர்வாகி',
        navMarketplace: 'சந்தை',
        navFarmer: 'விவசாயி மையம்',
        navBuyer: 'கொள்முதல்',
        navLogistics: 'போக்குவரத்து',
        navAdmin: 'நிர்வாகம்',
        navContract: 'ஒப்பந்தங்கள் & எஸ்க்ரோ',
        // Ticker & Market Prices
        livePrices: 'தேசிய பொருளாதார மைய நாளாந்த மொத்த விலைகள்:',
        centerDambulla: 'தம்புள்ளை மத்திய சந்தை',
        centerPettah: 'புறக்கோட்டை மொத்த மையம்',
        centerKeppetipola: 'கெப்பெட்டிபொல பொருளாதார மையம்',
        centerMeegoda: 'மீகொட பொருளாதார மையம்',
        perKg: '/கிலோ',
        // Landing Page
        heroTitle: 'விவசாயியிடமிருந்து நேரடியாக வணிகருக்கு B2B சந்தை',
        heroSubtitle: '3-5 இடைத்தரகர்களை நீக்கி, முன்கூட்டியே அறுவடைகளை பதிவு செய்து, எஸ்க்ரோ பாதுகாப்புடன் வர்த்தகம் செய்யுங்கள்.',
        enterMarketplace: 'சந்தைக்குள் நுழைக',
        postHarvest: 'அறுவடை பட்டியல் இடுங்கள்',
        statVerifiedFarmers: '5,000+ உறுதிப்படுத்தப்பட்ட விவசாயிகள்',
        statEscrowVolume: 'ரூ. 145 மில்லியனுக்கும் அதிகமான பாதுகாப்பு',
        statWasteSaved: '32% வீண் குறைப்பு',
        feature1Title: 'இடைத்தரகர் இல்லா வர்த்தகம்',
        feature1Desc: 'நேரடி வணிக கொள்முதல் மற்றும் விவசாயிகளுக்கு இடையே நியாயமான விலையை உறுதி செய்தல்.',
        feature2Title: 'எஸ்க்ரோ செலுத்தல் பாதுகாப்பு',
        feature2Desc: 'பொருட்கள் பெறப்பட்டு சரிபார்க்கப்பட்ட பின்னரே விவசாயிக்கு பணம் விடுவிக்கப்படும்.',
        feature3Title: 'முன்கூட்டியே அறுவடை பதிவு',
        feature3Desc: '2-6 வாரங்களுக்கு முன் அறுவடைகளை நியாயமான விலையில் பதிவு செய்யும் ஒப்பந்தங்கள்.',
        // Farmer Portal
        farmerTitle: 'விவசாயி விளைச்சல் மற்றும் விற்பனை பலகை',
        farmerSubtitle: 'விளைச்சலை பட்டியலிடுங்கள், விலைகளை பேச்சுவார்த்தை நடத்துங்கள், நேரடி வங்கி தொகையை பெறுங்கள்.',
        totalRevenue: 'மொத்த விற்பனை',
        activeBids: 'செயலில் உள்ள விலை சலுகைகள்',
        upcomingHarvest: 'அடுத்த அறுவடை அளவு',
        pendingPayouts: 'வரவேண்டிய எஸ்க்ரோ பணம்',
        createNewListing: 'புதிய விளைச்சலை சேர்க்கவும்',
        listingsTab: 'தற்போதைய கையிருப்பு & அறுவடை',
        offersInboxTab: 'விலை பேச்சுவார்த்தை பெட்டி',
        bankPayoutsTab: 'வங்கி செலுத்தல்கள் & ஆர்டர்கள்',
        // Listing Modal Form
        modalListingTitle: 'புதிய விளைச்சல் பட்டியல்',
        cropType: 'பயிர் வகை',
        gradeLabel: 'தர நிலை',
        gradeA: 'தரம் A (ஏற்றுமதி / சூப்பர்மார்க்கெட் தரம்)',
        gradeB: 'தரம் B (சாதாரண வணிக தரம்)',
        gradeC: 'தரம் C (தொழிற்சாலை / பதப்படுத்துதல் தரம்)',
        quantityKg: 'கிடைக்கக்கூடிய அளவு (கிலோ)',
        pricePerKg: 'அடிப்படை விலை/கிலோ (ரூ.)',
        harvestDate: 'அறுவடை தேதி',
        locationDistrict: 'பண்ணை மாவட்டம்',
        locationHub: 'அருகிலுள்ள பொருளாதார மையம்',
        isPreHarvest: 'முன்கூட்டிய அறுவடையாக குறிக்கவும் (Forward Contract)',
        organicCert: 'இயற்கை / GAP சான்றளிக்கப்பட்ட விளைச்சல்',
        moistureContent: 'ஈரப்பதம் / புத்துணர்ச்சி நிலை',
        minOrderQty: 'குறைந்தபட்ச ஆர்டர் அளவு (கிலோ)',
        cropDescription: 'பயிர் விவரங்கள்',
        submitListing: 'பட்டியலை வெளியிடுக',
        // Buyer Portal
        buyerTitle: 'வணிக கொள்முதல் இயந்திரம்',
        buyerSubtitle: 'மொத்த பயிர்களைத் தேடுங்கள், தரத்தைச் சரிபார்க்கவும், நேரடியாக விலைகளைப் பேசுங்கள்.',
        searchPlaceholder: 'லீக்ஸ், கேரட், சம்பா நெல், தக்காளி, சின்ன வெங்காயம் தேடுக...',
        filterAllDistricts: 'அனைத்து மாவட்டங்களும்',
        filterAllGrades: 'அனைத்து தரங்களும்',
        filterPreHarvestOnly: 'முன் அறுவடை மட்டும்',
        filterImmediateStock: 'தற்போதைய கையிருப்பு மட்டும்',
        districtMapTitle: 'இலங்கை விவசாய மற்றும் போக்குவரத்து வரைபடம்',
        requestQuote: 'விலை சலுகை சமர்ப்பிக்கவும்',
        bookAdvance: 'முன்பதிவு ஒப்பந்தம் செய்க',
        viewDetails: 'விவரங்களை பார்க்க',
        inEscrow: 'எஸ்க்ரோவில் வைப்பு செய்யப்பட்டுள்ளது',
        // Bidding & Negotiation Engine
        negotiateTitle: 'விலை பேச்சுவார்த்தை இயந்திரம்',
        targetQty: 'தேவைப்படும் அளவு (கிலோ)',
        offeredPrice: 'வழங்கப்படும் விலை/கிலோ (ரூ.)',
        proposedDelivery: 'எதிர்பார்க்கப்படும் விநியோக தேதி',
        negotiationHistory: 'பேச்சுவார்த்தை காலக்கோடு',
        sendCounterOffer: 'எதிர் சலுகை அனுப்பவும்',
        acceptOffer: 'சலுகையை ஏற்று ஒப்பந்தம் செய்க',
        rejectOffer: 'சலுகையை நிராகரி',
        contractGenerated: 'ஒப்பந்தம் உருவாக்கப்பட்டது! எஸ்க்ரோ செலுத்தலுக்கு செல்லவும்.',
        // Escrow & Invoice
        escrowCheckoutTitle: 'எஸ்க்ரோ பாதுகாப்பு வைப்பு',
        invoiceNumber: 'வரி விலைப்பட்டியல் எண்',
        produceAmount: 'விளைச்சல் மொத்த தொகை',
        escrowFee: 'எஸ்க்ரோ சேவை கட்டணம் (1.5%)',
        transportFee: 'போக்குவரத்து கட்டணம்',
        totalPayable: 'எஸ்க்ரோ கணக்கில் செலுத்த வேண்டிய மொத்தம்',
        confirmDeposit: 'பணத்தை எஸ்க்ரோ கணக்கில் வைப்பு செய்க',
        invoiceDownloaded: 'QR குறியீட்டுடன் விலைப்பட்டியல் உருவாக்கப்பட்டது',
        // Logistics Portal
        logisticsTitle: 'போக்குவரத்து மற்றும் விநியோக நிர்வாகம்',
        logisticsSubtitle: 'கிடைக்கும் போக்குவரத்து ஆர்டர்களைப் பார்த்து விநியோகத்தை உறுதிப்படுத்தவும்.',
        availableJobs: 'கிடைக்கும் போக்குவரத்து கோரிக்கைகள்',
        activeShipments: 'பயணத்தில் உள்ள விநியோகங்கள்',
        acceptJob: 'போக்குவரத்தை ஏற்றுக்கொள்',
        routeMapTitle: 'நேரலை போக்குவரத்து பாதை வரைபடம்',
        scanQrDelivery: 'விநியோகத்தை உறுதிப்படுத்து (QR / கையொப்பம்)',
        // Admin Governance Portal
        adminTitle: 'நிர்வாக மற்றும் தகராறு தீர்வு பலகை',
        adminSubtitle: 'அடையாளங்களை சரிபார்க்கவும், எஸ்க்ரோ கணக்குகளை கண்காணிக்கவும், தகராறுகளை தீர்க்கவும்.',
        verificationsTab: 'அடையாள உறுதிப்படுத்தல்கள்',
        escrowLedgerTab: 'எஸ்க்ரோ கணக்குகள் & பணம் விடுவித்தல்',
        disputesTab: 'தர மற்றும் போக்குவரத்து தகராறுகள்',
        marketPricesTab: 'தேசிய பொருளாதார மைய விலைகள்',
        verifyUser: 'உறுதிப்படுத்தலை அங்கீகரி',
        releaseEscrow: 'விவசாயிக்கு பணம் விடுவி',
        resolveDispute: 'தகராறை தீர்த்து வை',
        // General Actions & Status
        statusActive: 'செயலில் உள்ள பட்டியல்',
        statusNegotiating: 'பேச்சுவார்த்தையில் உள்ளது',
        statusContracted: 'ஒப்பந்தம் செய்யப்பட்டுள்ளது',
        statusSold: 'விற்கப்பட்டது',
        statusHolding: 'எஸ்க்ரோவில் வைக்கப்பட்டுள்ளது',
        statusInTransit: 'பயணத்தில் உள்ளது',
        statusDelivered: 'வழங்கப்பட்டு சரிபார்க்கப்பட்டது',
        close: 'மூடு',
        save: 'சேமி',
        cancel: 'ரத்து செய்'
    }
};
function getTranslation(lang) {
    return i18n[lang] || i18n.en;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/store.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProvider",
    ()=>AppProvider,
    "useApp",
    ()=>useApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const initialMarketPrices = [
    {
        id: 'mp-1',
        cropName: 'Premium Leeks',
        cropNameSi: 'ලීක්ස්',
        cropNameTa: 'லீக்ஸ்',
        centerName: 'Dambulla',
        minPriceLkr: 125,
        maxPriceLkr: 145,
        avgPriceLkr: 135,
        change24h: 3.8,
        unit: 'Kg',
        updatedAt: 'Today 06:00 AM'
    },
    {
        id: 'mp-2',
        cropName: 'Washed Carrots',
        cropNameSi: 'කැරට්',
        cropNameTa: 'கேரட்',
        centerName: 'Dambulla',
        minPriceLkr: 88,
        maxPriceLkr: 105,
        avgPriceLkr: 95,
        change24h: -1.2,
        unit: 'Kg',
        updatedAt: 'Today 06:00 AM'
    },
    {
        id: 'mp-3',
        cropName: 'Green Chili',
        cropNameSi: 'අමු මිරිස්',
        cropNameTa: 'பச்சை மிளகாய்',
        centerName: 'Pettah',
        minPriceLkr: 300,
        maxPriceLkr: 350,
        avgPriceLkr: 320,
        change24h: 6.5,
        unit: 'Kg',
        updatedAt: 'Today 06:30 AM'
    },
    {
        id: 'mp-4',
        cropName: 'Keeri Samba Paddy',
        cropNameSi: 'කීරි සම්බා වී',
        cropNameTa: 'கீரி சம்பா நெல்',
        centerName: 'Keppetipola',
        minPriceLkr: 138,
        maxPriceLkr: 152,
        avgPriceLkr: 145,
        change24h: 1.5,
        unit: 'Kg',
        updatedAt: 'Today 05:45 AM'
    },
    {
        id: 'mp-5',
        cropName: 'Jaffna Red Onions',
        cropNameSi: 'රතු ලූණු',
        cropNameTa: 'சின்ன வெங்காயம்',
        centerName: 'Meegoda',
        minPriceLkr: 260,
        maxPriceLkr: 295,
        avgPriceLkr: 280,
        change24h: 0.0,
        unit: 'Kg',
        updatedAt: 'Today 07:00 AM'
    },
    {
        id: 'mp-6',
        cropName: 'Ripe Tomatoes',
        cropNameSi: 'තක්කාලි',
        cropNameTa: 'தக்காளி',
        centerName: 'Dambulla',
        minPriceLkr: 100,
        maxPriceLkr: 120,
        avgPriceLkr: 110,
        change24h: -4.2,
        unit: 'Kg',
        updatedAt: 'Today 06:15 AM'
    }
];
const initialListings = [
    {
        id: 'list-101',
        title: 'Export Grade Leeks',
        cropType: 'Leeks',
        grade: 'Grade A',
        quantityKg: 2500,
        pricePerKg: 135,
        totalValueLkr: 337500,
        harvestDate: '2026-08-28',
        locationDistrict: 'Nuwara Eliya',
        locationHub: 'Nuwara Eliya Central Hub',
        farmerName: 'Bandara Organic Farms',
        farmerId: 'farmer-01',
        farmerNic: '781920394V',
        farmerPhone: '+94 77 123 4567',
        isPreHarvest: false,
        photos: [
            'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=600&auto=format&fit=crop&q=80'
        ],
        organicCertified: true,
        moistureContent: '12% Optimal',
        minOrderQtyKg: 500,
        description: 'Crisp, washed Nuwara Eliya highland leeks. Grown with strict GAP standards, suitable for supermarket distribution & export.',
        status: 'active'
    },
    {
        id: 'list-102',
        title: 'Washed Orange Carrots',
        cropType: 'Carrots',
        grade: 'Grade A',
        quantityKg: 4500,
        pricePerKg: 95,
        totalValueLkr: 427500,
        harvestDate: '2026-08-30',
        locationDistrict: 'Badulla',
        locationHub: 'Keppetipola Economic Center',
        farmerName: 'Dambulla Produce Central',
        farmerId: 'farmer-02',
        farmerNic: '840192837V',
        farmerPhone: '+94 71 987 6543',
        isPreHarvest: true,
        photos: [
            'https://images.unsplash.com/photo-1447175008436-0841719b8b80?w=600&auto=format&fit=crop&q=80'
        ],
        organicCertified: false,
        moistureContent: '14% Fresh',
        minOrderQtyKg: 1000,
        description: 'Pre-harvest forward booking available for high-density washed carrots. Estimated yield ready in 5 days.',
        status: 'active'
    },
    {
        id: 'list-103',
        title: 'Keeri Samba Paddy (Advance Yield)',
        cropType: 'Paddy',
        grade: 'Grade A',
        quantityKg: 12000,
        pricePerKg: 145,
        totalValueLkr: 1740000,
        harvestDate: '2026-09-15',
        locationDistrict: 'Polonnaruwa',
        locationHub: 'Polonnaruwa Paddy Hub',
        farmerName: 'Rajarata Farmers Guild',
        farmerId: 'farmer-03',
        farmerNic: '692810394V',
        farmerPhone: '+94 76 555 1212',
        isPreHarvest: true,
        photos: [
            'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=600&auto=format&fit=crop&q=80'
        ],
        organicCertified: true,
        moistureContent: '11% Dry Harvest',
        minOrderQtyKg: 2000,
        description: 'Forward contract listing for upcoming Keeri Samba harvest. Lock in wholesale mill prices today with 20% escrow deposit.',
        status: 'active'
    },
    {
        id: 'list-104',
        title: 'Spicy Green Chili (Grade A)',
        cropType: 'Green Chili',
        grade: 'Grade A',
        quantityKg: 1800,
        pricePerKg: 320,
        totalValueLkr: 576000,
        harvestDate: '2026-08-25',
        locationDistrict: 'Monaragala',
        locationHub: 'Dambulla Central Market',
        farmerName: 'Wellawaya Agri Co-op',
        farmerId: 'farmer-04',
        farmerNic: '891029384V',
        farmerPhone: '+94 70 333 4455',
        isPreHarvest: false,
        photos: [
            'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80'
        ],
        organicCertified: false,
        moistureContent: 'Standard',
        minOrderQtyKg: 250,
        description: 'Freshly plucked dark green chili with high heat index. Packed in 25kg ventilated jute bags for immediate haulage.',
        status: 'active'
    },
    {
        id: 'list-105',
        title: 'Jaffna Premium Red Onions',
        cropType: 'Red Onion',
        grade: 'Grade A',
        quantityKg: 3500,
        pricePerKg: 280,
        totalValueLkr: 980000,
        harvestDate: '2026-08-26',
        locationDistrict: 'Jaffna',
        locationHub: 'Chavakachcheri Market',
        farmerName: 'Northern Produce Co.',
        farmerId: 'farmer-05',
        farmerNic: '912039485V',
        farmerPhone: '+94 77 444 8899',
        isPreHarvest: false,
        photos: [
            'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?w=600&auto=format&fit=crop&q=80'
        ],
        organicCertified: true,
        moistureContent: 'Sun Cured',
        minOrderQtyKg: 500,
        description: 'Famous Jaffna small red shallot onions, sun-dried for long shelf life. Excellent bulb density.',
        status: 'active'
    }
];
const initialOffers = [
    {
        id: 'off-501',
        listingId: 'list-101',
        produceTitle: 'Export Grade Leeks',
        cropType: 'Leeks',
        buyerId: 'buyer-01',
        buyerName: 'Keells Agri Procure',
        buyerCompany: 'Jaykay Marketing Services PLC',
        buyerPhone: '+94 11 234 5678',
        farmerId: 'farmer-01',
        farmerName: 'Bandara Organic Farms',
        targetQtyKg: 1500,
        originalPricePerKg: 135,
        offeredPricePerKg: 128,
        proposedDeliveryDate: '2026-08-29',
        status: 'countered',
        messages: [
            {
                id: 'm1',
                sender: 'buyer',
                senderName: 'Keells Agri Procure',
                offeredPricePerKg: 125,
                quantityKg: 1500,
                note: 'We request 1,500kg at LKR 125/kg for central supermarket warehouse delivery.',
                timestamp: '2026-08-24 08:15 AM'
            },
            {
                id: 'm2',
                sender: 'farmer',
                senderName: 'Bandara Organic Farms',
                offeredPricePerKg: 128,
                quantityKg: 1500,
                note: 'We can lower to LKR 128/kg if transport loading is handled before 10 AM.',
                timestamp: '2026-08-24 08:45 AM'
            }
        ],
        createdAt: '2026-08-24 08:15 AM',
        updatedAt: '2026-08-24 08:45 AM'
    },
    {
        id: 'off-502',
        listingId: 'list-102',
        produceTitle: 'Washed Orange Carrots',
        cropType: 'Carrots',
        buyerId: 'buyer-02',
        buyerName: 'Cargills Food City B2B',
        buyerCompany: 'Cargills Ceylon PLC',
        buyerPhone: '+94 11 987 1122',
        farmerId: 'farmer-02',
        farmerName: 'Dambulla Produce Central',
        targetQtyKg: 2000,
        originalPricePerKg: 95,
        offeredPricePerKg: 95,
        proposedDeliveryDate: '2026-08-31',
        status: 'accepted',
        messages: [
            {
                id: 'm3',
                sender: 'buyer',
                senderName: 'Cargills Food City B2B',
                offeredPricePerKg: 95,
                quantityKg: 2000,
                note: 'Accepting baseline price LKR 95/kg for 2 metric tons advance harvest booking.',
                timestamp: '2026-08-24 09:00 AM'
            }
        ],
        createdAt: '2026-08-24 09:00 AM',
        updatedAt: '2026-08-24 09:05 AM'
    }
];
const initialContracts = [
    {
        id: 'ctr-701',
        negotiationId: 'off-502',
        listingId: 'list-102',
        buyerName: 'Cargills Food City B2B',
        buyerCompany: 'Cargills Ceylon PLC',
        farmerName: 'Dambulla Produce Central',
        produceTitle: 'Washed Orange Carrots (2,000 Kg)',
        quantityKg: 2000,
        agreedPricePerKg: 95,
        produceAmountLkr: 190000,
        escrowFeeLkr: 2850,
        transportFeeLkr: 15000,
        totalPaidLkr: 207850,
        status: 'holding',
        invoiceNumber: 'INV-KP-2026-0892',
        paymentMethod: 'Escrow Digital Guarantee',
        depositDate: '2026-08-24 09:10 AM',
        qrVerificationCode: 'KP-QR-9823-CARROT-2000',
        deliveryAddress: 'Cargills Distribution Center, Welisara, Western Province',
        haulerName: 'Lanka Logistics Express',
        haulerStatus: 'in_transit'
    }
];
const initialShipments = [
    {
        id: 'ship-901',
        contractId: 'ctr-701',
        produceTitle: 'Washed Orange Carrots (2,000 Kg)',
        originDistrict: 'Badulla',
        originHub: 'Keppetipola Economic Center',
        destinationDistrict: 'Colombo',
        destinationHub: 'Welisara Distribution Hub',
        weightKg: 2000,
        haulerName: 'Lanka Logistics Express',
        haulerVehicle: 'Refrigerated Truck (WP LE-4821)',
        driverName: 'Nimal Silva',
        driverPhone: '+94 71 444 5566',
        payoutLkr: 15000,
        status: 'in_transit',
        currentLocationName: 'Kegalle Checkpoint (Colombo-Kandy Road)',
        estimatedArrival: 'Today, 04:30 PM',
        checkpoints: [
            {
                name: 'Dispatched from Keppetipola Hub',
                time: '08:00 AM',
                status: 'completed'
            },
            {
                name: 'Kandy Transit Hub Clearance',
                time: '11:15 AM',
                status: 'completed'
            },
            {
                name: 'Kegalle Highway Checkpoint',
                time: '01:45 PM',
                status: 'current'
            },
            {
                name: 'Welisara B2B Hub Drop-off',
                time: '04:30 PM (ETA)',
                status: 'pending'
            }
        ],
        qrSignatureVerified: false
    },
    {
        id: 'ship-902',
        contractId: 'ctr-700-demo',
        produceTitle: 'Spicy Green Chili (1,000 Kg)',
        originDistrict: 'Monaragala',
        originHub: 'Wellawaya Hub',
        destinationDistrict: 'Colombo',
        destinationHub: 'Pettah Wholesale Market',
        weightKg: 1000,
        haulerName: 'Islandwide Freight Service',
        haulerVehicle: '3-Ton Hauler (CP GA-1920)',
        driverName: 'Kamal Perera',
        driverPhone: '+94 77 888 9900',
        payoutLkr: 18000,
        status: 'available',
        currentLocationName: 'Awaiting Transporter Acceptance',
        estimatedArrival: 'Tomorrow, 10:00 AM',
        checkpoints: [
            {
                name: 'Cargo Ready at Wellawaya Hub',
                time: '07:00 AM',
                status: 'completed'
            },
            {
                name: 'Transporter Dispatch',
                time: 'Pending',
                status: 'pending'
            },
            {
                name: 'Pettah Hub Inspection',
                time: 'Pending',
                status: 'pending'
            }
        ],
        qrSignatureVerified: false
    }
];
const initialDisputes = [
    {
        id: 'disp-01',
        contractId: 'ctr-699-old',
        raisedBy: 'Keells Agri Procure',
        role: 'buyer',
        reason: 'Grade A Tomatoes down-graded to Grade B due to transit bruising.',
        evidenceNotes: 'Photos uploaded showing 15% crushed tomatoes in bottom crates during unloading at Pettah.',
        status: 'under_review',
        createdAt: '2026-08-23'
    }
];
const initialUser = {
    id: 'usr-001',
    name: 'Deshan Siriwardhna',
    role: 'buyer',
    nicOrBrn: 'OTH/IT/IT_UGC_001/B005-B/0009',
    phone: '+94 77 000 1122',
    district: 'Colombo',
    bankAccount: {
        bankName: 'Commercial Bank of Ceylon',
        accountNumber: '8001928374',
        branchName: 'Head Office Branch'
    },
    verified: true
};
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AppProvider = ({ children })=>{
    _s();
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('buyer');
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('en');
    const [listings, setListings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialListings);
    const [offers, setOffers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialOffers);
    const [contracts, setContracts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialContracts);
    const [shipments, setShipments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialShipments);
    const [marketPrices, setMarketPrices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialMarketPrices);
    const [disputes, setDisputes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialDisputes);
    const [currentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialUser);
    // Persistence in LocalStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppProvider.useEffect": ()=>{
            try {
                const savedListings = localStorage.getItem('kp_listings');
                if (savedListings) setListings(JSON.parse(savedListings));
                const savedOffers = localStorage.getItem('kp_offers');
                if (savedOffers) setOffers(JSON.parse(savedOffers));
                const savedContracts = localStorage.getItem('kp_contracts');
                if (savedContracts) setContracts(JSON.parse(savedContracts));
                const savedShipments = localStorage.getItem('kp_shipments');
                if (savedShipments) setShipments(JSON.parse(savedShipments));
            } catch  {
            // Fallback to initial state
            }
        }
    }["AppProvider.useEffect"], []);
    const saveState = (key, data)=>{
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch  {
        // localstorage error ignore
        }
    };
    const addListing = (listingData)=>{
        const newId = `list-${Date.now()}`;
        const totalVal = listingData.quantityKg * listingData.pricePerKg;
        const newListing = {
            ...listingData,
            id: newId,
            farmerId: 'farmer-curr',
            totalValueLkr: totalVal,
            status: 'active'
        };
        const updated = [
            newListing,
            ...listings
        ];
        setListings(updated);
        saveState('kp_listings', updated);
    };
    const createOffer = (listingId, targetQtyKg, offeredPricePerKg, deliveryDate, note)=>{
        const listing = listings.find((l)=>l.id === listingId);
        if (!listing) return;
        const offerId = `off-${Date.now()}`;
        const newOffer = {
            id: offerId,
            listingId,
            produceTitle: listing.title,
            cropType: listing.cropType,
            buyerId: currentUser.id,
            buyerName: currentUser.name,
            buyerCompany: 'Lanka Agri Procurement Ltd',
            buyerPhone: currentUser.phone,
            farmerId: listing.farmerId,
            farmerName: listing.farmerName,
            targetQtyKg,
            originalPricePerKg: listing.pricePerKg,
            offeredPricePerKg,
            proposedDeliveryDate: deliveryDate,
            status: 'pending',
            messages: [
                {
                    id: `m-${Date.now()}`,
                    sender: 'buyer',
                    senderName: currentUser.name,
                    offeredPricePerKg,
                    quantityKg: targetQtyKg,
                    note: note || `Requested ${targetQtyKg}kg at LKR ${offeredPricePerKg}/kg`,
                    timestamp: new Date().toLocaleString()
                }
            ],
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        };
        const updatedOffers = [
            newOffer,
            ...offers
        ];
        setOffers(updatedOffers);
        saveState('kp_offers', updatedOffers);
        // Update listing status
        const updatedListings = listings.map((l)=>l.id === listingId ? {
                ...l,
                status: 'negotiating'
            } : l);
        setListings(updatedListings);
        saveState('kp_listings', updatedListings);
    };
    const respondToOffer = (offerId, action, counterPrice, counterQty, note)=>{
        const updatedOffers = offers.map((off)=>{
            if (off.id !== offerId) return off;
            let newStatus = off.status;
            const newMessages = [
                ...off.messages
            ];
            const isFarmer = role === 'farmer';
            if (action === 'accept') {
                newStatus = 'accepted';
                newMessages.push({
                    id: `m-${Date.now()}`,
                    sender: isFarmer ? 'farmer' : 'buyer',
                    senderName: isFarmer ? off.farmerName : off.buyerName,
                    offeredPricePerKg: off.offeredPricePerKg,
                    quantityKg: off.targetQtyKg,
                    note: note || 'Offer Accepted! Proceeding to generate Escrow B2B Contract.',
                    timestamp: new Date().toLocaleString()
                });
                // Automatically generate contract
                const produceAmt = off.targetQtyKg * off.offeredPricePerKg;
                const escrowFee = Math.round(produceAmt * 0.015);
                const transportFee = 14500;
                const newContract = {
                    id: `ctr-${Date.now()}`,
                    negotiationId: offerId,
                    listingId: off.listingId,
                    buyerName: off.buyerName,
                    buyerCompany: off.buyerCompany,
                    farmerName: off.farmerName,
                    produceTitle: `${off.produceTitle} (${off.targetQtyKg} Kg)`,
                    quantityKg: off.targetQtyKg,
                    agreedPricePerKg: off.offeredPricePerKg,
                    produceAmountLkr: produceAmt,
                    escrowFeeLkr: escrowFee,
                    transportFeeLkr: transportFee,
                    totalPaidLkr: produceAmt + escrowFee + transportFee,
                    status: 'holding',
                    invoiceNumber: `INV-KP-${Math.floor(100000 + Math.random() * 900000)}`,
                    paymentMethod: 'Escrow Bank Holding',
                    depositDate: new Date().toLocaleString(),
                    qrVerificationCode: `KP-QR-${Math.floor(1000 + Math.random() * 9000)}-${off.cropType.toUpperCase()}`,
                    deliveryAddress: 'Colombo Wholesale Hub, Pettah Distribution Center',
                    haulerStatus: 'pending'
                };
                setContracts((prev)=>{
                    const next = [
                        newContract,
                        ...prev
                    ];
                    saveState('kp_contracts', next);
                    return next;
                });
            } else if (action === 'reject') {
                newStatus = 'rejected';
                newMessages.push({
                    id: `m-${Date.now()}`,
                    sender: isFarmer ? 'farmer' : 'buyer',
                    senderName: isFarmer ? off.farmerName : off.buyerName,
                    offeredPricePerKg: off.offeredPricePerKg,
                    quantityKg: off.targetQtyKg,
                    note: note || 'Offer declined.',
                    timestamp: new Date().toLocaleString()
                });
            } else if (action === 'counter' && counterPrice) {
                newStatus = 'countered';
                newMessages.push({
                    id: `m-${Date.now()}`,
                    sender: isFarmer ? 'farmer' : 'buyer',
                    senderName: isFarmer ? off.farmerName : off.buyerName,
                    offeredPricePerKg: counterPrice,
                    quantityKg: counterQty || off.targetQtyKg,
                    note: note || `Counter-offer: LKR ${counterPrice}/kg for ${counterQty || off.targetQtyKg}kg`,
                    timestamp: new Date().toLocaleString()
                });
            }
            return {
                ...off,
                status: newStatus,
                offeredPricePerKg: counterPrice || off.offeredPricePerKg,
                targetQtyKg: counterQty || off.targetQtyKg,
                messages: newMessages,
                updatedAt: new Date().toLocaleString()
            };
        });
        setOffers(updatedOffers);
        saveState('kp_offers', updatedOffers);
    };
    const depositEscrow = (contractId)=>{
        const updatedContracts = contracts.map((c)=>c.id === contractId ? {
                ...c,
                status: 'holding'
            } : c);
        setContracts(updatedContracts);
        saveState('kp_contracts', updatedContracts);
    };
    const updateShipmentStatus = (shipmentId, status, locationName)=>{
        const updatedShipments = shipments.map((s)=>{
            if (s.id !== shipmentId) return s;
            return {
                ...s,
                status,
                currentLocationName: locationName || s.currentLocationName
            };
        });
        setShipments(updatedShipments);
        saveState('kp_shipments', updatedShipments);
    };
    const verifyDeliveryQr = (shipmentId)=>{
        const updatedShipments = shipments.map((s)=>{
            if (s.id !== shipmentId) return s;
            return {
                ...s,
                status: 'delivered',
                qrSignatureVerified: true,
                verifiedAt: new Date().toLocaleString()
            };
        });
        setShipments(updatedShipments);
        saveState('kp_shipments', updatedShipments);
        // Also update contract status to released
        const shipment = shipments.find((s)=>s.id === shipmentId);
        if (shipment) {
            const updatedContracts = contracts.map((c)=>c.id === shipment.contractId ? {
                    ...c,
                    status: 'released',
                    haulerStatus: 'delivered'
                } : c);
            setContracts(updatedContracts);
            saveState('kp_contracts', updatedContracts);
        }
    };
    const updateMarketPrice = (id, avgPriceLkr)=>{
        const updated = marketPrices.map((mp)=>{
            if (mp.id !== id) return mp;
            const min = Math.round(avgPriceLkr * 0.9);
            const max = Math.round(avgPriceLkr * 1.1);
            return {
                ...mp,
                avgPriceLkr,
                minPriceLkr: min,
                maxPriceLkr: max,
                updatedAt: 'Just updated'
            };
        });
        setMarketPrices(updated);
    };
    const raiseDispute = (contractId, reason, evidence)=>{
        const newDispute = {
            id: `disp-${Date.now()}`,
            contractId,
            raisedBy: currentUser.name,
            role: role === 'buyer' ? 'buyer' : 'farmer',
            reason,
            evidenceNotes: evidence,
            status: 'open',
            createdAt: new Date().toISOString().split('T')[0]
        };
        setDisputes([
            newDispute,
            ...disputes
        ]);
    };
    const resolveDispute = (disputeId, outcome, refundPct)=>{
        const updatedDisputes = disputes.map((d)=>d.id === disputeId ? {
                ...d,
                status: 'resolved',
                resolutionOutcome: outcome,
                refundPercentage: refundPct
            } : d);
        setDisputes(updatedDisputes);
        const dispute = disputes.find((d)=>d.id === disputeId);
        if (dispute) {
            const updatedContracts = contracts.map((c)=>c.id === dispute.contractId ? {
                    ...c,
                    status: refundPct > 0 ? 'refunded' : 'released'
                } : c);
            setContracts(updatedContracts);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
        value: {
            role,
            setRole,
            lang,
            setLang,
            listings,
            addListing,
            offers,
            createOffer,
            respondToOffer,
            contracts,
            depositEscrow,
            shipments,
            updateShipmentStatus,
            verifyDeliveryQr,
            marketPrices,
            updateMarketPrice,
            disputes,
            raiseDispute,
            resolveDispute,
            currentUser
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/store.tsx",
        lineNumber: 596,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AppProvider, "KxQo5JFObwl0kzlq43MMKI9Wl+o=");
_c = AppProvider;
const useApp = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
_s1(useApp, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AppProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_12ga7yq._.js.map