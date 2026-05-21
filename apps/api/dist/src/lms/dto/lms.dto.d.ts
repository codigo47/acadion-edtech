export declare class UpdateProgressDto {
    unitCode: string;
    timeSpentSeconds: number;
    completed?: boolean;
    focusLossCount?: number;
}
export declare class CompleteCourseDto {
    passed: boolean;
    score: number;
}
export declare class SubmitKnowledgeCheckDto {
    unitCode: string;
    questionIndex: number;
    answer: unknown;
    isCorrect: boolean;
}
export declare class AdminEnrollDto {
    userId: string;
}
declare class ConfidenceAnswerDto {
    unitCode: string;
    confidenceScore: number;
}
export declare class SubmitPreAssessmentDto {
    enrollmentId: number;
    answers: ConfidenceAnswerDto[];
}
export declare class SubmitPostAssessmentDto {
    enrollmentId: number;
    answers: ConfidenceAnswerDto[];
}
export {};
