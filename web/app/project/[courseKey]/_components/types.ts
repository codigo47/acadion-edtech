// Proposed index structure type
export interface ProposedIndex {
  title: string;
  modules: Array<{
    number: number;
    title: string;
    units: Array<{ code: string; title: string }>;
  }>;
}

// Evaluation details type
export interface EvaluationDetailsData {
  knowledgeCheckEndUnit: boolean;
  knowledgeCheckEndModule: boolean;
  finalExercise: boolean;
  restrictions: string;
}

// Objectives data type
export interface ObjectivesData {
  items: Array<{
    title: string;
    text: string;
  }>;
}

// Exercise types data type
export interface ExerciseTypesData {
  exerciseTypes: string[];
}

// Branding data type
export interface BrandingData {
  primaryColor: string;
  secondaryColor: string;
  typo1: string;
  typo2: string;
  logo: string;
  guidelines: string;
}

// Unit content types
export interface UnitComponent {
  componentName: string;
  order: number;
  content: {
    title?: string;
    text?: string;
    items?: string[];
    question?: string;
    options?: Array<{ text: string; isCorrect?: boolean }>;
    correctAnswer?: string;
    image?: string;
  };
  styles?: {
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
    fontFamily?: string;
  };
}

export interface UnitContent {
  unitCode: string;
  unitTitle: string;
  components: UnitComponent[];
}

// Exercise type from backend
export interface ExerciseType {
  id: number;
  name: string;
}

// Chat step types
export type ChatStep =
  | 'audience'
  | 'objectives'
  | 'paraphrasing'
  | 'buildMethod'
  | 'modulesCount'
  | 'unitsPerModule'
  | 'generatingIndex'
  | 'courseIndex'
  | 'exerciseTypes'
  | 'evaluation'
  | 'visualIdentity'
  | 'finalConfirmation'
  | 'generating'
  | 'complete';

// Message type
export interface Message {
  type: 'user' | 'ai';
  content: string;
  component?: React.ReactNode;
}

// Font options for visual identity
export const fontOptions = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Source Sans Pro',
  'Nunito',
  'Raleway',
  'Work Sans',
];
