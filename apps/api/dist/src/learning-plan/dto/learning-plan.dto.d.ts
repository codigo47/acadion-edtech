export declare class CreateLearningPlanDto {
    name: string;
    description?: string;
    image?: string;
    badgeImage?: string;
    badgeName?: string;
    estimatedDays?: number;
    isCorrelative?: boolean;
    isOptional?: boolean;
    parentId?: number;
}
export declare class UpdateLearningPlanDto {
    name?: string;
    description?: string;
    image?: string;
    badgeImage?: string;
    badgeName?: string;
    estimatedDays?: number;
    isCorrelative?: boolean;
    isOptional?: boolean;
    parentId?: number;
}
export declare class AddPlanCourseDto {
    courseId: number;
    order?: number;
    required?: boolean;
}
declare class CourseOrderItem {
    courseId: number;
    order: number;
}
export declare class ReorderPlanCoursesDto {
    courses: CourseOrderItem[];
}
export declare class AssignPlanDto {
    userId: string;
    deadline?: string;
}
export declare class AssignPlanToGroupDto {
    groupId: number;
    deadline?: string;
}
declare class BulkAssignUserDto {
    email: string;
}
export declare class BulkAssignPlanDto {
    users: BulkAssignUserDto[];
    deadline?: string;
}
export {};
