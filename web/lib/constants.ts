export interface Feature {
  title: string;
  description: string;
  plan: string;
  showInLanding: boolean;
  showInComparePlans: boolean;
  showInPlans: boolean;
}

export const features: Feature[] = [
  {
    title: 'All AI features',
    description: 'Access all AI-powered features including course generation, image creation, content assistance, and intelligent QA tools.',
    plan: 'All Plans',
    showInLanding: false,
    showInComparePlans: false,
    showInPlans: true
  },
  {
    title: 'AI-Generated Courses from Any Source',
    description: 'Upload PDFs, text documents, website links, videos, or audio files and watch as our AI transforms them into structured, block-oriented courses automatically. No matter the format, acadion.ai handles it all.',
    plan: 'All Plans',
    showInLanding: true,
    showInComparePlans: true,
    showInPlans: false
  },
  {
    title: 'Course Copilot',
    description: 'Iterate on your content as you design it, test different alternatives until you get the best version of your work. Save hours of manual work by applying changes or corrections to multiple lessons and modules at once.',
    plan: 'All Plans',
    showInLanding: true,
    showInComparePlans: true,
    showInPlans: false
  },
  {
    title: 'AI Image Generation',
    description: 'Generate custom images on-demand without needing stock photo subscriptions. Create unique, relevant visuals for your courses instantly using AI-powered image generation.',
    plan: 'All Plans',
    showInLanding: true,
    showInComparePlans: true,
    showInPlans: false
  },
  {
    title: 'Full editing control',
    description: 'Manually edit any block or resource in your course. Fine-tune content, adjust layouts, modify assessments, and customize every element to match your exact vision and requirements.',
    plan: 'All Plans',
    showInLanding: true,
    showInComparePlans: true,
    showInPlans: true
  },
  {
    title: 'Real-time Collaboration',
    description: 'Invite your teammates to design and edit courses together in real-time. Share your e-learning projects with colleagues, subject matter experts, and stakeholders for seamless collaboration. Work simultaneously on the same course, see changes as they happen, and streamline your content creation workflow with your entire team. Add unlimited reviewers for QA at no extra cost.',
    plan: 'All Plans',
    showInLanding: true,
    showInComparePlans: true,
    showInPlans: true
  },
  {
    title: 'Industry-Standard Export Formats',
    description: 'Export your courses to SCORM 1.2, xAPI (Tin Can API), PDF, and other standard formats. Seamlessly integrate with any LMS platform including Moodle, Canvas, Blackboard, and more.',
    plan: 'All Plans',
    showInLanding: true,
    showInComparePlans: true,
    showInPlans: true
  },
  {
    title: 'Multi-Language Course Support',
    description: 'Create courses in multiple languages to reach a global audience. Easily translate and localize content to meet the needs of learners worldwide.',
    plan: 'All Plans',
    showInLanding: true,
    showInComparePlans: true,
    showInPlans: false
  },
  {
    title: 'Interactive Activities',
    description: 'Engage learners with diverse interactive elements including multiple choice, flip cards, sorting activities, true/false questions, fill in the blanks, drag and drop, matching pairs, sequencing, hotspots, and more.',
    plan: 'All Plans',
    showInLanding: true,
    showInComparePlans: true,
    showInPlans: false
  },
  {
    title: 'Multimedia Course Creation',
    description: 'Build dynamic courses combining text, images, and videos. Create rich multimedia learning experiences that keep learners engaged and improve knowledge retention.',
    plan: 'All Plans',
    showInLanding: true,
    showInComparePlans: true,
    showInPlans: false
  },
  {
    title: 'AI powered QA',
    description: 'Share your course in Review mode with anyone you want. Receive comments from your team or your SME, then fix them manually or with AI.',
    plan: 'All Plans',
    showInLanding: true,
    showInComparePlans: true,
    showInPlans: false
  },
  {
    title: 'Accessibility QA',
    description: 'Automatically detect and resolve WCAG compliance requirements during the QA process. Ensure your courses are accessible to all learners and meet standard guidance with our built-in accessibility scanner.',
    plan: 'All Plans',
    showInLanding: true,
    showInComparePlans: true,
    showInPlans: false
  },
  {
    title: 'Content Review QA',
    description: 'Review all the content of your course with an artificial intelligence model that acts as a subject matter expert and receive feedback.',
    plan: 'All Plans',
    showInLanding: true,
    showInComparePlans: true,
    showInPlans: false
  },
  {
    title: 'Learning Objectives QA',
    description: 'Automatically check if there is consistency between the objectives and the type of activities in the course to ensure that the student learned.',
    plan: 'All Plans',
    showInLanding: true,
    showInComparePlans: true,
    showInPlans: false
  },
  {
    title: 'Branding QA',
    description: 'Verify your course matches your brand style guide, writing and design system. Ensure consistent visual identity across all your learning materials with automated brand compliance checks.',
    plan: 'All Plans',
    showInLanding: true,
    showInComparePlans: true,
    showInPlans: false
  },
  {
    title: 'Instructional Design Models',
    description: "Create courses based on proven pedagogical frameworks including Bloom's Taxonomy, Kirkpatrick Model, Gagné's 9 Events of Instruction, and ADDIE framework compliance for effective learning outcomes.",
    plan: 'All Plans',
    showInLanding: true,
    showInComparePlans: true,
    showInPlans: false
  },
  {
    title: 'WCAG 2.1 Accessibility Compliance',
    description: 'Ensure your courses are accessible to all learners with WCAG 2.1 compliance. Meet legal requirements and provide inclusive learning experiences for users with disabilities. Includes dark mode support to reduce eye strain and improve accessibility.',
    plan: 'All Plans',
    showInLanding: true,
    showInComparePlans: true,
    showInPlans: true
  },
  {
    title: 'Complete Learning Assets Library',
    description: 'Generate a comprehensive suite of professional learning deliverables automatically: e-learning modules, microlearning content, job aids, QRG, facilitator guides, participant workbooks, ILT, and assessments - everything you need for effective training programs.',
    plan: 'All Plans',
    showInLanding: true,
    showInComparePlans: true,
    showInPlans: false
  },
  {
    title: 'Automatic Version Control',
    description: 'Maintain versions automatically just like Google Docs. Roll back to any previous version at any time by reviewing the complete change history. Never lose your work and track every modification with confidence.',
    plan: 'All Plans',
    showInLanding: true,
    showInComparePlans: true,
    showInPlans: true
  },
  {
    title: 'Professional Portfolio',
    description: 'Showcase your courses to clients and companies with a single click. Create a professional presentation of your work that impresses stakeholders and wins new business. Add a bio to personalize it. Get metrics of visits and engagement.',
    plan: 'Pro',
    showInLanding: true,
    showInComparePlans: true,
    showInPlans: true
  },
  {
    title: 'Project Management & Workflows',
    description: 'Manage your team with comprehensive user roles and permissions. Control access levels, assign courses and specific tasks, and streamline collaboration with customizable workflows and timelines that keep everyone on track.',
    plan: 'Enterprise',
    showInLanding: true,
    showInComparePlans: true,
    showInPlans: true
  }
];
