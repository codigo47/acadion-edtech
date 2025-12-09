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

/**
 * Escapes curly braces for use in LangChain ChatPromptTemplate.
 * LangChain uses {variable} syntax, so literal braces must be doubled.
 */
export function escapeBracesForLangChain(str: string): string {
  return str.replace(/\{/g, '{{').replace(/\}/g, '}}');
}

function formatComponentProps(props: unknown): string {
  if (!props || typeof props !== 'object') return '';
  return `\n    Content structure: ${JSON.stringify(props)}`;
}

function formatComponent(c: ComponentData): string {
  return `- ${c.internalName}: ${c.name} - ${c.description || 'No description'}${formatComponentProps(c.properties)}`;
}

export async function getComponentLists(prisma: PrismaService): Promise<ComponentLists> {
  const components = await prisma.component.findMany({
    select: {
      internalName: true,
      name: true,
      type: true,
      subtype: true,
      description: true,
      properties: true,
    },
  });

  const staticComponents = components.filter(c => c.type === 'static');
  const interactiveGeneralComponents = components.filter(c => c.type === 'interactive' && c.subtype === 'content');
  const interactiveExerciseComponents = components.filter(c => c.type === 'interactive' && c.subtype === 'exercise');

  return {
    staticComponentsList: staticComponents.map(formatComponent).join('\n'),
    interactiveGeneralComponentsList: interactiveGeneralComponents.map(formatComponent).join('\n'),
    interactiveExerciseComponentsList: interactiveExerciseComponents.map(formatComponent).join('\n'),
  };
}
