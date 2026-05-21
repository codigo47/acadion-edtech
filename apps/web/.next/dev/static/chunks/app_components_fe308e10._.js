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
"[project]/app/components/FormatToolBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FormatToolBar",
    ()=>FormatToolBar,
    "Sep",
    ()=>Sep,
    "ToolBtn",
    ()=>ToolBtn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bold$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bold$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bold.js [app-client] (ecmascript) <export default as Bold>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$italic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Italic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/italic.js [app-client] (ecmascript) <export default as Italic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$underline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Underline$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/underline.js [app-client] (ecmascript) <export default as Underline>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$strikethrough$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Strikethrough$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/strikethrough.js [app-client] (ecmascript) <export default as Strikethrough>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$superscript$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Superscript$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/superscript.js [app-client] (ecmascript) <export default as Superscript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$subscript$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Subscript$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/subscript.js [app-client] (ecmascript) <export default as Subscript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$start$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/text-align-start.js [app-client] (ecmascript) <export default as AlignLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignCenter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/text-align-center.js [app-client] (ecmascript) <export default as AlignCenter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$end$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/text-align-end.js [app-client] (ecmascript) <export default as AlignRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$vertical$2d$justify$2d$start$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignVerticalJustifyStart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/align-vertical-justify-start.js [app-client] (ecmascript) <export default as AlignVerticalJustifyStart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$vertical$2d$justify$2d$center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignVerticalJustifyCenter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/align-vertical-justify-center.js [app-client] (ecmascript) <export default as AlignVerticalJustifyCenter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$vertical$2d$justify$2d$end$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignVerticalJustifyEnd$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/align-vertical-justify-end.js [app-client] (ecmascript) <export default as AlignVerticalJustifyEnd>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$from$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpFromLine$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-from-line.js [app-client] (ecmascript) <export default as ArrowUpFromLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$from$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownFromLine$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down-from-line.js [app-client] (ecmascript) <export default as ArrowDownFromLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$separator$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SeparatorHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/separator-horizontal.js [app-client] (ecmascript) <export default as SeparatorHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paint$2d$bucket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PaintBucket$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/paint-bucket.js [app-client] (ecmascript) <export default as PaintBucket>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ColorPicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ColorPicker.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const BORDER_RADIUS_PRESETS = [
    {
        value: 0,
        label: '0',
        radius: '0'
    },
    {
        value: 6,
        label: '20',
        radius: '3px'
    },
    {
        value: 12,
        label: '50',
        radius: '5px'
    },
    {
        value: 20,
        label: '70',
        radius: '7px'
    }
];
const FONT_SIZES = [
    8,
    9,
    10,
    11,
    12,
    14,
    16,
    18,
    20,
    22,
    24,
    26,
    28,
    36,
    48,
    72
];
function FormatToolBar({ format, onChange, onClose, projectColors, variant = 'floating', extraControls, hideControls }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [openMenu, setOpenMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FormatToolBar.useEffect": ()=>{
            if (variant === 'inline') return; // inline variant doesn't close on click-outside
            const handle = {
                "FormatToolBar.useEffect.handle": (e)=>{
                    if (ref.current && !ref.current.contains(e.target)) {
                        if (openMenu) {
                            setOpenMenu(null);
                        } else {
                            onClose?.();
                        }
                    }
                }
            }["FormatToolBar.useEffect.handle"];
            document.addEventListener('mousedown', handle);
            return ({
                "FormatToolBar.useEffect": ()=>document.removeEventListener('mousedown', handle)
            })["FormatToolBar.useEffect"];
        }
    }["FormatToolBar.useEffect"], [
        onClose,
        openMenu,
        variant
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FormatToolBar.useEffect": ()=>{
            const handle = {
                "FormatToolBar.useEffect.handle": (e)=>{
                    if (e.key === 'Escape') {
                        if (openMenu) {
                            setOpenMenu(null);
                        } else if (variant !== 'inline') {
                            onClose?.();
                        }
                    }
                }
            }["FormatToolBar.useEffect.handle"];
            document.addEventListener('keydown', handle);
            return ({
                "FormatToolBar.useEffect": ()=>document.removeEventListener('keydown', handle)
            })["FormatToolBar.useEffect"];
        }
    }["FormatToolBar.useEffect"], [
        onClose,
        openMenu,
        variant
    ]);
    const toggle = (key)=>{
        onChange({
            ...format,
            [key]: !format[key]
        });
    };
    const set = (key, value)=>{
        onChange({
            ...format,
            [key]: value
        });
        setOpenMenu(null);
    };
    const toggleMenu = (menu)=>{
        setOpenMenu(openMenu === menu ? null : menu);
    };
    const show = (group)=>!hideControls?.has(group);
    const containerClass = variant === 'inline' ? 'w-full flex flex-wrap justify-center bg-gray-50/80 border-t border-gray-200 rounded-b-xl py-1.5 px-3 gap-0.5' : 'inline-flex items-center bg-white rounded-xl shadow-xl border border-gray-200 p-1.5 gap-0.5';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: containerClass,
        children: [
            show('textFormatting') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolBtn, {
                        active: format.bold,
                        onClick: ()=>toggle('bold'),
                        tooltip: "Bold",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bold$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bold$3e$__["Bold"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/app/components/FormatToolBar.tsx",
                            lineNumber: 128,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/FormatToolBar.tsx",
                        lineNumber: 127,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolBtn, {
                        active: format.italic,
                        onClick: ()=>toggle('italic'),
                        tooltip: "Italic",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$italic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Italic$3e$__["Italic"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/app/components/FormatToolBar.tsx",
                            lineNumber: 132,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/FormatToolBar.tsx",
                        lineNumber: 131,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolBtn, {
                        active: format.underline,
                        onClick: ()=>toggle('underline'),
                        tooltip: "Underline",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$underline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Underline$3e$__["Underline"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/app/components/FormatToolBar.tsx",
                            lineNumber: 136,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/FormatToolBar.tsx",
                        lineNumber: 135,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolBtn, {
                        active: format.strikethrough,
                        onClick: ()=>toggle('strikethrough'),
                        tooltip: "Strikethrough",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$strikethrough$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Strikethrough$3e$__["Strikethrough"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/app/components/FormatToolBar.tsx",
                            lineNumber: 140,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/FormatToolBar.tsx",
                        lineNumber: 139,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sep, {}, void 0, false, {
                        fileName: "[project]/app/components/FormatToolBar.tsx",
                        lineNumber: 143,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            show('superSub') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolBtn, {
                        active: format.superscript,
                        onClick: ()=>onChange({
                                ...format,
                                superscript: !format.superscript,
                                subscript: false
                            }),
                        tooltip: "Superscript",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$superscript$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Superscript$3e$__["Superscript"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/app/components/FormatToolBar.tsx",
                            lineNumber: 154,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/FormatToolBar.tsx",
                        lineNumber: 149,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolBtn, {
                        active: format.subscript,
                        onClick: ()=>onChange({
                                ...format,
                                subscript: !format.subscript,
                                superscript: false
                            }),
                        tooltip: "Subscript",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$subscript$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Subscript$3e$__["Subscript"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/app/components/FormatToolBar.tsx",
                            lineNumber: 162,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/FormatToolBar.tsx",
                        lineNumber: 157,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sep, {}, void 0, false, {
                        fileName: "[project]/app/components/FormatToolBar.tsx",
                        lineNumber: 165,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            show('fontSize') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>toggleMenu('fontSize'),
                                title: "Font size",
                                className: `h-10 px-3 flex items-center gap-1 rounded-lg transition-colors text-sm font-medium tabular-nums ${openMenu === 'fontSize' ? 'bg-[#9F80DA]/10 text-[#9F80DA]' : 'text-gray-600 hover:bg-gray-100'}`,
                                children: [
                                    format.fontSize || 14,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/FormatToolBar.tsx",
                                        lineNumber: 182,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/FormatToolBar.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, this),
                            openMenu === 'fontSize' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-full left-0 mt-1.5 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 w-20 max-h-64 overflow-y-auto",
                                children: FONT_SIZES.map((size)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>set('fontSize', size),
                                        className: `w-full text-left px-3 py-1.5 text-sm tabular-nums transition-colors ${format.fontSize === size ? 'bg-[#9F80DA]/10 text-[#9F80DA] font-medium' : 'text-gray-700 hover:bg-gray-50'}`,
                                        children: size
                                    }, size, false, {
                                        fileName: "[project]/app/components/FormatToolBar.tsx",
                                        lineNumber: 187,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/FormatToolBar.tsx",
                                lineNumber: 185,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/FormatToolBar.tsx",
                        lineNumber: 171,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sep, {}, void 0, false, {
                        fileName: "[project]/app/components/FormatToolBar.tsx",
                        lineNumber: 203,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            show('textColor') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>toggleMenu('textColor'),
                        title: "Text color",
                        className: `w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${openMenu === 'textColor' ? 'bg-[#9F80DA]/10' : 'hover:bg-gray-100'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center gap-0.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-bold leading-none",
                                    style: {
                                        color: format.textColor || '#000000'
                                    },
                                    children: "A"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/FormatToolBar.tsx",
                                    lineNumber: 217,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-5 h-1 rounded-full",
                                    style: {
                                        backgroundColor: format.textColor || '#000000'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/components/FormatToolBar.tsx",
                                    lineNumber: 218,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/FormatToolBar.tsx",
                            lineNumber: 216,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/FormatToolBar.tsx",
                        lineNumber: 209,
                        columnNumber: 11
                    }, this),
                    openMenu === 'textColor' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-full left-1/2 -translate-x-1/2 mt-1.5 z-50",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ColorPicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorPicker"], {
                            selectedColor: format.textColor,
                            onSelect: (color)=>set('textColor', color),
                            onClose: ()=>setOpenMenu(null),
                            projectColors: projectColors
                        }, void 0, false, {
                            fileName: "[project]/app/components/FormatToolBar.tsx",
                            lineNumber: 223,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/FormatToolBar.tsx",
                        lineNumber: 222,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/FormatToolBar.tsx",
                lineNumber: 208,
                columnNumber: 9
            }, this),
            show('bgColor') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>toggleMenu('bgColor'),
                        title: "Background color",
                        className: `w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${openMenu === 'bgColor' ? 'bg-[#9F80DA]/10' : 'hover:bg-gray-100'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paint$2d$bucket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PaintBucket$3e$__["PaintBucket"], {
                            className: "w-5 h-5",
                            style: {
                                color: format.bgColor || '#9ca3af'
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/components/FormatToolBar.tsx",
                            lineNumber: 243,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/FormatToolBar.tsx",
                        lineNumber: 236,
                        columnNumber: 11
                    }, this),
                    openMenu === 'bgColor' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-full left-1/2 -translate-x-1/2 mt-1.5 z-50",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ColorPicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorPicker"], {
                            selectedColor: format.bgColor,
                            onSelect: (color)=>set('bgColor', color),
                            onClose: ()=>setOpenMenu(null),
                            projectColors: projectColors
                        }, void 0, false, {
                            fileName: "[project]/app/components/FormatToolBar.tsx",
                            lineNumber: 247,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/FormatToolBar.tsx",
                        lineNumber: 246,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/FormatToolBar.tsx",
                lineNumber: 235,
                columnNumber: 9
            }, this),
            show('borderRadius') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sep, {}, void 0, false, {
                        fileName: "[project]/app/components/FormatToolBar.tsx",
                        lineNumber: 260,
                        columnNumber: 11
                    }, this),
                    BORDER_RADIUS_PRESETS.map((preset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolBtn, {
                            active: (format.borderRadius || 0) === preset.value,
                            onClick: ()=>onChange({
                                    ...format,
                                    borderRadius: preset.value
                                }),
                            tooltip: preset.value === 0 ? 'Square' : `Rounded ${preset.label}%`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-5 h-4 border-2 border-current",
                                style: {
                                    borderRadius: preset.radius
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/components/FormatToolBar.tsx",
                                lineNumber: 268,
                                columnNumber: 15
                            }, this)
                        }, preset.value, false, {
                            fileName: "[project]/app/components/FormatToolBar.tsx",
                            lineNumber: 262,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true),
            show('lineColor') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>toggleMenu('lineColor'),
                        title: "Line color",
                        className: `w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${openMenu === 'lineColor' ? 'bg-[#9F80DA]/10' : 'hover:bg-gray-100'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                    className: "w-5 h-5",
                                    style: {
                                        color: format.lineColor || '#000000'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/components/FormatToolBar.tsx",
                                    lineNumber: 287,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-5 h-1 rounded-full",
                                    style: {
                                        backgroundColor: format.lineColor || '#000000'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/components/FormatToolBar.tsx",
                                    lineNumber: 288,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/FormatToolBar.tsx",
                            lineNumber: 286,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/FormatToolBar.tsx",
                        lineNumber: 279,
                        columnNumber: 11
                    }, this),
                    openMenu === 'lineColor' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-full left-1/2 -translate-x-1/2 mt-1.5 z-50",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ColorPicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorPicker"], {
                            selectedColor: format.lineColor,
                            onSelect: (color)=>set('lineColor', color),
                            onClose: ()=>setOpenMenu(null),
                            projectColors: projectColors
                        }, void 0, false, {
                            fileName: "[project]/app/components/FormatToolBar.tsx",
                            lineNumber: 293,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/FormatToolBar.tsx",
                        lineNumber: 292,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/FormatToolBar.tsx",
                lineNumber: 278,
                columnNumber: 9
            }, this),
            (show('textColor') || show('bgColor') || show('lineColor')) && (show('hAlign') || show('vAlign') || show('margins')) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sep, {}, void 0, false, {
                fileName: "[project]/app/components/FormatToolBar.tsx",
                lineNumber: 305,
                columnNumber: 9
            }, this),
            show('hAlign') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>toggleMenu('hAlign'),
                        title: "Horizontal align",
                        className: `w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${openMenu === 'hAlign' ? 'bg-[#9F80DA]/10 text-[#9F80DA]' : 'text-gray-500 hover:bg-gray-100'}`,
                        children: format.hAlign === 'center' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignCenter$3e$__["AlignCenter"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/app/components/FormatToolBar.tsx",
                            lineNumber: 320,
                            columnNumber: 15
                        }, this) : format.hAlign === 'right' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$end$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignRight$3e$__["AlignRight"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/app/components/FormatToolBar.tsx",
                            lineNumber: 322,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$start$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignLeft$3e$__["AlignLeft"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/app/components/FormatToolBar.tsx",
                            lineNumber: 324,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/FormatToolBar.tsx",
                        lineNumber: 310,
                        columnNumber: 11
                    }, this),
                    openMenu === 'hAlign' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-full left-1/2 -translate-x-1/2 mt-1.5 bg-white border border-gray-200 rounded-lg shadow-lg p-1 z-50 flex gap-0.5",
                        children: [
                            {
                                v: 'left',
                                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$start$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignLeft$3e$__["AlignLeft"]
                            },
                            {
                                v: 'center',
                                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignCenter$3e$__["AlignCenter"]
                            },
                            {
                                v: 'right',
                                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$align$2d$end$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignRight$3e$__["AlignRight"]
                            }
                        ].map(({ v, Icon })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolBtn, {
                                active: format.hAlign === v,
                                onClick: ()=>set('hAlign', v),
                                tooltip: v,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/FormatToolBar.tsx",
                                    lineNumber: 335,
                                    columnNumber: 19
                                }, this)
                            }, v, false, {
                                fileName: "[project]/app/components/FormatToolBar.tsx",
                                lineNumber: 334,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/FormatToolBar.tsx",
                        lineNumber: 328,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/FormatToolBar.tsx",
                lineNumber: 309,
                columnNumber: 9
            }, this),
            show('vAlign') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>toggleMenu('vAlign'),
                        title: "Vertical align",
                        className: `w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${openMenu === 'vAlign' ? 'bg-[#9F80DA]/10 text-[#9F80DA]' : 'text-gray-500 hover:bg-gray-100'}`,
                        children: format.vAlign === 'bottom' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$vertical$2d$justify$2d$end$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignVerticalJustifyEnd$3e$__["AlignVerticalJustifyEnd"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/app/components/FormatToolBar.tsx",
                            lineNumber: 355,
                            columnNumber: 15
                        }, this) : format.vAlign === 'middle' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$vertical$2d$justify$2d$center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignVerticalJustifyCenter$3e$__["AlignVerticalJustifyCenter"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/app/components/FormatToolBar.tsx",
                            lineNumber: 357,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$vertical$2d$justify$2d$start$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignVerticalJustifyStart$3e$__["AlignVerticalJustifyStart"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/app/components/FormatToolBar.tsx",
                            lineNumber: 359,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/FormatToolBar.tsx",
                        lineNumber: 345,
                        columnNumber: 11
                    }, this),
                    openMenu === 'vAlign' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-full left-1/2 -translate-x-1/2 mt-1.5 bg-white border border-gray-200 rounded-lg shadow-lg p-1 z-50 flex gap-0.5",
                        children: [
                            {
                                v: 'top',
                                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$vertical$2d$justify$2d$start$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignVerticalJustifyStart$3e$__["AlignVerticalJustifyStart"]
                            },
                            {
                                v: 'middle',
                                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$vertical$2d$justify$2d$center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignVerticalJustifyCenter$3e$__["AlignVerticalJustifyCenter"]
                            },
                            {
                                v: 'bottom',
                                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$vertical$2d$justify$2d$end$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignVerticalJustifyEnd$3e$__["AlignVerticalJustifyEnd"]
                            }
                        ].map(({ v, Icon })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolBtn, {
                                active: format.vAlign === v,
                                onClick: ()=>set('vAlign', v),
                                tooltip: v,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/FormatToolBar.tsx",
                                    lineNumber: 370,
                                    columnNumber: 19
                                }, this)
                            }, v, false, {
                                fileName: "[project]/app/components/FormatToolBar.tsx",
                                lineNumber: 369,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/FormatToolBar.tsx",
                        lineNumber: 363,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/FormatToolBar.tsx",
                lineNumber: 344,
                columnNumber: 9
            }, this),
            show('margins') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>toggleMenu('margins'),
                        title: "Margins",
                        className: `w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${openMenu === 'margins' ? 'bg-[#9F80DA]/10 text-[#9F80DA]' : 'text-gray-500 hover:bg-gray-100'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$separator$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SeparatorHorizontal$3e$__["SeparatorHorizontal"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/app/components/FormatToolBar.tsx",
                            lineNumber: 389,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/FormatToolBar.tsx",
                        lineNumber: 380,
                        columnNumber: 11
                    }, this),
                    openMenu === 'margins' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-full right-0 mt-1.5 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50 w-44 space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5 mb-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$from$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpFromLine$3e$__["ArrowUpFromLine"], {
                                                className: "w-4 h-4 text-gray-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/FormatToolBar.tsx",
                                                lineNumber: 395,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-gray-500 font-medium",
                                                children: "Top"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/FormatToolBar.tsx",
                                                lineNumber: 396,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/FormatToolBar.tsx",
                                        lineNumber: 394,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-1",
                                        children: [
                                            'none',
                                            'small',
                                            'medium',
                                            'large'
                                        ].map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>onChange({
                                                        ...format,
                                                        marginTop: v
                                                    }),
                                                className: `flex-1 h-8 flex items-center justify-center rounded-md text-xs font-medium transition-colors ${(format.marginTop || 'none') === v ? 'bg-[#9F80DA]/15 text-[#9F80DA]' : 'text-gray-500 hover:bg-gray-100'}`,
                                                children: v === 'none' ? '0' : v[0].toUpperCase()
                                            }, v, false, {
                                                fileName: "[project]/app/components/FormatToolBar.tsx",
                                                lineNumber: 400,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/FormatToolBar.tsx",
                                        lineNumber: 398,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/FormatToolBar.tsx",
                                lineNumber: 393,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5 mb-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$from$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownFromLine$3e$__["ArrowDownFromLine"], {
                                                className: "w-4 h-4 text-gray-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/FormatToolBar.tsx",
                                                lineNumber: 416,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-gray-500 font-medium",
                                                children: "Bottom"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/FormatToolBar.tsx",
                                                lineNumber: 417,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/FormatToolBar.tsx",
                                        lineNumber: 415,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-1",
                                        children: [
                                            'none',
                                            'small',
                                            'medium',
                                            'large'
                                        ].map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>onChange({
                                                        ...format,
                                                        marginBottom: v
                                                    }),
                                                className: `flex-1 h-8 flex items-center justify-center rounded-md text-xs font-medium transition-colors ${(format.marginBottom || 'none') === v ? 'bg-[#9F80DA]/15 text-[#9F80DA]' : 'text-gray-500 hover:bg-gray-100'}`,
                                                children: v === 'none' ? '0' : v[0].toUpperCase()
                                            }, v, false, {
                                                fileName: "[project]/app/components/FormatToolBar.tsx",
                                                lineNumber: 421,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/FormatToolBar.tsx",
                                        lineNumber: 419,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/FormatToolBar.tsx",
                                lineNumber: 414,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/FormatToolBar.tsx",
                        lineNumber: 392,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/FormatToolBar.tsx",
                lineNumber: 379,
                columnNumber: 9
            }, this),
            extraControls && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sep, {}, void 0, false, {
                        fileName: "[project]/app/components/FormatToolBar.tsx",
                        lineNumber: 442,
                        columnNumber: 11
                    }, this),
                    extraControls
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/FormatToolBar.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
_s(FormatToolBar, "fgoJovLeaGEydrHS8/G/OrAy7gE=");
_c = FormatToolBar;
function ToolBtn({ active, onClick, tooltip, children, disabled }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative group/tip",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onClick,
                disabled: disabled,
                className: `w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${disabled ? 'text-gray-300 cursor-not-allowed' : active ? 'bg-[#9F80DA]/15 text-[#9F80DA]' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`,
                children: children
            }, void 0, false, {
                fileName: "[project]/app/components/FormatToolBar.tsx",
                lineNumber: 465,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover/tip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 capitalize",
                children: tooltip
            }, void 0, false, {
                fileName: "[project]/app/components/FormatToolBar.tsx",
                lineNumber: 478,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/FormatToolBar.tsx",
        lineNumber: 464,
        columnNumber: 5
    }, this);
}
_c1 = ToolBtn;
function Sep() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-px h-8 bg-gray-200 mx-1"
    }, void 0, false, {
        fileName: "[project]/app/components/FormatToolBar.tsx",
        lineNumber: 486,
        columnNumber: 10
    }, this);
}
_c2 = Sep;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "FormatToolBar");
__turbopack_context__.k.register(_c1, "ToolBtn");
__turbopack_context__.k.register(_c2, "Sep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_components_fe308e10._.js.map