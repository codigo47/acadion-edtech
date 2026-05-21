export declare class CreateCourseDto {
    userId: string;
}
export declare class GenerateTitleDto {
    courseKey: string;
    conversationKey: string;
    topic: string;
}
export declare class SetAudienceDto {
    courseKey: string;
    conversationKey: string;
    audience: string;
}
export declare class SetObjectiveDto {
    courseKey: string;
    conversationKey: string;
    objective: string;
}
export declare class SetBuildingMethodDto {
    conversationKey: string;
    buildingMethod: 'ai' | 'references_ai' | 'material_only';
}
export declare class SetModulesDto {
    conversationKey: string;
    modulesCount: number;
}
export declare class SetUnitsDto {
    conversationKey: string;
    modules: Record<number, {
        units: number;
    }>;
}
export declare class SetEvaluationDetailsDto {
    conversationKey: string;
    knowledgeCheckEndUnit: boolean;
    knowledgeCheckEndModule: boolean;
    finalExercise: boolean;
    restrictions: string;
}
export declare class SetBrandingDto {
    conversationKey: string;
    primaryColor: string;
    secondaryColor: string;
    typo1: string;
    typo2: string;
    logo: string;
    guidelines: string;
}
