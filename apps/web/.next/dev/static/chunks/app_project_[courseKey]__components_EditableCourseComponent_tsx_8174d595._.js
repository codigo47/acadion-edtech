(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditableCourseComponent",
    ()=>EditableCourseComponent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grip-vertical.js [app-client] (ecmascript) <export default as GripVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/thumbs-up.js [app-client] (ecmascript) <export default as ThumbsUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/thumbs-down.js [app-client] (ecmascript) <export default as ThumbsDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/project/[courseKey]/_components/EditableText.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$CourseComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/project/[courseKey]/_components/CourseComponent.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$ImagePickerModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/project/[courseKey]/_components/ImagePickerModal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature(), _s9 = __turbopack_context__.k.signature(), _s10 = __turbopack_context__.k.signature(), _s11 = __turbopack_context__.k.signature(), _s12 = __turbopack_context__.k.signature(), _s13 = __turbopack_context__.k.signature(), _s14 = __turbopack_context__.k.signature(), _s15 = __turbopack_context__.k.signature(), _s16 = __turbopack_context__.k.signature(), _s17 = __turbopack_context__.k.signature(), _s18 = __turbopack_context__.k.signature(), _s19 = __turbopack_context__.k.signature(), _s20 = __turbopack_context__.k.signature(), _s21 = __turbopack_context__.k.signature(), _s22 = __turbopack_context__.k.signature(), _s23 = __turbopack_context__.k.signature(), _s24 = __turbopack_context__.k.signature(), _s25 = __turbopack_context__.k.signature(), _s26 = __turbopack_context__.k.signature(), _s27 = __turbopack_context__.k.signature(), _s28 = __turbopack_context__.k.signature(), _s29 = __turbopack_context__.k.signature(), _s30 = __turbopack_context__.k.signature(), _s31 = __turbopack_context__.k.signature(), _s32 = __turbopack_context__.k.signature(), _s33 = __turbopack_context__.k.signature(), _s34 = __turbopack_context__.k.signature(), _s35 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
// Blur-save input: uses local state, saves on blur
function BlurInput({ value, onSave, className, placeholder }) {
    _s();
    const [local, setLocal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(value);
    const prevValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(value);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BlurInput.useEffect": ()=>{
            if (value !== prevValue.current) {
                setLocal(value);
                prevValue.current = value;
            }
        }
    }["BlurInput.useEffect"], [
        value
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: "text",
        value: local,
        onChange: (e)=>setLocal(e.target.value),
        onBlur: ()=>{
            if (local !== value) onSave(local);
        },
        className: className || 'w-full px-3 py-1 text-xs text-gray-500 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30',
        placeholder: placeholder
    }, void 0, false, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_s(BlurInput, "8poVePiiGuBdr8yu9UXxkUX50T4=");
_c = BlurInput;
function EditableCourseComponent({ component, onDataChange }) {
    const { componentName, content } = component;
    // Tabs: real tab UI with add/delete/edit
    if (componentName === 'TabsBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableTabsBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 40,
            columnNumber: 12
        }, this);
    }
    // Accordion: real accordion UI with add/delete/edit
    if (componentName === 'AccordionBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableAccordionBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 45,
            columnNumber: 12
        }, this);
    }
    // Lists: real component + add input at bottom
    if (isListBlock(componentName)) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableListBlock, {
            component: component,
            componentName: componentName,
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 51,
            columnNumber: 7
        }, this);
    }
    // Image+text: editable image + Notion-style text
    if (isImageWithTextBlock(componentName)) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableImageWithTextBlock, {
            componentName: componentName,
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 63,
            columnNumber: 7
        }, this);
    }
    // Image only: click to change image
    if (componentName === 'ImageBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableImageBlock, {
            component: component,
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 74,
            columnNumber: 7
        }, this);
    }
    // SortingSteps
    if (componentName === 'SortingStepsBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableSortingStepsBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 84,
            columnNumber: 12
        }, this);
    }
    // MultipleResponse
    if (componentName === 'MultipleResponseBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableMultipleResponseBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 89,
            columnNumber: 12
        }, this);
    }
    // MultipleChoice
    if (componentName === 'MultipleChoiceBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableMultipleChoiceBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 94,
            columnNumber: 12
        }, this);
    }
    // FillInTheBlank
    if (componentName === 'FillInTheBlankBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableFillInBlankBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 99,
            columnNumber: 12
        }, this);
    }
    // MatchingPairs
    if (componentName === 'MatchingPairsBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableMatchingPairsBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 104,
            columnNumber: 12
        }, this);
    }
    // SortingBlock (categories)
    if (componentName === 'SortingBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableSortingCategoriesBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 109,
            columnNumber: 12
        }, this);
    }
    // Paragraphs, headings, highlights, quotes: Notion-style
    if (isParagraphOrHeading(componentName)) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NotionStyleBlock, {
            componentName: componentName,
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 114,
            columnNumber: 12
        }, this);
    }
    // Comparisons
    if (componentName === 'ComparisonCauseEffectBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableCauseEffectBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 119,
            columnNumber: 12
        }, this);
    }
    if (componentName === 'ComparisonMythFactBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableTwoFieldBlock, {
            content: content,
            onDataChange: onDataChange,
            fieldA: "myth",
            fieldB: "fact",
            labelA: "Myth",
            labelB: "Fact",
            colorA: "bg-red-100",
            colorB: "bg-green-100"
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 122,
            columnNumber: 12
        }, this);
    }
    if (isComparisonTwoList(componentName)) {
        const cfg = twoListConfig[componentName];
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableTwoListBlock, {
            content: content,
            onDataChange: onDataChange,
            config: cfg
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 126,
            columnNumber: 12
        }, this);
    }
    if (componentName === 'ComparisonBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableComparisonItemsBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 129,
            columnNumber: 12
        }, this);
    }
    // Chat blocks
    if (isChatBlock(componentName)) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableChatBlock, {
            content: content,
            onDataChange: onDataChange,
            componentName: componentName
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 134,
            columnNumber: 12
        }, this);
    }
    if (componentName === 'ChatQuestionWallBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableChatQABlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 137,
            columnNumber: 12
        }, this);
    }
    if (componentName === 'ChatDialogBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableChatDialogBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 140,
            columnNumber: 12
        }, this);
    }
    // Items-based blocks
    if (componentName === 'TimelineBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableTimelineBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 145,
            columnNumber: 12
        }, this);
    }
    if (componentName === 'FlashCardBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableFlashCardBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 148,
            columnNumber: 12
        }, this);
    }
    if (componentName === 'TestimonialBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableTestimonialBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 151,
            columnNumber: 12
        }, this);
    }
    if (componentName === 'ReviewsBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableReviewsBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 154,
            columnNumber: 12
        }, this);
    }
    // Table
    if (componentName === 'TableBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableTableBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 159,
            columnNumber: 12
        }, this);
    }
    // Buttons
    if (componentName === 'ButtonBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableButtonBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 164,
            columnNumber: 12
        }, this);
    }
    if (componentName === 'ButtonStackBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableButtonStackBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 167,
            columnNumber: 12
        }, this);
    }
    // Media
    if (componentName === 'VideoBlock' || componentName === 'AudioBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableMediaUrlBlock, {
            content: content,
            onDataChange: onDataChange,
            label: componentName === 'VideoBlock' ? 'Video' : 'Audio'
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 172,
            columnNumber: 12
        }, this);
    }
    if (componentName === 'EmbedBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableEmbedBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 175,
            columnNumber: 12
        }, this);
    }
    if (componentName === 'AttachmentBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableAttachmentBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 178,
            columnNumber: 12
        }, this);
    }
    // Carousel / Gallery
    if (componentName === 'CarouselBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableCarouselBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 183,
            columnNumber: 12
        }, this);
    }
    if (componentName === 'GalleryBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableGalleryBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 186,
            columnNumber: 12
        }, this);
    }
    // StoryTelling
    if (componentName === 'StoryTellingBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableStoryBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 191,
            columnNumber: 12
        }, this);
    }
    // Columns
    if (componentName === 'ColumnsBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableColumnsBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 196,
            columnNumber: 12
        }, this);
    }
    // Scenario
    if (componentName === 'ScenarioBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableScenarioBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 201,
            columnNumber: 12
        }, this);
    }
    // LabeledImage
    if (componentName === 'LabeledImageBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableLabeledImageBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 206,
            columnNumber: 12
        }, this);
    }
    // Separator
    if (componentName === 'SeparatorBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableSeparatorBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 211,
            columnNumber: 12
        }, this);
    }
    // Banner
    if (componentName === 'BannerBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditableBannerBlock, {
            content: content,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 216,
            columnNumber: 12
        }, this);
    }
    // Everything else (Graph, etc.): show as-is
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$CourseComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CourseComponent"], {
        component: component
    }, void 0, false, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 220,
        columnNumber: 10
    }, this);
}
_c1 = EditableCourseComponent;
// ─── Category Checks ───────────────────────────────────────────────
function isParagraphOrHeading(name) {
    return [
        'ParagraphBlock',
        'ParagraphWithHeadingBlock',
        'ParagraphWithSubheadingBlock',
        'HeadingBlock',
        'SubheadingBlock',
        'HighlightBlock',
        'HighlightNoteBlock',
        'HighlightColumnBlock',
        'HighlightCenterLineBlock',
        'HighlightLeftLineBlock',
        'HighlightBackgroundBlock',
        'QuoteBlock',
        'QuoteCenterBorderBlock',
        'QuoteCenterLightBlock',
        'QuoteLeftLightBlock',
        'QuoteLeftBlock',
        'QuoteImageBlock'
    ].includes(name);
}
function isListBlock(name) {
    return [
        'ListBlock',
        'CheckboxBlock'
    ].includes(name);
}
function isImageWithTextBlock(name) {
    return [
        'ImageWithTextBlock',
        'ImageWithTextLeftBlock',
        'ImageWithTextCenterBlock',
        'ImageWithTextBottomBlock',
        'ImageWithTextTopBlock'
    ].includes(name);
}
function isComparisonTwoList(name) {
    return [
        'ComparisonProsConsBlock',
        'ComparisonDosDontsBlock',
        'ComparisonBeforeAfterBlock'
    ].includes(name);
}
const twoListConfig = {
    ComparisonDosDontsBlock: {
        variant: 'bordered',
        left: {
            field: 'dos',
            label: "Do's",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"],
            iconBg: 'bg-green-500',
            iconColor: 'text-white',
            labelColor: 'text-green-700',
            bg: 'bg-white',
            borderColor: 'border-green-500'
        },
        right: {
            field: 'donts',
            label: "Don'ts",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"],
            iconBg: 'bg-red-500',
            iconColor: 'text-white',
            labelColor: 'text-red-700',
            bg: 'bg-white',
            borderColor: 'border-red-500'
        }
    },
    ComparisonProsConsBlock: {
        variant: 'filled',
        left: {
            field: 'pros',
            label: 'Pros',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsUp$3e$__["ThumbsUp"],
            iconBg: 'bg-green-500',
            iconColor: 'text-white',
            labelColor: 'text-green-700',
            bg: 'bg-green-50',
            bulletColor: 'text-green-500'
        },
        right: {
            field: 'cons',
            label: 'Cons',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsDown$3e$__["ThumbsDown"],
            iconBg: 'bg-red-500',
            iconColor: 'text-white',
            labelColor: 'text-red-700',
            bg: 'bg-red-50',
            bulletColor: 'text-red-500'
        }
    },
    ComparisonBeforeAfterBlock: {
        variant: 'header-bar',
        left: {
            field: 'beforeItems',
            label: 'Before',
            headerBar: true,
            headerBarBg: 'bg-orange-500',
            bg: 'bg-gray-50'
        },
        right: {
            field: 'afterItems',
            label: 'After',
            headerBar: true,
            headerBarBg: 'bg-orange-500',
            bg: 'bg-gray-50'
        }
    }
};
function isChatBlock(name) {
    return [
        'ChatBlock',
        'ChatFeedbackBlock',
        'ChatQABlock'
    ].includes(name);
}
// ─── Notion-style: always editable, no click-to-edit ────────────────
function NotionStyleBlock({ componentName, content, onDataChange }) {
    _s1();
    const updateField = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "NotionStyleBlock.useCallback[updateField]": (field, value)=>{
            onDataChange({
                ...content,
                [field]: value
            });
        }
    }["NotionStyleBlock.useCallback[updateField]"], [
        content,
        onDataChange
    ]);
    if (componentName === 'ParagraphBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full p-4 cursor-text",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                value: String(content.content || ''),
                onChange: (v)=>updateField('content', v),
                tag: "p",
                className: "text-base leading-relaxed",
                style: {
                    lineHeight: '1.75',
                    color: 'var(--block-text-color, inherit)'
                },
                placeholder: "Enter paragraph text..."
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 314,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 313,
            columnNumber: 7
        }, this);
    }
    if (componentName === 'ParagraphWithHeadingBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full p-4 cursor-text",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                    value: String(content.heading || ''),
                    onChange: (v)=>updateField('heading', v),
                    tag: "h2",
                    className: "mb-4 text-2xl font-bold",
                    style: {
                        color: 'var(--block-text-color, inherit)'
                    },
                    placeholder: "Enter heading...",
                    multiline: false
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 329,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                    value: String(content.content || ''),
                    onChange: (v)=>updateField('content', v),
                    tag: "p",
                    className: "text-base leading-relaxed",
                    style: {
                        lineHeight: '1.75',
                        color: 'var(--block-text-color, inherit)'
                    },
                    placeholder: "Enter paragraph text..."
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 338,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 328,
            columnNumber: 7
        }, this);
    }
    if (componentName === 'ParagraphWithSubheadingBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full p-4 cursor-text",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                    value: String(content.subheading || ''),
                    onChange: (v)=>updateField('subheading', v),
                    tag: "h3",
                    className: "mb-3 text-lg font-semibold",
                    style: {
                        color: 'var(--block-text-color, #374151)'
                    },
                    placeholder: "Enter subheading...",
                    multiline: false
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 353,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                    value: String(content.content || ''),
                    onChange: (v)=>updateField('content', v),
                    tag: "p",
                    className: "text-base leading-relaxed",
                    style: {
                        lineHeight: '1.75',
                        color: 'var(--block-text-color, inherit)'
                    },
                    placeholder: "Enter paragraph text..."
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 362,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 352,
            columnNumber: 7
        }, this);
    }
    if (componentName === 'HeadingBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full p-4 cursor-text",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                value: String(content.heading || ''),
                onChange: (v)=>updateField('heading', v),
                tag: "h1",
                className: "text-4xl font-bold",
                style: {
                    color: 'var(--block-text-color, inherit)'
                },
                placeholder: "Enter heading...",
                multiline: false
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 377,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 376,
            columnNumber: 7
        }, this);
    }
    if (componentName === 'SubheadingBlock') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full p-4 cursor-text",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                value: String(content.subheading || ''),
                onChange: (v)=>updateField('subheading', v),
                tag: "h3",
                className: "text-2xl font-semibold",
                style: {
                    color: 'var(--block-text-color, #6B7280)'
                },
                placeholder: "Enter subheading...",
                multiline: false
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 393,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 392,
            columnNumber: 7
        }, this);
    }
    // Quote variants — each with unique visual treatment
    if (componentName.startsWith('Quote')) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuoteVariantEditor, {
            componentName: componentName,
            content: content,
            updateField: updateField,
            onDataChange: onDataChange
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 408,
            columnNumber: 12
        }, this);
    }
    // Highlight variants — each with unique visual treatment
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HighlightVariantEditor, {
        componentName: componentName,
        content: content,
        updateField: updateField
    }, void 0, false, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 412,
        columnNumber: 10
    }, this);
}
_s1(NotionStyleBlock, "FA/oORZXE9/ijN8lnzUT4cwnNi4=");
_c2 = NotionStyleBlock;
// ─── Quote Variant Editor ───────────────────────────────────────────
function QuoteVariantEditor({ componentName, content, updateField, onDataChange }) {
    _s2();
    const [showPicker, setShowPicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const quoteFields = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                value: String(content.content || ''),
                onChange: (v)=>updateField('content', v),
                tag: "p",
                className: "text-lg italic",
                style: {
                    lineHeight: '1.6'
                },
                placeholder: "Enter quote text..."
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 422,
                columnNumber: 7
            }, this),
            content.author !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                value: String(content.author || ''),
                onChange: (v)=>updateField('author', v),
                tag: "span",
                className: "text-sm mt-2 block",
                placeholder: "Attribution...",
                multiline: false
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 431,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
    switch(componentName){
        case 'QuoteBlock':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full bg-gray-50 rounded-xl p-8 text-center cursor-text",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-4xl text-gray-300 block mb-2",
                        children: "“"
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 447,
                        columnNumber: 11
                    }, this),
                    quoteFields
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 446,
                columnNumber: 9
            }, this);
        case 'QuoteCenterBorderBlock':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full border-2 border-gray-300 rounded-lg p-6 text-center cursor-text",
                children: quoteFields
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 454,
                columnNumber: 9
            }, this);
        case 'QuoteCenterLightBlock':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full text-center py-6 cursor-text",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-3xl text-gray-300",
                        children: "“"
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 462,
                        columnNumber: 11
                    }, this),
                    quoteFields,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-3xl text-gray-300",
                        children: "”"
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 464,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 461,
                columnNumber: 9
            }, this);
        case 'QuoteLeftLightBlock':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full py-4 border-l-2 border-gray-200 pl-6 cursor-text",
                children: quoteFields
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 470,
                columnNumber: 9
            }, this);
        case 'QuoteLeftBlock':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full bg-gray-50 border-l-4 border-gray-400 p-6 cursor-text",
                children: quoteFields
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 477,
                columnNumber: 9
            }, this);
        case 'QuoteImageBlock':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full relative rounded-lg overflow-hidden cursor-text",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full h-48 group/img cursor-pointer relative",
                                onClick: ()=>setShowPicker(true),
                                children: [
                                    content.quoteImage ? // eslint-disable-next-line @next/next/no-img-element
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: String(content.quoteImage),
                                        alt: "Quote background",
                                        className: "w-full h-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 489,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full h-full bg-gray-800 flex items-center justify-center text-gray-400 gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                                className: "w-6 h-6"
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 492,
                                                columnNumber: 19
                                            }, this),
                                            " Click to set background image"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 491,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 z-20 bg-transparent group-hover/img:bg-black/20 transition-colors flex items-end justify-center pb-3 opacity-0 group-hover/img:opacity-100 pointer-events-none rounded-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-3 py-1.5 bg-white/90 text-sm text-gray-600 rounded-lg shadow-sm border border-gray-200 flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 497,
                                                    columnNumber: 19
                                                }, this),
                                                "Change image"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 496,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 495,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 486,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-black/50 flex items-center justify-center p-6 pointer-events-none",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pointer-events-auto text-center cursor-text",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                            value: String(content.content || ''),
                                            onChange: (v)=>updateField('content', v),
                                            tag: "p",
                                            className: "text-lg italic text-white",
                                            style: {
                                                lineHeight: '1.6',
                                                color: '#ffffff'
                                            },
                                            placeholder: "Enter quote text..."
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 504,
                                            columnNumber: 17
                                        }, this),
                                        content.author !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                            value: String(content.author || ''),
                                            onChange: (v)=>updateField('author', v),
                                            tag: "span",
                                            className: "text-sm text-gray-200 mt-2 block",
                                            style: {
                                                color: '#e5e7eb'
                                            },
                                            placeholder: "Attribution...",
                                            multiline: false
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 513,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 503,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 502,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 485,
                        columnNumber: 11
                    }, this),
                    showPicker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$ImagePickerModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImagePickerModal"], {
                        currentUrl: String(content.quoteImage || ''),
                        onSelect: (url)=>{
                            onDataChange({
                                ...content,
                                quoteImage: url
                            });
                            setShowPicker(false);
                        },
                        onClose: ()=>setShowPicker(false)
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 527,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true);
        default:
            // Fallback for any unknown quote variant
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full p-6 border-l-4 border-gray-400 bg-gray-50 rounded-r-lg cursor-text",
                children: quoteFields
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 539,
                columnNumber: 9
            }, this);
    }
}
_s2(QuoteVariantEditor, "PcDCImg70lXrYgxmpw3ewp/jgFc=");
_c3 = QuoteVariantEditor;
// ─── Highlight Variant Editor ───────────────────────────────────────
function HighlightVariantEditor({ componentName, content, updateField }) {
    const blockStyle = content.blockStyle || 'A';
    const highlightColors = {
        A: {
            bg: 'bg-yellow-100',
            border: 'border-yellow-500',
            color: '#713f12'
        },
        B: {
            bg: 'bg-blue-100',
            border: 'border-blue-500',
            color: '#1e40af'
        },
        C: {
            bg: 'bg-purple-100',
            border: 'border-purple-500',
            color: '#581c87'
        }
    };
    const hc = highlightColors[blockStyle] || highlightColors.A;
    const highlightField = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
        value: String(content.highlight || ''),
        onChange: (v)=>updateField('highlight', v),
        tag: "p",
        className: "text-lg font-medium",
        style: {
            lineHeight: '1.6',
            color: hc.color,
            fontSize: '18px'
        },
        placeholder: "Enter highlight text..."
    }, void 0, false, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 558,
        columnNumber: 5
    }, this);
    switch(componentName){
        case 'HighlightBlock':
        case 'HighlightNoteBlock':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${hc.bg} border-l-4 ${hc.border} p-6 rounded-r-lg my-4 cursor-text`,
                children: highlightField
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 572,
                columnNumber: 9
            }, this);
        case 'HighlightColumnBlock':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${hc.bg} max-w-lg mx-auto text-center p-6 rounded-lg my-4 cursor-text`,
                children: highlightField
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 579,
                columnNumber: 9
            }, this);
        case 'HighlightCenterLineBlock':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `border-t-4 ${hc.border} pt-4 text-center my-4 cursor-text`,
                children: highlightField
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 586,
                columnNumber: 9
            }, this);
        case 'HighlightLeftLineBlock':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `border-t-4 ${hc.border} pt-4 text-left my-4 cursor-text`,
                children: highlightField
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 593,
                columnNumber: 9
            }, this);
        case 'HighlightBackgroundBlock':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-100 rounded-lg p-6 my-4 cursor-text",
                children: highlightField
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 600,
                columnNumber: 9
            }, this);
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${hc.bg} border-l-4 ${hc.border} p-6 rounded-r-lg my-4 cursor-text`,
                children: highlightField
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 607,
                columnNumber: 9
            }, this);
    }
}
_c4 = HighlightVariantEditor;
// ─── List Block: real component + add input ────────────────────────
function EditableListBlock({ component, componentName, content, onDataChange }) {
    _s3();
    const [newItemText, setNewItemText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const rawItems = content.items || [];
    const isCheckbox = componentName === 'CheckboxBlock';
    const listStyle = content.listStyle || 'default';
    const accentColor = content.accentColor || '#9F80DA';
    const addItem = ()=>{
        const text = newItemText.trim();
        if (!text) return;
        if (isCheckbox) {
            onDataChange({
                ...content,
                items: [
                    ...rawItems,
                    {
                        id: `cb-${Date.now()}`,
                        text,
                        checked: false
                    }
                ]
            });
        } else {
            onDataChange({
                ...content,
                items: [
                    ...rawItems,
                    text
                ]
            });
        }
        setNewItemText('');
    };
    const renderBullet = ()=>{
        if (isCheckbox) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-6 h-6 flex items-center justify-center border-2 border-gray-300 rounded flex-shrink-0"
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 650,
                columnNumber: 9
            }, this);
        }
        switch(listStyle){
            case 'check':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                    className: "w-5 h-5 flex-shrink-0",
                    style: {
                        color: accentColor
                    }
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 655,
                    columnNumber: 16
                }, this);
            case 'circle':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                    className: "w-3 h-3 fill-current flex-shrink-0",
                    style: {
                        color: accentColor
                    }
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 657,
                    columnNumber: 16
                }, this);
            case 'arrow':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                    className: "w-4 h-4 flex-shrink-0",
                    style: {
                        color: accentColor
                    }
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 659,
                    columnNumber: 16
                }, this);
            case 'chevron':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                    className: "w-5 h-5 flex-shrink-0",
                    style: {
                        color: accentColor
                    }
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 661,
                    columnNumber: 16
                }, this);
            case 'star':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                    className: "w-4 h-4 fill-current flex-shrink-0",
                    style: {
                        color: accentColor
                    }
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 663,
                    columnNumber: 16
                }, this);
            case 'numbered':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0",
                    style: {
                        backgroundColor: accentColor
                    },
                    children: rawItems.length + 1
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 666,
                    columnNumber: 11
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gray-800"
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 675,
                    columnNumber: 11
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$CourseComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CourseComponent"], {
                component: component
            }, `${componentName}-${rawItems.length}`, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 682,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 pb-4 -mt-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        renderBullet(),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: newItemText,
                            onChange: (e)=>setNewItemText(e.target.value),
                            onKeyDown: (e)=>{
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addItem();
                                }
                            },
                            onBlur: addItem,
                            className: "flex-1 py-1 text-base text-gray-400 bg-transparent border-none focus:outline-none placeholder-gray-400",
                            placeholder: "Add a new item..."
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 686,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 684,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 683,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 681,
        columnNumber: 5
    }, this);
}
_s3(EditableListBlock, "XOJQ5mR2QusapcmA7ck5vnm1NRo=");
_c5 = EditableListBlock;
// ─── Editable Tabs: real tab UI with editing controls ──────────────
function EditableTabsBlock({ content, onDataChange }) {
    _s4();
    const items = content.items || [];
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(items[0]?.id || '');
    const [editingTabId, setEditingTabId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingTabValue, setEditingTabValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [deleteConfirmId, setDeleteConfirmId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [placeholderEditing, setPlaceholderEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [placeholderName, setPlaceholderName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const editInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const placeholderInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [showTabImagePicker, setShowTabImagePicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const activeItem = items.find((item)=>item.id === activeTab) || items[0];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditableTabsBlock.useEffect": ()=>{
            if (editingTabId && editInputRef.current) {
                editInputRef.current.focus();
                editInputRef.current.select();
            }
        }
    }["EditableTabsBlock.useEffect"], [
        editingTabId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditableTabsBlock.useEffect": ()=>{
            if (placeholderEditing && placeholderInputRef.current) {
                placeholderInputRef.current.focus();
                placeholderInputRef.current.select();
            }
        }
    }["EditableTabsBlock.useEffect"], [
        placeholderEditing
    ]);
    const updateItem = (id, field, value)=>{
        const newItems = items.map((item)=>item.id === id ? {
                ...item,
                [field]: value
            } : item);
        onDataChange({
            ...content,
            items: newItems
        });
    };
    const confirmPlaceholder = ()=>{
        const name = placeholderName.trim();
        if (name) {
            const newId = `tab-${Date.now()}`;
            const newItems = [
                ...items,
                {
                    id: newId,
                    title: name,
                    content: ''
                }
            ];
            onDataChange({
                ...content,
                items: newItems
            });
            setActiveTab(newId);
        }
        setPlaceholderEditing(false);
        setPlaceholderName('');
    };
    const removeTab = (id)=>{
        const newItems = items.filter((item)=>item.id !== id);
        onDataChange({
            ...content,
            items: newItems
        });
        setDeleteConfirmId(null);
        if (activeTab === id && newItems.length > 0) {
            setActiveTab(newItems[0].id);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap border-b border-gray-200",
                children: [
                    items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative group/tab flex items-center -mb-px",
                            children: [
                                editingTabId === item.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    ref: editInputRef,
                                    type: "text",
                                    value: editingTabValue,
                                    onChange: (e)=>setEditingTabValue(e.target.value),
                                    onKeyDown: (e)=>{
                                        if (e.key === 'Enter') {
                                            const v = editingTabValue.trim();
                                            if (v) updateItem(item.id, 'title', v);
                                            setEditingTabId(null);
                                        }
                                        if (e.key === 'Escape') setEditingTabId(null);
                                    },
                                    onBlur: ()=>{
                                        const v = editingTabValue.trim();
                                        if (v) updateItem(item.id, 'title', v);
                                        setEditingTabId(null);
                                    },
                                    className: "px-3 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium border-b-2 border-primary text-primary bg-primary/5 focus:outline-none min-w-[80px]"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 777,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        if (activeTab === item.id) {
                                            setEditingTabId(item.id);
                                            setEditingTabValue(item.title);
                                        } else {
                                            setActiveTab(item.id);
                                        }
                                    },
                                    className: `px-3 sm:px-6 py-2.5 sm:py-3 font-medium transition-colors border-b-2 text-sm sm:text-base ${activeTab === item.id ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`,
                                    children: item.title
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 798,
                                    columnNumber: 15
                                }, this),
                                deleteConfirmId === item.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-lg z-[100] whitespace-nowrap",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-red-600 font-medium",
                                            children: "Delete?"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 820,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>removeTab(item.id),
                                            className: "px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors",
                                            children: "Yes"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 821,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setDeleteConfirmId(null),
                                            className: "px-3 py-1 text-sm font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors",
                                            children: "No"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 827,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 819,
                                    columnNumber: 15
                                }, this) : items.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setDeleteConfirmId(item.id),
                                    className: "absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-gray-200 hover:bg-red-500 text-gray-500 hover:text-white rounded-full z-[100] transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 840,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 836,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, item.id, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 775,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center -mb-px",
                        children: placeholderEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ref: placeholderInputRef,
                            type: "text",
                            value: placeholderName,
                            onChange: (e)=>setPlaceholderName(e.target.value),
                            onKeyDown: (e)=>{
                                if (e.key === 'Enter') confirmPlaceholder();
                                if (e.key === 'Escape') {
                                    setPlaceholderEditing(false);
                                    setPlaceholderName('');
                                }
                            },
                            onBlur: confirmPlaceholder,
                            className: "px-3 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium border-b-2 border-primary text-primary bg-primary/5 focus:outline-none min-w-[80px]",
                            placeholder: "Tab name..."
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 850,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setPlaceholderEditing(true),
                            className: "px-3 sm:px-6 py-2.5 sm:py-3 font-medium text-sm sm:text-base text-gray-400 hover:text-gray-500 border-b-2 border-transparent border-dashed transition-colors",
                            children: "New tab"
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 867,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 848,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 773,
                columnNumber: 7
            }, this),
            activeItem && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-3 sm:p-6",
                children: [
                    activeItem.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative group/img rounded-lg overflow-hidden h-40 w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: activeItem.image,
                                    alt: activeItem.title,
                                    className: "w-full h-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 885,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowTabImagePicker(true),
                                            className: "px-2 py-1 text-xs text-white bg-white/20 hover:bg-white/30 rounded",
                                            children: "Change"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 887,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>updateItem(activeItem.id, 'image', ''),
                                            className: "px-2 py-1 text-xs text-white bg-red-500/60 hover:bg-red-500/80 rounded",
                                            children: "Remove"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 888,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 886,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 883,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 882,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowTabImagePicker(true),
                        className: "mb-3 flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400 hover:text-[#9F80DA] border border-dashed border-gray-300 hover:border-[#9F80DA] rounded-lg transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                className: "w-3.5 h-3.5"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 897,
                                columnNumber: 15
                            }, this),
                            "Add image to tab"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 893,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        contentEditable: true,
                        suppressContentEditableWarning: true,
                        onBlur: (e)=>updateItem(activeItem.id, 'content', e.currentTarget.textContent || ''),
                        className: "text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/20 rounded-lg p-1 -m-1 min-h-[2em]",
                        style: {
                            lineHeight: '1.6',
                            color: 'var(--block-text-color, #374151)'
                        },
                        children: activeItem.content
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 901,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 879,
                columnNumber: 9
            }, this),
            showTabImagePicker && activeItem && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$ImagePickerModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImagePickerModal"], {
                currentUrl: activeItem.image,
                onSelect: (url)=>{
                    updateItem(activeItem.id, 'image', url);
                    setShowTabImagePicker(false);
                },
                onClose: ()=>setShowTabImagePicker(false)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 914,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 771,
        columnNumber: 5
    }, this);
}
_s4(EditableTabsBlock, "sMc+TTcKJ/ofai7DaFH0Bl73xcU=");
_c6 = EditableTabsBlock;
// ─── Editable Accordion: Notion-style inline editing ────────────────
function EditableAccordionBlock({ content, onDataChange }) {
    _s5();
    const items = content.items || [];
    const blockStyle = content.blockStyle || 'A';
    const [openItems, setOpenItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [deleteConfirmId, setDeleteConfirmId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pendingItem, setPendingItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pendingTitle, setPendingTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const pendingInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [showImagePickerFor, setShowImagePickerFor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const imagePositions = [
        'left',
        'right',
        'top',
        'bottom',
        'stretched'
    ];
    // Style classes matching read-only AccordionBlock A/B/C
    const styleClasses = {
        A: {
            container: 'border border-gray-200 rounded-lg',
            header: 'bg-white hover:bg-gray-50',
            headerOpen: 'bg-primary/10',
            content: 'bg-white',
            icon: 'text-gray-500'
        },
        B: {
            container: 'border-l-4 border-primary shadow-sm',
            header: 'bg-gray-50 hover:bg-gray-100',
            headerOpen: 'bg-primary/20',
            content: 'bg-white',
            icon: 'text-primary'
        },
        C: {
            container: 'border-2 border-gray-300 rounded-xl',
            header: 'bg-gradient-to-r from-gray-50 to-white hover:from-gray-100',
            headerOpen: 'bg-gradient-to-r from-blue-50 to-white',
            content: 'bg-gray-50',
            icon: 'text-blue-500'
        }
    }[blockStyle];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditableAccordionBlock.useEffect": ()=>{
            if (pendingItem && pendingInputRef.current) {
                pendingInputRef.current.focus();
            }
        }
    }["EditableAccordionBlock.useEffect"], [
        pendingItem
    ]);
    const toggleItem = (id)=>{
        setOpenItems((prev)=>prev.includes(id) ? prev.filter((i)=>i !== id) : [
                ...prev,
                id
            ]);
    };
    const isOpen = (id)=>openItems.includes(id);
    const updateItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableAccordionBlock.useCallback[updateItem]": (id, field, value)=>{
            const newItems = items.map({
                "EditableAccordionBlock.useCallback[updateItem].newItems": (item)=>item.id === id ? {
                        ...item,
                        [field]: value
                    } : item
            }["EditableAccordionBlock.useCallback[updateItem].newItems"]);
            onDataChange({
                ...content,
                items: newItems
            });
        }
    }["EditableAccordionBlock.useCallback[updateItem]"], [
        items,
        content,
        onDataChange
    ]);
    const confirmPendingItem = ()=>{
        const title = pendingTitle.trim();
        if (title) {
            const newId = `acc-${Date.now()}`;
            const newItems = [
                ...items,
                {
                    id: newId,
                    title,
                    content: ''
                }
            ];
            onDataChange({
                ...content,
                items: newItems
            });
            setOpenItems((prev)=>[
                    ...prev,
                    newId
                ]);
        }
        setPendingItem(false);
        setPendingTitle('');
    };
    const removeItem = (id)=>{
        onDataChange({
            ...content,
            items: items.filter((item)=>item.id !== id)
        });
        setDeleteConfirmId(null);
        setOpenItems((prev)=>prev.filter((i)=>i !== id));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: [
                items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${styleClasses.container} overflow-hidden group/acc`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `flex items-center transition-colors ${isOpen(item.id) ? styleClasses.headerOpen : styleClasses.header}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>toggleItem(item.id),
                                        className: "flex-shrink-0 p-4 pr-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                            className: `w-5 h-5 ${styleClasses.icon} transition-transform ${isOpen(item.id) ? 'rotate-180' : ''}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 1025,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 1021,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 py-4 px-3 cursor-text",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                            value: item.title,
                                            onChange: (v)=>updateItem(item.id, 'title', v),
                                            tag: "span",
                                            className: "font-medium text-left",
                                            placeholder: "Item title...",
                                            multiline: false
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 1033,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 1032,
                                        columnNumber: 15
                                    }, this),
                                    deleteConfirmId === item.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 px-3 py-2 mr-2 bg-white border border-gray-200 rounded-lg shadow-lg z-[100] whitespace-nowrap",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-red-600 font-medium",
                                                children: "Delete?"
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 1046,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>removeItem(item.id),
                                                className: "px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors",
                                                children: "Yes"
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 1047,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setDeleteConfirmId(null),
                                                className: "px-3 py-1 text-sm font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors",
                                                children: "No"
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 1053,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 1045,
                                        columnNumber: 17
                                    }, this) : items.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setDeleteConfirmId(item.id),
                                        className: "px-3 text-gray-300 hover:text-red-500 transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 1066,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 1062,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 1016,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `overflow-hidden transition-all duration-300 ${isOpen(item.id) ? 'max-h-[800px]' : 'max-h-0'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `${styleClasses.content} p-4 border-t border-gray-100`,
                                    children: [
                                        item.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative group/img rounded-lg overflow-hidden h-32 w-full sm:w-48",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: item.image,
                                                            alt: item.title,
                                                            className: "w-full h-full object-cover"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                            lineNumber: 1084,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>setShowImagePickerFor(item.id),
                                                                    className: "px-2 py-1 text-xs text-white bg-white/20 hover:bg-white/30 rounded",
                                                                    children: "Change"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                                    lineNumber: 1086,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>updateItem(item.id, 'image', ''),
                                                                    className: "px-2 py-1 text-xs text-white bg-red-500/60 hover:bg-red-500/80 rounded",
                                                                    children: "Remove"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                                    lineNumber: 1087,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                            lineNumber: 1085,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 1082,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1 mt-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-gray-400 mr-1",
                                                            children: "Position:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                            lineNumber: 1092,
                                                            columnNumber: 23
                                                        }, this),
                                                        imagePositions.map((pos)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>updateItem(item.id, 'imagePosition', pos),
                                                                className: `px-2 py-0.5 text-xs rounded transition-colors ${(item.imagePosition || 'right') === pos ? 'bg-[#9F80DA] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`,
                                                                children: pos
                                                            }, pos, false, {
                                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                                lineNumber: 1094,
                                                                columnNumber: 25
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 1091,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 1081,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowImagePickerFor(item.id),
                                            className: "mb-3 flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400 hover:text-[#9F80DA] border border-dashed border-gray-300 hover:border-[#9F80DA] rounded-lg transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                                    className: "w-3.5 h-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 1113,
                                                    columnNumber: 21
                                                }, this),
                                                "Add image"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 1109,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "cursor-text",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                                value: item.content,
                                                onChange: (v)=>updateItem(item.id, 'content', v),
                                                tag: "p",
                                                className: "text-gray-600 leading-relaxed min-h-[1.5em]",
                                                style: {
                                                    lineHeight: '1.5',
                                                    color: 'var(--block-text-color, #4B5563)'
                                                },
                                                placeholder: "Enter content..."
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 1118,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 1117,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1078,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 1073,
                                columnNumber: 13
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 1014,
                        columnNumber: 11
                    }, this)),
                showImagePickerFor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$ImagePickerModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImagePickerModal"], {
                    currentUrl: items.find((i)=>i.id === showImagePickerFor)?.image,
                    onSelect: (url)=>{
                        updateItem(showImagePickerFor, 'image', url);
                        setShowImagePickerFor(null);
                    },
                    onClose: ()=>setShowImagePickerFor(null)
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 1133,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border border-dashed border-gray-300 rounded-lg overflow-hidden hover:border-[#9F80DA] transition-colors",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center bg-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-shrink-0 p-4 pr-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                    className: "w-5 h-5 text-gray-300"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1147,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 1146,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 py-4 px-3",
                                children: pendingItem ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    ref: pendingInputRef,
                                    type: "text",
                                    value: pendingTitle,
                                    onChange: (e)=>setPendingTitle(e.target.value),
                                    onKeyDown: (e)=>{
                                        if (e.key === 'Enter') confirmPendingItem();
                                        if (e.key === 'Escape') {
                                            setPendingItem(false);
                                            setPendingTitle('');
                                        }
                                    },
                                    onBlur: confirmPendingItem,
                                    className: "w-full font-medium text-left bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30 rounded-sm",
                                    placeholder: "Item title..."
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1151,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setPendingItem(true),
                                    className: "font-medium text-gray-400 hover:text-gray-500 text-left transition-colors",
                                    children: "New item"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1168,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 1149,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 1145,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 1144,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 1012,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 1011,
        columnNumber: 5
    }, this);
}
_s5(EditableAccordionBlock, "XMEgU49gyvZXpt+gj82kLGj3Ebg=");
_c7 = EditableAccordionBlock;
// ─── SortingSteps: Notion-style inline editing ──────────────────────
function EditableSortingStepsBlock({ content, onDataChange }) {
    _s6();
    const rawItems = content.items || [];
    const sortedFromProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EditableSortingStepsBlock.useMemo[sortedFromProps]": ()=>[
                ...rawItems
            ].sort({
                "EditableSortingStepsBlock.useMemo[sortedFromProps]": (a, b)=>a.correctOrder - b.correctOrder
            }["EditableSortingStepsBlock.useMemo[sortedFromProps]"])
    }["EditableSortingStepsBlock.useMemo[sortedFromProps]"], [
        rawItems
    ]);
    const [localItems, setLocalItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(sortedFromProps);
    const localItemsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(localItems);
    const [draggedIndex, setDraggedIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const draggedIndexRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [deleteConfirmId, setDeleteConfirmId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pendingItem, setPendingItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pendingTitle, setPendingTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [pendingDescription, setPendingDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const pendingInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pendingContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Sync from props when not dragging
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditableSortingStepsBlock.useEffect": ()=>{
            if (draggedIndexRef.current === null) {
                setLocalItems(sortedFromProps);
                localItemsRef.current = sortedFromProps;
            }
        }
    }["EditableSortingStepsBlock.useEffect"], [
        sortedFromProps
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditableSortingStepsBlock.useEffect": ()=>{
            localItemsRef.current = localItems;
        }
    }["EditableSortingStepsBlock.useEffect"], [
        localItems
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditableSortingStepsBlock.useEffect": ()=>{
            if (pendingItem && pendingInputRef.current) {
                pendingInputRef.current.focus();
            }
        }
    }["EditableSortingStepsBlock.useEffect"], [
        pendingItem
    ]);
    const items = localItems;
    const updateItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableSortingStepsBlock.useCallback[updateItem]": (id, field, value)=>{
            const newItems = rawItems.map({
                "EditableSortingStepsBlock.useCallback[updateItem].newItems": (item)=>item.id === id ? {
                        ...item,
                        [field]: value
                    } : item
            }["EditableSortingStepsBlock.useCallback[updateItem].newItems"]);
            onDataChange({
                ...content,
                items: newItems
            });
        }
    }["EditableSortingStepsBlock.useCallback[updateItem]"], [
        rawItems,
        content,
        onDataChange
    ]);
    const confirmPendingItem = ()=>{
        const title = pendingTitle.trim();
        if (title) {
            const newId = `sort-${Date.now()}`;
            const maxOrder = rawItems.length > 0 ? Math.max(...rawItems.map((i)=>i.correctOrder)) : 0;
            const newItems = [
                ...rawItems,
                {
                    id: newId,
                    title,
                    content: pendingDescription.trim(),
                    correctOrder: maxOrder + 1
                }
            ];
            onDataChange({
                ...content,
                items: newItems
            });
        }
        setPendingItem(false);
        setPendingTitle('');
        setPendingDescription('');
    };
    const handlePendingBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableSortingStepsBlock.useCallback[handlePendingBlur]": (e)=>{
            // Only confirm when focus leaves the entire pending container
            if (pendingContainerRef.current && !pendingContainerRef.current.contains(e.relatedTarget)) {
                confirmPendingItem();
            }
        }
    }["EditableSortingStepsBlock.useCallback[handlePendingBlur]"], [
        pendingTitle,
        pendingDescription,
        rawItems,
        content,
        onDataChange
    ]);
    const removeItem = (id)=>{
        const filtered = rawItems.filter((item)=>item.id !== id);
        const sorted = [
            ...filtered
        ].sort((a, b)=>a.correctOrder - b.correctOrder);
        const reindexed = sorted.map((item, idx)=>({
                ...item,
                correctOrder: idx + 1
            }));
        onDataChange({
            ...content,
            items: reindexed
        });
        setDeleteConfirmId(null);
    };
    const handleDragStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableSortingStepsBlock.useCallback[handleDragStart]": (index)=>{
            draggedIndexRef.current = index;
            setDraggedIndex(index);
        }
    }["EditableSortingStepsBlock.useCallback[handleDragStart]"], []);
    const handleDragOver = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableSortingStepsBlock.useCallback[handleDragOver]": (e, targetIndex)=>{
            e.preventDefault();
            const dIdx = draggedIndexRef.current;
            if (dIdx === null || dIdx === targetIndex) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const mouseY = e.clientY;
            // 10% threshold to prevent oscillation
            if (dIdx < targetIndex && mouseY < rect.top + rect.height * 0.1) return;
            if (dIdx > targetIndex && mouseY > rect.top + rect.height * 0.9) return;
            setLocalItems({
                "EditableSortingStepsBlock.useCallback[handleDragOver]": (prev)=>{
                    const newItems = [
                        ...prev
                    ];
                    const [removed] = newItems.splice(dIdx, 1);
                    newItems.splice(targetIndex, 0, removed);
                    localItemsRef.current = newItems;
                    return newItems;
                }
            }["EditableSortingStepsBlock.useCallback[handleDragOver]"]);
            draggedIndexRef.current = targetIndex;
            setDraggedIndex(targetIndex);
        }
    }["EditableSortingStepsBlock.useCallback[handleDragOver]"], []);
    const handleDragEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableSortingStepsBlock.useCallback[handleDragEnd]": ()=>{
            if (draggedIndexRef.current !== null) {
                const current = localItemsRef.current;
                const reindexed = current.map({
                    "EditableSortingStepsBlock.useCallback[handleDragEnd].reindexed": (item, idx)=>({
                            ...item,
                            correctOrder: idx + 1
                        })
                }["EditableSortingStepsBlock.useCallback[handleDragEnd].reindexed"]);
                onDataChange({
                    ...content,
                    items: reindexed
                });
            }
            draggedIndexRef.current = null;
            setDraggedIndex(null);
        }
    }["EditableSortingStepsBlock.useCallback[handleDragEnd]"], [
        content,
        onDataChange
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: [
                items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        draggable: true,
                        onDragStart: ()=>handleDragStart(index),
                        onDragOver: (e)=>handleDragOver(e, index),
                        onDragEnd: handleDragEnd,
                        className: `flex items-start gap-3 p-4 border-2 rounded-lg transition-all group/step ${draggedIndex === index ? 'opacity-50 scale-[1.02] border-[#9F80DA] bg-[#9F80DA]/5' : 'border-gray-200 hover:border-gray-300 bg-white'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-shrink-0 cursor-grab active:cursor-grabbing pt-1 text-gray-400 hover:text-gray-600",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__["GripVertical"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1321,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 1320,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex-shrink-0 w-7 h-7 rounded-full bg-[#9F80DA] text-white text-sm font-semibold flex items-center justify-center",
                                children: index + 1
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 1325,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0 cursor-text",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                        value: item.title,
                                        onChange: (v)=>updateItem(item.id, 'title', v),
                                        tag: "p",
                                        className: "font-medium text-gray-900",
                                        placeholder: "Step title...",
                                        multiline: false
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 1331,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                        value: item.content || '',
                                        onChange: (v)=>updateItem(item.id, 'content', v),
                                        tag: "p",
                                        className: "text-sm text-gray-600 mt-1",
                                        style: {
                                            lineHeight: '1.5'
                                        },
                                        placeholder: "Description (optional)..."
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 1339,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 1330,
                                columnNumber: 13
                            }, this),
                            deleteConfirmId === item.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 flex-shrink-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-red-600 font-medium",
                                        children: "Delete?"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 1352,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>removeItem(item.id),
                                        className: "px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors",
                                        children: "Yes"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 1353,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setDeleteConfirmId(null),
                                        className: "px-3 py-1 text-sm font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors",
                                        children: "No"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 1359,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 1351,
                                columnNumber: 15
                            }, this) : items.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setDeleteConfirmId(item.id),
                                className: "flex-shrink-0 text-gray-300 hover:text-red-500 transition-colors pt-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1372,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 1368,
                                columnNumber: 17
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 1307,
                        columnNumber: 11
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-2 border-dashed border-gray-300 rounded-lg overflow-hidden hover:border-[#9F80DA] transition-colors",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: pendingContainerRef,
                        className: "flex items-start gap-3 p-4",
                        onBlur: pendingItem ? handlePendingBlur : undefined,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-shrink-0 text-gray-300 pt-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__["GripVertical"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1387,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 1386,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex-shrink-0 w-7 h-7 rounded-full bg-gray-200 text-gray-400 text-sm font-semibold flex items-center justify-center",
                                children: items.length + 1
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 1389,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: pendingItem ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            ref: pendingInputRef,
                                            type: "text",
                                            value: pendingTitle,
                                            onChange: (e)=>setPendingTitle(e.target.value),
                                            onKeyDown: (e)=>{
                                                if (e.key === 'Escape') {
                                                    setPendingItem(false);
                                                    setPendingTitle('');
                                                    setPendingDescription('');
                                                }
                                            },
                                            className: "w-full font-medium text-left bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30 rounded-sm",
                                            placeholder: "Step title..."
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 1395,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: pendingDescription,
                                            onChange: (e)=>setPendingDescription(e.target.value),
                                            onKeyDown: (e)=>{
                                                if (e.key === 'Enter') confirmPendingItem();
                                                if (e.key === 'Escape') {
                                                    setPendingItem(false);
                                                    setPendingTitle('');
                                                    setPendingDescription('');
                                                }
                                            },
                                            className: "w-full text-sm text-left bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30 rounded-sm mt-1",
                                            placeholder: "Description (optional)..."
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 1410,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1394,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: ()=>setPendingItem(true),
                                    className: "cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium text-gray-400 hover:text-gray-500 transition-colors",
                                            children: "New step"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 1428,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-300 mt-1",
                                            children: "Description (optional)..."
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 1431,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1427,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 1392,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 1381,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 1380,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 1305,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 1304,
        columnNumber: 5
    }, this);
}
_s6(EditableSortingStepsBlock, "BJ8SX+ASMFNHFCGGsaqJmLHiSvY=");
_c8 = EditableSortingStepsBlock;
// ─── MultipleResponse: Notion-style inline editing ──────────────────
function EditableMultipleResponseBlock({ content, onDataChange }) {
    _s7();
    const items = content.items || [];
    const [deleteConfirmId, setDeleteConfirmId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pendingItem, setPendingItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pendingText, setPendingText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const pendingInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pendingContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditableMultipleResponseBlock.useEffect": ()=>{
            if (pendingItem && pendingInputRef.current) {
                pendingInputRef.current.focus();
            }
        }
    }["EditableMultipleResponseBlock.useEffect"], [
        pendingItem
    ]);
    const updateQuestion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableMultipleResponseBlock.useCallback[updateQuestion]": (value)=>{
            onDataChange({
                ...content,
                question: value
            });
        }
    }["EditableMultipleResponseBlock.useCallback[updateQuestion]"], [
        content,
        onDataChange
    ]);
    const updateItemText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableMultipleResponseBlock.useCallback[updateItemText]": (id, value)=>{
            const newItems = items.map({
                "EditableMultipleResponseBlock.useCallback[updateItemText].newItems": (item)=>item.id === id ? {
                        ...item,
                        text: value
                    } : item
            }["EditableMultipleResponseBlock.useCallback[updateItemText].newItems"]);
            onDataChange({
                ...content,
                items: newItems
            });
        }
    }["EditableMultipleResponseBlock.useCallback[updateItemText]"], [
        items,
        content,
        onDataChange
    ]);
    const toggleCorrect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableMultipleResponseBlock.useCallback[toggleCorrect]": (id)=>{
            const newItems = items.map({
                "EditableMultipleResponseBlock.useCallback[toggleCorrect].newItems": (item)=>item.id === id ? {
                        ...item,
                        isCorrect: !item.isCorrect
                    } : item
            }["EditableMultipleResponseBlock.useCallback[toggleCorrect].newItems"]);
            onDataChange({
                ...content,
                items: newItems
            });
        }
    }["EditableMultipleResponseBlock.useCallback[toggleCorrect]"], [
        items,
        content,
        onDataChange
    ]);
    const confirmPendingItem = ()=>{
        const text = pendingText.trim();
        if (text) {
            const newId = `mr-${Date.now()}`;
            const newItems = [
                ...items,
                {
                    id: newId,
                    text,
                    isCorrect: false
                }
            ];
            onDataChange({
                ...content,
                items: newItems
            });
        }
        setPendingItem(false);
        setPendingText('');
    };
    const handlePendingBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableMultipleResponseBlock.useCallback[handlePendingBlur]": (e)=>{
            if (pendingContainerRef.current && !pendingContainerRef.current.contains(e.relatedTarget)) {
                confirmPendingItem();
            }
        }
    }["EditableMultipleResponseBlock.useCallback[handlePendingBlur]"], [
        pendingText,
        items,
        content,
        onDataChange
    ]);
    const removeItem = (id)=>{
        onDataChange({
            ...content,
            items: items.filter((item)=>item.id !== id)
        });
        setDeleteConfirmId(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 cursor-text",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                    value: String(content.question || ''),
                    onChange: updateQuestion,
                    tag: "h3",
                    className: "text-lg font-semibold",
                    placeholder: "Enter question...",
                    multiline: false
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 1508,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 1507,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-gray-500 mb-3",
                children: "Select all that apply"
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 1518,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 p-4 border-2 rounded-lg transition-all group/opt border-gray-200 hover:border-gray-300 bg-white",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>toggleCorrect(item.id),
                                    className: `flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${item.isCorrect ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-[#9F80DA]'}`,
                                    title: item.isCorrect ? 'Marked as correct' : 'Mark as correct',
                                    children: item.isCorrect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 1537,
                                        columnNumber: 34
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1528,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0 cursor-text",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                        value: item.text,
                                        onChange: (v)=>updateItemText(item.id, v),
                                        tag: "span",
                                        className: "text-gray-900",
                                        placeholder: "Option text...",
                                        multiline: false
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 1542,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1541,
                                    columnNumber: 13
                                }, this),
                                deleteConfirmId === item.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 flex-shrink-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-red-600 font-medium",
                                            children: "Delete?"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 1555,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>removeItem(item.id),
                                            className: "px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors",
                                            children: "Yes"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 1556,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setDeleteConfirmId(null),
                                            className: "px-3 py-1 text-sm font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors",
                                            children: "No"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 1562,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1554,
                                    columnNumber: 15
                                }, this) : items.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setDeleteConfirmId(item.id),
                                    className: "flex-shrink-0 text-gray-300 hover:text-red-500 transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 1575,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1571,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, item.id, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 1523,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-2 border-dashed border-gray-300 rounded-lg overflow-hidden hover:border-[#9F80DA] transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: pendingContainerRef,
                            className: "flex items-center gap-3 p-4",
                            onBlur: pendingItem ? handlePendingBlur : undefined,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-shrink-0 w-5 h-5 rounded border-2 border-gray-200"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1589,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: pendingItem ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        ref: pendingInputRef,
                                        type: "text",
                                        value: pendingText,
                                        onChange: (e)=>setPendingText(e.target.value),
                                        onKeyDown: (e)=>{
                                            if (e.key === 'Enter') confirmPendingItem();
                                            if (e.key === 'Escape') {
                                                setPendingItem(false);
                                                setPendingText('');
                                            }
                                        },
                                        className: "w-full text-left bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30 rounded-sm",
                                        placeholder: "Option text..."
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 1592,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setPendingItem(true),
                                        className: "text-gray-400 hover:text-gray-500 text-left transition-colors",
                                        children: "New option"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 1608,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1590,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 1584,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 1583,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 1521,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 space-y-2 border-t border-gray-100 pt-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-medium text-gray-400 uppercase tracking-wide",
                        children: "Feedback (shown after answering)"
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 1621,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 1623,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 cursor-text",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                    value: String(content.feedbackCorrect || ''),
                                    onChange: (v)=>onDataChange({
                                            ...content,
                                            feedbackCorrect: v
                                        }),
                                    tag: "p",
                                    className: "text-sm text-green-700",
                                    placeholder: "All correct! Great job..."
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1625,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 1624,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 1622,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 1629,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 cursor-text",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                    value: String(content.feedbackIncorrect || ''),
                                    onChange: (v)=>onDataChange({
                                            ...content,
                                            feedbackIncorrect: v
                                        }),
                                    tag: "p",
                                    className: "text-sm text-red-700",
                                    placeholder: "Some answers are incorrect..."
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1631,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 1630,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 1628,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 1620,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 1505,
        columnNumber: 5
    }, this);
}
_s7(EditableMultipleResponseBlock, "9HxT2foD4BsU3WrN19/Hk9Co3Os=");
_c9 = EditableMultipleResponseBlock;
// ─── CauseEffect: Notion-style inline editing ──────────────────────
function EditableCauseEffectBlock({ content, onDataChange }) {
    _s8();
    const updateField = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableCauseEffectBlock.useCallback[updateField]": (field, value)=>{
            onDataChange({
                ...content,
                [field]: value
            });
        }
    }["EditableCauseEffectBlock.useCallback[updateField]"], [
        content,
        onDataChange
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-6 rounded-lg border border-gray-200 bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-lg font-semibold mb-4 text-gray-900",
                children: "Cause and Effect"
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 1657,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 p-4 rounded-lg bg-gray-100 cursor-text",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                            value: String(content.cause || ''),
                            onChange: (v)=>updateField('cause', v),
                            tag: "p",
                            className: "text-sm",
                            style: {
                                lineHeight: '1.5',
                                color: 'var(--block-text-color, #374151)'
                            },
                            placeholder: "Enter cause..."
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 1661,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 1660,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0 self-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                className: "w-5 h-5 text-white rotate-90 sm:rotate-0"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 1674,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 1673,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 1672,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 p-4 rounded-lg bg-orange-500 cursor-text",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                            value: String(content.effect || ''),
                            onChange: (v)=>updateField('effect', v),
                            tag: "p",
                            className: "text-sm text-white",
                            style: {
                                lineHeight: '1.5',
                                color: '#ffffff'
                            },
                            placeholder: "Enter effect..."
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 1680,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 1679,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 1658,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 1656,
        columnNumber: 5
    }, this);
}
_s8(EditableCauseEffectBlock, "FA/oORZXE9/ijN8lnzUT4cwnNi4=");
_c10 = EditableCauseEffectBlock;
// ─── Image Block: real component + click to change ─────────────────
function EditableImageBlock({ component, content, onDataChange }) {
    _s9();
    const [showPicker, setShowPicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative group cursor-pointer",
                onClick: ()=>setShowPicker(true),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$CourseComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CourseComponent"], {
                        component: component
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 1713,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "px-3 py-1.5 bg-white/90 text-sm text-gray-600 rounded-lg shadow-sm border border-gray-200 flex items-center gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1716,
                                    columnNumber: 13
                                }, this),
                                "Change image"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 1715,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 1714,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 1709,
                columnNumber: 7
            }, this),
            showPicker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$ImagePickerModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImagePickerModal"], {
                currentUrl: String(content.image || ''),
                onSelect: (url)=>onDataChange({
                        ...content,
                        image: url
                    }),
                onClose: ()=>setShowPicker(false)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 1723,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s9(EditableImageBlock, "PcDCImg70lXrYgxmpw3ewp/jgFc=");
_c11 = EditableImageBlock;
// ─── Image+Text Block: clickable image + Notion-style text ──────────
function ImageOverlay({ image, alt, onChangeImage, className }) {
    const src = !image ? '' : image === '/sample.jpeg' || image.includes('sample') ? 'https://placehold.co/800x600/e2e8f0/64748b?text=Sample+Image' : image;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative group/img cursor-pointer h-full ${className || ''}`,
        onClick: onChangeImage,
        children: [
            src ? // eslint-disable-next-line @next/next/no-img-element
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: src,
                alt: alt,
                className: "w-full h-full object-cover rounded-lg"
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 1758,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full h-full bg-gray-200 flex items-center justify-center rounded-lg",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-gray-400",
                    children: "Image not available"
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 1761,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 1760,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-transparent group-hover/img:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover/img:opacity-100 pointer-events-none rounded-lg",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "px-3 py-1.5 bg-white/90 text-sm text-gray-600 rounded-lg shadow-sm border border-gray-200 flex items-center gap-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 1766,
                            columnNumber: 11
                        }, this),
                        "Change image"
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 1765,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 1764,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 1752,
        columnNumber: 5
    }, this);
}
_c12 = ImageOverlay;
function EditableImageWithTextBlock({ componentName, content, onDataChange }) {
    _s10();
    const [showPicker, setShowPicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const image = String(content.image || '');
    const alt = String(content.alt || 'Image');
    const imageSize = content.imageSize || 50;
    const updateText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableImageWithTextBlock.useCallback[updateText]": (value)=>onDataChange({
                ...content,
                text: value
            })
    }["EditableImageWithTextBlock.useCallback[updateText]"], [
        content,
        onDataChange
    ]);
    const textEditor = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
        value: String(content.text || ''),
        onChange: updateText,
        tag: "p",
        className: "text-base leading-relaxed",
        style: {
            lineHeight: '1.75'
        },
        placeholder: "Enter text..."
    }, void 0, false, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 1793,
        columnNumber: 5
    }, this);
    const imageOverlay = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageOverlay, {
        image: image,
        alt: alt,
        onChangeImage: ()=>setShowPicker(true)
    }, void 0, false, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 1804,
        columnNumber: 5
    }, this);
    const imgWidthClass = `w-full md:w-[${imageSize}%]`;
    const txtWidthClass = `w-full md:w-[${100 - imageSize}%]`;
    let layout;
    if (componentName === 'ImageWithTextCenterBlock') {
        layout = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full p-4 space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-full h-48 rounded-lg overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageOverlay, {
                            image: image,
                            alt: alt,
                            onChangeImage: ()=>setShowPicker(true),
                            className: "w-full h-full"
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 1820,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-black/30 pointer-events-none rounded-lg"
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 1826,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 1819,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 rounded-lg cursor-text text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                        value: String(content.text || ''),
                        onChange: updateText,
                        tag: "p",
                        className: "text-base leading-relaxed",
                        style: {
                            lineHeight: '1.75'
                        },
                        placeholder: "Enter text..."
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 1829,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 1828,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 1818,
            columnNumber: 7
        }, this);
    } else if (componentName === 'ImageWithTextTopBlock') {
        layout = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full p-4 flex flex-col-reverse gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-full h-64",
                    children: imageOverlay
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 1843,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 rounded-lg cursor-text",
                    children: textEditor
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 1846,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 1842,
            columnNumber: 7
        }, this);
    } else if (componentName === 'ImageWithTextBottomBlock') {
        layout = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full p-4 flex flex-col gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-full h-64",
                    children: imageOverlay
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 1854,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 rounded-lg cursor-text",
                    children: textEditor
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 1857,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 1853,
            columnNumber: 7
        }, this);
    } else if (componentName === 'ImageWithTextLeftBlock') {
        layout = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col md:flex-row-reverse gap-4",
                style: {
                    alignItems: 'stretch'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative h-48 md:h-64",
                        style: {
                            width: '100%',
                            flex: `0 0 ${imageSize}%`
                        },
                        children: imageOverlay
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 1866,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center p-4 rounded-lg cursor-text",
                        style: {
                            flex: 1
                        },
                        children: textEditor
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 1869,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 1865,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 1864,
            columnNumber: 7
        }, this);
    } else {
        // ImageWithTextBlock — image left, text right
        layout = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col md:flex-row gap-4",
                style: {
                    alignItems: 'stretch'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative h-48 md:h-64",
                        style: {
                            width: '100%',
                            flex: `0 0 ${imageSize}%`
                        },
                        children: imageOverlay
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 1880,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center p-4 rounded-lg cursor-text",
                        style: {
                            flex: 1
                        },
                        children: textEditor
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 1883,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 1879,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 1878,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            layout,
            showPicker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$ImagePickerModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImagePickerModal"], {
                currentUrl: image,
                onSelect: (url)=>onDataChange({
                        ...content,
                        image: url
                    }),
                onClose: ()=>setShowPicker(false)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 1895,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s10(EditableImageWithTextBlock, "LKQo8I0iC1RfJWV6nkFiwXqrrPw=");
_c13 = EditableImageWithTextBlock;
// ─── MultipleChoice: Notion-style inline editing ────────────────────
function EditableMultipleChoiceBlock({ content, onDataChange }) {
    _s11();
    const items = content.items || [];
    const [deleteConfirmId, setDeleteConfirmId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pendingItem, setPendingItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pendingText, setPendingText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const pendingInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pendingContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditableMultipleChoiceBlock.useEffect": ()=>{
            if (pendingItem && pendingInputRef.current) pendingInputRef.current.focus();
        }
    }["EditableMultipleChoiceBlock.useEffect"], [
        pendingItem
    ]);
    const updateItemField = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableMultipleChoiceBlock.useCallback[updateItemField]": (id, field, value)=>{
            let newItems = items.map({
                "EditableMultipleChoiceBlock.useCallback[updateItemField].newItems": (item)=>item.id === id ? {
                        ...item,
                        [field]: value
                    } : item
            }["EditableMultipleChoiceBlock.useCallback[updateItemField].newItems"]);
            if (field === 'isCorrect' && value === true) {
                newItems = newItems.map({
                    "EditableMultipleChoiceBlock.useCallback[updateItemField]": (item)=>item.id === id ? item : {
                            ...item,
                            isCorrect: false
                        }
                }["EditableMultipleChoiceBlock.useCallback[updateItemField]"]);
            }
            onDataChange({
                ...content,
                items: newItems
            });
        }
    }["EditableMultipleChoiceBlock.useCallback[updateItemField]"], [
        items,
        content,
        onDataChange
    ]);
    const confirmPendingItem = ()=>{
        const text = pendingText.trim();
        if (text) onDataChange({
            ...content,
            items: [
                ...items,
                {
                    id: `mc-${Date.now()}`,
                    text,
                    isCorrect: false
                }
            ]
        });
        setPendingItem(false);
        setPendingText('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handlePendingBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableMultipleChoiceBlock.useCallback[handlePendingBlur]": (e)=>{
            if (pendingContainerRef.current && !pendingContainerRef.current.contains(e.relatedTarget)) confirmPendingItem();
        }
    }["EditableMultipleChoiceBlock.useCallback[handlePendingBlur]"], [
        pendingText,
        items,
        content,
        onDataChange
    ]);
    const removeItem = (id)=>{
        onDataChange({
            ...content,
            items: items.filter((item)=>item.id !== id)
        });
        setDeleteConfirmId(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 cursor-text",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                    value: String(content.question || ''),
                    onChange: (v)=>onDataChange({
                            ...content,
                            question: v
                        }),
                    tag: "h3",
                    className: "text-lg font-semibold",
                    placeholder: "Enter question...",
                    multiline: false
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 1942,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 1941,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-gray-500 mb-3",
                children: "Select one correct answer"
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 1944,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 p-4 border-2 rounded-lg transition-all group/opt border-gray-200 hover:border-gray-300 bg-white",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>updateItemField(item.id, 'isCorrect', !item.isCorrect),
                                    className: `flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${item.isCorrect ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-[#9F80DA]'}`,
                                    children: item.isCorrect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                        className: "w-2 h-2 fill-white"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 1949,
                                        columnNumber: 34
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1948,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0 cursor-text",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                        value: item.text,
                                        onChange: (v)=>updateItemField(item.id, 'text', v),
                                        tag: "span",
                                        className: "text-gray-900",
                                        placeholder: "Option text...",
                                        multiline: false
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 1952,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1951,
                                    columnNumber: 13
                                }, this),
                                deleteConfirmId === item.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 flex-shrink-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>removeItem(item.id),
                                            className: "px-2 py-0.5 text-xs text-white bg-red-500 rounded",
                                            children: "Yes"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 1956,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setDeleteConfirmId(null),
                                            className: "px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded",
                                            children: "No"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 1957,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1955,
                                    columnNumber: 15
                                }, this) : items.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setDeleteConfirmId(item.id),
                                    className: "flex-shrink-0 text-gray-300 hover:text-red-500",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 1960,
                                        columnNumber: 126
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1960,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, item.id, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 1947,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: pendingContainerRef,
                            className: "flex items-center gap-3 p-4",
                            onBlur: pendingItem ? handlePendingBlur : undefined,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-shrink-0 w-5 h-5 rounded-full border-2 border-gray-200"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1966,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: pendingItem ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        ref: pendingInputRef,
                                        type: "text",
                                        value: pendingText,
                                        onChange: (e)=>setPendingText(e.target.value),
                                        onKeyDown: (e)=>{
                                            if (e.key === 'Enter') confirmPendingItem();
                                            if (e.key === 'Escape') {
                                                setPendingItem(false);
                                                setPendingText('');
                                            }
                                        },
                                        className: "w-full bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30 rounded-sm",
                                        placeholder: "Option text..."
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 1969,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setPendingItem(true),
                                        className: "text-gray-400 hover:text-gray-500 transition-colors",
                                        children: "New option"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 1971,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1967,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 1965,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 1964,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 1945,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 space-y-2 border-t border-gray-100 pt-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-medium text-gray-400 uppercase tracking-wide",
                        children: "Feedback (shown after answering)"
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 1979,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 1981,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 cursor-text",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                    value: String(content.feedbackCorrect || ''),
                                    onChange: (v)=>onDataChange({
                                            ...content,
                                            feedbackCorrect: v
                                        }),
                                    tag: "p",
                                    className: "text-sm text-green-700",
                                    placeholder: "Correct! Well done..."
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1983,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 1982,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 1980,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 1987,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 cursor-text",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                    value: String(content.feedbackIncorrect || ''),
                                    onChange: (v)=>onDataChange({
                                            ...content,
                                            feedbackIncorrect: v
                                        }),
                                    tag: "p",
                                    className: "text-sm text-red-700",
                                    placeholder: "Not quite. Try again..."
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 1989,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 1988,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 1986,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 1978,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 1940,
        columnNumber: 5
    }, this);
}
_s11(EditableMultipleChoiceBlock, "CCMzy6c8vwMYE+Wft5vX/n55cLQ=");
_c14 = EditableMultipleChoiceBlock;
// ─── FillInTheBlank: Notion-style inline editing ────────────────────
function EditableFillInBlankBlock({ content, onDataChange }) {
    _s12();
    const items = content.items || [];
    const [deleteItemConfirmId, setDeleteItemConfirmId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deleteAnswerKey, setDeleteAnswerKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const updateItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableFillInBlankBlock.useCallback[updateItem]": (id, field, value)=>{
            onDataChange({
                ...content,
                items: items.map({
                    "EditableFillInBlankBlock.useCallback[updateItem]": (item)=>item.id === id ? {
                            ...item,
                            [field]: value
                        } : item
                }["EditableFillInBlankBlock.useCallback[updateItem]"])
            });
        }
    }["EditableFillInBlankBlock.useCallback[updateItem]"], [
        items,
        content,
        onDataChange
    ]);
    const updateAnswer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableFillInBlankBlock.useCallback[updateAnswer]": (itemId, ansIdx, value)=>{
            const newItems = items.map({
                "EditableFillInBlankBlock.useCallback[updateAnswer].newItems": (item)=>{
                    if (item.id !== itemId) return item;
                    const newAnswers = [
                        ...item.answers
                    ];
                    newAnswers[ansIdx] = value;
                    return {
                        ...item,
                        answers: newAnswers
                    };
                }
            }["EditableFillInBlankBlock.useCallback[updateAnswer].newItems"]);
            onDataChange({
                ...content,
                items: newItems
            });
        }
    }["EditableFillInBlankBlock.useCallback[updateAnswer]"], [
        items,
        content,
        onDataChange
    ]);
    const addItem = ()=>{
        onDataChange({
            ...content,
            items: [
                ...items,
                {
                    id: `fib-${Date.now()}`,
                    text: '',
                    answers: [
                        ''
                    ]
                }
            ]
        });
    };
    const addAnswer = (itemId)=>{
        onDataChange({
            ...content,
            items: items.map((item)=>item.id === itemId ? {
                    ...item,
                    answers: [
                        ...item.answers,
                        ''
                    ]
                } : item)
        });
    };
    const removeItem = (id)=>{
        onDataChange({
            ...content,
            items: items.filter((item)=>item.id !== id)
        });
        setDeleteItemConfirmId(null);
    };
    const removeAnswer = (itemId, ansIdx)=>{
        onDataChange({
            ...content,
            items: items.map((item)=>item.id === itemId ? {
                    ...item,
                    answers: item.answers.filter((_, i)=>i !== ansIdx)
                } : item)
        });
        setDeleteAnswerKey(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg space-y-4",
        children: [
            items.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 border-2 border-gray-200 rounded-lg group/fib hover:border-gray-300",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-medium text-gray-400 pt-1",
                                    children: [
                                        idx + 1,
                                        "."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2027,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 cursor-text",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                        value: item.text,
                                        onChange: (v)=>updateItem(item.id, 'text', v),
                                        tag: "p",
                                        className: "text-gray-900",
                                        placeholder: "Text with ___ for blanks..."
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2029,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2028,
                                    columnNumber: 13
                                }, this),
                                deleteItemConfirmId === item.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1 flex-shrink-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>removeItem(item.id),
                                            className: "px-2 py-0.5 text-xs text-white bg-red-500 rounded",
                                            children: "Yes"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2033,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setDeleteItemConfirmId(null),
                                            className: "px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded",
                                            children: "No"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2034,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2032,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setDeleteItemConfirmId(item.id),
                                    className: "text-gray-300 hover:text-red-500",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2037,
                                        columnNumber: 116
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2037,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2026,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3 pl-6 space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-medium text-gray-500 mb-1",
                                    children: "Correct answers:"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2041,
                                    columnNumber: 13
                                }, this),
                                item.answers.map((ans, ansIdx)=>{
                                    const ansKey = `${item.id}-${ansIdx}`;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                className: "w-3 h-3 text-green-500 flex-shrink-0"
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2046,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BlurInput, {
                                                value: ans,
                                                onSave: (v)=>updateAnswer(item.id, ansIdx, v),
                                                className: "flex-1 px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30",
                                                placeholder: "Answer..."
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2047,
                                                columnNumber: 19
                                            }, this),
                                            item.answers.length > 1 && (deleteAnswerKey === ansKey ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1 flex-shrink-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>removeAnswer(item.id, ansIdx),
                                                        className: "px-1.5 py-0.5 text-xs text-white bg-red-500 rounded",
                                                        children: "Yes"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                        lineNumber: 2051,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setDeleteAnswerKey(null),
                                                        className: "px-1.5 py-0.5 text-xs text-gray-600 bg-gray-200 rounded",
                                                        children: "No"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                        lineNumber: 2052,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2050,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setDeleteAnswerKey(ansKey),
                                                className: "text-gray-300 hover:text-red-500",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    className: "w-3 h-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2055,
                                                    columnNumber: 119
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2055,
                                                columnNumber: 23
                                            }, this))
                                        ]
                                    }, ansIdx, true, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2045,
                                        columnNumber: 17
                                    }, this);
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: ()=>addAnswer(item.id),
                                    className: "px-3 py-1.5 border border-dashed border-gray-300 rounded hover:border-[#9F80DA] transition-colors cursor-pointer text-xs text-gray-400 hover:text-[#9F80DA]",
                                    children: "New answer..."
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2061,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2040,
                            columnNumber: 11
                        }, this)
                    ]
                }, item.id, true, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 2025,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: addItem,
                className: "p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors cursor-pointer text-center text-sm text-gray-400 hover:text-[#9F80DA]",
                children: "New blank item..."
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2065,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 2023,
        columnNumber: 5
    }, this);
}
_s12(EditableFillInBlankBlock, "s7ukrwDNv1LNUxK6uGSBvpE4HFE=");
_c15 = EditableFillInBlankBlock;
// ─── MatchingPairs: Notion-style inline editing ─────────────────────
function EditableMatchingPairsBlock({ content, onDataChange }) {
    _s13();
    const itemsA = content.itemsA || [];
    const itemsB = content.itemsB || [];
    const [pendingActive, setPendingActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pendingLeft, setPendingLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [pendingRight, setPendingRight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const pendingLeftRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pendingContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditableMatchingPairsBlock.useEffect": ()=>{
            if (pendingActive && pendingLeftRef.current) pendingLeftRef.current.focus();
        }
    }["EditableMatchingPairsBlock.useEffect"], [
        pendingActive
    ]);
    const updateA = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableMatchingPairsBlock.useCallback[updateA]": (id, value)=>{
            onDataChange({
                ...content,
                itemsA: itemsA.map({
                    "EditableMatchingPairsBlock.useCallback[updateA]": (i)=>i.id === id ? {
                            ...i,
                            text: value
                        } : i
                }["EditableMatchingPairsBlock.useCallback[updateA]"])
            });
        }
    }["EditableMatchingPairsBlock.useCallback[updateA]"], [
        itemsA,
        content,
        onDataChange
    ]);
    const updateB = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableMatchingPairsBlock.useCallback[updateB]": (id, value)=>{
            onDataChange({
                ...content,
                itemsB: itemsB.map({
                    "EditableMatchingPairsBlock.useCallback[updateB]": (i)=>i.id === id ? {
                            ...i,
                            text: value
                        } : i
                }["EditableMatchingPairsBlock.useCallback[updateB]"])
            });
        }
    }["EditableMatchingPairsBlock.useCallback[updateB]"], [
        itemsB,
        content,
        onDataChange
    ]);
    const confirmPending = ()=>{
        const left = pendingLeft.trim();
        const right = pendingRight.trim();
        if (left || right) {
            const num = Math.max(0, ...itemsA.map((i)=>i.matchingNumber), ...itemsB.map((i)=>i.matchingNumber)) + 1;
            const ts = Date.now();
            onDataChange({
                ...content,
                itemsA: [
                    ...itemsA,
                    {
                        id: `a-${ts}`,
                        text: left,
                        matchingNumber: num
                    }
                ],
                itemsB: [
                    ...itemsB,
                    {
                        id: `b-${ts}`,
                        text: right,
                        matchingNumber: num
                    }
                ]
            });
        }
        setPendingActive(false);
        setPendingLeft('');
        setPendingRight('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handlePendingBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableMatchingPairsBlock.useCallback[handlePendingBlur]": (e)=>{
            if (pendingContainerRef.current && !pendingContainerRef.current.contains(e.relatedTarget)) confirmPending();
        }
    }["EditableMatchingPairsBlock.useCallback[handlePendingBlur]"], [
        pendingLeft,
        pendingRight,
        itemsA,
        itemsB,
        content,
        onDataChange
    ]);
    const removePair = (matchNum)=>{
        onDataChange({
            ...content,
            itemsA: itemsA.filter((i)=>i.matchingNumber !== matchNum),
            itemsB: itemsB.filter((i)=>i.matchingNumber !== matchNum)
        });
    };
    const pairs = itemsA.map((a)=>({
            a,
            b: itemsB.find((b)=>b.matchingNumber === a.matchingNumber)
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4 text-sm font-medium text-gray-500 px-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex-1",
                        children: "Column A"
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-6"
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2118,
                        columnNumber: 49
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex-1",
                        children: "Column B"
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2118,
                        columnNumber: 73
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-6"
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2118,
                        columnNumber: 113
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2117,
                columnNumber: 7
            }, this),
            pairs.map(({ a, b })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-4 group/pair",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 cursor-text",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                value: a.text,
                                onChange: (v)=>updateA(a.id, v),
                                tag: "div",
                                className: "p-3 border-2 border-gray-200 rounded-lg text-sm hover:border-gray-300",
                                placeholder: "Left item...",
                                multiline: false
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 2123,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2122,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-gray-400 flex-shrink-0",
                            children: "↔"
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2125,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 cursor-text",
                            children: b && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                value: b.text,
                                onChange: (v)=>updateB(b.id, v),
                                tag: "div",
                                className: "p-3 border-2 border-gray-200 rounded-lg text-sm hover:border-gray-300",
                                placeholder: "Right item...",
                                multiline: false
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 2127,
                                columnNumber: 19
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2126,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>removePair(a.matchingNumber),
                            className: "text-gray-300 hover:text-red-500",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 2129,
                                columnNumber: 109
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2129,
                            columnNumber: 11
                        }, this)
                    ]
                }, a.id, true, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 2121,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: pendingContainerRef,
                className: "flex items-center gap-4",
                onBlur: pendingActive ? handlePendingBlur : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: pendingActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ref: pendingLeftRef,
                            type: "text",
                            value: pendingLeft,
                            onChange: (e)=>setPendingLeft(e.target.value),
                            onKeyDown: (e)=>{
                                if (e.key === 'Escape') {
                                    setPendingActive(false);
                                    setPendingLeft('');
                                    setPendingRight('');
                                }
                            },
                            className: "w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30 focus:border-[#9F80DA]",
                            placeholder: "Left item..."
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2136,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>setPendingActive(true),
                            className: "p-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-400 cursor-pointer hover:border-[#9F80DA] transition-colors",
                            children: "Left item..."
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2138,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-gray-300 flex-shrink-0",
                        children: "↔"
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: pendingActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: pendingRight,
                            onChange: (e)=>setPendingRight(e.target.value),
                            onKeyDown: (e)=>{
                                if (e.key === 'Enter') confirmPending();
                                if (e.key === 'Escape') {
                                    setPendingActive(false);
                                    setPendingLeft('');
                                    setPendingRight('');
                                }
                            },
                            className: "w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30 focus:border-[#9F80DA]",
                            placeholder: "Right item..."
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2144,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>setPendingActive(true),
                            className: "p-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-400 cursor-pointer hover:border-[#9F80DA] transition-colors",
                            children: "Right item..."
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2146,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-6"
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2149,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2133,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 2116,
        columnNumber: 5
    }, this);
}
_s13(EditableMatchingPairsBlock, "DoThwMsaKXTYGAKSqQfOH4sPx1Q=");
_c16 = EditableMatchingPairsBlock;
// ─── SortingCategories: Notion-style inline editing ─────────────────
function EditableSortingCategoriesBlock({ content, onDataChange }) {
    _s14();
    const categories = content.categories || [];
    const cards = content.cards || [];
    const [deleteCatConfirmId, setDeleteCatConfirmId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deleteCardConfirmId, setDeleteCardConfirmId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const updateCategory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableSortingCategoriesBlock.useCallback[updateCategory]": (id, value)=>{
            onDataChange({
                ...content,
                categories: categories.map({
                    "EditableSortingCategoriesBlock.useCallback[updateCategory]": (c)=>c.id === id ? {
                            ...c,
                            title: value
                        } : c
                }["EditableSortingCategoriesBlock.useCallback[updateCategory]"])
            });
        }
    }["EditableSortingCategoriesBlock.useCallback[updateCategory]"], [
        categories,
        content,
        onDataChange
    ]);
    const updateCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableSortingCategoriesBlock.useCallback[updateCard]": (id, field, value)=>{
            onDataChange({
                ...content,
                cards: cards.map({
                    "EditableSortingCategoriesBlock.useCallback[updateCard]": (c)=>c.id === id ? {
                            ...c,
                            [field]: value
                        } : c
                }["EditableSortingCategoriesBlock.useCallback[updateCard]"])
            });
        }
    }["EditableSortingCategoriesBlock.useCallback[updateCard]"], [
        cards,
        content,
        onDataChange
    ]);
    const addCategory = ()=>{
        onDataChange({
            ...content,
            categories: [
                ...categories,
                {
                    id: `cat-${Date.now()}`,
                    title: ''
                }
            ]
        });
    };
    const addCard = (categoryId)=>{
        onDataChange({
            ...content,
            cards: [
                ...cards,
                {
                    id: `card-${Date.now()}`,
                    title: '',
                    correctCategory: categoryId
                }
            ]
        });
    };
    const removeCategory = (id)=>{
        onDataChange({
            ...content,
            categories: categories.filter((c)=>c.id !== id),
            cards: cards.filter((c)=>c.correctCategory !== id)
        });
        setDeleteCatConfirmId(null);
    };
    const removeCard = (id)=>{
        onDataChange({
            ...content,
            cards: cards.filter((c)=>c.id !== id)
        });
        setDeleteCardConfirmId(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg space-y-4",
        children: [
            categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-2 border-gray-200 rounded-lg p-4 group/cat hover:border-gray-300",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 mb-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 cursor-text",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                        value: cat.title,
                                        onChange: (v)=>updateCategory(cat.id, v),
                                        tag: "h3",
                                        className: "font-semibold text-gray-900",
                                        placeholder: "Category name...",
                                        multiline: false
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2182,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2181,
                                    columnNumber: 13
                                }, this),
                                categories.length > 1 && (deleteCatConfirmId === cat.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-red-600",
                                            children: "Delete?"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2187,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>removeCategory(cat.id),
                                            className: "px-2 py-0.5 text-xs text-white bg-red-500 rounded",
                                            children: "Yes"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2188,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setDeleteCatConfirmId(null),
                                            className: "px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded",
                                            children: "No"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2189,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2186,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setDeleteCatConfirmId(cat.id),
                                    className: "text-gray-300 hover:text-red-500",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2192,
                                        columnNumber: 116
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2192,
                                    columnNumber: 17
                                }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2180,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2 pl-4",
                            children: [
                                cards.filter((c)=>c.correctCategory === cat.id).map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-2 p-2 bg-white border border-gray-200 rounded-lg shadow-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 cursor-text",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                                    value: card.title,
                                                    onChange: (v)=>updateCard(card.id, 'title', v),
                                                    tag: "p",
                                                    className: "text-sm text-gray-900",
                                                    placeholder: "Card title...",
                                                    multiline: false
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2200,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2199,
                                                columnNumber: 17
                                            }, this),
                                            deleteCardConfirmId === card.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1 flex-shrink-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>removeCard(card.id),
                                                        className: "px-1.5 py-0.5 text-xs text-white bg-red-500 rounded",
                                                        children: "Yes"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                        lineNumber: 2204,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setDeleteCardConfirmId(null),
                                                        className: "px-1.5 py-0.5 text-xs text-gray-600 bg-gray-200 rounded",
                                                        children: "No"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                        lineNumber: 2205,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2203,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setDeleteCardConfirmId(card.id),
                                                className: "text-gray-300 hover:text-red-500 pt-0.5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    className: "w-3 h-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2208,
                                                    columnNumber: 127
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2208,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, card.id, true, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2198,
                                        columnNumber: 15
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: ()=>addCard(cat.id),
                                    className: "p-2 border border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors cursor-pointer text-center text-xs text-gray-400 hover:text-[#9F80DA]",
                                    children: "New card..."
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2212,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2196,
                            columnNumber: 11
                        }, this)
                    ]
                }, cat.id, true, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 2179,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: addCategory,
                className: "p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors cursor-pointer text-center text-sm text-gray-400 hover:text-[#9F80DA]",
                children: "New category..."
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2216,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 2177,
        columnNumber: 5
    }, this);
}
_s14(EditableSortingCategoriesBlock, "Go6gnrQ2iCcAe/xOGf+wnjnHbbs=");
_c17 = EditableSortingCategoriesBlock;
// ─── TwoField: Generic two-field comparison ─────────────────────────
function EditableTwoFieldBlock({ content, onDataChange, fieldA, fieldB, labelA, labelB, colorA, colorB }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-6 rounded-lg border border-gray-200 bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col sm:flex-row gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex-1 p-4 rounded-lg ${colorA} cursor-text`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                            value: String(content.labelA || labelA),
                            onChange: (v)=>onDataChange({
                                    ...content,
                                    labelA: v
                                }),
                            tag: "h3",
                            className: "text-xs font-semibold text-gray-500 mb-2",
                            placeholder: labelA,
                            multiline: false
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2228,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                            value: String(content[fieldA] || ''),
                            onChange: (v)=>onDataChange({
                                    ...content,
                                    [fieldA]: v
                                }),
                            tag: "p",
                            className: "text-sm",
                            style: {
                                color: 'var(--block-text-color, #374151)'
                            },
                            placeholder: `Enter ${labelA.toLowerCase()}...`
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2229,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 2227,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex-1 p-4 rounded-lg ${colorB} cursor-text`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                            value: String(content.labelB || labelB),
                            onChange: (v)=>onDataChange({
                                    ...content,
                                    labelB: v
                                }),
                            tag: "h3",
                            className: "text-xs font-semibold text-gray-500 mb-2",
                            placeholder: labelB,
                            multiline: false
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2232,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                            value: String(content[fieldB] || ''),
                            onChange: (v)=>onDataChange({
                                    ...content,
                                    [fieldB]: v
                                }),
                            tag: "p",
                            className: "text-sm",
                            style: {
                                color: 'var(--block-text-color, #374151)'
                            },
                            placeholder: `Enter ${labelB.toLowerCase()}...`
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2233,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 2231,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 2226,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 2225,
        columnNumber: 5
    }, this);
}
_c18 = EditableTwoFieldBlock;
// ─── TwoList: Generic two-list comparison ───────────────────────────
function TwoListColumnEditor({ items, colConfig, content, onDataChange, variant }) {
    _s15();
    const [pendingActive, setPendingActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pendingText, setPendingText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [deleteConfirmIdx, setDeleteConfirmIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const pendingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { field, label, icon: Icon, iconBg, iconColor, labelColor, bg, borderColor, bulletColor, headerBar, headerBarBg } = colConfig;
    const customLabelKey = `customLabel_${field}`;
    const displayLabel = String(content[customLabelKey] || label);
    const updateLabel = (v)=>onDataChange({
            ...content,
            [customLabelKey]: v
        });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TwoListColumnEditor.useEffect": ()=>{
            if (pendingActive && pendingRef.current) pendingRef.current.focus();
        }
    }["TwoListColumnEditor.useEffect"], [
        pendingActive
    ]);
    const update = (idx, value)=>{
        const n = [
            ...items
        ];
        n[idx] = value;
        onDataChange({
            ...content,
            [field]: n
        });
    };
    const remove = (idx)=>onDataChange({
            ...content,
            [field]: items.filter((_, i)=>i !== idx)
        });
    const confirmPending = ()=>{
        const text = pendingText.trim();
        if (text) onDataChange({
            ...content,
            [field]: [
                ...items,
                text
            ]
        });
        setPendingActive(false);
        setPendingText('');
    };
    // Header-bar variant (BeforeAfter)
    if (variant === 'header-bar') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 overflow-hidden rounded-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${headerBarBg} text-white text-center py-2 font-semibold`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                        value: displayLabel,
                        onChange: updateLabel,
                        tag: "span",
                        className: "text-white font-semibold",
                        placeholder: label,
                        multiline: false
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2268,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 2267,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `p-4 ${bg}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "space-y-3",
                            children: items.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "relative flex items-start gap-2 group/li",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 cursor-text",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                                value: item,
                                                onChange: (v)=>update(idx, v),
                                                tag: "p",
                                                className: "text-sm",
                                                style: {
                                                    color: 'var(--block-text-color, #4B5563)'
                                                },
                                                placeholder: "New item...",
                                                multiline: false
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2275,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2274,
                                            columnNumber: 17
                                        }, this),
                                        deleteConfirmIdx === idx ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute right-0 top-0 flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 whitespace-nowrap",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-red-600 font-medium",
                                                    children: "Delete?"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2279,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        remove(idx);
                                                        setDeleteConfirmIdx(null);
                                                    },
                                                    className: "px-2 py-0.5 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded transition-colors",
                                                    children: "Yes"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2280,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setDeleteConfirmIdx(null),
                                                    className: "px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 rounded transition-colors",
                                                    children: "No"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2281,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2278,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setDeleteConfirmIdx(idx),
                                            className: "text-gray-400 hover:text-red-500 mt-0.5",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                className: "w-3 h-3"
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2284,
                                                columnNumber: 120
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2284,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2273,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2271,
                            columnNumber: 11
                        }, this),
                        pendingActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ref: pendingRef,
                            type: "text",
                            value: pendingText,
                            onChange: (e)=>setPendingText(e.target.value),
                            onKeyDown: (e)=>{
                                if (e.key === 'Enter') confirmPending();
                                if (e.key === 'Escape') {
                                    setPendingActive(false);
                                    setPendingText('');
                                }
                            },
                            onBlur: confirmPending,
                            className: "w-full mt-3 px-3 py-1.5 text-sm bg-white/50 border border-dashed border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30 focus:border-[#9F80DA]",
                            placeholder: "New item..."
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2290,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>setPendingActive(true),
                            className: "mt-3 px-3 py-1.5 text-sm text-gray-400 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#9F80DA] transition-colors",
                            children: "New item..."
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2292,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 2270,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 2266,
            columnNumber: 7
        }, this);
    }
    // Bordered variant (DosDonts) or filled variant (ProsCons)
    const wrapperClass = variant === 'bordered' ? `flex-1 p-4 rounded-lg border-2 ${borderColor} ${bg}` : `flex-1 p-4 rounded-lg ${bg}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: wrapperClass,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 mb-3",
                children: [
                    Icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `w-6 h-6 ${variant === 'filled' ? 'w-8 h-8 rounded-full' : 'rounded'} ${iconBg} flex items-center justify-center`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            className: `w-4 h-4 ${iconColor}`
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2309,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2308,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                        value: displayLabel,
                        onChange: updateLabel,
                        tag: "span",
                        className: `font-semibold ${labelColor || 'text-gray-700'}`,
                        placeholder: label,
                        multiline: false
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2312,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2306,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "space-y-2",
                children: items.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "relative flex items-start gap-2 group/li",
                        children: [
                            bulletColor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `${bulletColor} mt-0.5`,
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 2317,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 cursor-text",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                    value: item,
                                    onChange: (v)=>update(idx, v),
                                    tag: "p",
                                    className: "text-sm",
                                    style: {
                                        color: 'var(--block-text-color, #4B5563)'
                                    },
                                    placeholder: "New item...",
                                    multiline: false
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2319,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 2318,
                                columnNumber: 13
                            }, this),
                            deleteConfirmIdx === idx ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute right-0 top-0 flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 whitespace-nowrap",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-red-600 font-medium",
                                        children: "Delete?"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2323,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            remove(idx);
                                            setDeleteConfirmIdx(null);
                                        },
                                        className: "px-2 py-0.5 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded transition-colors",
                                        children: "Yes"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2324,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setDeleteConfirmIdx(null),
                                        className: "px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 rounded transition-colors",
                                        children: "No"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2325,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 2322,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setDeleteConfirmIdx(idx),
                                className: "text-gray-400 hover:text-red-500 mt-0.5",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                    className: "w-3 h-3"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2328,
                                    columnNumber: 116
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 2328,
                                columnNumber: 15
                            }, this)
                        ]
                    }, idx, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2316,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2314,
                columnNumber: 7
            }, this),
            pendingActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: pendingRef,
                type: "text",
                value: pendingText,
                onChange: (e)=>setPendingText(e.target.value),
                onKeyDown: (e)=>{
                    if (e.key === 'Enter') confirmPending();
                    if (e.key === 'Escape') {
                        setPendingActive(false);
                        setPendingText('');
                    }
                },
                onBlur: confirmPending,
                className: "w-full mt-2 px-3 py-1.5 text-sm bg-white/50 border border-dashed border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30 focus:border-[#9F80DA]",
                placeholder: "New item..."
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2334,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: ()=>setPendingActive(true),
                className: "mt-2 px-3 py-1.5 text-sm text-gray-400 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#9F80DA] transition-colors",
                children: "New item..."
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2336,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 2305,
        columnNumber: 5
    }, this);
}
_s15(TwoListColumnEditor, "iTNtpBiuM2TtwiB9l3ea8N9Qm7Y=");
_c19 = TwoListColumnEditor;
function EditableTwoListBlock({ content, onDataChange, config }) {
    const leftItems = content[config.left.field] || [];
    const rightItems = content[config.right.field] || [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-6 rounded-lg border border-gray-200 bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TwoListColumnEditor, {
                    items: leftItems,
                    colConfig: config.left,
                    content: content,
                    onDataChange: onDataChange,
                    variant: config.variant
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 2349,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TwoListColumnEditor, {
                    items: rightItems,
                    colConfig: config.right,
                    content: content,
                    onDataChange: onDataChange,
                    variant: config.variant
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 2350,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 2348,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 2347,
        columnNumber: 5
    }, this);
}
_c20 = EditableTwoListBlock;
// ─── ComparisonItems: items with title/content ──────────────────────
function EditableComparisonItemsBlock({ content, onDataChange }) {
    _s16();
    const items = content.items || [];
    const blockStyle = content.blockStyle || 'A';
    const [deleteConfirmIdx, setDeleteConfirmIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showCompImagePicker, setShowCompImagePicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Style classes matching read-only ComparisonBlock A/B/C
    const compStyles = {
        A: {
            container: 'bg-white border border-gray-200',
            header: 'bg-primary text-white',
            content: 'bg-white'
        },
        B: {
            container: 'bg-gradient-to-b from-blue-50 to-white border border-blue-200',
            header: 'bg-blue-600 text-white',
            content: 'bg-transparent'
        },
        C: {
            container: 'bg-gray-50 border-2 border-gray-300',
            header: 'bg-gray-800 text-white',
            content: 'bg-white'
        }
    }[blockStyle];
    const updateItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableComparisonItemsBlock.useCallback[updateItem]": (idx, field, value)=>{
            const newItems = [
                ...items
            ];
            newItems[idx] = {
                ...newItems[idx],
                [field]: value
            };
            onDataChange({
                ...content,
                items: newItems
            });
        }
    }["EditableComparisonItemsBlock.useCallback[updateItem]"], [
        items,
        content,
        onDataChange
    ]);
    const addItem = ()=>onDataChange({
            ...content,
            items: [
                ...items,
                {
                    title: '',
                    content: ''
                }
            ]
        });
    const removeItem = (idx)=>{
        onDataChange({
            ...content,
            items: items.filter((_, i)=>i !== idx)
        });
        setDeleteConfirmIdx(null);
    };
    const getGridCols = ()=>{
        const count = items.length;
        if (count === 1) return 'grid-cols-1';
        if (count === 2) return 'grid-cols-1 sm:grid-cols-2';
        if (count === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `grid ${getGridCols()} gap-4`,
                children: [
                    items.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${compStyles.container} rounded-lg overflow-hidden shadow-sm group/ci`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `${compStyles.header} p-4 flex items-center gap-2`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 cursor-text",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                                value: item.title,
                                                onChange: (v)=>updateItem(idx, 'title', v),
                                                tag: "h3",
                                                className: "text-lg font-semibold text-center text-white",
                                                style: {
                                                    color: '#ffffff'
                                                },
                                                placeholder: "Title...",
                                                multiline: false
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2395,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2394,
                                            columnNumber: 15
                                        }, this),
                                        items.length > 1 && (deleteConfirmIdx === idx ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1 flex-shrink-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>removeItem(idx),
                                                    className: "px-2 py-0.5 text-xs text-white bg-red-700 rounded",
                                                    children: "Yes"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2400,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setDeleteConfirmIdx(null),
                                                    className: "px-2 py-0.5 text-xs text-white bg-white/30 rounded",
                                                    children: "No"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2401,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2399,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setDeleteConfirmIdx(idx),
                                            className: "text-white/60 hover:text-white flex-shrink-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2404,
                                                columnNumber: 125
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2404,
                                            columnNumber: 19
                                        }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2393,
                                    columnNumber: 13
                                }, this),
                                item.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative group/img h-28 w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: item.image,
                                            alt: item.title,
                                            className: "w-full h-full object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2412,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setShowCompImagePicker(idx),
                                                    className: "px-2 py-1 text-xs text-white bg-white/20 hover:bg-white/30 rounded",
                                                    children: "Change"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2414,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>updateItem(idx, 'image', ''),
                                                    className: "px-2 py-1 text-xs text-white bg-red-500/60 hover:bg-red-500/80 rounded",
                                                    children: "Remove"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2415,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2413,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2410,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowCompImagePicker(idx),
                                    className: "w-full py-2 flex items-center justify-center gap-1 text-xs text-gray-400 hover:text-[#9F80DA] border-b border-dashed border-gray-200 hover:border-[#9F80DA] transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2423,
                                            columnNumber: 17
                                        }, this),
                                        "Add image"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2419,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `${compStyles.content} p-4 cursor-text`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                        value: item.content,
                                        onChange: (v)=>updateItem(idx, 'content', v),
                                        tag: "p",
                                        className: "text-center",
                                        style: {
                                            color: 'var(--block-text-color, inherit)'
                                        },
                                        placeholder: "Content..."
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2429,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2428,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, idx, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2391,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: addItem,
                        className: "border-2 border-dashed border-gray-300 rounded-lg overflow-hidden hover:border-[#9F80DA] transition-colors cursor-pointer flex items-center justify-center min-h-[120px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center text-gray-400",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "w-5 h-5 mx-auto mb-1"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2436,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm",
                                    children: "New item"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2437,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2435,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2434,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2389,
                columnNumber: 7
            }, this),
            showCompImagePicker !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$ImagePickerModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImagePickerModal"], {
                currentUrl: items[showCompImagePicker]?.image,
                onSelect: (url)=>{
                    updateItem(showCompImagePicker, 'image', url);
                    setShowCompImagePicker(null);
                },
                onClose: ()=>setShowCompImagePicker(null)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2443,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 2388,
        columnNumber: 5
    }, this);
}
_s16(EditableComparisonItemsBlock, "cK2h+VIKGyC+PM3H9c0UgIKFGg4=");
_c21 = EditableComparisonItemsBlock;
// ─── Chat: messages with sender/receiver ────────────────────────────
function EditableChatBlock({ content, onDataChange, componentName }) {
    _s17();
    const messages = content.messages || [];
    const sender = content.sender || {
        name: ''
    };
    const receiver = content.receiver || {
        name: ''
    };
    const isQAVariant = componentName === 'ChatQABlock';
    const variantLabel = componentName === 'ChatQABlock' ? 'Q&A Chat (no avatars, names only)' : componentName === 'ChatFeedbackBlock' ? 'Feedback Chat (avatars, names, timestamps)' : 'Chat (avatars, names, timestamps)';
    const [showAvatarPicker, setShowAvatarPicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const updateMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableChatBlock.useCallback[updateMessage]": (idx, field, value)=>{
            const n = [
                ...messages
            ];
            n[idx] = {
                ...n[idx],
                [field]: value
            };
            onDataChange({
                ...content,
                messages: n
            });
        }
    }["EditableChatBlock.useCallback[updateMessage]"], [
        messages,
        content,
        onDataChange
    ]);
    const toggleParticipant = (idx)=>{
        const n = [
            ...messages
        ];
        n[idx] = {
            ...n[idx],
            participantId: messages[idx].participantId === 'sender' ? 'receiver' : 'sender'
        };
        onDataChange({
            ...content,
            messages: n
        });
    };
    const addMessage = ()=>{
        const last = messages.length > 0 ? messages[messages.length - 1].participantId : 'sender';
        onDataChange({
            ...content,
            messages: [
                ...messages,
                {
                    participantId: last === 'sender' ? 'receiver' : 'sender',
                    text: ''
                }
            ]
        });
    };
    const removeMessage = (idx)=>{
        onDataChange({
            ...content,
            messages: messages.filter((_, i)=>i !== idx)
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg space-y-4",
        style: {
            backgroundColor: '#F9FAFB'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 px-3 py-1.5 bg-white border border-gray-200 rounded-lg flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-medium text-gray-400",
                        children: "Variant:"
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2486,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-semibold text-[#9F80DA]",
                        children: variantLabel
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2487,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2485,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-xs font-medium text-gray-500",
                                children: "Sender"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 2491,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-10 h-10 rounded-full shrink-0 cursor-pointer relative group/avatar overflow-hidden border-2 border-gray-200 hover:border-[#9F80DA] transition-colors",
                                        onClick: ()=>setShowAvatarPicker('sender'),
                                        children: [
                                            sender.avatar ? // eslint-disable-next-line @next/next/no-img-element
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: sender.avatar,
                                                alt: sender.name || 'Sender',
                                                className: "w-full h-full object-cover"
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2499,
                                                columnNumber: 17
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full h-full bg-blue-300 flex items-center justify-center text-xs text-white font-bold",
                                                children: (sender.name || 'S')[0].toUpperCase()
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2501,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 bg-black/30 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                                    className: "w-4 h-4 text-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2504,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2503,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2493,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                            value: sender.name,
                                            onChange: (v)=>onDataChange({
                                                    ...content,
                                                    sender: {
                                                        ...sender,
                                                        name: v
                                                    }
                                                }),
                                            tag: "span",
                                            className: "text-sm",
                                            placeholder: "Sender name...",
                                            multiline: false
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2508,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2507,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 2492,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2490,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-xs font-medium text-gray-500",
                                children: "Receiver"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 2513,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-10 h-10 rounded-full shrink-0 cursor-pointer relative group/avatar overflow-hidden border-2 border-gray-200 hover:border-[#9F80DA] transition-colors",
                                        onClick: ()=>setShowAvatarPicker('receiver'),
                                        children: [
                                            receiver.avatar ? // eslint-disable-next-line @next/next/no-img-element
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: receiver.avatar,
                                                alt: receiver.name || 'Receiver',
                                                className: "w-full h-full object-cover"
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2521,
                                                columnNumber: 17
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full h-full bg-green-300 flex items-center justify-center text-xs text-white font-bold",
                                                children: (receiver.name || 'R')[0].toUpperCase()
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2523,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 bg-black/30 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                                    className: "w-4 h-4 text-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2526,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2525,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2515,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                            value: receiver.name,
                                            onChange: (v)=>onDataChange({
                                                    ...content,
                                                    receiver: {
                                                        ...receiver,
                                                        name: v
                                                    }
                                                }),
                                            tag: "span",
                                            className: "text-sm",
                                            placeholder: "Receiver name...",
                                            multiline: false
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2530,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2529,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 2514,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2512,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2489,
                columnNumber: 7
            }, this),
            messages.map((msg, idx)=>{
                const isSender = msg.participantId === 'sender';
                const participant = isSender ? sender : receiver;
                const avatarBg = isSender ? 'bg-gray-300' : 'bg-gray-300';
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex items-end gap-2 ${isSender ? 'flex-row-reverse' : 'flex-row'} group/msg`,
                    children: [
                        !isQAVariant && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-8 h-8 rounded-full shrink-0 cursor-pointer relative group/avatar overflow-hidden",
                            onClick: ()=>setShowAvatarPicker(isSender ? 'sender' : 'receiver'),
                            children: [
                                participant.avatar ? // eslint-disable-next-line @next/next/no-img-element
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: participant.avatar,
                                    alt: participant.name || '',
                                    className: "w-full h-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2548,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `w-full h-full ${avatarBg} flex items-center justify-center text-xs font-semibold text-gray-600`,
                                    children: (participant.name || (isSender ? 'S' : 'R'))[0].toUpperCase()
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2550,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-black/30 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                        className: "w-3 h-3 text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2553,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2552,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2542,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex flex-col max-w-[70%] ${isSender ? 'items-end' : 'items-start'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>toggleParticipant(idx),
                                    className: "text-xs font-medium text-gray-500 mb-1 px-2 hover:text-[#9F80DA]",
                                    children: [
                                        participant.name || (isSender ? 'Sender' : 'Receiver'),
                                        " ↔"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2558,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `px-4 py-2 rounded-2xl ${isSender ? 'rounded-br-sm' : 'rounded-bl-sm'} cursor-text`,
                                    style: {
                                        backgroundColor: isSender ? '#9F80DA' : '#E5E7EB',
                                        color: isSender ? '#FFFFFF' : '#1F2937'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                        value: msg.text,
                                        onChange: (v)=>updateMessage(idx, 'text', v),
                                        tag: "p",
                                        className: "text-sm",
                                        style: {
                                            color: isSender ? '#ffffff' : '#1F2937',
                                            lineHeight: '1.4'
                                        },
                                        placeholder: "Message text..."
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2563,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2559,
                                    columnNumber: 15
                                }, this),
                                !isQAVariant && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] text-gray-400 mt-1 px-2 block",
                                    children: "timestamp shown in preview"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2565,
                                    columnNumber: 32
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>removeMessage(idx),
                                    className: "text-xs text-gray-400 hover:text-red-500 mt-1 px-2",
                                    children: "Remove"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2566,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2557,
                            columnNumber: 13
                        }, this)
                    ]
                }, idx, true, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 2540,
                    columnNumber: 11
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: addMessage,
                className: "max-w-[80%] p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors cursor-pointer text-center text-sm text-gray-400 hover:text-[#9F80DA]",
                children: "New message..."
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2571,
                columnNumber: 7
            }, this),
            showAvatarPicker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$ImagePickerModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImagePickerModal"], {
                currentUrl: String(showAvatarPicker === 'sender' ? sender.avatar || '' : receiver.avatar || ''),
                onSelect: (url)=>{
                    const participant = showAvatarPicker === 'sender' ? sender : receiver;
                    onDataChange({
                        ...content,
                        [showAvatarPicker]: {
                            ...participant,
                            avatar: url
                        }
                    });
                    setShowAvatarPicker(null);
                },
                onClose: ()=>setShowAvatarPicker(null)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2573,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 2484,
        columnNumber: 5
    }, this);
}
_s17(EditableChatBlock, "1Ld21In7IY3+dRlriksRvjpKDfo=");
_c22 = EditableChatBlock;
// ─── ChatQA: question/answer pairs (ChatQuestionWallBlock) ──────────
function EditableChatQABlock({ content, onDataChange }) {
    _s18();
    const items = content.items || [];
    const updateItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableChatQABlock.useCallback[updateItem]": (idx, field, value)=>{
            const n = [
                ...items
            ];
            n[idx] = {
                ...n[idx],
                [field]: value
            };
            onDataChange({
                ...content,
                items: n
            });
        }
    }["EditableChatQABlock.useCallback[updateItem]"], [
        items,
        content,
        onDataChange
    ]);
    const addItem = ()=>onDataChange({
            ...content,
            items: [
                ...items,
                {
                    question: '',
                    answer: ''
                }
            ]
        });
    const removeItem = (idx)=>onDataChange({
            ...content,
            items: items.filter((_, i)=>i !== idx)
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg",
        style: {
            backgroundColor: '#F9FAFB'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-sm font-semibold mb-2 text-gray-500",
                                children: "Questions"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 2605,
                                columnNumber: 11
                            }, this),
                            items.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative group/q",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-4 py-3 rounded-2xl rounded-bl-sm cursor-text",
                                            style: {
                                                backgroundColor: '#E5E7EB'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                                value: item.question,
                                                onChange: (v)=>updateItem(idx, 'question', v),
                                                tag: "p",
                                                className: "text-sm",
                                                style: {
                                                    color: '#1F2937',
                                                    lineHeight: '1.4'
                                                },
                                                placeholder: "Question..."
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2609,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2608,
                                            columnNumber: 15
                                        }, this),
                                        items.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>removeItem(idx),
                                            className: "absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 shadow-sm border border-gray-200",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                className: "w-3 h-3"
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2612,
                                                columnNumber: 223
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2612,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, `q-${idx}`, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2607,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2604,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-sm font-semibold mb-2 text-gray-500",
                                children: "Answers"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 2619,
                                columnNumber: 11
                            }, this),
                            items.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-4 py-3 rounded-2xl rounded-br-sm cursor-text",
                                    style: {
                                        backgroundColor: '#9F80DA'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                        value: item.answer,
                                        onChange: (v)=>updateItem(idx, 'answer', v),
                                        tag: "p",
                                        className: "text-sm",
                                        style: {
                                            color: '#ffffff',
                                            lineHeight: '1.4'
                                        },
                                        placeholder: "Answer..."
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2622,
                                        columnNumber: 15
                                    }, this)
                                }, `a-${idx}`, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2621,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2618,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2602,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: addItem,
                className: "mt-4 p-3 border-2 border-dashed border-gray-300 rounded-2xl hover:border-[#9F80DA] transition-colors cursor-pointer text-center text-sm text-gray-400 hover:text-[#9F80DA]",
                children: "New Q&A pair..."
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2627,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 2601,
        columnNumber: 5
    }, this);
}
_s18(EditableChatQABlock, "5V0X294kQ9Jb6PRriz/nswCE1WU=");
_c23 = EditableChatQABlock;
// ─── ChatDialog: left/right messages ────────────────────────────────
function EditableChatDialogBlock({ content, onDataChange }) {
    _s19();
    const messages = content.messages || [];
    const updateMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableChatDialogBlock.useCallback[updateMessage]": (idx, value)=>{
            const n = [
                ...messages
            ];
            n[idx] = {
                ...n[idx],
                text: value
            };
            onDataChange({
                ...content,
                messages: n
            });
        }
    }["EditableChatDialogBlock.useCallback[updateMessage]"], [
        messages,
        content,
        onDataChange
    ]);
    const toggleSide = (idx)=>{
        const n = [
            ...messages
        ];
        n[idx] = {
            ...n[idx],
            isLeft: !n[idx].isLeft
        };
        onDataChange({
            ...content,
            messages: n
        });
    };
    const addMessage = ()=>{
        const lastIsLeft = messages.length > 0 ? messages[messages.length - 1].isLeft : true;
        onDataChange({
            ...content,
            messages: [
                ...messages,
                {
                    text: '',
                    isLeft: !lastIsLeft
                }
            ]
        });
    };
    const removeMessage = (idx)=>{
        onDataChange({
            ...content,
            messages: messages.filter((_, i)=>i !== idx)
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg space-y-3",
        style: {
            backgroundColor: '#F9FAFB'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3 max-w-xl mx-auto",
                children: messages.map((msg, idx)=>{
                    const isLeft = msg.isLeft ?? idx % 2 === 0;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex ${isLeft ? 'justify-start' : 'justify-end'} group/dlg`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex flex-col ${isLeft ? 'items-start' : 'items-end'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `max-w-xs px-4 py-2 rounded-2xl ${isLeft ? 'rounded-bl-sm' : 'rounded-br-sm'} cursor-text`,
                                    style: {
                                        backgroundColor: isLeft ? '#E5E7EB' : '#9F80DA',
                                        color: isLeft ? '#1F2937' : '#FFFFFF'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>toggleSide(idx),
                                            className: "text-xs mb-1 hover:opacity-70",
                                            style: {
                                                color: isLeft ? '#6B7280' : '#E5E7EB'
                                            },
                                            children: [
                                                isLeft ? 'Left' : 'Right',
                                                " ↔"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2666,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "cursor-text",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                                value: msg.text,
                                                onChange: (v)=>updateMessage(idx, v),
                                                tag: "p",
                                                className: "text-sm",
                                                style: {
                                                    color: isLeft ? '#1F2937' : '#ffffff',
                                                    lineHeight: '1.4'
                                                },
                                                placeholder: "Message..."
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2668,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2667,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2662,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>removeMessage(idx),
                                    className: "text-xs text-gray-400 hover:text-red-500 mt-1 px-2",
                                    children: "Remove"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2671,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2661,
                            columnNumber: 15
                        }, this)
                    }, idx, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2660,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2656,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: addMessage,
                className: "max-w-xs mx-auto p-3 border-2 border-dashed border-gray-300 rounded-2xl hover:border-[#9F80DA] transition-colors cursor-pointer text-center text-sm text-gray-400 hover:text-[#9F80DA]",
                children: "New message..."
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2677,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 2655,
        columnNumber: 5
    }, this);
}
_s19(EditableChatDialogBlock, "V6G6Nkl7IBxrifw7518yariIRj4=");
_c24 = EditableChatDialogBlock;
// ─── Timeline: vertical timeline with line + dots ───────────────────
function EditableTimelineBlock({ content, onDataChange }) {
    _s20();
    const events = content.events || [];
    const [deleteConfirmIdx, setDeleteConfirmIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const updateEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTimelineBlock.useCallback[updateEvent]": (idx, field, value)=>{
            const n = [
                ...events
            ];
            n[idx] = {
                ...n[idx],
                [field]: value
            };
            onDataChange({
                ...content,
                events: n
            });
        }
    }["EditableTimelineBlock.useCallback[updateEvent]"], [
        events,
        content,
        onDataChange
    ]);
    const addEvent = ()=>{
        onDataChange({
            ...content,
            events: [
                ...events,
                {
                    id: `ev-${Date.now()}`,
                    title: '',
                    description: '',
                    date: ''
                }
            ]
        });
    };
    const removeEvent = (idx)=>{
        onDataChange({
            ...content,
            events: events.filter((_, i)=>i !== idx)
        });
        setDeleteConfirmIdx(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative ml-4 pl-6 border-l-2 border-gray-300 space-y-6",
            children: [
                events.map((event, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative group/ev",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#9F80DA] border-2 border-white"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 2702,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 cursor-text space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                                value: String(event.date || ''),
                                                onChange: (v)=>updateEvent(idx, 'date', v),
                                                tag: "span",
                                                className: "text-xs text-gray-500",
                                                placeholder: "Date...",
                                                multiline: false
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2705,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                                value: String(event.title || ''),
                                                onChange: (v)=>updateEvent(idx, 'title', v),
                                                tag: "p",
                                                className: "font-medium text-gray-900",
                                                placeholder: "Event title...",
                                                multiline: false
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2706,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                                value: String(event.description || ''),
                                                onChange: (v)=>updateEvent(idx, 'description', v),
                                                tag: "p",
                                                className: "text-sm",
                                                style: {
                                                    color: 'var(--block-text-color, #4B5563)'
                                                },
                                                placeholder: "Description..."
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2707,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2704,
                                        columnNumber: 15
                                    }, this),
                                    deleteConfirmIdx === idx ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1 flex-shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>removeEvent(idx),
                                                className: "px-2 py-0.5 text-xs text-white bg-red-500 rounded",
                                                children: "Yes"
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2711,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setDeleteConfirmIdx(null),
                                                className: "px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded",
                                                children: "No"
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2712,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2710,
                                        columnNumber: 17
                                    }, this) : events.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setDeleteConfirmIdx(idx),
                                        className: "text-gray-300 hover:text-red-500 flex-shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2715,
                                            columnNumber: 125
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2715,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 2703,
                                columnNumber: 13
                            }, this)
                        ]
                    }, String(event.id || idx), true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2700,
                        columnNumber: 11
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative cursor-pointer",
                    onClick: addEvent,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-gray-300 border-2 border-white"
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2722,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-400",
                                children: "New event..."
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 2724,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2723,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 2721,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
            lineNumber: 2698,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 2697,
        columnNumber: 5
    }, this);
}
_s20(EditableTimelineBlock, "pyF4JKBg6p0S8P+l7NkTqdEXVKE=");
_c25 = EditableTimelineBlock;
// ─── FlashCard: card-like UI ────────────────────────────────────────
function EditableFlashCardBlock({ content, onDataChange }) {
    _s21();
    const items = content.items || [];
    const [deleteConfirmIdx, setDeleteConfirmIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showImagePicker, setShowImagePicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const updateItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableFlashCardBlock.useCallback[updateItem]": (idx, field, value)=>{
            const n = [
                ...items
            ];
            n[idx] = {
                ...n[idx],
                [field]: value
            };
            onDataChange({
                ...content,
                items: n
            });
        }
    }["EditableFlashCardBlock.useCallback[updateItem]"], [
        items,
        content,
        onDataChange
    ]);
    const addItem = ()=>{
        onDataChange({
            ...content,
            items: [
                ...items,
                {
                    id: `fc-${Date.now()}`,
                    question: '',
                    answer: ''
                }
            ]
        });
    };
    const removeItem = (idx)=>{
        onDataChange({
            ...content,
            items: items.filter((_, i)=>i !== idx)
        });
        setDeleteConfirmIdx(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-xl mx-auto space-y-4",
                children: [
                    items.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl shadow-lg overflow-hidden group/fc",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6 cursor-text bg-gradient-to-br from-primary to-primary-dark",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-white/70 mb-2 block",
                                            children: "Question"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2754,
                                            columnNumber: 15
                                        }, this),
                                        item.frontImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative h-24 w-full rounded-lg overflow-hidden mb-3 group/img cursor-pointer",
                                            onClick: ()=>setShowImagePicker({
                                                    idx,
                                                    side: 'front'
                                                }),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: String(item.frontImage),
                                                    alt: "Front",
                                                    className: "w-full h-full object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2759,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute inset-0 bg-transparent group-hover/img:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover/img:opacity-100 pointer-events-none rounded-lg",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-2 py-1 bg-white/90 text-xs text-gray-600 rounded-lg shadow-sm border border-gray-200 flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                                                className: "w-3 h-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                                lineNumber: 2762,
                                                                columnNumber: 23
                                                            }, this),
                                                            "Change image"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                        lineNumber: 2761,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2760,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        updateItem(idx, 'frontImage', '');
                                                    },
                                                    className: "absolute top-1 right-1 p-0.5 bg-white/80 rounded-full text-gray-500 hover:text-red-500 hover:bg-white transition-colors pointer-events-auto",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                        className: "w-3 h-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                        lineNumber: 2770,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2766,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2757,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-12 w-full border-2 border-dashed border-white/30 rounded-lg mb-3 flex items-center justify-center gap-1.5 cursor-pointer hover:border-white/50 text-white/50 hover:text-white/70 transition-colors",
                                            onClick: ()=>setShowImagePicker({
                                                    idx,
                                                    side: 'front'
                                                }),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                                    className: "w-3.5 h-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2778,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs",
                                                    children: "Add image"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2779,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2774,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                            value: String(item.question || ''),
                                            onChange: (v)=>updateItem(idx, 'question', v),
                                            tag: "p",
                                            className: "text-xl font-medium text-white",
                                            style: {
                                                color: '#ffffff',
                                                fontSize: '20px',
                                                lineHeight: '1.5'
                                            },
                                            placeholder: "Question..."
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2782,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2753,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6 bg-white border-t-2 border-primary cursor-text",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-gray-500 mb-2 block",
                                            children: "Answer"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2786,
                                            columnNumber: 15
                                        }, this),
                                        item.backImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative h-24 w-full rounded-lg overflow-hidden mb-3 group/img cursor-pointer",
                                            onClick: ()=>setShowImagePicker({
                                                    idx,
                                                    side: 'back'
                                                }),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: String(item.backImage),
                                                    alt: "Back",
                                                    className: "w-full h-full object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2791,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute inset-0 bg-transparent group-hover/img:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover/img:opacity-100 pointer-events-none rounded-lg",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-2 py-1 bg-white/90 text-xs text-gray-600 rounded-lg shadow-sm border border-gray-200 flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                                                className: "w-3 h-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                                lineNumber: 2794,
                                                                columnNumber: 23
                                                            }, this),
                                                            "Change image"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                        lineNumber: 2793,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2792,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        updateItem(idx, 'backImage', '');
                                                    },
                                                    className: "absolute top-1 right-1 p-0.5 bg-white/80 rounded-full text-gray-500 hover:text-red-500 hover:bg-white transition-colors pointer-events-auto",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                        className: "w-3 h-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                        lineNumber: 2802,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2798,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2789,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-12 w-full border-2 border-dashed border-gray-200 rounded-lg mb-3 flex items-center justify-center gap-1.5 cursor-pointer hover:border-[#9F80DA] hover:text-[#9F80DA] text-gray-400 transition-colors",
                                            onClick: ()=>setShowImagePicker({
                                                    idx,
                                                    side: 'back'
                                                }),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                                    className: "w-3.5 h-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2810,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs",
                                                    children: "Add image"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2811,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2806,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                            value: String(item.answer || ''),
                                            onChange: (v)=>updateItem(idx, 'answer', v),
                                            tag: "p",
                                            className: "text-xl font-medium",
                                            style: {
                                                color: 'var(--block-text-color, #1F2937)',
                                                fontSize: '20px',
                                                lineHeight: '1.5'
                                            },
                                            placeholder: "Answer..."
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2814,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2785,
                                    columnNumber: 13
                                }, this),
                                items.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-end px-3 py-1.5 bg-white border-t border-gray-100",
                                    children: deleteConfirmIdx === idx ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-red-600",
                                                children: "Delete?"
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2821,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>removeItem(idx),
                                                className: "px-2 py-0.5 text-xs text-white bg-red-500 rounded",
                                                children: "Yes"
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2822,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setDeleteConfirmIdx(null),
                                                className: "px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded",
                                                children: "No"
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2823,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2820,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setDeleteConfirmIdx(idx),
                                        className: "text-gray-300 hover:text-red-500",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2826,
                                            columnNumber: 113
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2826,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2818,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, String(item.id || idx), true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2751,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-[#9F80DA] transition-colors",
                        onClick: addItem,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-400 text-center",
                            children: "New card..."
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2834,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2833,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2749,
                columnNumber: 7
            }, this),
            showImagePicker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$ImagePickerModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImagePickerModal"], {
                currentUrl: String(items[showImagePicker.idx]?.[showImagePicker.side === 'front' ? 'frontImage' : 'backImage'] || ''),
                onSelect: (url)=>{
                    updateItem(showImagePicker.idx, showImagePicker.side === 'front' ? 'frontImage' : 'backImage', url);
                    setShowImagePicker(null);
                },
                onClose: ()=>setShowImagePicker(null)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2838,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 2748,
        columnNumber: 5
    }, this);
}
_s21(EditableFlashCardBlock, "ROxkbC6yaupSWWshxwOjnhR6v08=");
_c26 = EditableFlashCardBlock;
// ─── Testimonial: card grid ─────────────────────────────────────────
function EditableTestimonialBlock({ content, onDataChange }) {
    _s22();
    const testimonials = content.testimonials || [];
    const [deleteConfirmIdx, setDeleteConfirmIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showPicker, setShowPicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const updateItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTestimonialBlock.useCallback[updateItem]": (idx, field, value)=>{
            const n = [
                ...testimonials
            ];
            n[idx] = {
                ...n[idx],
                [field]: value
            };
            onDataChange({
                ...content,
                testimonials: n
            });
        }
    }["EditableTestimonialBlock.useCallback[updateItem]"], [
        testimonials,
        content,
        onDataChange
    ]);
    const addItem = ()=>{
        onDataChange({
            ...content,
            testimonials: [
                ...testimonials,
                {
                    id: `test-${Date.now()}`,
                    content: '',
                    name: '',
                    role: '',
                    avatar: ''
                }
            ]
        });
    };
    const removeItem = (idx)=>{
        onDataChange({
            ...content,
            testimonials: testimonials.filter((_, i)=>i !== idx)
        });
        setDeleteConfirmIdx(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-6 rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `grid gap-6 grid-cols-1 ${testimonials.length === 2 ? 'md:grid-cols-2' : testimonials.length >= 3 ? 'md:grid-cols-2 lg:grid-cols-3' : ''}`,
                children: [
                    testimonials.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative backdrop-blur-sm p-6 rounded-xl shadow-lg bg-white/90",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-8 h-8 mb-3 opacity-30 text-primary",
                                    fill: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2873,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2872,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "cursor-text mb-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                        value: String(item.title || ''),
                                        onChange: (v)=>updateItem(idx, 'title', v),
                                        tag: "div",
                                        className: "text-lg font-semibold",
                                        style: {
                                            color: 'var(--block-text-color, inherit)'
                                        },
                                        placeholder: "Title (optional)...",
                                        multiline: false
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2877,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2876,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "cursor-text mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                        value: String(item.content || ''),
                                        onChange: (v)=>updateItem(idx, 'content', v),
                                        tag: "p",
                                        style: {
                                            fontSize: '14px',
                                            color: 'var(--block-text-color, #4B5563)',
                                            lineHeight: '1.5'
                                        },
                                        placeholder: "Testimonial text..."
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2880,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2879,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 pt-4 border-t border-gray-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-10 rounded-full bg-gray-100 overflow-hidden cursor-pointer flex-shrink-0",
                                            onClick: ()=>setShowPicker(idx),
                                            children: item.avatar ? // eslint-disable-next-line @next/next/no-img-element
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: String(item.avatar),
                                                alt: "",
                                                className: "w-full h-full rounded-full object-cover"
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2887,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full h-full flex items-center justify-center text-gray-400 text-xs",
                                                children: String(item.name || '?')[0]?.toUpperCase()
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2889,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2884,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 cursor-text",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                                    value: String(item.name || ''),
                                                    onChange: (v)=>updateItem(idx, 'name', v),
                                                    tag: "p",
                                                    className: "font-medium text-gray-900",
                                                    placeholder: "Name...",
                                                    multiline: false
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2893,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                                    value: String(item.role || ''),
                                                    onChange: (v)=>updateItem(idx, 'role', v),
                                                    tag: "p",
                                                    className: "text-sm text-gray-500",
                                                    placeholder: "Role...",
                                                    multiline: false
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2894,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2892,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2883,
                                    columnNumber: 13
                                }, this),
                                testimonials.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-2 right-2",
                                    children: deleteConfirmIdx === idx ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>removeItem(idx),
                                                className: "px-2 py-0.5 text-xs text-white bg-red-500 rounded",
                                                children: "Yes"
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2902,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setDeleteConfirmIdx(null),
                                                className: "px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded",
                                                children: "No"
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 2903,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2901,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setDeleteConfirmIdx(idx),
                                        className: "text-gray-300 hover:text-red-500",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2906,
                                            columnNumber: 113
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2906,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2899,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, String(item.id || idx), true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2870,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-[#9F80DA] transition-colors flex items-center justify-center min-h-[120px]",
                        onClick: addItem,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-400",
                            children: "New testimonial..."
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2914,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2913,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2868,
                columnNumber: 7
            }, this),
            showPicker !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$ImagePickerModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImagePickerModal"], {
                currentUrl: String(testimonials[showPicker]?.avatar || ''),
                onSelect: (url)=>{
                    updateItem(showPicker, 'avatar', url);
                    setShowPicker(null);
                },
                onClose: ()=>setShowPicker(null)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2918,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 2867,
        columnNumber: 5
    }, this);
}
_s22(EditableTestimonialBlock, "PzMgUz2yTuOeO5d8+55fOhpDt9s=");
_c27 = EditableTestimonialBlock;
// ─── ItemsBlock: Generic configurable items ─────────────────────────
function EditableItemsBlock({ content, onDataChange, field, fieldA, fieldB, fieldC, labelA, labelB, labelC, title, placeholderLabel }) {
    _s23();
    const items = content[field] || [];
    const updateItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableItemsBlock.useCallback[updateItem]": (idx, key, value)=>{
            const n = [
                ...items
            ];
            n[idx] = {
                ...n[idx],
                [key]: value
            };
            onDataChange({
                ...content,
                [field]: n
            });
        }
    }["EditableItemsBlock.useCallback[updateItem]"], [
        items,
        content,
        onDataChange,
        field
    ]);
    const addItem = ()=>{
        const newItem = {
            id: `item-${Date.now()}`,
            [fieldA]: '',
            [fieldB]: ''
        };
        if (fieldC) newItem[fieldC] = '';
        onDataChange({
            ...content,
            [field]: [
                ...items,
                newItem
            ]
        });
    };
    const removeItem = (idx)=>{
        onDataChange({
            ...content,
            [field]: items.filter((_, i)=>i !== idx)
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-sm font-semibold text-gray-500 mb-3",
                children: title
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2944,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: items.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border-2 border-gray-200 rounded-lg group/gi hover:border-gray-300",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 cursor-text space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                            value: String(item[fieldA] || ''),
                                            onChange: (v)=>updateItem(idx, fieldA, v),
                                            tag: "p",
                                            className: "font-medium text-gray-900",
                                            placeholder: labelA,
                                            multiline: false
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2950,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                            value: String(item[fieldB] || ''),
                                            onChange: (v)=>updateItem(idx, fieldB, v),
                                            tag: "p",
                                            className: "text-sm",
                                            style: {
                                                color: 'var(--block-text-color, #4B5563)'
                                            },
                                            placeholder: labelB
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2951,
                                            columnNumber: 17
                                        }, this),
                                        fieldC && labelC && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                            value: String(item[fieldC] || ''),
                                            onChange: (v)=>updateItem(idx, fieldC, v),
                                            tag: "p",
                                            className: "text-xs text-gray-500",
                                            placeholder: labelC,
                                            multiline: false
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2952,
                                            columnNumber: 38
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2949,
                                    columnNumber: 15
                                }, this),
                                items.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>removeItem(idx),
                                    className: "text-gray-300 hover:text-red-500",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2954,
                                        columnNumber: 121
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2954,
                                    columnNumber: 36
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2948,
                            columnNumber: 13
                        }, this)
                    }, String(item.id || idx), false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2947,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2945,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: addItem,
                className: "flex items-center gap-1 text-sm text-[#9F80DA] hover:text-[#8A6BC5] font-medium mt-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                        className: "w-4 h-4"
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2959,
                        columnNumber: 130
                    }, this),
                    " ",
                    placeholderLabel
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2959,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 2943,
        columnNumber: 5
    }, this);
}
_s23(EditableItemsBlock, "5V0X294kQ9Jb6PRriz/nswCE1WU=");
_c28 = EditableItemsBlock;
// ─── Reviews: star-rated reviews ────────────────────────────────────
function EditableReviewsBlock({ content, onDataChange }) {
    _s24();
    const reviews = content.reviews || [];
    const [deleteConfirmIdx, setDeleteConfirmIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showPicker, setShowPicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const updateReview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableReviewsBlock.useCallback[updateReview]": (idx, field, value)=>{
            const n = [
                ...reviews
            ];
            n[idx] = {
                ...n[idx],
                [field]: value
            };
            onDataChange({
                ...content,
                reviews: n
            });
        }
    }["EditableReviewsBlock.useCallback[updateReview]"], [
        reviews,
        content,
        onDataChange
    ]);
    const addReview = ()=>{
        onDataChange({
            ...content,
            reviews: [
                ...reviews,
                {
                    name: '',
                    rating: 5,
                    review: '',
                    avatar: ''
                }
            ]
        });
    };
    const removeReview = (idx)=>{
        onDataChange({
            ...content,
            reviews: reviews.filter((_, i)=>i !== idx)
        });
        setDeleteConfirmIdx(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: reviews.map((review, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 rounded-lg border border-gray-200 bg-white group/rev hover:border-gray-300",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-12 h-12 rounded-full bg-gray-200 overflow-hidden cursor-pointer flex-shrink-0",
                                    onClick: ()=>setShowPicker(idx),
                                    children: review.avatar ? // eslint-disable-next-line @next/next/no-img-element
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: review.avatar,
                                        alt: "",
                                        className: "w-full h-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2989,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full h-full flex items-center justify-center text-lg font-semibold text-gray-600",
                                        children: (review.name || 'R').charAt(0).toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 2991,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2986,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 cursor-text",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                                    value: review.name,
                                                    onChange: (v)=>updateReview(idx, 'name', v),
                                                    tag: "p",
                                                    className: "font-semibold text-gray-900",
                                                    placeholder: "Reviewer name...",
                                                    multiline: false
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2996,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-1",
                                                    children: [
                                                        1,
                                                        2,
                                                        3,
                                                        4,
                                                        5
                                                    ].map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>updateReview(idx, 'rating', n),
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                className: `w-4 h-4 ${n <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                                lineNumber: 3000,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, n, false, {
                                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                            lineNumber: 2999,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 2997,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 2995,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                            value: review.review || review.comment || '',
                                            onChange: (v)=>updateReview(idx, 'review', v),
                                            tag: "p",
                                            className: "text-sm",
                                            style: {
                                                color: 'var(--block-text-color, inherit)',
                                                lineHeight: '1.5'
                                            },
                                            placeholder: "Review text..."
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3005,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 2994,
                                    columnNumber: 15
                                }, this),
                                reviews.length > 1 && (deleteConfirmIdx === idx ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1 flex-shrink-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>removeReview(idx),
                                            className: "px-2 py-0.5 text-xs text-white bg-red-500 rounded",
                                            children: "Yes"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3010,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setDeleteConfirmIdx(null),
                                            className: "px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded",
                                            children: "No"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3011,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3009,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setDeleteConfirmIdx(idx),
                                    className: "text-gray-300 hover:text-red-500 flex-shrink-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3014,
                                        columnNumber: 127
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3014,
                                    columnNumber: 19
                                }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 2984,
                            columnNumber: 13
                        }, this)
                    }, idx, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 2983,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 2981,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#9F80DA] transition-colors",
                onClick: addReview,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-gray-400 text-center",
                    children: "New review..."
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 3023,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3022,
                columnNumber: 7
            }, this),
            showPicker !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$ImagePickerModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImagePickerModal"], {
                currentUrl: reviews[showPicker]?.avatar || '',
                onSelect: (url)=>{
                    updateReview(showPicker, 'avatar', url);
                    setShowPicker(null);
                },
                onClose: ()=>setShowPicker(null)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3026,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 2980,
        columnNumber: 5
    }, this);
}
_s24(EditableReviewsBlock, "KMiNhIFtFsgieh3o1sLRsl87qbg=");
_c29 = EditableReviewsBlock;
// ─── Table: editable grid ───────────────────────────────────────────
function EditableTableBlock({ content, onDataChange }) {
    _s25();
    const rows = content.rows || 2;
    const columns = content.columns || 2;
    const headerRow = content.headerRow !== false; // default true, matching read-only
    const stripedRows = content.stripedRows || false;
    const tableContent = content.content || Array.from({
        length: rows
    }, ()=>Array(columns).fill(''));
    const [deleteConfirmRow, setDeleteConfirmRow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const updateCell = (r, c, value)=>{
        const n = tableContent.map((row, ri)=>ri === r ? row.map((cell, ci)=>ci === c ? value : cell) : [
                ...row
            ]);
        onDataChange({
            ...content,
            content: n
        });
    };
    const addRow = ()=>{
        onDataChange({
            ...content,
            content: [
                ...tableContent,
                Array(columns).fill('')
            ],
            rows: rows + 1
        });
    };
    const addColumn = ()=>{
        onDataChange({
            ...content,
            content: tableContent.map((row)=>[
                    ...row,
                    ''
                ]),
            columns: columns + 1
        });
    };
    const removeRow = (r)=>{
        if (rows <= 1) return;
        onDataChange({
            ...content,
            content: tableContent.filter((_, i)=>i !== r),
            rows: rows - 1
        });
        setDeleteConfirmRow(null);
    };
    const removeColumn = (c)=>{
        if (columns <= 1) return;
        onDataChange({
            ...content,
            content: tableContent.map((row)=>row.filter((_, i)=>i !== c)),
            columns: columns - 1
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg overflow-x-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "w-full border-collapse border border-gray-300",
                style: {
                    color: 'var(--block-text-color, inherit)'
                },
                children: [
                    headerRow && tableContent.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "bg-gray-100",
                            children: [
                                tableContent[0].map((cell, ci)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "border border-gray-300 px-4 py-2 font-semibold text-left cursor-text",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                            value: cell,
                                            onChange: (v)=>updateCell(0, ci, v),
                                            tag: "span",
                                            className: "font-semibold",
                                            placeholder: "Header...",
                                            multiline: false
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3060,
                                            columnNumber: 19
                                        }, this)
                                    }, ci, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3059,
                                        columnNumber: 17
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "border-0 w-8",
                                    children: rows > 1 && (deleteConfirmRow === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1 whitespace-nowrap",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>removeRow(0),
                                                className: "px-1.5 py-0.5 text-xs text-white bg-red-500 rounded",
                                                children: "Yes"
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 3067,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setDeleteConfirmRow(null),
                                                className: "px-1.5 py-0.5 text-xs text-gray-600 bg-gray-200 rounded",
                                                children: "No"
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 3068,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3066,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setDeleteConfirmRow(0),
                                        className: "text-gray-300 hover:text-red-500 px-1",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3071,
                                            columnNumber: 118
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3071,
                                        columnNumber: 21
                                    }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3063,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 3057,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3056,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: [
                            tableContent.slice(headerRow ? 1 : 0).map((row, dataIdx)=>{
                                const ri = headerRow ? dataIdx + 1 : dataIdx;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: `${stripedRows && dataIdx % 2 === 1 ? 'bg-gray-50' : ''} hover:bg-gray-50`,
                                    children: [
                                        row.map((cell, ci)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "border border-gray-300 px-4 py-2 cursor-text",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                                    value: cell,
                                                    onChange: (v)=>updateCell(ri, ci, v),
                                                    tag: "span",
                                                    placeholder: "Cell...",
                                                    multiline: false
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 3085,
                                                    columnNumber: 21
                                                }, this)
                                            }, ci, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 3084,
                                                columnNumber: 19
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "border-0 w-8",
                                            children: rows > 1 && (deleteConfirmRow === ri ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1 whitespace-nowrap",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>removeRow(ri),
                                                        className: "px-1.5 py-0.5 text-xs text-white bg-red-500 rounded",
                                                        children: "Yes"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                        lineNumber: 3092,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setDeleteConfirmRow(null),
                                                        className: "px-1.5 py-0.5 text-xs text-gray-600 bg-gray-200 rounded",
                                                        children: "No"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                        lineNumber: 3093,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 3091,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setDeleteConfirmRow(ri),
                                                className: "text-gray-300 hover:text-red-500 px-1",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    className: "w-3 h-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 3096,
                                                    columnNumber: 121
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 3096,
                                                columnNumber: 23
                                            }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3088,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, ri, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3082,
                                    columnNumber: 15
                                }, this);
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    Array.from({
                                        length: columns
                                    }).map((_, ci)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-400 cursor-pointer hover:bg-gray-50",
                                            onClick: addRow,
                                            children: ci === 0 ? 'New row...' : ''
                                        }, ci, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3106,
                                            columnNumber: 15
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "border-0 w-8"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3110,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3104,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3078,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3054,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3 mt-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: addColumn,
                        className: "text-xs text-[#9F80DA] hover:text-[#8A6BC5] font-medium flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "w-3 h-3"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3115,
                                columnNumber: 129
                            }, this),
                            " Column"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3115,
                        columnNumber: 9
                    }, this),
                    columns > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>removeColumn(columns - 1),
                        className: "text-xs text-gray-400 hover:text-red-500 font-medium flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                className: "w-3 h-3"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3116,
                                columnNumber: 164
                            }, this),
                            " Last column"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3116,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3114,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 3053,
        columnNumber: 5
    }, this);
}
_s25(EditableTableBlock, "Q3oFXrt8HVATPXNs90DzF6zPUJ8=");
_c30 = EditableTableBlock;
// ─── Buttons ────────────────────────────────────────────────────────
function EditableButtonBlock({ content, onDataChange }) {
    _s26();
    const items = content.items || [];
    const updateItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableButtonBlock.useCallback[updateItem]": (id, field, value)=>{
            onDataChange({
                ...content,
                items: items.map({
                    "EditableButtonBlock.useCallback[updateItem]": (i)=>i.id === id ? {
                            ...i,
                            [field]: value
                        } : i
                }["EditableButtonBlock.useCallback[updateItem]"])
            });
        }
    }["EditableButtonBlock.useCallback[updateItem]"], [
        items,
        content,
        onDataChange
    ]);
    const toggleLinkType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableButtonBlock.useCallback[toggleLinkType]": (id)=>{
            onDataChange({
                ...content,
                items: items.map({
                    "EditableButtonBlock.useCallback[toggleLinkType]": (i)=>{
                        if (i.id !== id) return i;
                        const newType = i.linkType === 'deep' ? 'url' : 'deep';
                        return {
                            ...i,
                            linkType: newType,
                            url: newType === 'deep' ? '#unit-' : ''
                        };
                    }
                }["EditableButtonBlock.useCallback[toggleLinkType]"])
            });
        }
    }["EditableButtonBlock.useCallback[toggleLinkType]"], [
        items,
        content,
        onDataChange
    ]);
    const addItem = ()=>onDataChange({
            ...content,
            items: [
                ...items,
                {
                    id: `btn-${Date.now()}`,
                    text: '',
                    url: ''
                }
            ]
        });
    const removeItem = (id)=>onDataChange({
            ...content,
            items: items.filter((i)=>i.id !== id)
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg space-y-2",
        children: [
            items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3 group/btn",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-block px-6 py-2.5 bg-[#9F80DA] text-white rounded-lg cursor-text",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                        value: item.text,
                                        onChange: (v)=>updateItem(item.id, 'text', v),
                                        tag: "span",
                                        className: "text-sm font-medium text-white",
                                        style: {
                                            color: '#ffffff'
                                        },
                                        placeholder: "Button text...",
                                        multiline: false
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3148,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3147,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>toggleLinkType(item.id),
                                            className: `px-2 py-0.5 text-xs rounded transition-colors flex-shrink-0 ${item.linkType === 'deep' ? 'bg-[#9F80DA] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`,
                                            children: item.linkType === 'deep' ? 'Deep Link' : 'URL'
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3151,
                                            columnNumber: 15
                                        }, this),
                                        item.linkType === 'deep' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BlurInput, {
                                            value: item.url.replace('#unit-', ''),
                                            onSave: (v)=>updateItem(item.id, 'url', `#unit-${v}`),
                                            placeholder: "Unit code (e.g. 1.1)..."
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3158,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BlurInput, {
                                            value: item.url,
                                            onSave: (v)=>updateItem(item.id, 'url', v),
                                            placeholder: "URL..."
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3160,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3150,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 3146,
                            columnNumber: 11
                        }, this),
                        items.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>removeItem(item.id),
                            className: "text-gray-300 hover:text-red-500",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3164,
                                columnNumber: 121
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 3164,
                            columnNumber: 32
                        }, this)
                    ]
                }, item.id, true, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 3145,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: addItem,
                className: "inline-block px-6 py-2.5 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors cursor-pointer text-sm text-gray-400 hover:text-[#9F80DA]",
                children: "New button..."
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3167,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 3143,
        columnNumber: 5
    }, this);
}
_s26(EditableButtonBlock, "Ij8bpPimNeIMfCNhl+0Powty7/4=");
_c31 = EditableButtonBlock;
function EditableButtonStackBlock({ content, onDataChange }) {
    _s27();
    const items = content.items || [];
    const updateItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableButtonStackBlock.useCallback[updateItem]": (idx, field, value)=>{
            const n = [
                ...items
            ];
            n[idx] = {
                ...n[idx],
                [field]: value
            };
            onDataChange({
                ...content,
                items: n
            });
        }
    }["EditableButtonStackBlock.useCallback[updateItem]"], [
        items,
        content,
        onDataChange
    ]);
    const toggleLinkType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableButtonStackBlock.useCallback[toggleLinkType]": (idx)=>{
            const n = [
                ...items
            ];
            const newType = n[idx].linkType === 'deep' ? 'url' : 'deep';
            n[idx] = {
                ...n[idx],
                linkType: newType,
                url: newType === 'deep' ? '#unit-' : ''
            };
            onDataChange({
                ...content,
                items: n
            });
        }
    }["EditableButtonStackBlock.useCallback[toggleLinkType]"], [
        items,
        content,
        onDataChange
    ]);
    const addItem = ()=>onDataChange({
            ...content,
            items: [
                ...items,
                {
                    text: '',
                    description: '',
                    url: ''
                }
            ]
        });
    const removeItem = (idx)=>onDataChange({
            ...content,
            items: items.filter((_, i)=>i !== idx)
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "cursor-text mb-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                    value: String(content.title || ''),
                    onChange: (v)=>onDataChange({
                            ...content,
                            title: v
                        }),
                    tag: "h3",
                    className: "font-semibold text-gray-900",
                    placeholder: "Stack title...",
                    multiline: false
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 3193,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3192,
                columnNumber: 7
            }, this),
            items.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-3 border-2 border-gray-200 rounded-lg group/bs hover:border-gray-300",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-3 py-1.5 border border-gray-200 rounded cursor-text",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                            value: item.text,
                                            onChange: (v)=>updateItem(idx, 'text', v),
                                            tag: "span",
                                            className: "text-sm font-medium",
                                            placeholder: "Button text...",
                                            multiline: false
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3200,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3199,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-3 py-1 border border-gray-200 rounded cursor-text",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                            value: item.description || '',
                                            onChange: (v)=>updateItem(idx, 'description', v),
                                            tag: "span",
                                            className: "text-xs text-gray-500",
                                            placeholder: "Description...",
                                            multiline: false
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3203,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3202,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>toggleLinkType(idx),
                                                className: `px-2 py-0.5 text-xs rounded transition-colors flex-shrink-0 ${item.linkType === 'deep' ? 'bg-[#9F80DA] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`,
                                                children: item.linkType === 'deep' ? 'Deep Link' : 'URL'
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 3206,
                                                columnNumber: 17
                                            }, this),
                                            item.linkType === 'deep' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BlurInput, {
                                                value: item.url.replace('#unit-', ''),
                                                onSave: (v)=>updateItem(idx, 'url', `#unit-${v}`),
                                                className: "w-full px-3 py-1 text-xs text-gray-400 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30",
                                                placeholder: "Unit code (e.g. 1.1)..."
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 3213,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BlurInput, {
                                                value: item.url,
                                                onSave: (v)=>updateItem(idx, 'url', v),
                                                className: "w-full px-3 py-1 text-xs text-gray-400 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30",
                                                placeholder: "URL..."
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 3215,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3205,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3198,
                                columnNumber: 13
                            }, this),
                            items.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>removeItem(idx),
                                className: "text-gray-300 hover:text-red-500",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3219,
                                    columnNumber: 119
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3219,
                                columnNumber: 34
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3197,
                        columnNumber: 11
                    }, this)
                }, idx, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 3196,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: addItem,
                className: "p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors cursor-pointer text-center text-sm text-gray-400 hover:text-[#9F80DA]",
                children: "New button..."
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3223,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 3191,
        columnNumber: 5
    }, this);
}
_s27(EditableButtonStackBlock, "Ij8bpPimNeIMfCNhl+0Powty7/4=");
_c32 = EditableButtonStackBlock;
// ─── Media ──────────────────────────────────────────────────────────
function EditableMediaUrlBlock({ content, onDataChange, label }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-sm font-semibold text-gray-500",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3233,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 py-2 border border-gray-200 rounded-lg cursor-text",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                    value: String(content.title || ''),
                    onChange: (v)=>onDataChange({
                            ...content,
                            title: v
                        }),
                    tag: "span",
                    className: "text-sm",
                    placeholder: "Title...",
                    multiline: false
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 3235,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3234,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BlurInput, {
                value: String(content.url || ''),
                onSave: (v)=>onDataChange({
                        ...content,
                        url: v
                    }),
                className: "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30",
                placeholder: `${label} URL...`
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3237,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 3232,
        columnNumber: 5
    }, this);
}
_c33 = EditableMediaUrlBlock;
function EditableEmbedBlock({ content, onDataChange }) {
    _s28();
    const [localHtml, setLocalHtml] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(String(content.html || ''));
    const prevHtml = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(String(content.html || ''));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditableEmbedBlock.useEffect": ()=>{
            const v = String(content.html || '');
            if (v !== prevHtml.current) {
                setLocalHtml(v);
                prevHtml.current = v;
            }
        }
    }["EditableEmbedBlock.useEffect"], [
        content.html
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-sm font-semibold text-gray-500",
                children: "Embed"
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3248,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 py-2 border border-gray-200 rounded-lg cursor-text",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                    value: String(content.title || ''),
                    onChange: (v)=>onDataChange({
                            ...content,
                            title: v
                        }),
                    tag: "span",
                    className: "text-sm",
                    placeholder: "Title...",
                    multiline: false
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 3250,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3249,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BlurInput, {
                value: String(content.url || ''),
                onSave: (v)=>onDataChange({
                        ...content,
                        url: v
                    }),
                className: "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30",
                placeholder: "URL..."
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3252,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                value: localHtml,
                onChange: (e)=>setLocalHtml(e.target.value),
                onBlur: ()=>{
                    if (localHtml !== String(content.html || '')) onDataChange({
                        ...content,
                        html: localHtml
                    });
                },
                className: "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30 font-mono",
                rows: 4,
                placeholder: "Embed HTML..."
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3253,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 3247,
        columnNumber: 5
    }, this);
}
_s28(EditableEmbedBlock, "dg8qt3yvdHDrITOAF24wH/X0kak=");
_c34 = EditableEmbedBlock;
function EditableAttachmentBlock({ content, onDataChange }) {
    _s29();
    const attachments = content.attachments || [];
    const updateItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableAttachmentBlock.useCallback[updateItem]": (id, field, value)=>{
            onDataChange({
                ...content,
                attachments: attachments.map({
                    "EditableAttachmentBlock.useCallback[updateItem]": (a)=>a.id === id ? {
                            ...a,
                            [field]: value
                        } : a
                }["EditableAttachmentBlock.useCallback[updateItem]"])
            });
        }
    }["EditableAttachmentBlock.useCallback[updateItem]"], [
        attachments,
        content,
        onDataChange
    ]);
    const addItem = ()=>onDataChange({
            ...content,
            attachments: [
                ...attachments,
                {
                    id: `att-${Date.now()}`,
                    name: '',
                    url: ''
                }
            ]
        });
    const removeItem = (id)=>onDataChange({
            ...content,
            attachments: attachments.filter((a)=>a.id !== id)
        });
    const getFileIcon = (name)=>{
        const ext = name.split('.').pop()?.toLowerCase() || '';
        const colors = {
            pdf: 'text-red-500',
            doc: 'text-blue-500',
            docx: 'text-blue-500',
            xls: 'text-green-600',
            xlsx: 'text-green-600',
            ppt: 'text-orange-500',
            pptx: 'text-orange-500'
        };
        return colors[ext] || 'text-gray-400';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg space-y-2",
        children: [
            attachments.map((att)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg group/att hover:border-gray-300",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 ${getFileIcon(att.name)}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-bold uppercase",
                                children: att.name.split('.').pop() || '?'
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3279,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 3278,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-3 py-1.5 border border-gray-200 rounded cursor-text",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                        value: att.name,
                                        onChange: (v)=>updateItem(att.id, 'name', v),
                                        tag: "span",
                                        className: "text-sm",
                                        placeholder: "File name...",
                                        multiline: false
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3283,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3282,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BlurInput, {
                                    value: att.url,
                                    onSave: (v)=>updateItem(att.id, 'url', v),
                                    className: "w-full px-3 py-1 text-xs text-gray-500 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30",
                                    placeholder: "File URL..."
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3285,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 3281,
                            columnNumber: 11
                        }, this),
                        attachments.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>removeItem(att.id),
                            className: "text-gray-300 hover:text-red-500",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3287,
                                columnNumber: 126
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 3287,
                            columnNumber: 38
                        }, this)
                    ]
                }, att.id, true, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 3277,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: addItem,
                className: "flex items-center gap-3 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors cursor-pointer text-sm text-gray-400 hover:text-[#9F80DA]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-10 h-10 rounded-lg border border-dashed border-gray-300 flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 3291,
                            columnNumber: 117
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3291,
                        columnNumber: 9
                    }, this),
                    "New attachment..."
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3290,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 3275,
        columnNumber: 5
    }, this);
}
_s29(EditableAttachmentBlock, "5V0X294kQ9Jb6PRriz/nswCE1WU=");
_c35 = EditableAttachmentBlock;
// ─── Carousel / Gallery ─────────────────────────────────────────────
function EditableCarouselBlock({ content, onDataChange }) {
    _s30();
    const images = content.images || [];
    const [currentSlide, setCurrentSlide] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [showPicker, setShowPicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deleteConfirmIdx, setDeleteConfirmIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const updateImage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableCarouselBlock.useCallback[updateImage]": (idx, field, value)=>{
            const n = [
                ...images
            ];
            n[idx] = {
                ...n[idx],
                [field]: value
            };
            onDataChange({
                ...content,
                images: n
            });
        }
    }["EditableCarouselBlock.useCallback[updateImage]"], [
        images,
        content,
        onDataChange
    ]);
    const addImage = ()=>{
        onDataChange({
            ...content,
            images: [
                ...images,
                {
                    src: '',
                    alt: '',
                    caption: ''
                }
            ]
        });
        setCurrentSlide(images.length);
    };
    const removeImage = (idx)=>{
        onDataChange({
            ...content,
            images: images.filter((_, i)=>i !== idx)
        });
        setDeleteConfirmIdx(null);
        if (currentSlide >= images.length - 1) setCurrentSlide(Math.max(0, images.length - 2));
    };
    const current = images[currentSlide];
    const goToPrevious = ()=>setCurrentSlide((prev)=>prev === 0 ? images.length - 1 : prev - 1);
    const goToNext = ()=>setCurrentSlide((prev)=>prev === images.length - 1 ? 0 : prev + 1);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg",
        children: [
            current && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative h-80 w-full overflow-hidden rounded-lg bg-gray-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full h-full group/img cursor-pointer relative",
                                onClick: ()=>setShowPicker(true),
                                children: [
                                    current.src ? // eslint-disable-next-line @next/next/no-img-element
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: current.src,
                                        alt: current.alt || '',
                                        className: "w-full h-full object-cover transition-opacity duration-300"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3335,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full h-full flex items-center justify-center text-gray-400",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                            className: "w-8 h-8"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3337,
                                            columnNumber: 95
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3337,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-transparent group-hover/img:bg-black/20 transition-colors flex items-end justify-center pb-3 opacity-0 group-hover/img:opacity-100 pointer-events-none rounded-lg z-10",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-3 py-1.5 bg-white/90 text-sm text-gray-600 rounded-lg shadow-sm border border-gray-200 flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 3341,
                                                    columnNumber: 19
                                                }, this),
                                                "Change image"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3340,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3339,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3332,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `absolute bottom-0 left-0 right-0 p-4 cursor-text transition-colors ${current.caption ? 'bg-black/50' : 'bg-transparent'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                    value: current.caption || '',
                                    onChange: (v)=>updateImage(currentSlide, 'caption', v),
                                    tag: "p",
                                    className: "text-center text-white",
                                    style: {
                                        color: '#ffffff'
                                    },
                                    placeholder: "Caption...",
                                    multiline: false
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3348,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3347,
                                columnNumber: 13
                            }, this),
                            images.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-2 right-2 z-20",
                                children: deleteConfirmIdx === currentSlide ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-lg shadow-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>removeImage(currentSlide),
                                            className: "px-2 py-0.5 text-xs text-white bg-red-500 rounded",
                                            children: "Yes"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3355,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setDeleteConfirmIdx(null),
                                            className: "px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded",
                                            children: "No"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3356,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3354,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setDeleteConfirmIdx(currentSlide),
                                    className: "w-6 h-6 bg-white/90 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3359,
                                        columnNumber: 198
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3359,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3352,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3331,
                        columnNumber: 11
                    }, this),
                    images.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: goToPrevious,
                                className: "absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg transition-colors bg-white/80 hover:bg-white text-gray-800 z-20",
                                "aria-label": "Previous image",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                    className: "w-6 h-6 rotate-90"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3372,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3367,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: goToNext,
                                className: "absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg transition-colors bg-white/80 hover:bg-white text-gray-800 z-20",
                                "aria-label": "Next image",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                    className: "w-6 h-6 -rotate-90"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3379,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3374,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center gap-2 mt-4",
                        children: [
                            images.map((_, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setCurrentSlide(idx),
                                    className: `w-3 h-3 rounded-full transition-colors ${idx === currentSlide ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400'}`
                                }, idx, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3386,
                                    columnNumber: 15
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: addImage,
                                className: "w-6 h-6 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-[#9F80DA] hover:text-[#9F80DA] transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "w-3 h-3"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3389,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3388,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3384,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3330,
                columnNumber: 9
            }, this),
            showPicker && current && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$ImagePickerModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImagePickerModal"], {
                currentUrl: current.src || '',
                onSelect: (url)=>{
                    updateImage(currentSlide, 'src', url);
                    setShowPicker(false);
                },
                onClose: ()=>setShowPicker(false)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3395,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 3327,
        columnNumber: 5
    }, this);
}
_s30(EditableCarouselBlock, "8WklPCX2m3WDAIHsvU2x4MRFxCU=");
_c36 = EditableCarouselBlock;
function EditableGalleryBlock({ content, onDataChange }) {
    _s31();
    const images = content.images || [];
    const [showPicker, setShowPicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deleteConfirmIdx, setDeleteConfirmIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const updateImage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableGalleryBlock.useCallback[updateImage]": (idx, field, value)=>{
            const n = [
                ...images
            ];
            n[idx] = {
                ...n[idx],
                [field]: value
            };
            onDataChange({
                ...content,
                images: n
            });
        }
    }["EditableGalleryBlock.useCallback[updateImage]"], [
        images,
        content,
        onDataChange
    ]);
    const addImage = ()=>onDataChange({
            ...content,
            images: [
                ...images,
                {
                    src: '',
                    alt: ''
                }
            ]
        });
    const removeImage = (idx)=>{
        onDataChange({
            ...content,
            images: images.filter((_, i)=>i !== idx)
        });
        setDeleteConfirmIdx(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
                children: [
                    images.map((img, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative group/gimg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full h-32 bg-gray-100 rounded-lg overflow-hidden cursor-pointer",
                                    onClick: ()=>setShowPicker(idx),
                                    children: img.src ? // eslint-disable-next-line @next/next/no-img-element
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: img.src,
                                        alt: img.alt || '',
                                        className: "w-full h-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3422,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full h-full flex items-center justify-center text-gray-400",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                            className: "w-8 h-8"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3424,
                                            columnNumber: 95
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3424,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3419,
                                    columnNumber: 13
                                }, this),
                                images.length > 1 && (deleteConfirmIdx === idx ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-1 right-1 flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>removeImage(idx),
                                            className: "px-2 py-0.5 text-xs text-white bg-red-500 rounded",
                                            children: "Yes"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3430,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setDeleteConfirmIdx(null),
                                            className: "px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded",
                                            children: "No"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3431,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3429,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setDeleteConfirmIdx(idx),
                                    className: "absolute top-1 right-1 w-5 h-5 bg-white/90 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3434,
                                        columnNumber: 210
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3434,
                                    columnNumber: 17
                                }, this))
                            ]
                        }, idx, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 3418,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: addImage,
                        className: "w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:border-[#9F80DA] hover:text-[#9F80DA] transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                            className: "w-6 h-6"
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 3440,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3439,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3416,
                columnNumber: 7
            }, this),
            showPicker !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$ImagePickerModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImagePickerModal"], {
                currentUrl: images[showPicker]?.src || '',
                onSelect: (url)=>{
                    updateImage(showPicker, 'src', url);
                    setShowPicker(null);
                },
                onClose: ()=>setShowPicker(null)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3444,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 3415,
        columnNumber: 5
    }, this);
}
_s31(EditableGalleryBlock, "gQFVAcMKo5xGPscc47DwdU5Y2Rk=");
_c37 = EditableGalleryBlock;
// ─── StoryTelling ───────────────────────────────────────────────────
function EditableStoryBlock({ content, onDataChange }) {
    _s32();
    const [showPicker, setShowPicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-4 max-w-2xl mx-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-24 h-32 md:w-32 md:h-40 cursor-pointer group/avatar",
                                onClick: ()=>setShowPicker(true),
                                children: content.avatarImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: String(content.avatarImage),
                                            alt: String(content.avatarName || ''),
                                            className: "w-full h-full object-contain object-top"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3464,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 bg-black/20 opacity-0 group-hover/avatar:opacity-100 transition-opacity rounded-lg flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-white bg-black/50 px-2 py-1 rounded",
                                                children: "Change"
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 3466,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3465,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-400",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                        className: "w-6 h-6"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3470,
                                        columnNumber: 116
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3470,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3460,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "cursor-text text-center mt-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                    value: String(content.avatarName || ''),
                                    onChange: (v)=>onDataChange({
                                            ...content,
                                            avatarName: v
                                        }),
                                    tag: "p",
                                    className: "text-sm font-medium",
                                    style: {
                                        color: 'var(--block-text-color, #4B5563)'
                                    },
                                    placeholder: "Name...",
                                    multiline: false
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3474,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3473,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3459,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 bg-white rounded-2xl border-2 border-gray-200 cursor-text relative",
                            style: {
                                borderRadius: '15px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute left-0 top-4 -ml-2 w-0 h-0 border-t-[8px] border-t-transparent border-r-[10px] border-r-gray-200 border-b-[8px] border-b-transparent"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3480,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute left-0 top-4 -ml-[6px] w-0 h-0 border-t-[8px] border-t-transparent border-r-[10px] border-r-white border-b-[8px] border-b-transparent"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3481,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                    value: String(content.text || ''),
                                    onChange: (v)=>onDataChange({
                                            ...content,
                                            text: v
                                        }),
                                    tag: "p",
                                    className: "text-base",
                                    style: {
                                        color: 'var(--block-text-color, #1F2937)',
                                        lineHeight: '1.6'
                                    },
                                    placeholder: "Story text..."
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3482,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 3479,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3478,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3457,
                columnNumber: 7
            }, this),
            showPicker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$ImagePickerModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImagePickerModal"], {
                currentUrl: String(content.avatarImage || ''),
                onSelect: (url)=>{
                    onDataChange({
                        ...content,
                        avatarImage: url
                    });
                    setShowPicker(false);
                },
                onClose: ()=>setShowPicker(false)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3487,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 3456,
        columnNumber: 5
    }, this);
}
_s32(EditableStoryBlock, "PcDCImg70lXrYgxmpw3ewp/jgFc=");
_c38 = EditableStoryBlock;
// ─── Columns ────────────────────────────────────────────────────────
function EditableColumnsBlock({ content, onDataChange }) {
    const colCount = content.columns || 2;
    // Migration: if content.content is a string (old format), split into array
    const columnContent = Array.isArray(content.columnContent) ? content.columnContent : typeof content.content === 'string' ? Array.from({
        length: colCount
    }, (_, i)=>i === 0 ? content.content : '') : Array.from({
        length: colCount
    }, ()=>'');
    // Ensure array length matches column count
    const normalizedContent = Array.from({
        length: colCount
    }, (_, i)=>columnContent[i] || '');
    const updateColumn = (idx, value)=>{
        const n = [
            ...normalizedContent
        ];
        n[idx] = value;
        onDataChange({
            ...content,
            columnContent: n,
            content: n.join('\n\n')
        });
    };
    const changeColumnCount = (n)=>{
        const newContent = Array.from({
            length: n
        }, (_, i)=>normalizedContent[i] || '');
        onDataChange({
            ...content,
            columns: n,
            columnContent: newContent,
            content: newContent.join('\n\n')
        });
    };
    const gridClass = colCount === 1 ? 'grid-cols-1' : colCount === 2 ? 'grid-cols-1 sm:grid-cols-2' : colCount === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm text-gray-500",
                        children: "Columns:"
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3523,
                        columnNumber: 9
                    }, this),
                    [
                        1,
                        2,
                        3,
                        4
                    ].map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>changeColumnCount(n),
                            className: `w-8 h-8 rounded-lg text-sm font-medium transition-colors ${colCount === n ? 'bg-[#9F80DA] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`,
                            children: n
                        }, n, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 3525,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3522,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `grid ${gridClass} gap-6`,
                children: normalizedContent.map((col, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "cursor-text min-h-[4em]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                            value: col,
                            onChange: (v)=>updateColumn(idx, v),
                            tag: "div",
                            className: "text-sm text-gray-900 leading-relaxed",
                            style: {
                                lineHeight: '1.6',
                                color: 'var(--block-text-color, inherit)'
                            },
                            placeholder: `Column ${idx + 1}...`
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 3531,
                            columnNumber: 13
                        }, this)
                    }, idx, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3530,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3528,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 3521,
        columnNumber: 5
    }, this);
}
_c39 = EditableColumnsBlock;
// ─── Scenario ───────────────────────────────────────────────────────
function EditableScenarioBlock({ content, onDataChange }) {
    _s33();
    const answers = content.answers || [];
    const [showPicker, setShowPicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pickerTarget, setPickerTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('background');
    const [deleteConfirmId, setDeleteConfirmId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showAvatarGallery, setShowAvatarGallery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const blurAmount = content.blur || 0;
    const AVATAR_IMAGES = Array.from({
        length: 12
    }, (_, i)=>`/story-telling-block/torso-alto-${i + 1}.png`);
    const updateAnswer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableScenarioBlock.useCallback[updateAnswer]": (id, field, value)=>{
            let n = answers.map({
                "EditableScenarioBlock.useCallback[updateAnswer].n": (a)=>a.id === id ? {
                        ...a,
                        [field]: value
                    } : a
            }["EditableScenarioBlock.useCallback[updateAnswer].n"]);
            if (field === 'isCorrect' && value === true) {
                n = n.map({
                    "EditableScenarioBlock.useCallback[updateAnswer]": (a)=>a.id === id ? a : {
                            ...a,
                            isCorrect: false
                        }
                }["EditableScenarioBlock.useCallback[updateAnswer]"]);
            }
            onDataChange({
                ...content,
                answers: n
            });
        }
    }["EditableScenarioBlock.useCallback[updateAnswer]"], [
        answers,
        content,
        onDataChange
    ]);
    const addAnswer = ()=>{
        const maxOrder = answers.length > 0 ? Math.max(...answers.map((a)=>a.order)) : 0;
        onDataChange({
            ...content,
            answers: [
                ...answers,
                {
                    id: `sa-${Date.now()}`,
                    text: '',
                    order: maxOrder + 1,
                    isCorrect: false
                }
            ]
        });
    };
    const removeAnswer = (id)=>{
        onDataChange({
            ...content,
            answers: answers.filter((a)=>a.id !== id)
        });
        setDeleteConfirmId(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full min-h-[280px] bg-gray-100 rounded-lg overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0",
                        children: content.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: String(content.image),
                                    alt: "Background",
                                    className: "w-full h-full object-cover",
                                    style: {
                                        filter: blurAmount > 0 ? `blur(${blurAmount}px)` : undefined
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3575,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3576,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full h-full bg-gradient-to-b from-gray-200 to-gray-300"
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 3579,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3571,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-2 right-2 z-10 flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setPickerTarget('background');
                                    setShowPicker(true);
                                },
                                className: "px-2 py-1 text-xs text-white bg-black/40 hover:bg-black/60 rounded backdrop-blur-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                        className: "w-3 h-3 inline mr-1"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3586,
                                        columnNumber: 13
                                    }, this),
                                    "BG"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3585,
                                columnNumber: 11
                            }, this),
                            String(content.image || '') !== '' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1 px-2 py-1 bg-black/40 rounded backdrop-blur-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-white/70",
                                        children: "Blur"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3590,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "range",
                                        min: "0",
                                        max: "10",
                                        value: blurAmount,
                                        onChange: (e)=>onDataChange({
                                                ...content,
                                                blur: parseInt(e.target.value)
                                            }),
                                        className: "w-16 h-1 accent-white"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3591,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3589,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3584,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-0 left-4 z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative group/avatar cursor-pointer",
                            onClick: ()=>setShowAvatarGallery(true),
                            children: content.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: String(content.avatar),
                                        alt: "Character",
                                        className: "h-40 w-auto object-contain drop-shadow-lg"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3602,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-black/20 opacity-0 group-hover/avatar:opacity-100 transition-opacity rounded-lg flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-white bg-black/50 px-2 py-1 rounded",
                                            children: "Change"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3604,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3603,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-40 w-24 border-2 border-dashed border-white/40 rounded-lg flex flex-col items-center justify-center text-white/60 hover:border-white/70 hover:text-white/80 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                        className: "w-6 h-6 mb-1"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3609,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs",
                                        children: "Avatar"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3610,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3608,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 3598,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3597,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-4 left-32 right-4 z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg p-3 shadow-lg relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -bottom-2 left-4 w-4 h-4 bg-white transform rotate-45"
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3619,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "cursor-text relative z-10",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                        value: String(content.question || ''),
                                        onChange: (v)=>onDataChange({
                                                ...content,
                                                question: v
                                            }),
                                        tag: "p",
                                        className: "text-sm font-medium text-gray-900",
                                        placeholder: "Scenario question..."
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3621,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3620,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 3618,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3617,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3569,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    answers.map((ans)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-gray-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>updateAnswer(ans.id, 'isCorrect', !ans.isCorrect),
                                    className: `flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${ans.isCorrect ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`,
                                    children: ans.isCorrect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3632,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3631,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 cursor-text",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                        value: ans.text,
                                        onChange: (v)=>updateAnswer(ans.id, 'text', v),
                                        tag: "span",
                                        className: "text-sm text-gray-900",
                                        placeholder: "Answer text...",
                                        multiline: false
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3635,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3634,
                                    columnNumber: 13
                                }, this),
                                answers.length > 1 && (deleteConfirmId === ans.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1 flex-shrink-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>removeAnswer(ans.id),
                                            className: "px-2 py-0.5 text-xs text-white bg-red-500 rounded",
                                            children: "Yes"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3640,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setDeleteConfirmId(null),
                                            className: "px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded",
                                            children: "No"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3641,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3639,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setDeleteConfirmId(ans.id),
                                    className: "text-gray-300 hover:text-red-500",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3644,
                                        columnNumber: 113
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3644,
                                    columnNumber: 17
                                }, this))
                            ]
                        }, ans.id, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 3630,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: addAnswer,
                        className: "p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors cursor-pointer text-center text-sm text-gray-400 hover:text-[#9F80DA]",
                        children: "New answer..."
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3649,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3628,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2 border-t border-gray-100 pt-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-medium text-gray-400 uppercase tracking-wide",
                        children: "Feedback"
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3654,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3656,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 cursor-text",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                    value: String(content.feedbackCorrect || ''),
                                    onChange: (v)=>onDataChange({
                                            ...content,
                                            feedbackCorrect: v
                                        }),
                                    tag: "p",
                                    className: "text-sm text-green-700",
                                    placeholder: "Correct answer feedback..."
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3658,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3657,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3655,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3662,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 cursor-text",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                    value: String(content.feedbackIncorrect || ''),
                                    onChange: (v)=>onDataChange({
                                            ...content,
                                            feedbackIncorrect: v
                                        }),
                                    tag: "p",
                                    className: "text-sm text-red-700",
                                    placeholder: "Wrong answer feedback..."
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3664,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3663,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3661,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3653,
                columnNumber: 7
            }, this),
            showAvatarGallery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/50 backdrop-blur-sm",
                        onClick: ()=>setShowAvatarGallery(false)
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3672,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden mx-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between px-6 py-4 border-b border-gray-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-gray-900",
                                        children: "Select Character"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3675,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowAvatarGallery(false),
                                        className: "p-1.5 rounded-lg hover:bg-gray-100 text-gray-500",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3676,
                                            columnNumber: 128
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3676,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3674,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 grid grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto",
                                children: AVATAR_IMAGES.map((src, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            onDataChange({
                                                ...content,
                                                avatar: src
                                            });
                                            setShowAvatarGallery(false);
                                        },
                                        className: `relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all hover:shadow-md bg-gray-50 ${content.avatar === src ? 'border-[#9F80DA] ring-2 ring-[#9F80DA]/20' : 'border-gray-200 hover:border-[#9F80DA]'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: src,
                                            alt: `Character ${idx + 1}`,
                                            className: "w-full h-full object-contain"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3686,
                                            columnNumber: 19
                                        }, this)
                                    }, idx, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3680,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3678,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-6 py-3 border-t border-gray-200 flex justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setShowAvatarGallery(false);
                                            setPickerTarget('avatar');
                                            setShowPicker(true);
                                        },
                                        className: "text-sm text-[#9F80DA] hover:text-[#8A6BC5] font-medium",
                                        children: "Use custom image..."
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3691,
                                        columnNumber: 15
                                    }, this),
                                    String(content.avatar || '') !== '' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            onDataChange({
                                                ...content,
                                                avatar: ''
                                            });
                                            setShowAvatarGallery(false);
                                        },
                                        className: "text-sm text-red-400 hover:text-red-500",
                                        children: "Remove avatar"
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3693,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3690,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3673,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3671,
                columnNumber: 9
            }, this),
            showPicker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$ImagePickerModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImagePickerModal"], {
                currentUrl: String(pickerTarget === 'avatar' ? content.avatar || '' : content.image || ''),
                onSelect: (url)=>{
                    onDataChange({
                        ...content,
                        [pickerTarget === 'avatar' ? 'avatar' : 'image']: url
                    });
                    setShowPicker(false);
                },
                onClose: ()=>setShowPicker(false)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3701,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 3567,
        columnNumber: 5
    }, this);
}
_s33(EditableScenarioBlock, "uK9rNrFOF/HRRwhgRRM9qB3sgGE=");
_c40 = EditableScenarioBlock;
// ─── LabeledImage: image with positioned pin labels ─────────────────
function EditableLabeledImageBlock({ content, onDataChange }) {
    _s34();
    const labels = content.labels || [];
    const [showPicker, setShowPicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingPinId, setEditingPinId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deleteConfirmId, setDeleteConfirmId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const imageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const updateLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableLabeledImageBlock.useCallback[updateLabel]": (id, field, value)=>{
            onDataChange({
                ...content,
                labels: labels.map({
                    "EditableLabeledImageBlock.useCallback[updateLabel]": (l)=>l.id === id ? {
                            ...l,
                            [field]: value
                        } : l
                }["EditableLabeledImageBlock.useCallback[updateLabel]"])
            });
        }
    }["EditableLabeledImageBlock.useCallback[updateLabel]"], [
        labels,
        content,
        onDataChange
    ]);
    const addPin = (e)=>{
        if (!imageRef.current) return;
        const rect = imageRef.current.getBoundingClientRect();
        const x = Math.round((e.clientX - rect.left) / rect.width * 100);
        const y = Math.round((e.clientY - rect.top) / rect.height * 100);
        const newId = `pin-${Date.now()}`;
        onDataChange({
            ...content,
            labels: [
                ...labels,
                {
                    id: newId,
                    text: '',
                    description: '',
                    x,
                    y
                }
            ]
        });
        setEditingPinId(newId);
    };
    const removeLabel = (id)=>{
        onDataChange({
            ...content,
            labels: labels.filter((l)=>l.id !== id)
        });
        setDeleteConfirmId(null);
        if (editingPinId === id) setEditingPinId(null);
    };
    const image = String(content.image || '');
    const src = !image ? '' : image === '/sample.jpeg' || image.includes('sample') ? 'https://placehold.co/800x600/e2e8f0/64748b?text=Sample+Image' : image;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: imageRef,
                className: "relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden cursor-crosshair",
                onClick: addPin,
                children: [
                    src ? // eslint-disable-next-line @next/next/no-img-element
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: src,
                        alt: "Labeled",
                        className: "w-full h-full object-cover pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3754,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-full flex items-center justify-center text-gray-400 pointer-events-none",
                        children: "Click to add pins"
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3756,
                        columnNumber: 11
                    }, this),
                    labels.map((label)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute transform -translate-x-1/2 -translate-y-1/2 z-10",
                            style: {
                                left: `${label.x}%`,
                                top: `${label.y}%`
                            },
                            onClick: (e)=>{
                                e.stopPropagation();
                                setEditingPinId(editingPinId === label.id ? null : label.id);
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-6 h-6 rounded-full bg-[#9F80DA] border-2 border-white shadow-md flex items-center justify-center cursor-pointer",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-white font-bold",
                                        children: labels.indexOf(label) + 1
                                    }, void 0, false, {
                                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                        lineNumber: 3767,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3766,
                                    columnNumber: 13
                                }, this),
                                editingPinId === label.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-8 left-1/2 -translate-x-1/2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50",
                                    onClick: (e)=>e.stopPropagation(),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "cursor-text mb-1",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                                value: label.text,
                                                onChange: (v)=>updateLabel(label.id, 'text', v),
                                                tag: "p",
                                                className: "text-sm text-gray-900",
                                                placeholder: "Label text..."
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 3773,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3772,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "cursor-text mb-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                                value: label.description || '',
                                                onChange: (v)=>updateLabel(label.id, 'description', v),
                                                tag: "p",
                                                className: "text-xs text-gray-500 mt-1",
                                                placeholder: "Description..."
                                            }, void 0, false, {
                                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                lineNumber: 3776,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3775,
                                            columnNumber: 17
                                        }, this),
                                        deleteConfirmId === label.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-red-600",
                                                    children: "Delete?"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 3780,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>removeLabel(label.id),
                                                    className: "px-2 py-0.5 text-xs text-white bg-red-500 rounded",
                                                    children: "Yes"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 3781,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setDeleteConfirmId(null),
                                                    className: "px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded",
                                                    children: "No"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                                    lineNumber: 3782,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3779,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setDeleteConfirmId(label.id),
                                            className: "text-xs text-gray-400 hover:text-red-500",
                                            children: "Remove pin"
                                        }, void 0, false, {
                                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                            lineNumber: 3785,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3771,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, label.id, true, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 3760,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3751,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowPicker(true),
                        className: "text-xs text-[#9F80DA] hover:text-[#8A6BC5] font-medium flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                className: "w-3 h-3"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3793,
                                columnNumber: 145
                            }, this),
                            " Change image"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3793,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-gray-400",
                        children: "Click on image to add pins"
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3794,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3792,
                columnNumber: 7
            }, this),
            showPicker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$ImagePickerModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImagePickerModal"], {
                currentUrl: image,
                onSelect: (url)=>{
                    onDataChange({
                        ...content,
                        image: url
                    });
                    setShowPicker(false);
                },
                onClose: ()=>setShowPicker(false)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3797,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 3750,
        columnNumber: 5
    }, this);
}
_s34(EditableLabeledImageBlock, "Q61N52aZxdGg4DlDKjAw7CTD2Kg=");
_c41 = EditableLabeledImageBlock;
// ─── Separator: editable separator controls ─────────────────────────
function EditableSeparatorBlock({ content, onDataChange }) {
    const showLine = content.showLine !== false;
    const showNumber = content.showNumber === true;
    const lineColor = content.lineColor || '#d1d5db';
    const thickness = content.thickness || 'thin';
    const colorPresets = [
        {
            label: 'Gray',
            value: '#d1d5db'
        },
        {
            label: 'Purple',
            value: '#9F80DA'
        },
        {
            label: 'Blue',
            value: '#3b82f6'
        },
        {
            label: 'Green',
            value: '#22c55e'
        },
        {
            label: 'Orange',
            value: '#f97316'
        }
    ];
    const thicknessMap = {
        thin: '1px',
        medium: '2px',
        thick: '4px'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "py-4",
                children: showLine ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            style: {
                                borderTop: `${thicknessMap[thickness]} solid ${lineColor}`
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 3827,
                            columnNumber: 13
                        }, this),
                        showNumber && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-white",
                            style: {
                                backgroundColor: lineColor
                            },
                            children: "1"
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 3829,
                            columnNumber: 15
                        }, this),
                        showNumber && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            style: {
                                borderTop: `${thicknessMap[thickness]} solid ${lineColor}`
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                            lineNumber: 3831,
                            columnNumber: 28
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 3826,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-8"
                }, void 0, false, {
                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                    lineNumber: 3834,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3824,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-4 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: showLine,
                                onChange: (e)=>onDataChange({
                                        ...content,
                                        showLine: e.target.checked
                                    }),
                                className: "accent-[#9F80DA]"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3840,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-600",
                                children: "Show line"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3841,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3839,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: showNumber,
                                onChange: (e)=>onDataChange({
                                        ...content,
                                        showNumber: e.target.checked
                                    }),
                                className: "accent-[#9F80DA]"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3844,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-600",
                                children: "Show number"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3845,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3843,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-500",
                                children: "Height:"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3848,
                                columnNumber: 11
                            }, this),
                            [
                                'thin',
                                'medium',
                                'thick'
                            ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onDataChange({
                                            ...content,
                                            thickness: t
                                        }),
                                    className: `px-2 py-0.5 text-xs rounded transition-colors ${thickness === t ? 'bg-[#9F80DA] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`,
                                    children: t
                                }, t, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3850,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3847,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-500",
                                children: "Color:"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3854,
                                columnNumber: 11
                            }, this),
                            colorPresets.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onDataChange({
                                            ...content,
                                            lineColor: c.value
                                        }),
                                    className: `w-5 h-5 rounded-full border-2 transition-all ${lineColor === c.value ? 'border-gray-800 scale-110' : 'border-gray-200'}`,
                                    style: {
                                        backgroundColor: c.value
                                    },
                                    title: c.label
                                }, c.value, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3856,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3853,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3838,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 3822,
        columnNumber: 5
    }, this);
}
_c42 = EditableSeparatorBlock;
// ─── Banner: hero/banner editor ──────────────────────────────────────
function EditableBannerBlock({ content, onDataChange }) {
    _s35();
    const [showPicker, setShowPicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const overlayOpacity = content.overlayOpacity ?? 40;
    const height = content.height || 'medium';
    const overlayColor = content.overlayColor || '#000000';
    const heightClasses = {
        small: 'min-h-[200px]',
        medium: 'min-h-[300px]',
        large: 'min-h-[400px]'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4 rounded-lg space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `relative ${heightClasses[height] || heightClasses.medium} rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center`,
                children: [
                    String(content.image || '') && // eslint-disable-next-line @next/next/no-img-element
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: String(content.image),
                        alt: "Banner",
                        className: "absolute inset-0 w-full h-full object-cover"
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3884,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0",
                        style: {
                            backgroundColor: overlayColor,
                            opacity: overlayOpacity / 100
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3886,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowPicker(true),
                        className: "absolute top-2 right-2 z-20 px-2 py-1 text-xs text-white bg-black/40 hover:bg-black/60 rounded backdrop-blur-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                className: "w-3 h-3 inline mr-1"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3889,
                                columnNumber: 11
                            }, this),
                            "Image"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3888,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 text-center px-6 max-w-2xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "cursor-text",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                    value: String(content.title || ''),
                                    onChange: (v)=>onDataChange({
                                            ...content,
                                            title: v
                                        }),
                                    tag: "h1",
                                    className: "text-3xl font-bold text-white drop-shadow-lg",
                                    style: {
                                        color: '#ffffff'
                                    },
                                    placeholder: "Banner Title",
                                    multiline: false
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3893,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3892,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "cursor-text mt-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$EditableText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableText"], {
                                    value: String(content.subtitle || ''),
                                    onChange: (v)=>onDataChange({
                                            ...content,
                                            subtitle: v
                                        }),
                                    tag: "p",
                                    className: "text-lg text-white/90 drop-shadow-md",
                                    style: {
                                        color: 'rgba(255,255,255,0.9)'
                                    },
                                    placeholder: "Subtitle text..."
                                }, void 0, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3896,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3895,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3891,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3881,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-4 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-500",
                                children: "Height:"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3904,
                                columnNumber: 11
                            }, this),
                            [
                                'small',
                                'medium',
                                'large'
                            ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onDataChange({
                                            ...content,
                                            height: h
                                        }),
                                    className: `px-2 py-0.5 text-xs rounded transition-colors ${height === h ? 'bg-[#9F80DA] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`,
                                    children: h
                                }, h, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3906,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3903,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-500",
                                children: "Overlay:"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3912,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "range",
                                min: "0",
                                max: "80",
                                value: overlayOpacity,
                                onChange: (e)=>onDataChange({
                                        ...content,
                                        overlayOpacity: parseInt(e.target.value)
                                    }),
                                className: "w-20 h-1 accent-[#9F80DA]"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3913,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-400",
                                children: [
                                    overlayOpacity,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3914,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3911,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-500",
                                children: "Color:"
                            }, void 0, false, {
                                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                lineNumber: 3917,
                                columnNumber: 11
                            }, this),
                            [
                                {
                                    label: 'Black',
                                    value: '#000000'
                                },
                                {
                                    label: 'Purple',
                                    value: '#4c1d95'
                                },
                                {
                                    label: 'Blue',
                                    value: '#1e3a5f'
                                },
                                {
                                    label: 'Green',
                                    value: '#14532d'
                                }
                            ].map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onDataChange({
                                            ...content,
                                            overlayColor: c.value
                                        }),
                                    className: `w-5 h-5 rounded-full border-2 transition-all ${overlayColor === c.value ? 'border-gray-800 scale-110' : 'border-gray-200'}`,
                                    style: {
                                        backgroundColor: c.value
                                    },
                                    title: c.label
                                }, c.value, false, {
                                    fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                                    lineNumber: 3919,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                        lineNumber: 3916,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3902,
                columnNumber: 7
            }, this),
            showPicker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$ImagePickerModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImagePickerModal"], {
                currentUrl: String(content.image || ''),
                onSelect: (url)=>{
                    onDataChange({
                        ...content,
                        image: url
                    });
                    setShowPicker(false);
                },
                onClose: ()=>setShowPicker(false)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
                lineNumber: 3925,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/EditableCourseComponent.tsx",
        lineNumber: 3879,
        columnNumber: 5
    }, this);
}
_s35(EditableBannerBlock, "PcDCImg70lXrYgxmpw3ewp/jgFc=");
_c43 = EditableBannerBlock;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14, _c15, _c16, _c17, _c18, _c19, _c20, _c21, _c22, _c23, _c24, _c25, _c26, _c27, _c28, _c29, _c30, _c31, _c32, _c33, _c34, _c35, _c36, _c37, _c38, _c39, _c40, _c41, _c42, _c43;
__turbopack_context__.k.register(_c, "BlurInput");
__turbopack_context__.k.register(_c1, "EditableCourseComponent");
__turbopack_context__.k.register(_c2, "NotionStyleBlock");
__turbopack_context__.k.register(_c3, "QuoteVariantEditor");
__turbopack_context__.k.register(_c4, "HighlightVariantEditor");
__turbopack_context__.k.register(_c5, "EditableListBlock");
__turbopack_context__.k.register(_c6, "EditableTabsBlock");
__turbopack_context__.k.register(_c7, "EditableAccordionBlock");
__turbopack_context__.k.register(_c8, "EditableSortingStepsBlock");
__turbopack_context__.k.register(_c9, "EditableMultipleResponseBlock");
__turbopack_context__.k.register(_c10, "EditableCauseEffectBlock");
__turbopack_context__.k.register(_c11, "EditableImageBlock");
__turbopack_context__.k.register(_c12, "ImageOverlay");
__turbopack_context__.k.register(_c13, "EditableImageWithTextBlock");
__turbopack_context__.k.register(_c14, "EditableMultipleChoiceBlock");
__turbopack_context__.k.register(_c15, "EditableFillInBlankBlock");
__turbopack_context__.k.register(_c16, "EditableMatchingPairsBlock");
__turbopack_context__.k.register(_c17, "EditableSortingCategoriesBlock");
__turbopack_context__.k.register(_c18, "EditableTwoFieldBlock");
__turbopack_context__.k.register(_c19, "TwoListColumnEditor");
__turbopack_context__.k.register(_c20, "EditableTwoListBlock");
__turbopack_context__.k.register(_c21, "EditableComparisonItemsBlock");
__turbopack_context__.k.register(_c22, "EditableChatBlock");
__turbopack_context__.k.register(_c23, "EditableChatQABlock");
__turbopack_context__.k.register(_c24, "EditableChatDialogBlock");
__turbopack_context__.k.register(_c25, "EditableTimelineBlock");
__turbopack_context__.k.register(_c26, "EditableFlashCardBlock");
__turbopack_context__.k.register(_c27, "EditableTestimonialBlock");
__turbopack_context__.k.register(_c28, "EditableItemsBlock");
__turbopack_context__.k.register(_c29, "EditableReviewsBlock");
__turbopack_context__.k.register(_c30, "EditableTableBlock");
__turbopack_context__.k.register(_c31, "EditableButtonBlock");
__turbopack_context__.k.register(_c32, "EditableButtonStackBlock");
__turbopack_context__.k.register(_c33, "EditableMediaUrlBlock");
__turbopack_context__.k.register(_c34, "EditableEmbedBlock");
__turbopack_context__.k.register(_c35, "EditableAttachmentBlock");
__turbopack_context__.k.register(_c36, "EditableCarouselBlock");
__turbopack_context__.k.register(_c37, "EditableGalleryBlock");
__turbopack_context__.k.register(_c38, "EditableStoryBlock");
__turbopack_context__.k.register(_c39, "EditableColumnsBlock");
__turbopack_context__.k.register(_c40, "EditableScenarioBlock");
__turbopack_context__.k.register(_c41, "EditableLabeledImageBlock");
__turbopack_context__.k.register(_c42, "EditableSeparatorBlock");
__turbopack_context__.k.register(_c43, "EditableBannerBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_project_%5BcourseKey%5D__components_EditableCourseComponent_tsx_8174d595._.js.map