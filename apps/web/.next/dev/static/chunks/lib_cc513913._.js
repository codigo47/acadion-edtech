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
const API_URL = `${("TURBOPACK compile-time value", "http://localhost:8001/api") || 'http://localhost:8001/api'}`;
async function login(email, password) {
    const response = await fetch(`${API_URL}/v1/auth/login`, {
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
    const response = await fetch(`${API_URL}/v1/auth/register`, {
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
    return `${API_URL}/v1/auth/google`;
}
async function getProfile(token) {
    const response = await fetch(`${API_URL}/v1/auth/profile`, {
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
const API_URL = `${("TURBOPACK compile-time value", "http://localhost:8001/api") || 'http://localhost:8001/api'}`;
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
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getToken"])();
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
            "useLmsDashboard.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get('/v1/lms/dashboard')
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
            "useLmsCourseContent.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(`/v1/lms/courses/${courseKey}`)
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
            "useLmsSelfEnroll.useMutation": (courseKey)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(`/v1/lms/courses/${courseKey}/enroll`, {})
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
            "useLmsUpdateProgress.useMutation": (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].patch(`/v1/lms/courses/${courseKey}/progress`, data)
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
            "useLmsCompleteCourse.useMutation": (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(`/v1/lms/courses/${courseKey}/complete`, data)
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
            "useLmsSubmitKnowledgeCheck.useMutation": (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(`/v1/lms/courses/${courseKey}/knowledge-check`, data)
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
            "useLmsAdminEnroll.useMutation": (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(`/v1/lms/courses/${courseKey}/admin-enroll`, data)
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
            "useLmsReEnroll.useMutation": (userId)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(`/v1/lms/courses/${courseKey}/re-enroll/${userId}`, {})
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
"[project]/lib/hooks/use-upload.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUploadImage",
    ()=>useUploadImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useUploadImage() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useUploadImage.useMutation": (file)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].upload('/uploads/image', file)
        }["useUploadImage.useMutation"]
    });
}
_s(useUploadImage, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/use-project-colors.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const ProjectUsedColorsContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])([]);
const ProjectUsedColorsProvider = ProjectUsedColorsContext.Provider;
function useProjectUsedColors() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ProjectUsedColorsContext);
}
_s(useProjectUsedColors, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
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
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useComputeProjectColors.useMemo": ()=>extractUsedColors(components)
    }["useComputeProjectColors.useMemo"], [
        components
    ]);
}
_s1(useComputeProjectColors, "nwk+m61qLgjDVUp4IGV/072DDN4=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/block-styles.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=lib_cc513913._.js.map