module.exports = [
"[project]/app/project/[courseKey]/_components/EditableText.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditableText",
    ()=>EditableText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function EditableText({ value, onChange, tag: Tag = 'div', className = '', style, placeholder = 'Click to edit...', multiline = true }) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const idleTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const lastValueRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(value);
    const isMountedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Set content on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (ref.current && !isMountedRef.current) {
            ref.current.textContent = value || '';
            lastValueRef.current = value;
            isMountedRef.current = true;
        }
    }, [
        value
    ]);
    // Update content when value changes externally (not during editing)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (ref.current && isMountedRef.current && document.activeElement !== ref.current) {
            if (ref.current.textContent !== value) {
                ref.current.textContent = value || '';
                lastValueRef.current = value;
            }
        }
    }, [
        value
    ]);
    const save = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (ref.current) {
            const text = ref.current.textContent || '';
            if (text !== lastValueRef.current) {
                lastValueRef.current = text;
                onChange(text);
            }
        }
    }, [
        onChange
    ]);
    const handleInput = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(save, 2000);
    }, [
        save
    ]);
    const handleBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        save();
    }, [
        save
    ]);
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        if (!multiline && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    }, [
        multiline
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        [data-editable-placeholder]:empty:before {
          content: attr(data-editable-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableText.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
                ref: ref,
                contentEditable: true,
                suppressContentEditableWarning: true,
                onInput: handleInput,
                onBlur: handleBlur,
                onKeyDown: handleKeyDown,
                className: `outline-none focus:ring-2 focus:ring-[#9F80DA]/30 focus:rounded-sm transition-shadow ${className}`,
                style: style,
                spellCheck: false,
                "data-editable-placeholder": placeholder
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableText.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/app/project/[courseKey]/_components/ImageCropModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImageCropModal",
    ()=>ImageCropModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$image$2d$crop$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-image-crop/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Crop$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/crop.js [app-ssr] (ecmascript) <export default as Crop>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-cw.js [app-ssr] (ecmascript) <export default as RotateCw>");
'use client';
;
;
;
;
;
const ASPECT_PRESETS = [
    {
        label: 'Free',
        value: 0
    },
    {
        label: '16:9',
        value: 16 / 9
    },
    {
        label: '4:3',
        value: 4 / 3
    },
    {
        label: '1:1',
        value: 1
    },
    {
        label: '3:4',
        value: 3 / 4
    }
];
function getCroppedImg(image, pixelCrop, rotation = 0) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('No canvas context');
    const radians = rotation * Math.PI / 180;
    const sin = Math.abs(Math.sin(radians));
    const cos = Math.abs(Math.cos(radians));
    const bBoxWidth = image.naturalWidth * cos + image.naturalHeight * sin;
    const bBoxHeight = image.naturalWidth * sin + image.naturalHeight * cos;
    // Draw rotated full image onto temp canvas
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) throw new Error('No canvas context');
    tempCanvas.width = bBoxWidth;
    tempCanvas.height = bBoxHeight;
    tempCtx.translate(bBoxWidth / 2, bBoxHeight / 2);
    tempCtx.rotate(radians);
    tempCtx.translate(-image.naturalWidth / 2, -image.naturalHeight / 2);
    tempCtx.drawImage(image, 0, 0);
    // Scale pixel crop from displayed size to natural size
    const scaleX = (rotation % 180 === 0 ? image.naturalWidth : bBoxWidth) / image.width;
    const scaleY = (rotation % 180 === 0 ? image.naturalHeight : bBoxHeight) / image.height;
    const sx = pixelCrop.x * scaleX;
    const sy = pixelCrop.y * scaleY;
    const sw = pixelCrop.width * scaleX;
    const sh = pixelCrop.height * scaleY;
    canvas.width = sw;
    canvas.height = sh;
    if (rotation === 0) {
        ctx.drawImage(image, sx, sy, sw, sh, 0, 0, sw, sh);
    } else {
        ctx.drawImage(tempCanvas, sx, sy, sw, sh, 0, 0, sw, sh);
    }
    return canvas.toDataURL('image/jpeg', 0.9);
}
function ImageCropModal({ imageUrl, aspectRatio: initialAspect, onCropComplete, onClose, onSkipCrop, isUploading }) {
    const [crop, setCrop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])();
    const [completedCrop, setCompletedCrop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])();
    const [rotation, setRotation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [activeAspect, setActiveAspect] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialAspect || 0);
    const imgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKeyDown = (e)=>{
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return ()=>document.removeEventListener('keydown', handleKeyDown);
    }, [
        onClose
    ]);
    const onImageLoad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        const { width, height } = e.currentTarget;
        const aspect = activeAspect || undefined;
        const initialCrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$image$2d$crop$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["centerCrop"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$image$2d$crop$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeAspectCrop"])({
            unit: '%',
            width: 80
        }, aspect || width / height, width, height), width, height);
        setCrop(initialCrop);
    }, [
        activeAspect
    ]);
    const handleAspectChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((value)=>{
        setActiveAspect(value);
        if (imgRef.current) {
            const { width, height } = imgRef.current;
            const aspect = value || undefined;
            const newCrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$image$2d$crop$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["centerCrop"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$image$2d$crop$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeAspectCrop"])({
                unit: '%',
                width: 80
            }, aspect || width / height, width, height), width, height);
            setCrop(newCrop);
        }
    }, []);
    const handleRotate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setRotation((prev)=>(prev + 90) % 360);
    }, []);
    const handleApply = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (completedCrop && imgRef.current) {
            try {
                const dataUrl = getCroppedImg(imgRef.current, completedCrop, rotation);
                const area = {
                    x: completedCrop.x,
                    y: completedCrop.y,
                    width: completedCrop.width,
                    height: completedCrop.height
                };
                onCropComplete(area, dataUrl);
            } catch  {
                if (completedCrop) {
                    onCropComplete({
                        x: completedCrop.x,
                        y: completedCrop.y,
                        width: completedCrop.width,
                        height: completedCrop.height
                    });
                }
            }
        }
    }, [
        completedCrop,
        imgRef,
        rotation,
        onCropComplete
    ]);
    const cropAspect = activeAspect === 0 ? undefined : activeAspect;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[80] flex items-center justify-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/50 backdrop-blur-sm",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/ImageCropModal.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden mx-4 flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-6 py-4 border-b border-gray-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Crop$3e$__["Crop"], {
                                        className: "w-5 h-5 text-[#9F80DA]"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/ImageCropModal.tsx",
                                        lineNumber: 163,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-gray-900",
                                        children: "Crop Image"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/ImageCropModal.tsx",
                                        lineNumber: 164,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/project/[courseKey]/_components/ImageCropModal.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/ImageCropModal.tsx",
                                    lineNumber: 170,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/ImageCropModal.tsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/ImageCropModal.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-auto flex items-center justify-center bg-gray-100 p-4",
                        style: {
                            maxHeight: 450
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$image$2d$crop$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            crop: crop,
                            onChange: (_, percentCrop)=>setCrop(percentCrop),
                            onComplete: (c)=>setCompletedCrop(c),
                            aspect: cropAspect,
                            className: "max-h-full",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                ref: imgRef,
                                src: imageUrl,
                                alt: "Crop",
                                onLoad: onImageLoad,
                                crossOrigin: "anonymous",
                                style: {
                                    maxHeight: 420,
                                    transform: rotation ? `rotate(${rotation}deg)` : undefined
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/ImageCropModal.tsx",
                                lineNumber: 183,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/ImageCropModal.tsx",
                            lineNumber: 176,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/ImageCropModal.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-6 py-3 border-t border-gray-200",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4 flex-wrap",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleRotate,
                                    title: `Rotation: ${rotation}°`,
                                    className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 hover:text-gray-800 transition-colors text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__["RotateCw"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/ImageCropModal.tsx",
                                            lineNumber: 206,
                                            columnNumber: 15
                                        }, this),
                                        rotation,
                                        "°"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/ImageCropModal.tsx",
                                    lineNumber: 201,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-px h-5 bg-gray-200"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/ImageCropModal.tsx",
                                    lineNumber: 210,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1",
                                    children: ASPECT_PRESETS.map((preset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleAspectChange(preset.value),
                                            className: `px-2.5 py-1 rounded text-xs font-medium transition-colors ${activeAspect === preset.value ? 'bg-[#9F80DA] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'}`,
                                            children: preset.label
                                        }, preset.label, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/ImageCropModal.tsx",
                                            lineNumber: 215,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/ImageCropModal.tsx",
                                    lineNumber: 213,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/ImageCropModal.tsx",
                            lineNumber: 199,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/ImageCropModal.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200",
                        children: [
                            onSkipCrop && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onSkipCrop,
                                className: "px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors",
                                children: "Use as is"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/ImageCropModal.tsx",
                                lineNumber: 234,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors",
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/ImageCropModal.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleApply,
                                disabled: !completedCrop || isUploading,
                                className: "px-5 py-2 text-sm font-medium text-white bg-[#9F80DA] hover:bg-[#8A6BC5] rounded-lg transition-colors disabled:opacity-50",
                                children: isUploading ? 'Uploading...' : 'Apply Crop'
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/ImageCropModal.tsx",
                                lineNumber: 247,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/ImageCropModal.tsx",
                        lineNumber: 232,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/ImageCropModal.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/ImageCropModal.tsx",
        lineNumber: 156,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/project/[courseKey]/_components/ImagePickerModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImagePickerModal",
    ()=>ImagePickerModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/link.js [app-ssr] (ecmascript) <export default as Link>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-ssr] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Crop$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/crop.js [app-ssr] (ecmascript) <export default as Crop>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$ImageCropModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/project/[courseKey]/_components/ImageCropModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$upload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/use-upload.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ToastProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ToastProvider.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function dataUrlToBlob(dataUrl) {
    const [header, base64] = dataUrl.split(',');
    const mime = header.match(/:(.*?);/)?.[1] || 'image/jpeg';
    const bytes = atob(base64);
    const array = new Uint8Array(bytes.length);
    for(let i = 0; i < bytes.length; i++){
        array[i] = bytes.charCodeAt(i);
    }
    return new Blob([
        array
    ], {
        type: mime
    });
}
const PLACEHOLDER_IMAGES = [
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop'
];
function ImagePickerModal({ currentUrl, onSelect, onClose }) {
    const [urlInput, setUrlInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(currentUrl || '');
    const [cropImage, setCropImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isUploading, setIsUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const uploadImage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$upload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUploadImage"])();
    const { showToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ToastProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKeyDown = (e)=>{
            if (e.key === 'Escape') {
                if (cropImage) {
                    setCropImage(null);
                } else {
                    onClose();
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return ()=>document.removeEventListener('keydown', handleKeyDown);
    }, [
        onClose,
        cropImage
    ]);
    const handleImageSelected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((url)=>{
        setCropImage(url);
    }, []);
    const handleCropComplete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (croppedArea, croppedDataUrl)=>{
        if (!cropImage) return;
        const imageToUse = croppedDataUrl || cropImage;
        if (imageToUse.startsWith('data:')) {
            setIsUploading(true);
            try {
                const blob = dataUrlToBlob(imageToUse);
                const { url } = await uploadImage.mutateAsync(blob);
                onSelect(url, {
                    x: croppedArea.x,
                    y: croppedArea.y,
                    width: croppedArea.width,
                    height: croppedArea.height
                });
                onClose();
            } catch  {
                showToast('Failed to upload image', 'error');
            } finally{
                setIsUploading(false);
            }
            return;
        }
        onSelect(imageToUse, {
            x: croppedArea.x,
            y: croppedArea.y,
            width: croppedArea.width,
            height: croppedArea.height
        });
        onClose();
    }, [
        cropImage,
        onSelect,
        onClose,
        uploadImage,
        showToast
    ]);
    const handleSkipCrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (cropImage) {
            onSelect(cropImage);
            onClose();
        }
    }, [
        cropImage,
        onSelect,
        onClose
    ]);
    // Show crop modal when an image is selected
    if (cropImage) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$ImageCropModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ImageCropModal"], {
            imageUrl: cropImage,
            onCropComplete: handleCropComplete,
            onClose: ()=>setCropImage(null),
            onSkipCrop: handleSkipCrop,
            isUploading: isUploading
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/ImagePickerModal.tsx",
            lineNumber: 109,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/50 backdrop-blur-sm",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/ImagePickerModal.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden mx-4 flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-6 py-4 border-b border-gray-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                        className: "w-5 h-5 text-[#9F80DA]"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/ImagePickerModal.tsx",
                                        lineNumber: 127,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-gray-900",
                                        children: "Select Image"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/ImagePickerModal.tsx",
                                        lineNumber: 128,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/project/[courseKey]/_components/ImagePickerModal.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/ImagePickerModal.tsx",
                                    lineNumber: 134,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/ImagePickerModal.tsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/ImagePickerModal.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-6 pt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "Image URL"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/ImagePickerModal.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#9F80DA]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__["Link"], {
                                                className: "w-4 h-4 text-gray-400 ml-3"
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/ImagePickerModal.tsx",
                                                lineNumber: 143,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "url",
                                                value: urlInput,
                                                onChange: (e)=>setUrlInput(e.target.value),
                                                className: "flex-1 px-3 py-2 text-sm focus:outline-none",
                                                placeholder: "https://example.com/image.jpg"
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/ImagePickerModal.tsx",
                                                lineNumber: 144,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/project/[courseKey]/_components/ImagePickerModal.tsx",
                                        lineNumber: 142,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            if (urlInput.trim()) {
                                                handleImageSelected(urlInput.trim());
                                            }
                                        },
                                        disabled: !urlInput.trim(),
                                        className: "px-4 py-2 text-sm font-medium text-white bg-[#9F80DA] hover:bg-[#8A6BC5] rounded-lg transition-colors disabled:opacity-50 flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Crop$3e$__["Crop"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/ImagePickerModal.tsx",
                                                lineNumber: 161,
                                                columnNumber: 15
                                            }, this),
                                            "Use URL"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/project/[courseKey]/_components/ImagePickerModal.tsx",
                                        lineNumber: 152,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/project/[courseKey]/_components/ImagePickerModal.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/ImagePickerModal.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500 mb-3",
                                children: "Or select a placeholder image:"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/ImagePickerModal.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-4 gap-3",
                                children: PLACEHOLDER_IMAGES.map((url, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleImageSelected(url),
                                        className: `relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all hover:shadow-md ${currentUrl === url ? 'border-[#9F80DA] ring-2 ring-[#9F80DA]/20' : 'border-gray-200 hover:border-[#9F80DA]'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: url,
                                            alt: `Placeholder ${idx + 1}`,
                                            className: "w-full h-full object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/ImagePickerModal.tsx",
                                            lineNumber: 181,
                                            columnNumber: 17
                                        }, this)
                                    }, idx, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/ImagePickerModal.tsx",
                                        lineNumber: 172,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/ImagePickerModal.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/ImagePickerModal.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/ImagePickerModal.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/ImagePickerModal.tsx",
        lineNumber: 120,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/project/[courseKey]/_components/CourseComponent.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BlockComponents",
    ()=>BlockComponents,
    "CourseComponent",
    ()=>CourseComponent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ParagraphBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ParagraphBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ParagraphBlock.tsx [app-ssr] (ecmascript) <export default as ParagraphBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ParagraphWithHeadingBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ParagraphWithHeadingBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ParagraphWithHeadingBlock.tsx [app-ssr] (ecmascript) <export default as ParagraphWithHeadingBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ParagraphWithSubheadingBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ParagraphWithSubheadingBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ParagraphWithSubheadingBlock.tsx [app-ssr] (ecmascript) <export default as ParagraphWithSubheadingBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HeadingBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HeadingBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/HeadingBlock.tsx [app-ssr] (ecmascript) <export default as HeadingBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SubheadingBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SubheadingBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/SubheadingBlock.tsx [app-ssr] (ecmascript) <export default as SubheadingBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HighlightBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/HighlightBlock.tsx [app-ssr] (ecmascript) <export default as HighlightBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightNoteBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HighlightNoteBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/HighlightNoteBlock.tsx [app-ssr] (ecmascript) <export default as HighlightNoteBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightColumnBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HighlightColumnBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/HighlightColumnBlock.tsx [app-ssr] (ecmascript) <export default as HighlightColumnBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightCenterLineBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HighlightCenterLineBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/HighlightCenterLineBlock.tsx [app-ssr] (ecmascript) <export default as HighlightCenterLineBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightLeftLineBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HighlightLeftLineBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/HighlightLeftLineBlock.tsx [app-ssr] (ecmascript) <export default as HighlightLeftLineBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightBackgroundBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HighlightBackgroundBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/HighlightBackgroundBlock.tsx [app-ssr] (ecmascript) <export default as HighlightBackgroundBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ImageBlock.tsx [app-ssr] (ecmascript) <export default as ImageBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageWithTextBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ImageWithTextBlock.tsx [app-ssr] (ecmascript) <export default as ImageWithTextBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextLeftBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageWithTextLeftBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ImageWithTextLeftBlock.tsx [app-ssr] (ecmascript) <export default as ImageWithTextLeftBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextCenterBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageWithTextCenterBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ImageWithTextCenterBlock.tsx [app-ssr] (ecmascript) <export default as ImageWithTextCenterBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextBottomBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageWithTextBottomBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ImageWithTextBottomBlock.tsx [app-ssr] (ecmascript) <export default as ImageWithTextBottomBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextTopBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageWithTextTopBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ImageWithTextTopBlock.tsx [app-ssr] (ecmascript) <export default as ImageWithTextTopBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__QuoteBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/QuoteBlock.tsx [app-ssr] (ecmascript) <export default as QuoteBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteCenterBorderBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__QuoteCenterBorderBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/QuoteCenterBorderBlock.tsx [app-ssr] (ecmascript) <export default as QuoteCenterBorderBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteCenterLightBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__QuoteCenterLightBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/QuoteCenterLightBlock.tsx [app-ssr] (ecmascript) <export default as QuoteCenterLightBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteLeftLightBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__QuoteLeftLightBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/QuoteLeftLightBlock.tsx [app-ssr] (ecmascript) <export default as QuoteLeftLightBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteLeftBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__QuoteLeftBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/QuoteLeftBlock.tsx [app-ssr] (ecmascript) <export default as QuoteLeftBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteImageBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__QuoteImageBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/QuoteImageBlock.tsx [app-ssr] (ecmascript) <export default as QuoteImageBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ComparisonBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ComparisonBlock.tsx [app-ssr] (ecmascript) <export default as ComparisonBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonProsConsBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ComparisonProsConsBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ComparisonProsConsBlock.tsx [app-ssr] (ecmascript) <export default as ComparisonProsConsBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonCauseEffectBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ComparisonCauseEffectBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ComparisonCauseEffectBlock.tsx [app-ssr] (ecmascript) <export default as ComparisonCauseEffectBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonDosDontsBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ComparisonDosDontsBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ComparisonDosDontsBlock.tsx [app-ssr] (ecmascript) <export default as ComparisonDosDontsBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonMythFactBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ComparisonMythFactBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ComparisonMythFactBlock.tsx [app-ssr] (ecmascript) <export default as ComparisonMythFactBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonBeforeAfterBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ComparisonBeforeAfterBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ComparisonBeforeAfterBlock.tsx [app-ssr] (ecmascript) <export default as ComparisonBeforeAfterBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ChatBlock.tsx [app-ssr] (ecmascript) <export default as ChatBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatFeedbackBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatFeedbackBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ChatFeedbackBlock.tsx [app-ssr] (ecmascript) <export default as ChatFeedbackBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatQABlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatQABlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ChatQABlock.tsx [app-ssr] (ecmascript) <export default as ChatQABlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatQuestionWallBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatQuestionWallBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ChatQuestionWallBlock.tsx [app-ssr] (ecmascript) <export default as ChatQuestionWallBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatDialogBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatDialogBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ChatDialogBlock.tsx [app-ssr] (ecmascript) <export default as ChatDialogBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TableBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/TableBlock.tsx [app-ssr] (ecmascript) <export default as TableBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ListBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ListBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ListBlock.tsx [app-ssr] (ecmascript) <export default as ListBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$GalleryBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GalleryBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/GalleryBlock.tsx [app-ssr] (ecmascript) <export default as GalleryBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$GraphBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GraphBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/GraphBlock.tsx [app-ssr] (ecmascript) <export default as GraphBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TimelineBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TimelineBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/TimelineBlock.tsx [app-ssr] (ecmascript) <export default as TimelineBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SeparatorBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SeparatorBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/SeparatorBlock.tsx [app-ssr] (ecmascript) <export default as SeparatorBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TestimonialBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TestimonialBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/TestimonialBlock.tsx [app-ssr] (ecmascript) <export default as TestimonialBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$StoryTellingBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__StoryTellingBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/StoryTellingBlock.tsx [app-ssr] (ecmascript) <export default as StoryTellingBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ColumnsBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ColumnsBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ColumnsBlock.tsx [app-ssr] (ecmascript) <export default as ColumnsBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ReviewsBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ReviewsBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ReviewsBlock.tsx [app-ssr] (ecmascript) <export default as ReviewsBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$VideoBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__VideoBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/VideoBlock.tsx [app-ssr] (ecmascript) <export default as VideoBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$AudioBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AudioBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/AudioBlock.tsx [app-ssr] (ecmascript) <export default as AudioBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$AttachmentBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AttachmentBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/AttachmentBlock.tsx [app-ssr] (ecmascript) <export default as AttachmentBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$EmbedBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EmbedBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/EmbedBlock.tsx [app-ssr] (ecmascript) <export default as EmbedBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$CheckboxBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckboxBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/CheckboxBlock.tsx [app-ssr] (ecmascript) <export default as CheckboxBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$CarouselBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CarouselBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/CarouselBlock.tsx [app-ssr] (ecmascript) <export default as CarouselBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$AccordionBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AccordionBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/AccordionBlock.tsx [app-ssr] (ecmascript) <export default as AccordionBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TabsBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TabsBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/TabsBlock.tsx [app-ssr] (ecmascript) <export default as TabsBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$LabeledImageBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LabeledImageBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/LabeledImageBlock.tsx [app-ssr] (ecmascript) <export default as LabeledImageBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ScenarioBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ScenarioBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ScenarioBlock.tsx [app-ssr] (ecmascript) <export default as ScenarioBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SortingBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SortingBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/SortingBlock.tsx [app-ssr] (ecmascript) <export default as SortingBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SortingStepsBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SortingStepsBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/SortingStepsBlock.tsx [app-ssr] (ecmascript) <export default as SortingStepsBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$FlashCardBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FlashCardBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/FlashCardBlock.tsx [app-ssr] (ecmascript) <export default as FlashCardBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$MultipleChoiceBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MultipleChoiceBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/MultipleChoiceBlock.tsx [app-ssr] (ecmascript) <export default as MultipleChoiceBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$MultipleResponseBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MultipleResponseBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/MultipleResponseBlock.tsx [app-ssr] (ecmascript) <export default as MultipleResponseBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$FillInTheBlankBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FillInTheBlankBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/FillInTheBlankBlock.tsx [app-ssr] (ecmascript) <export default as FillInTheBlankBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$MatchingPairsBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MatchingPairsBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/MatchingPairsBlock.tsx [app-ssr] (ecmascript) <export default as MatchingPairsBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ButtonBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ButtonBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ButtonBlock.tsx [app-ssr] (ecmascript) <export default as ButtonBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ButtonStackBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ButtonStackBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ButtonStackBlock.tsx [app-ssr] (ecmascript) <export default as ButtonStackBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$BannerBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BannerBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/BannerBlock.tsx [app-ssr] (ecmascript) <export default as BannerBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$block$2d$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/block-styles.ts [app-ssr] (ecmascript)");
;
;
;
const BlockComponents = {
    // Paragraph Blocks
    ParagraphBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ParagraphBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ParagraphBlock$3e$__["ParagraphBlock"],
    ParagraphWithHeadingBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ParagraphWithHeadingBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ParagraphWithHeadingBlock$3e$__["ParagraphWithHeadingBlock"],
    ParagraphWithSubheadingBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ParagraphWithSubheadingBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ParagraphWithSubheadingBlock$3e$__["ParagraphWithSubheadingBlock"],
    // Heading Blocks
    HeadingBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HeadingBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HeadingBlock$3e$__["HeadingBlock"],
    SubheadingBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SubheadingBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SubheadingBlock$3e$__["SubheadingBlock"],
    // Highlight Blocks
    HighlightBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HighlightBlock$3e$__["HighlightBlock"],
    HighlightNoteBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightNoteBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HighlightNoteBlock$3e$__["HighlightNoteBlock"],
    HighlightColumnBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightColumnBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HighlightColumnBlock$3e$__["HighlightColumnBlock"],
    HighlightCenterLineBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightCenterLineBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HighlightCenterLineBlock$3e$__["HighlightCenterLineBlock"],
    HighlightLeftLineBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightLeftLineBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HighlightLeftLineBlock$3e$__["HighlightLeftLineBlock"],
    HighlightBackgroundBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightBackgroundBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HighlightBackgroundBlock$3e$__["HighlightBackgroundBlock"],
    // Image Blocks
    ImageBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageBlock$3e$__["ImageBlock"],
    ImageWithTextBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageWithTextBlock$3e$__["ImageWithTextBlock"],
    ImageWithTextLeftBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextLeftBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageWithTextLeftBlock$3e$__["ImageWithTextLeftBlock"],
    ImageWithTextCenterBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextCenterBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageWithTextCenterBlock$3e$__["ImageWithTextCenterBlock"],
    ImageWithTextBottomBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextBottomBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageWithTextBottomBlock$3e$__["ImageWithTextBottomBlock"],
    ImageWithTextTopBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextTopBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageWithTextTopBlock$3e$__["ImageWithTextTopBlock"],
    // Quote Blocks
    QuoteBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__QuoteBlock$3e$__["QuoteBlock"],
    QuoteCenterBorderBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteCenterBorderBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__QuoteCenterBorderBlock$3e$__["QuoteCenterBorderBlock"],
    QuoteCenterLightBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteCenterLightBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__QuoteCenterLightBlock$3e$__["QuoteCenterLightBlock"],
    QuoteLeftLightBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteLeftLightBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__QuoteLeftLightBlock$3e$__["QuoteLeftLightBlock"],
    QuoteLeftBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteLeftBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__QuoteLeftBlock$3e$__["QuoteLeftBlock"],
    QuoteImageBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteImageBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__QuoteImageBlock$3e$__["QuoteImageBlock"],
    // Comparison Blocks
    ComparisonBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ComparisonBlock$3e$__["ComparisonBlock"],
    ComparisonProsConsBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonProsConsBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ComparisonProsConsBlock$3e$__["ComparisonProsConsBlock"],
    ComparisonCauseEffectBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonCauseEffectBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ComparisonCauseEffectBlock$3e$__["ComparisonCauseEffectBlock"],
    ComparisonDosDontsBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonDosDontsBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ComparisonDosDontsBlock$3e$__["ComparisonDosDontsBlock"],
    ComparisonMythFactBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonMythFactBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ComparisonMythFactBlock$3e$__["ComparisonMythFactBlock"],
    ComparisonBeforeAfterBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonBeforeAfterBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ComparisonBeforeAfterBlock$3e$__["ComparisonBeforeAfterBlock"],
    // Chat Blocks
    ChatBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatBlock$3e$__["ChatBlock"],
    ChatFeedbackBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatFeedbackBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatFeedbackBlock$3e$__["ChatFeedbackBlock"],
    ChatQABlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatQABlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatQABlock$3e$__["ChatQABlock"],
    ChatQuestionWallBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatQuestionWallBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatQuestionWallBlock$3e$__["ChatQuestionWallBlock"],
    ChatDialogBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatDialogBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatDialogBlock$3e$__["ChatDialogBlock"],
    // Other Static Blocks
    TableBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TableBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableBlock$3e$__["TableBlock"],
    ListBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ListBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ListBlock$3e$__["ListBlock"],
    GalleryBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$GalleryBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GalleryBlock$3e$__["GalleryBlock"],
    GraphBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$GraphBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GraphBlock$3e$__["GraphBlock"],
    TimelineBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TimelineBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TimelineBlock$3e$__["TimelineBlock"],
    SeparatorBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SeparatorBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SeparatorBlock$3e$__["SeparatorBlock"],
    TestimonialBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TestimonialBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TestimonialBlock$3e$__["TestimonialBlock"],
    StoryTellingBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$StoryTellingBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__StoryTellingBlock$3e$__["StoryTellingBlock"],
    ColumnsBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ColumnsBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ColumnsBlock$3e$__["ColumnsBlock"],
    ReviewsBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ReviewsBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ReviewsBlock$3e$__["ReviewsBlock"],
    VideoBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$VideoBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__VideoBlock$3e$__["VideoBlock"],
    AudioBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$AudioBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AudioBlock$3e$__["AudioBlock"],
    AttachmentBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$AttachmentBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AttachmentBlock$3e$__["AttachmentBlock"],
    EmbedBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$EmbedBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EmbedBlock$3e$__["EmbedBlock"],
    // Interactive Blocks
    CheckboxBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$CheckboxBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckboxBlock$3e$__["CheckboxBlock"],
    CarouselBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$CarouselBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CarouselBlock$3e$__["CarouselBlock"],
    AccordionBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$AccordionBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AccordionBlock$3e$__["AccordionBlock"],
    TabsBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TabsBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TabsBlock$3e$__["TabsBlock"],
    LabeledImageBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$LabeledImageBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LabeledImageBlock$3e$__["LabeledImageBlock"],
    ScenarioBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ScenarioBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ScenarioBlock$3e$__["ScenarioBlock"],
    SortingBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SortingBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SortingBlock$3e$__["SortingBlock"],
    SortingStepsBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SortingStepsBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SortingStepsBlock$3e$__["SortingStepsBlock"],
    FlashCardBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$FlashCardBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FlashCardBlock$3e$__["FlashCardBlock"],
    MultipleChoiceBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$MultipleChoiceBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MultipleChoiceBlock$3e$__["MultipleChoiceBlock"],
    MultipleResponseBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$MultipleResponseBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MultipleResponseBlock$3e$__["MultipleResponseBlock"],
    FillInTheBlankBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$FillInTheBlankBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FillInTheBlankBlock$3e$__["FillInTheBlankBlock"],
    MatchingPairsBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$MatchingPairsBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MatchingPairsBlock$3e$__["MatchingPairsBlock"],
    ButtonBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ButtonBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ButtonBlock$3e$__["ButtonBlock"],
    ButtonStackBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ButtonStackBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ButtonStackBlock$3e$__["ButtonStackBlock"],
    BannerBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$BannerBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BannerBlock$3e$__["BannerBlock"]
};
function CourseComponent({ component }) {
    const { componentName, content } = component;
    // Get the corresponding block component
    const BlockComponent = BlockComponents[componentName];
    if (BlockComponent) {
        const contentRecord = content;
        const styles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$block$2d$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["blockStylesToCss"])(contentRecord.blockStyles);
        const hasStyles = Object.keys(styles).length > 0;
        // Pass the content directly as props to the block component
        return hasStyles ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: styles,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BlockComponent, {
                ...contentRecord
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/CourseComponent.tsx",
                lineNumber: 96,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/CourseComponent.tsx",
            lineNumber: 95,
            columnNumber: 7
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BlockComponent, {
            ...contentRecord
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/CourseComponent.tsx",
            lineNumber: 99,
            columnNumber: 7
        }, this);
    }
    // Fallback for unknown components
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "py-6 px-6 bg-yellow-50 border border-yellow-200 rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-yellow-700 text-sm",
                children: [
                    "Unknown component: ",
                    componentName
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/CourseComponent.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                className: "mt-2 text-xs text-gray-600 overflow-auto",
                children: JSON.stringify(content, null, 2)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/CourseComponent.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/CourseComponent.tsx",
        lineNumber: 105,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/preview/[courseKey]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CoursePreviewPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$CoursePlayer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/CoursePlayer.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
function CoursePreviewPage() {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const courseKey = params.courseKey;
    const from = searchParams.get('from');
    const backUrl = from === 'dashboard' ? '/dashboard' : `/project/${courseKey}`;
    const backLabel = from === 'dashboard' ? 'Back to Dashboard' : 'Back to Editor';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$CoursePlayer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        courseKey: courseKey,
        backUrl: backUrl,
        backLabel: backLabel
    }, void 0, false, {
        fileName: "[project]/app/preview/[courseKey]/page.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=app_9e3796e7._.js.map