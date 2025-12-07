'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useGenerateTitle, useCourse, useSetAudience, useSetObjective, useObjectiveStatus, useSetBuildingMethod, useSetModules, useSetUnits, useIndexStatus, useGetExerciseTypes, useSetEvaluation } from '../../../lib/hooks/use-course';

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
  const router = useRouter();
  const courseKey = params.courseKey as string;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoadingCourse, setIsLoadingCourse] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);

  // Conversation state
  const [currentStep, setCurrentStep] = useState<ChatStep>('audience');
  const [messages, setMessages] = useState<Message[]>([]);

  // State for objective generation polling
  const [isPollingObjective, setIsPollingObjective] = useState(false);

  // State for index generation polling
  const [isPollingIndex, setIsPollingIndex] = useState(false);

  // React Query hooks
  const generateTitleMutation = useGenerateTitle();
  const setAudienceMutation = useSetAudience();
  const setObjectiveMutation = useSetObjective();
  const setBuildingMethodMutation = useSetBuildingMethod();
  const setModulesMutation = useSetModules();
  const setUnitsMutation = useSetUnits();
  const getExerciseTypesMutation = useGetExerciseTypes();
  const setEvaluationMutation = useSetEvaluation();
  const { data: courseData, isLoading: isCourseLoading } = useCourse(courseKey);
  const { data: objectiveStatus } = useObjectiveStatus(courseKey, isPollingObjective);
  const { data: indexStatus } = useIndexStatus(courseKey, isPollingIndex);

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

  // Load existing messages from course data
  useEffect(() => {
    if (!isCourseLoading && courseData) {
      const existingMessages = courseData.conversations?.[0]?.messages || [];
      const steps = courseData.steps || [];

      if (existingMessages.length > 0) {
        // Course has existing messages - show chat directly
        let foundIndex: ProposedIndex | null = null;
        const formattedMessages: Message[] = existingMessages.map((msg) => {
          const indexData = msg.role === 'assistant' ? parseIndexFromContent(msg.content) : null;

          if (indexData) {
            // Store the index in state for later use
            foundIndex = indexData;
            setProposedIndex(indexData);
            return {
              type: 'ai' as const,
              content: "Here's the proposed course structure:",
              component: <CourseIndexView index={indexData} />,
            };
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

        // Determine current step based on course steps status
        const indexStep = steps.find((s) => s.type === 'generating_index');
        const objectivesStep = steps.find((s) => s.type === 'generating_objectives');

        if (indexStep?.status === 'completed' && foundIndex) {
          // Index is generated, show courseIndex step with continue button
          setCurrentStep('courseIndex');
        } else if (indexStep?.status === 'pending' || indexStep?.status === 'running') {
          // Index is being generated
          setCurrentStep('generatingIndex');
          setIsPollingIndex(true);
        } else if (objectivesStep?.status === 'completed') {
          // Objectives completed, waiting for build method
          setCurrentStep('buildMethod');
        } else if (objectivesStep?.status === 'pending' || objectivesStep?.status === 'running') {
          // Objectives being generated
          setCurrentStep('paraphrasing');
          setIsPollingObjective(true);
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

  // Handle objective generation completion
  useEffect(() => {
    if (objectiveStatus?.status === 'completed' && objectiveStatus.objectivesMessage) {
      setIsPollingObjective(false);
      // Add the generated objectives message and build method question
      setMessages((prev) => [
        ...prev,
        { type: 'ai', content: objectiveStatus.objectivesMessage! },
        { type: 'ai', content: objectiveStatus.buildMethodMessage! },
      ]);
      setCurrentStep('buildMethod');
      // Focus chat input after AI response
      setTimeout(() => chatInputRef.current?.focus(), 100);
    } else if (objectiveStatus?.status === 'failed') {
      setIsPollingObjective(false);
      console.error('Objective generation failed');
    }
  }, [objectiveStatus]);

  // State to store the proposed index
  const [proposedIndex, setProposedIndex] = useState<ProposedIndex | null>(null);

  // Handle index generation completion
  useEffect(() => {
    if (indexStatus?.status === 'completed' && indexStatus.proposedIndex) {
      setIsPollingIndex(false);
      setProposedIndex(indexStatus.proposedIndex);
      setCurrentStep('courseIndex');
    } else if (indexStatus?.status === 'failed') {
      setIsPollingIndex(false);
      console.error('Index generation failed');
    }
  }, [indexStatus]);

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

  // Editor layout state
  const [showEditorLayout, setShowEditorLayout] = useState(false);

  // Loading state
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentStep]);

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
          // Start polling for objective generation
          setIsPollingObjective(true);
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

        await setUnitsMutation.mutateAsync({
          courseKey,
          conversationKey: resolvedConversationKey,
          modules: modulesData,
        });

        // Start polling for index generation
        setCurrentStep('generatingIndex');
        setIsPollingIndex(true);
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
        const result = await setEvaluationMutation.mutateAsync({
          courseKey,
          conversationKey: resolvedConversationKey,
          selectedComponents,
        });

        // Add AI message from backend
        setMessages((prev) => [
          ...prev,
          { type: 'ai', content: result.aiMessage },
        ]);

        setCurrentStep('evaluation');
      } catch (error) {
        console.error('Failed to set evaluation:', error);
      }
    }
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
        // Show loading while generating objectives, then show continue button
        if (isPollingObjective) {
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <LoadingIndicator />
            </motion.div>
          );
        }
        return null;

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
            <LoadingIndicator />
          </motion.div>
        );

      case 'courseIndex': {
        // Show the generated course index
        if (!proposedIndex) return null;

        // Check if the index is already in the messages (e.g., after page reload)
        const indexAlreadyInMessages = messages.some((msg) => msg.component !== undefined);

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

                  // Fetch exercise types from backend
                  if (courseKey && resolvedConversationKey) {
                    try {
                      const result = await getExerciseTypesMutation.mutateAsync({
                        courseKey,
                        conversationKey: resolvedConversationKey,
                      });

                      // Store exercise types and select all by default
                      setExerciseTypes(result.exerciseTypes || []);
                      setSelectedExercises((result.exerciseTypes || []).map((e) => e.id));

                      // Add AI message to chat
                      setMessages((prev) => [
                        ...prev,
                        { type: 'ai', content: result.aiMessage },
                      ]);
                    } catch (error) {
                      console.error('Failed to get exercise types:', error);
                    }
                  }

                  setCurrentStep('exerciseTypes');
                }}
                disabled={getExerciseTypesMutation.isPending}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] hover:from-[#8A6BC5] hover:to-[#7B5BB5] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50"
              >
                {getExerciseTypesMutation.isPending ? 'Loading...' : 'Looks good, continue'}
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
                                className="text-xs text-gray-600 py-0.5 cursor-pointer hover:text-[#9F80DA]"
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
                        <div className="bg-[#1a1a1a] text-white px-5 py-3 rounded-2xl rounded-br-md max-w-md shadow-sm">
                          <p>{message.content}</p>
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
