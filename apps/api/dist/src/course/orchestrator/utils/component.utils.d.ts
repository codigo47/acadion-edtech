import { PrismaService } from '../../../prisma/prisma.service';
export interface ComponentData {
    internalName: string;
    name: string;
    type: string;
    subtype: string | null;
    description: string | null;
    properties: unknown;
}
export interface ComponentLists {
    staticComponentsList: string;
    interactiveGeneralComponentsList: string;
    interactiveExerciseComponentsList: string;
}
export declare function escapeBracesForLangChain(str: string): string;
export declare function getComponentLists(prisma: PrismaService): Promise<ComponentLists>;
