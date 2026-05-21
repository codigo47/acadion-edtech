module.exports = [
"[project]/lib/auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearAuth",
    ()=>clearAuth,
    "getGoogleLoginUrl",
    ()=>getGoogleLoginUrl,
    "getProfile",
    ()=>getProfile,
    "getToken",
    ()=>getToken,
    "getUser",
    ()=>getUser,
    "getUserId",
    ()=>getUserId,
    "isAuthenticated",
    ()=>isAuthenticated,
    "login",
    ()=>login,
    "register",
    ()=>register,
    "saveAuth",
    ()=>saveAuth
]);
const API_URL = `${("TURBOPACK compile-time value", "http://localhost:8001/api/v1") || 'http://localhost:8001/api/v1'}`;
async function login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
    }
    return response.json();
}
async function register(email, password, name) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
            name
        })
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
    }
    return response.json();
}
function getGoogleLoginUrl() {
    return `${API_URL}/auth/google`;
}
async function getProfile(token) {
    const response = await fetch(`${API_URL}/auth/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to get profile');
    }
    return response.json();
}
function saveAuth(authResponse) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
}
function getToken() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return null;
}
function getUser() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return null;
}
function clearAuth() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
}
function getUserId() {
    const user = getUser();
    return user?.id || null;
}
function isAuthenticated() {
    return !!getToken();
}
}),
"[project]/lib/api-client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_URL",
    ()=>API_URL,
    "ApiError",
    ()=>ApiError,
    "api",
    ()=>api
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-ssr] (ecmascript)");
;
const API_URL = `${("TURBOPACK compile-time value", "http://localhost:8001/api/v1") || 'http://localhost:8001/api'}`;
class ApiError extends Error {
    status;
    data;
    constructor(status, message, data){
        super(message), this.status = status, this.data = data;
        this.name = 'ApiError';
    }
}
async function request(endpoint, options = {}) {
    const { body, auth = true, raw = false, headers: customHeaders, ...restOptions } = options;
    const headers = {
        ...raw ? {} : {
            'Content-Type': 'application/json'
        },
        ...customHeaders
    };
    if (auth) {
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...restOptions,
        headers,
        body: raw ? body : body ? JSON.stringify(body) : undefined
    });
    if (!response.ok) {
        const errorData = await response.json().catch(()=>({}));
        throw new ApiError(response.status, errorData.message || `Request failed with status ${response.status}`, errorData);
    }
    if (response.status === 204) {
        return {};
    }
    return response.json();
}
const api = {
    get: (endpoint, options)=>request(endpoint, {
            ...options,
            method: 'GET'
        }),
    post: (endpoint, body, options)=>request(endpoint, {
            ...options,
            method: 'POST',
            body
        }),
    put: (endpoint, body, options)=>request(endpoint, {
            ...options,
            method: 'PUT',
            body
        }),
    patch: (endpoint, body, options)=>request(endpoint, {
            ...options,
            method: 'PATCH',
            body
        }),
    delete: (endpoint, options)=>request(endpoint, {
            ...options,
            method: 'DELETE'
        }),
    upload: (endpoint, file, fieldName = 'file')=>{
        const formData = new FormData();
        formData.append(fieldName, file);
        return request(endpoint, {
            method: 'POST',
            body: formData,
            raw: true
        });
    }
};
;
}),
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
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get('/lms/dashboard')
    });
}
function useLmsCourseContent(courseKey) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'lms-course',
            courseKey
        ],
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(`/lms/courses/${courseKey}`),
        enabled: !!courseKey
    });
}
function useLmsSelfEnroll() {
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (courseKey)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(`/lms/courses/${courseKey}/enroll`, {}),
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
        mutationFn: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].patch(`/lms/courses/${courseKey}/progress`, data),
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
        mutationFn: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(`/lms/courses/${courseKey}/complete`, data),
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
        mutationFn: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(`/lms/courses/${courseKey}/knowledge-check`, data)
    });
}
function useLmsAdminEnroll(courseKey) {
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(`/lms/courses/${courseKey}/admin-enroll`, data),
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
        mutationFn: (userId)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(`/lms/courses/${courseKey}/re-enroll/${userId}`, {}),
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
];

//# sourceMappingURL=lib_495128f4._.js.map