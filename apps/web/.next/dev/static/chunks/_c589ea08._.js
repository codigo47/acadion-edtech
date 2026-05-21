(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
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
    if ("TURBOPACK compile-time truthy", 1) {
        localStorage.setItem('token', authResponse.accessToken);
        localStorage.setItem('user', JSON.stringify(authResponse.user));
    }
}
function getToken() {
    if ("TURBOPACK compile-time truthy", 1) {
        return localStorage.getItem('token');
    }
    //TURBOPACK unreachable
    ;
}
function getUser() {
    if ("TURBOPACK compile-time truthy", 1) {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
    //TURBOPACK unreachable
    ;
}
function clearAuth() {
    if ("TURBOPACK compile-time truthy", 1) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
}
function getUserId() {
    const user = getUser();
    return user?.id || null;
}
function isAuthenticated() {
    return !!getToken();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_URL",
    ()=>API_URL,
    "ApiError",
    ()=>ApiError,
    "api",
    ()=>api
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-client] (ecmascript)");
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
    const { body, auth = true, headers: customHeaders, ...restOptions } = options;
    const headers = {
        'Content-Type': 'application/json',
        ...customHeaders
    };
    if (auth) {
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getToken"])();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...restOptions,
        headers,
        body: body ? JSON.stringify(body) : undefined
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
        })
};
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/use-lms.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature();
'use client';
;
;
function useLmsDashboard() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'lms-dashboard'
        ],
        queryFn: {
            "useLmsDashboard.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get('/lms/dashboard')
        }["useLmsDashboard.useQuery"]
    });
}
_s(useLmsDashboard, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useLmsCourseContent(courseKey) {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'lms-course',
            courseKey
        ],
        queryFn: {
            "useLmsCourseContent.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(`/lms/courses/${courseKey}`)
        }["useLmsCourseContent.useQuery"],
        enabled: !!courseKey
    });
}
_s1(useLmsCourseContent, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useLmsSelfEnroll() {
    _s2();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useLmsSelfEnroll.useMutation": (courseKey)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(`/lms/courses/${courseKey}/enroll`, {})
        }["useLmsSelfEnroll.useMutation"],
        onSuccess: {
            "useLmsSelfEnroll.useMutation": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'lms-dashboard'
                    ]
                });
            }
        }["useLmsSelfEnroll.useMutation"]
    });
}
_s2(useLmsSelfEnroll, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useLmsUpdateProgress(courseKey) {
    _s3();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useLmsUpdateProgress.useMutation": (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].patch(`/lms/courses/${courseKey}/progress`, data)
        }["useLmsUpdateProgress.useMutation"],
        onSuccess: {
            "useLmsUpdateProgress.useMutation": ()=>{
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
        }["useLmsUpdateProgress.useMutation"]
    });
}
_s3(useLmsUpdateProgress, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useLmsCompleteCourse(courseKey) {
    _s4();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useLmsCompleteCourse.useMutation": (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(`/lms/courses/${courseKey}/complete`, data)
        }["useLmsCompleteCourse.useMutation"],
        onSuccess: {
            "useLmsCompleteCourse.useMutation": ()=>{
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
        }["useLmsCompleteCourse.useMutation"]
    });
}
_s4(useLmsCompleteCourse, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useLmsSubmitKnowledgeCheck(courseKey) {
    _s5();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useLmsSubmitKnowledgeCheck.useMutation": (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(`/lms/courses/${courseKey}/knowledge-check`, data)
        }["useLmsSubmitKnowledgeCheck.useMutation"]
    });
}
_s5(useLmsSubmitKnowledgeCheck, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useLmsAdminEnroll(courseKey) {
    _s6();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useLmsAdminEnroll.useMutation": (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(`/lms/courses/${courseKey}/admin-enroll`, data)
        }["useLmsAdminEnroll.useMutation"],
        onSuccess: {
            "useLmsAdminEnroll.useMutation": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'analytics'
                    ]
                });
            }
        }["useLmsAdminEnroll.useMutation"]
    });
}
_s6(useLmsAdminEnroll, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useLmsReEnroll(courseKey) {
    _s7();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useLmsReEnroll.useMutation": (userId)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(`/lms/courses/${courseKey}/re-enroll/${userId}`, {})
        }["useLmsReEnroll.useMutation"],
        onSuccess: {
            "useLmsReEnroll.useMutation": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'analytics'
                    ]
                });
            }
        }["useLmsReEnroll.useMutation"]
    });
}
_s7(useLmsReEnroll, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/Paragraph.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Paragraph
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function Paragraph({ content, contentStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: `text-base leading-relaxed ${dark ? 'text-gray-300' : ''}`,
        style: {
            fontSize: contentStyle.fontSize,
            fontWeight: contentStyle.fontWeight,
            color: contentStyle.color || (dark ? '#d1d5db' : undefined),
            fontStyle: contentStyle.fontStyle,
            textAlign: contentStyle.textAlign,
            lineHeight: contentStyle.lineHeight || '1.75'
        },
        children: content
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/Paragraph.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = Paragraph;
var _c;
__turbopack_context__.k.register(_c, "Paragraph");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ParagraphBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ParagraphBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Paragraph$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/Paragraph.tsx [app-client] (ecmascript)");
'use client';
;
;
function ParagraphBlock({ content, contentStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Paragraph$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            content: content,
            contentStyle: contentStyle,
            dark: dark
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/ParagraphBlock.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/ParagraphBlock.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = ParagraphBlock;
var _c;
__turbopack_context__.k.register(_c, "ParagraphBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ParagraphWithHeadingBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ParagraphWithHeadingBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Paragraph$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/Paragraph.tsx [app-client] (ecmascript)");
'use client';
;
;
function ParagraphWithHeadingBlock({ heading, content, headingStyle = {}, contentStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: `mb-4 text-2xl font-bold ${dark ? 'text-white' : ''}`,
                style: {
                    fontSize: headingStyle.fontSize || '1.5rem',
                    fontWeight: headingStyle.fontWeight || '700',
                    color: headingStyle.color || (dark ? '#ffffff' : undefined),
                    fontStyle: headingStyle.fontStyle,
                    textAlign: headingStyle.textAlign,
                    lineHeight: headingStyle.lineHeight
                },
                children: heading
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/ParagraphWithHeadingBlock.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Paragraph$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                content: content,
                contentStyle: contentStyle,
                dark: dark
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/ParagraphWithHeadingBlock.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/ParagraphWithHeadingBlock.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_c = ParagraphWithHeadingBlock;
var _c;
__turbopack_context__.k.register(_c, "ParagraphWithHeadingBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ParagraphWithSubheadingBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ParagraphWithSubheadingBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Paragraph$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/Paragraph.tsx [app-client] (ecmascript)");
'use client';
;
;
function ParagraphWithSubheadingBlock({ subheading, content, subheadingStyle = {}, contentStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: `mb-3 text-lg font-semibold ${dark ? 'text-gray-300' : 'text-gray-700'}`,
                style: {
                    fontSize: subheadingStyle.fontSize || '1.125rem',
                    fontWeight: subheadingStyle.fontWeight || '600',
                    color: subheadingStyle.color || (dark ? '#d1d5db' : '#374151'),
                    fontStyle: subheadingStyle.fontStyle,
                    textAlign: subheadingStyle.textAlign,
                    lineHeight: subheadingStyle.lineHeight
                },
                children: subheading
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/ParagraphWithSubheadingBlock.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Paragraph$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                content: content,
                contentStyle: contentStyle,
                dark: dark
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/ParagraphWithSubheadingBlock.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/ParagraphWithSubheadingBlock.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_c = ParagraphWithSubheadingBlock;
var _c;
__turbopack_context__.k.register(_c, "ParagraphWithSubheadingBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/Heading.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Heading
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function Heading({ text, level = 1, textStyle = {}, dark = false }) {
    const sizeClasses = {
        1: 'text-4xl font-bold',
        2: 'text-3xl font-bold',
        3: 'text-2xl font-semibold',
        4: 'text-xl font-semibold',
        5: 'text-lg font-medium',
        6: 'text-base font-medium'
    }[level];
    const commonProps = {
        className: `${sizeClasses} ${dark ? 'text-white' : ''}`,
        style: {
            fontSize: textStyle.fontSize,
            fontWeight: textStyle.fontWeight,
            color: textStyle.color || (dark ? '#ffffff' : undefined),
            fontStyle: textStyle.fontStyle,
            textAlign: textStyle.textAlign,
            lineHeight: textStyle.lineHeight
        }
    };
    switch(level){
        case 1:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                ...commonProps,
                children: text
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/Heading.tsx",
                lineNumber: 42,
                columnNumber: 14
            }, this);
        case 2:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                ...commonProps,
                children: text
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/Heading.tsx",
                lineNumber: 44,
                columnNumber: 14
            }, this);
        case 3:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                ...commonProps,
                children: text
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/Heading.tsx",
                lineNumber: 46,
                columnNumber: 14
            }, this);
        case 4:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                ...commonProps,
                children: text
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/Heading.tsx",
                lineNumber: 48,
                columnNumber: 14
            }, this);
        case 5:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                ...commonProps,
                children: text
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/Heading.tsx",
                lineNumber: 50,
                columnNumber: 14
            }, this);
        case 6:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h6", {
                ...commonProps,
                children: text
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/Heading.tsx",
                lineNumber: 52,
                columnNumber: 14
            }, this);
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                ...commonProps,
                children: text
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/Heading.tsx",
                lineNumber: 54,
                columnNumber: 14
            }, this);
    }
}
_c = Heading;
var _c;
__turbopack_context__.k.register(_c, "Heading");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/HeadingBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeadingBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Heading$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/Heading.tsx [app-client] (ecmascript)");
'use client';
;
;
function HeadingBlock({ heading, level = 1, textStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Heading$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            text: heading,
            level: level,
            textStyle: textStyle,
            dark: dark
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/HeadingBlock.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/HeadingBlock.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = HeadingBlock;
var _c;
__turbopack_context__.k.register(_c, "HeadingBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/SubheadingBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SubheadingBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Heading$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/Heading.tsx [app-client] (ecmascript)");
'use client';
;
;
function SubheadingBlock({ subheading, textStyle = {}, dark = false }) {
    const defaultStyle = {
        ...textStyle,
        color: textStyle.color || (dark ? '#9ca3af' : '#6B7280')
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Heading$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            text: subheading,
            level: 3,
            textStyle: defaultStyle,
            dark: dark
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/SubheadingBlock.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/SubheadingBlock.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_c = SubheadingBlock;
var _c;
__turbopack_context__.k.register(_c, "SubheadingBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/Highlight.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Highlight
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function Highlight({ text, textStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: `text-lg font-medium ${dark ? 'text-gray-200' : ''}`,
        style: {
            fontSize: textStyle.fontSize || '18px',
            fontWeight: textStyle.fontWeight || '500',
            color: textStyle.color || (dark ? '#e5e7eb' : undefined),
            fontStyle: textStyle.fontStyle,
            textAlign: textStyle.textAlign,
            lineHeight: textStyle.lineHeight || '1.6'
        },
        children: text
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/Highlight.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = Highlight;
var _c;
__turbopack_context__.k.register(_c, "Highlight");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/HighlightNoteBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HighlightNoteBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Highlight$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/Highlight.tsx [app-client] (ecmascript)");
'use client';
;
;
function HighlightNoteBlock({ highlight, textStyle = {}, blockStyle = 'A', dark = false }) {
    const styleClasses = dark ? ({
        A: 'bg-yellow-900/50 border-l-4 border-yellow-500',
        B: 'bg-blue-900/50 border-l-4 border-blue-500',
        C: 'bg-purple-900/50 border-l-4 border-purple-500'
    })[blockStyle] : ({
        A: 'bg-yellow-100 border-l-4 border-yellow-500',
        B: 'bg-blue-100 border-l-4 border-blue-500',
        C: 'bg-purple-100 border-l-4 border-purple-500'
    })[blockStyle];
    const textColors = dark ? ({
        A: '#fde68a',
        B: '#93c5fd',
        C: '#d8b4fe'
    })[blockStyle] : ({
        A: '#713f12',
        B: '#1e40af',
        C: '#581c87'
    })[blockStyle];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${styleClasses} p-6 rounded-r-lg my-4`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Highlight$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            text: highlight,
            textStyle: {
                ...textStyle,
                color: textStyle.color || textColors
            },
            dark: dark
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/HighlightNoteBlock.tsx",
            lineNumber: 42,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/HighlightNoteBlock.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_c = HighlightNoteBlock;
var _c;
__turbopack_context__.k.register(_c, "HighlightNoteBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/HighlightBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HighlightBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightNoteBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/HighlightNoteBlock.tsx [app-client] (ecmascript)");
'use client';
;
;
function HighlightBlock(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightNoteBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/HighlightBlock.tsx",
        lineNumber: 9,
        columnNumber: 10
    }, this);
}
_c = HighlightBlock;
var _c;
__turbopack_context__.k.register(_c, "HighlightBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/HighlightColumnBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HighlightColumnBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Highlight$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/Highlight.tsx [app-client] (ecmascript)");
'use client';
;
;
function HighlightColumnBlock({ highlight, textStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full py-8 ${dark ? 'bg-gray-900' : ''}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-xl mx-auto px-12",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Highlight$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                text: highlight,
                textStyle: {
                    ...textStyle,
                    textAlign: 'center'
                },
                dark: dark
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/HighlightColumnBlock.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/HighlightColumnBlock.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/HighlightColumnBlock.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = HighlightColumnBlock;
var _c;
__turbopack_context__.k.register(_c, "HighlightColumnBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/HighlightCenterLineBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HighlightCenterLineBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Highlight$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/Highlight.tsx [app-client] (ecmascript)");
'use client';
;
;
function HighlightCenterLineBlock({ highlight, lineColor = '#9F80DA', textStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full py-6 ${dark ? 'bg-gray-900' : ''}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-[10%] h-1 rounded-full mb-4",
                    style: {
                        backgroundColor: lineColor
                    }
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/HighlightCenterLineBlock.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Highlight$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    text: highlight,
                    textStyle: {
                        ...textStyle,
                        textAlign: 'center'
                    },
                    dark: dark
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/HighlightCenterLineBlock.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/blocks/HighlightCenterLineBlock.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/HighlightCenterLineBlock.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = HighlightCenterLineBlock;
var _c;
__turbopack_context__.k.register(_c, "HighlightCenterLineBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/HighlightLeftLineBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HighlightLeftLineBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Highlight$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/Highlight.tsx [app-client] (ecmascript)");
'use client';
;
;
function HighlightLeftLineBlock({ highlight, lineColor = '#9F80DA', textStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full py-6 px-4 ${dark ? 'bg-gray-900' : ''}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-start",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-[10%] h-1 rounded-full mb-4",
                    style: {
                        backgroundColor: lineColor
                    }
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/HighlightLeftLineBlock.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Highlight$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    text: highlight,
                    textStyle: {
                        ...textStyle,
                        textAlign: 'left'
                    },
                    dark: dark
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/HighlightLeftLineBlock.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/blocks/HighlightLeftLineBlock.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/HighlightLeftLineBlock.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = HighlightLeftLineBlock;
var _c;
__turbopack_context__.k.register(_c, "HighlightLeftLineBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/HighlightBackgroundBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HighlightBackgroundBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Highlight$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/Highlight.tsx [app-client] (ecmascript)");
'use client';
;
;
function HighlightBackgroundBlock({ highlight, textStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-6 rounded-lg ${dark ? 'bg-gray-800' : 'bg-gray-100'}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Highlight$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            text: highlight,
            textStyle: {
                ...textStyle,
                textAlign: 'left'
            },
            dark: dark
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/HighlightBackgroundBlock.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/HighlightBackgroundBlock.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = HighlightBackgroundBlock;
var _c;
__turbopack_context__.k.register(_c, "HighlightBackgroundBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/Image.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Image
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
'use client';
;
;
function Image({ src, alt = 'Image', className = 'object-cover rounded-lg', fill = true, width, height }) {
    // Handle missing or invalid src
    if (!src) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `bg-gray-200 flex items-center justify-center ${className}`,
            style: {
                minHeight: 200
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-gray-400",
                children: "Image not available"
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/Image.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/Image.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this);
    }
    // Use placeholder for sample images
    const imageSrc = src === '/sample.jpeg' || src.includes('sample') ? 'https://placehold.co/800x600/e2e8f0/64748b?text=Sample+Image' : src;
    if (fill) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: imageSrc,
            alt: alt,
            fill: true,
            className: className,
            unoptimized: imageSrc.startsWith('http')
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/Image.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        src: imageSrc,
        alt: alt,
        width: width || 800,
        height: height || 600,
        className: className,
        unoptimized: imageSrc.startsWith('http')
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/Image.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_c = Image;
var _c;
__turbopack_context__.k.register(_c, "Image");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ImageBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ImageBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Image$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/Image.tsx [app-client] (ecmascript)");
'use client';
;
;
function ImageBlock({ image, alt = 'Image', dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full h-64",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Image$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: image,
                alt: alt
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/ImageBlock.tsx",
                lineNumber: 20,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/ImageBlock.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/ImageBlock.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = ImageBlock;
var _c;
__turbopack_context__.k.register(_c, "ImageBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ImageWithTextBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ImageWithTextBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Image$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/Image.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Paragraph$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/Paragraph.tsx [app-client] (ecmascript)");
'use client';
;
;
;
function ImageWithTextBlock({ image, text, alt = 'Image', textStyle = {}, textBackgroundStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 flex flex-row gap-4 ${dark ? 'bg-gray-900' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-1/2 h-64",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Image$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: image,
                    alt: alt
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ImageWithTextBlock.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/ImageWithTextBlock.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `w-1/2 flex items-center p-4 rounded-lg ${dark ? 'bg-gray-800' : ''}`,
                style: {
                    backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#1f2937' : undefined),
                    padding: textBackgroundStyle.padding,
                    borderRadius: textBackgroundStyle.borderRadius
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Paragraph$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    content: text,
                    contentStyle: textStyle,
                    dark: dark
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ImageWithTextBlock.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/ImageWithTextBlock.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/ImageWithTextBlock.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c = ImageWithTextBlock;
var _c;
__turbopack_context__.k.register(_c, "ImageWithTextBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ImageWithTextLeftBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ImageWithTextLeftBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Image$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/Image.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Paragraph$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/Paragraph.tsx [app-client] (ecmascript)");
'use client';
;
;
;
function ImageWithTextLeftBlock({ image, text, alt = 'Image', textStyle = {}, textBackgroundStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 flex flex-row-reverse gap-4 ${dark ? 'bg-gray-900' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-1/2 h-64",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Image$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: image,
                    alt: alt
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ImageWithTextLeftBlock.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/ImageWithTextLeftBlock.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `w-1/2 flex items-center p-4 rounded-lg ${dark ? 'bg-gray-800' : ''}`,
                style: {
                    backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#1f2937' : undefined),
                    padding: textBackgroundStyle.padding,
                    borderRadius: textBackgroundStyle.borderRadius
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Paragraph$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    content: text,
                    contentStyle: textStyle,
                    dark: dark
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ImageWithTextLeftBlock.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/ImageWithTextLeftBlock.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/ImageWithTextLeftBlock.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c = ImageWithTextLeftBlock;
var _c;
__turbopack_context__.k.register(_c, "ImageWithTextLeftBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ImageWithTextCenterBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ImageWithTextCenterBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Image$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/Image.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Paragraph$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/Paragraph.tsx [app-client] (ecmascript)");
'use client';
;
;
;
function ImageWithTextCenterBlock({ image, text, alt = 'Image', textStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full h-64 rounded-lg overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Image$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: image,
                    alt: alt
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ImageWithTextCenterBlock.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 bg-black/40 flex items-center justify-center p-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Paragraph$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        content: text,
                        contentStyle: {
                            ...textStyle,
                            textAlign: 'center',
                            color: '#ffffff'
                        },
                        dark: false
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/ImageWithTextCenterBlock.tsx",
                        lineNumber: 28,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ImageWithTextCenterBlock.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/blocks/ImageWithTextCenterBlock.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/ImageWithTextCenterBlock.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_c = ImageWithTextCenterBlock;
var _c;
__turbopack_context__.k.register(_c, "ImageWithTextCenterBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ImageWithTextBottomBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ImageWithTextBottomBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Image$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/Image.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Paragraph$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/Paragraph.tsx [app-client] (ecmascript)");
'use client';
;
;
;
function ImageWithTextBottomBlock({ image, text, alt = 'Image', textStyle = {}, textBackgroundStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 flex flex-col gap-4 ${dark ? 'bg-gray-900' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full h-64",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Image$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: image,
                    alt: alt
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ImageWithTextBottomBlock.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/ImageWithTextBottomBlock.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `p-4 rounded-lg ${dark ? 'bg-gray-800' : ''}`,
                style: {
                    backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#1f2937' : undefined),
                    padding: textBackgroundStyle.padding,
                    borderRadius: textBackgroundStyle.borderRadius
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Paragraph$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    content: text,
                    contentStyle: textStyle,
                    dark: dark
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ImageWithTextBottomBlock.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/ImageWithTextBottomBlock.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/ImageWithTextBottomBlock.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c = ImageWithTextBottomBlock;
var _c;
__turbopack_context__.k.register(_c, "ImageWithTextBottomBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ImageWithTextTopBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ImageWithTextTopBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Image$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/Image.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Paragraph$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/Paragraph.tsx [app-client] (ecmascript)");
'use client';
;
;
;
function ImageWithTextTopBlock({ image, text, alt = 'Image', textStyle = {}, textBackgroundStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 flex flex-col-reverse gap-4 ${dark ? 'bg-gray-900' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full h-64",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Image$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: image,
                    alt: alt
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ImageWithTextTopBlock.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/ImageWithTextTopBlock.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `p-4 rounded-lg ${dark ? 'bg-gray-800' : ''}`,
                style: {
                    backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#1f2937' : undefined),
                    padding: textBackgroundStyle.padding,
                    borderRadius: textBackgroundStyle.borderRadius
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Paragraph$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    content: text,
                    contentStyle: textStyle,
                    dark: dark
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ImageWithTextTopBlock.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/ImageWithTextTopBlock.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/ImageWithTextTopBlock.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c = ImageWithTextTopBlock;
var _c;
__turbopack_context__.k.register(_c, "ImageWithTextTopBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/Quote.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Quote
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
'use client';
;
;
function Quote({ content, author, avatar, title, textStyle = {}, textBackgroundStyle = {}, backgroundImage, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-8 rounded-lg relative overflow-hidden min-h-[200px] flex items-center justify-center ${dark ? 'bg-gray-900' : ''}`,
        style: {
            backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : '#F3F4F6'),
            padding: textBackgroundStyle.padding,
            borderRadius: textBackgroundStyle.borderRadius
        },
        children: [
            backgroundImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: backgroundImage,
                        alt: "Background",
                        fill: true,
                        className: "object-cover"
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/Quote.tsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/50"
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/Quote.tsx",
                        lineNumber: 45,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/Quote.tsx",
                lineNumber: 38,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 max-w-2xl mx-auto text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-12 h-12 mx-auto mb-4 opacity-30",
                        fill: "currentColor",
                        viewBox: "0 0 24 24",
                        style: {
                            color: backgroundImage ? '#FFFFFF' : dark ? '#9F80DA' : textStyle.color || '#9F80DA'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/Quote.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/Quote.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: `text-xl font-semibold mb-3 ${dark && !backgroundImage ? 'text-white' : ''}`,
                        style: {
                            fontSize: textStyle.fontSize,
                            fontWeight: textStyle.fontWeight || '600',
                            color: backgroundImage ? '#FFFFFF' : dark ? '#ffffff' : textStyle.color,
                            fontStyle: textStyle.fontStyle
                        },
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/Quote.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: `text-lg italic mb-4 ${dark && !backgroundImage ? 'text-gray-300' : ''}`,
                        style: {
                            fontSize: textStyle.fontSize || '18px',
                            color: backgroundImage ? '#FFFFFF' : dark ? '#d1d5db' : textStyle.color,
                            lineHeight: textStyle.lineHeight || '1.6'
                        },
                        children: [
                            "“",
                            content,
                            "”"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/Quote.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    (author || avatar) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center gap-3 mt-4",
                        children: [
                            avatar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-10 h-10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: avatar,
                                    alt: author || 'Author',
                                    fill: true,
                                    className: "rounded-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/Quote.tsx",
                                    lineNumber: 88,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/Quote.tsx",
                                lineNumber: 87,
                                columnNumber: 15
                            }, this),
                            author && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `font-medium ${dark && !backgroundImage ? 'text-gray-400' : ''}`,
                                style: {
                                    color: backgroundImage ? '#FFFFFF' : dark ? '#9ca3af' : textStyle.color || '#6B7280'
                                },
                                children: [
                                    "— ",
                                    author
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/blocks/Quote.tsx",
                                lineNumber: 97,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/Quote.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/Quote.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/Quote.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = Quote;
var _c;
__turbopack_context__.k.register(_c, "Quote");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/QuoteBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuoteBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Quote$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/Quote.tsx [app-client] (ecmascript)");
'use client';
;
;
function QuoteBlock(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Quote$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/QuoteBlock.tsx",
        lineNumber: 9,
        columnNumber: 10
    }, this);
}
_c = QuoteBlock;
var _c;
__turbopack_context__.k.register(_c, "QuoteBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/QuoteCenterBorderBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuoteCenterBorderBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
'use client';
;
;
function QuoteCenterBorderBlock({ content, author, avatar, textStyle = {}, borderColor = '#E5E7EB', borderWidth = 1, borderRadius = 16, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-8 flex flex-col items-center justify-center ${dark ? 'bg-gray-900' : ''}`,
        style: {
            border: `${borderWidth}px solid ${borderColor}`,
            borderRadius: `${borderRadius}px`
        },
        children: [
            avatar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-16 h-16 mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: avatar,
                    alt: author || 'Author',
                    fill: true,
                    className: "rounded-full object-cover"
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/QuoteCenterBorderBlock.tsx",
                    lineNumber: 38,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/QuoteCenterBorderBlock.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-8 h-8 mb-4 opacity-30",
                fill: "currentColor",
                viewBox: "0 0 24 24",
                style: {
                    color: dark ? '#9F80DA' : textStyle.color || '#9F80DA'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/QuoteCenterBorderBlock.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/QuoteCenterBorderBlock.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `text-lg italic text-center mb-4 max-w-xl ${dark ? 'text-gray-300' : ''}`,
                style: {
                    fontSize: textStyle.fontSize || '18px',
                    color: dark ? '#d1d5db' : textStyle.color,
                    lineHeight: textStyle.lineHeight || '1.6'
                },
                children: [
                    "“",
                    content,
                    "”"
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/QuoteCenterBorderBlock.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            author && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `font-medium ${dark ? 'text-gray-400' : 'text-gray-600'}`,
                style: {
                    color: textStyle.color || (dark ? '#9ca3af' : '#6B7280')
                },
                children: [
                    "— ",
                    author
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/QuoteCenterBorderBlock.tsx",
                lineNumber: 68,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/QuoteCenterBorderBlock.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = QuoteCenterBorderBlock;
var _c;
__turbopack_context__.k.register(_c, "QuoteCenterBorderBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/QuoteCenterLightBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuoteCenterLightBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
'use client';
;
;
function QuoteCenterLightBlock({ content, author, avatar, textStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-8 flex flex-col items-center justify-center ${dark ? 'bg-gray-900' : ''}`,
        children: [
            avatar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-16 h-16 mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: avatar,
                    alt: author || 'Author',
                    fill: true,
                    className: "rounded-full object-cover"
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/QuoteCenterLightBlock.tsx",
                    lineNumber: 26,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/QuoteCenterLightBlock.tsx",
                lineNumber: 25,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-8 h-8 mb-4 opacity-30",
                fill: "currentColor",
                viewBox: "0 0 24 24",
                style: {
                    color: dark ? '#9F80DA' : textStyle.color || '#9F80DA'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/QuoteCenterLightBlock.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/QuoteCenterLightBlock.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `text-lg italic text-center mb-4 max-w-xl ${dark ? 'text-gray-300' : ''}`,
                style: {
                    fontSize: textStyle.fontSize || '18px',
                    color: dark ? '#d1d5db' : textStyle.color,
                    lineHeight: textStyle.lineHeight || '1.6'
                },
                children: [
                    "“",
                    content,
                    "”"
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/QuoteCenterLightBlock.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            author && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `font-medium ${dark ? 'text-gray-400' : 'text-gray-600'}`,
                style: {
                    color: textStyle.color || (dark ? '#9ca3af' : '#6B7280')
                },
                children: [
                    "— ",
                    author
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/QuoteCenterLightBlock.tsx",
                lineNumber: 56,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/QuoteCenterLightBlock.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_c = QuoteCenterLightBlock;
var _c;
__turbopack_context__.k.register(_c, "QuoteCenterLightBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/QuoteLeftLightBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuoteLeftLightBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
'use client';
;
;
function QuoteLeftLightBlock({ content, author, avatar, textStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-6 flex gap-4 ${dark ? 'bg-gray-900' : ''}`,
        children: [
            avatar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-14 h-14 flex-shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: avatar,
                    alt: author || 'Author',
                    fill: true,
                    className: "rounded-full object-cover"
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/QuoteLeftLightBlock.tsx",
                    lineNumber: 26,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/QuoteLeftLightBlock.tsx",
                lineNumber: 25,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-6 h-6 mb-2 opacity-30",
                        fill: "currentColor",
                        viewBox: "0 0 24 24",
                        style: {
                            color: dark ? '#9F80DA' : textStyle.color || '#9F80DA'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/QuoteLeftLightBlock.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/QuoteLeftLightBlock.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: `text-base italic mb-3 ${dark ? 'text-gray-300' : ''}`,
                        style: {
                            fontSize: textStyle.fontSize || '16px',
                            color: dark ? '#d1d5db' : textStyle.color,
                            lineHeight: textStyle.lineHeight || '1.6'
                        },
                        children: [
                            "“",
                            content,
                            "”"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/QuoteLeftLightBlock.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    author && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-sm font-medium ${dark ? 'text-gray-400' : 'text-gray-600'}`,
                        style: {
                            color: textStyle.color || (dark ? '#9ca3af' : '#6B7280')
                        },
                        children: [
                            "— ",
                            author
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/QuoteLeftLightBlock.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/QuoteLeftLightBlock.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/QuoteLeftLightBlock.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_c = QuoteLeftLightBlock;
var _c;
__turbopack_context__.k.register(_c, "QuoteLeftLightBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/QuoteLeftBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuoteLeftBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
'use client';
;
;
function QuoteLeftBlock({ content, author, avatar, textStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-6 flex gap-4 rounded-lg ${dark ? 'bg-gray-800' : 'bg-gray-100'}`,
        children: [
            avatar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-14 h-14 flex-shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: avatar,
                    alt: author || 'Author',
                    fill: true,
                    className: "rounded-full object-cover"
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/QuoteLeftBlock.tsx",
                    lineNumber: 28,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/QuoteLeftBlock.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-6 h-6 mb-2 opacity-30",
                        fill: "currentColor",
                        viewBox: "0 0 24 24",
                        style: {
                            color: dark ? '#9F80DA' : textStyle.color || '#9F80DA'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/QuoteLeftBlock.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/QuoteLeftBlock.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: `text-base italic mb-3 ${dark ? 'text-gray-300' : 'text-gray-700'}`,
                        style: {
                            fontSize: textStyle.fontSize || '16px',
                            color: dark ? '#d1d5db' : textStyle.color,
                            lineHeight: textStyle.lineHeight || '1.6'
                        },
                        children: [
                            "“",
                            content,
                            "”"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/QuoteLeftBlock.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    author && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-sm font-medium ${dark ? 'text-gray-400' : 'text-gray-600'}`,
                        style: {
                            color: textStyle.color || (dark ? '#9ca3af' : '#6B7280')
                        },
                        children: [
                            "— ",
                            author
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/QuoteLeftBlock.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/QuoteLeftBlock.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/QuoteLeftBlock.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_c = QuoteLeftBlock;
var _c;
__turbopack_context__.k.register(_c, "QuoteLeftBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/QuoteImageBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuoteImageBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
'use client';
;
;
function QuoteImageBlock({ content, author, avatar, backgroundImage, textStyle = {}, overlayOpacity = 0.5, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full relative overflow-hidden rounded-lg min-h-[300px] flex items-center justify-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: backgroundImage,
                        alt: "Background",
                        fill: true,
                        className: "object-cover"
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/QuoteImageBlock.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0",
                        style: {
                            backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/QuoteImageBlock.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/QuoteImageBlock.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 p-8 max-w-2xl mx-auto text-center",
                children: [
                    avatar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-16 h-16 mx-auto mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: avatar,
                            alt: author || 'Author',
                            fill: true,
                            className: "rounded-full object-cover border-2 border-white/50"
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/QuoteImageBlock.tsx",
                            lineNumber: 44,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/QuoteImageBlock.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-8 h-8 mx-auto mb-4 opacity-50",
                        fill: "currentColor",
                        viewBox: "0 0 24 24",
                        style: {
                            color: '#FFFFFF'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/QuoteImageBlock.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/QuoteImageBlock.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg italic mb-4 text-white",
                        style: {
                            fontSize: textStyle.fontSize || '20px',
                            lineHeight: textStyle.lineHeight || '1.6'
                        },
                        children: [
                            "“",
                            content,
                            "”"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/QuoteImageBlock.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    author && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-medium text-white/80",
                        children: [
                            "— ",
                            author
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/QuoteImageBlock.tsx",
                        lineNumber: 73,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/QuoteImageBlock.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/QuoteImageBlock.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c = QuoteImageBlock;
var _c;
__turbopack_context__.k.register(_c, "QuoteImageBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ComparisonBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ComparisonBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function ComparisonBlock({ items, textStyle = {}, textBackgroundStyle = {}, blockStyle = 'A', dark = false }) {
    const styleClasses = dark ? ({
        A: {
            container: 'bg-gray-800 border border-gray-700',
            header: 'bg-primary text-white',
            content: 'bg-gray-800'
        },
        B: {
            container: 'bg-gradient-to-b from-blue-900/50 to-gray-800 border border-blue-700',
            header: 'bg-blue-600 text-white',
            content: 'bg-transparent'
        },
        C: {
            container: 'bg-gray-800 border-2 border-gray-600',
            header: 'bg-gray-700 text-white',
            content: 'bg-gray-800'
        }
    })[blockStyle] : ({
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
    })[blockStyle];
    const getGridCols = ()=>{
        const count = items.length;
        if (count === 1) return 'grid-cols-1';
        if (count === 2) return 'grid-cols-1 sm:grid-cols-2';
        if (count === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`,
        style: {
            backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : undefined),
            padding: textBackgroundStyle.padding,
            borderRadius: textBackgroundStyle.borderRadius
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `grid gap-4 ${getGridCols()}`,
            children: items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${styleClasses.container} rounded-lg overflow-hidden shadow-sm`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${styleClasses.header} p-4`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold text-center",
                                style: {
                                    fontSize: textStyle.fontSize,
                                    fontWeight: textStyle.fontWeight || '600',
                                    fontStyle: textStyle.fontStyle
                                },
                                children: item.title
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/ComparisonBlock.tsx",
                                lineNumber: 84,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/ComparisonBlock.tsx",
                            lineNumber: 83,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${styleClasses.content} p-4`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `text-center ${dark ? 'text-gray-300' : ''}`,
                                style: {
                                    fontSize: textStyle.fontSize,
                                    color: textStyle.color || (dark ? '#d1d5db' : undefined),
                                    lineHeight: textStyle.lineHeight
                                },
                                children: item.content
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/ComparisonBlock.tsx",
                                lineNumber: 96,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/ComparisonBlock.tsx",
                            lineNumber: 95,
                            columnNumber: 13
                        }, this)
                    ]
                }, index, true, {
                    fileName: "[project]/app/components/blocks/ComparisonBlock.tsx",
                    lineNumber: 79,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/ComparisonBlock.tsx",
            lineNumber: 77,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/ComparisonBlock.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_c = ComparisonBlock;
var _c;
__turbopack_context__.k.register(_c, "ComparisonBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ComparisonProsConsBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ComparisonProsConsBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/thumbs-up.js [app-client] (ecmascript) <export default as ThumbsUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/thumbs-down.js [app-client] (ecmascript) <export default as ThumbsDown>");
'use client';
;
;
function ComparisonProsConsBlock({ pros, cons, textStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-6 rounded-lg border ${dark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: `text-lg font-semibold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`,
                children: "Pros and Cons"
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/ComparisonProsConsBlock.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `p-4 rounded-lg ${dark ? 'bg-green-900/30' : 'bg-green-50'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 rounded-full bg-green-500 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsUp$3e$__["ThumbsUp"], {
                                            className: "w-4 h-4 text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/ComparisonProsConsBlock.tsx",
                                            lineNumber: 30,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/ComparisonProsConsBlock.tsx",
                                        lineNumber: 29,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `font-semibold ${dark ? 'text-green-400' : 'text-green-700'}`,
                                        children: "Pros"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/ComparisonProsConsBlock.tsx",
                                        lineNumber: 32,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/blocks/ComparisonProsConsBlock.tsx",
                                lineNumber: 28,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-2",
                                children: pros.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: `text-sm flex items-start gap-2 ${dark ? 'text-gray-300' : 'text-gray-600'}`,
                                        style: {
                                            color: textStyle.color || (dark ? '#d1d5db' : undefined),
                                            lineHeight: textStyle.lineHeight || '1.5'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-green-500 mt-0.5",
                                                children: "•"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/blocks/ComparisonProsConsBlock.tsx",
                                                lineNumber: 46,
                                                columnNumber: 17
                                            }, this),
                                            item
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/app/components/blocks/ComparisonProsConsBlock.tsx",
                                        lineNumber: 38,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/ComparisonProsConsBlock.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/ComparisonProsConsBlock.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `p-4 rounded-lg ${dark ? 'bg-red-900/30' : 'bg-red-50'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 rounded-full bg-red-500 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsDown$3e$__["ThumbsDown"], {
                                            className: "w-4 h-4 text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/ComparisonProsConsBlock.tsx",
                                            lineNumber: 57,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/ComparisonProsConsBlock.tsx",
                                        lineNumber: 56,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `font-semibold ${dark ? 'text-red-400' : 'text-red-700'}`,
                                        children: "Cons"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/ComparisonProsConsBlock.tsx",
                                        lineNumber: 59,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/blocks/ComparisonProsConsBlock.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-2",
                                children: cons.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: `text-sm flex items-start gap-2 ${dark ? 'text-gray-300' : 'text-gray-600'}`,
                                        style: {
                                            color: textStyle.color || (dark ? '#d1d5db' : undefined),
                                            lineHeight: textStyle.lineHeight || '1.5'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-500 mt-0.5",
                                                children: "•"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/blocks/ComparisonProsConsBlock.tsx",
                                                lineNumber: 73,
                                                columnNumber: 17
                                            }, this),
                                            item
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/app/components/blocks/ComparisonProsConsBlock.tsx",
                                        lineNumber: 65,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/ComparisonProsConsBlock.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/ComparisonProsConsBlock.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/ComparisonProsConsBlock.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/ComparisonProsConsBlock.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = ComparisonProsConsBlock;
var _c;
__turbopack_context__.k.register(_c, "ComparisonProsConsBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ComparisonCauseEffectBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ComparisonCauseEffectBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
'use client';
;
;
function ComparisonCauseEffectBlock({ cause, effect, textStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-6 rounded-lg border ${dark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: `text-lg font-semibold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`,
                children: "Cause and Effect"
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/ComparisonCauseEffectBlock.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex-1 p-4 rounded-lg ${dark ? 'bg-gray-800' : 'bg-gray-100'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: `text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`,
                            style: {
                                color: textStyle.color || (dark ? '#d1d5db' : undefined),
                                lineHeight: textStyle.lineHeight || '1.5'
                            },
                            children: cause
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/ComparisonCauseEffectBlock.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/ComparisonCauseEffectBlock.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                className: "w-5 h-5 text-white"
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/ComparisonCauseEffectBlock.tsx",
                                lineNumber: 42,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/ComparisonCauseEffectBlock.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/ComparisonCauseEffectBlock.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 p-4 rounded-lg bg-orange-500 text-white",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm",
                            style: {
                                lineHeight: textStyle.lineHeight || '1.5'
                            },
                            children: effect
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/ComparisonCauseEffectBlock.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/ComparisonCauseEffectBlock.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/ComparisonCauseEffectBlock.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/ComparisonCauseEffectBlock.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = ComparisonCauseEffectBlock;
var _c;
__turbopack_context__.k.register(_c, "ComparisonCauseEffectBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ComparisonDosDontsBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ComparisonDosDontsBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
'use client';
;
;
function ComparisonDosDontsBlock({ dos = [], donts = [], textStyle = {}, dark = false }) {
    // Handle empty data
    if ((!dos || dos.length === 0) && (!donts || donts.length === 0)) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-full p-4 rounded-lg ${dark ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-500'}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "No comparison data available"
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/ComparisonDosDontsBlock.tsx",
                lineNumber: 24,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/ComparisonDosDontsBlock.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, this);
    }
    const safeDs = dos || [];
    const safeDonts = donts || [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-6 rounded-lg border ${dark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: `text-lg font-semibold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`,
                children: "Do's and Don'ts"
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/ComparisonDosDontsBlock.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `p-4 rounded-lg border-2 ${dark ? 'bg-gray-800 border-green-600' : 'bg-white border-green-500'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-6 h-6 rounded bg-green-500 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            className: "w-4 h-4 text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/ComparisonDosDontsBlock.tsx",
                                            lineNumber: 42,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/ComparisonDosDontsBlock.tsx",
                                        lineNumber: 41,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `font-semibold ${dark ? 'text-green-400' : 'text-green-700'}`,
                                        children: "Do's"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/ComparisonDosDontsBlock.tsx",
                                        lineNumber: 44,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/blocks/ComparisonDosDontsBlock.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-3",
                                children: safeDs.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: `text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`,
                                        style: {
                                            color: textStyle.color || (dark ? '#d1d5db' : undefined),
                                            lineHeight: textStyle.lineHeight || '1.5'
                                        },
                                        children: item
                                    }, index, false, {
                                        fileName: "[project]/app/components/blocks/ComparisonDosDontsBlock.tsx",
                                        lineNumber: 50,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/ComparisonDosDontsBlock.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/ComparisonDosDontsBlock.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `p-4 rounded-lg border-2 ${dark ? 'bg-gray-800 border-red-600' : 'bg-white border-red-500'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-6 h-6 rounded bg-red-500 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-4 h-4 text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/ComparisonDosDontsBlock.tsx",
                                            lineNumber: 68,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/ComparisonDosDontsBlock.tsx",
                                        lineNumber: 67,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `font-semibold ${dark ? 'text-red-400' : 'text-red-700'}`,
                                        children: "Don'ts"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/ComparisonDosDontsBlock.tsx",
                                        lineNumber: 70,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/blocks/ComparisonDosDontsBlock.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-3",
                                children: safeDonts.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: `text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`,
                                        style: {
                                            color: textStyle.color || (dark ? '#d1d5db' : undefined),
                                            lineHeight: textStyle.lineHeight || '1.5'
                                        },
                                        children: item
                                    }, index, false, {
                                        fileName: "[project]/app/components/blocks/ComparisonDosDontsBlock.tsx",
                                        lineNumber: 76,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/ComparisonDosDontsBlock.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/ComparisonDosDontsBlock.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/ComparisonDosDontsBlock.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/ComparisonDosDontsBlock.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c = ComparisonDosDontsBlock;
var _c;
__turbopack_context__.k.register(_c, "ComparisonDosDontsBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ComparisonMythFactBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ComparisonMythFactBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function ComparisonMythFactBlock({ myth, fact, textStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-6 rounded-lg border ${dark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: `text-lg font-semibold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`,
                children: "Myth vs. Fact"
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/ComparisonMythFactBlock.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gray-900 text-white text-center py-2 px-4 rounded-lg font-semibold mb-3",
                                children: "Myth"
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/ComparisonMythFactBlock.tsx",
                                lineNumber: 27,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `p-4 rounded-lg ${dark ? 'bg-gray-800' : 'bg-rose-50'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: `text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`,
                                    style: {
                                        color: textStyle.color || (dark ? '#d1d5db' : undefined),
                                        lineHeight: textStyle.lineHeight || '1.5'
                                    },
                                    children: myth
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/ComparisonMythFactBlock.tsx",
                                    lineNumber: 31,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/ComparisonMythFactBlock.tsx",
                                lineNumber: 30,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/ComparisonMythFactBlock.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-orange-500 text-white text-center py-2 px-4 rounded-lg font-semibold mb-3",
                                children: "Fact"
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/ComparisonMythFactBlock.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `p-4 rounded-lg ${dark ? 'bg-gray-800' : 'bg-orange-50'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: `text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`,
                                    style: {
                                        color: textStyle.color || (dark ? '#d1d5db' : undefined),
                                        lineHeight: textStyle.lineHeight || '1.5'
                                    },
                                    children: fact
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/ComparisonMythFactBlock.tsx",
                                    lineNumber: 49,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/ComparisonMythFactBlock.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/ComparisonMythFactBlock.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/ComparisonMythFactBlock.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/ComparisonMythFactBlock.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = ComparisonMythFactBlock;
var _c;
__turbopack_context__.k.register(_c, "ComparisonMythFactBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ComparisonBeforeAfterBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ComparisonBeforeAfterBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function ComparisonBeforeAfterBlock({ beforeItems, afterItems, textStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-6 rounded-lg border ${dark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: `text-lg font-semibold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`,
                children: "Before and After"
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/ComparisonBeforeAfterBlock.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-4 rounded-lg overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-hidden rounded-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-orange-500 text-white text-center py-2 font-semibold",
                                children: "Before"
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/ComparisonBeforeAfterBlock.tsx",
                                lineNumber: 27,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `p-4 ${dark ? 'bg-gray-800' : 'bg-gray-50'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-3",
                                    children: beforeItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: `text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`,
                                            style: {
                                                color: textStyle.color || (dark ? '#d1d5db' : undefined),
                                                lineHeight: textStyle.lineHeight || '1.5'
                                            },
                                            children: item
                                        }, index, false, {
                                            fileName: "[project]/app/components/blocks/ComparisonBeforeAfterBlock.tsx",
                                            lineNumber: 33,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/ComparisonBeforeAfterBlock.tsx",
                                    lineNumber: 31,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/ComparisonBeforeAfterBlock.tsx",
                                lineNumber: 30,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/ComparisonBeforeAfterBlock.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-hidden rounded-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-orange-500 text-white text-center py-2 font-semibold",
                                children: "After"
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/ComparisonBeforeAfterBlock.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `p-4 ${dark ? 'bg-gray-800' : 'bg-gray-50'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-3",
                                    children: afterItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: `text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`,
                                            style: {
                                                color: textStyle.color || (dark ? '#d1d5db' : undefined),
                                                lineHeight: textStyle.lineHeight || '1.5'
                                            },
                                            children: item
                                        }, index, false, {
                                            fileName: "[project]/app/components/blocks/ComparisonBeforeAfterBlock.tsx",
                                            lineNumber: 56,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/ComparisonBeforeAfterBlock.tsx",
                                    lineNumber: 54,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/ComparisonBeforeAfterBlock.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/ComparisonBeforeAfterBlock.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/ComparisonBeforeAfterBlock.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/ComparisonBeforeAfterBlock.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = ComparisonBeforeAfterBlock;
var _c;
__turbopack_context__.k.register(_c, "ComparisonBeforeAfterBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/Chat.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Chat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
'use client';
;
;
function Chat({ messages, sender, receiver, senderBubbleColor = '#9F80DA', receiverBubbleColor = '#E5E7EB', senderTextColor = '#FFFFFF', receiverTextColor = '#1F2937', showAvatars = true, showNames = true, showTime = true, textStyle = {}, dark = false }) {
    const getParticipant = (id)=>{
        return id === 'sender' ? sender : receiver;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4 max-w-2xl mx-auto",
        children: messages.map((message, index)=>{
            const participant = getParticipant(message.participantId);
            const isSender = message.participantId === 'sender';
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex items-end gap-2 ${isSender ? 'flex-row-reverse' : 'flex-row'}`,
                children: [
                    showAvatars && participant.avatar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-8 h-8 flex-shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: participant.avatar,
                            alt: participant.name,
                            fill: true,
                            className: "rounded-full object-cover"
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/Chat.tsx",
                            lineNumber: 64,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/Chat.tsx",
                        lineNumber: 63,
                        columnNumber: 15
                    }, this),
                    showAvatars && !participant.avatar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${dark ? 'bg-gray-700' : 'bg-gray-300'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `text-xs font-semibold ${dark ? 'text-gray-300' : 'text-gray-600'}`,
                            children: participant.name.charAt(0).toUpperCase()
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/Chat.tsx",
                            lineNumber: 74,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/Chat.tsx",
                        lineNumber: 73,
                        columnNumber: 15
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex flex-col ${isSender ? 'items-end' : 'items-start'}`,
                        children: [
                            showNames && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-xs mb-1 px-2 ${dark ? 'text-gray-400' : 'text-gray-500'}`,
                                children: participant.name
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/Chat.tsx",
                                lineNumber: 82,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `max-w-xs px-4 py-2 rounded-2xl ${isSender ? 'rounded-br-sm' : 'rounded-bl-sm'}`,
                                style: {
                                    backgroundColor: isSender ? senderBubbleColor : receiverBubbleColor,
                                    color: isSender ? senderTextColor : receiverTextColor
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: textStyle.fontSize || '14px',
                                        fontWeight: textStyle.fontWeight,
                                        fontStyle: textStyle.fontStyle,
                                        lineHeight: textStyle.lineHeight || '1.4'
                                    },
                                    children: message.text
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/Chat.tsx",
                                    lineNumber: 95,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/Chat.tsx",
                                lineNumber: 86,
                                columnNumber: 15
                            }, this),
                            showTime && message.time && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-xs mt-1 px-2 ${dark ? 'text-gray-500' : 'text-gray-400'}`,
                                children: message.time
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/Chat.tsx",
                                lineNumber: 107,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/Chat.tsx",
                        lineNumber: 80,
                        columnNumber: 13
                    }, this)
                ]
            }, index, true, {
                fileName: "[project]/app/components/blocks/Chat.tsx",
                lineNumber: 58,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/Chat.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_c = Chat;
var _c;
__turbopack_context__.k.register(_c, "Chat");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ChatFeedbackBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatFeedbackBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Chat$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/Chat.tsx [app-client] (ecmascript)");
'use client';
;
;
function ChatFeedbackBlock({ messages, sender, receiver, senderBubbleColor = '#9F80DA', receiverBubbleColor, textStyle = {}, textBackgroundStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`,
        style: {
            backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : '#F9FAFB'),
            padding: textBackgroundStyle.padding,
            borderRadius: textBackgroundStyle.borderRadius
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Chat$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            messages: messages,
            sender: sender,
            receiver: receiver,
            senderBubbleColor: senderBubbleColor,
            receiverBubbleColor: receiverBubbleColor || (dark ? '#374151' : '#E5E7EB'),
            showAvatars: true,
            showNames: true,
            showTime: true,
            textStyle: textStyle,
            dark: dark
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/ChatFeedbackBlock.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/ChatFeedbackBlock.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = ChatFeedbackBlock;
var _c;
__turbopack_context__.k.register(_c, "ChatFeedbackBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ChatBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatFeedbackBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ChatFeedbackBlock.tsx [app-client] (ecmascript)");
'use client';
;
;
function ChatBlock(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatFeedbackBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/ChatBlock.tsx",
        lineNumber: 9,
        columnNumber: 10
    }, this);
}
_c = ChatBlock;
var _c;
__turbopack_context__.k.register(_c, "ChatBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ChatQABlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatQABlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Chat$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/Chat.tsx [app-client] (ecmascript)");
'use client';
;
;
function ChatQABlock({ messages, sender, receiver, senderBubbleColor = '#9F80DA', receiverBubbleColor, textStyle = {}, textBackgroundStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`,
        style: {
            backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : '#F9FAFB'),
            padding: textBackgroundStyle.padding,
            borderRadius: textBackgroundStyle.borderRadius
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Chat$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            messages: messages,
            sender: sender,
            receiver: receiver,
            senderBubbleColor: senderBubbleColor,
            receiverBubbleColor: receiverBubbleColor || (dark ? '#374151' : '#E5E7EB'),
            showAvatars: false,
            showNames: true,
            showTime: false,
            textStyle: textStyle,
            dark: dark
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/ChatQABlock.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/ChatQABlock.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = ChatQABlock;
var _c;
__turbopack_context__.k.register(_c, "ChatQABlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ChatQuestionWallBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatQuestionWallBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function ChatQuestionWallBlock({ items, questionBubbleColor = '#E5E7EB', answerBubbleColor = '#9F80DA', textStyle = {}, textBackgroundStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`,
        style: {
            backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : '#F9FAFB'),
            padding: textBackgroundStyle.padding,
            borderRadius: textBackgroundStyle.borderRadius
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: `text-sm font-semibold mb-2 ${dark ? 'text-gray-400' : 'text-gray-500'}`,
                            children: "Questions"
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/ChatQuestionWallBlock.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this),
                        items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-3 rounded-2xl rounded-bl-sm",
                                style: {
                                    backgroundColor: dark ? '#374151' : questionBubbleColor
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: dark ? 'text-gray-200' : 'text-gray-800',
                                    style: {
                                        fontSize: textStyle.fontSize || '14px',
                                        lineHeight: textStyle.lineHeight || '1.4'
                                    },
                                    children: item.question
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/ChatQuestionWallBlock.tsx",
                                    lineNumber: 51,
                                    columnNumber: 15
                                }, this)
                            }, `q-${index}`, false, {
                                fileName: "[project]/app/components/blocks/ChatQuestionWallBlock.tsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/blocks/ChatQuestionWallBlock.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: `text-sm font-semibold mb-2 ${dark ? 'text-gray-400' : 'text-gray-500'}`,
                            children: "Answers"
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/ChatQuestionWallBlock.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this),
                        items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-3 rounded-2xl rounded-br-sm",
                                style: {
                                    backgroundColor: answerBubbleColor
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white",
                                    style: {
                                        fontSize: textStyle.fontSize || '14px',
                                        lineHeight: textStyle.lineHeight || '1.4'
                                    },
                                    children: item.answer
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/ChatQuestionWallBlock.tsx",
                                    lineNumber: 77,
                                    columnNumber: 15
                                }, this)
                            }, `a-${index}`, false, {
                                fileName: "[project]/app/components/blocks/ChatQuestionWallBlock.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/blocks/ChatQuestionWallBlock.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/blocks/ChatQuestionWallBlock.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/ChatQuestionWallBlock.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = ChatQuestionWallBlock;
var _c;
__turbopack_context__.k.register(_c, "ChatQuestionWallBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ChatDialogBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatDialogBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function ChatDialogBlock({ messages, leftBubbleColor = '#E5E7EB', rightBubbleColor = '#9F80DA', textStyle = {}, textBackgroundStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`,
        style: {
            backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : '#F9FAFB'),
            padding: textBackgroundStyle.padding,
            borderRadius: textBackgroundStyle.borderRadius
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-3 max-w-xl mx-auto",
            children: messages.map((message, index)=>{
                const isLeft = message.isLeft ?? index % 2 === 0;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex ${isLeft ? 'justify-start' : 'justify-end'}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `max-w-xs px-4 py-2 rounded-2xl ${isLeft ? 'rounded-bl-sm' : 'rounded-br-sm'}`,
                        style: {
                            backgroundColor: isLeft ? dark ? '#374151' : leftBubbleColor : rightBubbleColor,
                            color: isLeft ? dark ? '#e5e7eb' : '#1F2937' : '#FFFFFF'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: textStyle.fontSize || '14px',
                                lineHeight: textStyle.lineHeight || '1.4'
                            },
                            children: message.text
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/ChatDialogBlock.tsx",
                            lineNumber: 58,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/ChatDialogBlock.tsx",
                        lineNumber: 45,
                        columnNumber: 15
                    }, this)
                }, index, false, {
                    fileName: "[project]/app/components/blocks/ChatDialogBlock.tsx",
                    lineNumber: 41,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/ChatDialogBlock.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/ChatDialogBlock.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = ChatDialogBlock;
var _c;
__turbopack_context__.k.register(_c, "ChatDialogBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/TableBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TableBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function TableBlock({ rows, columns, content, textStyle = {}, headerRow = true, dark = false }) {
    const headers = headerRow && content.length > 0 ? content[0]?.slice(0, columns) : [];
    const dataRows = content.slice(headerRow ? 1 : 0, rows);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden md:block overflow-x-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: `w-full border-collapse ${dark ? 'border-gray-700' : 'border border-gray-300'}`,
                    style: {
                        fontSize: textStyle.fontSize,
                        fontWeight: textStyle.fontWeight,
                        color: textStyle.color || (dark ? '#d1d5db' : undefined),
                        fontStyle: textStyle.fontStyle,
                        textAlign: textStyle.textAlign,
                        lineHeight: textStyle.lineHeight
                    },
                    children: [
                        headerRow && content.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: dark ? 'bg-gray-800' : 'bg-gray-100',
                                children: headers.map((cell, cellIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: `border px-4 py-2 font-semibold text-left ${dark ? 'border-gray-700 text-white' : 'border-gray-300'}`,
                                        children: cell
                                    }, cellIndex, false, {
                                        fileName: "[project]/app/components/blocks/TableBlock.tsx",
                                        lineNumber: 45,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/TableBlock.tsx",
                                lineNumber: 43,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/TableBlock.tsx",
                            lineNumber: 42,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: dataRows.map((row, rowIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: dark ? 'hover:bg-gray-800' : 'hover:bg-gray-50',
                                    children: row.slice(0, columns).map((cell, cellIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: `border px-4 py-2 ${dark ? 'border-gray-700 text-gray-300' : 'border-gray-300'}`,
                                            children: cell
                                        }, cellIndex, false, {
                                            fileName: "[project]/app/components/blocks/TableBlock.tsx",
                                            lineNumber: 59,
                                            columnNumber: 19
                                        }, this))
                                }, rowIndex, false, {
                                    fileName: "[project]/app/components/blocks/TableBlock.tsx",
                                    lineNumber: 57,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/TableBlock.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/blocks/TableBlock.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/TableBlock.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden space-y-4",
                children: dataRows.map((row, rowIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `border rounded-lg overflow-hidden ${dark ? 'border-gray-700' : 'border-gray-300'}`,
                        style: {
                            fontSize: textStyle.fontSize,
                            color: textStyle.color || (dark ? '#d1d5db' : undefined),
                            lineHeight: textStyle.lineHeight
                        },
                        children: row.slice(0, columns).map((cell, cellIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `px-4 py-3 ${dark ? cellIndex % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900' : cellIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`,
                                children: [
                                    headerRow && headers[cellIndex] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `font-semibold text-sm block mb-1 ${dark ? 'text-gray-400' : 'text-gray-600'}`,
                                        children: headers[cellIndex]
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/TableBlock.tsx",
                                        lineNumber: 90,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: dark ? 'text-gray-300' : '',
                                        children: cell
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/TableBlock.tsx",
                                        lineNumber: 94,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, cellIndex, true, {
                                fileName: "[project]/app/components/blocks/TableBlock.tsx",
                                lineNumber: 85,
                                columnNumber: 15
                            }, this))
                    }, rowIndex, false, {
                        fileName: "[project]/app/components/blocks/TableBlock.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/TableBlock.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/TableBlock.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c = TableBlock;
var _c;
__turbopack_context__.k.register(_c, "TableBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ListBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ListBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
'use client';
;
;
function ListBlock({ items, textStyle = {}, ordered = false, listStyle = 'default', accentColor = '#9F80DA', dark = false }) {
    const getIcon = (index)=>{
        switch(listStyle){
            case 'check':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                    className: "w-5 h-5",
                    style: {
                        color: accentColor
                    }
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ListBlock.tsx",
                    lineNumber: 29,
                    columnNumber: 16
                }, this);
            case 'circle':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                    className: "w-3 h-3 fill-current",
                    style: {
                        color: accentColor
                    }
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ListBlock.tsx",
                    lineNumber: 31,
                    columnNumber: 16
                }, this);
            case 'arrow':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                    className: "w-4 h-4",
                    style: {
                        color: accentColor
                    }
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ListBlock.tsx",
                    lineNumber: 33,
                    columnNumber: 16
                }, this);
            case 'chevron':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                    className: "w-5 h-5",
                    style: {
                        color: accentColor
                    }
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ListBlock.tsx",
                    lineNumber: 35,
                    columnNumber: 16
                }, this);
            case 'star':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                    className: "w-4 h-4 fill-current",
                    style: {
                        color: accentColor
                    }
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ListBlock.tsx",
                    lineNumber: 37,
                    columnNumber: 16
                }, this);
            case 'numbered':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-semibold",
                    style: {
                        backgroundColor: accentColor
                    },
                    children: index + 1
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ListBlock.tsx",
                    lineNumber: 40,
                    columnNumber: 11
                }, this);
            default:
                return null;
        }
    };
    if (listStyle === 'gradient') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "space-y-2",
                children: items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "p-3 rounded-lg transition-all hover:translate-x-1",
                        style: {
                            background: dark ? `linear-gradient(90deg, ${accentColor}20 0%, transparent 100%)` : `linear-gradient(90deg, ${accentColor}15 0%, transparent 100%)`,
                            borderLeft: `3px solid ${accentColor}`
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: textStyle.fontSize,
                                fontWeight: textStyle.fontWeight,
                                color: textStyle.color || (dark ? '#d1d5db' : undefined),
                                lineHeight: textStyle.lineHeight
                            },
                            children: item
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/ListBlock.tsx",
                            lineNumber: 67,
                            columnNumber: 15
                        }, this)
                    }, index, false, {
                        fileName: "[project]/app/components/blocks/ListBlock.tsx",
                        lineNumber: 57,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/ListBlock.tsx",
                lineNumber: 55,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/ListBlock.tsx",
            lineNumber: 54,
            columnNumber: 7
        }, this);
    }
    if (listStyle === 'bordered') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "space-y-2",
                children: items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: `p-4 rounded-lg border-2 transition-all hover:border-opacity-100 ${dark ? 'bg-gray-800 border-gray-700 hover:border-primary' : 'bg-white border-gray-200 hover:border-primary'}`,
                        style: {
                            borderColor: dark ? undefined : `${accentColor}40`
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-2 h-2 rounded-full",
                                    style: {
                                        backgroundColor: accentColor
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/ListBlock.tsx",
                                    lineNumber: 97,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: textStyle.fontSize,
                                        fontWeight: textStyle.fontWeight,
                                        color: textStyle.color || (dark ? '#d1d5db' : undefined),
                                        lineHeight: textStyle.lineHeight
                                    },
                                    children: item
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/ListBlock.tsx",
                                    lineNumber: 101,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/blocks/ListBlock.tsx",
                            lineNumber: 96,
                            columnNumber: 15
                        }, this)
                    }, index, false, {
                        fileName: "[project]/app/components/blocks/ListBlock.tsx",
                        lineNumber: 89,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/ListBlock.tsx",
                lineNumber: 87,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/ListBlock.tsx",
            lineNumber: 86,
            columnNumber: 7
        }, this);
    }
    if (listStyle === 'cards') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-3",
                children: items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `p-4 rounded-lg shadow-sm transition-all hover:shadow-md ${dark ? 'bg-gray-800' : 'bg-white'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                                    style: {
                                        backgroundColor: `${accentColor}20`
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-sm",
                                        style: {
                                            color: accentColor
                                        },
                                        children: index + 1
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/ListBlock.tsx",
                                        lineNumber: 135,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/ListBlock.tsx",
                                    lineNumber: 131,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`,
                                    style: {
                                        fontSize: textStyle.fontSize,
                                        fontWeight: textStyle.fontWeight,
                                        color: textStyle.color || (dark ? '#d1d5db' : undefined),
                                        lineHeight: textStyle.lineHeight || '1.5'
                                    },
                                    children: item
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/ListBlock.tsx",
                                    lineNumber: 139,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/blocks/ListBlock.tsx",
                            lineNumber: 130,
                            columnNumber: 15
                        }, this)
                    }, index, false, {
                        fileName: "[project]/app/components/blocks/ListBlock.tsx",
                        lineNumber: 124,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/ListBlock.tsx",
                lineNumber: 122,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/ListBlock.tsx",
            lineNumber: 121,
            columnNumber: 7
        }, this);
    }
    // Default styles with icons
    if (listStyle !== 'default' && !ordered) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "space-y-3",
                children: items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-shrink-0",
                                children: getIcon(index)
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/ListBlock.tsx",
                                lineNumber: 168,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: textStyle.fontSize,
                                    fontWeight: textStyle.fontWeight,
                                    color: textStyle.color || (dark ? '#d1d5db' : undefined),
                                    lineHeight: textStyle.lineHeight
                                },
                                children: item
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/ListBlock.tsx",
                                lineNumber: 171,
                                columnNumber: 15
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/app/components/blocks/ListBlock.tsx",
                        lineNumber: 164,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/ListBlock.tsx",
                lineNumber: 162,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/ListBlock.tsx",
            lineNumber: 161,
            columnNumber: 7
        }, this);
    }
    // Standard ordered/unordered list
    const ListTag = ordered ? 'ol' : 'ul';
    const listClass = ordered ? 'list-decimal' : 'list-disc';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ListTag, {
            className: `${listClass} pl-6 space-y-2 ${dark ? 'text-gray-300' : ''}`,
            style: {
                fontSize: textStyle.fontSize,
                fontWeight: textStyle.fontWeight,
                color: textStyle.color || (dark ? '#d1d5db' : undefined),
                fontStyle: textStyle.fontStyle,
                textAlign: textStyle.textAlign,
                lineHeight: textStyle.lineHeight
            },
            children: items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    className: "text-base",
                    children: item
                }, index, false, {
                    fileName: "[project]/app/components/blocks/ListBlock.tsx",
                    lineNumber: 206,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/ListBlock.tsx",
            lineNumber: 194,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/ListBlock.tsx",
        lineNumber: 193,
        columnNumber: 5
    }, this);
}
_c = ListBlock;
var _c;
__turbopack_context__.k.register(_c, "ListBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/GalleryBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GalleryBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
'use client';
;
;
function GalleryBlock({ images, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-row gap-4 overflow-x-auto",
            style: {
                gridTemplateColumns: `repeat(${images.length}, minmax(200px, 1fr))`
            },
            children: images.map((image, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-shrink-0 relative h-48 min-w-[200px] flex-1",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: image.src,
                        alt: image.alt || `Gallery image ${index + 1}`,
                        fill: true,
                        className: "object-cover rounded-lg"
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/GalleryBlock.tsx",
                        lineNumber: 30,
                        columnNumber: 13
                    }, this)
                }, index, false, {
                    fileName: "[project]/app/components/blocks/GalleryBlock.tsx",
                    lineNumber: 26,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/GalleryBlock.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/GalleryBlock.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = GalleryBlock;
var _c;
__turbopack_context__.k.register(_c, "GalleryBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/GraphBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GraphBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/PieChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Pie.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
'use client';
;
;
const COLORS = [
    '#9F80DA',
    '#8A6BC5',
    '#B8A0E8',
    '#6B4FA0',
    '#D4C4F0',
    '#4A3570'
];
function GraphBlock({ graphType, data, textStyle = {}, textBackgroundStyle = {}, title, colors = COLORS, dark = false }) {
    const renderChart = ()=>{
        switch(graphType){
            case 'line':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: 300,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                        data: data,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                strokeDasharray: "3 3"
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                                lineNumber: 56,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                dataKey: "name"
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                                lineNumber: 57,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {}, void 0, false, {
                                fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                                lineNumber: 58,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                                lineNumber: 59,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {}, void 0, false, {
                                fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                                lineNumber: 60,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                type: "monotone",
                                dataKey: "value",
                                stroke: colors[0],
                                strokeWidth: 2
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                                lineNumber: 61,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                        lineNumber: 55,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                    lineNumber: 54,
                    columnNumber: 11
                }, this);
            case 'bar':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: 300,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                        data: data,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                strokeDasharray: "3 3"
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                                lineNumber: 69,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                dataKey: "name"
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                                lineNumber: 70,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {}, void 0, false, {
                                fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                                lineNumber: 71,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                                lineNumber: 72,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {}, void 0, false, {
                                fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                                lineNumber: 73,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                dataKey: "value",
                                fill: colors[0],
                                children: data.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                        fill: colors[index % colors.length]
                                    }, `cell-${index}`, false, {
                                        fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                                        lineNumber: 76,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                                lineNumber: 74,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                        lineNumber: 68,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                    lineNumber: 67,
                    columnNumber: 11
                }, this);
            case 'pie':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: 300,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieChart"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pie"], {
                                data: data,
                                cx: "50%",
                                cy: "50%",
                                labelLine: false,
                                label: ({ name, percent })=>`${name} ${((percent ?? 0) * 100).toFixed(0)}%`,
                                outerRadius: 100,
                                fill: "#8884d8",
                                dataKey: "value",
                                children: data.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                        fill: colors[index % colors.length]
                                    }, `cell-${index}`, false, {
                                        fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                                        lineNumber: 97,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                                lineNumber: 86,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                                lineNumber: 100,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {}, void 0, false, {
                                fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                                lineNumber: 101,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                        lineNumber: 85,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                    lineNumber: 84,
                    columnNumber: 11
                }, this);
            case 'donut':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    width: "100%",
                    height: 300,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieChart"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pie"], {
                                data: data,
                                cx: "50%",
                                cy: "50%",
                                labelLine: false,
                                label: ({ name, percent })=>`${name} ${((percent ?? 0) * 100).toFixed(0)}%`,
                                innerRadius: 60,
                                outerRadius: 100,
                                fill: "#8884d8",
                                dataKey: "value",
                                children: data.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                        fill: colors[index % colors.length]
                                    }, `cell-${index}`, false, {
                                        fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                                        lineNumber: 121,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                                lineNumber: 109,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                                lineNumber: 124,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {}, void 0, false, {
                                fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                                lineNumber: 125,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                        lineNumber: 108,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                    lineNumber: 107,
                    columnNumber: 11
                }, this);
            default:
                return null;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`,
        style: {
            backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : undefined),
            padding: textBackgroundStyle.padding,
            borderRadius: textBackgroundStyle.borderRadius
        },
        children: [
            title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: `text-xl font-semibold mb-4 text-center ${dark ? 'text-white' : ''}`,
                style: {
                    fontSize: textStyle.fontSize,
                    fontWeight: textStyle.fontWeight,
                    color: textStyle.color || (dark ? '#ffffff' : undefined),
                    fontStyle: textStyle.fontStyle,
                    textAlign: textStyle.textAlign,
                    lineHeight: textStyle.lineHeight
                },
                children: title
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/GraphBlock.tsx",
                lineNumber: 144,
                columnNumber: 9
            }, this),
            renderChart()
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/GraphBlock.tsx",
        lineNumber: 135,
        columnNumber: 5
    }, this);
}
_c = GraphBlock;
var _c;
__turbopack_context__.k.register(_c, "GraphBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/TimelineBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TimelineBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function TimelineBlock({ events, textStyle = {}, textBackgroundStyle = {}, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`,
        style: {
            backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : undefined),
            padding: textBackgroundStyle.padding,
            borderRadius: textBackgroundStyle.borderRadius
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute left-4 top-0 bottom-0 w-0.5 bg-primary"
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/TimelineBlock.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-6",
                    children: events.map((event, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative pl-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `absolute left-2.5 top-1.5 w-4 h-4 bg-primary rounded-full border-2 shadow ${dark ? 'border-gray-800' : 'border-white'}`
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/TimelineBlock.tsx",
                                    lineNumber: 42,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `p-4 rounded-lg shadow-sm border ${dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`,
                                    children: [
                                        event.date && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-sm mb-1 block ${dark ? 'text-gray-400' : 'text-gray-500'}`,
                                            children: event.date
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/TimelineBlock.tsx",
                                            lineNumber: 46,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: `text-lg font-semibold mb-2 ${dark ? 'text-white' : ''}`,
                                            style: {
                                                fontSize: textStyle.fontSize,
                                                fontWeight: textStyle.fontWeight || '600',
                                                color: textStyle.color || (dark ? '#ffffff' : undefined),
                                                fontStyle: textStyle.fontStyle
                                            },
                                            children: event.title
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/TimelineBlock.tsx",
                                            lineNumber: 48,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: dark ? 'text-gray-300' : 'text-gray-600',
                                            style: {
                                                fontSize: textStyle.fontSize,
                                                color: textStyle.color || (dark ? '#d1d5db' : '#4B5563'),
                                                lineHeight: textStyle.lineHeight
                                            },
                                            children: event.description
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/TimelineBlock.tsx",
                                            lineNumber: 59,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/blocks/TimelineBlock.tsx",
                                    lineNumber: 44,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, index, true, {
                            fileName: "[project]/app/components/blocks/TimelineBlock.tsx",
                            lineNumber: 40,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/TimelineBlock.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/blocks/TimelineBlock.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/TimelineBlock.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c = TimelineBlock;
var _c;
__turbopack_context__.k.register(_c, "TimelineBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/SeparatorBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SeparatorBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function SeparatorBlock({ height = 40, color = 'gray', showNumber = false, showLine = true, number = 1, dark = false }) {
    const colorClasses = dark ? ({
        gray: 'bg-gray-600 text-gray-400 border-gray-600',
        red: 'bg-red-500 text-red-400 border-red-500',
        green: 'bg-green-500 text-green-400 border-green-500',
        blue: 'bg-blue-500 text-blue-400 border-blue-500',
        yellow: 'bg-yellow-500 text-yellow-400 border-yellow-500'
    })[color] : ({
        gray: 'bg-gray-300 text-gray-600 border-gray-300',
        red: 'bg-red-400 text-red-600 border-red-400',
        green: 'bg-green-400 text-green-600 border-green-400',
        blue: 'bg-blue-400 text-blue-600 border-blue-400',
        yellow: 'bg-yellow-400 text-yellow-600 border-yellow-400'
    })[color];
    const bgColor = colorClasses.split(' ')[0];
    const textColor = colorClasses.split(' ')[1];
    const borderColor = colorClasses.split(' ')[2];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full flex items-center justify-center px-4",
        style: {
            height: `${height}px`
        },
        children: [
            showLine && !showNumber && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `w-full h-0.5 ${bgColor}`
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/SeparatorBlock.tsx",
                lineNumber: 48,
                columnNumber: 9
            }, this),
            showNumber && !showLine && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `w-10 h-10 rounded-full flex items-center justify-center font-bold ${textColor} border-2 ${borderColor}`,
                children: number
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/SeparatorBlock.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, this),
            showLine && showNumber && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full flex items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex-1 h-0.5 ${bgColor}`
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/SeparatorBlock.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `w-10 h-10 rounded-full flex items-center justify-center font-bold ${textColor} border-2 ${borderColor}`,
                        children: number
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/SeparatorBlock.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex-1 h-0.5 ${bgColor}`
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/SeparatorBlock.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/SeparatorBlock.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this),
            !showLine && !showNumber && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full"
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/SeparatorBlock.tsx",
                lineNumber: 72,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/SeparatorBlock.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c = SeparatorBlock;
var _c;
__turbopack_context__.k.register(_c, "SeparatorBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/TestimonialBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TestimonialBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
'use client';
;
;
function TestimonialBlock({ testimonials, textStyle = {}, textBackgroundStyle = {}, backgroundImage, dark = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-6 rounded-lg relative overflow-hidden ${dark ? 'bg-gray-900' : ''}`,
        style: {
            backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : undefined),
            padding: textBackgroundStyle.padding,
            borderRadius: textBackgroundStyle.borderRadius
        },
        children: [
            backgroundImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: backgroundImage,
                        alt: "Background",
                        fill: true,
                        className: "object-cover"
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/TestimonialBlock.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/60"
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/TestimonialBlock.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/TestimonialBlock.tsx",
                lineNumber: 40,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `relative z-10 grid gap-6 grid-cols-1 ${testimonials.length === 2 ? 'md:grid-cols-2' : testimonials.length >= 3 ? 'md:grid-cols-2 lg:grid-cols-3' : ''}`,
                children: testimonials.map((testimonial, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `backdrop-blur-sm p-6 rounded-xl shadow-lg ${dark ? 'bg-gray-800/90' : 'bg-white/90'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-8 h-8 mb-3 opacity-30 text-primary",
                                fill: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/TestimonialBlock.tsx",
                                    lineNumber: 70,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/TestimonialBlock.tsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this),
                            testimonial.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: `text-lg font-semibold mb-2 ${dark ? 'text-white' : ''}`,
                                style: {
                                    fontSize: textStyle.fontSize,
                                    fontWeight: textStyle.fontWeight || '600',
                                    color: textStyle.color || (dark ? '#ffffff' : undefined),
                                    fontStyle: textStyle.fontStyle
                                },
                                children: testimonial.title
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/TestimonialBlock.tsx",
                                lineNumber: 74,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: dark ? 'text-gray-300 mb-4' : 'text-gray-600 mb-4',
                                style: {
                                    fontSize: textStyle.fontSize || '14px',
                                    color: textStyle.color || (dark ? '#d1d5db' : '#4B5563'),
                                    lineHeight: textStyle.lineHeight || '1.5'
                                },
                                children: testimonial.content
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/TestimonialBlock.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this),
                            (testimonial.name || testimonial.avatar) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `flex items-center gap-3 pt-4 border-t ${dark ? 'border-gray-700' : 'border-gray-200'}`,
                                children: [
                                    testimonial.avatar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative w-10 h-10",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: testimonial.avatar,
                                            alt: testimonial.name || 'Author',
                                            fill: true,
                                            className: "rounded-full object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/TestimonialBlock.tsx",
                                            lineNumber: 102,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/TestimonialBlock.tsx",
                                        lineNumber: 101,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            testimonial.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `font-medium ${dark ? 'text-white' : 'text-gray-900'}`,
                                                children: testimonial.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/blocks/TestimonialBlock.tsx",
                                                lineNumber: 112,
                                                columnNumber: 21
                                            }, this),
                                            testimonial.role && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`,
                                                children: testimonial.role
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/blocks/TestimonialBlock.tsx",
                                                lineNumber: 115,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/blocks/TestimonialBlock.tsx",
                                        lineNumber: 110,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/blocks/TestimonialBlock.tsx",
                                lineNumber: 99,
                                columnNumber: 15
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/app/components/blocks/TestimonialBlock.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/TestimonialBlock.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/TestimonialBlock.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_c = TestimonialBlock;
var _c;
__turbopack_context__.k.register(_c, "TestimonialBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/StoryTellingBlock.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "bubble": "StoryTellingBlock-module__qgpi3q__bubble",
  "left": "StoryTellingBlock-module__qgpi3q__left",
  "right": "StoryTellingBlock-module__qgpi3q__right",
  "speech": "StoryTellingBlock-module__qgpi3q__speech",
  "thought": "StoryTellingBlock-module__qgpi3q__thought",
});
}),
"[project]/app/components/blocks/StoryTellingBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AvatarType",
    ()=>AvatarType,
    "BubbleShape",
    ()=>BubbleShape,
    "default",
    ()=>StoryTellingBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$StoryTellingBlock$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/components/blocks/StoryTellingBlock.module.css [app-client] (css module)");
'use client';
;
;
;
var AvatarType = /*#__PURE__*/ function(AvatarType) {
    AvatarType["TorsoGrande"] = "torso-grande";
    AvatarType["TorsoAlto"] = "torso-alto";
    AvatarType["SinPiernas"] = "sin-piernas";
    return AvatarType;
}({});
var BubbleShape = /*#__PURE__*/ function(BubbleShape) {
    BubbleShape["Classic"] = "classic";
    BubbleShape["Rounded"] = "rounded";
    BubbleShape["Cloud"] = "cloud";
    BubbleShape["Square"] = "square";
    BubbleShape["Thought"] = "thought";
    return BubbleShape;
}({});
function StoryTellingBlock({ avatarImage, avatarName, text, bubbleStyle = {}, textStyle = {}, avatarPosition = 'left', dark = false }) {
    const displayText = text.slice(0, 1000);
    const { backgroundColor = dark ? '#374151' : '#FFFFFF', shape = "classic", borderWidth = '2px', borderColor = dark ? '#4B5563' : '#D1D5DB' } = bubbleStyle;
    const { fontSize = '16px', fontWeight = '400', color = dark ? '#F3F4F6' : '#1F2937', fontStyle = 'normal', lineHeight = '1.6', textAlign = 'left' } = textStyle;
    const isLeft = avatarPosition === 'left';
    const isThought = shape === "thought" || shape === "cloud";
    // Obtener el border-radius según la forma
    const getBorderRadius = ()=>{
        switch(shape){
            case "classic":
                return '15px';
            case "rounded":
                return '25px';
            case "cloud":
                return '30px';
            case "square":
                return '8px';
            case "thought":
                return '20px';
            default:
                return '15px';
        }
    };
    // Clases CSS para la burbuja
    const bubbleClasses = [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$StoryTellingBlock$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].bubble,
        isLeft ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$StoryTellingBlock$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].left : __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$StoryTellingBlock$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].right,
        isThought ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$StoryTellingBlock$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].thought : __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$StoryTellingBlock$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].speech
    ].join(' ');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `flex items-start gap-4 max-w-2xl mx-auto ${isLeft ? 'flex-row' : 'flex-row-reverse'}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-shrink-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative w-24 h-32 md:w-32 md:h-40",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: avatarImage,
                                alt: avatarName || 'Avatar',
                                fill: true,
                                className: "object-contain object-top"
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/StoryTellingBlock.tsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/StoryTellingBlock.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this),
                        avatarName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: `text-center text-sm mt-1 font-medium ${dark ? 'text-gray-300' : 'text-gray-600'}`,
                            children: avatarName
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/StoryTellingBlock.tsx",
                            lineNumber: 114,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/blocks/StoryTellingBlock.tsx",
                    lineNumber: 104,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: bubbleClasses,
                        style: {
                            '--bubble-bg': backgroundColor,
                            '--bubble-border': borderColor,
                            '--bubble-border-width': borderWidth,
                            '--bubble-radius': getBorderRadius()
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize,
                                fontWeight,
                                color,
                                fontStyle,
                                lineHeight,
                                textAlign,
                                margin: 0
                            },
                            children: displayText
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/StoryTellingBlock.tsx",
                            lineNumber: 135,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/StoryTellingBlock.tsx",
                        lineNumber: 126,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/StoryTellingBlock.tsx",
                    lineNumber: 125,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/blocks/StoryTellingBlock.tsx",
            lineNumber: 98,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/StoryTellingBlock.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
_c = StoryTellingBlock;
var _c;
__turbopack_context__.k.register(_c, "StoryTellingBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ColumnsBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ColumnsBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Paragraph$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/Paragraph.tsx [app-client] (ecmascript)");
'use client';
;
;
function ColumnsBlock({ content, columns = 2, contentStyle = {}, dark = false }) {
    const columnClass = {
        1: 'columns-1',
        2: 'columns-2',
        3: 'columns-3',
        4: 'columns-4'
    }[columns];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `${columnClass} gap-6`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$Paragraph$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                content: content,
                contentStyle: contentStyle,
                dark: dark
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/ColumnsBlock.tsx",
                lineNumber: 30,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/ColumnsBlock.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/ColumnsBlock.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c = ColumnsBlock;
var _c;
__turbopack_context__.k.register(_c, "ColumnsBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ReviewsBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReviewsBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
'use client';
;
;
;
function ReviewsBlock({ reviews, textStyle = {}, dark = false }) {
    const renderStars = (rating)=>{
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-1",
            children: [
                1,
                2,
                3,
                4,
                5
            ].map((star)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                    className: `w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : dark ? 'text-gray-600' : 'text-gray-300'}`
                }, star, false, {
                    fileName: "[project]/app/components/blocks/ReviewsBlock.tsx",
                    lineNumber: 31,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/ReviewsBlock.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: reviews.map((review)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `p-4 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-shrink-0",
                                children: review.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative w-12 h-12",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: review.avatar,
                                        alt: review.name,
                                        fill: true,
                                        className: "rounded-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/ReviewsBlock.tsx",
                                        lineNumber: 61,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/ReviewsBlock.tsx",
                                    lineNumber: 60,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `w-12 h-12 rounded-full flex items-center justify-center ${dark ? 'bg-gray-700' : 'bg-gray-200'}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-lg font-semibold ${dark ? 'text-gray-300' : 'text-gray-600'}`,
                                        children: review.name.charAt(0).toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/ReviewsBlock.tsx",
                                        lineNumber: 74,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/ReviewsBlock.tsx",
                                    lineNumber: 69,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/ReviewsBlock.tsx",
                                lineNumber: 58,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: `font-semibold ${dark ? 'text-white' : 'text-gray-900'}`,
                                                style: {
                                                    fontSize: textStyle.fontSize
                                                },
                                                children: review.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/blocks/ReviewsBlock.tsx",
                                                lineNumber: 84,
                                                columnNumber: 19
                                            }, this),
                                            renderStars(review.rating)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/blocks/ReviewsBlock.tsx",
                                        lineNumber: 83,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`,
                                        style: {
                                            color: textStyle.color || (dark ? '#d1d5db' : undefined),
                                            lineHeight: textStyle.lineHeight || '1.5'
                                        },
                                        children: review.review
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/ReviewsBlock.tsx",
                                        lineNumber: 92,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/blocks/ReviewsBlock.tsx",
                                lineNumber: 82,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/ReviewsBlock.tsx",
                        lineNumber: 56,
                        columnNumber: 13
                    }, this)
                }, review.id, false, {
                    fileName: "[project]/app/components/blocks/ReviewsBlock.tsx",
                    lineNumber: 50,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/ReviewsBlock.tsx",
            lineNumber: 48,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/ReviewsBlock.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_c = ReviewsBlock;
var _c;
__turbopack_context__.k.register(_c, "ReviewsBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/VideoBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VideoBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
const getYouTubeId = (url)=>{
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
};
const getVimeoId = (url)=>{
    const regExp = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
};
function VideoBlock({ url, title = 'Video', dark = false }) {
    const youtubeId = getYouTubeId(url);
    const vimeoId = getVimeoId(url);
    let embedUrl = url;
    if (youtubeId) {
        embedUrl = `https://www.youtube.com/embed/${youtubeId}`;
    } else if (vimeoId) {
        embedUrl = `https://player.vimeo.com/video/${vimeoId}`;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full aspect-video rounded-lg overflow-hidden shadow-lg",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                src: embedUrl,
                title: title,
                allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                allowFullScreen: true,
                className: "absolute inset-0 w-full h-full"
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/VideoBlock.tsx",
                lineNumber: 42,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/VideoBlock.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/VideoBlock.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_c = VideoBlock;
var _c;
__turbopack_context__.k.register(_c, "VideoBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/AudioBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AudioBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-2.js [app-client] (ecmascript) <export default as Volume2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-x.js [app-client] (ecmascript) <export default as VolumeX>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function AudioBlock({ url, title = 'Audio', dark = false }) {
    _s();
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMuted, setIsMuted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [duration, setDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [volume, setVolume] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AudioBlock.useEffect": ()=>{
            const audio = audioRef.current;
            if (!audio) return;
            const handleTimeUpdate = {
                "AudioBlock.useEffect.handleTimeUpdate": ()=>setCurrentTime(audio.currentTime)
            }["AudioBlock.useEffect.handleTimeUpdate"];
            const handleLoadedMetadata = {
                "AudioBlock.useEffect.handleLoadedMetadata": ()=>setDuration(audio.duration)
            }["AudioBlock.useEffect.handleLoadedMetadata"];
            const handleEnded = {
                "AudioBlock.useEffect.handleEnded": ()=>setIsPlaying(false)
            }["AudioBlock.useEffect.handleEnded"];
            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            audio.addEventListener('ended', handleEnded);
            return ({
                "AudioBlock.useEffect": ()=>{
                    audio.removeEventListener('timeupdate', handleTimeUpdate);
                    audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
                    audio.removeEventListener('ended', handleEnded);
                }
            })["AudioBlock.useEffect"];
        }
    }["AudioBlock.useEffect"], []);
    const togglePlay = ()=>{
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    const toggleMute = ()=>{
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };
    const handleSeek = (e)=>{
        const time = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };
    const handleVolumeChange = (e)=>{
        const vol = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.volume = vol;
            setVolume(vol);
            setIsMuted(vol === 0);
        }
    };
    const formatTime = (time)=>{
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `p-4 rounded-lg ${dark ? 'bg-gray-800' : 'bg-gray-100'}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                    ref: audioRef,
                    src: url,
                    preload: "metadata"
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/AudioBlock.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this),
                title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: `text-sm font-medium mb-3 ${dark ? 'text-white' : 'text-gray-900'}`,
                    children: title
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/AudioBlock.tsx",
                    lineNumber: 94,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: togglePlay,
                            className: "w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary-dark transition-colors",
                            children: isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                                className: "w-5 h-5 text-white"
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/AudioBlock.tsx",
                                lineNumber: 106,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                className: "w-5 h-5 text-white ml-0.5"
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/AudioBlock.tsx",
                                lineNumber: 108,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/AudioBlock.tsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "0",
                                    max: duration || 0,
                                    value: currentTime,
                                    onChange: handleSeek,
                                    className: "w-full h-2 rounded-full appearance-none cursor-pointer",
                                    style: {
                                        background: `linear-gradient(to right, #9F80DA ${currentTime / duration * 100}%, ${dark ? '#374151' : '#D1D5DB'} ${currentTime / duration * 100}%)`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/AudioBlock.tsx",
                                    lineNumber: 114,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between mt-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`,
                                            children: formatTime(currentTime)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/AudioBlock.tsx",
                                            lineNumber: 126,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`,
                                            children: formatTime(duration)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/AudioBlock.tsx",
                                            lineNumber: 129,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/blocks/AudioBlock.tsx",
                                    lineNumber: 125,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/blocks/AudioBlock.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: toggleMute,
                                    className: dark ? 'text-gray-400' : 'text-gray-500',
                                    children: isMuted || volume === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__["VolumeX"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/AudioBlock.tsx",
                                        lineNumber: 139,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/AudioBlock.tsx",
                                        lineNumber: 141,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/AudioBlock.tsx",
                                    lineNumber: 137,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "0",
                                    max: "1",
                                    step: "0.1",
                                    value: isMuted ? 0 : volume,
                                    onChange: handleVolumeChange,
                                    className: "w-20 h-1 rounded-full appearance-none cursor-pointer",
                                    style: {
                                        background: `linear-gradient(to right, #9F80DA ${volume * 100}%, ${dark ? '#374151' : '#D1D5DB'} ${volume * 100}%)`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/AudioBlock.tsx",
                                    lineNumber: 144,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/blocks/AudioBlock.tsx",
                            lineNumber: 136,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/blocks/AudioBlock.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/blocks/AudioBlock.tsx",
            lineNumber: 86,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/AudioBlock.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_s(AudioBlock, "To/YSBAf+nTt6NyhHopO1JKYUqs=");
_c = AudioBlock;
var _c;
__turbopack_context__.k.register(_c, "AudioBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/AttachmentBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AttachmentBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file.js [app-client] (ecmascript) <export default as File>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileImage$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-image.js [app-client] (ecmascript) <export default as FileImage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileVideo$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-play.js [app-client] (ecmascript) <export default as FileVideo>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$headphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileAudio$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-headphone.js [app-client] (ecmascript) <export default as FileAudio>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$archive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileArchive$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-archive.js [app-client] (ecmascript) <export default as FileArchive>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$spreadsheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSpreadsheet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-spreadsheet.js [app-client] (ecmascript) <export default as FileSpreadsheet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileCode$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-code.js [app-client] (ecmascript) <export default as FileCode>");
'use client';
;
;
const getFileIcon = (name, type)=>{
    const extension = name.split('.').pop()?.toLowerCase();
    // Check by type first
    if (type?.startsWith('image/')) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileImage$3e$__["FileImage"];
    if (type?.startsWith('video/')) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileVideo$3e$__["FileVideo"];
    if (type?.startsWith('audio/')) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$headphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileAudio$3e$__["FileAudio"];
    // Check by extension
    switch(extension){
        case 'pdf':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"];
        case 'doc':
        case 'docx':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"];
        case 'xls':
        case 'xlsx':
        case 'csv':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$spreadsheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSpreadsheet$3e$__["FileSpreadsheet"];
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'webp':
        case 'svg':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileImage$3e$__["FileImage"];
        case 'mp4':
        case 'avi':
        case 'mov':
        case 'webm':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileVideo$3e$__["FileVideo"];
        case 'mp3':
        case 'wav':
        case 'ogg':
        case 'flac':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$headphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileAudio$3e$__["FileAudio"];
        case 'zip':
        case 'rar':
        case '7z':
        case 'tar':
        case 'gz':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$archive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileArchive$3e$__["FileArchive"];
        case 'js':
        case 'ts':
        case 'jsx':
        case 'tsx':
        case 'html':
        case 'css':
        case 'json':
        case 'py':
        case 'java':
        case 'cpp':
        case 'c':
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileCode$3e$__["FileCode"];
        default:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"];
    }
};
const getFileColor = (name)=>{
    const extension = name.split('.').pop()?.toLowerCase();
    switch(extension){
        case 'pdf':
            return '#EF4444'; // red
        case 'doc':
        case 'docx':
            return '#3B82F6'; // blue
        case 'xls':
        case 'xlsx':
        case 'csv':
            return '#22C55E'; // green
        case 'ppt':
        case 'pptx':
            return '#F97316'; // orange
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'webp':
        case 'svg':
            return '#8B5CF6'; // purple
        case 'mp4':
        case 'avi':
        case 'mov':
        case 'webm':
            return '#EC4899'; // pink
        case 'mp3':
        case 'wav':
        case 'ogg':
        case 'flac':
            return '#14B8A6'; // teal
        case 'zip':
        case 'rar':
        case '7z':
        case 'tar':
        case 'gz':
            return '#F59E0B'; // amber
        default:
            return '#6B7280'; // gray
    }
};
function AttachmentBlock({ attachments, textStyle = {}, dark = false }) {
    const handleDownload = (attachment)=>{
        window.open(attachment.url, '_blank');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-3",
            children: attachments.map((attachment)=>{
                const IconComponent = getFileIcon(attachment.name, attachment.type);
                const iconColor = getFileColor(attachment.name);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex items-center gap-4 p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer ${dark ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`,
                    onClick: ()=>handleDownload(attachment),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
                            style: {
                                backgroundColor: `${iconColor}20`
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                                className: "w-6 h-6",
                                style: {
                                    color: iconColor
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/AttachmentBlock.tsx",
                                lineNumber: 155,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/AttachmentBlock.tsx",
                            lineNumber: 151,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: `font-medium truncate ${dark ? 'text-white' : 'text-gray-900'}`,
                                    style: {
                                        fontSize: textStyle.fontSize,
                                        color: textStyle.color || (dark ? '#ffffff' : undefined)
                                    },
                                    children: attachment.name
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/AttachmentBlock.tsx",
                                    lineNumber: 160,
                                    columnNumber: 17
                                }, this),
                                attachment.size && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: `text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`,
                                    children: attachment.size
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/AttachmentBlock.tsx",
                                    lineNumber: 170,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/blocks/AttachmentBlock.tsx",
                            lineNumber: 159,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: `p-2 rounded-full transition-colors ${dark ? 'hover:bg-gray-700 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'}`,
                            onClick: (e)=>{
                                e.stopPropagation();
                                handleDownload(attachment);
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/AttachmentBlock.tsx",
                                lineNumber: 188,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/AttachmentBlock.tsx",
                            lineNumber: 177,
                            columnNumber: 15
                        }, this)
                    ]
                }, attachment.id, true, {
                    fileName: "[project]/app/components/blocks/AttachmentBlock.tsx",
                    lineNumber: 141,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/AttachmentBlock.tsx",
            lineNumber: 135,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/AttachmentBlock.tsx",
        lineNumber: 134,
        columnNumber: 5
    }, this);
}
_c = AttachmentBlock;
var _c;
__turbopack_context__.k.register(_c, "AttachmentBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/EmbedBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EmbedBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minimize-2.js [app-client] (ecmascript) <export default as Minimize2>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function EmbedBlock({ html, url, title = 'Embedded content', aspectRatio = '16:9', maxHeight, allowFullscreen = true, dark = false }) {
    _s();
    const [isFullscreen, setIsFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const getAspectRatioClass = ()=>{
        switch(aspectRatio){
            case '16:9':
                return 'aspect-video';
            case '4:3':
                return 'aspect-[4/3]';
            case '1:1':
                return 'aspect-square';
            case '9:16':
                return 'aspect-[9/16]';
            case 'auto':
                return '';
            default:
                return 'aspect-video';
        }
    };
    const toggleFullscreen = ()=>{
        setIsFullscreen(!isFullscreen);
    };
    // If HTML is provided, render it directly
    if (html) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `relative w-full rounded-lg overflow-hidden ${dark ? 'bg-gray-800' : 'bg-gray-100'} ${getAspectRatioClass()}`,
                style: maxHeight && aspectRatio === 'auto' ? {
                    maxHeight
                } : undefined,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 w-full h-full",
                    dangerouslySetInnerHTML: {
                        __html: html
                    }
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/EmbedBlock.tsx",
                    lineNumber: 58,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/EmbedBlock.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/EmbedBlock.tsx",
            lineNumber: 51,
            columnNumber: 7
        }, this);
    }
    // If URL is provided, render an iframe
    if (url) {
        if (isFullscreen) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 bg-black flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between p-4 bg-gray-900",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white font-medium",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/EmbedBlock.tsx",
                                lineNumber: 73,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: url,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/EmbedBlock.tsx",
                                            lineNumber: 81,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/EmbedBlock.tsx",
                                        lineNumber: 75,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: toggleFullscreen,
                                        className: "p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__["Minimize2"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/EmbedBlock.tsx",
                                            lineNumber: 87,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/EmbedBlock.tsx",
                                        lineNumber: 83,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/blocks/EmbedBlock.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/EmbedBlock.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                        src: url,
                        title: title,
                        className: "flex-1 w-full",
                        allowFullScreen: allowFullscreen,
                        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/EmbedBlock.tsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/EmbedBlock.tsx",
                lineNumber: 71,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `relative w-full rounded-lg overflow-hidden shadow-lg ${getAspectRatioClass()}`,
                style: maxHeight && aspectRatio === 'auto' ? {
                    maxHeight
                } : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                        src: url,
                        title: title,
                        className: "absolute inset-0 w-full h-full",
                        allowFullScreen: allowFullscreen,
                        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/EmbedBlock.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-2 right-2 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: url,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "p-2 rounded-lg bg-black/50 hover:bg-black/70 text-white transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/EmbedBlock.tsx",
                                    lineNumber: 124,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/EmbedBlock.tsx",
                                lineNumber: 118,
                                columnNumber: 13
                            }, this),
                            allowFullscreen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleFullscreen,
                                className: "p-2 rounded-lg bg-black/50 hover:bg-black/70 text-white transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/EmbedBlock.tsx",
                                    lineNumber: 131,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/EmbedBlock.tsx",
                                lineNumber: 127,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/EmbedBlock.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/EmbedBlock.tsx",
                lineNumber: 104,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/EmbedBlock.tsx",
            lineNumber: 103,
            columnNumber: 7
        }, this);
    }
    // Placeholder if neither html nor url is provided
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `flex items-center justify-center rounded-lg ${getAspectRatioClass()} ${dark ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "No content to embed"
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/EmbedBlock.tsx",
                lineNumber: 148,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/EmbedBlock.tsx",
            lineNumber: 143,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/EmbedBlock.tsx",
        lineNumber: 142,
        columnNumber: 5
    }, this);
}
_s(EmbedBlock, "LI0KkFuciCdLvQ6T7dAtFOAXj0Y=");
_c = EmbedBlock;
var _c;
__turbopack_context__.k.register(_c, "EmbedBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/CheckboxBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CheckboxBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function CheckboxBlock({ items: initialItems, textStyle = {}, textBackgroundStyle = {}, blockStyle = 'A', dark = false }) {
    _s();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialItems);
    const toggleItem = (id)=>{
        setItems((prev)=>prev.map((item)=>item.id === id ? {
                    ...item,
                    checked: !item.checked
                } : item));
    };
    const styleClasses = dark ? ({
        A: {
            checkbox: 'border-2 border-gray-600 rounded',
            checkedCheckbox: 'bg-green-600 border-green-600',
            text: 'text-gray-300',
            checkedText: 'text-green-400 line-through'
        },
        B: {
            checkbox: 'border-2 border-primary rounded-full',
            checkedCheckbox: 'bg-primary border-primary',
            text: 'text-gray-300',
            checkedText: 'text-gray-500 line-through'
        },
        C: {
            checkbox: 'border-2 border-blue-500 rounded-md',
            checkedCheckbox: 'bg-blue-600 border-blue-600',
            text: 'text-gray-200',
            checkedText: 'text-blue-400 line-through opacity-70'
        }
    })[blockStyle] : ({
        A: {
            checkbox: 'border-2 border-gray-300 rounded',
            checkedCheckbox: 'bg-green-500 border-green-500',
            text: 'text-gray-700',
            checkedText: 'text-green-600 line-through'
        },
        B: {
            checkbox: 'border-2 border-primary rounded-full',
            checkedCheckbox: 'bg-primary border-primary',
            text: 'text-gray-700',
            checkedText: 'text-gray-400 line-through'
        },
        C: {
            checkbox: 'border-2 border-blue-400 rounded-md',
            checkedCheckbox: 'bg-blue-500 border-blue-500',
            text: 'text-gray-800',
            checkedText: 'text-blue-400 line-through opacity-70'
        }
    })[blockStyle];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`,
        style: {
            backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : undefined),
            padding: textBackgroundStyle.padding,
            borderRadius: textBackgroundStyle.borderRadius
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            className: "space-y-3",
            children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>toggleItem(item.id),
                            className: `w-6 h-6 flex items-center justify-center transition-all ${item.checked ? styleClasses.checkedCheckbox : styleClasses.checkbox}`,
                            "aria-label": item.checked ? 'Uncheck item' : 'Check item',
                            children: item.checked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                className: "w-4 h-4 text-white"
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/CheckboxBlock.tsx",
                                lineNumber: 99,
                                columnNumber: 32
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/CheckboxBlock.tsx",
                            lineNumber: 90,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `transition-all ${item.checked ? styleClasses.checkedText : styleClasses.text}`,
                            style: {
                                fontSize: textStyle.fontSize,
                                fontWeight: textStyle.fontWeight,
                                fontStyle: textStyle.fontStyle,
                                lineHeight: textStyle.lineHeight
                            },
                            children: item.text
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/CheckboxBlock.tsx",
                            lineNumber: 101,
                            columnNumber: 13
                        }, this)
                    ]
                }, item.id, true, {
                    fileName: "[project]/app/components/blocks/CheckboxBlock.tsx",
                    lineNumber: 89,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/CheckboxBlock.tsx",
            lineNumber: 87,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/CheckboxBlock.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
_s(CheckboxBlock, "sNFHCHSkSTmZoBPBTQOxnnfkt60=");
_c = CheckboxBlock;
var _c;
__turbopack_context__.k.register(_c, "CheckboxBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/CarouselBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CarouselBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function CarouselBlock({ images, dark = false }) {
    _s();
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const goToPrevious = ()=>{
        setCurrentIndex((prev)=>prev === 0 ? images.length - 1 : prev - 1);
    };
    const goToNext = ()=>{
        setCurrentIndex((prev)=>prev === images.length - 1 ? 0 : prev + 1);
    };
    const currentImage = images[currentIndex];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative h-80 w-full overflow-hidden rounded-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: currentImage.src,
                            alt: currentImage.alt || `Slide ${currentIndex + 1}`,
                            fill: true,
                            className: "object-cover transition-opacity duration-300"
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/CarouselBlock.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        currentImage.caption && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-center",
                                children: currentImage.caption
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/CarouselBlock.tsx",
                                lineNumber: 43,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/CarouselBlock.tsx",
                            lineNumber: 42,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/blocks/CarouselBlock.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: goToPrevious,
                    className: `absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg transition-colors ${dark ? 'bg-gray-700/80 hover:bg-gray-600' : 'bg-white/80 hover:bg-white'}`,
                    "aria-label": "Previous image",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                        className: `w-6 h-6 ${dark ? 'text-white' : 'text-gray-800'}`
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/CarouselBlock.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/CarouselBlock.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: goToNext,
                    className: `absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg transition-colors ${dark ? 'bg-gray-700/80 hover:bg-gray-600' : 'bg-white/80 hover:bg-white'}`,
                    "aria-label": "Next image",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                        className: `w-6 h-6 ${dark ? 'text-white' : 'text-gray-800'}`
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/CarouselBlock.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/CarouselBlock.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center gap-2 mt-4",
                    children: images.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setCurrentIndex(index),
                            className: `w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-primary' : dark ? 'bg-gray-600' : 'bg-gray-300'}`,
                            "aria-label": `Go to slide ${index + 1}`
                        }, index, false, {
                            fileName: "[project]/app/components/blocks/CarouselBlock.tsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/CarouselBlock.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/blocks/CarouselBlock.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/CarouselBlock.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_s(CarouselBlock, "tusBbsahUVevXfyh6oH5R6YDC9Q=");
_c = CarouselBlock;
var _c;
__turbopack_context__.k.register(_c, "CarouselBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/AccordionBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AccordionBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function AccordionBlock({ items = [], textStyle = {}, textBackgroundStyle = {}, blockStyle = 'A', allowMultiple = false, dark = false }) {
    _s();
    const [openItems, setOpenItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Handle empty or missing items
    if (!items || items.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-full p-4 rounded-lg ${dark ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-500'}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "No accordion items available"
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/AccordionBlock.tsx",
                lineNumber: 41,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/AccordionBlock.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, this);
    }
    const toggleItem = (id)=>{
        if (allowMultiple) {
            setOpenItems((prev)=>prev.includes(id) ? prev.filter((item)=>item !== id) : [
                    ...prev,
                    id
                ]);
        } else {
            setOpenItems((prev)=>prev.includes(id) ? [] : [
                    id
                ]);
        }
    };
    const isOpen = (id)=>openItems.includes(id);
    const styleClasses = dark ? ({
        A: {
            container: 'border border-gray-700 rounded-lg',
            header: 'bg-gray-800 hover:bg-gray-700',
            headerOpen: 'bg-primary/20',
            content: 'bg-gray-800',
            icon: 'text-gray-400'
        },
        B: {
            container: 'border-l-4 border-primary shadow-sm',
            header: 'bg-gray-800 hover:bg-gray-700',
            headerOpen: 'bg-primary/30',
            content: 'bg-gray-800',
            icon: 'text-primary'
        },
        C: {
            container: 'border-2 border-gray-600 rounded-xl',
            header: 'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700',
            headerOpen: 'bg-gradient-to-r from-blue-900/50 to-gray-900',
            content: 'bg-gray-800',
            icon: 'text-blue-400'
        }
    })[blockStyle] : ({
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
    })[blockStyle];
    const renderContent = (item)=>{
        const imagePosition = item.imagePosition || 'right';
        const hasImage = !!item.image;
        if (!hasImage) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontSize: textStyle.fontSize,
                    color: textStyle.color || (dark ? '#d1d5db' : '#4B5563'),
                    lineHeight: textStyle.lineHeight || '1.5'
                },
                children: item.content
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/AccordionBlock.tsx",
                lineNumber: 110,
                columnNumber: 9
            }, this);
        }
        if (imagePosition === 'stretched') {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-full h-48 rounded-lg overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: item.image,
                            alt: item.title,
                            fill: true,
                            className: "object-cover"
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/AccordionBlock.tsx",
                            lineNumber: 126,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-black/40 flex items-center justify-center p-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white text-center",
                                style: {
                                    fontSize: textStyle.fontSize,
                                    lineHeight: textStyle.lineHeight || '1.5'
                                },
                                children: item.content
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/AccordionBlock.tsx",
                                lineNumber: 133,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/AccordionBlock.tsx",
                            lineNumber: 132,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/blocks/AccordionBlock.tsx",
                    lineNumber: 125,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/AccordionBlock.tsx",
                lineNumber: 124,
                columnNumber: 9
            }, this);
        }
        const isHorizontal = imagePosition === 'left' || imagePosition === 'right';
        const isReversed = imagePosition === 'right' || imagePosition === 'bottom';
        const containerClass = isHorizontal ? `flex ${isReversed ? 'flex-row' : 'flex-row-reverse'} gap-4` : `flex ${isReversed ? 'flex-col-reverse' : 'flex-col'} gap-4`;
        const imageContainerClass = isHorizontal ? 'relative w-1/3 h-32 flex-shrink-0' : 'relative w-full h-40';
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: containerClass,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: textStyle.fontSize,
                            color: textStyle.color || (dark ? '#d1d5db' : '#4B5563'),
                            lineHeight: textStyle.lineHeight || '1.5'
                        },
                        children: item.content
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/AccordionBlock.tsx",
                        lineNumber: 162,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/AccordionBlock.tsx",
                    lineNumber: 161,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: imageContainerClass,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: item.image,
                        alt: item.title,
                        fill: true,
                        className: "object-cover rounded-lg"
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/AccordionBlock.tsx",
                        lineNumber: 173,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/AccordionBlock.tsx",
                    lineNumber: 172,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/blocks/AccordionBlock.tsx",
            lineNumber: 160,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`,
        style: {
            backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : undefined),
            padding: textBackgroundStyle.padding,
            borderRadius: textBackgroundStyle.borderRadius
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${styleClasses.container} overflow-hidden`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>toggleItem(item.id),
                            className: `w-full flex items-center justify-between p-4 transition-colors ${isOpen(item.id) ? styleClasses.headerOpen : styleClasses.header}`,
                            "aria-expanded": isOpen(item.id),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `font-medium text-left ${dark ? 'text-white' : ''}`,
                                    style: {
                                        fontSize: textStyle.fontSize,
                                        fontWeight: textStyle.fontWeight || '500',
                                        color: textStyle.color || (dark ? '#ffffff' : undefined),
                                        fontStyle: textStyle.fontStyle
                                    },
                                    children: item.title
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/AccordionBlock.tsx",
                                    lineNumber: 203,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                    className: `w-5 h-5 transition-transform ${styleClasses.icon} ${isOpen(item.id) ? 'rotate-180' : ''}`
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/AccordionBlock.tsx",
                                    lineNumber: 214,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/blocks/AccordionBlock.tsx",
                            lineNumber: 196,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `overflow-hidden transition-all duration-300 ${isOpen(item.id) ? 'max-h-[500px]' : 'max-h-0'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${styleClasses.content} p-4 border-t ${dark ? 'border-gray-700' : 'border-gray-100'}`,
                                children: renderContent(item)
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/AccordionBlock.tsx",
                                lineNumber: 226,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/AccordionBlock.tsx",
                            lineNumber: 221,
                            columnNumber: 13
                        }, this)
                    ]
                }, item.id, true, {
                    fileName: "[project]/app/components/blocks/AccordionBlock.tsx",
                    lineNumber: 195,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/AccordionBlock.tsx",
            lineNumber: 193,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/AccordionBlock.tsx",
        lineNumber: 185,
        columnNumber: 5
    }, this);
}
_s(AccordionBlock, "LWtMwAMGvj6zyLBkbSUCwnEauvU=");
_c = AccordionBlock;
var _c;
__turbopack_context__.k.register(_c, "AccordionBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/TabsBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TabsBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function TabsBlock({ items = [], textStyle = {}, textBackgroundStyle = {}, dark = false }) {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(items?.[0]?.id || '');
    // Handle empty or missing items
    if (!items || items.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-full p-4 rounded-lg ${dark ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-500'}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "No tabs available"
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/TabsBlock.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/TabsBlock.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, this);
    }
    const activeItem = items.find((item)=>item.id === activeTab) || items[0];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`,
        style: {
            backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : undefined),
            padding: textBackgroundStyle.padding,
            borderRadius: textBackgroundStyle.borderRadius
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex border-b ${dark ? 'border-gray-700' : 'border-gray-200'}`,
                children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab(item.id),
                        className: `px-6 py-3 font-medium transition-colors border-b-2 -mb-px ${activeTab === item.id ? `border-primary text-primary ${dark ? 'bg-primary/10' : 'bg-primary/5'}` : `border-transparent ${dark ? 'text-gray-400 hover:text-gray-200 hover:border-gray-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}`,
                        style: {
                            fontSize: textStyle.fontSize,
                            fontWeight: textStyle.fontWeight || '500'
                        },
                        children: item.title
                    }, item.id, false, {
                        fileName: "[project]/app/components/blocks/TabsBlock.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/TabsBlock.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            activeItem && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6",
                children: [
                    activeItem.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative h-48 w-full mb-4 rounded-lg overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: activeItem.image,
                            alt: activeItem.title,
                            fill: true,
                            className: "object-cover"
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/TabsBlock.tsx",
                            lineNumber: 75,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/TabsBlock.tsx",
                        lineNumber: 74,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: textStyle.fontSize,
                            color: textStyle.color || (dark ? '#d1d5db' : '#374151'),
                            lineHeight: textStyle.lineHeight || '1.6'
                        },
                        children: activeItem.content
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/TabsBlock.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/TabsBlock.tsx",
                lineNumber: 72,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/TabsBlock.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_s(TabsBlock, "t1SSD09zo3Sq3qH3i9TVU1/eeyc=");
_c = TabsBlock;
var _c;
__turbopack_context__.k.register(_c, "TabsBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/LabeledImageBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LabeledImageBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function LabeledImageBlock({ image, items, alt = 'Labeled image', dark = false }) {
    _s();
    const [activeIndex, setActiveIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const toggleItem = (index)=>{
        setActiveIndex((prev)=>prev === index ? null : index);
    };
    const goToPrevious = ()=>{
        if (activeIndex === null) return;
        const newIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(newIndex);
    };
    const goToNext = ()=>{
        if (activeIndex === null) return;
        const newIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(newIndex);
    };
    const activeItemData = activeIndex !== null ? items[activeIndex] : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full h-96 rounded-lg overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: image,
                    alt: alt,
                    fill: true,
                    className: "object-cover"
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/LabeledImageBlock.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this),
                items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>toggleItem(index),
                        className: `absolute w-8 h-8 rounded-full flex items-center justify-center transition-all transform -translate-x-1/2 -translate-y-1/2 ${activeIndex === index ? 'bg-primary scale-110 shadow-lg' : 'bg-white/90 hover:bg-primary hover:scale-105 shadow'}`,
                        style: {
                            left: `${item.x}%`,
                            top: `${item.y}%`
                        },
                        "aria-label": `Show info for ${item.title}`,
                        children: activeIndex === index ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "w-4 h-4 text-white"
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/LabeledImageBlock.tsx",
                            lineNumber: 69,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                            className: `w-4 h-4 ${activeIndex === index ? 'text-white' : 'text-primary'}`
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/LabeledImageBlock.tsx",
                            lineNumber: 71,
                            columnNumber: 15
                        }, this)
                    }, item.id, false, {
                        fileName: "[project]/app/components/blocks/LabeledImageBlock.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this)),
                activeItemData && activeIndex !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `absolute rounded-lg shadow-xl p-4 max-w-xs z-10 animate-in fade-in duration-200 ${dark ? 'bg-gray-800' : 'bg-white'}`,
                    style: {
                        left: `${Math.min(activeItemData.x, 70)}%`,
                        top: `${Math.min(activeItemData.y + 5, 60)}%`
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: `font-semibold ${dark ? 'text-white' : 'text-gray-900'}`,
                                    children: activeItemData.title
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/LabeledImageBlock.tsx",
                                    lineNumber: 90,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`,
                                    children: [
                                        activeIndex + 1,
                                        " / ",
                                        items.length
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/blocks/LabeledImageBlock.tsx",
                                    lineNumber: 93,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/blocks/LabeledImageBlock.tsx",
                            lineNumber: 89,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: `text-sm mb-3 ${dark ? 'text-gray-300' : 'text-gray-600'}`,
                            children: activeItemData.content
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/LabeledImageBlock.tsx",
                            lineNumber: 97,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between border-t pt-3 mt-2 border-gray-200 dark:border-gray-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        goToPrevious();
                                    },
                                    className: `flex items-center gap-1 px-2 py-1 rounded transition-colors ${dark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`,
                                    "aria-label": "Previous item",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/LabeledImageBlock.tsx",
                                            lineNumber: 115,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs",
                                            children: "Previous"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/LabeledImageBlock.tsx",
                                            lineNumber: 116,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/blocks/LabeledImageBlock.tsx",
                                    lineNumber: 103,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        goToNext();
                                    },
                                    className: `flex items-center gap-1 px-2 py-1 rounded transition-colors ${dark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`,
                                    "aria-label": "Next item",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs",
                                            children: "Next"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/LabeledImageBlock.tsx",
                                            lineNumber: 130,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/LabeledImageBlock.tsx",
                                            lineNumber: 131,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/blocks/LabeledImageBlock.tsx",
                                    lineNumber: 118,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/blocks/LabeledImageBlock.tsx",
                            lineNumber: 102,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/blocks/LabeledImageBlock.tsx",
                    lineNumber: 82,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/blocks/LabeledImageBlock.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/LabeledImageBlock.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s(LabeledImageBlock, "E8kOn+IkK/htiBGEqJWkEvOqULU=");
_c = LabeledImageBlock;
var _c;
__turbopack_context__.k.register(_c, "LabeledImageBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ScenarioBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScenarioBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ScenarioBlock({ image, question, answers, dark = false }) {
    _s();
    const [selectedAnswer, setSelectedAnswer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showResult, setShowResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleAnswer = (answerId)=>{
        setSelectedAnswer(answerId);
        setShowResult(true);
    };
    const getAnswerStyle = (answer)=>{
        if (!showResult) {
            return 'bg-white hover:bg-gray-50 border-gray-300';
        }
        if (selectedAnswer === answer.id) {
            return answer.isCorrect ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-500 text-red-800';
        }
        if (answer.isCorrect) {
            return 'bg-green-50 border-green-300 text-green-700';
        }
        return 'bg-gray-50 border-gray-200 text-gray-500';
    };
    const sortedAnswers = [
        ...answers
    ].sort((a, b)=>a.order - b.order);
    const reset = ()=>{
        setSelectedAnswer(null);
        setShowResult(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full min-h-[500px] rounded-lg overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: image,
                    alt: "Scenario",
                    fill: true,
                    className: "object-cover"
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ScenarioBlock.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ScenarioBlock.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 flex flex-col justify-end p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-lg p-4 shadow-lg relative inline-block max-w-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -top-2 left-8 w-4 h-4 bg-white transform rotate-45"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/ScenarioBlock.tsx",
                                        lineNumber: 67,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg font-medium text-gray-900 relative z-10",
                                        children: question
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/ScenarioBlock.tsx",
                                        lineNumber: 68,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/blocks/ScenarioBlock.tsx",
                                lineNumber: 66,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/ScenarioBlock.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: sortedAnswers.map((answer)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>!showResult && handleAnswer(answer.id),
                                    disabled: showResult,
                                    className: `w-full p-3 rounded-lg border-2 text-left transition-all backdrop-blur-sm ${getAnswerStyle(answer)} ${!showResult ? 'cursor-pointer' : 'cursor-default'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium",
                                            children: answer.text
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/ScenarioBlock.tsx",
                                            lineNumber: 85,
                                            columnNumber: 17
                                        }, this),
                                        showResult && selectedAnswer === answer.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-2",
                                            children: answer.isCorrect ? '✓' : '✗'
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/ScenarioBlock.tsx",
                                            lineNumber: 87,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, answer.id, true, {
                                    fileName: "[project]/app/components/blocks/ScenarioBlock.tsx",
                                    lineNumber: 77,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/ScenarioBlock.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this),
                        showResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: reset,
                            className: "mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors self-start",
                            children: "Try Again"
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/ScenarioBlock.tsx",
                            lineNumber: 96,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/blocks/ScenarioBlock.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/blocks/ScenarioBlock.tsx",
            lineNumber: 58,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/ScenarioBlock.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_s(ScenarioBlock, "s8wXhhFN5WYBxDL6WPWXfwzqtII=");
_c = ScenarioBlock;
var _c;
__turbopack_context__.k.register(_c, "ScenarioBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/SortingBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SortingBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grip-vertical.js [app-client] (ecmascript) <export default as GripVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down.js [app-client] (ecmascript) <export default as ArrowDown>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function SortingBlock({ cards: initialCards, categories, dark = false }) {
    _s();
    const [deckCards, setDeckCards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialCards);
    const [categoryCards, setCategoryCards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "SortingBlock.useState": ()=>{
            const initial = {};
            categories.forEach({
                "SortingBlock.useState": (cat)=>{
                    initial[cat.id] = [];
                }
            }["SortingBlock.useState"]);
            return initial;
        }
    }["SortingBlock.useState"]);
    const [draggedCard, setDraggedCard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hoveredCategory, setHoveredCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [wrongMatch, setWrongMatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [correctCount, setCorrectCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const totalCards = initialCards.length;
    // Current card is the top card of the deck
    const currentCard = deckCards.length > 0 ? deckCards[0] : null;
    const handleDragStart = (e, card)=>{
        setDraggedCard(card);
        e.dataTransfer.effectAllowed = 'move';
    };
    const handleDragOver = (e, categoryId)=>{
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setHoveredCategory(categoryId);
    };
    const handleDragLeave = ()=>{
        setHoveredCategory(null);
    };
    const handleDrop = (e, categoryId)=>{
        e.preventDefault();
        setHoveredCategory(null);
        if (!draggedCard) return;
        if (draggedCard.correctCategory === categoryId) {
            // Correct match - remove card from deck and add to category
            setDeckCards((prev)=>prev.filter((c)=>c.id !== draggedCard.id));
            setCategoryCards((prev)=>({
                    ...prev,
                    [categoryId]: [
                        ...prev[categoryId],
                        draggedCard
                    ]
                }));
            setCorrectCount((prev)=>prev + 1);
        } else {
            // Wrong match - shake and show red
            setWrongMatch({
                cardId: draggedCard.id,
                categoryId
            });
            setTimeout(()=>setWrongMatch(null), 800);
        }
        setDraggedCard(null);
    };
    const handleDragEnd = ()=>{
        setDraggedCard(null);
        setHoveredCategory(null);
    };
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SortingBlock.useCallback[reset]": ()=>{
            setDeckCards(initialCards);
            setCategoryCards({
                "SortingBlock.useCallback[reset]": ()=>{
                    const initial = {};
                    categories.forEach({
                        "SortingBlock.useCallback[reset]": (cat)=>{
                            initial[cat.id] = [];
                        }
                    }["SortingBlock.useCallback[reset]"]);
                    return initial;
                }
            }["SortingBlock.useCallback[reset]"]);
            setCorrectCount(0);
            setWrongMatch(null);
            setDraggedCard(null);
        }
    }["SortingBlock.useCallback[reset]"], [
        initialCards,
        categories
    ]);
    const isCompleted = deckCards.length === 0;
    // Generate random rotation angles for stacked cards (pre-calculated for consistency)
    const getCardRotation = (index, total)=>{
        const baseRotations = [
            -3,
            2,
            -1.5,
            3,
            -2,
            1.5,
            -2.5,
            2.5
        ];
        return baseRotations[index % baseRotations.length];
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-c4ccf8f4e7892bdd" + " " + `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "c4ccf8f4e7892bdd",
                children: "@keyframes shake{0%,to{transform:translate(0)rotate(0)}25%{transform:translate(-8px)rotate(-2deg)}75%{transform:translate(8px)rotate(2deg)}}.animate-shake.jsx-c4ccf8f4e7892bdd{animation:.4s ease-in-out shake}"
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-c4ccf8f4e7892bdd" + " " + "flex items-center justify-center mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-c4ccf8f4e7892bdd" + " " + `inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${dark ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-primary/10 text-primary border border-primary/20'}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__["GripVertical"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                            lineNumber: 133,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "jsx-c4ccf8f4e7892bdd",
                            children: "Drag cards to the correct category"
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                            lineNumber: 134,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                            lineNumber: 135,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                    lineNumber: 126,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-c4ccf8f4e7892bdd" + " " + `mb-4 text-sm font-medium text-center ${dark ? 'text-gray-400' : 'text-gray-600'}`,
                children: [
                    "Sorted: ",
                    correctCount,
                    " / ",
                    totalCards
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-c4ccf8f4e7892bdd" + " " + "flex justify-center mb-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: '160px',
                        height: '224px'
                    },
                    className: "jsx-c4ccf8f4e7892bdd" + " " + "relative",
                    children: deckCards.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            deckCards.slice(1, 5).reverse().map((card, index)=>{
                                const actualIndex = Math.min(4, deckCards.length - 1) - index - 1;
                                const rotation = getCardRotation(actualIndex, deckCards.length);
                                const offset = (actualIndex + 1) * 2;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        transform: `rotate(${rotation}deg) translateY(${offset}px)`,
                                        zIndex: 10 - actualIndex
                                    },
                                    className: "jsx-c4ccf8f4e7892bdd" + " " + `absolute inset-0 rounded-xl border-2 ${dark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200 shadow-sm'}`
                                }, card.id, false, {
                                    fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                                    lineNumber: 161,
                                    columnNumber: 19
                                }, this);
                            }),
                            currentCard && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                draggable: true,
                                onDragStart: (e)=>handleDragStart(e, currentCard),
                                onDragEnd: handleDragEnd,
                                style: {
                                    zIndex: 20
                                },
                                className: "jsx-c4ccf8f4e7892bdd" + " " + `absolute inset-0 rounded-xl border-2 cursor-grab active:cursor-grabbing transition-all select-none flex flex-col items-center justify-center p-4 text-center ${draggedCard?.id === currentCard.id ? 'opacity-50 scale-95' : wrongMatch?.cardId === currentCard.id ? 'border-red-500 bg-red-50 animate-shake' : dark ? 'bg-gray-700 border-gray-500 hover:border-primary hover:bg-primary/10 text-white hover:shadow-lg hover:scale-[1.02]' : 'bg-white border-gray-300 hover:border-primary hover:bg-primary/5 shadow-md hover:shadow-xl hover:scale-[1.02]'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-c4ccf8f4e7892bdd" + " " + `font-semibold text-base ${wrongMatch?.cardId === currentCard.id ? 'text-red-700' : ''}`,
                                        children: currentCard.title
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                                        lineNumber: 195,
                                        columnNumber: 19
                                    }, this),
                                    currentCard.content && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-c4ccf8f4e7892bdd" + " " + `text-sm mt-2 ${wrongMatch?.cardId === currentCard.id ? 'text-red-600' : dark ? 'text-gray-400' : 'text-gray-500'}`,
                                        children: currentCard.content
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                                        lineNumber: 199,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-c4ccf8f4e7892bdd" + " " + `absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${dark ? 'bg-gray-600 text-gray-200 border-2 border-gray-800' : 'bg-gray-100 text-gray-600 border-2 border-white shadow'}`,
                                        children: deckCards.length
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                                        lineNumber: 213,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                                lineNumber: 178,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-c4ccf8f4e7892bdd" + " " + `absolute inset-0 rounded-xl border-2 border-dashed flex items-center justify-center ${dark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-300'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-c4ccf8f4e7892bdd" + " " + "flex flex-col items-center gap-2 text-green-600",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                    className: "w-8 h-8"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                                    lineNumber: 232,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-c4ccf8f4e7892bdd" + " " + "font-medium text-sm",
                                    children: "Done!"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                                    lineNumber: 233,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                            lineNumber: 231,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                        lineNumber: 226,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                    lineNumber: 146,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-c4ccf8f4e7892bdd" + " " + `grid gap-6 ${categories.length === 2 ? 'grid-cols-2' : categories.length === 3 ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}`,
                children: categories.map((category)=>{
                    const cardsInCategory = categoryCards[category.id] || [];
                    const isHovered = hoveredCategory === category.id;
                    const isWrong = wrongMatch?.categoryId === category.id;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-c4ccf8f4e7892bdd" + " " + "flex flex-col items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "jsx-c4ccf8f4e7892bdd" + " " + `font-semibold text-center mb-3 px-4 py-1 rounded-full text-sm ${isHovered ? 'bg-primary text-white' : isWrong ? 'bg-red-500 text-white' : dark ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'}`,
                                children: category.title
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                                lineNumber: 250,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onDragOver: (e)=>handleDragOver(e, category.id),
                                onDragLeave: handleDragLeave,
                                onDrop: (e)=>handleDrop(e, category.id),
                                style: {
                                    width: '120px',
                                    height: '168px'
                                },
                                className: "jsx-c4ccf8f4e7892bdd" + " " + "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-c4ccf8f4e7892bdd" + " " + `absolute inset-0 rounded-xl border-2 transition-all ${isHovered ? 'border-primary border-solid bg-primary/10 scale-105' : isWrong ? 'border-red-500 bg-red-50' : cardsInCategory.length > 0 ? 'border-transparent' : dark ? 'border-dashed border-gray-600 bg-gray-800/50' : 'border-dashed border-gray-300 bg-gray-50'}`
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                                        lineNumber: 276,
                                        columnNumber: 17
                                    }, this),
                                    cardsInCategory.map((card, index)=>{
                                        const rotation = getCardRotation(index, cardsInCategory.length);
                                        const offset = index * 2;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                transform: `rotate(${rotation}deg) translateY(${offset}px)`,
                                                zIndex: index + 1
                                            },
                                            className: "jsx-c4ccf8f4e7892bdd" + " " + `absolute inset-0 rounded-xl border-2 flex items-center justify-center p-2 ${dark ? 'bg-gray-700 border-gray-500' : 'bg-white border-gray-300 shadow-sm'}`,
                                            children: index === cardsInCategory.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-c4ccf8f4e7892bdd" + " " + `text-xs font-medium text-center ${dark ? 'text-gray-300' : 'text-gray-600'}`,
                                                children: card.title
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                                                lineNumber: 308,
                                                columnNumber: 25
                                            }, this)
                                        }, card.id, false, {
                                            fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                                            lineNumber: 295,
                                            columnNumber: 21
                                        }, this);
                                    }),
                                    cardsInCategory.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-c4ccf8f4e7892bdd" + " " + `absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-50 ${dark ? 'bg-green-600 text-white border-2 border-gray-800' : 'bg-green-500 text-white border-2 border-white shadow'}`,
                                        children: cardsInCategory.length
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                                        lineNumber: 318,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                                lineNumber: 265,
                                columnNumber: 15
                            }, this)
                        ]
                    }, category.id, true, {
                        fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                        lineNumber: 248,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                lineNumber: 241,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-c4ccf8f4e7892bdd" + " " + "flex items-center justify-center gap-4 mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: reset,
                        className: "jsx-c4ccf8f4e7892bdd" + " " + `px-6 py-2 rounded-lg transition-colors ${dark ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`,
                        children: "Reset"
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                        lineNumber: 336,
                        columnNumber: 9
                    }, this),
                    isCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-c4ccf8f4e7892bdd" + " " + "flex items-center gap-2 text-green-600",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                                lineNumber: 348,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-c4ccf8f4e7892bdd" + " " + "font-medium",
                                children: "All cards sorted!"
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                                lineNumber: 349,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                        lineNumber: 347,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/SortingBlock.tsx",
                lineNumber: 335,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/SortingBlock.tsx",
        lineNumber: 112,
        columnNumber: 5
    }, this);
}
_s(SortingBlock, "hBvVloc/jivGv+XtBw96BRI8TxA=");
_c = SortingBlock;
var _c;
__turbopack_context__.k.register(_c, "SortingBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/SortingStepsBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SortingStepsBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grip-vertical.js [app-client] (ecmascript) <export default as GripVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function SortingStepsBlock({ items: initialItems = [], dark = false }) {
    _s();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialItems || []);
    const [draggedIndex, setDraggedIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showResult, setShowResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Handle empty or missing items
    if (!items || items.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-full p-4 rounded-lg ${dark ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-500'}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "No items to sort"
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/SortingStepsBlock.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/SortingStepsBlock.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this);
    }
    const isCorrectOrder = ()=>{
        return items.every((item, index)=>item.correctOrder === index + 1);
    };
    const handleDragStart = (index)=>{
        setDraggedIndex(index);
    };
    const handleDragOver = (e, index)=>{
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;
        const newItems = [
            ...items
        ];
        const draggedItem = newItems[draggedIndex];
        newItems.splice(draggedIndex, 1);
        newItems.splice(index, 0, draggedItem);
        setItems(newItems);
        setDraggedIndex(index);
    };
    const handleDragEnd = ()=>{
        setDraggedIndex(null);
    };
    const checkOrder = ()=>{
        setShowResult(true);
    };
    const reset = ()=>{
        setItems(initialItems || []);
        setShowResult(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        draggable: true,
                        onDragStart: ()=>handleDragStart(index),
                        onDragOver: (e)=>handleDragOver(e, index),
                        onDragEnd: handleDragEnd,
                        className: `flex items-center gap-3 p-4 border-2 rounded-lg cursor-move transition-all ${draggedIndex === index ? 'opacity-50 scale-105' : ''} ${showResult ? item.correctOrder === index + 1 ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50' : dark ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__["GripVertical"], {
                                className: `w-5 h-5 flex-shrink-0 ${dark ? 'text-gray-500' : 'text-gray-400'}`
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/SortingStepsBlock.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `font-medium ${showResult ? 'text-gray-900' : dark ? 'text-white' : 'text-gray-900'}`,
                                        children: item.title
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/SortingStepsBlock.tsx",
                                        lineNumber: 89,
                                        columnNumber: 15
                                    }, this),
                                    item.content && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `text-sm mt-1 ${showResult ? 'text-gray-600' : dark ? 'text-gray-400' : 'text-gray-600'}`,
                                        children: item.content
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/SortingStepsBlock.tsx",
                                        lineNumber: 91,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/blocks/SortingStepsBlock.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this),
                            showResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-shrink-0",
                                children: item.correctOrder === index + 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                    className: "w-5 h-5 text-green-600"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/SortingStepsBlock.tsx",
                                    lineNumber: 97,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-5 h-5 text-red-600"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/SortingStepsBlock.tsx",
                                    lineNumber: 99,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/SortingStepsBlock.tsx",
                                lineNumber: 95,
                                columnNumber: 15
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/app/components/blocks/SortingStepsBlock.tsx",
                        lineNumber: 69,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/SortingStepsBlock.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4 mt-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: checkOrder,
                        className: "px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors",
                        children: "Check Order"
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/SortingStepsBlock.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: reset,
                        className: `px-6 py-2 rounded-lg transition-colors ${dark ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`,
                        children: "Reset"
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/SortingStepsBlock.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    showResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: isCorrectOrder() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                    className: "w-5 h-5 text-green-600"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/SortingStepsBlock.tsx",
                                    lineNumber: 124,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-green-600 font-medium",
                                    children: "Correct!"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/SortingStepsBlock.tsx",
                                    lineNumber: 125,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-5 h-5 text-red-600"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/SortingStepsBlock.tsx",
                                    lineNumber: 129,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-red-600 font-medium",
                                    children: "Try again!"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/SortingStepsBlock.tsx",
                                    lineNumber: 130,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/SortingStepsBlock.tsx",
                        lineNumber: 121,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/SortingStepsBlock.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/SortingStepsBlock.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_s(SortingStepsBlock, "+hoqYD+7gH2F2mV5gcqZOyRbS+w=");
_c = SortingStepsBlock;
var _c;
__turbopack_context__.k.register(_c, "SortingStepsBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/FlashCardBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FlashCardBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function FlashCardBlock({ items, textStyle = {}, textBackgroundStyle = {}, dark = false }) {
    _s();
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isFlipped, setIsFlipped] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const currentCard = items[currentIndex];
    const goToPrevious = ()=>{
        setCurrentIndex((prev)=>prev === 0 ? items.length - 1 : prev - 1);
        setIsFlipped(false);
    };
    const goToNext = ()=>{
        setCurrentIndex((prev)=>prev === items.length - 1 ? 0 : prev + 1);
        setIsFlipped(false);
    };
    const flipCard = ()=>{
        setIsFlipped((prev)=>!prev);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`,
        style: {
            backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : undefined),
            padding: textBackgroundStyle.padding,
            borderRadius: textBackgroundStyle.borderRadius
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative h-64 perspective-1000",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `absolute inset-0 transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`,
                        style: {
                            transformStyle: 'preserve-3d',
                            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-gradient-to-br from-primary to-primary-dark rounded-xl shadow-lg flex flex-col items-center justify-center p-8 backface-hidden",
                                style: {
                                    backfaceVisibility: 'hidden'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center flex-1 flex flex-col items-center justify-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-white/70 mb-2 block",
                                                children: "Question"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/blocks/FlashCardBlock.tsx",
                                                lineNumber: 74,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xl text-white font-medium",
                                                style: {
                                                    fontSize: textStyle.fontSize || '20px',
                                                    lineHeight: textStyle.lineHeight || '1.5'
                                                },
                                                children: currentCard.question
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/blocks/FlashCardBlock.tsx",
                                                lineNumber: 75,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/blocks/FlashCardBlock.tsx",
                                        lineNumber: 73,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: flipCard,
                                        className: "absolute bottom-4 right-4 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors hover:scale-110",
                                        "aria-label": "Flip card",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                            className: "w-5 h-5 text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/FlashCardBlock.tsx",
                                            lineNumber: 91,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/FlashCardBlock.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/blocks/FlashCardBlock.tsx",
                                lineNumber: 69,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `absolute inset-0 border-2 border-primary rounded-xl shadow-lg flex flex-col items-center justify-center p-8 ${dark ? 'bg-gray-800' : 'bg-white'}`,
                                style: {
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center flex-1 flex flex-col items-center justify-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `text-sm mb-2 block ${dark ? 'text-gray-400' : 'text-gray-500'}`,
                                                children: "Answer"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/blocks/FlashCardBlock.tsx",
                                                lineNumber: 104,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `text-xl font-medium ${dark ? 'text-white' : 'text-gray-800'}`,
                                                style: {
                                                    fontSize: textStyle.fontSize || '20px',
                                                    color: textStyle.color || (dark ? '#ffffff' : undefined),
                                                    lineHeight: textStyle.lineHeight || '1.5'
                                                },
                                                children: currentCard.answer
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/blocks/FlashCardBlock.tsx",
                                                lineNumber: 105,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/blocks/FlashCardBlock.tsx",
                                        lineNumber: 103,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: flipCard,
                                        className: `absolute bottom-4 right-4 p-3 rounded-full transition-colors hover:scale-110 ${dark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`,
                                        "aria-label": "Flip card",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                            className: `w-5 h-5 ${dark ? 'text-gray-300' : 'text-gray-600'}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/FlashCardBlock.tsx",
                                            lineNumber: 124,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/FlashCardBlock.tsx",
                                        lineNumber: 117,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/blocks/FlashCardBlock.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/FlashCardBlock.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/FlashCardBlock.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between mt-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: goToPrevious,
                            className: `p-3 rounded-full transition-colors ${dark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`,
                            "aria-label": "Previous card",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                className: `w-5 h-5 ${dark ? 'text-gray-300' : 'text-gray-600'}`
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/FlashCardBlock.tsx",
                                lineNumber: 137,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/FlashCardBlock.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: dark ? 'text-gray-400' : 'text-gray-500',
                            children: [
                                currentIndex + 1,
                                " / ",
                                items.length
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/blocks/FlashCardBlock.tsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: goToNext,
                            className: `p-3 rounded-full transition-colors ${dark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`,
                            "aria-label": "Next card",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                className: `w-5 h-5 ${dark ? 'text-gray-300' : 'text-gray-600'}`
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/FlashCardBlock.tsx",
                                lineNumber: 149,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/FlashCardBlock.tsx",
                            lineNumber: 144,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/blocks/FlashCardBlock.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/blocks/FlashCardBlock.tsx",
            lineNumber: 54,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/FlashCardBlock.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_s(FlashCardBlock, "09T0kIGwIlMVxtn2OuC5jDG6YJg=");
_c = FlashCardBlock;
var _c;
__turbopack_context__.k.register(_c, "FlashCardBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/MultipleChoiceBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MultipleChoiceBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function MultipleChoiceBlock({ items = [], question, textStyle = {}, textBackgroundStyle = {}, dark = false }) {
    _s();
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showResult, setShowResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Handle empty or missing items
    if (!items || items.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-full p-4 rounded-lg ${dark ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-500'}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "No options available"
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/MultipleChoiceBlock.tsx",
                lineNumber: 36,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/MultipleChoiceBlock.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this);
    }
    const handleSelect = (id)=>{
        if (showResult) return;
        setSelectedId(id);
        setShowResult(true);
    };
    const reset = ()=>{
        setSelectedId(null);
        setShowResult(false);
    };
    const getOptionStyle = (option)=>{
        if (!showResult) {
            return dark ? 'bg-gray-800 border-gray-700 hover:border-primary hover:bg-primary/10' : 'bg-white border-gray-200 hover:border-primary hover:bg-primary/5';
        }
        if (selectedId === option.id) {
            return option.isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500';
        }
        if (option.isCorrect) {
            return 'bg-green-50 border-green-300';
        }
        return dark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200';
    };
    const selectedOption = items.find((item)=>item.id === selectedId);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`,
        style: {
            backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : undefined),
            padding: textBackgroundStyle.padding,
            borderRadius: textBackgroundStyle.borderRadius
        },
        children: [
            question && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: `text-lg font-semibold mb-4 ${dark ? 'text-white' : ''}`,
                style: {
                    fontSize: textStyle.fontSize,
                    fontWeight: textStyle.fontWeight || '600',
                    color: textStyle.color || (dark ? '#ffffff' : undefined)
                },
                children: question
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/MultipleChoiceBlock.tsx",
                lineNumber: 81,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: items.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handleSelect(option.id),
                        disabled: showResult,
                        className: `w-full p-4 rounded-lg border-2 text-left transition-all flex items-center justify-between ${getOptionStyle(option)} ${!showResult ? 'cursor-pointer' : 'cursor-default'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: textStyle.fontSize,
                                    color: showResult ? undefined : textStyle.color || (dark ? '#d1d5db' : undefined),
                                    lineHeight: textStyle.lineHeight
                                },
                                children: option.text
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/MultipleChoiceBlock.tsx",
                                lineNumber: 103,
                                columnNumber: 13
                            }, this),
                            showResult && selectedId === option.id && (option.isCorrect ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                className: "w-5 h-5 text-green-600"
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/MultipleChoiceBlock.tsx",
                                lineNumber: 114,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-5 h-5 text-red-600"
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/MultipleChoiceBlock.tsx",
                                lineNumber: 116,
                                columnNumber: 17
                            }, this)),
                            showResult && option.isCorrect && selectedId !== option.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                className: "w-5 h-5 text-green-400"
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/MultipleChoiceBlock.tsx",
                                lineNumber: 120,
                                columnNumber: 15
                            }, this)
                        ]
                    }, option.id, true, {
                        fileName: "[project]/app/components/blocks/MultipleChoiceBlock.tsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/MultipleChoiceBlock.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            showResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex items-start gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: reset,
                        className: "px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors",
                        children: "Try Again"
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/MultipleChoiceBlock.tsx",
                        lineNumber: 128,
                        columnNumber: 11
                    }, this),
                    selectedOption?.feedback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex-1 p-3 rounded-lg ${selectedOption.isCorrect ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm",
                            children: selectedOption.feedback
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/MultipleChoiceBlock.tsx",
                            lineNumber: 142,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/MultipleChoiceBlock.tsx",
                        lineNumber: 135,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/MultipleChoiceBlock.tsx",
                lineNumber: 127,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/MultipleChoiceBlock.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
_s(MultipleChoiceBlock, "XF5Bk9Y6P/bs+SJJ39+ftXnn80E=");
_c = MultipleChoiceBlock;
var _c;
__turbopack_context__.k.register(_c, "MultipleChoiceBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/MultipleResponseBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MultipleResponseBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square.js [app-client] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-check-big.js [app-client] (ecmascript) <export default as CheckSquare>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function MultipleResponseBlock({ items, question, correctFeedback, incorrectFeedback, textStyle = {}, textBackgroundStyle = {}, dark = false }) {
    _s();
    const [selectedIds, setSelectedIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showResult, setShowResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const toggleOption = (id)=>{
        if (showResult) return;
        setSelectedIds((prev)=>prev.includes(id) ? prev.filter((i)=>i !== id) : [
                ...prev,
                id
            ]);
    };
    const checkAnswers = ()=>{
        setShowResult(true);
    };
    const reset = ()=>{
        setSelectedIds([]);
        setShowResult(false);
    };
    const getOptionStyle = (option)=>{
        const isSelected = selectedIds.includes(option.id);
        if (!showResult) {
            return isSelected ? 'bg-primary/10 border-primary' : dark ? 'bg-gray-800 border-gray-700 hover:border-primary hover:bg-primary/10' : 'bg-white border-gray-200 hover:border-primary hover:bg-primary/5';
        }
        if (isSelected && option.isCorrect) {
            return 'bg-green-50 border-green-500';
        }
        if (isSelected && !option.isCorrect) {
            return 'bg-red-50 border-red-500';
        }
        if (!isSelected && option.isCorrect) {
            return 'bg-yellow-50 border-yellow-500';
        }
        return dark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200';
    };
    const isAllCorrect = showResult && items.every((item)=>item.isCorrect && selectedIds.includes(item.id) || !item.isCorrect && !selectedIds.includes(item.id));
    const feedbackToShow = showResult ? isAllCorrect ? correctFeedback : incorrectFeedback : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`,
        style: {
            backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : undefined),
            padding: textBackgroundStyle.padding,
            borderRadius: textBackgroundStyle.borderRadius
        },
        children: [
            question && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: `text-lg font-semibold mb-2 ${dark ? 'text-white' : ''}`,
                style: {
                    fontSize: textStyle.fontSize,
                    fontWeight: textStyle.fontWeight || '600',
                    color: textStyle.color || (dark ? '#ffffff' : undefined)
                },
                children: question
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/MultipleResponseBlock.tsx",
                lineNumber: 96,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `text-sm mb-4 ${dark ? 'text-gray-400' : 'text-gray-500'}`,
                children: "Select all that apply"
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/MultipleResponseBlock.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: items.map((option)=>{
                    const isSelected = selectedIds.includes(option.id);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>toggleOption(option.id),
                        disabled: showResult,
                        className: `w-full p-4 rounded-lg border-2 text-left transition-all flex items-center gap-3 ${getOptionStyle(option)} ${!showResult ? 'cursor-pointer' : 'cursor-default'}`,
                        children: [
                            !showResult ? isSelected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__["CheckSquare"], {
                                className: "w-5 h-5 text-primary flex-shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/MultipleResponseBlock.tsx",
                                lineNumber: 124,
                                columnNumber: 19
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                                className: "w-5 h-5 text-gray-400 flex-shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/MultipleResponseBlock.tsx",
                                lineNumber: 126,
                                columnNumber: 19
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-5 h-5 flex-shrink-0",
                                children: [
                                    isSelected && option.isCorrect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        className: "w-5 h-5 text-green-600"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/MultipleResponseBlock.tsx",
                                        lineNumber: 130,
                                        columnNumber: 54
                                    }, this),
                                    isSelected && !option.isCorrect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-5 h-5 text-red-600"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/MultipleResponseBlock.tsx",
                                        lineNumber: 131,
                                        columnNumber: 55
                                    }, this),
                                    !isSelected && option.isCorrect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        className: "w-5 h-5 text-yellow-600"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/blocks/MultipleResponseBlock.tsx",
                                        lineNumber: 132,
                                        columnNumber: 55
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/blocks/MultipleResponseBlock.tsx",
                                lineNumber: 129,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: textStyle.fontSize,
                                    color: showResult ? undefined : textStyle.color || (dark ? '#d1d5db' : undefined),
                                    lineHeight: textStyle.lineHeight
                                },
                                children: option.text
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/MultipleResponseBlock.tsx",
                                lineNumber: 135,
                                columnNumber: 15
                            }, this)
                        ]
                    }, option.id, true, {
                        fileName: "[project]/app/components/blocks/MultipleResponseBlock.tsx",
                        lineNumber: 114,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/MultipleResponseBlock.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-4 mt-4",
                children: !showResult ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: checkAnswers,
                    disabled: selectedIds.length === 0,
                    className: "px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                    children: "Check Answers"
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/MultipleResponseBlock.tsx",
                    lineNumber: 151,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: reset,
                            className: "px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors",
                            children: "Try Again"
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/MultipleResponseBlock.tsx",
                            lineNumber: 160,
                            columnNumber: 13
                        }, this),
                        feedbackToShow ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex-1 p-3 rounded-lg ${isAllCorrect ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm",
                                children: feedbackToShow
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/MultipleResponseBlock.tsx",
                                lineNumber: 174,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/MultipleResponseBlock.tsx",
                            lineNumber: 167,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `font-medium py-2 ${isAllCorrect ? 'text-green-600' : 'text-red-600'}`,
                            children: isAllCorrect ? 'All correct!' : 'Some answers are incorrect'
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/MultipleResponseBlock.tsx",
                            lineNumber: 177,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/app/components/blocks/MultipleResponseBlock.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/MultipleResponseBlock.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
_s(MultipleResponseBlock, "ykZ3T5GnZKCdYyRQo8rt84ChcRA=");
_c = MultipleResponseBlock;
var _c;
__turbopack_context__.k.register(_c, "MultipleResponseBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/FillInTheBlankBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FillInTheBlankBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
// Function to normalize text for comparison (remove accents, lowercase)
const normalizeText = (text)=>{
    return text.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Remove diacritics/accents
};
function FillInTheBlankBlock({ items, textStyle = {}, textBackgroundStyle = {}, placeholder = '___', dark = false }) {
    _s();
    const [answers, setAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [showResults, setShowResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const handleInputChange = (id, value)=>{
        setAnswers((prev)=>({
                ...prev,
                [id]: value
            }));
        setShowResults((prev)=>({
                ...prev,
                [id]: false
            }));
    };
    const checkAnswer = (id)=>{
        setShowResults((prev)=>({
                ...prev,
                [id]: true
            }));
    };
    const isCorrect = (item)=>{
        const userAnswer = normalizeText(answers[item.id] || '');
        return item.answers.some((correctAnswer)=>normalizeText(correctAnswer) === userAnswer);
    };
    const renderTextWithBlank = (item)=>{
        const parts = item.text.split(placeholder);
        const showResult = showResults[item.id];
        const correct = isCorrect(item);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap items-center gap-2",
            children: parts.map((part, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: textStyle.fontSize,
                                color: textStyle.color || (dark ? '#d1d5db' : undefined),
                                lineHeight: textStyle.lineHeight
                            },
                            children: part
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/FillInTheBlankBlock.tsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, this),
                        index < parts.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: answers[item.id] || '',
                                    onChange: (e)=>handleInputChange(item.id, e.target.value),
                                    onKeyDown: (e)=>e.key === 'Enter' && checkAnswer(item.id),
                                    className: `w-32 px-3 py-1 border-2 rounded-lg outline-none transition-colors ${showResult ? correct ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50' : dark ? 'border-gray-600 bg-gray-700 text-white focus:border-primary' : 'border-gray-300 focus:border-primary'}`,
                                    placeholder: "Type answer",
                                    disabled: showResult && correct
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/FillInTheBlankBlock.tsx",
                                    lineNumber: 74,
                                    columnNumber: 17
                                }, this),
                                !showResult && answers[item.id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>checkAnswer(item.id),
                                    className: "px-3 py-1 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark transition-colors",
                                    children: "Check"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/FillInTheBlankBlock.tsx",
                                    lineNumber: 92,
                                    columnNumber: 19
                                }, this),
                                showResult && (correct ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                    className: "w-5 h-5 text-green-600"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/FillInTheBlankBlock.tsx",
                                    lineNumber: 101,
                                    columnNumber: 21
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-5 h-5 text-red-600"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/FillInTheBlankBlock.tsx",
                                            lineNumber: 104,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-gray-500",
                                            children: [
                                                "Correct: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: item.answers[0]
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/blocks/FillInTheBlankBlock.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 34
                                                }, this),
                                                item.answers.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-gray-400 ml-1",
                                                    children: [
                                                        "(or: ",
                                                        item.answers.slice(1).join(', '),
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/blocks/FillInTheBlankBlock.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/blocks/FillInTheBlankBlock.tsx",
                                            lineNumber: 105,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/blocks/FillInTheBlankBlock.tsx",
                                    lineNumber: 103,
                                    columnNumber: 21
                                }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/blocks/FillInTheBlankBlock.tsx",
                            lineNumber: 73,
                            columnNumber: 15
                        }, this)
                    ]
                }, index, true, {
                    fileName: "[project]/app/components/blocks/FillInTheBlankBlock.tsx",
                    lineNumber: 62,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/FillInTheBlankBlock.tsx",
            lineNumber: 60,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`,
        style: {
            backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : undefined),
            padding: textBackgroundStyle.padding,
            borderRadius: textBackgroundStyle.borderRadius
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `p-4 rounded-lg border ${dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`,
                    children: renderTextWithBlank(item)
                }, item.id, false, {
                    fileName: "[project]/app/components/blocks/FillInTheBlankBlock.tsx",
                    lineNumber: 135,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/FillInTheBlankBlock.tsx",
            lineNumber: 133,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/FillInTheBlankBlock.tsx",
        lineNumber: 125,
        columnNumber: 5
    }, this);
}
_s(FillInTheBlankBlock, "EBHtiedO3NlfekaZFYOHcR3yGgg=");
_c = FillInTheBlankBlock;
var _c;
__turbopack_context__.k.register(_c, "FillInTheBlankBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/MatchingPairsBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MatchingPairsBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const MATCH_COLORS = [
    {
        bg: 'bg-green-100',
        border: 'border-green-500',
        text: 'text-green-800',
        badge: 'bg-green-500'
    },
    {
        bg: 'bg-blue-100',
        border: 'border-blue-500',
        text: 'text-blue-800',
        badge: 'bg-blue-500'
    },
    {
        bg: 'bg-amber-100',
        border: 'border-amber-500',
        text: 'text-amber-800',
        badge: 'bg-amber-500'
    },
    {
        bg: 'bg-violet-100',
        border: 'border-violet-500',
        text: 'text-violet-800',
        badge: 'bg-violet-500'
    },
    {
        bg: 'bg-pink-100',
        border: 'border-pink-500',
        text: 'text-pink-800',
        badge: 'bg-pink-500'
    },
    {
        bg: 'bg-teal-100',
        border: 'border-teal-500',
        text: 'text-teal-800',
        badge: 'bg-teal-500'
    },
    {
        bg: 'bg-orange-100',
        border: 'border-orange-500',
        text: 'text-orange-800',
        badge: 'bg-orange-500'
    },
    {
        bg: 'bg-cyan-100',
        border: 'border-cyan-500',
        text: 'text-cyan-800',
        badge: 'bg-cyan-500'
    }
];
function MatchingPairsBlock({ itemsA, itemsB, textStyle = {}, textBackgroundStyle = {}, dark = false }) {
    _s();
    const [matches, setMatches] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showResults, setShowResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [draggedItem, setDraggedItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dragOverItem, setDragOverItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedItem, setSelectedItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [wrongMatch, setWrongMatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const isMatched = (id, side)=>{
        return matches.some((m)=>side === 'A' ? m.aId === id : m.bId === id);
    };
    const getMatchForItem = (id, side)=>{
        return matches.find((m)=>side === 'A' ? m.aId === id : m.bId === id);
    };
    const getMatchColor = (id, side)=>{
        const match = getMatchForItem(id, side);
        if (match) {
            return MATCH_COLORS[match.colorIndex % MATCH_COLORS.length];
        }
        return null;
    };
    const getMatchNumber = (id, side)=>{
        const matchIndex = matches.findIndex((m)=>side === 'A' ? m.aId === id : m.bId === id);
        return matchIndex >= 0 ? matchIndex + 1 : null;
    };
    const handleDragStart = (e, id, side)=>{
        if (isMatched(id, side) || showResults) {
            e.preventDefault();
            return;
        }
        setDraggedItem({
            id,
            side
        });
        e.dataTransfer.effectAllowed = 'move';
    };
    const handleDragOver = (e)=>{
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };
    const handleDragEnter = (e, id, side)=>{
        e.preventDefault();
        // Only highlight if dragging from opposite side and target is not matched
        if (draggedItem && draggedItem.side !== side && !isMatched(id, side)) {
            setDragOverItem({
                id,
                side
            });
        }
    };
    const handleDragLeave = (e)=>{
        e.preventDefault();
        // Only clear if leaving the actual element (not entering a child)
        const relatedTarget = e.relatedTarget;
        const currentTarget = e.currentTarget;
        if (!currentTarget.contains(relatedTarget)) {
            setDragOverItem(null);
        }
    };
    const handleDrop = (e, targetId, targetSide)=>{
        e.preventDefault();
        if (!draggedItem || draggedItem.side === targetSide || isMatched(targetId, targetSide)) {
            setDraggedItem(null);
            return;
        }
        const aId = draggedItem.side === 'A' ? draggedItem.id : targetId;
        const bId = draggedItem.side === 'B' ? draggedItem.id : targetId;
        const itemA = itemsA.find((i)=>i.id === aId);
        const itemB = itemsB.find((i)=>i.id === bId);
        if (itemA && itemB) {
            if (itemA.matchingNumber === itemB.matchingNumber) {
                setMatches((prev)=>[
                        ...prev,
                        {
                            aId,
                            bId,
                            colorIndex: prev.length
                        }
                    ]);
            } else {
                setWrongMatch({
                    aId,
                    bId
                });
                setTimeout(()=>setWrongMatch(null), 800);
            }
        }
        setDraggedItem(null);
        setDragOverItem(null);
    };
    const handleDragEnd = ()=>{
        setDraggedItem(null);
        setDragOverItem(null);
    };
    const handleClick = (id, side)=>{
        if (isMatched(id, side) || showResults) return;
        if (!selectedItem) {
            setSelectedItem({
                id,
                side
            });
            return;
        }
        if (selectedItem.id === id && selectedItem.side === side) {
            setSelectedItem(null);
            return;
        }
        if (selectedItem.side === side) {
            setSelectedItem({
                id,
                side
            });
            return;
        }
        const aId = selectedItem.side === 'A' ? selectedItem.id : id;
        const bId = selectedItem.side === 'B' ? selectedItem.id : id;
        const itemA = itemsA.find((i)=>i.id === aId);
        const itemB = itemsB.find((i)=>i.id === bId);
        if (itemA && itemB) {
            if (itemA.matchingNumber === itemB.matchingNumber) {
                setMatches((prev)=>[
                        ...prev,
                        {
                            aId,
                            bId,
                            colorIndex: prev.length
                        }
                    ]);
            } else {
                setWrongMatch({
                    aId,
                    bId
                });
                setTimeout(()=>setWrongMatch(null), 800);
            }
        }
        setSelectedItem(null);
    };
    const getItemStyle = (id, side)=>{
        const matchColor = getMatchColor(id, side);
        const isDragging = draggedItem?.id === id && draggedItem?.side === side;
        const isDragOver = dragOverItem?.id === id && dragOverItem?.side === side;
        const isSelected = selectedItem?.id === id && selectedItem?.side === side;
        const isWrong = wrongMatch && (side === 'A' && wrongMatch.aId === id || side === 'B' && wrongMatch.bId === id);
        if (isWrong) {
            return 'bg-red-100 border-red-500 text-red-800 animate-shake';
        }
        if (matchColor) {
            return `${matchColor.bg} ${matchColor.border} ${matchColor.text}`;
        }
        if (isDragOver) {
            return dark ? 'bg-primary/20 border-primary border-dashed text-gray-200 ring-2 ring-primary ring-offset-2 ring-offset-gray-900 scale-[1.02]' : 'bg-primary/10 border-primary border-dashed ring-2 ring-primary ring-offset-2 scale-[1.02]';
        }
        if (isSelected) {
            return 'bg-blue-100 border-blue-500 text-blue-800 ring-2 ring-blue-300 ring-offset-1';
        }
        if (isDragging) {
            return dark ? 'bg-gray-700 border-dashed border-gray-500 opacity-60 scale-95' : 'bg-gray-100 border-dashed border-gray-400 opacity-60 scale-95';
        }
        return dark ? 'bg-gray-800 border-gray-700 hover:border-primary hover:bg-primary/10 text-gray-200 cursor-grab active:cursor-grabbing' : 'bg-white border-gray-200 hover:border-primary hover:bg-primary/5 cursor-grab active:cursor-grabbing';
    };
    const reset = ()=>{
        setMatches([]);
        setShowResults(false);
        setWrongMatch(null);
        setSelectedItem(null);
    };
    const checkAllMatches = ()=>{
        setShowResults(true);
    };
    const allCorrect = matches.length === itemsA.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : undefined),
            padding: textBackgroundStyle.padding,
            borderRadius: textBackgroundStyle.borderRadius
        },
        className: "jsx-3db0a34326f26132" + " " + `w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "3db0a34326f26132",
                children: "@keyframes shake{0%,to{transform:translate(0)}25%{transform:translate(-5px)}75%{transform:translate(5px)}}.animate-shake.jsx-3db0a34326f26132{animation:.4s ease-in-out shake}"
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-3db0a34326f26132" + " " + "grid grid-cols-2 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-3db0a34326f26132" + " " + "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "jsx-3db0a34326f26132" + " " + `font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`,
                                children: "Column A"
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/MatchingPairsBlock.tsx",
                                lineNumber: 240,
                                columnNumber: 11
                            }, this),
                            itemsA.map((item)=>{
                                const matchNumber = getMatchNumber(item.id, 'A');
                                const matchColor = getMatchColor(item.id, 'A');
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    draggable: !isMatched(item.id, 'A') && !showResults,
                                    onDragStart: (e)=>handleDragStart(e, item.id, 'A'),
                                    onDragOver: handleDragOver,
                                    onDragEnter: (e)=>handleDragEnter(e, item.id, 'A'),
                                    onDragLeave: handleDragLeave,
                                    onDrop: (e)=>handleDrop(e, item.id, 'A'),
                                    onDragEnd: handleDragEnd,
                                    onClick: ()=>handleClick(item.id, 'A'),
                                    className: "jsx-3db0a34326f26132" + " " + `w-full p-4 rounded-lg border-2 text-left transition-all select-none ${getItemStyle(item.id, 'A')} ${isMatched(item.id, 'A') || showResults ? 'cursor-default' : 'cursor-pointer'}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-3db0a34326f26132" + " " + "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: textStyle.fontSize,
                                                    color: isMatched(item.id, 'A') ? undefined : textStyle.color,
                                                    lineHeight: textStyle.lineHeight
                                                },
                                                className: "jsx-3db0a34326f26132",
                                                children: item.text
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/blocks/MatchingPairsBlock.tsx",
                                                lineNumber: 261,
                                                columnNumber: 19
                                            }, this),
                                            matchNumber && matchColor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-3db0a34326f26132" + " " + `${matchColor.badge} text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ml-2 flex-shrink-0`,
                                                children: matchNumber
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/blocks/MatchingPairsBlock.tsx",
                                                lineNumber: 271,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/blocks/MatchingPairsBlock.tsx",
                                        lineNumber: 260,
                                        columnNumber: 17
                                    }, this)
                                }, item.id, false, {
                                    fileName: "[project]/app/components/blocks/MatchingPairsBlock.tsx",
                                    lineNumber: 245,
                                    columnNumber: 15
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/MatchingPairsBlock.tsx",
                        lineNumber: 239,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-3db0a34326f26132" + " " + "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "jsx-3db0a34326f26132" + " " + `font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`,
                                children: "Column B"
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/MatchingPairsBlock.tsx",
                                lineNumber: 285,
                                columnNumber: 11
                            }, this),
                            itemsB.map((item)=>{
                                const matchNumber = getMatchNumber(item.id, 'B');
                                const matchColor = getMatchColor(item.id, 'B');
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    draggable: !isMatched(item.id, 'B') && !showResults,
                                    onDragStart: (e)=>handleDragStart(e, item.id, 'B'),
                                    onDragOver: handleDragOver,
                                    onDragEnter: (e)=>handleDragEnter(e, item.id, 'B'),
                                    onDragLeave: handleDragLeave,
                                    onDrop: (e)=>handleDrop(e, item.id, 'B'),
                                    onDragEnd: handleDragEnd,
                                    onClick: ()=>handleClick(item.id, 'B'),
                                    className: "jsx-3db0a34326f26132" + " " + `w-full p-4 rounded-lg border-2 text-left transition-all select-none ${getItemStyle(item.id, 'B')} ${isMatched(item.id, 'B') || showResults ? 'cursor-default' : 'cursor-pointer'}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-3db0a34326f26132" + " " + "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: textStyle.fontSize,
                                                    color: isMatched(item.id, 'B') ? undefined : textStyle.color,
                                                    lineHeight: textStyle.lineHeight
                                                },
                                                className: "jsx-3db0a34326f26132",
                                                children: item.text
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/blocks/MatchingPairsBlock.tsx",
                                                lineNumber: 306,
                                                columnNumber: 19
                                            }, this),
                                            matchNumber && matchColor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-3db0a34326f26132" + " " + `${matchColor.badge} text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ml-2 flex-shrink-0`,
                                                children: matchNumber
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/blocks/MatchingPairsBlock.tsx",
                                                lineNumber: 316,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/blocks/MatchingPairsBlock.tsx",
                                        lineNumber: 305,
                                        columnNumber: 17
                                    }, this)
                                }, item.id, false, {
                                    fileName: "[project]/app/components/blocks/MatchingPairsBlock.tsx",
                                    lineNumber: 290,
                                    columnNumber: 15
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/MatchingPairsBlock.tsx",
                        lineNumber: 284,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/MatchingPairsBlock.tsx",
                lineNumber: 237,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-3db0a34326f26132" + " " + "flex items-center gap-4 mt-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: reset,
                        className: "jsx-3db0a34326f26132" + " " + `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${dark ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/app/components/blocks/MatchingPairsBlock.tsx",
                                lineNumber: 334,
                                columnNumber: 11
                            }, this),
                            "Reset"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/blocks/MatchingPairsBlock.tsx",
                        lineNumber: 330,
                        columnNumber: 9
                    }, this),
                    matches.length === itemsA.length && !showResults && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: checkAllMatches,
                        className: "jsx-3db0a34326f26132" + " " + "px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors",
                        children: "Check Answers"
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/MatchingPairsBlock.tsx",
                        lineNumber: 339,
                        columnNumber: 11
                    }, this),
                    showResults && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-3db0a34326f26132" + " " + "flex items-center gap-2",
                        children: allCorrect ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                    className: "w-5 h-5 text-green-600"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/MatchingPairsBlock.tsx",
                                    lineNumber: 351,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-3db0a34326f26132" + " " + "font-medium text-green-600",
                                    children: "All matches correct!"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/MatchingPairsBlock.tsx",
                                    lineNumber: 352,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-5 h-5 text-red-600"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/MatchingPairsBlock.tsx",
                                    lineNumber: 356,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-3db0a34326f26132" + " " + "font-medium text-red-600",
                                    children: "Some matches are incorrect"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/MatchingPairsBlock.tsx",
                                    lineNumber: 357,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/app/components/blocks/MatchingPairsBlock.tsx",
                        lineNumber: 348,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/MatchingPairsBlock.tsx",
                lineNumber: 329,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "jsx-3db0a34326f26132" + " " + `text-sm mt-4 ${dark ? 'text-gray-400' : 'text-gray-500'}`,
                children: [
                    "Matched: ",
                    matches.length,
                    " / ",
                    itemsA.length
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/blocks/MatchingPairsBlock.tsx",
                lineNumber: 364,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/blocks/MatchingPairsBlock.tsx",
        lineNumber: 218,
        columnNumber: 5
    }, this);
}
_s(MatchingPairsBlock, "2zHUd1bX8h1PC/IViu2R5uSVzOU=");
_c = MatchingPairsBlock;
var _c;
__turbopack_context__.k.register(_c, "MatchingPairsBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ButtonBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ButtonBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
'use client';
;
;
const iconMap = {
    ArrowRight: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"],
    BookOpen: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
    Mail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"],
    ExternalLink: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"],
    Download: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"],
    Play: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"],
    Check: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"]
};
function ButtonBlock({ items, textStyle = {}, dark = false }) {
    const getButtonClasses = (style = 'primary', size = 'medium')=>{
        const styleClasses = {
            primary: 'bg-primary text-white hover:bg-primary-dark',
            secondary: 'bg-white text-primary border-2 border-primary hover:bg-primary/10',
            tertiary: 'bg-transparent text-primary hover:underline'
        }[style];
        const sizeClasses = {
            small: 'px-3 py-1.5 text-sm',
            medium: 'px-5 py-2.5 text-base',
            large: 'px-7 py-3.5 text-lg'
        }[size];
        return `${styleClasses} ${sizeClasses} rounded-lg font-medium transition-all inline-flex items-center gap-2`;
    };
    const getIconSize = (size = 'medium')=>{
        return ({
            small: 'w-4 h-4',
            medium: 'w-5 h-5',
            large: 'w-6 h-6'
        })[size];
    };
    const renderIcon = (iconName, size = 'medium')=>{
        const IconComponent = iconMap[iconName];
        if (!IconComponent) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
            className: getIconSize(size)
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/ButtonBlock.tsx",
            lineNumber: 77,
            columnNumber: 12
        }, this);
    };
    const getLayoutClasses = (layout = 'button-center')=>{
        return ({
            'button-left': 'flex-row',
            'button-right': 'flex-row-reverse',
            'button-center': 'flex-col items-center'
        })[layout];
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex items-center gap-4 ${getLayoutClasses(item.layout)}`,
                    children: [
                        item.label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: dark ? 'text-gray-400' : 'text-gray-600',
                            style: {
                                fontSize: textStyle.fontSize,
                                color: textStyle.color || (dark ? '#9ca3af' : undefined)
                            },
                            children: item.label
                        }, void 0, false, {
                            fileName: "[project]/app/components/blocks/ButtonBlock.tsx",
                            lineNumber: 97,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: item.url,
                            target: item.target || '_self',
                            rel: item.rel || (item.target === '_blank' ? 'noopener noreferrer' : undefined),
                            className: getButtonClasses(item.style, item.size),
                            children: [
                                item.icon && item.iconPosition === 'left' && renderIcon(item.icon, item.iconSize),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: item.text
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/ButtonBlock.tsx",
                                    lineNumber: 114,
                                    columnNumber: 15
                                }, this),
                                item.icon && item.iconPosition !== 'left' && renderIcon(item.icon, item.iconSize)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/blocks/ButtonBlock.tsx",
                            lineNumber: 107,
                            columnNumber: 13
                        }, this)
                    ]
                }, item.id, true, {
                    fileName: "[project]/app/components/blocks/ButtonBlock.tsx",
                    lineNumber: 92,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/ButtonBlock.tsx",
            lineNumber: 90,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/blocks/ButtonBlock.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, this);
}
_c = ButtonBlock;
var _c;
__turbopack_context__.k.register(_c, "ButtonBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ButtonStackBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ButtonStackBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
'use client';
;
;
const iconMap = {
    ArrowRight: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"],
    BookOpen: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
    Mail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"],
    ExternalLink: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"],
    Download: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"],
    Play: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"],
    Check: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"],
    ChevronRight: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"]
};
function ButtonStackBlock({ items, title, stackStyle = 'cards', accentColor = '#9F80DA', textStyle = {}, dark = false }) {
    const renderIcon = (iconName)=>{
        if (!iconName) return null;
        const IconComponent = iconMap[iconName];
        if (!IconComponent) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
            className: "w-5 h-5"
        }, void 0, false, {
            fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
            lineNumber: 60,
            columnNumber: 12
        }, this);
    };
    if (stackStyle === 'cards') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
            children: [
                title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: `text-lg font-semibold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`,
                    style: {
                        color: textStyle.color || (dark ? '#ffffff' : undefined)
                    },
                    children: title
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                    lineNumber: 67,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: item.url,
                            target: item.target || '_self',
                            rel: item.target === '_blank' ? 'noopener noreferrer' : undefined,
                            className: `flex items-center gap-4 p-4 rounded-lg border transition-all hover:shadow-md group ${dark ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`,
                            children: [
                                item.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                                    style: {
                                        backgroundColor: `${accentColor}20`,
                                        color: accentColor
                                    },
                                    children: renderIcon(item.icon)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                                    lineNumber: 88,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: `font-medium ${dark ? 'text-white' : 'text-gray-900'}`,
                                            style: {
                                                fontSize: textStyle.fontSize,
                                                color: textStyle.color || (dark ? '#ffffff' : undefined)
                                            },
                                            children: item.text
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                                            lineNumber: 96,
                                            columnNumber: 17
                                        }, this),
                                        item.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: `text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`,
                                            children: item.description
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                                            lineNumber: 106,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                                    lineNumber: 95,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                    className: `w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1 ${dark ? 'text-gray-500' : 'text-gray-400'}`
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                                    lineNumber: 111,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, item.id, true, {
                            fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                            lineNumber: 76,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
            lineNumber: 65,
            columnNumber: 7
        }, this);
    }
    if (stackStyle === 'minimal') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
            children: [
                title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: `text-lg font-semibold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`,
                    style: {
                        color: textStyle.color || (dark ? '#ffffff' : undefined)
                    },
                    children: title
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                    lineNumber: 127,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: item.url,
                            target: item.target || '_self',
                            rel: item.target === '_blank' ? 'noopener noreferrer' : undefined,
                            className: `flex items-center gap-3 py-2 transition-colors group ${dark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`,
                            children: [
                                item.icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: accentColor
                                    },
                                    children: renderIcon(item.icon)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                                    lineNumber: 146,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                    className: "w-4 h-4 transition-transform group-hover:translate-x-1",
                                    style: {
                                        color: accentColor
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                                    lineNumber: 148,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium",
                                    style: {
                                        fontSize: textStyle.fontSize,
                                        color: textStyle.color || undefined
                                    },
                                    children: item.text
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                                    lineNumber: 153,
                                    columnNumber: 15
                                }, this),
                                item.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`,
                                    children: [
                                        "— ",
                                        item.description
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                                    lineNumber: 163,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, item.id, true, {
                            fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                            lineNumber: 136,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                    lineNumber: 134,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
            lineNumber: 125,
            columnNumber: 7
        }, this);
    }
    if (stackStyle === 'bordered') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
            children: [
                title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: `text-lg font-semibold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`,
                    style: {
                        color: textStyle.color || (dark ? '#ffffff' : undefined)
                    },
                    children: title
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                    lineNumber: 178,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: item.url,
                            target: item.target || '_self',
                            rel: item.target === '_blank' ? 'noopener noreferrer' : undefined,
                            className: `flex items-center gap-4 p-4 rounded-lg border-2 transition-all group ${dark ? 'border-gray-700 hover:border-primary' : 'border-gray-200 hover:border-primary'}`,
                            style: {
                                borderLeftWidth: '4px',
                                borderLeftColor: accentColor
                            },
                            children: [
                                item.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: accentColor
                                    },
                                    children: renderIcon(item.icon)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                                    lineNumber: 201,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: `font-medium ${dark ? 'text-white' : 'text-gray-900'}`,
                                            style: {
                                                fontSize: textStyle.fontSize,
                                                color: textStyle.color || (dark ? '#ffffff' : undefined)
                                            },
                                            children: item.text
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                                            lineNumber: 204,
                                            columnNumber: 17
                                        }, this),
                                        item.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: `text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`,
                                            children: item.description
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                                            lineNumber: 214,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                                    lineNumber: 203,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                    className: `w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${dark ? 'text-gray-400' : 'text-gray-500'}`
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                                    lineNumber: 219,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, item.id, true, {
                            fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                            lineNumber: 187,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                    lineNumber: 185,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
            lineNumber: 176,
            columnNumber: 7
        }, this);
    }
    if (stackStyle === 'gradient') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-full p-4 ${dark ? 'bg-gray-900' : ''}`,
            children: [
                title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: `text-lg font-semibold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`,
                    style: {
                        color: textStyle.color || (dark ? '#ffffff' : undefined)
                    },
                    children: title
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                    lineNumber: 235,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: item.url,
                            target: item.target || '_self',
                            rel: item.target === '_blank' ? 'noopener noreferrer' : undefined,
                            className: "flex items-center gap-4 p-4 rounded-lg transition-all hover:translate-x-1 group",
                            style: {
                                background: dark ? `linear-gradient(90deg, ${accentColor}30 0%, transparent 100%)` : `linear-gradient(90deg, ${accentColor}15 0%, transparent 100%)`
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm",
                                    style: {
                                        backgroundColor: accentColor
                                    },
                                    children: item.icon ? renderIcon(item.icon) : index + 1
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                                    lineNumber: 256,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: `font-medium ${dark ? 'text-white' : 'text-gray-900'}`,
                                            style: {
                                                fontSize: textStyle.fontSize,
                                                color: textStyle.color || (dark ? '#ffffff' : undefined)
                                            },
                                            children: item.text
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                                            lineNumber: 263,
                                            columnNumber: 17
                                        }, this),
                                        item.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: `text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`,
                                            children: item.description
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                                            lineNumber: 273,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                                    lineNumber: 262,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                    className: `w-5 h-5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`
                                }, void 0, false, {
                                    fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                                    lineNumber: 278,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, item.id, true, {
                            fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                            lineNumber: 244,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
                    lineNumber: 242,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/blocks/ButtonStackBlock.tsx",
            lineNumber: 233,
            columnNumber: 7
        }, this);
    }
    return null;
}
_c = ButtonStackBlock;
var _c;
__turbopack_context__.k.register(_c, "ButtonStackBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

// Types
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/types.ts [app-client] (ecmascript)");
// Paragraph Blocks
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ParagraphBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ParagraphBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ParagraphWithHeadingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ParagraphWithHeadingBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ParagraphWithSubheadingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ParagraphWithSubheadingBlock.tsx [app-client] (ecmascript)");
// Heading Blocks
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HeadingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/HeadingBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SubheadingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/SubheadingBlock.tsx [app-client] (ecmascript)");
// Highlight Blocks
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/HighlightBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightNoteBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/HighlightNoteBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightColumnBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/HighlightColumnBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightCenterLineBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/HighlightCenterLineBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightLeftLineBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/HighlightLeftLineBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightBackgroundBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/HighlightBackgroundBlock.tsx [app-client] (ecmascript)");
// Image Blocks
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ImageBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ImageWithTextBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextLeftBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ImageWithTextLeftBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextCenterBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ImageWithTextCenterBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextBottomBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ImageWithTextBottomBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextTopBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ImageWithTextTopBlock.tsx [app-client] (ecmascript)");
// Quote Blocks
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/QuoteBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteCenterBorderBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/QuoteCenterBorderBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteCenterLightBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/QuoteCenterLightBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteLeftLightBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/QuoteLeftLightBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteLeftBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/QuoteLeftBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteImageBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/QuoteImageBlock.tsx [app-client] (ecmascript)");
// Comparison Blocks
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ComparisonBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonProsConsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ComparisonProsConsBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonCauseEffectBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ComparisonCauseEffectBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonDosDontsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ComparisonDosDontsBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonMythFactBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ComparisonMythFactBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonBeforeAfterBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ComparisonBeforeAfterBlock.tsx [app-client] (ecmascript)");
// Chat Blocks
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ChatBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatFeedbackBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ChatFeedbackBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatQABlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ChatQABlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatQuestionWallBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ChatQuestionWallBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatDialogBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ChatDialogBlock.tsx [app-client] (ecmascript)");
// Other Static Blocks
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TableBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/TableBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ListBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ListBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$GalleryBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/GalleryBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$GraphBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/GraphBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TimelineBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/TimelineBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SeparatorBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/SeparatorBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TestimonialBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/TestimonialBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$StoryTellingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/StoryTellingBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ColumnsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ColumnsBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ReviewsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ReviewsBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$VideoBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/VideoBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$AudioBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/AudioBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$AttachmentBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/AttachmentBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$EmbedBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/EmbedBlock.tsx [app-client] (ecmascript)");
// Interactive Blocks
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$CheckboxBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/CheckboxBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$CarouselBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/CarouselBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$AccordionBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/AccordionBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TabsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/TabsBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$LabeledImageBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/LabeledImageBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ScenarioBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ScenarioBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SortingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/SortingBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SortingStepsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/SortingStepsBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$FlashCardBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/FlashCardBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$MultipleChoiceBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/MultipleChoiceBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$MultipleResponseBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/MultipleResponseBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$FillInTheBlankBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/FillInTheBlankBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$MatchingPairsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/MatchingPairsBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ButtonBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ButtonBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ButtonStackBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ButtonStackBlock.tsx [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/blocks/ParagraphBlock.tsx [app-client] (ecmascript) <export default as ParagraphBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ParagraphBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ParagraphBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ParagraphBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ParagraphBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/ParagraphWithHeadingBlock.tsx [app-client] (ecmascript) <export default as ParagraphWithHeadingBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ParagraphWithHeadingBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ParagraphWithHeadingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ParagraphWithHeadingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ParagraphWithHeadingBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/ParagraphWithSubheadingBlock.tsx [app-client] (ecmascript) <export default as ParagraphWithSubheadingBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ParagraphWithSubheadingBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ParagraphWithSubheadingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ParagraphWithSubheadingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ParagraphWithSubheadingBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/HeadingBlock.tsx [app-client] (ecmascript) <export default as HeadingBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeadingBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HeadingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HeadingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/HeadingBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/SubheadingBlock.tsx [app-client] (ecmascript) <export default as SubheadingBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SubheadingBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SubheadingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SubheadingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/SubheadingBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/HighlightBlock.tsx [app-client] (ecmascript) <export default as HighlightBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HighlightBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/HighlightBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/HighlightNoteBlock.tsx [app-client] (ecmascript) <export default as HighlightNoteBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HighlightNoteBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightNoteBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightNoteBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/HighlightNoteBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/HighlightColumnBlock.tsx [app-client] (ecmascript) <export default as HighlightColumnBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HighlightColumnBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightColumnBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightColumnBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/HighlightColumnBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/HighlightCenterLineBlock.tsx [app-client] (ecmascript) <export default as HighlightCenterLineBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HighlightCenterLineBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightCenterLineBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightCenterLineBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/HighlightCenterLineBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/HighlightLeftLineBlock.tsx [app-client] (ecmascript) <export default as HighlightLeftLineBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HighlightLeftLineBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightLeftLineBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightLeftLineBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/HighlightLeftLineBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/HighlightBackgroundBlock.tsx [app-client] (ecmascript) <export default as HighlightBackgroundBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HighlightBackgroundBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightBackgroundBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightBackgroundBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/HighlightBackgroundBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/ImageBlock.tsx [app-client] (ecmascript) <export default as ImageBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImageBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ImageBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/ImageWithTextBlock.tsx [app-client] (ecmascript) <export default as ImageWithTextBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImageWithTextBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ImageWithTextBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/ImageWithTextLeftBlock.tsx [app-client] (ecmascript) <export default as ImageWithTextLeftBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImageWithTextLeftBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextLeftBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextLeftBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ImageWithTextLeftBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/ImageWithTextCenterBlock.tsx [app-client] (ecmascript) <export default as ImageWithTextCenterBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImageWithTextCenterBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextCenterBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextCenterBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ImageWithTextCenterBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/ImageWithTextBottomBlock.tsx [app-client] (ecmascript) <export default as ImageWithTextBottomBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImageWithTextBottomBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextBottomBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextBottomBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ImageWithTextBottomBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/ImageWithTextTopBlock.tsx [app-client] (ecmascript) <export default as ImageWithTextTopBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImageWithTextTopBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextTopBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextTopBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ImageWithTextTopBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/QuoteBlock.tsx [app-client] (ecmascript) <export default as QuoteBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuoteBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/QuoteBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/QuoteCenterBorderBlock.tsx [app-client] (ecmascript) <export default as QuoteCenterBorderBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuoteCenterBorderBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteCenterBorderBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteCenterBorderBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/QuoteCenterBorderBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/QuoteCenterLightBlock.tsx [app-client] (ecmascript) <export default as QuoteCenterLightBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuoteCenterLightBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteCenterLightBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteCenterLightBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/QuoteCenterLightBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/QuoteLeftLightBlock.tsx [app-client] (ecmascript) <export default as QuoteLeftLightBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuoteLeftLightBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteLeftLightBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteLeftLightBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/QuoteLeftLightBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/QuoteLeftBlock.tsx [app-client] (ecmascript) <export default as QuoteLeftBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuoteLeftBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteLeftBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteLeftBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/QuoteLeftBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/QuoteImageBlock.tsx [app-client] (ecmascript) <export default as QuoteImageBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuoteImageBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteImageBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteImageBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/QuoteImageBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/ComparisonBlock.tsx [app-client] (ecmascript) <export default as ComparisonBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComparisonBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ComparisonBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/ComparisonProsConsBlock.tsx [app-client] (ecmascript) <export default as ComparisonProsConsBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComparisonProsConsBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonProsConsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonProsConsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ComparisonProsConsBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/ComparisonCauseEffectBlock.tsx [app-client] (ecmascript) <export default as ComparisonCauseEffectBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComparisonCauseEffectBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonCauseEffectBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonCauseEffectBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ComparisonCauseEffectBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/ComparisonDosDontsBlock.tsx [app-client] (ecmascript) <export default as ComparisonDosDontsBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComparisonDosDontsBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonDosDontsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonDosDontsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ComparisonDosDontsBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/ComparisonMythFactBlock.tsx [app-client] (ecmascript) <export default as ComparisonMythFactBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComparisonMythFactBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonMythFactBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonMythFactBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ComparisonMythFactBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/ComparisonBeforeAfterBlock.tsx [app-client] (ecmascript) <export default as ComparisonBeforeAfterBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ComparisonBeforeAfterBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonBeforeAfterBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonBeforeAfterBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ComparisonBeforeAfterBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/ChatBlock.tsx [app-client] (ecmascript) <export default as ChatBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ChatBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/ChatFeedbackBlock.tsx [app-client] (ecmascript) <export default as ChatFeedbackBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatFeedbackBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatFeedbackBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatFeedbackBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ChatFeedbackBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/ChatQABlock.tsx [app-client] (ecmascript) <export default as ChatQABlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatQABlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatQABlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatQABlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ChatQABlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/ChatQuestionWallBlock.tsx [app-client] (ecmascript) <export default as ChatQuestionWallBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatQuestionWallBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatQuestionWallBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatQuestionWallBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ChatQuestionWallBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/ChatDialogBlock.tsx [app-client] (ecmascript) <export default as ChatDialogBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatDialogBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatDialogBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatDialogBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ChatDialogBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/TableBlock.tsx [app-client] (ecmascript) <export default as TableBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TableBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TableBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TableBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/TableBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/ListBlock.tsx [app-client] (ecmascript) <export default as ListBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ListBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ListBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ListBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ListBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/GalleryBlock.tsx [app-client] (ecmascript) <export default as GalleryBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GalleryBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$GalleryBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$GalleryBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/GalleryBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/GraphBlock.tsx [app-client] (ecmascript) <export default as GraphBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GraphBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$GraphBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$GraphBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/GraphBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/TimelineBlock.tsx [app-client] (ecmascript) <export default as TimelineBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TimelineBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TimelineBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TimelineBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/TimelineBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/SeparatorBlock.tsx [app-client] (ecmascript) <export default as SeparatorBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SeparatorBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SeparatorBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SeparatorBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/SeparatorBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/TestimonialBlock.tsx [app-client] (ecmascript) <export default as TestimonialBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TestimonialBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TestimonialBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TestimonialBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/TestimonialBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/StoryTellingBlock.tsx [app-client] (ecmascript) <export default as StoryTellingBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StoryTellingBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$StoryTellingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$StoryTellingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/StoryTellingBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/ColumnsBlock.tsx [app-client] (ecmascript) <export default as ColumnsBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ColumnsBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ColumnsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ColumnsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ColumnsBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/ReviewsBlock.tsx [app-client] (ecmascript) <export default as ReviewsBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReviewsBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ReviewsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ReviewsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ReviewsBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/VideoBlock.tsx [app-client] (ecmascript) <export default as VideoBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VideoBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$VideoBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$VideoBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/VideoBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/AudioBlock.tsx [app-client] (ecmascript) <export default as AudioBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AudioBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$AudioBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$AudioBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/AudioBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/AttachmentBlock.tsx [app-client] (ecmascript) <export default as AttachmentBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AttachmentBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$AttachmentBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$AttachmentBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/AttachmentBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/EmbedBlock.tsx [app-client] (ecmascript) <export default as EmbedBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmbedBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$EmbedBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$EmbedBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/EmbedBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/CheckboxBlock.tsx [app-client] (ecmascript) <export default as CheckboxBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckboxBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$CheckboxBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$CheckboxBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/CheckboxBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/CarouselBlock.tsx [app-client] (ecmascript) <export default as CarouselBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CarouselBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$CarouselBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$CarouselBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/CarouselBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/AccordionBlock.tsx [app-client] (ecmascript) <export default as AccordionBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AccordionBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$AccordionBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$AccordionBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/AccordionBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/TabsBlock.tsx [app-client] (ecmascript) <export default as TabsBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TabsBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TabsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TabsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/TabsBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/LabeledImageBlock.tsx [app-client] (ecmascript) <export default as LabeledImageBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LabeledImageBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$LabeledImageBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$LabeledImageBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/LabeledImageBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/ScenarioBlock.tsx [app-client] (ecmascript) <export default as ScenarioBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScenarioBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ScenarioBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ScenarioBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ScenarioBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/SortingBlock.tsx [app-client] (ecmascript) <export default as SortingBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SortingBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SortingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SortingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/SortingBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/SortingStepsBlock.tsx [app-client] (ecmascript) <export default as SortingStepsBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SortingStepsBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SortingStepsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SortingStepsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/SortingStepsBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/FlashCardBlock.tsx [app-client] (ecmascript) <export default as FlashCardBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlashCardBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$FlashCardBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$FlashCardBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/FlashCardBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/MultipleChoiceBlock.tsx [app-client] (ecmascript) <export default as MultipleChoiceBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MultipleChoiceBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$MultipleChoiceBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$MultipleChoiceBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/MultipleChoiceBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/MultipleResponseBlock.tsx [app-client] (ecmascript) <export default as MultipleResponseBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MultipleResponseBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$MultipleResponseBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$MultipleResponseBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/MultipleResponseBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/FillInTheBlankBlock.tsx [app-client] (ecmascript) <export default as FillInTheBlankBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FillInTheBlankBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$FillInTheBlankBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$FillInTheBlankBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/FillInTheBlankBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/MatchingPairsBlock.tsx [app-client] (ecmascript) <export default as MatchingPairsBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MatchingPairsBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$MatchingPairsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$MatchingPairsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/MatchingPairsBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/ButtonBlock.tsx [app-client] (ecmascript) <export default as ButtonBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ButtonBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ButtonBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ButtonBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ButtonBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/components/blocks/ButtonStackBlock.tsx [app-client] (ecmascript) <export default as ButtonStackBlock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ButtonStackBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ButtonStackBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ButtonStackBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/blocks/ButtonStackBlock.tsx [app-client] (ecmascript)");
}),
"[project]/app/project/[courseKey]/_components/CourseComponent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BlockComponents",
    ()=>BlockComponents,
    "CourseComponent",
    ()=>CourseComponent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ParagraphBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ParagraphBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ParagraphBlock.tsx [app-client] (ecmascript) <export default as ParagraphBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ParagraphWithHeadingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ParagraphWithHeadingBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ParagraphWithHeadingBlock.tsx [app-client] (ecmascript) <export default as ParagraphWithHeadingBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ParagraphWithSubheadingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ParagraphWithSubheadingBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ParagraphWithSubheadingBlock.tsx [app-client] (ecmascript) <export default as ParagraphWithSubheadingBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HeadingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HeadingBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/HeadingBlock.tsx [app-client] (ecmascript) <export default as HeadingBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SubheadingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SubheadingBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/SubheadingBlock.tsx [app-client] (ecmascript) <export default as SubheadingBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HighlightBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/HighlightBlock.tsx [app-client] (ecmascript) <export default as HighlightBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightNoteBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HighlightNoteBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/HighlightNoteBlock.tsx [app-client] (ecmascript) <export default as HighlightNoteBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightColumnBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HighlightColumnBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/HighlightColumnBlock.tsx [app-client] (ecmascript) <export default as HighlightColumnBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightCenterLineBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HighlightCenterLineBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/HighlightCenterLineBlock.tsx [app-client] (ecmascript) <export default as HighlightCenterLineBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightLeftLineBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HighlightLeftLineBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/HighlightLeftLineBlock.tsx [app-client] (ecmascript) <export default as HighlightLeftLineBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightBackgroundBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HighlightBackgroundBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/HighlightBackgroundBlock.tsx [app-client] (ecmascript) <export default as HighlightBackgroundBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ImageBlock.tsx [app-client] (ecmascript) <export default as ImageBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageWithTextBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ImageWithTextBlock.tsx [app-client] (ecmascript) <export default as ImageWithTextBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextLeftBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageWithTextLeftBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ImageWithTextLeftBlock.tsx [app-client] (ecmascript) <export default as ImageWithTextLeftBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextCenterBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageWithTextCenterBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ImageWithTextCenterBlock.tsx [app-client] (ecmascript) <export default as ImageWithTextCenterBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextBottomBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageWithTextBottomBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ImageWithTextBottomBlock.tsx [app-client] (ecmascript) <export default as ImageWithTextBottomBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextTopBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageWithTextTopBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ImageWithTextTopBlock.tsx [app-client] (ecmascript) <export default as ImageWithTextTopBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QuoteBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/QuoteBlock.tsx [app-client] (ecmascript) <export default as QuoteBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteCenterBorderBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QuoteCenterBorderBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/QuoteCenterBorderBlock.tsx [app-client] (ecmascript) <export default as QuoteCenterBorderBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteCenterLightBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QuoteCenterLightBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/QuoteCenterLightBlock.tsx [app-client] (ecmascript) <export default as QuoteCenterLightBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteLeftLightBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QuoteLeftLightBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/QuoteLeftLightBlock.tsx [app-client] (ecmascript) <export default as QuoteLeftLightBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteLeftBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QuoteLeftBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/QuoteLeftBlock.tsx [app-client] (ecmascript) <export default as QuoteLeftBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteImageBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QuoteImageBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/QuoteImageBlock.tsx [app-client] (ecmascript) <export default as QuoteImageBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ComparisonBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ComparisonBlock.tsx [app-client] (ecmascript) <export default as ComparisonBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonProsConsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ComparisonProsConsBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ComparisonProsConsBlock.tsx [app-client] (ecmascript) <export default as ComparisonProsConsBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonCauseEffectBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ComparisonCauseEffectBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ComparisonCauseEffectBlock.tsx [app-client] (ecmascript) <export default as ComparisonCauseEffectBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonDosDontsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ComparisonDosDontsBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ComparisonDosDontsBlock.tsx [app-client] (ecmascript) <export default as ComparisonDosDontsBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonMythFactBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ComparisonMythFactBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ComparisonMythFactBlock.tsx [app-client] (ecmascript) <export default as ComparisonMythFactBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonBeforeAfterBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ComparisonBeforeAfterBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ComparisonBeforeAfterBlock.tsx [app-client] (ecmascript) <export default as ComparisonBeforeAfterBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ChatBlock.tsx [app-client] (ecmascript) <export default as ChatBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatFeedbackBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatFeedbackBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ChatFeedbackBlock.tsx [app-client] (ecmascript) <export default as ChatFeedbackBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatQABlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatQABlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ChatQABlock.tsx [app-client] (ecmascript) <export default as ChatQABlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatQuestionWallBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatQuestionWallBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ChatQuestionWallBlock.tsx [app-client] (ecmascript) <export default as ChatQuestionWallBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatDialogBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatDialogBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ChatDialogBlock.tsx [app-client] (ecmascript) <export default as ChatDialogBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TableBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/TableBlock.tsx [app-client] (ecmascript) <export default as TableBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ListBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ListBlock.tsx [app-client] (ecmascript) <export default as ListBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$GalleryBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GalleryBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/GalleryBlock.tsx [app-client] (ecmascript) <export default as GalleryBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$GraphBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraphBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/GraphBlock.tsx [app-client] (ecmascript) <export default as GraphBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TimelineBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TimelineBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/TimelineBlock.tsx [app-client] (ecmascript) <export default as TimelineBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SeparatorBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SeparatorBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/SeparatorBlock.tsx [app-client] (ecmascript) <export default as SeparatorBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TestimonialBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TestimonialBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/TestimonialBlock.tsx [app-client] (ecmascript) <export default as TestimonialBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$StoryTellingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StoryTellingBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/StoryTellingBlock.tsx [app-client] (ecmascript) <export default as StoryTellingBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ColumnsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ColumnsBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ColumnsBlock.tsx [app-client] (ecmascript) <export default as ColumnsBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ReviewsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReviewsBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ReviewsBlock.tsx [app-client] (ecmascript) <export default as ReviewsBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$VideoBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VideoBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/VideoBlock.tsx [app-client] (ecmascript) <export default as VideoBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$AudioBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AudioBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/AudioBlock.tsx [app-client] (ecmascript) <export default as AudioBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$AttachmentBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AttachmentBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/AttachmentBlock.tsx [app-client] (ecmascript) <export default as AttachmentBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$EmbedBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EmbedBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/EmbedBlock.tsx [app-client] (ecmascript) <export default as EmbedBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$CheckboxBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckboxBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/CheckboxBlock.tsx [app-client] (ecmascript) <export default as CheckboxBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$CarouselBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CarouselBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/CarouselBlock.tsx [app-client] (ecmascript) <export default as CarouselBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$AccordionBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AccordionBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/AccordionBlock.tsx [app-client] (ecmascript) <export default as AccordionBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TabsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TabsBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/TabsBlock.tsx [app-client] (ecmascript) <export default as TabsBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$LabeledImageBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LabeledImageBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/LabeledImageBlock.tsx [app-client] (ecmascript) <export default as LabeledImageBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ScenarioBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScenarioBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ScenarioBlock.tsx [app-client] (ecmascript) <export default as ScenarioBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SortingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SortingBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/SortingBlock.tsx [app-client] (ecmascript) <export default as SortingBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SortingStepsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SortingStepsBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/SortingStepsBlock.tsx [app-client] (ecmascript) <export default as SortingStepsBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$FlashCardBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlashCardBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/FlashCardBlock.tsx [app-client] (ecmascript) <export default as FlashCardBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$MultipleChoiceBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MultipleChoiceBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/MultipleChoiceBlock.tsx [app-client] (ecmascript) <export default as MultipleChoiceBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$MultipleResponseBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MultipleResponseBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/MultipleResponseBlock.tsx [app-client] (ecmascript) <export default as MultipleResponseBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$FillInTheBlankBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FillInTheBlankBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/FillInTheBlankBlock.tsx [app-client] (ecmascript) <export default as FillInTheBlankBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$MatchingPairsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MatchingPairsBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/MatchingPairsBlock.tsx [app-client] (ecmascript) <export default as MatchingPairsBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ButtonBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ButtonBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ButtonBlock.tsx [app-client] (ecmascript) <export default as ButtonBlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ButtonStackBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ButtonStackBlock$3e$__ = __turbopack_context__.i("[project]/app/components/blocks/ButtonStackBlock.tsx [app-client] (ecmascript) <export default as ButtonStackBlock>");
;
;
const BlockComponents = {
    // Paragraph Blocks
    ParagraphBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ParagraphBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ParagraphBlock$3e$__["ParagraphBlock"],
    ParagraphWithHeadingBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ParagraphWithHeadingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ParagraphWithHeadingBlock$3e$__["ParagraphWithHeadingBlock"],
    ParagraphWithSubheadingBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ParagraphWithSubheadingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ParagraphWithSubheadingBlock$3e$__["ParagraphWithSubheadingBlock"],
    // Heading Blocks
    HeadingBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HeadingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HeadingBlock$3e$__["HeadingBlock"],
    SubheadingBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SubheadingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SubheadingBlock$3e$__["SubheadingBlock"],
    // Highlight Blocks
    HighlightBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HighlightBlock$3e$__["HighlightBlock"],
    HighlightNoteBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightNoteBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HighlightNoteBlock$3e$__["HighlightNoteBlock"],
    HighlightColumnBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightColumnBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HighlightColumnBlock$3e$__["HighlightColumnBlock"],
    HighlightCenterLineBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightCenterLineBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HighlightCenterLineBlock$3e$__["HighlightCenterLineBlock"],
    HighlightLeftLineBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightLeftLineBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HighlightLeftLineBlock$3e$__["HighlightLeftLineBlock"],
    HighlightBackgroundBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$HighlightBackgroundBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HighlightBackgroundBlock$3e$__["HighlightBackgroundBlock"],
    // Image Blocks
    ImageBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageBlock$3e$__["ImageBlock"],
    ImageWithTextBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageWithTextBlock$3e$__["ImageWithTextBlock"],
    ImageWithTextLeftBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextLeftBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageWithTextLeftBlock$3e$__["ImageWithTextLeftBlock"],
    ImageWithTextCenterBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextCenterBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageWithTextCenterBlock$3e$__["ImageWithTextCenterBlock"],
    ImageWithTextBottomBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextBottomBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageWithTextBottomBlock$3e$__["ImageWithTextBottomBlock"],
    ImageWithTextTopBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ImageWithTextTopBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageWithTextTopBlock$3e$__["ImageWithTextTopBlock"],
    // Quote Blocks
    QuoteBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QuoteBlock$3e$__["QuoteBlock"],
    QuoteCenterBorderBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteCenterBorderBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QuoteCenterBorderBlock$3e$__["QuoteCenterBorderBlock"],
    QuoteCenterLightBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteCenterLightBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QuoteCenterLightBlock$3e$__["QuoteCenterLightBlock"],
    QuoteLeftLightBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteLeftLightBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QuoteLeftLightBlock$3e$__["QuoteLeftLightBlock"],
    QuoteLeftBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteLeftBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QuoteLeftBlock$3e$__["QuoteLeftBlock"],
    QuoteImageBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$QuoteImageBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QuoteImageBlock$3e$__["QuoteImageBlock"],
    // Comparison Blocks
    ComparisonBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ComparisonBlock$3e$__["ComparisonBlock"],
    ComparisonProsConsBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonProsConsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ComparisonProsConsBlock$3e$__["ComparisonProsConsBlock"],
    ComparisonCauseEffectBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonCauseEffectBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ComparisonCauseEffectBlock$3e$__["ComparisonCauseEffectBlock"],
    ComparisonDosDontsBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonDosDontsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ComparisonDosDontsBlock$3e$__["ComparisonDosDontsBlock"],
    ComparisonMythFactBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonMythFactBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ComparisonMythFactBlock$3e$__["ComparisonMythFactBlock"],
    ComparisonBeforeAfterBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ComparisonBeforeAfterBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ComparisonBeforeAfterBlock$3e$__["ComparisonBeforeAfterBlock"],
    // Chat Blocks
    ChatBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatBlock$3e$__["ChatBlock"],
    ChatFeedbackBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatFeedbackBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatFeedbackBlock$3e$__["ChatFeedbackBlock"],
    ChatQABlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatQABlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatQABlock$3e$__["ChatQABlock"],
    ChatQuestionWallBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatQuestionWallBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatQuestionWallBlock$3e$__["ChatQuestionWallBlock"],
    ChatDialogBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ChatDialogBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatDialogBlock$3e$__["ChatDialogBlock"],
    // Other Static Blocks
    TableBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TableBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableBlock$3e$__["TableBlock"],
    ListBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ListBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListBlock$3e$__["ListBlock"],
    GalleryBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$GalleryBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GalleryBlock$3e$__["GalleryBlock"],
    GraphBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$GraphBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraphBlock$3e$__["GraphBlock"],
    TimelineBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TimelineBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TimelineBlock$3e$__["TimelineBlock"],
    SeparatorBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SeparatorBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SeparatorBlock$3e$__["SeparatorBlock"],
    TestimonialBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TestimonialBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TestimonialBlock$3e$__["TestimonialBlock"],
    StoryTellingBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$StoryTellingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StoryTellingBlock$3e$__["StoryTellingBlock"],
    ColumnsBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ColumnsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ColumnsBlock$3e$__["ColumnsBlock"],
    ReviewsBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ReviewsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReviewsBlock$3e$__["ReviewsBlock"],
    VideoBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$VideoBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VideoBlock$3e$__["VideoBlock"],
    AudioBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$AudioBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AudioBlock$3e$__["AudioBlock"],
    AttachmentBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$AttachmentBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AttachmentBlock$3e$__["AttachmentBlock"],
    EmbedBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$EmbedBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EmbedBlock$3e$__["EmbedBlock"],
    // Interactive Blocks
    CheckboxBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$CheckboxBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckboxBlock$3e$__["CheckboxBlock"],
    CarouselBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$CarouselBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CarouselBlock$3e$__["CarouselBlock"],
    AccordionBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$AccordionBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AccordionBlock$3e$__["AccordionBlock"],
    TabsBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$TabsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TabsBlock$3e$__["TabsBlock"],
    LabeledImageBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$LabeledImageBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LabeledImageBlock$3e$__["LabeledImageBlock"],
    ScenarioBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ScenarioBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScenarioBlock$3e$__["ScenarioBlock"],
    SortingBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SortingBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SortingBlock$3e$__["SortingBlock"],
    SortingStepsBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$SortingStepsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SortingStepsBlock$3e$__["SortingStepsBlock"],
    FlashCardBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$FlashCardBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlashCardBlock$3e$__["FlashCardBlock"],
    MultipleChoiceBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$MultipleChoiceBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MultipleChoiceBlock$3e$__["MultipleChoiceBlock"],
    MultipleResponseBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$MultipleResponseBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MultipleResponseBlock$3e$__["MultipleResponseBlock"],
    FillInTheBlankBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$FillInTheBlankBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FillInTheBlankBlock$3e$__["FillInTheBlankBlock"],
    MatchingPairsBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$MatchingPairsBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MatchingPairsBlock$3e$__["MatchingPairsBlock"],
    ButtonBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ButtonBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ButtonBlock$3e$__["ButtonBlock"],
    ButtonStackBlock: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$blocks$2f$ButtonStackBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ButtonStackBlock$3e$__["ButtonStackBlock"]
};
function CourseComponent({ component }) {
    const { componentName, content } = component;
    // Get the corresponding block component
    const BlockComponent = BlockComponents[componentName];
    if (BlockComponent) {
        // Pass the content directly as props to the block component
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BlockComponent, {
            ...content
        }, void 0, false, {
            fileName: "[project]/app/project/[courseKey]/_components/CourseComponent.tsx",
            lineNumber: 89,
            columnNumber: 12
        }, this);
    }
    // Fallback for unknown components
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "py-6 px-6 bg-yellow-50 border border-yellow-200 rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-yellow-700 text-sm",
                children: [
                    "Unknown component: ",
                    componentName
                ]
            }, void 0, true, {
                fileName: "[project]/app/project/[courseKey]/_components/CourseComponent.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                className: "mt-2 text-xs text-gray-600 overflow-auto",
                children: JSON.stringify(content, null, 2)
            }, void 0, false, {
                fileName: "[project]/app/project/[courseKey]/_components/CourseComponent.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/project/[courseKey]/_components/CourseComponent.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
_c = CourseComponent;
var _c;
__turbopack_context__.k.register(_c, "CourseComponent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/learn/[courseKey]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CoursePlayerPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$lms$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/use-lms.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$project$2f5b$courseKey$5d2f$_components$2f$CourseComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/project/[courseKey]/_components/CourseComponent.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
'use client';
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
                        fileName: "[project]/app/learn/[courseKey]/page.tsx",
                        lineNumber: 152,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/learn/[courseKey]/page.tsx",
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
                        fileName: "[project]/app/learn/[courseKey]/page.tsx",
                        lineNumber: 156,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/learn/[courseKey]/page.tsx",
                    lineNumber: 155,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[10px] font-bold text-gray-400",
                    children: unit.code
                }, void 0, false, {
                    fileName: "[project]/app/learn/[courseKey]/page.tsx",
                    lineNumber: 159,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/learn/[courseKey]/page.tsx",
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
                        fileName: "[project]/app/learn/[courseKey]/page.tsx",
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
                        fileName: "[project]/app/learn/[courseKey]/page.tsx",
                        lineNumber: 166,
                        columnNumber: 9
                    }, this),
                    adaptiveMode && adaptiveMode !== 'full' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[9px] px-1.5 py-0.5 bg-purple-50 text-purple-600 rounded mt-1 inline-block",
                        children: adaptiveModeLabels[adaptiveMode] ?? adaptiveMode
                    }, void 0, false, {
                        fileName: "[project]/app/learn/[courseKey]/page.tsx",
                        lineNumber: 168,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/learn/[courseKey]/page.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/learn/[courseKey]/page.tsx",
        lineNumber: 132,
        columnNumber: 5
    }, this);
}
_c = UnitItem;
function CoursePlayerPage() {
    _s3();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const courseKey = params.courseKey;
    const { data, isLoading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$lms$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLmsCourseContent"])(courseKey);
    const updateProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$lms$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLmsUpdateProgress"])(courseKey);
    const focusTracker = useFocusLossTracker();
    const { showModal: showInactivityModal, dismiss: dismissInactivity } = useInactivityTimer(5);
    // Current unit state
    const [activeUnitCode, setActiveUnitCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sidebarOpen, setSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Build flat list of all units
    const allUnits = data?.proposedIndex?.modules.flatMap((m)=>m.units.map((u)=>({
                ...u,
                moduleNum: m.number,
                moduleTitle: m.title
            }))) ?? [];
    // Check if adaptive redirect needed
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CoursePlayerPage.useEffect": ()=>{
            if (!data) return;
            if (data.isAdaptive && !data.adaptivePath && !data.enrollment.startedAt) {
                router.replace(`/learn/${courseKey}/pre-assessment`);
            }
        }
    }["CoursePlayerPage.useEffect"], [
        data,
        courseKey,
        router
    ]);
    // Set initial unit on load
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CoursePlayerPage.useEffect": ()=>{
            if (!data || activeUnitCode) return;
            const completedCodes = new Set(data.unitProgress.filter({
                "CoursePlayerPage.useEffect": (p)=>p.completedAt
            }["CoursePlayerPage.useEffect"]).map({
                "CoursePlayerPage.useEffect": (p)=>p.unitCode
            }["CoursePlayerPage.useEffect"]));
            const firstIncomplete = allUnits.find({
                "CoursePlayerPage.useEffect.firstIncomplete": (u)=>!completedCodes.has(u.code)
            }["CoursePlayerPage.useEffect.firstIncomplete"]);
            setActiveUnitCode(firstIncomplete?.code ?? allUnits[0]?.code ?? null);
        }
    }["CoursePlayerPage.useEffect"], [
        data
    ]);
    // Time tracking with focus loss
    const handleTimeTick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CoursePlayerPage.useCallback[handleTimeTick]": (seconds)=>{
            if (!activeUnitCode) return;
            const focusLoss = focusTracker.getAndReset();
            updateProgress.mutate({
                unitCode: activeUnitCode,
                timeSpentSeconds: seconds,
                focusLossCount: focusLoss > 0 ? focusLoss : undefined
            });
        }
    }["CoursePlayerPage.useCallback[handleTimeTick]"], [
        activeUnitCode,
        updateProgress,
        focusTracker
    ]);
    useActiveTimer(handleTimeTick);
    // Mark unit as complete and move to next
    const handleCompleteUnit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CoursePlayerPage.useCallback[handleCompleteUnit]": async ()=>{
            if (!activeUnitCode) return;
            await updateProgress.mutateAsync({
                unitCode: activeUnitCode,
                timeSpentSeconds: 0,
                completed: true
            });
            // Move to next non-skipped unit
            const currentIdx = allUnits.findIndex({
                "CoursePlayerPage.useCallback[handleCompleteUnit].currentIdx": (u)=>u.code === activeUnitCode
            }["CoursePlayerPage.useCallback[handleCompleteUnit].currentIdx"]);
            for(let i = currentIdx + 1; i < allUnits.length; i++){
                const adaptiveItem = data?.adaptivePath?.find({
                    "CoursePlayerPage.useCallback[handleCompleteUnit]": (a)=>a.unitCode === allUnits[i].code
                }["CoursePlayerPage.useCallback[handleCompleteUnit]"]);
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
    }["CoursePlayerPage.useCallback[handleCompleteUnit]"], [
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
                fileName: "[project]/app/learn/[courseKey]/page.tsx",
                lineNumber: 258,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/learn/[courseKey]/page.tsx",
            lineNumber: 257,
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
                    fileName: "[project]/app/learn/[courseKey]/page.tsx",
                    lineNumber: 266,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>router.push('/learn'),
                    className: "text-sm text-[#9F80DA] hover:underline",
                    children: "Back to my courses"
                }, void 0, false, {
                    fileName: "[project]/app/learn/[courseKey]/page.tsx",
                    lineNumber: 267,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/learn/[courseKey]/page.tsx",
            lineNumber: 265,
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
        className: "min-h-screen bg-white font-[var(--font-onest)] flex flex-col",
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
                            fileName: "[project]/app/learn/[courseKey]/page.tsx",
                            lineNumber: 312,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-500 mb-6",
                            children: "You have been inactive for a while."
                        }, void 0, false, {
                            fileName: "[project]/app/learn/[courseKey]/page.tsx",
                            lineNumber: 313,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: dismissInactivity,
                            className: "px-6 py-2.5 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white font-medium rounded-xl hover:from-[#8A6BC5] hover:to-[#7B5BB5] transition-all",
                            children: "I am here!"
                        }, void 0, false, {
                            fileName: "[project]/app/learn/[courseKey]/page.tsx",
                            lineNumber: 314,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/learn/[courseKey]/page.tsx",
                    lineNumber: 311,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/learn/[courseKey]/page.tsx",
                lineNumber: 310,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push('/learn'),
                                className: "p-2 hover:bg-gray-100 rounded transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5 text-gray-600",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M15 19l-7-7 7-7"
                                    }, void 0, false, {
                                        fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                        lineNumber: 332,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                    lineNumber: 331,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                lineNumber: 327,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSidebarOpen(!sidebarOpen),
                                className: "p-2 hover:bg-gray-100 rounded transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5 text-gray-600",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M4 6h16M4 12h16M4 18h16"
                                    }, void 0, false, {
                                        fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                        lineNumber: 340,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                    lineNumber: 339,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                lineNumber: 335,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-sm font-semibold text-[#1a1a1a] max-w-xs truncate",
                                children: data.courseTitle || 'Course'
                            }, void 0, false, {
                                fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                lineNumber: 343,
                                columnNumber: 11
                            }, this),
                            data.isAdaptive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-medium",
                                children: "Adaptive"
                            }, void 0, false, {
                                fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                lineNumber: 347,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/learn/[courseKey]/page.tsx",
                        lineNumber: 326,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 flex-1 mx-8 max-w-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 h-2 bg-gray-100 rounded-full overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] rounded-full transition-all duration-500",
                                    style: {
                                        width: `${progressPct}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                    lineNumber: 354,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                lineNumber: 353,
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
                                fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                lineNumber: 359,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/learn/[courseKey]/page.tsx",
                        lineNumber: 352,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-400",
                                children: [
                                    progressPct,
                                    "% complete"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                lineNumber: 365,
                                columnNumber: 11
                            }, this),
                            data.isAdaptive && data.enrollment.completedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push(`/learn/${courseKey}/post-assessment`),
                                className: "text-xs text-[#9F80DA] hover:underline",
                                children: "Post-Assessment"
                            }, void 0, false, {
                                fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                lineNumber: 367,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/learn/[courseKey]/page.tsx",
                        lineNumber: 364,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/learn/[courseKey]/page.tsx",
                lineNumber: 325,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 overflow-hidden",
                children: [
                    sidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "w-72 bg-gray-50 border-r border-gray-200 overflow-y-auto flex-shrink-0",
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
                                            fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                            lineNumber: 384,
                                            columnNumber: 19
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
                                                    fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                                    lineNumber: 393,
                                                    columnNumber: 25
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                            lineNumber: 387,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, module.number, true, {
                                    fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                    lineNumber: 383,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/learn/[courseKey]/page.tsx",
                            lineNumber: 381,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/learn/[courseKey]/page.tsx",
                        lineNumber: 380,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1 overflow-y-auto bg-white",
                        children: activeUnit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-3xl mx-auto px-6 py-8",
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
                                            fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                            lineNumber: 418,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl font-bold text-[#1a1a1a]",
                                            children: activeUnit.title
                                        }, void 0, false, {
                                            fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                            lineNumber: 421,
                                            columnNumber: 17
                                        }, this),
                                        activeAdaptive && activeAdaptive.mode !== 'full' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex items-center gap-1 mt-2 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full",
                                            children: adaptiveModeLabels[activeAdaptive.mode]
                                        }, void 0, false, {
                                            fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                            lineNumber: 423,
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
                                                        fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                                        lineNumber: 430,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                                    lineNumber: 429,
                                                    columnNumber: 21
                                                }, this),
                                                "Completed"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                            lineNumber: 428,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                    lineNumber: 417,
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
                                                fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                                lineNumber: 441,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "You indicated high confidence in this topic. It has been marked complete."
                                            }, void 0, false, {
                                                fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                                lineNumber: 442,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                        lineNumber: 440,
                                        columnNumber: 19
                                    }, this) : activeComponents.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-20 text-gray-400",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: "Content is being generated for this unit."
                                        }, void 0, false, {
                                            fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                            lineNumber: 446,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                        lineNumber: 445,
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
                                                    fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                                    lineNumber: 454,
                                                    columnNumber: 27
                                                }, this)
                                            }, idx, false, {
                                                fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                                lineNumber: 453,
                                                columnNumber: 25
                                            }, this);
                                        }
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BlockComponent, {
                                                ...comp.content
                                            }, void 0, false, {
                                                fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                                lineNumber: 460,
                                                columnNumber: 25
                                            }, this)
                                        }, idx, false, {
                                            fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                            lineNumber: 459,
                                            columnNumber: 23
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                    lineNumber: 438,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-12 pt-8 border-t border-gray-200 flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                if (currentIdx > 0) setActiveUnitCode(allUnits[currentIdx - 1].code);
                                            },
                                            disabled: currentIdx === 0,
                                            className: "flex items-center gap-2 text-sm text-gray-500 hover:text-[#9F80DA] disabled:opacity-30 transition-colors",
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
                                                        fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                                        lineNumber: 478,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                                    lineNumber: 477,
                                                    columnNumber: 19
                                                }, this),
                                                "Previous"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                            lineNumber: 470,
                                            columnNumber: 17
                                        }, this),
                                        isLastUnit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleCompleteUnit,
                                            disabled: isCurrentUnitDone || updateProgress.isPending,
                                            className: "flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow hover:from-green-600 hover:to-green-700 disabled:opacity-50 transition-all",
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
                                                            fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                                            lineNumber: 493,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                                        lineNumber: 492,
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
                                                            fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                                            lineNumber: 501,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                                        lineNumber: 500,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true)
                                        }, void 0, false, {
                                            fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                            lineNumber: 485,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleCompleteUnit,
                                            disabled: updateProgress.isPending,
                                            className: "flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white font-semibold rounded-xl shadow hover:from-[#8A6BC5] hover:to-[#7B5BB5] disabled:opacity-50 transition-all",
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
                                                        fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                                        lineNumber: 514,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                                    lineNumber: 513,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                            lineNumber: 507,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/learn/[courseKey]/page.tsx",
                                    lineNumber: 468,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/learn/[courseKey]/page.tsx",
                            lineNumber: 415,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/learn/[courseKey]/page.tsx",
                        lineNumber: 413,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/learn/[courseKey]/page.tsx",
                lineNumber: 377,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/learn/[courseKey]/page.tsx",
        lineNumber: 307,
        columnNumber: 5
    }, this);
}
_s3(CoursePlayerPage, "G+H+WyArclHproLz0mGDpCAKMWU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$lms$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLmsCourseContent"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$lms$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLmsUpdateProgress"],
        useFocusLossTracker,
        useInactivityTimer,
        useActiveTimer
    ];
});
_c1 = CoursePlayerPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "UnitItem");
__turbopack_context__.k.register(_c1, "CoursePlayerPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_c589ea08._.js.map