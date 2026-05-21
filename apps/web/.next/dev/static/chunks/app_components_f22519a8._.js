(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/loaders/StarLoader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StarLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const defaultTexts = [
    'Processing...',
    'Loading...',
    'Please wait...'
];
// Acadion brand color
const ACADION_PURPLE = '#9f80da';
function StarLoader({ dark = false, texts = defaultTexts, rotationInterval = 2000, size = 1, textPosition = 'right' }) {
    _s();
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StarLoader.useEffect": ()=>{
            if (texts.length <= 1) return;
            const interval = setInterval({
                "StarLoader.useEffect.interval": ()=>{
                    setCurrentIndex({
                        "StarLoader.useEffect.interval": (prev)=>(prev + 1) % texts.length
                    }["StarLoader.useEffect.interval"]);
                }
            }["StarLoader.useEffect.interval"], rotationInterval);
            return ({
                "StarLoader.useEffect": ()=>clearInterval(interval)
            })["StarLoader.useEffect"];
        }
    }["StarLoader.useEffect"], [
        texts.length,
        rotationInterval
    ]);
    const baseSize = 45 * size;
    const smallSize = 10 * size;
    const mediumSize = 15 * size;
    const largeSize = 18 * size;
    const isBottom = textPosition === 'bottom';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-d885bd19adcf5fce" + " " + `flex ${isBottom ? 'flex-col items-center' : 'items-center justify-start'} gap-1`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: `${baseSize}px`,
                    height: `${baseSize}px`,
                    position: 'relative'
                },
                className: "jsx-d885bd19adcf5fce" + " " + "star-container",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            width: `${smallSize}px`,
                            height: `${smallSize}px`
                        },
                        className: "jsx-d885bd19adcf5fce" + " " + "star s1"
                    }, void 0, false, {
                        fileName: "[project]/app/components/loaders/StarLoader.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            width: `${mediumSize}px`,
                            height: `${mediumSize}px`
                        },
                        className: "jsx-d885bd19adcf5fce" + " " + "star s2"
                    }, void 0, false, {
                        fileName: "[project]/app/components/loaders/StarLoader.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            width: `${largeSize}px`,
                            height: `${largeSize}px`
                        },
                        className: "jsx-d885bd19adcf5fce" + " " + "star s3"
                    }, void 0, false, {
                        fileName: "[project]/app/components/loaders/StarLoader.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/loaders/StarLoader.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                    initial: {
                        opacity: 0,
                        y: 10
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: -10
                    },
                    transition: {
                        duration: 0.3
                    },
                    className: `text-sm font-medium ${isBottom ? 'text-center' : ''} ${dark ? 'text-gray-300' : 'text-gray-600'}`,
                    children: texts[currentIndex]
                }, currentIndex, false, {
                    fileName: "[project]/app/components/loaders/StarLoader.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/loaders/StarLoader.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "d885bd19adcf5fce",
                children: `.star.jsx-d885bd19adcf5fce{background:${ACADION_PURPLE};clip-path:polygon(50% 0%,61% 35%,100% 50%,61% 65%,50% 100%,39% 65%,0% 50%,39% 35%);top:50%;left:50%}.s1.jsx-d885bd19adcf5fce{animation:1.8s ease-in-out infinite star1}.s2.jsx-d885bd19adcf5fce{animation:1.8s ease-in-out infinite star2}.s3.jsx-d885bd19adcf5fce{animation:1.8s ease-in-out infinite star3}@keyframes star1{0%{opacity:1;transform:translate(-50%,-50%)translate(-8px,9px)scale(1)rotate(0)}40%{opacity:0;transform:translate(-50%,-50%)translate(0)scale(1)rotate(90deg)}60%{opacity:0;transform:translate(-50%,-50%)translate(0)scale(1)rotate(270deg)}to{opacity:1;transform:translate(-50%,-50%)translate(-8px,9px)scale(1)rotate(360deg)}}@keyframes star2{0%{transform:translate(-50%,-50%)translate(-7px,-10px)scale(1)rotate(0)}40%{transform:translate(-50%,-50%)translate(0)scale(1.3)rotate(90deg)}60%{transform:translate(-50%,-50%)translate(0)scale(1.3)rotate(270deg)}to{transform:translate(-50%,-50%)translate(-7px,-10px)scale(1)rotate(360deg)}}@keyframes star3{0%{opacity:1;transform:translate(-50%,-50%)translate(11px)scale(1)rotate(0)}40%{opacity:0;transform:translate(-50%,-50%)translate(0)scale(1)rotate(90deg)}60%{opacity:0;transform:translate(-50%,-50%)translate(0)scale(1)rotate(270deg)}to{opacity:1;transform:translate(-50%,-50%)translate(11px)scale(1)rotate(360deg)}}`
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/loaders/StarLoader.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(StarLoader, "tPjzCc9H5UuFdWNuAHYoD0K4UOk=");
_c = StarLoader;
var _c;
__turbopack_context__.k.register(_c, "StarLoader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/ColorPicker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ColorPicker",
    ()=>ColorPicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$project$2d$colors$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/use-project-colors.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
// 8 columns × 5 rows color grid
const BASIC_COLORS = [
    // Row 1 — vivid
    '#FF0000',
    '#FF8C00',
    '#FFD700',
    '#00C853',
    '#2196F3',
    '#9F80DA',
    '#E91E63',
    '#795548',
    // Row 2 — pastel
    '#FFCDD2',
    '#FFE0B2',
    '#FFF9C4',
    '#C8E6C9',
    '#BBDEFB',
    '#E1BEE7',
    '#F8BBD0',
    '#D7CCC8',
    // Row 3 — medium
    '#EF5350',
    '#FF7043',
    '#FFCA28',
    '#66BB6A',
    '#42A5F5',
    '#AB47BC',
    '#EC407A',
    '#8D6E63',
    // Row 4 — dark
    '#B71C1C',
    '#E65100',
    '#F57F17',
    '#1B5E20',
    '#0D47A1',
    '#4A148C',
    '#880E4F',
    '#3E2723',
    // Row 5 — grayscale
    '#000000',
    '#374151',
    '#6B7280',
    '#9CA3AF',
    '#D1D5DB',
    '#E5E7EB',
    '#F3F4F6',
    '#FFFFFF'
];
function isValidHex(hex) {
    return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);
}
function normalizeHex(hex) {
    let h = hex.replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    return `#${h.toUpperCase()}`;
}
function hexToRgb(hex) {
    const h = hex.replace('#', '');
    if (h.length !== 6) return null;
    const num = parseInt(h, 16);
    if (isNaN(num)) return null;
    return {
        r: num >> 16 & 255,
        g: num >> 8 & 255,
        b: num & 255
    };
}
function rgbToHex(r, g, b) {
    const clamp = (v)=>Math.max(0, Math.min(255, Math.round(v)));
    return `#${[
        clamp(r),
        clamp(g),
        clamp(b)
    ].map((v)=>v.toString(16).padStart(2, '0')).join('').toUpperCase()}`;
}
// Convert HSV to RGB
function hsvToRgb(h, s, v) {
    const c = v * s;
    const x = c * (1 - Math.abs(h / 60 % 2 - 1));
    const m = v - c;
    let r = 0, g = 0, b = 0;
    if (h < 60) {
        r = c;
        g = x;
    } else if (h < 120) {
        r = x;
        g = c;
    } else if (h < 180) {
        g = c;
        b = x;
    } else if (h < 240) {
        g = x;
        b = c;
    } else if (h < 300) {
        r = x;
        b = c;
    } else {
        r = c;
        b = x;
    }
    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255)
    };
}
// Convert RGB to HSV
function rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const d = max - min;
    let h = 0;
    if (d !== 0) {
        if (max === r) h = 60 * ((g - b) / d % 6);
        else if (max === g) h = 60 * ((b - r) / d + 2);
        else h = 60 * ((r - g) / d + 4);
    }
    if (h < 0) h += 360;
    const s = max === 0 ? 0 : d / max;
    return {
        h,
        s,
        v: max
    };
}
function ColorPicker({ selectedColor, onSelect, onClose, projectColors, position = 'top' }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const usedColors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$project$2d$colors$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectUsedColors"])();
    const [hexInput, setHexInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(selectedColor?.replace('#', '') || '');
    const [rgb, setRgb] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "ColorPicker.useState": ()=>{
            const parsed = selectedColor ? hexToRgb(selectedColor) : null;
            return parsed ? {
                r: String(parsed.r),
                g: String(parsed.g),
                b: String(parsed.b)
            } : {
                r: '0',
                g: '0',
                b: '0'
            };
        }
    }["ColorPicker.useState"]);
    // Close on click outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ColorPicker.useEffect": ()=>{
            const handle = {
                "ColorPicker.useEffect.handle": (e)=>{
                    if (ref.current && !ref.current.contains(e.target)) {
                        onClose();
                    }
                }
            }["ColorPicker.useEffect.handle"];
            document.addEventListener('mousedown', handle);
            return ({
                "ColorPicker.useEffect": ()=>document.removeEventListener('mousedown', handle)
            })["ColorPicker.useEffect"];
        }
    }["ColorPicker.useEffect"], [
        onClose
    ]);
    const selectAndClose = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ColorPicker.useCallback[selectAndClose]": (color)=>{
            onSelect(color);
            onClose();
        }
    }["ColorPicker.useCallback[selectAndClose]"], [
        onSelect,
        onClose
    ]);
    const applyHex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ColorPicker.useCallback[applyHex]": (raw)=>{
            const prefixed = raw.startsWith('#') ? raw : `#${raw}`;
            if (isValidHex(prefixed)) {
                const normalized = normalizeHex(prefixed);
                onSelect(normalized);
                const parsed = hexToRgb(normalized);
                if (parsed) setRgb({
                    r: String(parsed.r),
                    g: String(parsed.g),
                    b: String(parsed.b)
                });
            }
        }
    }["ColorPicker.useCallback[applyHex]"], [
        onSelect
    ]);
    const applyRgb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ColorPicker.useCallback[applyRgb]": (r, g, b)=>{
            const rn = parseInt(r) || 0;
            const gn = parseInt(g) || 0;
            const bn = parseInt(b) || 0;
            if (rn >= 0 && rn <= 255 && gn >= 0 && gn <= 255 && bn >= 0 && bn <= 255) {
                const hex = rgbToHex(rn, gn, bn);
                onSelect(hex);
                setHexInput(hex.replace('#', ''));
            }
        }
    }["ColorPicker.useCallback[applyRgb]"], [
        onSelect
    ]);
    const positionClass = position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: `absolute ${positionClass} left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-xl z-[100] w-[280px]`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-3 pb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] font-semibold text-gray-400 uppercase tracking-wider",
                        children: "Colors"
                    }, void 0, false, {
                        fileName: "[project]/app/components/ColorPicker.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-8 gap-1 mt-1.5",
                        children: BASIC_COLORS.map((color)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ColorSwatch, {
                                color: color,
                                selected: selectedColor?.toUpperCase() === color.toUpperCase(),
                                onClick: ()=>selectAndClose(color)
                            }, color, false, {
                                fileName: "[project]/app/components/ColorPicker.tsx",
                                lineNumber: 163,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/ColorPicker.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/ColorPicker.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this),
            projectColors && projectColors.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 pb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] font-semibold text-gray-400 uppercase tracking-wider",
                        children: "Project"
                    }, void 0, false, {
                        fileName: "[project]/app/components/ColorPicker.tsx",
                        lineNumber: 176,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-1 mt-1.5",
                        children: projectColors.map((color)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ColorSwatch, {
                                color: color,
                                selected: selectedColor?.toUpperCase() === color.toUpperCase(),
                                onClick: ()=>selectAndClose(color)
                            }, color, false, {
                                fileName: "[project]/app/components/ColorPicker.tsx",
                                lineNumber: 179,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/ColorPicker.tsx",
                        lineNumber: 177,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/ColorPicker.tsx",
                lineNumber: 175,
                columnNumber: 9
            }, this),
            usedColors.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 pb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] font-semibold text-gray-400 uppercase tracking-wider",
                        children: "In Use"
                    }, void 0, false, {
                        fileName: "[project]/app/components/ColorPicker.tsx",
                        lineNumber: 193,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-1 mt-1.5 flex-wrap",
                        children: usedColors.map((color)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ColorSwatch, {
                                color: color,
                                selected: selectedColor?.toUpperCase() === color.toUpperCase(),
                                onClick: ()=>selectAndClose(color)
                            }, color, false, {
                                fileName: "[project]/app/components/ColorPicker.tsx",
                                lineNumber: 196,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/ColorPicker.tsx",
                        lineNumber: 194,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/ColorPicker.tsx",
                lineNumber: 192,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 pb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] font-semibold text-gray-400 uppercase tracking-wider",
                        children: "Spectrum"
                    }, void 0, false, {
                        fileName: "[project]/app/components/ColorPicker.tsx",
                        lineNumber: 209,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RainbowPicker, {
                        selectedColor: selectedColor,
                        onSelect: selectAndClose
                    }, void 0, false, {
                        fileName: "[project]/app/components/ColorPicker.tsx",
                        lineNumber: 210,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/ColorPicker.tsx",
                lineNumber: 208,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 pb-3 pt-1 border-t border-gray-100",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 mt-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1 flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] text-gray-400 font-medium",
                                    children: "#"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ColorPicker.tsx",
                                    lineNumber: 221,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: hexInput,
                                    onChange: (e)=>{
                                        const val = e.target.value.replace(/[^0-9a-fA-F]/g, '').slice(0, 6);
                                        setHexInput(val);
                                        if (val.length === 3 || val.length === 6) {
                                            applyHex(val);
                                        }
                                    },
                                    onKeyDown: (e)=>{
                                        if (e.key === 'Enter') applyHex(hexInput);
                                    },
                                    onBlur: ()=>applyHex(hexInput),
                                    onPaste: (e)=>{
                                        e.preventDefault();
                                        const pasted = e.clipboardData.getData('text').replace('#', '').replace(/[^0-9a-fA-F]/g, '').slice(0, 6);
                                        setHexInput(pasted);
                                        if (pasted.length === 3 || pasted.length === 6) applyHex(pasted);
                                    },
                                    className: "w-full text-[11px] px-1.5 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-[#9F80DA]/40 font-mono",
                                    placeholder: "HEX"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/ColorPicker.tsx",
                                    lineNumber: 222,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/ColorPicker.tsx",
                            lineNumber: 220,
                            columnNumber: 11
                        }, this),
                        [
                            'r',
                            'g',
                            'b'
                        ].map((ch)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-gray-400 font-medium uppercase",
                                        children: ch
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/ColorPicker.tsx",
                                        lineNumber: 250,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: rgb[ch],
                                        onChange: (e)=>{
                                            const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 3);
                                            const next = {
                                                ...rgb,
                                                [ch]: val
                                            };
                                            setRgb(next);
                                            applyRgb(next.r, next.g, next.b);
                                        },
                                        onBlur: ()=>applyRgb(rgb.r, rgb.g, rgb.b),
                                        className: "w-8 text-[11px] px-1 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-[#9F80DA]/40 font-mono text-center"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/ColorPicker.tsx",
                                        lineNumber: 251,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, ch, true, {
                                fileName: "[project]/app/components/ColorPicker.tsx",
                                lineNumber: 249,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/ColorPicker.tsx",
                    lineNumber: 218,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/ColorPicker.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/ColorPicker.tsx",
        lineNumber: 154,
        columnNumber: 5
    }, this);
}
_s(ColorPicker, "EtitsX8WUWvgAYdmjHXebyegOFg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$project$2d$colors$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjectUsedColors"]
    ];
});
_c = ColorPicker;
function RainbowPicker({ selectedColor, onSelect }) {
    _s1();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Compute initial cursor position from selectedColor
    const initialPos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    if (!initialPos.current && selectedColor) {
        const rgb = hexToRgb(selectedColor);
        if (rgb) {
            const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
            initialPos.current = {
                x: hsv.h / 360,
                y: 1 - hsv.v
            };
        }
    }
    // Draw the gradient on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RainbowPicker.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const w = canvas.width;
            const h = canvas.height;
            // Draw hue × brightness gradient (full saturation)
            for(let x = 0; x < w; x++){
                for(let y = 0; y < h; y++){
                    const hue = x / w * 360;
                    const brightness = 1 - y / h;
                    const { r, g, b } = hsvToRgb(hue, 1, brightness);
                    ctx.fillStyle = `rgb(${r},${g},${b})`;
                    ctx.fillRect(x, y, 1, 1);
                }
            }
        }
    }["RainbowPicker.useEffect"], []);
    const pickColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RainbowPicker.useCallback[pickColor]": (e)=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const x = Math.max(0, Math.min(rect.width - 1, e.clientX - rect.left));
            const y = Math.max(0, Math.min(rect.height - 1, e.clientY - rect.top));
            const hue = x / rect.width * 360;
            const brightness = 1 - y / rect.height;
            const { r, g, b } = hsvToRgb(hue, 1, brightness);
            onSelect(rgbToHex(r, g, b));
        }
    }["RainbowPicker.useCallback[pickColor]"], [
        onSelect
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RainbowPicker.useEffect": ()=>{
            if (!isDragging) return;
            const handleMove = {
                "RainbowPicker.useEffect.handleMove": (e)=>pickColor(e)
            }["RainbowPicker.useEffect.handleMove"];
            const handleUp = {
                "RainbowPicker.useEffect.handleUp": ()=>setIsDragging(false)
            }["RainbowPicker.useEffect.handleUp"];
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('mouseup', handleUp);
            return ({
                "RainbowPicker.useEffect": ()=>{
                    document.removeEventListener('mousemove', handleMove);
                    document.removeEventListener('mouseup', handleUp);
                }
            })["RainbowPicker.useEffect"];
        }
    }["RainbowPicker.useEffect"], [
        isDragging,
        pickColor
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "mt-1.5 relative",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
            ref: canvasRef,
            width: 252,
            height: 32,
            className: "w-full h-8 rounded-md cursor-crosshair border border-gray-200",
            onMouseDown: (e)=>{
                setIsDragging(true);
                pickColor(e);
            }
        }, void 0, false, {
            fileName: "[project]/app/components/ColorPicker.tsx",
            lineNumber: 342,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/ColorPicker.tsx",
        lineNumber: 341,
        columnNumber: 5
    }, this);
}
_s1(RainbowPicker, "skAR6MvsGQJWYUOtfUnWvEpUHkM=");
_c1 = RainbowPicker;
function ColorSwatch({ color, selected, onClick }) {
    const isWhite = color.toUpperCase() === '#FFFFFF' || color.toUpperCase() === '#FFF';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        title: color,
        className: `w-6 h-6 rounded-md border transition-all flex-shrink-0 ${selected ? 'ring-2 ring-[#9F80DA] ring-offset-1 border-[#9F80DA]' : isWhite ? 'border-gray-300 hover:scale-110' : 'border-transparent hover:scale-110'}`,
        style: {
            backgroundColor: color
        }
    }, void 0, false, {
        fileName: "[project]/app/components/ColorPicker.tsx",
        lineNumber: 367,
        columnNumber: 5
    }, this);
}
_c2 = ColorSwatch;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ColorPicker");
__turbopack_context__.k.register(_c1, "RainbowPicker");
__turbopack_context__.k.register(_c2, "ColorSwatch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/CustomScrollbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CustomScrollbar",
    ()=>CustomScrollbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$scrollbars$2d$custom$2f$dist$2f$rsc$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-scrollbars-custom/dist/rsc.esm.js [app-client] (ecmascript)");
'use client';
;
;
function CustomScrollbar({ children, className = '', style }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$scrollbars$2d$custom$2f$dist$2f$rsc$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scrollbar"], {
        className: className,
        noDefaultStyles: true,
        permanentTrackY: true,
        noScrollX: true,
        style: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            ...style
        },
        wrapperProps: {
            renderer: (props)=>{
                const { elementRef, key, ...restProps } = props;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ...restProps,
                    ref: elementRef,
                    style: {
                        ...restProps.style,
                        position: 'absolute',
                        inset: 0
                    }
                }, key, false, {
                    fileName: "[project]/app/components/CustomScrollbar.tsx",
                    lineNumber: 32,
                    columnNumber: 18
                }, void 0);
            }
        },
        scrollerProps: {
            renderer: (props)=>{
                const { elementRef, key, ...restProps } = props;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ...restProps,
                    ref: elementRef
                }, key, false, {
                    fileName: "[project]/app/components/CustomScrollbar.tsx",
                    lineNumber: 38,
                    columnNumber: 18
                }, void 0);
            }
        },
        contentProps: {
            renderer: (props)=>{
                const { elementRef, key, ...restProps } = props;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ...restProps,
                    ref: elementRef
                }, key, false, {
                    fileName: "[project]/app/components/CustomScrollbar.tsx",
                    lineNumber: 44,
                    columnNumber: 18
                }, void 0);
            }
        },
        trackYProps: {
            style: {
                width: '8px',
                background: '#e5e7eb',
                borderRadius: '4px',
                position: 'absolute',
                right: '4px',
                top: '4px',
                bottom: '4px',
                zIndex: 10
            }
        },
        thumbYProps: {
            style: {
                background: '#9F80DA',
                borderRadius: '4px',
                width: '6px',
                marginLeft: '1px',
                cursor: 'pointer'
            }
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/components/CustomScrollbar.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = CustomScrollbar;
var _c;
__turbopack_context__.k.register(_c, "CustomScrollbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_components_f22519a8._.js.map