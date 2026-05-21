"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeBracesForLangChain = escapeBracesForLangChain;
exports.getComponentLists = getComponentLists;
function escapeBracesForLangChain(str) {
    return str.replace(/\{/g, '{{').replace(/\}/g, '}}');
}
function formatComponentProps(props) {
    if (!props || typeof props !== 'object')
        return '';
    return `\n    Content structure: ${JSON.stringify(props)}`;
}
function formatComponent(c) {
    return `- ${c.internalName}: ${c.name} - ${c.description || 'No description'}${formatComponentProps(c.properties)}`;
}
async function getComponentLists(prisma) {
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
//# sourceMappingURL=component.utils.js.map