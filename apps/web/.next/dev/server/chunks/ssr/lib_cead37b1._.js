module.exports = [
"[project]/lib/hooks/use-lms.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLmsAdminEnroll",
    ()=>useLmsAdminEnroll,
    "useLmsCompleteCourse",
    ()=>useLmsCompleteCourse,
    "useLmsCourseContent",
    ()=>useLmsCourseContent,
    "useLmsDashboard",
    ()=>useLmsDashboard,
    "useLmsReEnroll",
    ()=>useLmsReEnroll,
    "useLmsSelfEnroll",
    ()=>useLmsSelfEnroll,
    "useLmsSubmitKnowledgeCheck",
    ()=>useLmsSubmitKnowledgeCheck,
    "useLmsUpdateProgress",
    ()=>useLmsUpdateProgress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-ssr] (ecmascript)");
'use client';
;
;
function useLmsDashboard() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'lms-dashboard'
        ],
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get('/v1/lms/dashboard')
    });
}
function useLmsCourseContent(courseKey) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'lms-course',
            courseKey
        ],
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(`/v1/lms/courses/${courseKey}`),
        enabled: !!courseKey
    });
}
function useLmsSelfEnroll() {
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (courseKey)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(`/v1/lms/courses/${courseKey}/enroll`, {}),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: [
                    'lms-dashboard'
                ]
            });
        }
    });
}
function useLmsUpdateProgress(courseKey) {
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].patch(`/v1/lms/courses/${courseKey}/progress`, data),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: [
                    'lms-course',
                    courseKey
                ]
            });
            queryClient.invalidateQueries({
                queryKey: [
                    'lms-dashboard'
                ]
            });
        }
    });
}
function useLmsCompleteCourse(courseKey) {
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(`/v1/lms/courses/${courseKey}/complete`, data),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: [
                    'lms-course',
                    courseKey
                ]
            });
            queryClient.invalidateQueries({
                queryKey: [
                    'lms-dashboard'
                ]
            });
        }
    });
}
function useLmsSubmitKnowledgeCheck(courseKey) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(`/v1/lms/courses/${courseKey}/knowledge-check`, data)
    });
}
function useLmsAdminEnroll(courseKey) {
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(`/v1/lms/courses/${courseKey}/admin-enroll`, data),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: [
                    'analytics'
                ]
            });
        }
    });
}
function useLmsReEnroll(courseKey) {
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (userId)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(`/v1/lms/courses/${courseKey}/re-enroll/${userId}`, {}),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: [
                    'analytics'
                ]
            });
        }
    });
}
}),
"[project]/lib/hooks/use-upload.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUploadImage",
    ()=>useUploadImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-ssr] (ecmascript)");
;
;
function useUploadImage() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (file)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].upload('/uploads/image', file)
    });
}
}),
"[project]/lib/hooks/use-project-colors.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProjectUsedColorsProvider",
    ()=>ProjectUsedColorsProvider,
    "extractUsedColors",
    ()=>extractUsedColors,
    "useComputeProjectColors",
    ()=>useComputeProjectColors,
    "useProjectUsedColors",
    ()=>useProjectUsedColors
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
const ProjectUsedColorsContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])([]);
const ProjectUsedColorsProvider = ProjectUsedColorsContext.Provider;
function useProjectUsedColors() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ProjectUsedColorsContext);
}
function extractUsedColors(components) {
    const colors = new Set();
    for (const comp of components){
        const c = comp.data || comp.content;
        if (!c) continue;
        // Block-level styles
        const bs = c.blockStyles;
        if (bs?.textColor) colors.add(bs.textColor.toUpperCase());
        if (bs?.backgroundColor) colors.add(bs.backgroundColor.toUpperCase());
        // Scenario bubble
        if (typeof c.bubbleBg === 'string' && c.bubbleBg) {
            colors.add(c.bubbleBg.toUpperCase());
        }
        // Table cell styles
        if (c.cellStyles && typeof c.cellStyles === 'object') {
            const cs = c.cellStyles;
            for (const style of Object.values(cs)){
                if (style?.bg) colors.add(style.bg.toUpperCase());
                if (style?.color) colors.add(style.color.toUpperCase());
            }
        }
        // Table preset colors
        if (c.tableStyle && typeof c.tableStyle === 'object') {
            const ts = c.tableStyle;
            for (const key of [
                'headerBg',
                'headerTextColor',
                'cellTextColor',
                'borderColor',
                'evenRowBg',
                'oddRowBg'
            ]){
                if (ts[key]) colors.add(ts[key].toUpperCase());
            }
        }
    }
    // Remove common defaults that aren't interesting
    colors.delete('#FFFFFF');
    colors.delete('#000000');
    colors.delete('#F3F4F6');
    colors.delete('#D1D5DB');
    return Array.from(colors);
}
function useComputeProjectColors(components) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>extractUsedColors(components), [
        components
    ]);
}
}),
"[project]/lib/block-styles.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "blockStylesToCss",
    ()=>blockStylesToCss,
    "blockStylesToFormat",
    ()=>blockStylesToFormat,
    "formatToBlockStyles",
    ()=>formatToBlockStyles
]);
const MARGIN_CSS = {
    none: '0',
    small: '0.5rem',
    medium: '1rem',
    large: '2rem'
};
const FONT_SIZE_CSS = {
    small: '0.875rem',
    normal: '1rem',
    large: '1.125rem',
    xlarge: '1.25rem'
};
/** Legacy token → numeric px mapping */ const LEGACY_SIZE_TO_PX = {
    small: 14,
    normal: 16,
    large: 18,
    xlarge: 20
};
function blockStylesToCss(styles) {
    if (!styles) return {};
    const css = {};
    if (styles.marginTop && styles.marginTop !== 'none') css.marginTop = MARGIN_CSS[styles.marginTop] || '0';
    if (styles.marginBottom && styles.marginBottom !== 'none') css.marginBottom = MARGIN_CSS[styles.marginBottom] || '0';
    if (styles.backgroundColor && styles.backgroundColor !== '#FFFFFF') css.backgroundColor = styles.backgroundColor;
    if (styles.textColor) {
        css.color = styles.textColor;
        css['--block-text-color'] = styles.textColor;
    }
    if (styles.textAlign) css.textAlign = styles.textAlign;
    // fontSize: numeric (px) or legacy string token
    if (styles.fontSize != null) {
        if (typeof styles.fontSize === 'number') {
            css.fontSize = `${styles.fontSize}px`;
            css['--block-font-size'] = `${styles.fontSize}px`;
        } else if (styles.fontSize !== 'normal') {
            css.fontSize = FONT_SIZE_CSS[styles.fontSize];
            css['--block-font-size'] = FONT_SIZE_CSS[styles.fontSize];
        }
    }
    if (styles.bold) css.fontWeight = 'bold';
    if (styles.italic) css.fontStyle = 'italic';
    const decorations = [];
    if (styles.underline) decorations.push('underline');
    if (styles.strikethrough) decorations.push('line-through');
    if (decorations.length) css.textDecoration = decorations.join(' ');
    if (styles.borderRadius) css.borderRadius = `${styles.borderRadius}px`;
    return css;
}
function blockStylesToFormat(bs) {
    let fontSize;
    if (bs.fontSize != null) {
        if (typeof bs.fontSize === 'number') {
            fontSize = bs.fontSize;
        } else {
            fontSize = LEGACY_SIZE_TO_PX[bs.fontSize] ?? 16;
        }
    }
    return {
        bold: bs.bold,
        italic: bs.italic,
        underline: bs.underline,
        strikethrough: bs.strikethrough,
        textColor: bs.textColor,
        bgColor: bs.backgroundColor,
        hAlign: bs.textAlign,
        marginTop: bs.marginTop,
        marginBottom: bs.marginBottom,
        fontSize,
        borderRadius: bs.borderRadius
    };
}
function formatToBlockStyles(fs) {
    return {
        bold: fs.bold,
        italic: fs.italic,
        underline: fs.underline,
        strikethrough: fs.strikethrough,
        textColor: fs.textColor,
        backgroundColor: fs.bgColor,
        textAlign: fs.hAlign,
        marginTop: fs.marginTop,
        marginBottom: fs.marginBottom,
        fontSize: fs.fontSize,
        borderRadius: fs.borderRadius
    };
}
}),
];

//# sourceMappingURL=lib_cead37b1._.js.map