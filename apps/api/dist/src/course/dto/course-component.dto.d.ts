export declare class UpdateComponentDataDto {
    data: Record<string, unknown>;
}
declare class ReorderItem {
    id: number;
    sequence: number;
}
export declare class ReorderComponentsDto {
    components: ReorderItem[];
}
export declare class SwitchStyleDto {
    newComponentId: number;
}
export declare class CreateComponentDto {
    componentName: string;
    module: number;
    unit: number;
    afterSequence: number;
}
export {};
