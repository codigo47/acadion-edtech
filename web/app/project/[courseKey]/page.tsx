'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useGenerateTitle, useCourse, useSetAudience, useSetObjective } from '../../../lib/hooks/use-course';

// Exercise types available
const exerciseTypes = [
  'Multiple Choice',
  'Drag and Drop',
  'Fill in the Blanks',
  'Matching',
  'True or False',
  'Sorting / Ordering',
  'Hotspot / Image Click',
  'Flashcards',
  'Scenario-based Questions',
  'Short Answer',
];

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

// Course index structure type
interface CourseItem {
  id: string;
  title: string;
  children?: CourseItem[];
}

// Recursive component to render course tree
function CourseTreeItem({
  item,
  isLast,
  depth,
}: {
  item: CourseItem;
  isLast: boolean;
  depth: number;
}) {
  const isModule = depth === 0;
  const prefix = isLast ? '└──' : '├──';
  const paddingLeft = depth * 24;

  return (
    <div>
      <div
        className={`${isModule ? 'font-medium text-[#9F80DA] mt-2 first:mt-0' : ''}`}
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        {prefix} {item.id}. {item.title}
      </div>
      {item.children?.map((child, index) => (
        <CourseTreeItem
          key={child.id}
          item={child}
          isLast={index === item.children!.length - 1}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}

// Generate course index based on modules and units
function generateCourseIndex(modulesCount: number, unitsPerModule: number[]): CourseItem[] {
  const moduleNames = [
    'Introduction',
    'Core Concepts',
    'Key Principles',
    'Practical Applications',
    'Advanced Topics',
    'Best Practices',
    'Case Studies',
    'Implementation Strategies',
    'Tools and Techniques',
    'Summary and Next Steps',
  ];

  return Array.from({ length: modulesCount }, (_, moduleIndex) => {
    const moduleNum = moduleIndex + 1;
    const unitCount = unitsPerModule[moduleIndex] || 3;

    return {
      id: `${moduleNum}`,
      title: moduleNames[moduleIndex] || `Module ${moduleNum}`,
      children: Array.from({ length: unitCount }, (_, unitIndex) => ({
        id: `${moduleNum}.${unitIndex + 1}`,
        title: `Unit ${unitIndex + 1}`,
      })),
    };
  });
}

// Chat step types
type ChatStep =
  | 'audience'
  | 'objectives'
  | 'paraphrasing'
  | 'buildMethod'
  | 'modulesCount'
  | 'unitsPerModule'
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

// Loading messages array
const loadingMessages = [
  'Analyzing course requirements...',
  'Generating module structure...',
  'Creating lesson content...',
  'Building interactive components...',
  'Generating images and media...',
  'Preparing assessments...',
  'Optimizing learning flow...',
  'Finalizing course layout...',
];

// ChatGPT/Anthropic style loading indicator
function LoadingIndicator() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 600);

    return () => clearInterval(interval);
  }, []);

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
          {/* Rotating message */}
          <AnimatePresence mode="wait">
            <motion.span
              key={messageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-gray-500 text-sm"
            >
              {loadingMessages[messageIndex]}
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
  const courseKey = params.courseKey as string;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoadingCourse, setIsLoadingCourse] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Conversation state
  const [currentStep, setCurrentStep] = useState<ChatStep>('audience');
  const [messages, setMessages] = useState<Message[]>([]);

  // React Query hooks
  const generateTitleMutation = useGenerateTitle();
  const setAudienceMutation = useSetAudience();
  const setObjectiveMutation = useSetObjective();
  const { data: courseData, isLoading: isCourseLoading } = useCourse(courseKey);

  // Get conversationKey from courseData
  const resolvedConversationKey = courseData?.conversations?.[0]?.id || null;

  // Load existing messages from course data
  useEffect(() => {
    if (!isCourseLoading && courseData) {
      const existingMessages = courseData.conversations?.[0]?.messages || [];

      if (existingMessages.length > 0) {
        // Course has existing messages - show chat directly
        const formattedMessages: Message[] = existingMessages.map((msg) => ({
          type: msg.role === 'user' ? 'user' : 'ai',
          content: msg.content,
        }));

        setMessages(formattedMessages);
        setHasSubmitted(true);

        // Set topic from first user message
        const firstUserMessage = existingMessages.find((msg) => msg.role === 'user');
        if (firstUserMessage) {
          setTopic(firstUserMessage.content);
        }
      }

      setIsLoadingCourse(false);
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
  const [unitsPerModule, setUnitsPerModule] = useState<number[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
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

  // Editor layout state
  const [showEditorLayout, setShowEditorLayout] = useState(false);
  const [courseIndex, setCourseIndex] = useState<CourseItem[]>([]);

  // Loading state
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentStep]);

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
          const result = await setObjectiveMutation.mutateAsync({
            courseKey,
            conversationKey: resolvedConversationKey,
            objective: userMessage,
          });

          setMessages((prev) => [
            ...prev,
            { type: 'ai', content: result.aiMessage },
          ]);
          setCurrentStep('paraphrasing');
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

  // Handle paraphrasing continue
  const handleParaphrasingContinue = () => {
    setMessages((prev) => [
      ...prev,
      { type: 'ai', content: 'Paraphrasing.......' },
    ]);
    setCurrentStep('buildMethod');
  };

  // Handle build method selection
  const handleBuildMethodSelect = (method: string) => {
    setBuildMethod(method);
    const methodLabels: Record<string, string> = {
      ai: 'With AI',
      hybrid: 'With my references + AI',
      manual: 'Only with my material',
    };
    setMessages((prev) => [
      ...prev,
      { type: 'ai', content: 'How do you want to build the course?' },
      { type: 'user', content: methodLabels[method] || method },
    ]);
    if (method === 'ai') {
      setCurrentStep('modulesCount');
    }
    // For other methods, could add different flows
  };

  // Handle modules count selection
  const handleModulesCountSelect = (count: number) => {
    setModulesCount(count);
    setUnitsPerModule(Array(count).fill(3)); // Default 3 units per module
    setMessages((prev) => [
      ...prev,
      { type: 'ai', content: "Great! Now let's define the structure. How many modules will the course have?" },
      { type: 'user', content: `${count} modules` },
    ]);
    setCurrentStep('unitsPerModule');
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
  const handleUnitsContinue = () => {
    const generatedIndex = generateCourseIndex(modulesCount, unitsPerModule);
    setCourseIndex(generatedIndex);
    const unitsSummary = unitsPerModule.map((u, i) => `Module ${i + 1}: ${u} units`).join(', ');
    setMessages((prev) => [
      ...prev,
      { type: 'ai', content: 'How many units per module?' },
      { type: 'user', content: unitsSummary },
    ]);
    setCurrentStep('courseIndex');
  };

  // Handle course index continue
  const handleCourseIndexContinue = () => {
    setMessages((prev) => [
      ...prev,
      { type: 'ai', content: 'Course structure confirmed.' },
    ]);
    setCurrentStep('exerciseTypes');
  };

  // Handle exercise toggle
  const handleExerciseToggle = (exercise: string) => {
    setSelectedExercises((prev) =>
      prev.includes(exercise) ? prev.filter((e) => e !== exercise) : [...prev, exercise]
    );
  };

  // Handle exercises continue
  const handleExercisesContinue = () => {
    setMessages((prev) => [
      ...prev,
      { type: 'ai', content: "To design your eLearning, let's select all the exercise types you want to include:" },
      { type: 'user', content: selectedExercises.length > 0 ? selectedExercises.join(', ') : 'No exercises selected' },
    ]);
    setCurrentStep('evaluation');
  };

  // Handle evaluation continue
  const handleEvaluationContinue = () => {
    const evalSummary: string[] = [];
    if (evaluationSettings.unitKnowledgeCheck) evalSummary.push('Unit checks');
    if (evaluationSettings.moduleKnowledgeCheck) evalSummary.push('Module checks');
    if (evaluationSettings.finalExercise) evalSummary.push('Final exercise');
    setMessages((prev) => [
      ...prev,
      { type: 'ai', content: 'How will the evaluation be?' },
      { type: 'user', content: evalSummary.length > 0 ? evalSummary.join(', ') : 'No evaluation settings' },
    ]);
    setCurrentStep('visualIdentity');
  };

  // Handle visual identity continue
  const handleVisualIdentityContinue = () => {
    setMessages((prev) => [
      ...prev,
      { type: 'ai', content: "Excellent! Now we just need to define how your course will look." },
      { type: 'user', content: `Colors: ${visualIdentity.primaryColor}, ${visualIdentity.secondaryColor}` },
    ]);
    setCurrentStep('finalConfirmation');
  };

  // Handle final create course
  const handleCreateCourse = () => {
    setMessages((prev) => [
      ...prev,
      { type: 'ai', content: 'Tell us any other information we need to know before moving forward with the final design.' },
      { type: 'user', content: "I'm ready, create course!" },
    ]);
    setCurrentStep('generating');
    setIsGenerating(true);

    // Show loading for 6 seconds, then complete
    setTimeout(() => {
      setIsGenerating(false);
      setShowEditorLayout(true);
      setShowCompletionPopup(true);
      setCurrentStep('complete');
    }, 6000);
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
        // AI message comes from backend via handleChatMessageSubmit (objectives step)
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <CTAButton onClick={handleParaphrasingContinue}>
              Continue
            </CTAButton>
          </motion.div>
        );

      case 'buildMethod':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-5 max-w-2xl"
          >
            <p className="text-gray-700">How do you want to build the course?</p>
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
                onClick={() => handleBuildMethodSelect('hybrid')}
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
                onClick={() => handleBuildMethodSelect('manual')}
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
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 max-w-2xl"
          >
            <p className="text-gray-700">Great! Now let&apos;s define the structure.</p>
            <p className="text-gray-700">How many modules will the course have?</p>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
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
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-5 max-w-2xl"
          >
            <p className="text-gray-700">How many units per module?</p>
            <div className="space-y-3">
              {Array.from({ length: modulesCount }, (_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 w-24">Module {i + 1}:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
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

      case 'courseIndex':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-5 max-w-2xl"
          >
            <div className="bg-white border-2 border-gray-200 rounded-xl p-5 font-mono text-sm">
              <div className="text-[#1a1a1a] font-semibold mb-3">{topic}</div>
              <div className="space-y-1 text-gray-700">
                {courseIndex.map((item, index) => (
                  <CourseTreeItem
                    key={item.id}
                    item={item}
                    isLast={index === courseIndex.length - 1}
                    depth={0}
                  />
                ))}
              </div>
            </div>
            <CTAButton onClick={handleCourseIndexContinue}>
              Looks good, continue
            </CTAButton>
            <p className="text-sm text-gray-500">
              If this looks good, continue. Otherwise, describe what you would change about the index.
            </p>
          </motion.div>
        );

      case 'exerciseTypes':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-5 max-w-2xl"
          >
            <p className="text-gray-700">
              To design your eLearning, let&apos;s select all the exercise types you want to include:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {exerciseTypes.map((exercise) => (
                <label
                  key={exercise}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border-2 ${
                    selectedExercises.includes(exercise)
                      ? 'border-[#9F80DA] bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedExercises.includes(exercise)}
                    onChange={() => handleExerciseToggle(exercise)}
                    className="w-5 h-5 accent-[#9F80DA]"
                  />
                  <span className="text-gray-700 text-sm">{exercise}</span>
                </label>
              ))}
            </div>
            <CTAButton onClick={handleExercisesContinue}>
              Continue
            </CTAButton>
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
            <p className="text-gray-700">How will the evaluation be?</p>
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
            <CTAButton onClick={handleEvaluationContinue}>
              Continue
            </CTAButton>
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
            <div>
              <p className="text-gray-700 mb-1">
                Excellent! Now we just need to define how your course will look.
              </p>
              <p className="text-gray-500 text-sm">
                If you have this information, complete the form. If something is missing, we&apos;ll
                choose a visual identity proposal based on what we know about the eLearning.
              </p>
            </div>
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
            <CTAButton onClick={handleVisualIdentityContinue}>
              Continue
            </CTAButton>
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
            <p className="text-gray-700">
              Tell us any other information we need to know before moving forward with the final
              design.
            </p>
            <button
              onClick={handleCreateCourse}
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] hover:from-[#8A6BC5] hover:to-[#7B5BB5] text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 text-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              I&apos;m ready, create course
            </button>
          </motion.div>
        );

      case 'generating':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl"
          >
            <LoadingIndicator />
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

          <div className="flex items-center gap-2">
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
                {showEditorLayout && courseIndex.length > 0 ? (
                  <>
                    <h3 className="text-sm font-semibold text-gray-500 mb-3 px-1 uppercase tracking-wide">
                      Course Structure
                    </h3>
                    <div className="text-sm text-gray-700 space-y-1">
                      {courseIndex.map((item, index) => (
                        <CourseTreeItem
                          key={item.id}
                          item={item}
                          isLast={index === courseIndex.length - 1}
                          depth={0}
                        />
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
              /* Editor layout - empty main content with loading or placeholder */
              <motion.div
                key="editor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex-1 flex items-center justify-center bg-white"
              >
                <div className="text-center text-gray-400">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-lg">Select a topic from the course structure</p>
                  <p className="text-sm mt-1">Click on any item in the sidebar to start editing</p>
                </div>
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
                          <div className="bg-[#1a1a1a] text-white px-5 py-3 rounded-2xl rounded-br-md max-w-md shadow-sm">
                            <p>{message.content}</p>
                          </div>
                        ) : (
                          <div className="max-w-2xl">
                            <p className="text-gray-700 whitespace-pre-line">{message.content}</p>
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
                        <div className="bg-[#1a1a1a] text-white px-5 py-3 rounded-2xl rounded-br-md max-w-md shadow-sm">
                          <p>{message.content}</p>
                        </div>
                      ) : (
                        <div className="max-w-xl">
                          <p className="text-gray-700 whitespace-pre-line">{message.content}</p>
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
