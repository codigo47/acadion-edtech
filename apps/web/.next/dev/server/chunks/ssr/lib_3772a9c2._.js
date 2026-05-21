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
"[project]/lib/enums/task-name.enum.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/lib/hooks/use-course.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/enums/task-name.enum.ts [app-ssr] (ecmascript)");
;
;
;
;
;
function useCreateCourse() {
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (params)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post('/v1/course/tasks', {
                taskName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaskName"].CREATE_COURSE,
                userId: params.userId
            }),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: [
                    'courses'
                ]
            });
        }
    });
}
function useGenerateTitle() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (params)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post('/v1/course/tasks', {
                taskName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaskName"].GENERATE_TITLE,
                courseKey: params.courseKey,
                conversationKey: params.conversationKey,
                topic: params.topic
            })
    });
}
function useSetAudience() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (params)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post('/v1/course/tasks', {
                taskName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaskName"].SET_AUDIENCE,
                courseKey: params.courseKey,
                conversationKey: params.conversationKey,
                audience: params.audience
            })
    });
}
function useSetObjective() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (params)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post('/v1/course/tasks', {
                taskName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaskName"].SET_OBJECTIVE,
                courseKey: params.courseKey,
                conversationKey: params.conversationKey,
                objective: params.objective
            })
    });
}
function useSetBuildingMethod() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (params)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post('/v1/course/tasks', {
                taskName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaskName"].SET_BUILDING_METHOD,
                courseKey: params.courseKey,
                conversationKey: params.conversationKey,
                buildingMethod: params.buildingMethod
            })
    });
}
function useSetModules() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (params)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post('/v1/course/tasks', {
                taskName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaskName"].SET_MODULES,
                courseKey: params.courseKey,
                conversationKey: params.conversationKey,
                modulesCount: params.modulesCount
            })
    });
}
function useSetUnits() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (params)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post('/v1/course/tasks', {
                taskName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaskName"].SET_UNITS,
                courseKey: params.courseKey,
                conversationKey: params.conversationKey,
                modules: params.modules
            })
    });
}
function useGetExerciseTypes() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (params)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post('/v1/course/tasks', {
                taskName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaskName"].GET_EXERCISE_TYPES,
                courseKey: params.courseKey,
                conversationKey: params.conversationKey
            })
    });
}
function useSetEvaluation() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (params)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post('/v1/course/tasks', {
                taskName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaskName"].SET_EVALUATION,
                courseKey: params.courseKey,
                conversationKey: params.conversationKey,
                selectedComponents: params.selectedComponents
            })
    });
}
function useSetEvaluationDetails() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (params)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post('/v1/course/tasks', {
                taskName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaskName"].SET_EVALUATION_DETAILS,
                courseKey: params.courseKey,
                conversationKey: params.conversationKey,
                knowledgeCheckEndUnit: params.knowledgeCheckEndUnit,
                knowledgeCheckEndModule: params.knowledgeCheckEndModule,
                finalExercise: params.finalExercise,
                restrictions: params.restrictions
            })
    });
}
function useCourses(page, limit) {
    const isPaginated = page != null && limit != null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: isPaginated ? [
            'courses',
            page,
            limit
        ] : [
            'courses'
        ],
        queryFn: ()=>isPaginated ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(`/v1/course?page=${page}&limit=${limit}`) : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get('/v1/course'),
        enabled: !!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])()
    });
}
function useCourse(key) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'course',
            key
        ],
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(`/v1/course/${key}`),
        enabled: !!key
    });
}
function useSetBranding() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (params)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post('/v1/course/tasks', {
                taskName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaskName"].SET_BRANDING,
                courseKey: params.courseKey,
                conversationKey: params.conversationKey,
                primaryColor: params.primaryColor,
                secondaryColor: params.secondaryColor,
                typo1: params.typo1,
                typo2: params.typo2,
                logo: params.logo,
                guidelines: params.guidelines
            })
    });
}
function useGenerateCourse() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (courseKey)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post('/v1/course/tasks', {
                taskName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$enums$2f$task$2d$name$2e$enum$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TaskName"].GENERATE_COURSE,
                courseKey
            })
    });
}
function useCourseComponents(courseKey, enabled = true) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'course-components',
            courseKey
        ],
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(`/v1/course/${courseKey}/components`),
        enabled: !!courseKey && enabled
    });
}
}),
"[project]/lib/hooks/use-auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function useLogin() {
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (credentials)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post('/v1/auth/login', credentials, {
                auth: false
            }),
        onSuccess: (data)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveAuth"])(data);
            queryClient.setQueryData([
                'user'
            ], data.user);
            router.push('/dashboard');
        }
    });
}
function useRegister() {
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (credentials)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post('/v1/auth/register', credentials, {
                auth: false
            }),
        onSuccess: (data)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveAuth"])(data);
            queryClient.setQueryData([
                'user'
            ], data.user);
            router.push('/onboarding');
        }
    });
}
function useLogout() {
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post('/v1/auth/logout'),
        onSettled: ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearAuth"])();
            queryClient.setQueryData([
                'user'
            ], null);
            queryClient.clear();
            router.push('/login');
        }
    });
}
function useProfile() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'user'
        ],
        queryFn: async ()=>{
            const user = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get('/v1/auth/profile');
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            return user;
        },
        enabled: !!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])(),
        initialData: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUser"],
        staleTime: 5 * 60 * 1000
    });
}
function useUser() {
    const { data: user, isLoading, isError } = useProfile();
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isLoading && (!token || isError)) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearAuth"])();
            router.push('/login');
        }
    }, [
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
function useUpdateProfile() {
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].patch('/v1/users/me/profile', data),
        onSuccess: (updatedUser)=>{
            const merged = {
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUser"])(),
                ...updatedUser
            };
            queryClient.setQueryData([
                'user'
            ], merged);
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            queryClient.invalidateQueries({
                queryKey: [
                    'user'
                ]
            });
        }
    });
}
function getGoogleLoginUrl() {
    return `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_URL"]}/v1/auth/google`;
}
}),
"[project]/lib/hooks/use-course-sse.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCourseSSE",
    ()=>useCourseSSE
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function useCourseSSE(courseKey, options = {}) {
    const { enabled = true, initialData, onObjectivesCompleted, onIndexCompleted, onUnitCompleted, onGenerationComplete, onError } = options;
    const eventSourceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const initialDataAppliedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (initialData && !initialDataAppliedRef.current && initialData.units.length > 0) {
            initialDataAppliedRef.current = true;
            setState((prev)=>{
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
                    const existingIdx = mergedUnits.findIndex((u)=>u.unitCode === initUnit.unitCode);
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
            });
        }
    }, [
        initialData
    ]);
    const handleEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        try {
            const sseEvent = JSON.parse(event.data);
            setState((prev)=>({
                    ...prev,
                    lastEvent: sseEvent
                }));
            switch(sseEvent.type){
                case 'loading_text':
                    setState((prev)=>({
                            ...prev,
                            loadingText: sseEvent.data.loadingText || null,
                            phase: sseEvent.data.phase || null
                        }));
                    break;
                case 'status_change':
                    if (sseEvent.data.phase === 'GENERATING_OBJECTIVES' && sseEvent.data.status === 'completed') {
                        const objMsg = sseEvent.data.objectivesMessage || '';
                        const buildMsg = sseEvent.data.buildMethodMessage || '';
                        setState((prev)=>({
                                ...prev,
                                objectivesMessage: objMsg,
                                buildMethodMessage: buildMsg,
                                loadingText: null
                            }));
                        onObjectivesCompleted?.(objMsg, buildMsg);
                    } else if (sseEvent.data.phase === 'GENERATING_INDEX' && sseEvent.data.status === 'completed') {
                        const index = sseEvent.data.proposedIndex;
                        setState((prev)=>{
                            // Build units from index, preserving existing status if available
                            const newUnits = [];
                            if (index?.modules) {
                                index.modules.forEach((module)=>{
                                    module.units.forEach((unit)=>{
                                        const existingUnit = prev.units.find((u)=>u.unitCode === unit.code);
                                        newUnits.push({
                                            unitCode: unit.code,
                                            unitTitle: unit.title,
                                            status: existingUnit?.status || 'pending'
                                        });
                                    });
                                });
                            }
                            return {
                                ...prev,
                                proposedIndex: index,
                                units: newUnits,
                                loadingText: null
                            };
                        });
                        onIndexCompleted?.(index);
                    }
                    break;
                case 'progress':
                    setState((prev)=>({
                            ...prev,
                            progress: sseEvent.data.progress || null
                        }));
                    break;
                case 'unit_started':
                    if (sseEvent.data.unitCode && sseEvent.data.unitTitle) {
                        setState((prev)=>{
                            const existingUnit = prev.units.find((u)=>u.unitCode === sseEvent.data.unitCode);
                            if (existingUnit) {
                                // Update existing unit status
                                return {
                                    ...prev,
                                    units: prev.units.map((u)=>u.unitCode === sseEvent.data.unitCode ? {
                                            ...u,
                                            status: 'running'
                                        } : u)
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
                        });
                    }
                    break;
                case 'unit_completed':
                    const unitProgress = sseEvent.data.progress;
                    setState((prev)=>({
                            ...prev,
                            progress: unitProgress || null,
                            units: prev.units.map((u)=>u.unitCode === sseEvent.data.unitCode ? {
                                    ...u,
                                    status: 'completed'
                                } : u)
                        }));
                    if (sseEvent.data.unitCode && sseEvent.data.unitTitle && unitProgress) {
                        onUnitCompleted?.(sseEvent.data.unitCode, sseEvent.data.unitTitle, unitProgress);
                    }
                    break;
                case 'unit_failed':
                    if (sseEvent.data.unitCode) {
                        setState((prev)=>({
                                ...prev,
                                units: prev.units.map((u)=>u.unitCode === sseEvent.data.unitCode ? {
                                        ...u,
                                        status: 'failed'
                                    } : u)
                            }));
                    }
                    break;
                case 'generation_complete':
                    setState((prev)=>({
                            ...prev,
                            isComplete: true,
                            loadingText: null
                        }));
                    onGenerationComplete?.();
                    break;
                case 'error':
                    const errorMsg = sseEvent.data.error || 'Unknown error';
                    setState((prev)=>({
                            ...prev,
                            error: errorMsg,
                            loadingText: null
                        }));
                    onError?.(errorMsg);
                    break;
            }
        } catch (e) {
            console.error('Failed to parse SSE event:', e);
        }
    }, [
        onObjectivesCompleted,
        onIndexCompleted,
        onUnitCompleted,
        onGenerationComplete,
        onError
    ]);
    const connect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!courseKey || !enabled) return;
        // Close existing connection
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
        }
        const apiUrl = ("TURBOPACK compile-time value", "http://localhost:8001/api") || 'http://localhost:8001/api';
        const url = `${apiUrl}/v1/course/${courseKey}/events`;
        const eventSource = new EventSource(url);
        eventSourceRef.current = eventSource;
        eventSource.onopen = ()=>{
            setState((prev)=>({
                    ...prev,
                    isConnected: true,
                    error: null
                }));
        };
        eventSource.onerror = ()=>{
            setState((prev)=>({
                    ...prev,
                    isConnected: false
                }));
            // Attempt to reconnect after 3 seconds
            setTimeout(()=>{
                if (enabled && courseKey) {
                    connect();
                }
            }, 3000);
        };
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
        eventTypes.forEach((eventType)=>{
            eventSource.addEventListener(eventType, handleEvent);
        });
        // Also listen to generic messages
        eventSource.onmessage = handleEvent;
    }, [
        courseKey,
        enabled,
        handleEvent
    ]);
    const disconnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
            setState((prev)=>({
                    ...prev,
                    isConnected: false
                }));
        }
    }, []);
    // Connect/disconnect based on enabled and courseKey
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (enabled && courseKey) {
            connect();
        } else {
            disconnect();
        }
        return ()=>{
            disconnect();
        };
    }, [
        enabled,
        courseKey,
        connect,
        disconnect
    ]);
    // Reset state when courseKey changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
    }, [
        courseKey
    ]); // eslint-disable-line react-hooks/exhaustive-deps
    return state;
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
"[project]/lib/hooks/use-course-editor.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-client.ts [app-ssr] (ecmascript)");
;
;
function useUpdateComponentData(courseKey) {
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ({ id, data })=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].patch(`/v1/course/components/${id}/data`, {
                data
            }),
        onMutate: async ({ id, data })=>{
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
            ], (old)=>{
                if (!old?.components) return old;
                return {
                    ...old,
                    components: old.components.map((c)=>c.id === id ? {
                            ...c,
                            data
                        } : c)
                };
            });
            return {
                previous
            };
        },
        onError: (_err, _vars, context)=>{
            if (context?.previous && courseKey) {
                queryClient.setQueryData([
                    'course-components',
                    courseKey
                ], context.previous);
            }
        }
    });
}
function useDeleteComponent(courseKey) {
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ({ id })=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].delete(`/v1/course/components/${id}`),
        onSuccess: ()=>{
            if (courseKey) {
                queryClient.invalidateQueries({
                    queryKey: [
                        'course-components',
                        courseKey
                    ]
                });
            }
        }
    });
}
function useDuplicateComponent(courseKey) {
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ({ id })=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(`/v1/course/components/${id}/duplicate`),
        onSuccess: ()=>{
            if (courseKey) {
                queryClient.invalidateQueries({
                    queryKey: [
                        'course-components',
                        courseKey
                    ]
                });
            }
        }
    });
}
function useCreateComponent(courseKey) {
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ({ componentName, module, unit, afterSequence })=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(`/v1/course/${courseKey}/components`, {
                componentName,
                module,
                unit,
                afterSequence
            }),
        onSuccess: ()=>{
            if (courseKey) {
                queryClient.invalidateQueries({
                    queryKey: [
                        'course-components',
                        courseKey
                    ]
                });
            }
        }
    });
}
function useReorderComponents(courseKey) {
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ({ courseKey: key, components })=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].patch(`/v1/course/${key}/components/reorder`, {
                components
            }),
        onSuccess: ()=>{
            if (courseKey) {
                queryClient.invalidateQueries({
                    queryKey: [
                        'course-components',
                        courseKey
                    ]
                });
            }
        }
    });
}
function useSwitchComponentStyle(courseKey) {
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ({ id, newComponentId })=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].patch(`/v1/course/components/${id}/switch-style`, {
                newComponentId
            }),
        onSuccess: ()=>{
            if (courseKey) {
                queryClient.invalidateQueries({
                    queryKey: [
                        'course-components',
                        courseKey
                    ]
                });
            }
        }
    });
}
}),
];

//# sourceMappingURL=lib_3772a9c2._.js.map