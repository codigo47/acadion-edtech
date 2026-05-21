export interface PostSEO {
  title: { en: string; es: string };
  description: { en: string; es: string };
  keywords: { en: string[]; es: string[] };
}

export const blogSEO: Record<string, PostSEO> = {
  'freelance-vs-corporate-instructional-design': {
    title: {
      en: 'Freelance vs Corporate Instructional Design: Choosing the Right Path',
      es: 'Freelance vs Corporativo en Diseño Instruccional: Elige tu Camino',
    },
    description: {
      en: 'Learn the key differences between freelance and corporate instructional design roles and find the best path for your eLearning career in 2025.',
      es: 'Conoce las diferencias clave entre diseño instruccional freelance y corporativo. Encuentra el mejor camino para tu carrera en eLearning en 2025.',
    },
    keywords: {
      en: [
        'instructional design career',
        'freelance instructional designer',
        'corporate instructional design',
        'elearning development',
        'freelance vs corporate',
        'AI in instructional design',
        'course creation tools',
      ],
      es: [
        'carrera diseño instruccional',
        'diseñador instruccional freelance',
        'diseño instruccional corporativo',
        'desarrollo elearning',
        'freelance vs corporativo',
        'IA en diseño instruccional',
        'herramientas creación cursos',
      ],
    },
  },
  'learning-management-systems-guide': {
    title: {
      en: 'LMS, LXP & Authoring Tools Guide for Instructional Designers',
      es: 'Guía de LMS, LXP y Herramientas de Autor para Diseñadores Instruccionales',
    },
    description: {
      en: 'Master learning technologies: LMS platforms, LXP systems, authoring tools, and assessment technologies. Essential guide for modern instructional designers.',
      es: 'Domina las tecnologías educativas: plataformas LMS, sistemas LXP, herramientas de autor y evaluación. Guía esencial para diseñadores instruccionales.',
    },
    keywords: {
      en: [
        'LMS platforms',
        'learning management system',
        'LXP learning experience',
        'authoring tools',
        'SCORM xAPI',
        'Articulate Storyline',
        'elearning technology',
      ],
      es: [
        'plataformas LMS',
        'sistema gestión aprendizaje',
        'LXP experiencia aprendizaje',
        'herramientas autor',
        'SCORM xAPI',
        'Articulate Storyline',
        'tecnología elearning',
      ],
    },
  },
  'ai-powered-elearning-comparison': {
    title: {
      en: 'Traditional vs AI-Powered eLearning: Differences & Benefits',
      es: 'eLearning Tradicional vs con IA: Diferencias y Beneficios',
    },
    description: {
      en: 'Compare traditional and AI-powered eLearning development. Discover speed gains, personalization capabilities, and the hybrid future of instructional design.',
      es: 'Compara el desarrollo eLearning tradicional con IA. Descubre mejoras en velocidad, personalización y el futuro híbrido del diseño instruccional.',
    },
    keywords: {
      en: [
        'AI eLearning',
        'artificial intelligence course creation',
        'traditional vs AI learning',
        'elearning development speed',
        'personalized learning AI',
        'instructional design automation',
        'AI authoring tools',
      ],
      es: [
        'eLearning con IA',
        'inteligencia artificial cursos',
        'tradicional vs IA aprendizaje',
        'velocidad desarrollo elearning',
        'aprendizaje personalizado IA',
        'automatización diseño instruccional',
        'herramientas autor IA',
      ],
    },
  },
  'teacher-to-instructional-designer': {
    title: {
      en: 'Teacher to Instructional Designer: Career Transition Guide',
      es: 'De Docente a Diseñador Instruccional: Guía de Transición',
    },
    description: {
      en: 'Complete guide for teachers transitioning to instructional design. Learn required skills, portfolio tips, and job search strategies for 2025.',
      es: 'Guía completa para docentes que quieren ser diseñadores instruccionales. Habilidades requeridas, consejos de portafolio y estrategias de búsqueda laboral.',
    },
    keywords: {
      en: [
        'teacher to instructional designer',
        'career change education',
        'instructional design portfolio',
        'teaching skills transfer',
        'L&D career transition',
        'corporate training jobs',
        'educator career change',
      ],
      es: [
        'docente a diseñador instruccional',
        'cambio carrera educación',
        'portafolio diseño instruccional',
        'habilidades docentes transferibles',
        'transición carrera L&D',
        'trabajos capacitación corporativa',
        'cambio carrera educador',
      ],
    },
  },
  'accessibility-compliance-wcag': {
    title: {
      en: 'eLearning Accessibility: WCAG Compliance Without Compromise',
      es: 'Accesibilidad eLearning: Cumplir WCAG sin Sacrificar Diseño',
    },
    description: {
      en: 'Create accessible eLearning that meets WCAG standards. Learn POUR principles, testing tools, and inclusive design strategies for instructional designers.',
      es: 'Crea eLearning accesible que cumpla WCAG. Aprende principios POUR, herramientas de prueba y estrategias de diseño inclusivo para diseñadores.',
    },
    keywords: {
      en: [
        'WCAG compliance',
        'accessible elearning',
        'ADA Section 508',
        'inclusive design',
        'screen reader compatible',
        'accessibility testing',
        'POUR principles',
      ],
      es: [
        'cumplimiento WCAG',
        'elearning accesible',
        'ADA Section 508',
        'diseño inclusivo',
        'compatible lector pantalla',
        'pruebas accesibilidad',
        'principios POUR',
      ],
    },
  },
  'instructional-design-models-comparison': {
    title: {
      en: 'ADDIE vs SAM vs Design Thinking: Choosing the Right Model',
      es: 'ADDIE vs SAM vs Design Thinking: Elige el Modelo Correcto',
    },
    description: {
      en: 'Compare ADDIE, SAM, Design Thinking, and Agile for instructional design. Find the best framework for your eLearning projects and team.',
      es: 'Compara ADDIE, SAM, Design Thinking y Agile para diseño instruccional. Encuentra el mejor framework para tus proyectos eLearning y equipo.',
    },
    keywords: {
      en: [
        'ADDIE model',
        'SAM instructional design',
        'Design Thinking learning',
        'Agile eLearning',
        'instructional design frameworks',
        'Action Mapping',
        'learning design methodology',
      ],
      es: [
        'modelo ADDIE',
        'SAM diseño instruccional',
        'Design Thinking aprendizaje',
        'Agile eLearning',
        'frameworks diseño instruccional',
        'Action Mapping',
        'metodología diseño aprendizaje',
      ],
    },
  },
  'microlearning-strategies': {
    title: {
      en: 'Microlearning Design Strategies for Modern Learners',
      es: 'Estrategias de Microlearning para Aprendices Modernos',
    },
    description: {
      en: 'Design effective microlearning that boosts retention and fits busy schedules. Learn strategies, formats, and best practices for bite-sized training.',
      es: 'Diseña microlearning efectivo que mejore retención y se adapte a agendas ocupadas. Estrategias, formatos y mejores prácticas para capacitación breve.',
    },
    keywords: {
      en: [
        'microlearning design',
        'bite-sized learning',
        'mobile learning',
        'just-in-time training',
        'short form content',
        'learning retention',
        'performance support',
      ],
      es: [
        'diseño microlearning',
        'aprendizaje breve',
        'aprendizaje móvil',
        'capacitación justo a tiempo',
        'contenido corto',
        'retención aprendizaje',
        'soporte desempeño',
      ],
    },
  },
  'assessment-design-best-practices': {
    title: {
      en: 'Beyond Multiple Choice: Innovative eLearning Assessments',
      es: 'Más Allá del Multiple Choice: Evaluaciones Innovadoras',
    },
    description: {
      en: 'Design assessments that measure real learning. Explore scenarios, simulations, performance tasks, and authentic evaluation strategies for eLearning.',
      es: 'Diseña evaluaciones que midan aprendizaje real. Explora escenarios, simulaciones, tareas de desempeño y estrategias de evaluación auténtica.',
    },
    keywords: {
      en: [
        'elearning assessment',
        'scenario-based evaluation',
        'authentic assessment',
        'performance evaluation',
        'learning measurement',
        'formative assessment',
        'competency testing',
      ],
      es: [
        'evaluación elearning',
        'evaluación basada escenarios',
        'evaluación auténtica',
        'evaluación desempeño',
        'medición aprendizaje',
        'evaluación formativa',
        'pruebas competencias',
      ],
    },
  },
  'building-instructional-design-portfolio': {
    title: {
      en: 'Build an Instructional Design Portfolio That Gets You Hired',
      es: 'Crea un Portafolio de Diseño Instruccional que te Consiga Trabajo',
    },
    description: {
      en: 'Create a winning instructional design portfolio. Learn what to include, how to showcase your process, and strategies to stand out to employers.',
      es: 'Crea un portafolio ganador de diseño instruccional. Qué incluir, cómo mostrar tu proceso y estrategias para destacar ante empleadores.',
    },
    keywords: {
      en: [
        'instructional design portfolio',
        'ID portfolio examples',
        'elearning portfolio',
        'design samples',
        'career portfolio',
        'showcase projects',
        'hiring instructional designer',
      ],
      es: [
        'portafolio diseño instruccional',
        'ejemplos portafolio ID',
        'portafolio elearning',
        'muestras diseño',
        'portafolio carrera',
        'mostrar proyectos',
        'contratar diseñador instruccional',
      ],
    },
  },
  'future-of-instructional-design': {
    title: {
      en: 'Future of Instructional Design: Trends for 2026 and Beyond',
      es: 'El Futuro del Diseño Instruccional: Tendencias 2026 y Más',
    },
    description: {
      en: 'Explore emerging trends shaping instructional design. AI, immersive learning, skills-based training, and the evolving role of L&D professionals.',
      es: 'Explora tendencias emergentes en diseño instruccional. IA, aprendizaje inmersivo, capacitación basada en habilidades y el rol evolutivo de L&D.',
    },
    keywords: {
      en: [
        'future of learning',
        'instructional design trends',
        'AI learning development',
        'immersive learning VR',
        'skills-based training',
        'L&D innovation',
        'elearning 2026',
      ],
      es: [
        'futuro del aprendizaje',
        'tendencias diseño instruccional',
        'IA desarrollo aprendizaje',
        'aprendizaje inmersivo VR',
        'capacitación basada habilidades',
        'innovación L&D',
        'elearning 2026',
      ],
    },
  },
};

export const defaultSEO: PostSEO = {
  title: {
    en: 'Instructional Design Blog | Acadion.ai',
    es: 'Blog de Diseño Instruccional | Acadion.ai',
  },
  description: {
    en: 'Expert insights, strategies, and guides for instructional designers. Learn about eLearning development, AI tools, and L&D best practices.',
    es: 'Conocimientos expertos, estrategias y guías para diseñadores instruccionales. Aprende sobre desarrollo eLearning, herramientas IA y mejores prácticas L&D.',
  },
  keywords: {
    en: ['instructional design', 'elearning', 'L&D', 'course creation'],
    es: ['diseño instruccional', 'elearning', 'L&D', 'creación de cursos'],
  },
};
