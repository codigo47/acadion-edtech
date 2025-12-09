'use client';

import { useState, useEffect, useRef, useCallback, ComponentType } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useGenerateTitle, useCourse, useSetAudience, useSetObjective, useSetBuildingMethod, useSetModules, useSetUnits, useGetExerciseTypes, useSetEvaluation, useSetEvaluationDetails, useSetBranding, useGenerateCourse, useCourseComponents } from '../../../lib/hooks/use-course';
import { useCourseSSE, type ProposedIndex as SSEProposedIndex, type SSEEventData } from '../../../lib/hooks/use-course-sse';
import * as Blocks from '../../components/blocks';

// Exercise type from backend
interface ExerciseType {
  id: number;
  name: string;
}

// Font options for visual identity
const fontOptions = [
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

// Proposed index structure type
interface ProposedIndex {
  title: string;
  modules: Array<{
    number: number;
    title: string;
    units: Array<{ code: string; title: string }>;
  }>;
}

// Component to render the course index
function CourseIndexView({ index }: { index: ProposedIndex }) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-5 max-w-2xl">
      <div className="text-lg font-semibold text-[#1a1a1a] mb-4">{index.title}</div>
      <div className="space-y-4">
        {index.modules.map((module, moduleIdx) => (
          <div key={module.number} className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#9F80DA] text-white text-sm font-medium">
                {module.number}
              </span>
              <span className="font-medium text-[#1a1a1a]">{module.title}</span>
            </div>
            <div className="ml-9 space-y-1">
              {module.units.map((unit) => (
                <div
                  key={unit.code}
                  className="flex items-center gap-2 text-sm text-gray-600 py-1 px-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-[#9F80DA] font-medium">{unit.code}</span>
                  <span>{unit.title}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Evaluation details type
interface EvaluationDetailsData {
  knowledgeCheckEndUnit: boolean;
  knowledgeCheckEndModule: boolean;
  finalExercise: boolean;
  restrictions: string;
}

// Component to render evaluation details summary
function EvaluationDetailsView({ details }: { details: EvaluationDetailsData }) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-4 max-w-md">
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Knowledge check at end of unit:</span>
          <span className={details.knowledgeCheckEndUnit ? 'text-green-600 font-medium' : 'text-gray-400'}>
            {details.knowledgeCheckEndUnit ? 'Yes' : 'No'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Knowledge check at end of module:</span>
          <span className={details.knowledgeCheckEndModule ? 'text-green-600 font-medium' : 'text-gray-400'}>
            {details.knowledgeCheckEndModule ? 'Yes' : 'No'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Final exercise:</span>
          <span className={details.finalExercise ? 'text-green-600 font-medium' : 'text-gray-400'}>
            {details.finalExercise ? 'Yes' : 'No'}
          </span>
        </div>
        {details.restrictions && (
          <div className="pt-2 border-t border-gray-100">
            <span className="text-gray-600">Restrictions: </span>
            <span className="text-gray-800">{details.restrictions}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Objectives data type
interface ObjectivesData {
  items: Array<{
    title: string;
    text: string;
  }>;
}

// Component to render objectives summary
function ObjectivesView({ objectives }: { objectives: ObjectivesData }) {
  // Group objectives by Bloom level
  const bloomLevels = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'];
  const bloomColors: Record<string, { bg: string; border: string; text: string }> = {
    Remember: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
    Understand: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' },
    Apply: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700' },
    Analyze: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700' },
    Evaluate: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' },
    Create: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' },
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-5 max-w-2xl">
      <div className="space-y-3">
        {objectives.items.map((item, index) => {
          const colors = bloomColors[item.title] || { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700' };
          return (
            <div
              key={index}
              className={`${colors.bg} ${colors.border} border rounded-lg p-3`}
            >
              <div className="flex items-start gap-3">
                <span className={`${colors.text} font-semibold text-sm whitespace-nowrap`}>
                  {item.title}
                </span>
                <span className="text-gray-700 text-sm">{item.text}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Exercise types data type
interface ExerciseTypesData {
  exerciseTypes: string[];
}

// Component to render exercise types summary
function ExerciseTypesView({ data }: { data: ExerciseTypesData }) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-4 max-w-md">
      <div className="flex flex-wrap gap-2">
        {data.exerciseTypes.map((type, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}

// Branding data type
interface BrandingData {
  primaryColor: string;
  secondaryColor: string;
  typo1: string;
  typo2: string;
  logo: string;
  guidelines: string;
}

// Component to render branding summary
function BrandingView({ branding }: { branding: BrandingData }) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-4 max-w-md">
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-3">
          <span className="text-gray-600">Primary Color:</span>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md border border-gray-300"
              style={{ backgroundColor: branding.primaryColor }}
            />
            <span className="text-gray-800 font-mono">{branding.primaryColor}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-600">Secondary Color:</span>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md border border-gray-300"
              style={{ backgroundColor: branding.secondaryColor }}
            />
            <span className="text-gray-800 font-mono">{branding.secondaryColor}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Typography 1:</span>
          <span className="text-gray-800">{branding.typo1}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Typography 2:</span>
          <span className="text-gray-800">{branding.typo2}</span>
        </div>
        {branding.logo && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Logo:</span>
            <span className="text-gray-800">{branding.logo}</span>
          </div>
        )}
        {branding.guidelines && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Guidelines:</span>
            <span className="text-gray-800">{branding.guidelines}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Unit content types
interface UnitComponent {
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

interface UnitContent {
  unitCode: string;
  unitTitle: string;
  components: UnitComponent[];
}

// Map of component names to their React components
const BlockComponents: Record<string, ComponentType<any>> = {
  // Paragraph Blocks
  ParagraphBlock: Blocks.ParagraphBlock,
  ParagraphWithHeadingBlock: Blocks.ParagraphWithHeadingBlock,
  ParagraphWithSubheadingBlock: Blocks.ParagraphWithSubheadingBlock,
  // Heading Blocks
  HeadingBlock: Blocks.HeadingBlock,
  SubheadingBlock: Blocks.SubheadingBlock,
  // Highlight Blocks
  HighlightBlock: Blocks.HighlightBlock,
  HighlightNoteBlock: Blocks.HighlightNoteBlock,
  HighlightColumnBlock: Blocks.HighlightColumnBlock,
  HighlightCenterLineBlock: Blocks.HighlightCenterLineBlock,
  HighlightLeftLineBlock: Blocks.HighlightLeftLineBlock,
  HighlightBackgroundBlock: Blocks.HighlightBackgroundBlock,
  // Image Blocks
  ImageBlock: Blocks.ImageBlock,
  ImageWithTextBlock: Blocks.ImageWithTextBlock,
  ImageWithTextLeftBlock: Blocks.ImageWithTextLeftBlock,
  ImageWithTextCenterBlock: Blocks.ImageWithTextCenterBlock,
  ImageWithTextBottomBlock: Blocks.ImageWithTextBottomBlock,
  ImageWithTextTopBlock: Blocks.ImageWithTextTopBlock,
  // Quote Blocks
  QuoteBlock: Blocks.QuoteBlock,
  QuoteCenterBorderBlock: Blocks.QuoteCenterBorderBlock,
  QuoteCenterLightBlock: Blocks.QuoteCenterLightBlock,
  QuoteLeftLightBlock: Blocks.QuoteLeftLightBlock,
  QuoteLeftBlock: Blocks.QuoteLeftBlock,
  QuoteImageBlock: Blocks.QuoteImageBlock,
  // Comparison Blocks
  ComparisonBlock: Blocks.ComparisonBlock,
  ComparisonProsConsBlock: Blocks.ComparisonProsConsBlock,
  ComparisonCauseEffectBlock: Blocks.ComparisonCauseEffectBlock,
  ComparisonDosDontsBlock: Blocks.ComparisonDosDontsBlock,
  ComparisonMythFactBlock: Blocks.ComparisonMythFactBlock,
  ComparisonBeforeAfterBlock: Blocks.ComparisonBeforeAfterBlock,
  // Chat Blocks
  ChatBlock: Blocks.ChatBlock,
  ChatFeedbackBlock: Blocks.ChatFeedbackBlock,
  ChatQABlock: Blocks.ChatQABlock,
  ChatQuestionWallBlock: Blocks.ChatQuestionWallBlock,
  ChatDialogBlock: Blocks.ChatDialogBlock,
  // Other Static Blocks
  TableBlock: Blocks.TableBlock,
  ListBlock: Blocks.ListBlock,
  GalleryBlock: Blocks.GalleryBlock,
  GraphBlock: Blocks.GraphBlock,
  TimelineBlock: Blocks.TimelineBlock,
  SeparatorBlock: Blocks.SeparatorBlock,
  TestimonialBlock: Blocks.TestimonialBlock,
  StoryTellingBlock: Blocks.StoryTellingBlock,
  ColumnsBlock: Blocks.ColumnsBlock,
  ReviewsBlock: Blocks.ReviewsBlock,
  VideoBlock: Blocks.VideoBlock,
  AudioBlock: Blocks.AudioBlock,
  AttachmentBlock: Blocks.AttachmentBlock,
  EmbedBlock: Blocks.EmbedBlock,
  // Interactive Blocks
  CheckboxBlock: Blocks.CheckboxBlock,
  CarouselBlock: Blocks.CarouselBlock,
  AccordionBlock: Blocks.AccordionBlock,
  TabsBlock: Blocks.TabsBlock,
  LabeledImageBlock: Blocks.LabeledImageBlock,
  ScenarioBlock: Blocks.ScenarioBlock,
  SortingBlock: Blocks.SortingBlock,
  SortingStepsBlock: Blocks.SortingStepsBlock,
  FlashCardBlock: Blocks.FlashCardBlock,
  MultipleChoiceBlock: Blocks.MultipleChoiceBlock,
  MultipleResponseBlock: Blocks.MultipleResponseBlock,
  FillInTheBlankBlock: Blocks.FillInTheBlankBlock,
  MatchingPairsBlock: Blocks.MatchingPairsBlock,
  ButtonBlock: Blocks.ButtonBlock,
  ButtonStackBlock: Blocks.ButtonStackBlock,
};

// Component to render a single course component using the actual block components
function CourseComponent({ component }: { component: UnitComponent }) {
  const { componentName, content } = component;

  // Get the corresponding block component
  const BlockComponent = BlockComponents[componentName];

  if (BlockComponent) {
    // Pass the content directly as props to the block component
    return <BlockComponent {...content} />;
  }

  // Fallback for unknown components
  return (
    <div className="py-6 px-6 bg-yellow-50 border border-yellow-200 rounded-lg">
      <p className="text-yellow-700 text-sm">Unknown component: {componentName}</p>
      <pre className="mt-2 text-xs text-gray-600 overflow-auto">
        {JSON.stringify(content, null, 2)}
      </pre>
    </div>
  );
}

// Component to render unit content
function UnitContentViewer({ unitContent }: { unitContent: UnitContent }) {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {unitContent.components
          .sort((a, b) => a.order - b.order)
          .map((component, idx) => (
            <CourseComponent key={idx} component={component} />
          ))}
      </div>
    </div>
  );
}

// Chat step types
type ChatStep =
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
interface Message {
  type: 'user' | 'ai';
  content: string;
  component?: React.ReactNode;
}

// ChatGPT/Anthropic style loading indicator - now receives text from SSE
function LoadingIndicator({ loadingText }: { loadingText: string | null }) {
  const displayText = loadingText || 'Processing...';

  return (
    <div className="flex justify-start">
      <div className="max-w-2xl">
        <div className="flex items-center gap-2">
          {/* Animated dots */}
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          {/* Loading message from SSE */}
          <AnimatePresence mode="wait">
            <motion.span
              key={displayText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-gray-500 text-sm"
            >
              {displayText}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Completion popup
function CompletionPopup({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl"
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Generated!</h2>
          <p className="text-gray-600 mb-6">
            Your course has been successfully created. You can now edit it manually or continue refining it with AI assistance using the chat panel.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-[#9F80DA] hover:bg-[#8A6BC5] text-white font-medium py-3 px-6 rounded-xl transition-colors"
          >
            Start Editing
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const courseKey = params.courseKey as string;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoadingCourse, setIsLoadingCourse] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);
  const initialInputRef = useRef<HTMLTextAreaElement>(null);

  // Conversation state
  const [currentStep, setCurrentStep] = useState<ChatStep>('audience');
  const [messages, setMessages] = useState<Message[]>([]);

  // State for SSE connection
  const [isSSEEnabled, setIsSSEEnabled] = useState(false);

  // State to store the proposed index
  const [proposedIndex, setProposedIndex] = useState<ProposedIndex | null>(null);

  // Editor layout state
  const [showEditorLayout, setShowEditorLayout] = useState(false);
  const [selectedUnitCode, setSelectedUnitCode] = useState<string | null>(null);

  // Loading state
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);

  // SSE event handlers
  const handleObjectivesCompleted = useCallback((objectivesMessage: string, buildMethodMessage: string) => {
    // Try to parse objectives as JSON for widget display
    let objectivesData: ObjectivesData | null = null;
    try {
      const parsed = JSON.parse(objectivesMessage);
      if (parsed && Array.isArray(parsed.items)) {
        objectivesData = parsed as ObjectivesData;
      }
    } catch {
      // Not JSON, will display as text
    }

    setMessages((prev) => [
      ...prev,
      objectivesData
        ? {
            type: 'ai' as const,
            content: 'Based on your input, here are the learning objectives for your course:',
            component: <ObjectivesView objectives={objectivesData} />,
          }
        : { type: 'ai' as const, content: objectivesMessage },
      { type: 'ai' as const, content: buildMethodMessage },
    ]);
    setCurrentStep('buildMethod');
    setTimeout(() => chatInputRef.current?.focus(), 100);
  }, []);

  const handleIndexCompleted = useCallback((index: SSEProposedIndex) => {
    setProposedIndex(index);
    setCurrentStep('courseIndex');
  }, []);

  const handleUnitCompleted = useCallback((unitCode: string, unitTitle: string, progress: SSEEventData['progress']) => {
    console.log(`Unit ${unitCode} completed:`, progress);
  }, []);

  const handleGenerationComplete = useCallback(() => {
    setIsGenerating(false);
    setShowEditorLayout(true);
    setShowCompletionPopup(true);
    setCurrentStep('complete');
    setIsSSEEnabled(false);
  }, []);

  const handleSSEError = useCallback((error: string) => {
    console.error('SSE Error:', error);
  }, []);

  // SSE Hook
  const sseState = useCourseSSE(courseKey, {
    enabled: isSSEEnabled,
    onObjectivesCompleted: handleObjectivesCompleted,
    onIndexCompleted: handleIndexCompleted,
    onUnitCompleted: handleUnitCompleted,
    onGenerationComplete: handleGenerationComplete,
    onError: handleSSEError,
  });

  // React Query hooks
  const generateTitleMutation = useGenerateTitle();
  const setAudienceMutation = useSetAudience();
  const setObjectiveMutation = useSetObjective();
  const setBuildingMethodMutation = useSetBuildingMethod();
  const setModulesMutation = useSetModules();
  const setUnitsMutation = useSetUnits();
  const getExerciseTypesMutation = useGetExerciseTypes();
  const setEvaluationMutation = useSetEvaluation();
  const setEvaluationDetailsMutation = useSetEvaluationDetails();
  const setBrandingMutation = useSetBranding();
  const generateCourseMutation = useGenerateCourse();
  const { data: courseData, isLoading: isCourseLoading } = useCourse(courseKey);
  const { data: courseComponentsData } = useCourseComponents(courseKey);

  // Get conversationKey from courseData
  const resolvedConversationKey = courseData?.conversations?.[0]?.id || null;

  // Helper to check if content is a course index JSON and parse it
  const parseIndexFromContent = (content: string): ProposedIndex | null => {
    try {
      const parsed = JSON.parse(content);
      // Check if it has the expected structure of a course index
      if (parsed && typeof parsed.title === 'string' && Array.isArray(parsed.modules)) {
        return parsed as ProposedIndex;
      }
    } catch {
      // Not JSON, return null
    }
    return null;
  };

  // Helper to parse evaluation details from message content
  const parseEvaluationDetailsFromContent = (content: string): EvaluationDetailsData | null => {
    try {
      const parsed = JSON.parse(content);
      if (parsed && parsed.evaluationDetails) {
        return parsed.evaluationDetails as EvaluationDetailsData;
      }
    } catch {
      // Not JSON, return null
    }
    return null;
  };

  // Helper to parse exercise types from message content
  const parseExerciseTypesFromContent = (content: string): ExerciseTypesData | null => {
    try {
      const parsed = JSON.parse(content);
      if (parsed && Array.isArray(parsed.exerciseTypes)) {
        return parsed as ExerciseTypesData;
      }
    } catch {
      // Not JSON, return null
    }
    return null;
  };

  // Helper to parse branding from message content
  const parseBrandingFromContent = (content: string): BrandingData | null => {
    try {
      const parsed = JSON.parse(content);
      if (parsed && parsed.branding) {
        return parsed.branding as BrandingData;
      }
    } catch {
      // Not JSON, return null
    }
    return null;
  };

  // Helper to parse objectives from message content
  const parseObjectivesFromContent = (content: string): ObjectivesData | null => {
    try {
      const parsed = JSON.parse(content);
      if (parsed && Array.isArray(parsed.items)) {
        return parsed as ObjectivesData;
      }
    } catch {
      // Not JSON, return null
    }
    return null;
  };

  // Load existing messages from course data
  useEffect(() => {
    if (!isCourseLoading && courseData) {
      const existingMessages = courseData.conversations?.[0]?.messages || [];
      const steps = courseData.steps || [];

      if (existingMessages.length > 0) {
        // Course has existing messages - show chat directly
        let foundIndex: ProposedIndex | null = null;
        const formattedMessages: Message[] = existingMessages.map((msg) => {
          // Check for course index (assistant message)
          if (msg.role === 'assistant') {
            const indexData = parseIndexFromContent(msg.content);
            if (indexData) {
              foundIndex = indexData;
              setProposedIndex(indexData);
              return {
                type: 'ai' as const,
                content: "Here's the proposed course structure:",
                component: <CourseIndexView index={indexData} />,
              };
            }

            // Check for objectives
            const objectivesData = parseObjectivesFromContent(msg.content);
            if (objectivesData) {
              return {
                type: 'ai' as const,
                content: 'Based on your input, here are the learning objectives for your course:',
                component: <ObjectivesView objectives={objectivesData} />,
              };
            }
          }

          // Check for user message JSON types
          if (msg.role === 'user') {
            // Check for exercise types
            const exerciseTypesData = parseExerciseTypesFromContent(msg.content);
            if (exerciseTypesData) {
              return {
                type: 'user' as const,
                content: 'Selected exercise types',
                component: <ExerciseTypesView data={exerciseTypesData} />,
              };
            }

            // Check for evaluation details
            const evaluationData = parseEvaluationDetailsFromContent(msg.content);
            if (evaluationData) {
              return {
                type: 'user' as const,
                content: 'Evaluation settings',
                component: <EvaluationDetailsView details={evaluationData} />,
              };
            }

            // Check for branding
            const brandingData = parseBrandingFromContent(msg.content);
            if (brandingData) {
              return {
                type: 'user' as const,
                content: 'Visual identity settings',
                component: <BrandingView branding={brandingData} />,
              };
            }
          }

          return {
            type: msg.role === 'user' ? 'user' : 'ai',
            content: msg.content,
          } as Message;
        });

        setMessages(formattedMessages);
        setHasSubmitted(true);

        // Set topic from first user message
        const firstUserMessage = existingMessages.find((msg) => msg.role === 'user');
        if (firstUserMessage) {
          setTopic(firstUserMessage.content);
        }

        // Check if course is already completed - show editor layout directly
        if (courseData.status === 'completed') {
          // Get index from output if not found in messages
          const indexFromOutput = courseData.output?.proposedIndex as ProposedIndex | undefined;
          const courseIndex = foundIndex || indexFromOutput;

          if (courseIndex) {
            setProposedIndex(courseIndex);
            // Auto-select first unit if available
            if (courseIndex.modules.length > 0 && courseIndex.modules[0].units.length > 0) {
              setSelectedUnitCode(courseIndex.modules[0].units[0].code);
            }
          }

          setShowEditorLayout(true);
          setCurrentStep('complete');
          setIsLoadingCourse(false);
          return;
        }

        // Check if course is currently generating units
        if (courseData.status === 'generating') {
          // Get index from output
          const indexFromOutput = courseData.output?.proposedIndex as ProposedIndex | undefined;
          if (indexFromOutput) {
            setProposedIndex(indexFromOutput);
          }
          setCurrentStep('generating');
          setIsGenerating(true);
          setIsSSEEnabled(true);
          setIsLoadingCourse(false);
          return;
        }

        // Determine current step based on course steps status
        const indexStep = steps.find((s) => s.type === 'generating_index');
        const objectivesStep = steps.find((s) => s.type === 'generating_objectives');

        if (indexStep?.status === 'completed') {
          // Index is generated, show courseIndex step with continue button
          // Get index from messages or from course output
          const indexFromOutput = courseData.output?.proposedIndex as ProposedIndex | undefined;
          const courseIndex = foundIndex || indexFromOutput;
          if (courseIndex) {
            setProposedIndex(courseIndex);
            setCurrentStep('courseIndex');
          }
        } else if (indexStep?.status === 'pending' || indexStep?.status === 'running') {
          // Index is being generated - enable SSE
          setCurrentStep('generatingIndex');
          setIsSSEEnabled(true);
        } else if (objectivesStep?.status === 'completed') {
          // Objectives completed, waiting for build method
          setCurrentStep('buildMethod');
        } else if (objectivesStep?.status === 'pending' || objectivesStep?.status === 'running') {
          // Objectives being generated - enable SSE
          setCurrentStep('paraphrasing');
          setIsSSEEnabled(true);
        }
      }

      setIsLoadingCourse(false);

      // Focus initial input when loaded and not submitted
      if (!hasSubmitted) {
        setTimeout(() => initialInputRef.current?.focus(), 100);
      }
    }
  }, [isCourseLoading, courseData]);

  // Update title when course data changes
  useEffect(() => {
    if (courseData?.title) {
      console.log('Course title generated:', courseData.title);
    }
  }, [courseData?.title]);

  // Form data
  const [topic, setTopic] = useState('');
  const [audienceResponse, setAudienceResponse] = useState('');
  const [objectivesResponse, setObjectivesResponse] = useState('');
  const [buildMethod, setBuildMethod] = useState<string>('');
  const [modulesCount, setModulesCount] = useState(0);
  const [maxModules, setMaxModules] = useState(10);
  const [maxUnits, setMaxUnits] = useState(10);
  const [unitsPerModule, setUnitsPerModule] = useState<number[]>([]);
  const [exerciseTypes, setExerciseTypes] = useState<ExerciseType[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
  const [evaluationSettings, setEvaluationSettings] = useState({
    unitKnowledgeCheck: false,
    moduleKnowledgeCheck: false,
    finalExercise: false,
    restrictions: '',
  });
  const [visualIdentity, setVisualIdentity] = useState({
    primaryColor: '#9F80DA',
    secondaryColor: '#1a1a1a',
    font1: 'Inter',
    font2: 'Inter',
  });

  // Scroll to bottom on new messages or SSE updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentStep, sseState.units, sseState.progress, sseState.loadingText]);

  // Focus chat input when messages change and chat is visible
  useEffect(() => {
    if (hasSubmitted && !showEditorLayout && messages.length > 0) {
      // Wait for the chat view animation to complete
      const timer = setTimeout(() => {
        chatInputRef.current?.focus();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [hasSubmitted, showEditorLayout, messages.length]);

  // Scroll to selected unit when it changes
  useEffect(() => {
    if (selectedUnitCode && showEditorLayout) {
      const element = document.getElementById(`unit-${selectedUnitCode}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [selectedUnitCode, showEditorLayout]);

  // Handle initial topic submission - calls /course/title endpoint
  const handleTopicSubmit = async () => {
    if (prompt.trim() && courseKey && resolvedConversationKey) {
      setTopic(prompt);
      setHasSubmitted(true);

      // Add initial user message
      setMessages([{ type: 'user', content: prompt }]);

      try {
        // Call backend to generate title and get AI response
        const result = await generateTitleMutation.mutateAsync({
          courseKey,
          conversationKey: resolvedConversationKey,
          topic: prompt,
        });

        // Add AI response message from backend
        setMessages((prev) => [
          ...prev,
          { type: 'ai', content: result.aiMessage },
        ]);

        console.log('Title generation started');
      } catch (error) {
        console.error('Failed to generate title:', error);
      }
    }
  };

  const handleTopicInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTopicSubmit();
    }
  };

  // Handle chat message submission during conversation flow
  const handleChatMessageSubmit = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatInput('');

    if (currentStep === 'audience') {
      setAudienceResponse(userMessage);
      setMessages((prev) => [
        ...prev,
        { type: 'user', content: userMessage },
      ]);

      if (courseKey && resolvedConversationKey) {
        try {
          const result = await setAudienceMutation.mutateAsync({
            courseKey,
            conversationKey: resolvedConversationKey,
            audience: userMessage,
          });

          setMessages((prev) => [
            ...prev,
            { type: 'ai', content: result.aiMessage },
          ]);
          setCurrentStep('objectives');
          // Focus chat input after AI response
          setTimeout(() => chatInputRef.current?.focus(), 100);
        } catch (error) {
          console.error('Failed to set audience:', error);
        }
      }
    } else if (currentStep === 'objectives') {
      setObjectivesResponse(userMessage);
      setMessages((prev) => [
        ...prev,
        { type: 'user', content: userMessage },
      ]);

      if (courseKey && resolvedConversationKey) {
        try {
          await setObjectiveMutation.mutateAsync({
            courseKey,
            conversationKey: resolvedConversationKey,
            objective: userMessage,
          });

          setCurrentStep('paraphrasing');
          // Enable SSE for objective generation updates
          setIsSSEEnabled(true);
        } catch (error) {
          console.error('Failed to set objective:', error);
        }
      }
    }
  };

  const handleChatInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChatMessageSubmit();
    }
  };

  // Handle build method selection
  const handleBuildMethodSelect = async (method: 'ai' | 'references_ai' | 'material_only') => {
    setBuildMethod(method);
    const methodLabels: Record<string, string> = {
      ai: 'With AI',
      references_ai: 'With my references + AI',
      material_only: 'Only with my material',
    };

    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      { type: 'user', content: methodLabels[method] },
    ]);

    if (courseKey && resolvedConversationKey) {
      try {
        const result = await setBuildingMethodMutation.mutateAsync({
          courseKey,
          conversationKey: resolvedConversationKey,
          buildingMethod: method,
        });

        setMessages((prev) => [
          ...prev,
          { type: 'ai', content: result.aiMessage },
        ]);
        setMaxModules(result.maxModules);
        setCurrentStep('modulesCount');
      } catch (error) {
        console.error('Failed to set building method:', error);
      }
    }
  };

  // Handle modules count selection
  const handleModulesCountSelect = async (count: number) => {
    setModulesCount(count);
    setUnitsPerModule(Array(count).fill(3)); // Default 3 units per module

    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      { type: 'user', content: `${count} modules` },
    ]);

    if (courseKey && resolvedConversationKey) {
      try {
        const result = await setModulesMutation.mutateAsync({
          courseKey,
          conversationKey: resolvedConversationKey,
          modulesCount: count,
        });

        setMessages((prev) => [
          ...prev,
          { type: 'ai', content: result.aiMessage },
        ]);
        setMaxUnits(result.maxUnits);
        setCurrentStep('unitsPerModule');
      } catch (error) {
        console.error('Failed to set modules:', error);
      }
    }
  };

  // Handle units per module change
  const handleUnitsChange = (moduleIndex: number, units: number) => {
    setUnitsPerModule((prev) => {
      const newUnits = [...prev];
      newUnits[moduleIndex] = units;
      return newUnits;
    });
  };

  // Handle units continue
  const handleUnitsContinue = async () => {
    const unitsSummary = unitsPerModule.map((u, i) => `Module ${i + 1}: ${u} units`).join(', ');

    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      { type: 'user', content: unitsSummary },
    ]);

    if (courseKey && resolvedConversationKey) {
      try {
        // Build modules object for API
        const modulesData: Record<number, { units: number }> = {};
        unitsPerModule.forEach((units, index) => {
          modulesData[index + 1] = { units };
        });

        const result = await setUnitsMutation.mutateAsync({
          courseKey,
          conversationKey: resolvedConversationKey,
          modules: modulesData,
        });

        // Add AI message from backend
        if (result.aiMessage) {
          const aiMessage = result.aiMessage;
          setMessages((prev) => [...prev, { type: 'ai' as const, content: aiMessage }]);
        }

        // Navigate to the screen indicated by backend
        const nextScreen = (result.nextScreen || 'evaluation') as ChatStep;
        setCurrentStep(nextScreen);
      } catch (error) {
        console.error('Failed to set units:', error);
      }
    }
  };

  // Handle exercise toggle
  const handleExerciseToggle = (exerciseId: number) => {
    setSelectedExercises((prev) =>
      prev.includes(exerciseId) ? prev.filter((e) => e !== exerciseId) : [...prev, exerciseId]
    );
  };

  // Handle exercises continue
  const handleExercisesContinue = async () => {
    const selectedComponents = exerciseTypes.filter((e) => selectedExercises.includes(e.id));

    if (courseKey && resolvedConversationKey) {
      try {
        const exerciseTypesData: ExerciseTypesData = {
          exerciseTypes: selectedComponents.map((c) => c.name),
        };

        const result = await setEvaluationMutation.mutateAsync({
          courseKey,
          conversationKey: resolvedConversationKey,
          selectedComponents,
        });

        // Add user message with component, then AI message from backend
        setMessages((prev) => [
          ...prev,
          {
            type: 'user',
            content: 'Selected exercise types',
            component: <ExerciseTypesView data={exerciseTypesData} />,
          },
          { type: 'ai', content: result.aiMessage },
        ]);

        setCurrentStep('evaluation');
      } catch (error) {
        console.error('Failed to set evaluation:', error);
      }
    }
  };

  // Handle evaluation continue
  const handleEvaluationContinue = async () => {
    if (courseKey && resolvedConversationKey) {
      try {
        const evaluationDetailsData: EvaluationDetailsData = {
          knowledgeCheckEndUnit: evaluationSettings.unitKnowledgeCheck,
          knowledgeCheckEndModule: evaluationSettings.moduleKnowledgeCheck,
          finalExercise: evaluationSettings.finalExercise,
          restrictions: evaluationSettings.restrictions,
        };

        const result = await setEvaluationDetailsMutation.mutateAsync({
          courseKey,
          conversationKey: resolvedConversationKey,
          ...evaluationDetailsData,
        });

        // Add evaluation details as user message with component
        const newMessages: Message[] = [
          {
            type: 'user',
            content: 'Evaluation settings',
            component: <EvaluationDetailsView details={evaluationDetailsData} />,
          },
        ];

        // Add AI message if present
        if (result.aiMessage) {
          newMessages.push({ type: 'ai', content: result.aiMessage });
        }

        setMessages((prev) => [...prev, ...newMessages]);

        // Navigate to the screen indicated by backend
        const nextScreen = (result.nextScreen || 'visualIdentity') as ChatStep;
        setCurrentStep(nextScreen);
      } catch (error) {
        console.error('Failed to set evaluation details:', error);
      }
    }
  };

  // Handle visual identity continue
  const handleVisualIdentityContinue = async () => {
    if (courseKey && resolvedConversationKey) {
      try {
        const brandingData: BrandingData = {
          primaryColor: visualIdentity.primaryColor,
          secondaryColor: visualIdentity.secondaryColor,
          typo1: visualIdentity.font1,
          typo2: visualIdentity.font2,
          logo: '', // File upload not implemented yet
          guidelines: '', // File upload not implemented yet
        };

        const result = await setBrandingMutation.mutateAsync({
          courseKey,
          conversationKey: resolvedConversationKey,
          ...brandingData,
        });

        // Add branding as user message with component
        setMessages((prev) => [
          ...prev,
          {
            type: 'user',
            content: 'Visual identity settings',
            component: <BrandingView branding={brandingData} />,
          },
        ]);

        // Navigate to the screen indicated by backend
        const nextScreen = (result.nextScreen || 'generatingIndex') as ChatStep;
        if (nextScreen === 'generatingIndex') {
          setIsSSEEnabled(true);
        }
        setCurrentStep(nextScreen);
      } catch (error) {
        console.error('Failed to set branding:', error);
      }
    }
  };

  // Handle final create course
  const handleCreateCourse = async () => {
    if (!courseKey) return;

    setMessages((prev) => [
      ...prev,
      { type: 'user', content: "I'm ready, create course!" },
    ]);
    setCurrentStep('generating');
    setIsGenerating(true);
    // Enable SSE BEFORE starting generation to catch all events
    setIsSSEEnabled(true);

    try {
      await generateCourseMutation.mutateAsync(courseKey);
    } catch (error) {
      console.error('Failed to start course generation:', error);
      setIsGenerating(false);
      setIsSSEEnabled(false);
    }
  };

  // Handle popup close
  const handlePopupClose = () => {
    setShowCompletionPopup(false);
  };

  // CTA Button component for consistency
  const CTAButton = ({ onClick, children, icon }: { onClick: () => void; children: React.ReactNode; icon?: React.ReactNode }) => (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] hover:from-[#8A6BC5] hover:to-[#7B5BB5] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
    >
      {children}
      {icon || (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      )}
    </button>
  );

  // Render AI message based on current step
  const renderCurrentStepContent = () => {
    switch (currentStep) {
      case 'audience':
        // AI message comes from backend via handleTopicSubmit
        return null;

      case 'objectives':
        // AI message comes from backend via handleChatMessageSubmit (audience step)
        return null;

      case 'paraphrasing':
        // Show loading while generating objectives via SSE
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <LoadingIndicator loadingText={sseState.loadingText} />
          </motion.div>
        );

      case 'buildMethod':
        // Build method message comes from backend, just show the buttons
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-5 max-w-2xl"
          >
            <div className="space-y-3">
              <button
                onClick={() => handleBuildMethodSelect('ai')}
                className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-[#9F80DA] hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9F80DA] to-[#8A6BC5] flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-[#9F80DA]">With AI</div>
                    <div className="text-sm text-gray-500">
                      The course is built 100% with AI, based on official and validated sources
                    </div>
                  </div>
                </div>
              </button>
              <button
                onClick={() => handleBuildMethodSelect('references_ai')}
                className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-[#9F80DA] hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-[#9F80DA]">With my references + AI</div>
                    <div className="text-sm text-gray-500">
                      We use your material as reference and complete it with AI
                    </div>
                  </div>
                </div>
              </button>
              <button
                onClick={() => handleBuildMethodSelect('material_only')}
                className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-[#9F80DA] hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-[#9F80DA]">Only with my material</div>
                    <div className="text-sm text-gray-500">
                      We don&apos;t use AI, only the material you upload
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </motion.div>
        );

      case 'modulesCount':
        // AI message already shown from API response, just render buttons
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 max-w-2xl"
          >
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: maxModules }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => handleModulesCountSelect(num)}
                  className="w-12 h-12 bg-white border-2 border-gray-200 rounded-xl hover:border-[#9F80DA] hover:bg-[#9F80DA] hover:text-white font-semibold transition-all hover:shadow-md"
                >
                  {num}
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 'unitsPerModule':
        // AI message already shown from API response, just render unit selectors
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-5 max-w-2xl"
          >
            <div className="space-y-3">
              {Array.from({ length: modulesCount }, (_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 w-24">Module {i + 1}:</span>
                  <div className="flex gap-1">
                    {Array.from({ length: maxUnits }, (_, j) => j + 1).map((num) => (
                      <button
                        key={num}
                        onClick={() => handleUnitsChange(i, num)}
                        className={`w-9 h-9 text-sm font-medium rounded-lg transition-all ${
                          unitsPerModule[i] === num
                            ? 'bg-[#9F80DA] text-white shadow-md'
                            : 'bg-white border-2 border-gray-200 hover:border-[#9F80DA]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <CTAButton onClick={handleUnitsContinue}>
              Continue
            </CTAButton>
          </motion.div>
        );

      case 'generatingIndex':
        // Show loading while generating index
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <LoadingIndicator loadingText={sseState.loadingText} />
          </motion.div>
        );

      case 'courseIndex': {
        // Show the generated course index
        if (!proposedIndex) return null;

        // Check if the index is already in the messages (e.g., after page reload)
        // Look specifically for the "proposed course structure" message, not just any component
        const indexAlreadyInMessages = messages.some(
          (msg) => msg.type === 'ai' && msg.content.includes('proposed course structure')
        );

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            {/* Only show index if not already in messages */}
            {!indexAlreadyInMessages && (
              <>
                <p className="text-gray-700">Here&apos;s the proposed course structure:</p>
                <CourseIndexView index={proposedIndex} />
              </>
            )}
            <div className="flex gap-3">
              <button
                onClick={async () => {
                  // Only add the index as a message if it's not already there
                  if (!indexAlreadyInMessages) {
                    setMessages((prev) => [
                      ...prev,
                      { type: 'ai', content: "Here's the proposed course structure:", component: <CourseIndexView index={proposedIndex} /> },
                      { type: 'user', content: 'Looks good, continue' },
                    ]);
                  } else {
                    setMessages((prev) => [
                      ...prev,
                      { type: 'user', content: 'Looks good, continue' },
                    ]);
                  }

                  // Go directly to final confirmation
                  setCurrentStep('finalConfirmation');
                }}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] hover:from-[#8A6BC5] hover:to-[#7B5BB5] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
              >
                Looks good, continue
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-500">
              If this looks good, continue. Otherwise, describe what you would change about the structure.
            </p>
          </motion.div>
        );
      }

      case 'exerciseTypes':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-5 max-w-2xl"
          >
            {/* Message already shown from API response in messages */}
            <div className="grid grid-cols-2 gap-2">
              {exerciseTypes.map((exercise) => (
                <label
                  key={exercise.id}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border-2 ${
                    selectedExercises.includes(exercise.id)
                      ? 'border-[#9F80DA] bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedExercises.includes(exercise.id)}
                    onChange={() => handleExerciseToggle(exercise.id)}
                    className="w-5 h-5 accent-[#9F80DA]"
                    disabled={setEvaluationMutation.isPending}
                  />
                  <span className="text-gray-700 text-sm">{exercise.name}</span>
                </label>
              ))}
            </div>
            <button
              onClick={handleExercisesContinue}
              disabled={setEvaluationMutation.isPending}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] hover:from-[#8A6BC5] hover:to-[#7B5BB5] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50"
            >
              {setEvaluationMutation.isPending ? 'Loading...' : 'Continue'}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </motion.div>
        );

      case 'evaluation':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-5 max-w-2xl"
          >
            {/* Message already shown from API response in messages */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white border-2 border-gray-200 rounded-xl">
                <span className="text-gray-700">Knowledge check at the end of each unit?</span>
                <button
                  onClick={() =>
                    setEvaluationSettings((prev) => ({
                      ...prev,
                      unitKnowledgeCheck: !prev.unitKnowledgeCheck,
                    }))
                  }
                  className={`w-14 h-7 rounded-full transition-colors ${
                    evaluationSettings.unitKnowledgeCheck ? 'bg-[#9F80DA]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-6 h-6 bg-white rounded-full shadow transition-transform ${
                      evaluationSettings.unitKnowledgeCheck ? 'translate-x-7' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-white border-2 border-gray-200 rounded-xl">
                <span className="text-gray-700">Knowledge check at the end of each module?</span>
                <button
                  onClick={() =>
                    setEvaluationSettings((prev) => ({
                      ...prev,
                      moduleKnowledgeCheck: !prev.moduleKnowledgeCheck,
                    }))
                  }
                  className={`w-14 h-7 rounded-full transition-colors ${
                    evaluationSettings.moduleKnowledgeCheck ? 'bg-[#9F80DA]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-6 h-6 bg-white rounded-full shadow transition-transform ${
                      evaluationSettings.moduleKnowledgeCheck ? 'translate-x-7' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-white border-2 border-gray-200 rounded-xl">
                <span className="text-gray-700">Final exercise integrating all modules?</span>
                <button
                  onClick={() =>
                    setEvaluationSettings((prev) => ({
                      ...prev,
                      finalExercise: !prev.finalExercise,
                    }))
                  }
                  className={`w-14 h-7 rounded-full transition-colors ${
                    evaluationSettings.finalExercise ? 'bg-[#9F80DA]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-6 h-6 bg-white rounded-full shadow transition-transform ${
                      evaluationSettings.finalExercise ? 'translate-x-7' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Any restrictions for knowledge checks? (retries, ability to skip, etc.)
                </label>
                <textarea
                  value={evaluationSettings.restrictions}
                  onChange={(e) =>
                    setEvaluationSettings((prev) => ({ ...prev, restrictions: e.target.value }))
                  }
                  rows={2}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F80DA] focus:border-transparent resize-none"
                  placeholder="Describe any restrictions..."
                />
              </div>
            </div>
            <button
              onClick={handleEvaluationContinue}
              disabled={setEvaluationDetailsMutation.isPending}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] hover:from-[#8A6BC5] hover:to-[#7B5BB5] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50"
            >
              {setEvaluationDetailsMutation.isPending ? 'Loading...' : 'Continue'}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </motion.div>
        );

      case 'visualIdentity':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-5 max-w-2xl"
          >
            {/* Message already shown from API response in messages */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={visualIdentity.primaryColor}
                      onChange={(e) =>
                        setVisualIdentity((prev) => ({ ...prev, primaryColor: e.target.value }))
                      }
                      className="w-12 h-10 rounded-lg border-2 border-gray-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={visualIdentity.primaryColor}
                      onChange={(e) =>
                        setVisualIdentity((prev) => ({ ...prev, primaryColor: e.target.value }))
                      }
                      className="flex-1 px-4 py-2 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F80DA]"
                      placeholder="#9F80DA"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={visualIdentity.secondaryColor}
                      onChange={(e) =>
                        setVisualIdentity((prev) => ({ ...prev, secondaryColor: e.target.value }))
                      }
                      className="w-12 h-10 rounded-lg border-2 border-gray-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={visualIdentity.secondaryColor}
                      onChange={(e) =>
                        setVisualIdentity((prev) => ({ ...prev, secondaryColor: e.target.value }))
                      }
                      className="flex-1 px-4 py-2 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F80DA]"
                      placeholder="#1a1a1a"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Typography 1
                  </label>
                  <select
                    value={visualIdentity.font1}
                    onChange={(e) =>
                      setVisualIdentity((prev) => ({ ...prev, font1: e.target.value }))
                    }
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F80DA]"
                  >
                    {fontOptions.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Typography 2
                  </label>
                  <select
                    value={visualIdentity.font2}
                    onChange={(e) =>
                      setVisualIdentity((prev) => ({ ...prev, font2: e.target.value }))
                    }
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F80DA]"
                  >
                    {fontOptions.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-[#9F80DA] transition-colors cursor-pointer bg-white">
                    <svg
                      className="w-8 h-8 mx-auto mb-2 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm text-gray-500">Upload logo</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand Guidelines
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-[#9F80DA] transition-colors cursor-pointer bg-white">
                    <svg
                      className="w-8 h-8 mx-auto mb-2 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-sm text-gray-500">Upload PDF</p>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleVisualIdentityContinue}
              disabled={setBrandingMutation.isPending}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] hover:from-[#8A6BC5] hover:to-[#7B5BB5] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50"
            >
              {setBrandingMutation.isPending ? 'Loading...' : 'Continue'}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </motion.div>
        );

      case 'finalConfirmation':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-5 max-w-2xl"
          >
            <button
              onClick={handleCreateCourse}
              disabled={generateCourseMutation.isPending}
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] hover:from-[#8A6BC5] hover:to-[#7B5BB5] text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 text-lg disabled:opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              {generateCourseMutation.isPending ? 'Starting...' : "I'm ready, create course"}
            </button>
          </motion.div>
        );

      case 'generating':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl space-y-4"
          >
            <LoadingIndicator loadingText={sseState.loadingText} />
            {sseState.progress && (
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Generating units</span>
                  <span className="text-sm text-gray-500">
                    {sseState.progress.completedUnits} / {sseState.progress.totalUnits}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${sseState.progress.totalUnits > 0 ? (sseState.progress.completedUnits / sseState.progress.totalUnits) * 100 : 0}%`,
                    }}
                  />
                </div>
                {sseState.units.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {[...sseState.units]
                      .sort((a, b) => {
                        const [aModule, aUnit] = a.unitCode.split('.').map(Number);
                        const [bModule, bUnit] = b.unitCode.split('.').map(Number);
                        return aModule - bModule || aUnit - bUnit;
                      })
                      .map((unit) => (
                      <div key={unit.unitCode} className="flex items-center gap-2 text-xs">
                        {unit.status === 'completed' && (
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {unit.status === 'running' && (
                          <div className="w-4 h-4 border-2 border-[#9F80DA] border-t-transparent rounded-full animate-spin" />
                        )}
                        {unit.status === 'pending' && (
                          <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                        )}
                        {unit.status === 'failed' && (
                          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        <span className={unit.status === 'completed' ? 'text-gray-500' : 'text-gray-700'}>
                          Unit {unit.unitCode}: {unit.unitTitle}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  // Show loading while fetching course data
  if (isLoadingCourse) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-[#9F80DA] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-[#9F80DA] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-[#9F80DA] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span className="text-gray-500">Loading course...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-[var(--font-onest)]">
      {/* Completion Popup */}
      <AnimatePresence>
        {showCompletionPopup && <CompletionPopup onClose={handlePopupClose} />}
      </AnimatePresence>

      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push('/dashboard')}
          >
            <img
              src="/landing/acadion2.png"
              alt="Acadion Logo"
              className="h-8 object-contain"
              style={{ width: 'auto' }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Preview Button */}
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Preview
          </button>

          {/* Export Button */}
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Export
          </button>

          {/* QA Mode Button */}
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            QA Mode
          </button>

          {/* Self QA Button */}
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Self QA
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-2 ml-2">
            <img
              src="/landing/avatars/1.jpg"
              alt="User Avatar"
              className="w-9 h-9 rounded-full object-cover"
            />
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-57px)]">
        {/* Left Sidebar - Shows course index in editor layout */}
        <AnimatePresence>
          {(isSidebarOpen || showEditorLayout) && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto flex-shrink-0"
            >
              <div className="p-4">
                {showEditorLayout && proposedIndex ? (
                  <>
                    <h3 className="text-sm font-semibold text-gray-500 mb-3 px-1 uppercase tracking-wide">
                      Course Structure
                    </h3>
                    <div className="space-y-3">
                      {proposedIndex.modules.map((module) => (
                        <div key={module.number} className="space-y-1">
                          <div className="flex items-center gap-2 font-medium text-[#9F80DA]">
                            <span className="text-xs">{module.number}.</span>
                            <span className="text-sm">{module.title}</span>
                          </div>
                          <div className="ml-4 space-y-0.5">
                            {module.units.map((unit) => (
                              <div
                                key={unit.code}
                                onClick={() => setSelectedUnitCode(unit.code)}
                                className={`text-xs py-1 px-2 rounded cursor-pointer transition-colors ${
                                  selectedUnitCode === unit.code
                                    ? 'bg-[#9F80DA] text-white'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-[#9F80DA]'
                                }`}
                              >
                                {unit.code} {unit.title}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden min-w-0">
          <AnimatePresence mode="wait">
            {!hasSubmitted ? (
              /* Initial centered input */
              <motion.div
                key="initial"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="flex-1 flex items-center justify-center"
              >
                <div className="w-full max-w-2xl px-6">
                  <motion.h1
                    className="text-3xl font-bold text-center mb-8 text-[#1a1a1a]"
                    initial={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    What eLearning do you need?
                  </motion.h1>

                  <div className="relative">
                    <textarea
                      ref={initialInputRef}
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyDown={handleTopicInputKeyDown}
                      placeholder="Describe your eLearning project..."
                      rows={2}
                      className="w-full px-5 py-4 pr-14 text-base border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9F80DA] focus:border-transparent transition-all resize-none"
                    />
                    <button
                      onClick={handleTopicSubmit}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#9F80DA] hover:bg-[#8A6BC5] text-white rounded-xl transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : showEditorLayout ? (
              /* Editor layout - show selected unit content or placeholder */
              <motion.div
                key="editor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex-1 overflow-y-auto bg-gray-50"
              >
                {courseComponentsData?.components && proposedIndex ? (
                  <div className="max-w-4xl mx-auto py-8 px-4">
                    {/* Course title */}
                    {courseData?.title && (
                      <div className="mb-12 text-center">
                        <h1 className="text-4xl font-bold text-[#1a1a1a]">{courseData.title}</h1>
                      </div>
                    )}

                    {proposedIndex.modules.map((module) => {
                      // Build complete unit list: Introduction (0) + index units + evaluation
                      // Get all unique unit numbers from components for this module
                      const moduleComponents = courseComponentsData.components.filter(
                        (c) => c.module === module.number
                      );
                      const unitNumbers = [...new Set(moduleComponents.map((c) => c.unit))].sort((a, b) => a - b);

                      // Build unit info with titles
                      const allUnits = unitNumbers.map((unitNum) => {
                        if (unitNum === 0) {
                          return { code: `${module.number}.0`, title: 'Introduction', unitNum };
                        }
                        if (unitNum === 99) {
                          return { code: `eval-m${module.number}`, title: 'Evaluation', unitNum };
                        }
                        // Find title from proposedIndex
                        const indexUnit = module.units.find((u) => u.code === `${module.number}.${unitNum}`);
                        return {
                          code: `${module.number}.${unitNum}`,
                          title: indexUnit?.title || `Unit ${unitNum}`,
                          unitNum,
                        };
                      });

                      return (
                        <div key={module.number} className="mb-12">
                          {/* Module header */}
                          <div className="mb-6">
                            <h2 className="text-2xl font-bold text-[#1a1a1a]">
                              Module {module.number}: {module.title}
                            </h2>
                          </div>

                          {/* Units in this module */}
                          {allUnits.map((unit) => {
                            const unitComponents = moduleComponents.filter((c) => c.unit === unit.unitNum);

                            if (unitComponents.length === 0) return null;

                            return (
                              <div
                                key={unit.code}
                                id={`unit-${unit.code}`}
                                className="mb-10"
                              >
                                {/* Unit header */}
                                <div className="mb-6 flex items-center gap-3">
                                  <span className="px-3 py-1 bg-[#9F80DA] text-white text-sm font-medium rounded-full">
                                    {unit.code}
                                  </span>
                                  <h3 className="text-xl font-semibold text-[#1a1a1a]">{unit.title}</h3>
                                </div>

                                {/* Unit components */}
                                <div className="space-y-4">
                                  {unitComponents
                                    .sort((a, b) => a.sequence - b.sequence)
                                    .map((comp, idx) => {
                                      const component: UnitComponent = {
                                        componentName: comp.componentName,
                                        order: comp.sequence,
                                        content: (comp.data as Record<string, unknown>) || {},
                                        styles: undefined,
                                      };

                                      return (
                                        <div
                                          key={idx}
                                          className="group relative bg-white rounded-xl border-2 border-gray-200 hover:border-[#9F80DA] transition-colors overflow-hidden"
                                        >
                                          {/* Component type label */}
                                          <div className="absolute top-2 right-2 z-10">
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md group-hover:bg-[#9F80DA] group-hover:text-white transition-colors">
                                              {comp.componentName}
                                            </span>
                                          </div>

                                          {/* Component content */}
                                          <div className="pt-8">
                                            <CourseComponent component={component} />
                                          </div>
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center h-full">
                    <div className="text-center text-gray-400">
                      <div className="w-8 h-8 border-2 border-[#9F80DA] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-lg">Loading course content...</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              /* Chat interface */
              <motion.div
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="flex-1 flex flex-col min-h-0"
              >
                {/* Chat content area - scrolleable */}
                <div className="flex-1 overflow-y-auto p-6 min-h-0">
                  <div className="max-w-3xl mx-auto space-y-6">
                    {/* Render all messages */}
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {message.type === 'user' ? (
                          <div className="space-y-3">
                            <div className="bg-[#1a1a1a] text-white px-5 py-3 rounded-2xl rounded-br-md max-w-md shadow-sm">
                              <p>{message.content}</p>
                            </div>
                            {message.component && message.component}
                          </div>
                        ) : (
                          <div className="max-w-2xl space-y-4">
                            <p className="text-gray-700 whitespace-pre-line">{message.content}</p>
                            {message.component && message.component}
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {/* Current step content */}
                    {renderCurrentStepContent()}

                    <div ref={chatEndRef} />
                  </div>
                </div>

                {/* Bottom chat input - always visible until course is complete */}
                {currentStep !== 'complete' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                    className="flex-shrink-0 border-t border-gray-200 bg-white p-4"
                  >
                    <div className="max-w-3xl mx-auto">
                      <div className="relative">
                        <textarea
                          ref={chatInputRef}
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyDown={handleChatInputKeyDown}
                          placeholder="Type your message..."
                          rows={2}
                          className="w-full px-5 py-4 pr-14 text-base border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9F80DA] focus:border-transparent transition-all resize-none"
                        />
                        <button
                          onClick={handleChatMessageSubmit}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#9F80DA] hover:bg-[#8A6BC5] text-white rounded-xl transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Right Panel - Chat history in editor layout */}
        <AnimatePresence>
          {showEditorLayout && (
            <motion.aside
              initial={{ x: 640, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 640, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-[640px] bg-gray-50 border-l border-gray-200 flex flex-col flex-shrink-0"
            >
              {/* Chat content area - scrolleable */}
              <div className="flex-1 overflow-y-auto p-6 min-h-0">
                <div className="space-y-4">
                  {/* All conversation messages */}
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.type === 'user' ? (
                        <div className="space-y-3">
                          <div className="bg-[#1a1a1a] text-white px-5 py-3 rounded-2xl rounded-br-md max-w-md shadow-sm">
                            <p>{message.content}</p>
                          </div>
                          {message.component && message.component}
                        </div>
                      ) : (
                        <div className="max-w-xl space-y-4">
                          <p className="text-gray-700 whitespace-pre-line">{message.content}</p>
                          {message.component && message.component}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Completion message */}
                  <div className="flex justify-start">
                    <div className="max-w-xl">
                      <p className="text-gray-700">
                        Course structure has been created and is now available in the sidebar. You
                        can start editing your course content or continue chatting for refinements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom chat input - always visible */}
              <div className="flex-shrink-0 border-t border-gray-200 bg-white p-4">
                <div className="relative">
                  <textarea
                    placeholder="Type your prompt..."
                    rows={2}
                    className="w-full px-5 py-4 pr-14 text-base border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9F80DA] focus:border-transparent transition-all resize-none"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#9F80DA] hover:bg-[#8A6BC5] text-white rounded-xl transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
