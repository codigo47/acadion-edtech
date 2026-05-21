(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/app/components/CoursePlayer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CoursePlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$lms$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/use-lms.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$CourseComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/project/[courseKey]/_components/CourseComponent.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$block$2d$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/block-styles.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
// ---- Time tracking ----
function useActiveTimer(onTick, intervalSeconds = 30) {
    _s();
    const accumulated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const lastActive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(Date.now());
    const timerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useActiveTimer.useEffect": ()=>{
            const handleVisibility = {
                "useActiveTimer.useEffect.handleVisibility": ()=>{
                    if (document.hidden) {
                        accumulated.current += Math.floor((Date.now() - lastActive.current) / 1000);
                    } else {
                        lastActive.current = Date.now();
                    }
                }
            }["useActiveTimer.useEffect.handleVisibility"];
            document.addEventListener('visibilitychange', handleVisibility);
            timerRef.current = setInterval({
                "useActiveTimer.useEffect": ()=>{
                    const delta = Math.floor((Date.now() - lastActive.current) / 1000);
                    const total = accumulated.current + delta;
                    if (total > 0) {
                        onTick(total);
                        accumulated.current = 0;
                        lastActive.current = Date.now();
                    }
                }
            }["useActiveTimer.useEffect"], intervalSeconds * 1000);
            return ({
                "useActiveTimer.useEffect": ()=>{
                    document.removeEventListener('visibilitychange', handleVisibility);
                    if (timerRef.current) clearInterval(timerRef.current);
                }
            })["useActiveTimer.useEffect"];
        }
    }["useActiveTimer.useEffect"], [
        onTick,
        intervalSeconds
    ]);
}
_s(useActiveTimer, "yiMqsIJ3GwRXx0JRlT99w1g66AE=");
// ---- Focus loss tracking ----
function useFocusLossTracker() {
    _s1();
    const count = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useFocusLossTracker.useEffect": ()=>{
            const handleVisibility = {
                "useFocusLossTracker.useEffect.handleVisibility": ()=>{
                    if (document.hidden) count.current++;
                }
            }["useFocusLossTracker.useEffect.handleVisibility"];
            const handleBlur = {
                "useFocusLossTracker.useEffect.handleBlur": ()=>{
                    count.current++;
                }
            }["useFocusLossTracker.useEffect.handleBlur"];
            document.addEventListener('visibilitychange', handleVisibility);
            window.addEventListener('blur', handleBlur);
            return ({
                "useFocusLossTracker.useEffect": ()=>{
                    document.removeEventListener('visibilitychange', handleVisibility);
                    window.removeEventListener('blur', handleBlur);
                }
            })["useFocusLossTracker.useEffect"];
        }
    }["useFocusLossTracker.useEffect"], []);
    const getAndReset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFocusLossTracker.useCallback[getAndReset]": ()=>{
            const val = count.current;
            count.current = 0;
            return val;
        }
    }["useFocusLossTracker.useCallback[getAndReset]"], []);
    return {
        getAndReset
    };
}
_s1(useFocusLossTracker, "cWXh4TyVnTdlXwKS2qplrKajm1M=");
// ---- Inactivity timer ----
function useInactivityTimer(timeoutMinutes = 5) {
    _s2();
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const timerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const resetTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useInactivityTimer.useCallback[resetTimer]": ()=>{
            if (timerRef.current) clearTimeout(timerRef.current);
            setShowModal(false);
            timerRef.current = setTimeout({
                "useInactivityTimer.useCallback[resetTimer]": ()=>{
                    setShowModal(true);
                }
            }["useInactivityTimer.useCallback[resetTimer]"], timeoutMinutes * 60 * 1000);
        }
    }["useInactivityTimer.useCallback[resetTimer]"], [
        timeoutMinutes
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useInactivityTimer.useEffect": ()=>{
            const events = [
                'mousemove',
                'keydown',
                'scroll',
                'touchstart',
                'click'
            ];
            events.forEach({
                "useInactivityTimer.useEffect": (e)=>document.addEventListener(e, resetTimer)
            }["useInactivityTimer.useEffect"]);
            resetTimer();
            return ({
                "useInactivityTimer.useEffect": ()=>{
                    events.forEach({
                        "useInactivityTimer.useEffect": (e)=>document.removeEventListener(e, resetTimer)
                    }["useInactivityTimer.useEffect"]);
                    if (timerRef.current) clearTimeout(timerRef.current);
                }
            })["useInactivityTimer.useEffect"];
        }
    }["useInactivityTimer.useEffect"], [
        resetTimer
    ]);
    return {
        showModal,
        dismiss: resetTimer
    };
}
_s2(useInactivityTimer, "4natpWOfL570V6B8dY56/XqAys8=");
// ---- Adaptive mode labels ----
const adaptiveModeLabels = {
    skip: 'Skipped (accredited)',
    check_only: 'Knowledge check only',
    full: 'Full content',
    extended: 'Extended content',
    deep: 'In-depth content'
};
// ---- Unit sidebar item ----
function UnitItem({ moduleNum, unit, isActive, isCompleted, isLocked, adaptiveMode, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: isLocked,
        className: `w-full text-left px-3 py-2.5 rounded-lg flex items-start gap-2.5 transition-all ${isActive ? 'bg-[#9F80DA]/10 border border-[#9F80DA]/30 text-[#1a1a1a]' : isLocked ? 'opacity-40 cursor-not-allowed text-gray-400' : 'hover:bg-gray-100 text-gray-700'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center border ${isCompleted ? 'bg-green-500 border-green-500' : isActive ? 'border-[#9F80DA] bg-[#9F80DA]/10' : 'border-gray-300'}`,
                children: isCompleted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-3 h-3 text-white",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 3,
                        d: "M5 13l4 4L19 7"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CoursePlayer.tsx",
                        lineNumber: 152,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/CoursePlayer.tsx",
                    lineNumber: 151,
                    columnNumber: 11
                }, this) : isLocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-3 h-3 text-gray-400",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CoursePlayer.tsx",
                        lineNumber: 156,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/CoursePlayer.tsx",
                    lineNumber: 155,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[10px] font-bold text-gray-400",
                    children: unit.code
                }, void 0, false, {
                    fileName: "[project]/app/components/CoursePlayer.tsx",
                    lineNumber: 159,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/CoursePlayer.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: `text-xs font-medium leading-tight ${isActive ? 'text-[#9F80DA]' : ''}`,
                        children: unit.title
                    }, void 0, false, {
                        fileName: "[project]/app/components/CoursePlayer.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] text-gray-400 mt-0.5",
                        children: [
                            "Unit ",
                            unit.code
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/CoursePlayer.tsx",
                        lineNumber: 166,
                        columnNumber: 9
                    }, this),
                    adaptiveMode && adaptiveMode !== 'full' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[9px] px-1.5 py-0.5 bg-purple-50 text-purple-600 rounded mt-1 inline-block",
                        children: adaptiveModeLabels[adaptiveMode] ?? adaptiveMode
                    }, void 0, false, {
                        fileName: "[project]/app/components/CoursePlayer.tsx",
                        lineNumber: 168,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/CoursePlayer.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/CoursePlayer.tsx",
        lineNumber: 132,
        columnNumber: 5
    }, this);
}
_c = UnitItem;
function CoursePlayer({ courseKey, backUrl, backLabel }) {
    _s3();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { data, isLoading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$lms$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLmsCourseContent"])(courseKey);
    const updateProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$lms$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLmsUpdateProgress"])(courseKey);
    const focusTracker = useFocusLossTracker();
    const { showModal: showInactivityModal, dismiss: dismissInactivity } = useInactivityTimer(5);
    const [sidebarOpen, setSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Current unit state
    const [activeUnitCode, setActiveUnitCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const mainContentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Build flat list of all units
    const allUnits = data?.proposedIndex?.modules.flatMap((m)=>m.units.map((u)=>({
                ...u,
                moduleNum: m.number,
                moduleTitle: m.title
            }))) ?? [];
    // Check if adaptive redirect needed (only for learn mode)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CoursePlayer.useEffect": ()=>{
            if (!data) return;
            if (data.isAdaptive && !data.adaptivePath && !data.enrollment.startedAt) {
                router.replace(`/lms/${courseKey}/pre-assessment`);
            }
        }
    }["CoursePlayer.useEffect"], [
        data,
        courseKey,
        router
    ]);
    // Set initial unit on load
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CoursePlayer.useEffect": ()=>{
            if (!data || activeUnitCode) return;
            const completedCodes = new Set(data.unitProgress.filter({
                "CoursePlayer.useEffect": (p)=>p.completedAt
            }["CoursePlayer.useEffect"]).map({
                "CoursePlayer.useEffect": (p)=>p.unitCode
            }["CoursePlayer.useEffect"]));
            const firstIncomplete = allUnits.find({
                "CoursePlayer.useEffect.firstIncomplete": (u)=>!completedCodes.has(u.code)
            }["CoursePlayer.useEffect.firstIncomplete"]);
            setActiveUnitCode(firstIncomplete?.code ?? allUnits[0]?.code ?? null);
        }
    }["CoursePlayer.useEffect"], [
        data
    ]);
    // Scroll to top when active unit changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CoursePlayer.useEffect": ()=>{
            if (activeUnitCode && mainContentRef.current) {
                mainContentRef.current.scrollTo(0, 0);
            }
        }
    }["CoursePlayer.useEffect"], [
        activeUnitCode
    ]);
    // Time tracking with focus loss
    const handleTimeTick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CoursePlayer.useCallback[handleTimeTick]": (seconds)=>{
            if (!activeUnitCode) return;
            const focusLoss = focusTracker.getAndReset();
            updateProgress.mutate({
                unitCode: activeUnitCode,
                timeSpentSeconds: seconds,
                focusLossCount: focusLoss > 0 ? focusLoss : undefined
            });
        }
    }["CoursePlayer.useCallback[handleTimeTick]"], [
        activeUnitCode,
        updateProgress,
        focusTracker
    ]);
    useActiveTimer(handleTimeTick);
    // Mark unit as complete and move to next
    const handleCompleteUnit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CoursePlayer.useCallback[handleCompleteUnit]": async ()=>{
            if (!activeUnitCode) return;
            await updateProgress.mutateAsync({
                unitCode: activeUnitCode,
                timeSpentSeconds: 0,
                completed: true
            });
            // Move to next non-skipped unit
            const currentIdx = allUnits.findIndex({
                "CoursePlayer.useCallback[handleCompleteUnit].currentIdx": (u)=>u.code === activeUnitCode
            }["CoursePlayer.useCallback[handleCompleteUnit].currentIdx"]);
            for(let i = currentIdx + 1; i < allUnits.length; i++){
                const adaptiveItem = data?.adaptivePath?.find({
                    "CoursePlayer.useCallback[handleCompleteUnit]": (a)=>a.unitCode === allUnits[i].code
                }["CoursePlayer.useCallback[handleCompleteUnit]"]);
                if (adaptiveItem?.mode !== 'skip') {
                    setActiveUnitCode(allUnits[i].code);
                    return;
                }
            }
            // If no more units, stay on last
            if (currentIdx < allUnits.length - 1) {
                setActiveUnitCode(allUnits[currentIdx + 1].code);
            }
        }
    }["CoursePlayer.useCallback[handleCompleteUnit]"], [
        activeUnitCode,
        allUnits,
        updateProgress,
        data
    ]);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-white flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-8 h-8 border-2 border-[#9F80DA] border-t-transparent rounded-full animate-spin"
            }, void 0, false, {
                fileName: "[project]/app/components/CoursePlayer.tsx",
                lineNumber: 273,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/CoursePlayer.tsx",
            lineNumber: 272,
            columnNumber: 7
        }, this);
    }
    if (error || !data) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-white flex flex-col items-center justify-center gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-500",
                    children: "Could not load course content."
                }, void 0, false, {
                    fileName: "[project]/app/components/CoursePlayer.tsx",
                    lineNumber: 281,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>router.push(backUrl),
                    className: "text-sm text-[#9F80DA] hover:underline",
                    children: backLabel
                }, void 0, false, {
                    fileName: "[project]/app/components/CoursePlayer.tsx",
                    lineNumber: 282,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/CoursePlayer.tsx",
            lineNumber: 280,
            columnNumber: 7
        }, this);
    }
    const completedCodes = new Set(data.unitProgress.filter((p)=>p.completedAt).map((p)=>p.unitCode));
    const lockedSet = new Set(data.lockedUnits ?? []);
    // Get adaptive mode for active unit
    const activeAdaptive = data.adaptivePath?.find((a)=>a.unitCode === activeUnitCode);
    // Active unit components
    const activeComponents = activeUnitCode ? data.componentsByUnit[activeUnitCode] ?? [] : [];
    // Progress stats
    const totalUnits = allUnits.length;
    const completedCount = completedCodes.size;
    const progressPct = totalUnits > 0 ? Math.round(completedCount / totalUnits * 100) : 0;
    // Is current unit already done?
    const isCurrentUnitDone = activeUnitCode ? completedCodes.has(activeUnitCode) : false;
    // Is this the last unit?
    const currentIdx = allUnits.findIndex((u)=>u.code === activeUnitCode);
    const isLastUnit = currentIdx === allUnits.length - 1;
    // Find active unit info
    const activeUnit = allUnits.find((u)=>u.code === activeUnitCode);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-screen bg-white font-[var(--font-onest)] flex flex-col overflow-hidden",
        children: [
            showInactivityModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl p-8 max-w-sm mx-4 text-center shadow-xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg font-semibold text-[#1a1a1a] mb-2",
                            children: "Are you still there?"
                        }, void 0, false, {
                            fileName: "[project]/app/components/CoursePlayer.tsx",
                            lineNumber: 327,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-500 mb-6",
                            children: "You have been inactive for a while."
                        }, void 0, false, {
                            fileName: "[project]/app/components/CoursePlayer.tsx",
                            lineNumber: 328,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: dismissInactivity,
                            className: "px-6 py-2.5 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white font-medium rounded-xl hover:from-[#8A6BC5] hover:to-[#7B5BB5] transition-all",
                            children: "I am here!"
                        }, void 0, false, {
                            fileName: "[project]/app/components/CoursePlayer.tsx",
                            lineNumber: 329,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/CoursePlayer.tsx",
                    lineNumber: 326,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/CoursePlayer.tsx",
                lineNumber: 325,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "bg-white border-b border-gray-200 px-3 md:px-4 py-2 md:py-3 flex items-center justify-between shadow-sm flex-shrink-0 z-10 gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 md:gap-3 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSidebarOpen(true),
                                className: "md:hidden p-2 hover:bg-gray-100 rounded transition-colors text-gray-600 flex-shrink-0",
                                "aria-label": "Open navigation",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M4 6h16M4 12h16M4 18h16"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/CoursePlayer.tsx",
                                        lineNumber: 349,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/CoursePlayer.tsx",
                                    lineNumber: 348,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/CoursePlayer.tsx",
                                lineNumber: 343,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push(backUrl),
                                className: "flex items-center gap-1.5 p-2 hover:bg-gray-100 rounded transition-colors text-sm text-gray-600 flex-shrink-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-4 h-4",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M15 19l-7-7 7-7"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/CoursePlayer.tsx",
                                            lineNumber: 357,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/CoursePlayer.tsx",
                                        lineNumber: 356,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden sm:inline",
                                        children: backLabel
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/CoursePlayer.tsx",
                                        lineNumber: 359,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/CoursePlayer.tsx",
                                lineNumber: 352,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-sm font-semibold text-[#1a1a1a] truncate",
                                children: data.courseTitle || 'Course'
                            }, void 0, false, {
                                fileName: "[project]/app/components/CoursePlayer.tsx",
                                lineNumber: 361,
                                columnNumber: 11
                            }, this),
                            data.isAdaptive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline text-[10px] px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-medium flex-shrink-0",
                                children: "Adaptive"
                            }, void 0, false, {
                                fileName: "[project]/app/components/CoursePlayer.tsx",
                                lineNumber: 365,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/CoursePlayer.tsx",
                        lineNumber: 341,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden sm:flex items-center gap-3 flex-1 mx-4 md:mx-8 max-w-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 h-2 bg-gray-100 rounded-full overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] rounded-full transition-all duration-500",
                                    style: {
                                        width: `${progressPct}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/components/CoursePlayer.tsx",
                                    lineNumber: 372,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/CoursePlayer.tsx",
                                lineNumber: 371,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-500 whitespace-nowrap",
                                children: [
                                    completedCount,
                                    "/",
                                    totalUnits
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/CoursePlayer.tsx",
                                lineNumber: 377,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/CoursePlayer.tsx",
                        lineNumber: 370,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 md:gap-3 flex-shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-400",
                                children: [
                                    progressPct,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/CoursePlayer.tsx",
                                lineNumber: 383,
                                columnNumber: 11
                            }, this),
                            data.isAdaptive && data.enrollment.completedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push(`/lms/${courseKey}/post-assessment`),
                                className: "hidden sm:inline text-xs text-[#9F80DA] hover:underline",
                                children: "Post-Assessment"
                            }, void 0, false, {
                                fileName: "[project]/app/components/CoursePlayer.tsx",
                                lineNumber: 385,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/CoursePlayer.tsx",
                        lineNumber: 382,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/CoursePlayer.tsx",
                lineNumber: 340,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sm:hidden bg-white border-b border-gray-100 px-3 py-1.5 flex-shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-1.5 bg-gray-100 rounded-full overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-full bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] rounded-full transition-all duration-500",
                        style: {
                            width: `${progressPct}%`
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/components/CoursePlayer.tsx",
                        lineNumber: 398,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/CoursePlayer.tsx",
                    lineNumber: 397,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/CoursePlayer.tsx",
                lineNumber: 396,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "hidden md:block w-72 bg-gray-50 border-r border-gray-200 overflow-y-auto flex-shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4",
                            children: data.proposedIndex?.modules.map((module)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-semibold text-gray-500 uppercase tracking-wide px-1 mb-2",
                                            children: [
                                                "Module ",
                                                module.number,
                                                " · ",
                                                module.title
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/CoursePlayer.tsx",
                                            lineNumber: 411,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: module.units.map((unit)=>{
                                                const isLocked = lockedSet.has(unit.code);
                                                const adaptiveItem = data.adaptivePath?.find((a)=>a.unitCode === unit.code);
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UnitItem, {
                                                    moduleNum: module.number,
                                                    unit: unit,
                                                    isActive: activeUnitCode === unit.code,
                                                    isCompleted: completedCodes.has(unit.code),
                                                    isLocked: isLocked,
                                                    adaptiveMode: adaptiveItem?.mode,
                                                    onClick: ()=>setActiveUnitCode(unit.code)
                                                }, unit.code, false, {
                                                    fileName: "[project]/app/components/CoursePlayer.tsx",
                                                    lineNumber: 420,
                                                    columnNumber: 23
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/CoursePlayer.tsx",
                                            lineNumber: 414,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, module.number, true, {
                                    fileName: "[project]/app/components/CoursePlayer.tsx",
                                    lineNumber: 410,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/components/CoursePlayer.tsx",
                            lineNumber: 408,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/CoursePlayer.tsx",
                        lineNumber: 407,
                        columnNumber: 9
                    }, this),
                    sidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 z-40 md:hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-black/40",
                                onClick: ()=>setSidebarOpen(false)
                            }, void 0, false, {
                                fileName: "[project]/app/components/CoursePlayer.tsx",
                                lineNumber: 441,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                className: "absolute inset-y-0 left-0 w-72 max-w-[80vw] bg-gray-50 shadow-xl overflow-y-auto animate-slide-in-left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between p-4 border-b border-gray-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-semibold text-[#1a1a1a]",
                                                children: "Course Navigation"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/CoursePlayer.tsx",
                                                lineNumber: 444,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setSidebarOpen(false),
                                                className: "p-1.5 hover:bg-gray-200 rounded transition-colors",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-5 h-5 text-gray-500",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M6 18L18 6M6 6l12 12"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/CoursePlayer.tsx",
                                                        lineNumber: 447,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/CoursePlayer.tsx",
                                                    lineNumber: 446,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/CoursePlayer.tsx",
                                                lineNumber: 445,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/CoursePlayer.tsx",
                                        lineNumber: 443,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4",
                                        children: data.proposedIndex?.modules.map((module)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs font-semibold text-gray-500 uppercase tracking-wide px-1 mb-2",
                                                        children: [
                                                            "Module ",
                                                            module.number,
                                                            " · ",
                                                            module.title
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/CoursePlayer.tsx",
                                                        lineNumber: 454,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-1",
                                                        children: module.units.map((unit)=>{
                                                            const isLocked = lockedSet.has(unit.code);
                                                            const adaptiveItem = data.adaptivePath?.find((a)=>a.unitCode === unit.code);
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UnitItem, {
                                                                moduleNum: module.number,
                                                                unit: unit,
                                                                isActive: activeUnitCode === unit.code,
                                                                isCompleted: completedCodes.has(unit.code),
                                                                isLocked: isLocked,
                                                                adaptiveMode: adaptiveItem?.mode,
                                                                onClick: ()=>{
                                                                    setActiveUnitCode(unit.code);
                                                                    setSidebarOpen(false);
                                                                }
                                                            }, unit.code, false, {
                                                                fileName: "[project]/app/components/CoursePlayer.tsx",
                                                                lineNumber: 463,
                                                                columnNumber: 27
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/CoursePlayer.tsx",
                                                        lineNumber: 457,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, module.number, true, {
                                                fileName: "[project]/app/components/CoursePlayer.tsx",
                                                lineNumber: 453,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/CoursePlayer.tsx",
                                        lineNumber: 451,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/CoursePlayer.tsx",
                                lineNumber: 442,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/CoursePlayer.tsx",
                        lineNumber: 440,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        ref: mainContentRef,
                        className: "flex-1 overflow-y-auto bg-white",
                        children: activeUnit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-3xl mx-auto px-3 sm:px-6 py-4 sm:py-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-400 uppercase tracking-wide mb-1",
                                            children: [
                                                "Unit ",
                                                activeUnit.code
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/CoursePlayer.tsx",
                                            lineNumber: 492,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl font-bold text-[#1a1a1a]",
                                            children: activeUnit.title
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/CoursePlayer.tsx",
                                            lineNumber: 495,
                                            columnNumber: 17
                                        }, this),
                                        activeAdaptive && activeAdaptive.mode !== 'full' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex items-center gap-1 mt-2 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full",
                                            children: adaptiveModeLabels[activeAdaptive.mode]
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/CoursePlayer.tsx",
                                            lineNumber: 497,
                                            columnNumber: 19
                                        }, this),
                                        isCurrentUnitDone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex items-center gap-1 mt-2 ml-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-3 h-3",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2.5,
                                                        d: "M5 13l4 4L19 7"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/CoursePlayer.tsx",
                                                        lineNumber: 504,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/CoursePlayer.tsx",
                                                    lineNumber: 503,
                                                    columnNumber: 21
                                                }, this),
                                                "Completed"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/CoursePlayer.tsx",
                                            lineNumber: 502,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/CoursePlayer.tsx",
                                    lineNumber: 491,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6",
                                    children: activeAdaptive?.mode === 'skip' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-20 text-gray-400",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-lg font-semibold mb-2",
                                                children: "Unit Accredited"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/CoursePlayer.tsx",
                                                lineNumber: 515,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "You indicated high confidence in this topic. It has been marked complete."
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/CoursePlayer.tsx",
                                                lineNumber: 516,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/CoursePlayer.tsx",
                                        lineNumber: 514,
                                        columnNumber: 19
                                    }, this) : activeComponents.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-20 text-gray-400",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: "Content is being generated for this unit."
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/CoursePlayer.tsx",
                                            lineNumber: 520,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/CoursePlayer.tsx",
                                        lineNumber: 519,
                                        columnNumber: 19
                                    }, this) : activeComponents.map((comp, idx)=>{
                                        const BlockComponent = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$CourseComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockComponents"][comp.component];
                                        if (!BlockComponent) {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 bg-yellow-50 border border-yellow-200 rounded-lg",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-yellow-700 text-sm",
                                                    children: [
                                                        "Unknown component: ",
                                                        comp.component
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/CoursePlayer.tsx",
                                                    lineNumber: 528,
                                                    columnNumber: 27
                                                }, this)
                                            }, idx, false, {
                                                fileName: "[project]/app/components/CoursePlayer.tsx",
                                                lineNumber: 527,
                                                columnNumber: 25
                                            }, this);
                                        }
                                        const contentData = comp.content;
                                        const bStyles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$block$2d$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["blockStylesToCss"])(contentData.blockStyles);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: bStyles,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BlockComponent, {
                                                ...contentData
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/CoursePlayer.tsx",
                                                lineNumber: 536,
                                                columnNumber: 25
                                            }, this)
                                        }, idx, false, {
                                            fileName: "[project]/app/components/CoursePlayer.tsx",
                                            lineNumber: 535,
                                            columnNumber: 23
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/components/CoursePlayer.tsx",
                                    lineNumber: 512,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                if (currentIdx > 0) setActiveUnitCode(allUnits[currentIdx - 1].code);
                                            },
                                            disabled: currentIdx === 0,
                                            className: "flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-[#9F80DA] disabled:opacity-30 transition-colors order-2 sm:order-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-4 h-4",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M15 19l-7-7 7-7"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/CoursePlayer.tsx",
                                                        lineNumber: 554,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/CoursePlayer.tsx",
                                                    lineNumber: 553,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "truncate max-w-[150px] sm:max-w-[200px]",
                                                    children: currentIdx > 0 ? allUnits[currentIdx - 1].title : 'Previous'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/CoursePlayer.tsx",
                                                    lineNumber: 556,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/CoursePlayer.tsx",
                                            lineNumber: 546,
                                            columnNumber: 17
                                        }, this),
                                        isLastUnit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleCompleteUnit,
                                            disabled: isCurrentUnitDone || updateProgress.isPending,
                                            className: "flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow hover:from-green-600 hover:to-green-700 disabled:opacity-50 transition-all order-1 sm:order-2",
                                            children: isCurrentUnitDone ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-4 h-4",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2.5,
                                                            d: "M5 13l4 4L19 7"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/CoursePlayer.tsx",
                                                            lineNumber: 571,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/CoursePlayer.tsx",
                                                        lineNumber: 570,
                                                        columnNumber: 25
                                                    }, this),
                                                    "Course Complete!"
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    "Finish Course",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-4 h-4",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M5 13l4 4L19 7"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/CoursePlayer.tsx",
                                                            lineNumber: 579,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/CoursePlayer.tsx",
                                                        lineNumber: 578,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/CoursePlayer.tsx",
                                            lineNumber: 563,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleCompleteUnit,
                                            disabled: updateProgress.isPending,
                                            className: "flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white font-semibold rounded-xl shadow hover:from-[#8A6BC5] hover:to-[#7B5BB5] disabled:opacity-50 transition-all order-1 sm:order-2",
                                            children: [
                                                isCurrentUnitDone ? 'Next Unit' : 'Complete & Continue',
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-4 h-4",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M9 5l7 7-7 7"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/CoursePlayer.tsx",
                                                        lineNumber: 592,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/CoursePlayer.tsx",
                                                    lineNumber: 591,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/CoursePlayer.tsx",
                                            lineNumber: 585,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/CoursePlayer.tsx",
                                    lineNumber: 544,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/CoursePlayer.tsx",
                            lineNumber: 489,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/CoursePlayer.tsx",
                        lineNumber: 487,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/CoursePlayer.tsx",
                lineNumber: 405,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/CoursePlayer.tsx",
        lineNumber: 322,
        columnNumber: 5
    }, this);
}
_s3(CoursePlayer, "63oF4BVd3/9MaDOMNntpqtoxWOA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$lms$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLmsCourseContent"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$lms$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLmsUpdateProgress"],
        useFocusLossTracker,
        useInactivityTimer,
        useActiveTimer
    ];
});
_c1 = CoursePlayer;
var _c, _c1;
__turbopack_context__.k.register(_c, "UnitItem");
__turbopack_context__.k.register(_c1, "CoursePlayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_components_2a83f0c8._.js.map