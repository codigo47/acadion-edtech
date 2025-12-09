// Loading texts for SSE events during course generation
// Each task phase has its own set of loading messages

export const LOADING_TEXTS = {
  // Objective generation phase
  GENERATING_OBJECTIVES: [
    'Analyzing learning requirements...',
    "Applying Bloom's Taxonomy...",
    'Structuring cognitive levels...',
    'Defining measurable outcomes...',
    'Optimizing learning objectives...',
  ],

  // Index/structure generation phase
  GENERATING_INDEX: [
    'Mapping course structure...',
    'Organizing module sequence...',
    'Creating unit hierarchy...',
    'Balancing content distribution...',
    'Finalizing course outline...',
  ],

  // Unit content generation phase
  GENERATING_UNIT: [
    'Crafting lesson introduction...',
    'Building interactive components...',
    'Generating educational content...',
    'Adding visual elements...',
    'Creating knowledge checks...',
    'Optimizing learning flow...',
    'Preparing assessments...',
    'Polishing final layout...',
  ],

  // Title generation phase
  GENERATING_TITLE: [
    'Analyzing topic keywords...',
    'Crafting compelling title...',
    'Optimizing for engagement...',
  ],

  // Course generation phase (when generating all units)
  GENERATING_COURSE: [
    'Starting course generation...',
    'Preparing unit templates...',
    'Generating introductory content...',
    'Building learning activities...',
    'Creating interactive exercises...',
    'Designing knowledge checks...',
    'Crafting assessment components...',
    'Applying instructional design patterns...',
    'Optimizing content flow...',
    'Assembling course modules...',
    'Finalizing course materials...',
  ],
} as const;

export type LoadingTextPhase = keyof typeof LOADING_TEXTS;
