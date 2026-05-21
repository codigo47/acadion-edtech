import { TaskName } from '../enums/task-name.enum';
export declare class SelectedComponent {
    id: number;
    name: string;
}
export declare class TaskDto {
    taskName: TaskName;
    userId?: string;
    courseKey?: string;
    conversationKey?: string;
    topic?: string;
    audience?: string;
    objective?: string;
    buildingMethod?: 'ai' | 'references_ai' | 'material_only';
    modulesCount?: number;
    modules?: Record<number, {
        units: number;
    }>;
    selectedComponents?: SelectedComponent[];
    knowledgeCheckEndUnit?: boolean;
    knowledgeCheckEndModule?: boolean;
    finalExercise?: boolean;
    restrictions?: string;
    primaryColor?: string;
    secondaryColor?: string;
    typo1?: string;
    typo2?: string;
    logo?: string;
    guidelines?: string;
}
