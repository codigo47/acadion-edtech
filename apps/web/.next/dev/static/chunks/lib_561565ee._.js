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
"[project]/lib/enums/task-name.enum.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TaskName",
    ()=>TaskName
]);
var TaskName = /*#__PURE__*/ function(TaskName) {
    TaskName["CREATE_COURSE"] = "CREATE_COURSE";
    TaskName["GENERATE_TITLE"] = "GENERATE_TITLE";
    TaskName["SET_AUDIENCE"] = "SET_AUDIENCE";
    TaskName["SET_OBJECTIVE"] = "SET_OBJECTIVE";
    TaskName["SET_BUILDING_METHOD"] = "SET_BUILDING_METHOD";
    TaskName["SET_MODULES"] = "SET_MODULES";
    TaskName["SET_UNITS"] = "SET_UNITS";
    TaskName["GET_EXERCISE_TYPES"] = "GET_EXERCISE_TYPES";
    TaskName["SET_EVALUATION"] = "SET_EVALUATION";
    TaskName["SET_EVALUATION_DETAILS"] = "SET_EVALUATION_DETAILS";
    TaskName["SET_BRANDING"] = "SET_BRANDING";
    TaskName["GENERATE_COURSE"] = "GENERATE_COURSE";
    return TaskName;
}({});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/use-course.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCourse",
    ()=>useCourse,
    "useCourseComponents",
    ()=>useCourseComponents,
    "useCourses",
    ()=>useCourses,
    "useCreateCourse",
    ()=>useCreateCourse,
    "useGenerateCourse",
    ()=>useGenerateCourse,
    "useGenerateTitle",
    ()=>useGenerateTitle,
    "useGetExerciseTypes",
    ()=>useGetExerciseTypes,
    "useSetAudience",
    ()=>useSetAudience,
    "useSetBranding",
    ()=>useSetBranding,
    "useSetBuildingMethod",
    ()=>useSetBuildingMethod,
    "useSetEvaluation",
    ()=>useSetEvaluation,
    "useSetEvaluationDetails",
    ()=>useSetEvaluationDetails,
    "useSetModules",
    ()=>useSetModules,
    "useSetObjective",
    ()=>useSetObjective,
    "useSetUnits",
    ()=>useSetUnits
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/enums/task-name.enum.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature(), _s9 = __turbopack_context__.k.signature(), _s10 = __turbopack_context__.k.signature(), _s11 = __turbopack_context__.k.signature(), _s12 = __turbopack_context__.k.signature(), _s13 = __turbopack_context__.k.signature(), _s14 = __turbopack_context__.k.signature();
;
;
;
;
;
function useCreateCourse() {
    _s();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useCreateCourse.useMutation": (params)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/course/tasks', {
                    taskName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskName"].CREATE_COURSE,
                    userId: params.userId
                })
        }["useCreateCourse.useMutation"],
        onSuccess: {
            "useCreateCourse.useMutation": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'courses'
                    ]
                });
            }
        }["useCreateCourse.useMutation"]
    });
}
_s(useCreateCourse, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useGenerateTitle() {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useGenerateTitle.useMutation": (params)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/course/tasks', {
                    taskName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskName"].GENERATE_TITLE,
                    courseKey: params.courseKey,
                    conversationKey: params.conversationKey,
                    topic: params.topic
                })
        }["useGenerateTitle.useMutation"]
    });
}
_s1(useGenerateTitle, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useSetAudience() {
    _s2();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useSetAudience.useMutation": (params)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/course/tasks', {
                    taskName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskName"].SET_AUDIENCE,
                    courseKey: params.courseKey,
                    conversationKey: params.conversationKey,
                    audience: params.audience
                })
        }["useSetAudience.useMutation"]
    });
}
_s2(useSetAudience, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useSetObjective() {
    _s3();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useSetObjective.useMutation": (params)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/course/tasks', {
                    taskName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskName"].SET_OBJECTIVE,
                    courseKey: params.courseKey,
                    conversationKey: params.conversationKey,
                    objective: params.objective
                })
        }["useSetObjective.useMutation"]
    });
}
_s3(useSetObjective, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useSetBuildingMethod() {
    _s4();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useSetBuildingMethod.useMutation": (params)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/course/tasks', {
                    taskName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskName"].SET_BUILDING_METHOD,
                    courseKey: params.courseKey,
                    conversationKey: params.conversationKey,
                    buildingMethod: params.buildingMethod
                })
        }["useSetBuildingMethod.useMutation"]
    });
}
_s4(useSetBuildingMethod, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useSetModules() {
    _s5();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useSetModules.useMutation": (params)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/course/tasks', {
                    taskName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskName"].SET_MODULES,
                    courseKey: params.courseKey,
                    conversationKey: params.conversationKey,
                    modulesCount: params.modulesCount
                })
        }["useSetModules.useMutation"]
    });
}
_s5(useSetModules, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useSetUnits() {
    _s6();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useSetUnits.useMutation": (params)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/course/tasks', {
                    taskName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskName"].SET_UNITS,
                    courseKey: params.courseKey,
                    conversationKey: params.conversationKey,
                    modules: params.modules
                })
        }["useSetUnits.useMutation"]
    });
}
_s6(useSetUnits, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useGetExerciseTypes() {
    _s7();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useGetExerciseTypes.useMutation": (params)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/course/tasks', {
                    taskName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskName"].GET_EXERCISE_TYPES,
                    courseKey: params.courseKey,
                    conversationKey: params.conversationKey
                })
        }["useGetExerciseTypes.useMutation"]
    });
}
_s7(useGetExerciseTypes, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useSetEvaluation() {
    _s8();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useSetEvaluation.useMutation": (params)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/course/tasks', {
                    taskName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskName"].SET_EVALUATION,
                    courseKey: params.courseKey,
                    conversationKey: params.conversationKey,
                    selectedComponents: params.selectedComponents
                })
        }["useSetEvaluation.useMutation"]
    });
}
_s8(useSetEvaluation, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useSetEvaluationDetails() {
    _s9();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useSetEvaluationDetails.useMutation": (params)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/course/tasks', {
                    taskName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskName"].SET_EVALUATION_DETAILS,
                    courseKey: params.courseKey,
                    conversationKey: params.conversationKey,
                    knowledgeCheckEndUnit: params.knowledgeCheckEndUnit,
                    knowledgeCheckEndModule: params.knowledgeCheckEndModule,
                    finalExercise: params.finalExercise,
                    restrictions: params.restrictions
                })
        }["useSetEvaluationDetails.useMutation"]
    });
}
_s9(useSetEvaluationDetails, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useCourses(page, limit) {
    _s10();
    const isPaginated = page != null && limit != null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: isPaginated ? [
            'courses',
            page,
            limit
        ] : [
            'courses'
        ],
        queryFn: {
            "useCourses.useQuery": ()=>isPaginated ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(`/course?page=${page}&limit=${limit}`) : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get('/course')
        }["useCourses.useQuery"],
        enabled: !!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getToken"])()
    });
}
_s10(useCourses, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useCourse(key) {
    _s11();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'course',
            key
        ],
        queryFn: {
            "useCourse.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(`/course/${key}`)
        }["useCourse.useQuery"],
        enabled: !!key
    });
}
_s11(useCourse, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useSetBranding() {
    _s12();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useSetBranding.useMutation": (params)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/course/tasks', {
                    taskName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskName"].SET_BRANDING,
                    courseKey: params.courseKey,
                    conversationKey: params.conversationKey,
                    primaryColor: params.primaryColor,
                    secondaryColor: params.secondaryColor,
                    typo1: params.typo1,
                    typo2: params.typo2,
                    logo: params.logo,
                    guidelines: params.guidelines
                })
        }["useSetBranding.useMutation"]
    });
}
_s12(useSetBranding, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useGenerateCourse() {
    _s13();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useGenerateCourse.useMutation": (courseKey)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/course/tasks', {
                    taskName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TaskName"].GENERATE_COURSE,
                    courseKey
                })
        }["useGenerateCourse.useMutation"]
    });
}
_s13(useGenerateCourse, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useCourseComponents(courseKey, enabled = true) {
    _s14();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'course-components',
            courseKey
        ],
        queryFn: {
            "useCourseComponents.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get(`/course/${courseKey}/components`)
        }["useCourseComponents.useQuery"],
        enabled: !!courseKey && enabled
    });
}
_s14(useCourseComponents, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/use-auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getGoogleLoginUrl",
    ()=>getGoogleLoginUrl,
    "useLogin",
    ()=>useLogin,
    "useLogout",
    ()=>useLogout,
    "useProfile",
    ()=>useProfile,
    "useRegister",
    ()=>useRegister,
    "useUpdateProfile",
    ()=>useUpdateProfile,
    "useUser",
    ()=>useUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function useLogin() {
    _s();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useLogin.useMutation": (credentials)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/auth/login', credentials, {
                    auth: false
                })
        }["useLogin.useMutation"],
        onSuccess: {
            "useLogin.useMutation": (data)=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveAuth"])(data);
                queryClient.setQueryData([
                    'user'
                ], data.user);
                router.push('/dashboard');
            }
        }["useLogin.useMutation"]
    });
}
_s(useLogin, "OMPBWmuGqcicNpy0gW6DnCxqRr0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useRegister() {
    _s1();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useRegister.useMutation": (credentials)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/auth/register', credentials, {
                    auth: false
                })
        }["useRegister.useMutation"],
        onSuccess: {
            "useRegister.useMutation": (data)=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveAuth"])(data);
                queryClient.setQueryData([
                    'user'
                ], data.user);
                router.push('/onboarding');
            }
        }["useRegister.useMutation"]
    });
}
_s1(useRegister, "OMPBWmuGqcicNpy0gW6DnCxqRr0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useLogout() {
    _s2();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useLogout.useMutation": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post('/auth/logout')
        }["useLogout.useMutation"],
        onSettled: {
            "useLogout.useMutation": ()=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearAuth"])();
                queryClient.setQueryData([
                    'user'
                ], null);
                queryClient.clear();
                router.push('/login');
            }
        }["useLogout.useMutation"]
    });
}
_s2(useLogout, "OMPBWmuGqcicNpy0gW6DnCxqRr0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useProfile() {
    _s3();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'user'
        ],
        queryFn: {
            "useProfile.useQuery": async ()=>{
                const user = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get('/auth/profile');
                if ("TURBOPACK compile-time truthy", 1) {
                    localStorage.setItem('user', JSON.stringify(user));
                }
                return user;
            }
        }["useProfile.useQuery"],
        enabled: !!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getToken"])(),
        initialData: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUser"],
        staleTime: 5 * 60 * 1000
    });
}
_s3(useProfile, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useUser() {
    _s4();
    const { data: user, isLoading, isError } = useProfile();
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getToken"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useUser.useEffect": ()=>{
            if (!isLoading && (!token || isError)) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearAuth"])();
                router.push('/login');
            }
        }
    }["useUser.useEffect"], [
        isLoading,
        token,
        isError,
        router
    ]);
    return {
        user,
        isLoading,
        isAuthenticated: !!token && !!user
    };
}
_s4(useUser, "VhhHh9JEVcI18nQc/k5BdWlQdS0=", false, function() {
    return [
        useProfile,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
function useUpdateProfile() {
    _s5();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useUpdateProfile.useMutation": (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].patch('/users/me/profile', data)
        }["useUpdateProfile.useMutation"],
        onSuccess: {
            "useUpdateProfile.useMutation": (updatedUser)=>{
                const merged = {
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUser"])(),
                    ...updatedUser
                };
                queryClient.setQueryData([
                    'user'
                ], merged);
                if ("TURBOPACK compile-time truthy", 1) {
                    localStorage.setItem('user', JSON.stringify(merged));
                }
                queryClient.invalidateQueries({
                    queryKey: [
                        'user'
                    ]
                });
            }
        }["useUpdateProfile.useMutation"]
    });
}
_s5(useUpdateProfile, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function getGoogleLoginUrl() {
    return `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_URL"]}/auth/google`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/use-course-sse.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCourseSSE",
    ()=>useCourseSSE
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useCourseSSE(courseKey, options = {}) {
    _s();
    const { enabled = true, initialData, onObjectivesCompleted, onIndexCompleted, onUnitCompleted, onGenerationComplete, onError } = options;
    const eventSourceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const initialDataAppliedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isConnected: false,
        loadingText: null,
        phase: null,
        progress: initialData?.progress || null,
        units: initialData?.units || [],
        objectivesMessage: null,
        buildMethodMessage: null,
        proposedIndex: null,
        isComplete: false,
        error: null,
        lastEvent: null
    });
    // Apply initial data when it becomes available (for page refresh scenarios)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCourseSSE.useEffect": ()=>{
            if (initialData && !initialDataAppliedRef.current && initialData.units.length > 0) {
                initialDataAppliedRef.current = true;
                setState({
                    "useCourseSSE.useEffect": (prev)=>{
                        // Only apply if we don't have units yet, or merge with existing
                        if (prev.units.length === 0) {
                            return {
                                ...prev,
                                units: initialData.units,
                                progress: initialData.progress
                            };
                        }
                        // Merge: update status of existing units, add new ones
                        const mergedUnits = [
                            ...prev.units
                        ];
                        for (const initUnit of initialData.units){
                            const existingIdx = mergedUnits.findIndex({
                                "useCourseSSE.useEffect.existingIdx": (u)=>u.unitCode === initUnit.unitCode
                            }["useCourseSSE.useEffect.existingIdx"]);
                            if (existingIdx >= 0) {
                                // Update status if initial data has more recent info (not pending)
                                if (initUnit.status !== 'pending') {
                                    mergedUnits[existingIdx] = {
                                        ...mergedUnits[existingIdx],
                                        status: initUnit.status
                                    };
                                }
                            } else {
                                mergedUnits.push(initUnit);
                            }
                        }
                        return {
                            ...prev,
                            units: mergedUnits,
                            progress: initialData.progress
                        };
                    }
                }["useCourseSSE.useEffect"]);
            }
        }
    }["useCourseSSE.useEffect"], [
        initialData
    ]);
    const handleEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCourseSSE.useCallback[handleEvent]": (event)=>{
            try {
                const sseEvent = JSON.parse(event.data);
                setState({
                    "useCourseSSE.useCallback[handleEvent]": (prev)=>({
                            ...prev,
                            lastEvent: sseEvent
                        })
                }["useCourseSSE.useCallback[handleEvent]"]);
                switch(sseEvent.type){
                    case 'loading_text':
                        setState({
                            "useCourseSSE.useCallback[handleEvent]": (prev)=>({
                                    ...prev,
                                    loadingText: sseEvent.data.loadingText || null,
                                    phase: sseEvent.data.phase || null
                                })
                        }["useCourseSSE.useCallback[handleEvent]"]);
                        break;
                    case 'status_change':
                        if (sseEvent.data.phase === 'GENERATING_OBJECTIVES' && sseEvent.data.status === 'completed') {
                            const objMsg = sseEvent.data.objectivesMessage || '';
                            const buildMsg = sseEvent.data.buildMethodMessage || '';
                            setState({
                                "useCourseSSE.useCallback[handleEvent]": (prev)=>({
                                        ...prev,
                                        objectivesMessage: objMsg,
                                        buildMethodMessage: buildMsg,
                                        loadingText: null
                                    })
                            }["useCourseSSE.useCallback[handleEvent]"]);
                            onObjectivesCompleted?.(objMsg, buildMsg);
                        } else if (sseEvent.data.phase === 'GENERATING_INDEX' && sseEvent.data.status === 'completed') {
                            const index = sseEvent.data.proposedIndex;
                            setState({
                                "useCourseSSE.useCallback[handleEvent]": (prev)=>{
                                    // Build units from index, preserving existing status if available
                                    const newUnits = [];
                                    if (index?.modules) {
                                        index.modules.forEach({
                                            "useCourseSSE.useCallback[handleEvent]": (module)=>{
                                                module.units.forEach({
                                                    "useCourseSSE.useCallback[handleEvent]": (unit)=>{
                                                        const existingUnit = prev.units.find({
                                                            "useCourseSSE.useCallback[handleEvent].existingUnit": (u)=>u.unitCode === unit.code
                                                        }["useCourseSSE.useCallback[handleEvent].existingUnit"]);
                                                        newUnits.push({
                                                            unitCode: unit.code,
                                                            unitTitle: unit.title,
                                                            status: existingUnit?.status || 'pending'
                                                        });
                                                    }
                                                }["useCourseSSE.useCallback[handleEvent]"]);
                                            }
                                        }["useCourseSSE.useCallback[handleEvent]"]);
                                    }
                                    return {
                                        ...prev,
                                        proposedIndex: index,
                                        units: newUnits,
                                        loadingText: null
                                    };
                                }
                            }["useCourseSSE.useCallback[handleEvent]"]);
                            onIndexCompleted?.(index);
                        }
                        break;
                    case 'progress':
                        setState({
                            "useCourseSSE.useCallback[handleEvent]": (prev)=>({
                                    ...prev,
                                    progress: sseEvent.data.progress || null
                                })
                        }["useCourseSSE.useCallback[handleEvent]"]);
                        break;
                    case 'unit_started':
                        if (sseEvent.data.unitCode && sseEvent.data.unitTitle) {
                            setState({
                                "useCourseSSE.useCallback[handleEvent]": (prev)=>{
                                    const existingUnit = prev.units.find({
                                        "useCourseSSE.useCallback[handleEvent].existingUnit": (u)=>u.unitCode === sseEvent.data.unitCode
                                    }["useCourseSSE.useCallback[handleEvent].existingUnit"]);
                                    if (existingUnit) {
                                        // Update existing unit status
                                        return {
                                            ...prev,
                                            units: prev.units.map({
                                                "useCourseSSE.useCallback[handleEvent]": (u)=>u.unitCode === sseEvent.data.unitCode ? {
                                                        ...u,
                                                        status: 'running'
                                                    } : u
                                            }["useCourseSSE.useCallback[handleEvent]"])
                                        };
                                    } else {
                                        // Add new unit
                                        return {
                                            ...prev,
                                            units: [
                                                ...prev.units,
                                                {
                                                    unitCode: sseEvent.data.unitCode,
                                                    unitTitle: sseEvent.data.unitTitle,
                                                    status: 'running'
                                                }
                                            ]
                                        };
                                    }
                                }
                            }["useCourseSSE.useCallback[handleEvent]"]);
                        }
                        break;
                    case 'unit_completed':
                        const unitProgress = sseEvent.data.progress;
                        setState({
                            "useCourseSSE.useCallback[handleEvent]": (prev)=>({
                                    ...prev,
                                    progress: unitProgress || null,
                                    units: prev.units.map({
                                        "useCourseSSE.useCallback[handleEvent]": (u)=>u.unitCode === sseEvent.data.unitCode ? {
                                                ...u,
                                                status: 'completed'
                                            } : u
                                    }["useCourseSSE.useCallback[handleEvent]"])
                                })
                        }["useCourseSSE.useCallback[handleEvent]"]);
                        if (sseEvent.data.unitCode && sseEvent.data.unitTitle && unitProgress) {
                            onUnitCompleted?.(sseEvent.data.unitCode, sseEvent.data.unitTitle, unitProgress);
                        }
                        break;
                    case 'unit_failed':
                        if (sseEvent.data.unitCode) {
                            setState({
                                "useCourseSSE.useCallback[handleEvent]": (prev)=>({
                                        ...prev,
                                        units: prev.units.map({
                                            "useCourseSSE.useCallback[handleEvent]": (u)=>u.unitCode === sseEvent.data.unitCode ? {
                                                    ...u,
                                                    status: 'failed'
                                                } : u
                                        }["useCourseSSE.useCallback[handleEvent]"])
                                    })
                            }["useCourseSSE.useCallback[handleEvent]"]);
                        }
                        break;
                    case 'generation_complete':
                        setState({
                            "useCourseSSE.useCallback[handleEvent]": (prev)=>({
                                    ...prev,
                                    isComplete: true,
                                    loadingText: null
                                })
                        }["useCourseSSE.useCallback[handleEvent]"]);
                        onGenerationComplete?.();
                        break;
                    case 'error':
                        const errorMsg = sseEvent.data.error || 'Unknown error';
                        setState({
                            "useCourseSSE.useCallback[handleEvent]": (prev)=>({
                                    ...prev,
                                    error: errorMsg,
                                    loadingText: null
                                })
                        }["useCourseSSE.useCallback[handleEvent]"]);
                        onError?.(errorMsg);
                        break;
                }
            } catch (e) {
                console.error('Failed to parse SSE event:', e);
            }
        }
    }["useCourseSSE.useCallback[handleEvent]"], [
        onObjectivesCompleted,
        onIndexCompleted,
        onUnitCompleted,
        onGenerationComplete,
        onError
    ]);
    const connect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCourseSSE.useCallback[connect]": ()=>{
            if (!courseKey || !enabled) return;
            // Close existing connection
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }
            const apiUrl = ("TURBOPACK compile-time value", "http://localhost:8001/api/v1") || 'http://localhost:8001/api/v1';
            const url = `${apiUrl}/course/${courseKey}/events`;
            const eventSource = new EventSource(url);
            eventSourceRef.current = eventSource;
            eventSource.onopen = ({
                "useCourseSSE.useCallback[connect]": ()=>{
                    setState({
                        "useCourseSSE.useCallback[connect]": (prev)=>({
                                ...prev,
                                isConnected: true,
                                error: null
                            })
                    }["useCourseSSE.useCallback[connect]"]);
                }
            })["useCourseSSE.useCallback[connect]"];
            eventSource.onerror = ({
                "useCourseSSE.useCallback[connect]": ()=>{
                    setState({
                        "useCourseSSE.useCallback[connect]": (prev)=>({
                                ...prev,
                                isConnected: false
                            })
                    }["useCourseSSE.useCallback[connect]"]);
                    // Attempt to reconnect after 3 seconds
                    setTimeout({
                        "useCourseSSE.useCallback[connect]": ()=>{
                            if (enabled && courseKey) {
                                connect();
                            }
                        }
                    }["useCourseSSE.useCallback[connect]"], 3000);
                }
            })["useCourseSSE.useCallback[connect]"];
            // Listen for all event types
            const eventTypes = [
                'progress',
                'status_change',
                'loading_text',
                'unit_started',
                'unit_completed',
                'unit_failed',
                'generation_complete',
                'error'
            ];
            eventTypes.forEach({
                "useCourseSSE.useCallback[connect]": (eventType)=>{
                    eventSource.addEventListener(eventType, handleEvent);
                }
            }["useCourseSSE.useCallback[connect]"]);
            // Also listen to generic messages
            eventSource.onmessage = handleEvent;
        }
    }["useCourseSSE.useCallback[connect]"], [
        courseKey,
        enabled,
        handleEvent
    ]);
    const disconnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCourseSSE.useCallback[disconnect]": ()=>{
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
                eventSourceRef.current = null;
                setState({
                    "useCourseSSE.useCallback[disconnect]": (prev)=>({
                            ...prev,
                            isConnected: false
                        })
                }["useCourseSSE.useCallback[disconnect]"]);
            }
        }
    }["useCourseSSE.useCallback[disconnect]"], []);
    // Connect/disconnect based on enabled and courseKey
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCourseSSE.useEffect": ()=>{
            if (enabled && courseKey) {
                connect();
            } else {
                disconnect();
            }
            return ({
                "useCourseSSE.useEffect": ()=>{
                    disconnect();
                }
            })["useCourseSSE.useEffect"];
        }
    }["useCourseSSE.useEffect"], [
        enabled,
        courseKey,
        connect,
        disconnect
    ]);
    // Reset state when courseKey changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCourseSSE.useEffect": ()=>{
            initialDataAppliedRef.current = false;
            setState({
                isConnected: false,
                loadingText: null,
                phase: null,
                progress: initialData?.progress || null,
                units: initialData?.units || [],
                objectivesMessage: null,
                buildMethodMessage: null,
                proposedIndex: null,
                isComplete: false,
                error: null,
                lastEvent: null
            });
        }
    }["useCourseSSE.useEffect"], [
        courseKey
    ]); // eslint-disable-line react-hooks/exhaustive-deps
    return state;
}
_s(useCourseSSE, "L4BurbhimUWV7X52Gcsd0fnFLOw=");
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
"[project]/lib/hooks/use-course-editor.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCreateComponent",
    ()=>useCreateComponent,
    "useDeleteComponent",
    ()=>useDeleteComponent,
    "useDuplicateComponent",
    ()=>useDuplicateComponent,
    "useReorderComponents",
    ()=>useReorderComponents,
    "useSwitchComponentStyle",
    ()=>useSwitchComponentStyle,
    "useUpdateComponentData",
    ()=>useUpdateComponentData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature();
;
;
function useUpdateComponentData(courseKey) {
    _s();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useUpdateComponentData.useMutation": ({ id, data })=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].patch(`/course/components/${id}/data`, {
                    data
                })
        }["useUpdateComponentData.useMutation"],
        onMutate: {
            "useUpdateComponentData.useMutation": async ({ id, data })=>{
                if (!courseKey) return;
                await queryClient.cancelQueries({
                    queryKey: [
                        'course-components',
                        courseKey
                    ]
                });
                const previous = queryClient.getQueryData([
                    'course-components',
                    courseKey
                ]);
                queryClient.setQueryData([
                    'course-components',
                    courseKey
                ], {
                    "useUpdateComponentData.useMutation": (old)=>{
                        if (!old?.components) return old;
                        return {
                            ...old,
                            components: old.components.map({
                                "useUpdateComponentData.useMutation": (c)=>c.id === id ? {
                                        ...c,
                                        data
                                    } : c
                            }["useUpdateComponentData.useMutation"])
                        };
                    }
                }["useUpdateComponentData.useMutation"]);
                return {
                    previous
                };
            }
        }["useUpdateComponentData.useMutation"],
        onError: {
            "useUpdateComponentData.useMutation": (_err, _vars, context)=>{
                if (context?.previous && courseKey) {
                    queryClient.setQueryData([
                        'course-components',
                        courseKey
                    ], context.previous);
                }
            }
        }["useUpdateComponentData.useMutation"]
    });
}
_s(useUpdateComponentData, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useDeleteComponent(courseKey) {
    _s1();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useDeleteComponent.useMutation": ({ id })=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].delete(`/course/components/${id}`)
        }["useDeleteComponent.useMutation"],
        onSuccess: {
            "useDeleteComponent.useMutation": ()=>{
                if (courseKey) {
                    queryClient.invalidateQueries({
                        queryKey: [
                            'course-components',
                            courseKey
                        ]
                    });
                }
            }
        }["useDeleteComponent.useMutation"]
    });
}
_s1(useDeleteComponent, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useDuplicateComponent(courseKey) {
    _s2();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useDuplicateComponent.useMutation": ({ id })=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(`/course/components/${id}/duplicate`)
        }["useDuplicateComponent.useMutation"],
        onSuccess: {
            "useDuplicateComponent.useMutation": ()=>{
                if (courseKey) {
                    queryClient.invalidateQueries({
                        queryKey: [
                            'course-components',
                            courseKey
                        ]
                    });
                }
            }
        }["useDuplicateComponent.useMutation"]
    });
}
_s2(useDuplicateComponent, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useCreateComponent(courseKey) {
    _s3();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useCreateComponent.useMutation": ({ componentName, module, unit, afterSequence })=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post(`/course/${courseKey}/components`, {
                    componentName,
                    module,
                    unit,
                    afterSequence
                })
        }["useCreateComponent.useMutation"],
        onSuccess: {
            "useCreateComponent.useMutation": ()=>{
                if (courseKey) {
                    queryClient.invalidateQueries({
                        queryKey: [
                            'course-components',
                            courseKey
                        ]
                    });
                }
            }
        }["useCreateComponent.useMutation"]
    });
}
_s3(useCreateComponent, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useReorderComponents(courseKey) {
    _s4();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useReorderComponents.useMutation": ({ courseKey: key, components })=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].patch(`/course/${key}/components/reorder`, {
                    components
                })
        }["useReorderComponents.useMutation"],
        onSuccess: {
            "useReorderComponents.useMutation": ()=>{
                if (courseKey) {
                    queryClient.invalidateQueries({
                        queryKey: [
                            'course-components',
                            courseKey
                        ]
                    });
                }
            }
        }["useReorderComponents.useMutation"]
    });
}
_s4(useReorderComponents, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useSwitchComponentStyle(courseKey) {
    _s5();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useSwitchComponentStyle.useMutation": ({ id, newComponentId })=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].patch(`/course/components/${id}/switch-style`, {
                    newComponentId
                })
        }["useSwitchComponentStyle.useMutation"],
        onSuccess: {
            "useSwitchComponentStyle.useMutation": ()=>{
                if (courseKey) {
                    queryClient.invalidateQueries({
                        queryKey: [
                            'course-components',
                            courseKey
                        ]
                    });
                }
            }
        }["useSwitchComponentStyle.useMutation"]
    });
}
_s5(useSwitchComponentStyle, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=lib_561565ee._.js.map