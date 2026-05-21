export interface CourseInput {
    topic: string;
    modules: Record<string, {
        units: number;
    }>;
    audience: string;
    branding: {
        logo?: string;
        typo1?: string;
        typo2?: string;
        guidelines?: string;
        primaryColor?: string;
        secondaryColor?: string;
    };
    objective: string;
    modulesCount: number;
    buildingMethod: string;
    evaluationDetails: {
        restrictions?: string;
        finalExercise?: boolean;
        knowledgeCheckEndUnit?: boolean;
        knowledgeCheckEndModule?: boolean;
    };
    generatedObjectives: {
        items: Array<{
            title: string;
            text: string;
        }>;
    };
}
export interface GenerateObjectivesJobData {
    courseId: number;
    courseKey: string;
    topic: string;
    audience: string;
    objective: string;
}
export interface GenerateIndexJobData {
    courseId: number;
    courseKey: string;
}
export interface GenerateIntroUnitJobData {
    courseId: number;
    courseKey: string;
    unitCode: string;
    unitTitle: string;
    moduleNumber: number;
    moduleTitle: string;
}
export interface GenerateContentUnitJobData {
    courseId: number;
    courseKey: string;
    unitCode: string;
    unitTitle: string;
    moduleNumber: number;
    moduleTitle: string;
}
export interface GenerateModuleEvaluationJobData {
    courseId: number;
    courseKey: string;
    moduleNumber: number;
    moduleTitle: string;
}
export interface GenerateCourseEvaluationJobData {
    courseId: number;
    courseKey: string;
}
