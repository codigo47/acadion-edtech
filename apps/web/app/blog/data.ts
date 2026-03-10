export interface BlogPost {
  slug: string;
  title: { en: string; es: string };
  excerpt: { en: string; es: string };
  date: string;
  readTime: { en: string; es: string };
  category: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'freelance-vs-corporate-instructional-design',
    title: {
      en: 'Freelance vs. Corporate Instructional Design Careers: Which Path Is Best for You in 2025?',
      es: 'Diseño Instruccional: Cómo Elegir entre Freelance y Corporativo',
    },
    excerpt: {
      en: 'Explore the pros and cons of freelance vs. corporate instructional design, the income and lifestyle differences, and how AI tools like Acadion are reshaping opportunities in both paths.',
      es: 'Analiza las ventajas y desventajas del diseño instruccional freelance vs. corporativo, las diferencias en ingresos, estilo de vida y cómo herramientas de IA como Acadion están transformando ambas trayectorias.',
    },
    date: 'February 3, 2024',
    readTime: { en: '8 min read', es: '8 min de lectura' },
    category: 'Career',
    author: 'acadion.ai team',
  },
  {
    slug: 'learning-management-systems-guide',
    title: {
      en: 'A Practical Guide to LMS, LXP, Authoring Tools, and Learning Technologies for Instructional Designers',
      es: 'Guía práctica sobre LMS, LXP, herramientas de autor y tecnologías educativas para diseñadores instruccionales',
    },
    excerpt: {
      en: 'The learning technology landscape is expanding rapidly, making it essential for instructional designers to understand how LMS platforms, LXP systems, authoring tools, and assessment technologies work together.',
      es: 'El ecosistema de tecnologías para el aprendizaje crece rápidamente, por lo que es esencial que los diseñadores instruccionales comprendan cómo funcionan los LMS, los LXP, las herramientas de autor y las plataformas de evaluación.',
    },
    date: 'February 17, 2024',
    readTime: { en: '12 min read', es: '12 min de lectura' },
    category: 'Technology',
    author: 'acadion.ai team',
  },
  {
    slug: 'ai-powered-elearning-comparison',
    title: {
      en: 'Traditional vs. AI-Powered eLearning: Key Differences, Benefits, and Future Trends',
      es: 'eLearning Tradicional vs. eLearning con IA: Diferencias, beneficios y tendencias clave',
    },
    excerpt: {
      en: 'AI is reshaping instructional design, accelerating workflows, enabling personalization, and redefining content quality expectations. Understand the differences between traditional and AI-powered eLearning.',
      es: 'La inteligencia artificial está redefiniendo los tiempos de producción, la personalización y la calidad del contenido en el diseño instruccional.',
    },
    date: 'March 2, 2024',
    readTime: { en: '10 min read', es: '10 min de lectura' },
    category: 'AI',
    author: 'acadion.ai team',
  },
  {
    slug: 'teacher-to-instructional-designer',
    title: {
      en: 'From Teacher to Instructional Designer: Skills, Portfolio Tips, and Career Strategies',
      es: 'De Docente a Diseñador Instruccional: Habilidades, portafolio y estrategias clave',
    },
    excerpt: {
      en: 'Instructional design is one of the most common career shifts for teachers. Your teaching background is a major advantage, especially when paired with modern tools such as Acadion.',
      es: 'El diseño instruccional se ha convertido en una de las transiciones profesionales más comunes para docentes. La experiencia pedagógica es una ventaja decisiva.',
    },
    date: 'March 16, 2024',
    readTime: { en: '9 min read', es: '9 min de lectura' },
    category: 'Career',
    author: 'acadion.ai team',
  },
  {
    slug: 'accessibility-compliance-wcag',
    title: {
      en: 'Accessibility in eLearning: Meeting WCAG Standards Without Compromising Design',
      es: 'Accesibilidad en eLearning: Cómo cumplir con los estándares WCAG sin sacrificar el diseño',
    },
    excerpt: {
      en: "Designing accessible eLearning is more than a compliance task—it's a commitment to ensuring everyone can learn, regardless of their abilities, environment, or device.",
      es: 'La accesibilidad es esencial en el eLearning moderno. No solo responde a leyes como ADA, Section 508 o la Ley Europea de Accesibilidad, sino que también mejora la experiencia de todos los usuarios.',
    },
    date: 'March 30, 2024',
    readTime: { en: '11 min read', es: '11 min de lectura' },
    category: 'Accessibility',
    author: 'acadion.ai team',
  },
  {
    slug: 'instructional-design-models-comparison',
    title: {
      en: 'ADDIE vs SAM vs Design Thinking: How to Choose the Right Instructional Design Model',
      es: 'ADDIE vs SAM vs Design Thinking: Cómo elegir el modelo de diseño instruccional adecuado',
    },
    excerpt: {
      en: 'Not every learning project fits the same instructional design framework. ADDIE, SAM, Design Thinking, Agile, and Action Mapping each offer different strengths.',
      es: 'No todos los proyectos de aprendizaje necesitan el mismo enfoque. Modelos como ADDIE, SAM, Design Thinking, Agile y Action Mapping ofrecen estructuras distintas.',
    },
    date: 'April 13, 2024',
    readTime: { en: '10 min read', es: '10 min de lectura' },
    category: 'Methodology',
    author: 'acadion.ai team',
  },
  {
    slug: 'microlearning-strategies',
    title: {
      en: 'Microlearning That Actually Works: Design Strategies for Busy Modern Learners',
      es: 'Microlearning que realmente funciona: Estrategias de diseño para los aprendices modernos',
    },
    excerpt: {
      en: 'Microlearning is now a core strategy in modern learning and development. When designed well, it supports performance, boosts retention, and fits seamlessly into the flow of work.',
      es: 'El microlearning se consolidó como una estrategia clave en el aprendizaje corporativo. Bien diseñado, mejora el desempeño, refuerza conocimientos y se integra en el flujo de trabajo.',
    },
    date: 'April 27, 2024',
    readTime: { en: '7 min read', es: '7 min de lectura' },
    category: 'Design Strategy',
    author: 'acadion.ai team',
  },
  {
    slug: 'assessment-design-best-practices',
    title: {
      en: 'Beyond Multiple Choice: Innovative Assessment Strategies for eLearning',
      es: 'Más allá del multiple choice: estrategias innovadoras de evaluación en eLearning',
    },
    excerpt: {
      en: 'In eLearning, assessment is where your design either proves its value—or quietly falls apart. Moving beyond traditional multiple-choice quizzes opens up powerful possibilities.',
      es: 'En eLearning, la evaluación es el lugar donde se valida el aprendizaje… o donde se revela que el diseño no fue suficiente.',
    },
    date: 'May 11, 2024',
    readTime: { en: '9 min read', es: '9 min de lectura' },
    category: 'Assessment',
    author: 'acadion.ai team',
  },
  {
    slug: 'building-instructional-design-portfolio',
    title: {
      en: 'Building an Instructional Design Portfolio That Gets You Hired',
      es: 'Cómo construir un portafolio de diseño instruccional que realmente te consiga trabajo',
    },
    excerpt: {
      en: 'Your portfolio is often the deciding factor in landing instructional design positions. A strong portfolio demonstrates your skills, process, and thinking in ways no resume can match.',
      es: 'En diseño instruccional y eLearning, el portafolio suele pesar más que el currículum. Los reclutadores quieren ver cómo pensás, qué creás y cómo resolvés problemas reales.',
    },
    date: 'November 8, 2025',
    readTime: { en: '8 min read', es: '8 min de lectura' },
    category: 'Career',
    author: 'acadion.ai team',
  },
  {
    slug: 'future-of-instructional-design',
    title: {
      en: 'The Future of Instructional Design: Trends Shaping Our Field in 2026 and Beyond',
      es: 'El Futuro del Diseño Instruccional: Tendencias que Transformarán Nuestro Campo en 2026 y Más Allá',
    },
    excerpt: {
      en: 'Instructional design is changing faster than at any other point in its history. New technologies, new expectations, and new ways of working are reshaping what it means to design learning.',
      es: 'El diseño instruccional está cambiando más rápido que en cualquier otro momento de su historia. Nuevas tecnologías, nuevas expectativas y nuevas formas de trabajar.',
    },
    date: 'November 22, 2025',
    readTime: { en: '12 min read', es: '12 min de lectura' },
    category: 'Industry Trends',
    author: 'acadion.ai team',
  },
];
