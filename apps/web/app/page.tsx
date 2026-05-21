'use client';

import { motion } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { posthog } from '@/lib/posthog-client';
import { validateEmail, validateName, validateRequired, validateArrayNotEmpty } from '@/lib/validators';
import { features } from '@/lib/constants';
import AIGeneratedCourseFeature from './components/features-landing/AIGeneratedCourseFeature';
import CourseCopilotFeature from './components/features-landing/CourseCopilotFeature';
import AIImageGenerationFeature from './components/features-landing/AIImageGenerationFeature';
import FullEditingControlFeature from './components/features-landing/FullEditingControlFeature';
import RealTimeCollaborationFeature from './components/features-landing/RealTimeCollaborationFeature';
import ExportFormatsFeature from './components/features-landing/ExportFormatsFeature';
import MultiLanguageFeature from './components/features-landing/MultiLanguageFeature';
import InteractiveActivitiesFeature from './components/features-landing/InteractiveActivitiesFeature';
import MultimediaCourseFeature from './components/features-landing/MultimediaCourseFeature';
import AIPoweredQAFeature from './components/features-landing/AIPoweredQAFeature';
import AccessibilityCompliantFeature from './components/features-landing/AccessibilityCompliantFeature';
import ContentReviewQAFeature from './components/features-landing/ContentReviewQAFeature';
import LearningObjectivesFeature from './components/features-landing/LearningObjectivesFeature';
import BrandingQAFeature from './components/features-landing/BrandingQAFeature';
import InstructionalDesignModelsFeature from './components/features-landing/InstructionalDesignModelsFeature';
import WCAGComplianceFeature from './components/features-landing/WCAGComplianceFeature';
import LearningAssetsLibraryFeature from './components/features-landing/LearningAssetsLibraryFeature';
import VersionControlFeature from './components/features-landing/VersionControlFeature';
import ProfessionalPortfolioFeature from './components/features-landing/ProfessionalPortfolioFeature';
import ProjectManagementFeature from './components/features-landing/ProjectManagementFeature';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [showInitialPopup, setShowInitialPopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPlanType, setSelectedPlanType] = useState<'Personal' | 'Enterprise'>('Personal');
  const [selectedPlanName, setSelectedPlanName] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    userType: '', // 'myself' or 'company'
    team_size: '',
    experience: '',
    sector: [] as string[],
    deliverables: [] as string[]
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Refs for input focus
  const firstNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);

  // Auto-focus on error
  useEffect(() => {
    if (errors.firstName && firstNameRef.current) {
      firstNameRef.current.focus();
    } else if (errors.email && emailRef.current) {
      emailRef.current.focus();
    } else if (errors.company && companyRef.current) {
      companyRef.current.focus();
    }
  }, [errors]);

  const personalSteps = ['Full Name', 'Email', 'Sector', 'Experience', 'Deliverables'];
  const enterpriseSteps = ['Full Name', 'Email', 'Sector', 'Company', 'Team Size', 'Deliverables'];

  const steps = selectedPlanType === 'Personal' ? personalSteps : enterpriseSteps;

  const openPopup = (type: 'Personal' | 'Enterprise', planName: string) => {
    setSelectedPlanType(type);
    setSelectedPlanName(planName);
    setCurrentStep(0);
    setShowThankYou(false);
    setIsSubmitting(false);
    setErrors({});
    setShowWelcomePopup(true);
  };

  const validateCurrentStep = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    // Step 0: Full Name
    if (currentStep === 0) {
      const nameValidation = validateName(formData.firstName, 'Full name');
      if (!nameValidation.isValid) {
        newErrors.firstName = nameValidation.error || 'Full name is required';
      }
    }

    // Step 1: Email
    if (currentStep === 1) {
      const emailValidation = validateEmail(formData.email);
      if (!emailValidation.isValid) {
        newErrors.email = emailValidation.error || 'Valid email is required';
      }
    }

    // Step 2: Sector
    if (currentStep === 2) {
      const sectorValidation = validateArrayNotEmpty(formData.sector, 'sector');
      if (!sectorValidation.isValid) {
        newErrors.sector = sectorValidation.error || 'Please select at least one sector';
      }
    }

    // Step 3: Experience (Personal) or Company (Enterprise)
    if (currentStep === 3) {
      if (selectedPlanType === 'Personal') {
        const experienceValidation = validateRequired(formData.experience, 'Experience');
        if (!experienceValidation.isValid) {
          newErrors.experience = experienceValidation.error || 'Please select your experience level';
        }
      } else {
        const companyValidation = validateRequired(formData.company, 'Company name');
        if (!companyValidation.isValid) {
          newErrors.company = companyValidation.error || 'Company name is required';
        }
      }
    }

    // Step 4: Deliverables (Personal) or Team Size (Enterprise)
    if (currentStep === 4) {
      if (selectedPlanType === 'Personal') {
        const deliverablesValidation = validateArrayNotEmpty(formData.deliverables, 'deliverable');
        if (!deliverablesValidation.isValid) {
          newErrors.deliverables = deliverablesValidation.error || 'Please select at least one deliverable';
        }
      } else {
        const teamSizeValidation = validateRequired(formData.team_size, 'Team size');
        if (!teamSizeValidation.isValid) {
          newErrors.team_size = teamSizeValidation.error || 'Please select your team size';
        }
      }
    }

    // Step 5: Deliverables (Enterprise)
    if (currentStep === 5) {
      const deliverablesValidation = validateArrayNotEmpty(formData.deliverables, 'deliverable');
      if (!deliverablesValidation.isValid) {
        newErrors.deliverables = deliverablesValidation.error || 'Please select at least one deliverable';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStepChange = (newStep: number) => {
    // If moving forward, validate current step
    if (newStep > currentStep) {
      if (!validateCurrentStep()) {
        return;
      }
      // Clear errors for current step
      setErrors({});
    }

    // If moving backward, just clear errors
    if (newStep < currentStep) {
      setErrors({});
    }

    setCurrentStep(newStep);
  };

  const handleNextStep = () => {
    // Validate current step before proceeding
    if (!validateCurrentStep()) {
      return;
    }

    // Clear errors for current step
    setErrors({});

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Last step, submit form and show Thank You section after loading
      handleSubmit();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleNextStep();
    }
  };

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showWelcomePopup) {
        setShowWelcomePopup(false);
      }

      // Handle Enter key for button-based steps (Sector, Years of Experience, Team Size and Deliverables)
      if (e.key === 'Enter' && showWelcomePopup && !e.shiftKey) {
        const isSectorStep = (currentStep === 2);
        const isExperienceStep = (selectedPlanType === 'Personal' && currentStep === 3);
        const isTeamSizeStep = (selectedPlanType === 'Enterprise' && currentStep === 4);
        const isDeliverablesStep = (selectedPlanType === 'Personal' && currentStep === 4) ||
                                   (selectedPlanType === 'Enterprise' && currentStep === 5);

        if (isSectorStep || isExperienceStep || isTeamSizeStep || isDeliverablesStep) {
          e.preventDefault();
          handleNextStep();
        }
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [showWelcomePopup, currentStep, selectedPlanType]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = ['Features', 'How it Works', 'LMS\'s', 'Testimonials', 'Pricing', 'FAQ'];

  const getMenuItemId = (item: string) => {
    if (item === 'LMS\'s') return 'lms';
    return item.toLowerCase().replaceAll(' ', '-');
  };

  const personalDeliverableOptions = [
    'E-learning modules',
    'Job Aid',
    'Quick Reference Guide (QRG)',
    'Learner Guide',
    'ILT Deck',
    'vILT Session',
    'Workbook',
    'Infographic',
    'Scenario-based activity'
  ];

  const enterpriseDeliverableOptions = [
    'E-learning modules',
    'Microlearning',
    'Job Aid',
    'Quick Reference Guide (QRG)',
    'Facilitator Guide (FG)',
    'Participant Guide / Learner Guide',
    'Learner Guide',
    'ILT Deck',
    'vILT Session',
    'Workbook',
    'SOP (Standard Operating Procedure)',
    'Work Instruction (WI)',
    'Knowledge Base Article',
    'Infographic',
    'Explainer Video',
    'Interactive Simulation',
    'Scenario-based activity',
    'Assessment / Quiz',
    'Learning Path / Curriculum',
    'Performance Support Tool'
  ];

  const deliverableOptions = selectedPlanType === 'Personal'
    ? personalDeliverableOptions
    : enterpriseDeliverableOptions;

  const handleSectorChange = (sector: string) => {
    setFormData(prev => ({
      ...prev,
      sector: prev.sector.includes(sector)
        ? prev.sector.filter(s => s !== sector)
        : [...prev.sector, sector]
    }));
    if (errors.sector) {
      setErrors({...errors, sector: ''});
    }
  };

  const handleDeliverableChange = (deliverable: string) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev.deliverables.includes(deliverable)
        ? prev.deliverables.filter(d => d !== deliverable)
        : [...prev.deliverables, deliverable]
    }));
    if (errors.deliverables) {
      setErrors({...errors, deliverables: ''});
    }
  };

  const getFeatureComponent = (index: number) => {
    const components = [
      <AIGeneratedCourseFeature />,
      <CourseCopilotFeature />,
      <AIImageGenerationFeature />,
      <FullEditingControlFeature />,
      <RealTimeCollaborationFeature />,
      <ExportFormatsFeature />,
      <MultiLanguageFeature />,
      <InteractiveActivitiesFeature />,
      <MultimediaCourseFeature />,
      <AIPoweredQAFeature />,
      <AccessibilityCompliantFeature />,
      <ContentReviewQAFeature />,
      <LearningObjectivesFeature />,
      <BrandingQAFeature />,
      <InstructionalDesignModelsFeature />,
      <WCAGComplianceFeature />,
      <LearningAssetsLibraryFeature />,
      <VersionControlFeature />,
      <ProfessionalPortfolioFeature />,
      <ProjectManagementFeature />
    ];
    return components[index] || null;
  };

  const testimonials = [
    {
      name: 'Emily Wood',
      role: 'Learning Experience Designer',
      company: 'Tacoma Power',
      review: 'acadion.ai has transformed how we create training content. What used to take weeks now takes days. The AI-powered generation is incredibly accurate and saves our team countless hours.',
      avatar: '/reviews/emily.jpeg'
    },
    {
      name: 'Cammy Bean',
      role: 'VP of Learning Design',
      company: 'Kineo',
      review: 'As an instructional designer, I was skeptical at first. But acadion.ai has become an indispensable tool in my workflow. It handles the tedious work so I can focus on creating engaging learning experiences.',
      avatar: '/reviews/cammy.jpeg'
    },
    {
      name: 'Devlin Peck',
      role: 'School Director | Founder',
      company: 'Peck Academy',
      review: 'The ROI on acadion.ai has been phenomenal. We\'ve reduced course development time by 70% and our team can now focus on strategic initiatives instead of manual formatting.',
      avatar: '/reviews/devlin.jpeg'
    },
    {
      name: 'Patricia Regier',
      role: 'Technical Instructional Designer',
      company: 'Mohawk College',
      review: 'I love how acadion.ai understands context and maintains consistency across all our courses. The export features are seamless and work perfectly with our existing LMS.',
      avatar: '/reviews/patricia.jpeg'
    },
    {
      name: 'Holly Owens',
      role: 'Instructional Designer',
      company: 'Mars',
      review: 'acadion.ai has been a game-changer for our small team. We can now produce the same quality content as organizations with 10x our resources. Absolutely worth every penny.',
      avatar: '/reviews/holly.jpeg'
    },
    {
      name: 'Sabire Akay Topkara',
      role: 'Training & Education Specialist',
      company: 'Medtronic',
      review: 'The ability to upload any content format and get a professional course is amazing. Our compliance training development has never been faster or more efficient.',
      avatar: '/reviews/sabire.jpeg'
    }
  ];

  const faqs = [
    {
      question: 'What AI models does acadion.ai use?',
      answer: 'acadion.ai leverages the most advanced generative AI models available, including OpenAI (GPT-5), Anthropic (Claude), and Google Gemini. This multi-model approach ensures you get the best results for different types of content generation and analysis.'
    },
    {
      question: 'What types of content can I upload to acadion.ai?',
      answer: 'acadion.ai accepts a wide variety of content formats including videos, PDFs, PowerPoint presentations, Word documents, audio files, and more. Our AI is trained to understand and process different content types to create cohesive courses.'
    },
    {
      question: 'How long does it take to create a course?',
      answer: 'The time varies depending on the amount of content you upload, but typically a course can be generated in minutes. Most users find that what used to take days or weeks now takes just a few hours, including customization and review.'
    },
    {
      question: 'Can I customize the AI-generated content?',
      answer: 'Absolutely! While our AI does an excellent job of creating course content, you have full control to edit, modify, and customize everything. Think of acadion.ai as your intelligent assistant that handles the heavy lifting, but you remain in complete control.'
    },
    {
      question: 'Is acadion.ai compatible with my LMS?',
      answer: 'Yes! acadion.ai supports exports in SCORM 1.2, SCORM 2004, xAPI (Tin Can), and other standard formats. We\'re compatible with all major LMS platforms including Moodle, Canvas, Blackboard, and more.'
    },
    {
      question: 'How secure is my content?',
      answer: 'Security is our top priority. All data is encrypted in transit and at rest. We\'re SOC 2 Type II certified and fully GDPR compliant. Your content is never used to train our AI models, and you maintain complete ownership of your intellectual property.'
    },
    {
      question: 'Can I invite others to review my courses?',
      answer: 'Yes! All plans include the ability to invite unlimited users to perform QA (Quality Assurance) reviews at no additional cost. This allows you to collaborate with subject matter experts, stakeholders, and team members without worrying about extra fees. Reviewers can leave comments, suggest improvements, and help ensure your course quality.'
    },
    {
      question: 'Do you offer team collaboration features?',
      answer: 'Yes! acadion.ai includes robust collaboration tools. Multiple team members can work on the same course simultaneously, leave comments, suggest edits, and manage approval workflows. We offer different permission levels to suit your organizational needs.'
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'We offer comprehensive support including detailed documentation, video tutorials, and email support for all plans. Premium plans include priority support, dedicated account management, and personalized onboarding sessions.'
    },
    {
      question: 'Can I try acadion.ai before committing?',
      answer: 'Absolutely! You can create 1 course completely free with full access to all features. No credit card required, no time limits. This allows you to fully evaluate if acadion.ai is right for you.'
    }
  ];

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Validate current step (deliverables) before submitting
    if (!validateCurrentStep()) {
      return;
    }

    // Set loading state
    setIsSubmitting(true);

    // PostHog tracking
    if (posthog) {
      // Identify the user
      posthog.identify(formData.email, {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company || undefined,
      });

      // Capture form submission event
      posthog.capture('form_submitted', {
        plan_type: selectedPlanType,
        plan_name: selectedPlanName,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        company: formData.company,
        user_type: formData.userType,
        team_size: formData.team_size,
        experience: formData.experience,
        sector: formData.sector,
        deliverables: formData.deliverables,
        deliverables_count: formData.deliverables.length,
      });
    }

    console.log('Form submitted:', formData);

    // Show thank you page after 1.2 seconds
    setTimeout(() => {
      setCurrentStep(steps.length); // Mark last step as completed
      setShowThankYou(true);
      setIsSubmitting(false);

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        userType: '',
        team_size: '',
        experience: '',
        sector: [],
        deliverables: []
      });
    }, 1200);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className={`flex justify-between items-center h-16 px-6 relative z-50 rounded-3xl transition-all duration-300 ${scrolled ? 'bg-white/40 backdrop-blur-lg border border-white/20 shadow-lg shadow-black/5' : 'bg-transparent border border-transparent'}`}>
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/landing/acadion2.png"
                alt="acadion Logo"
                className="h-10 object-contain"
                style={{ width: 'auto' }}
              />
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href={`#${getMenuItemId(item)}`}
                  className="text-gray-600 hover:text-[#9F80DA] transition-colors font-medium"
                >
                  {item}
                </a>
              ))}
              <a
                href="/blog"
                className="text-gray-600 hover:text-[#9F80DA] transition-colors font-medium"
              >
                Blog
              </a>
              <a
                href="#pricing"
                className="bg-[#9F80DA] text-white px-6 py-2.5 rounded-full hover:bg-[#8A6BC5] transition-colors font-medium"
              >
                Start Now
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-900 relative w-10 h-10 flex items-center justify-center overflow-visible">
              <div className="w-6 relative flex flex-col gap-[5px]">
                <span className={`block w-full h-[3px] bg-current rounded-full transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-[8px] scale-y-[1.15]' : ''}`}></span>
                <span className={`block w-full h-[3px] bg-current rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-full h-[3px] bg-current rounded-full transform transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-[8px] scale-y-[1.15]' : ''}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden fixed inset-0 bg-white shadow-lg z-40 overflow-y-auto"
            >
              <div className="flex flex-col space-y-4 px-4 pt-24 pb-6">
                {menuItems.map((item) => (
                  <a
                    key={item}
                    href={`#${getMenuItemId(item)}`}
                    className="text-gray-600 hover:text-[#9F80DA] transition-colors font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <a
                  href="/blog"
                  className="text-gray-600 hover:text-[#9F80DA] transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </a>
                <a
                  href="#pricing"
                  className="bg-[#9F80DA] text-white px-6 py-2.5 rounded-full hover:bg-[#8A6BC5] transition-colors font-medium text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Start Now
                </a>
              </div>
            </motion.nav>
          )}
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-50 to-white"></div>

          {/* Floating Shapes */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'linear-gradient(to right, rgba(128, 128, 128, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(128, 128, 128, 0.1) 1px, transparent 1px)', backgroundSize: '4rem 4rem'}}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 text-lg">Join the closed beta with over 150 designers</p>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
            >
              Create engaged and interactive<br />AI powered learning experiences
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
            >
              Forget all the manual tasks, save time and money. Just design better learning content.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#pricing"
                className="bg-[#9F80DA] text-white px-8 py-4 rounded-full hover:bg-[#8A6BC5] transition-all transform hover:scale-105 text-lg font-medium shadow-lg flex items-center gap-2"
              >
                Get Started for Free
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#features"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-[#9F80DA] hover:text-[#9F80DA] transition-all text-lg font-medium"
              >
                Learn how
              </a>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#9F80DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Bloom's Taxonomy
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#9F80DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Kirkpatrick Model
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#9F80DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Gagné's 9 Events of Instruction
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Screenshot Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-7xl mx-auto"
        >
          <div className="bg-gradient-to-br from-[#9F80DA] to-[#8A6BC5] rounded-3xl p-2 shadow-2xl">
            <div className="bg-white rounded-2xl overflow-hidden">
              <Image
                src="/landing/mock.png"
                alt="Dashboard Preview - Your complete course creation workspace"
                width={1920}
                height={1080}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Everything you need to create amazing eLearnings
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features that streamline your course creation process
            </p>
          </motion.div>

          {features.filter(f => f.showInLanding).map((feature, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12 mb-24`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-3xl font-bold text-gray-900">{feature.title}</h3>
                  {feature.plan && (
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider whitespace-nowrap ${
                      feature.plan === 'Enterprise'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : feature.plan === 'Pro'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                        : feature.plan === 'Starter'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 border border-gray-300'
                    }`}>
                      {feature.plan}
                    </span>
                  )}
                </div>
                <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">{feature.description}</p>
              </div>
              <div className="flex-1 w-full">
                <div className={index === 2 || index === 3 || index === 4 || index === 8 || index === 9 || index === 10 || index === 11 || index === 12 || index === 13 || index === 14 ? "overflow-hidden" : index === 1 ? "overflow-hidden" : index === 15 ? "aspect-[16/14] overflow-hidden" : index === 16 || index === 18 ? "aspect-[16/13] overflow-hidden" : index === 0 ? "aspect-[16/10.8] overflow-hidden" : index === 17 ? "aspect-[16/9.9] overflow-hidden" : "aspect-video overflow-hidden"}>
                  {getFeatureComponent(index)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LMS Compatibility Section */}
      <section id="lms" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Compatible with Leading LMS Platforms
            </h2>
            <p className="text-xl text-gray-600">
              Export your courses to any Learning Management System
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6"
          >
            {/* Moodle */}
            <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <Image src="/landing/lms/moodle.png" alt="Moodle" width={120} height={60} className="h-10 w-auto object-contain max-w-[120px]" />
            </div>

            {/* Adobe */}
            <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <Image src="/landing/lms/adobe.png" alt="Adobe Captivate Prime" width={120} height={60} className="h-10 w-auto object-contain max-w-[120px]" />
            </div>

            {/* Absorb */}
            <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <Image src="/landing/lms/absorb.svg" alt="Absorb LMS" width={120} height={60} className="h-10 w-auto object-contain max-w-[120px]" />
            </div>

            {/* Docebo */}
            <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <Image src="/landing/lms/docebo.png" alt="Docebo" width={120} height={60} className="h-10 w-auto object-contain max-w-[120px]" />
            </div>

            {/* Cornerstone */}
            <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <Image src="/landing/lms/cornerstone.svg" alt="Cornerstone OnDemand" width={120} height={60} className="h-10 w-auto object-contain max-w-[120px]" />
            </div>

            {/* LearnUpon */}
            <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <Image src="/landing/lms/learnupon.png" alt="LearnUpon" width={120} height={60} className="h-10 w-auto object-contain max-w-[120px]" />
            </div>

            {/* TalentLMS */}
            <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <Image src="/landing/lms/talent.png" alt="TalentLMS" width={120} height={60} className="h-10 w-auto object-contain max-w-[120px]" />
            </div>

            {/* 360Learning */}
            <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <Image src="/landing/lms/360.png" alt="360Learning" width={120} height={60} className="h-10 w-auto object-contain max-w-[120px]" />
            </div>

            {/* Litmos */}
            <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <Image src="/landing/lms/litmos.svg" alt="Litmos" width={120} height={60} className="h-10 w-auto object-contain max-w-[120px]" />
            </div>

            {/* Skilljar */}
            <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <Image src="/landing/lms/skilljar.svg" alt="Skilljar" width={120} height={60} className="h-10 w-auto object-contain max-w-[120px]" />
            </div>

            {/* LearnWorlds */}
            <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <Image src="/landing/lms/learnworlds.png" alt="LearnWorlds" width={120} height={60} className="h-10 w-auto object-contain max-w-[120px]" />
            </div>

            {/* Tovuti */}
            <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <Image src="/landing/lms/tovuti.svg" alt="Tovuti LMS" width={120} height={60} className="h-10 w-auto object-contain max-w-[120px]" />
            </div>

            {/* iSpring */}
            <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <Image src="/landing/lms/isprint.png" alt="iSpring Learn" width={120} height={60} className="h-10 w-auto object-contain max-w-[120px]" />
            </div>

            {/* Chamilo */}
            <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <Image src="/landing/lms/chamilo.svg" alt="Chamilo" width={120} height={60} className="h-10 w-auto object-contain max-w-[120px]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Get started in 5 simple steps
            </h2>
            <p className="text-xl text-gray-600">
              From content to course in minutes
            </p>
          </motion.div>

          {/* Steps Header Row */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12"
          >
            {[
              { step: '1', title: 'Analysis' },
              { step: '2', title: 'Design' },
              { step: '3', title: 'Development', highlight: true },
              { step: '4', title: 'QA & Editing' },
              { step: '5', title: 'Export' },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-semibold ${
                  item.highlight
                    ? 'bg-[#9F80DA] text-white shadow-lg shadow-purple-300'
                    : 'bg-purple-100 text-[#9F80DA]'
                }`}
              >
                {item.step}. {item.title}
              </motion.div>
            ))}
          </motion.div>

          {/* Steps Content Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6"
          >
            {/* Step 1: Analysis */}
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center">
              <div className="mb-4">
                <span className="text-sm font-bold text-[#9F80DA]">01</span>
                <h3 className="text-xl font-bold text-gray-900">Analysis</h3>
              </div>
              <div className="relative mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-purple-50 rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#9F80DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-[#9F80DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Enter your objectives, audience, and topic. Upload all the materials you want to use in your eLearning: videos, images, audio, and PDFs.
              </p>
            </motion.div>

            {/* Step 2: Design */}
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center">
              <div className="mb-4">
                <span className="text-sm font-bold text-[#9F80DA]">02</span>
                <h3 className="text-xl font-bold text-gray-900">Design</h3>
              </div>
              <div className="relative mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-purple-50 rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#9F80DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-[#9F80DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Specify how many modules, units, and activities you want. Upload your guidelines, colors, fonts, and logo.
              </p>
            </motion.div>

            {/* Step 3: Development (Highlighted) */}
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center sm:col-span-2 lg:col-span-1">
              <div className="mb-4">
                <span className="text-sm font-bold text-white bg-[#9F80DA] px-2 py-0.5 rounded">03</span>
                <h3 className="text-xl font-bold text-gray-900 mt-1">Development</h3>
              </div>
              <div className="relative mb-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#9F80DA] rounded-2xl flex items-center justify-center shadow-lg shadow-purple-300">
                  <svg className="w-12 h-12 sm:w-14 sm:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#9F80DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-[#9F80DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Acadion.ai will generate your eLearning with visually stunning components.
              </p>
            </motion.div>

            {/* Step 4: QA & Editing */}
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center">
              <div className="mb-4">
                <span className="text-sm font-bold text-[#9F80DA]">04</span>
                <h3 className="text-xl font-bold text-gray-900">QA & Editing</h3>
              </div>
              <div className="relative mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-purple-50 rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#9F80DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-[#9F80DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Share your eLearning with your team, gather feedback, and edit it manually or with AI assistance.
              </p>
            </motion.div>

            {/* Step 5: Export */}
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center">
              <div className="mb-4">
                <span className="text-sm font-bold text-[#9F80DA]">05</span>
                <h3 className="text-xl font-bold text-gray-900">Export</h3>
              </div>
              <div className="relative mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-purple-50 rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#9F80DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Download your eLearning as a SCORM or xAPI package ready to integrate with your LMS.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Don't take it from us, hear it from our users
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of happy instructional designers
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-[#9F80DA] font-medium">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{testimonial.review}</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Ready to get started?
              </h2>
              <p className="text-xl text-gray-600">
                Join the closed beta with over 150 designers creating better courses faster
              </p>
              <Link
                href="/compare-plans"
                className="mt-6 px-6 py-3 bg-white border-2 border-[#9F80DA] text-[#9F80DA] hover:bg-[#9F80DA] hover:text-white font-medium rounded-full transition-all inline-block"
              >
                Compare all plans and features
              </Link>
            </div>

            {/* Pricing Plans */}
            <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-2 mb-16">
              {/* Personal Plans */}
                  {/* Personal Basic Plan */}
                  <div onClick={() => openPopup('Personal', 'Starter')} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-xl border-2 border-gray-200 hover:border-[#9F80DA] transition-all flex flex-col cursor-pointer">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-blue-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900">Starter</h3>
                    </div>
                    <div className="h-[57px] mb-[4.8px]">
                      <div className="flex items-start gap-2">
                        <div className="flex items-start">
                          <span className="text-3xl font-bold text-gray-900">$</span>
                          <span className="text-5xl font-bold text-gray-900">30</span>
                        </div>
                        <div className="flex flex-col justify-between h-full text-sm text-gray-600 py-1">
                          <span>per month</span>
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-gray-900">or ${(30 * 12 * 0.8).toFixed(0)} per year</span>
                            <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded">20% OFF</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-[24px] mb-[2.4px]">
                    </div>
                    <ul className="space-y-3 mb-8 flex-grow">
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#9F80DA] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700">3000 credits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#9F80DA] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700">Credits never expire</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#9F80DA] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700">Buy credits when you need them</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#9F80DA] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700">30 course hours</span>
                      </li>
                      {features.filter(f => f.plan === 'All Plans' && f.showInPlans).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-[#9F80DA] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-700">{feature.title}</span>
                        </li>
                      ))}
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#9F80DA] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700">Invite unlimited users for QA at no extra cost</span>
                      </li>
                    </ul>
                    <button
                      onClick={() => openPopup('Personal', 'Starter')}
                      className="w-full bg-[#9F80DA] text-white py-3 rounded-full hover:bg-[#8A6BC5] transition-all font-medium mt-auto"
                    >
                      Start
                    </button>
                  </div>

                  {/* Personal Pro Plan */}
                  <div onClick={() => openPopup('Personal', 'Pro')} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-xl border-2 border-gray-200 hover:border-[#9F80DA] transition-all flex flex-col cursor-pointer">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-purple-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-8 h-8 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      </div>
                      <h3 className="text-3xl font-bold">
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Pro</span>
                      </h3>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider whitespace-nowrap bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-white shadow-lg animate-pulse">
                        Most Popular
                      </span>
                    </div>
                    <div className="h-[57px] mb-[4.8px]">
                      <div className="flex items-start gap-2">
                        <div className="flex items-start">
                          <span className="text-3xl font-bold text-gray-900">$</span>
                          <span className="text-5xl font-bold text-gray-900">50</span>
                        </div>
                        <div className="flex flex-col justify-between h-full text-sm text-gray-600 py-1">
                          <span>per month</span>
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-gray-900">or ${(50 * 12 * 0.8).toFixed(0)} per year</span>
                            <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded">20% OFF</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-[24px] mb-[2.4px]">
                    </div>
                    <ul className="space-y-3 mb-8 flex-grow">
                      <li className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 -mx-2 px-2 py-1.5 rounded-lg">
                        <svg className="w-5 h-5 text-[#9F80DA] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">All features from Starter +</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#9F80DA] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700">1000 credits (4000 total)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#9F80DA] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700">40 course hours</span>
                      </li>
                      {features.filter(f => f.plan === 'Pro' && f.showInPlans).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-[#9F80DA] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-700">{feature.title}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => openPopup('Personal', 'Pro')}
                      className="w-full bg-[#9F80DA] text-white py-3 rounded-full hover:bg-[#8A6BC5] transition-all font-medium mt-auto"
                    >
                      Start
                    </button>
                  </div>

                  {/* Enterprise Plan */}
                  <div onClick={() => openPopup('Enterprise', 'Enterprise')} className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-3xl p-8 shadow-xl border-2 border-gray-200 hover:border-[#9F80DA] transition-all flex flex-col cursor-pointer">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-violet-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-8 h-8 text-violet-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h3 className="text-3xl font-bold">
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">Enterprise</span>
                      </h3>
                    </div>
                    <div className="h-[57px] mb-[4.8px]">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">Custom pricing</span>
                      </div>
                    </div>
                    <div className="h-[24px] mb-[2.4px]">
                    </div>
                    <ul className="space-y-3 mb-8 flex-grow">
                      <li className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 -mx-2 px-2 py-1.5 rounded-lg">
                        <svg className="w-5 h-5 text-[#9F80DA] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">All features from Pro +</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#9F80DA] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700">1000 credits (5000 total)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#9F80DA] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700">50 course hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#9F80DA] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700">Custom onboarding</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#9F80DA] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700">Personalized support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#9F80DA] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700">Custom integrations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#9F80DA] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700">Project Management & Workflows</span>
                      </li>
                    </ul>
                    <button
                      onClick={() => openPopup('Enterprise', 'Enterprise')}
                      className="w-full bg-[#9F80DA] text-white py-3 rounded-full hover:bg-[#8A6BC5] transition-all font-medium mt-auto"
                    >
                      Talk to sales
                    </button>
                  </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              What's often asked about acadion.ai
            </h2>
            <p className="text-xl text-gray-600">
              Find answers to common questions
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-8">{faq.question}</span>
                  <motion.svg
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-6 h-6 text-[#9F80DA] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === index ? "auto" : 0,
                    opacity: openFaq === index ? 1 : 0
                  }}
                  transition={{
                    height: { duration: 0.3, ease: "easeInOut" },
                    opacity: { duration: 0.2, ease: "easeInOut" }
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Logo and Description */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <img
                  src="/landing/acadion2.png"
                  alt="acadion Logo"
                  className="h-10 object-contain"
                  style={{ width: 'auto' }}
                />
              </div>
              <p className="text-gray-400 mb-6">
                Create engaged and interactive AI powered learning experiences
              </p>
              <a
                href="#pricing"
                className="inline-block bg-[#9F80DA] text-white px-6 py-2.5 rounded-full hover:bg-[#8A6BC5] transition-colors font-medium"
              >
                Start Now
              </a>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-3">
                {menuItems.map((item) => (
                  <li key={item}>
                    <a href={`#${getMenuItemId(item)}`} className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="/gdpr" className="text-gray-400 hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} acadion.ai. All rights reserved.
              </p>
              <div className="flex gap-6 hidden">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Welcome Popup */}
      {showWelcomePopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowWelcomePopup(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-none sm:rounded-3xl p-4 sm:p-8 md:p-12 max-w-4xl w-full h-full sm:h-auto shadow-2xl relative sm:max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Plan Title */}
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-8">
              <span className={
                selectedPlanName === 'Starter'
                  ? 'text-gray-900'
                  : selectedPlanName === 'Pro'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text'
              }>
                {selectedPlanName} Plan
              </span>
            </h2>

            {/* Progress Steps Header */}
            <div className="mb-2 md:mb-12">
              {/* Mobile: 1 row */}
              <div className="flex justify-evenly md:hidden">
                {steps.map((step, index) => (
                  <div key={`step-${index}`} className="flex flex-col items-center min-w-0 flex-shrink">
                    <button
                      type="button"
                      onClick={() => handleStepChange(index)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-semibold mb-1 transition-all cursor-pointer hover:scale-110 text-[11px] ${
                        index < currentStep
                          ? 'bg-[#86C5A8] text-white'
                          : index === currentStep
                          ? 'bg-[#9F80DA] text-white ring-4 ring-purple-200'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {index < currentStep ? (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </button>
                    <span className={`text-[10px] font-medium text-center leading-tight max-w-[50px] ${
                      index < currentStep ? 'text-[#86C5A8]' : index === currentStep ? 'text-[#9F80DA]' : 'text-gray-400'
                    }`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              {/* Desktop: Single row with lines */}
              <div className="hidden md:flex items-start mb-6">
                {steps.map((step, index) => (
                  <React.Fragment key={`desktop-step-${index}`}>
                    <div className="flex flex-col items-center min-w-fit">
                      <button
                        type="button"
                        onClick={() => handleStepChange(index)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 transition-all cursor-pointer hover:scale-110 ${
                          index < currentStep
                            ? 'bg-[#86C5A8] text-white'
                            : index === currentStep
                            ? 'bg-[#9F80DA] text-white ring-4 ring-purple-200'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {index < currentStep ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          index + 1
                        )}
                      </button>
                      <span className={`text-xs font-medium text-center whitespace-nowrap ${
                        index < currentStep ? 'text-[#86C5A8]' : index === currentStep ? 'text-[#9F80DA]' : 'text-gray-400'
                      }`}>
                        {step}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`h-1 flex-1 mx-2 rounded transition-all mt-5 ${
                        index < currentStep ? 'bg-[#86C5A8]' : 'bg-gray-200'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="mb-0 md:mb-12 min-h-[200px] md:min-h-[500px] flex flex-col justify-center">
              {!showThankYou && (
                <>
                  <h3 className="text-xl sm:text-3xl font-bold text-gray-900 mb-4 md:mb-8">
                    {currentStep === 0 && "What's your full name?"}
                    {currentStep === 1 && 'What is your email address?'}
                    {currentStep === 2 && 'What sectors do you work in?'}
                    {currentStep === 3 && selectedPlanType === 'Personal' && 'How many years of experience do you have?'}
                    {currentStep === 3 && selectedPlanType === 'Enterprise' && 'What is your company name?'}
                    {currentStep === 4 && selectedPlanType === 'Personal' && 'What type of deliverables are you interested in?'}
                    {currentStep === 4 && selectedPlanType === 'Enterprise' && 'How many people are on your team?'}
                    {currentStep === 5 && 'What type of deliverables are you interested in?'}
                  </h3>
                </>
              )}

              {/* Step 0: Full Name */}
              {!showThankYou && currentStep === 0 && (
                <>
                  <div className="w-full">
                    <input
                      ref={firstNameRef}
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => {
                        setFormData({...formData, firstName: e.target.value});
                        if (errors.firstName) {
                          setErrors({...errors, firstName: ''});
                        }
                      }}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-2 sm:py-4 border-b-2 ${
                        errors.firstName
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-200 focus:border-[#9F80DA]'
                      } outline-none transition text-base sm:text-xl ${errors.firstName ? 'mb-2' : 'mb-4 md:mb-8'}`}
                      placeholder="Type your answer here..."
                      autoFocus
                    />
                    {errors.firstName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm flex items-center gap-1.5 mb-4 md:mb-8"
                      >
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {errors.firstName}
                      </motion.p>
                    )}
                  </div>
                  <div className="flex justify-start">
                    <div className="flex flex-col items-center">
                      <button
                        onClick={handleNextStep}
                        disabled={isSubmitting}
                        className="bg-[#9F80DA] text-white px-6 py-2 md:px-8 md:py-3 rounded-lg hover:bg-[#8A6BC5] transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading...
                          </>
                        ) : (
                          <>
                            {currentStep === steps.length - 1 ? 'Finish' : 'Accept'}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </>
                        )}
                      </button>
                      <p className="hidden md:block text-sm text-gray-400 mt-2">
                        press <span className="font-semibold">Enter ↵</span>
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Step 1: Email */}
              {!showThankYou && currentStep === 1 && (
                <>
                  <div className="w-full">
                    <input
                      ref={emailRef}
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({...formData, email: e.target.value});
                        if (errors.email) {
                          setErrors({...errors, email: ''});
                        }
                      }}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-2 sm:py-4 border-b-2 ${
                        errors.email
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-200 focus:border-[#9F80DA]'
                      } outline-none transition text-base sm:text-xl ${errors.email ? 'mb-2' : 'mb-4 md:mb-8'}`}
                      placeholder="Type your answer here..."
                      autoFocus
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm flex items-center gap-1.5 mb-4 md:mb-8"
                      >
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {errors.email}
                      </motion.p>
                    )}
                  </div>
                  <div className="flex justify-start">
                    <div className="flex flex-col items-center">
                      <button
                        onClick={handleNextStep}
                        disabled={isSubmitting}
                        className="bg-[#9F80DA] text-white px-6 py-2 md:px-8 md:py-3 rounded-lg hover:bg-[#8A6BC5] transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading...
                          </>
                        ) : (
                          <>
                            {currentStep === steps.length - 1 ? 'Finish' : 'Accept'}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </>
                        )}
                      </button>
                      <p className="hidden md:block text-sm text-gray-400 mt-2">
                        press <span className="font-semibold">Enter ↵</span>
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: Sector (Both Personal and Enterprise) */}
              {!showThankYou && currentStep === 2 && (
                <>
                  <div className={`flex flex-wrap gap-2 sm:gap-3 justify-center ${errors.sector ? 'mb-2' : 'mb-8'}`}>
                    {['Consulting', 'Human Resources', 'Marketing', 'Learning and Development', 'Higher Education', 'Other'].map((sec) => (
                      <button
                        key={sec}
                        type="button"
                        onClick={() => handleSectorChange(sec)}
                        className={`px-3 sm:px-6 py-1.5 sm:py-3 rounded-full font-medium transition-all text-xs sm:text-base flex items-center gap-1.5 sm:gap-2 ${
                          formData.sector.includes(sec)
                            ? 'bg-[#9F80DA] text-white shadow-md'
                            : errors.sector
                            ? 'bg-red-50 text-gray-700 hover:bg-red-100 border-2 border-red-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          formData.sector.includes(sec)
                            ? 'bg-white border-white'
                            : 'bg-white border-gray-300'
                        }`}>
                          {formData.sector.includes(sec) && (
                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#9F80DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        {sec}
                      </button>
                    ))}
                  </div>
                  {errors.sector && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm flex items-center gap-1.5 mb-8 justify-center"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.sector}
                    </motion.p>
                  )}
                  <div className="flex justify-start">
                    <div className="flex flex-col items-center">
                      <button
                        onClick={handleNextStep}
                        disabled={isSubmitting}
                        className="bg-[#9F80DA] text-white px-6 py-2 md:px-8 md:py-3 rounded-lg hover:bg-[#8A6BC5] transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading...
                          </>
                        ) : (
                          <>
                            {currentStep === steps.length - 1 ? 'Finish' : 'Accept'}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </>
                        )}
                      </button>
                      <p className="hidden md:block text-sm text-gray-400 mt-2">
                        press <span className="font-semibold">Enter ↵</span>
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Step 3: Years of Experience (Personal) or Company (Enterprise) */}
              {!showThankYou && currentStep === 3 && selectedPlanType === 'Personal' && (
                <>
                  <div className={`flex flex-wrap gap-2 sm:gap-3 justify-center ${errors.experience ? 'mb-2' : 'mb-8'}`}>
                    {['1 to 3 years', '4 to 6 years', '+6 years'].map((exp) => (
                      <button
                        key={exp}
                        type="button"
                        onClick={() => {
                          setFormData({...formData, experience: exp});
                          if (errors.experience) {
                            setErrors({...errors, experience: ''});
                          }
                        }}
                        className={`px-3 sm:px-6 py-1.5 sm:py-3 rounded-full font-medium transition-all text-xs sm:text-base flex items-center gap-1.5 sm:gap-2 ${
                          formData.experience === exp
                            ? 'bg-[#9F80DA] text-white shadow-md'
                            : errors.experience
                            ? 'bg-red-50 text-gray-700 hover:bg-red-100 border-2 border-red-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          formData.experience === exp
                            ? 'bg-white border-white'
                            : 'bg-white border-gray-300'
                        }`}>
                          {formData.experience === exp && (
                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#9F80DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        {exp}
                      </button>
                    ))}
                  </div>
                  {errors.experience && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm flex items-center gap-1.5 mb-8 justify-center"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.experience}
                    </motion.p>
                  )}
                  <div className="flex justify-start">
                    <div className="flex flex-col items-center">
                      <button
                        onClick={handleNextStep}
                        disabled={isSubmitting}
                        className="bg-[#9F80DA] text-white px-6 py-2 md:px-8 md:py-3 rounded-lg hover:bg-[#8A6BC5] transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading...
                          </>
                        ) : (
                          <>
                            {currentStep === steps.length - 1 ? 'Finish' : 'Accept'}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </>
                        )}
                      </button>
                      <p className="hidden md:block text-sm text-gray-400 mt-2">
                        press <span className="font-semibold">Enter ↵</span>
                      </p>
                    </div>
                  </div>
                </>
              )}

              {!showThankYou && currentStep === 3 && selectedPlanType === 'Enterprise' && (
                <>
                  <div className="w-full">
                    <input
                      ref={companyRef}
                      type="text"
                      value={formData.company}
                      onChange={(e) => {
                        setFormData({...formData, company: e.target.value});
                        if (errors.company) {
                          setErrors({...errors, company: ''});
                        }
                      }}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-2 sm:py-4 border-b-2 ${
                        errors.company
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-200 focus:border-[#9F80DA]'
                      } outline-none transition text-base sm:text-xl ${errors.company ? 'mb-2' : 'mb-4 md:mb-8'}`}
                      placeholder="Type your answer here..."
                      autoFocus
                    />
                    {errors.company && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm flex items-center gap-1.5 mb-4 md:mb-8"
                      >
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {errors.company}
                      </motion.p>
                    )}
                  </div>
                  <div className="flex justify-start">
                    <div className="flex flex-col items-center">
                      <button
                        onClick={handleNextStep}
                        disabled={isSubmitting}
                        className="bg-[#9F80DA] text-white px-6 py-2 md:px-8 md:py-3 rounded-lg hover:bg-[#8A6BC5] transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading...
                          </>
                        ) : (
                          <>
                            {currentStep === steps.length - 1 ? 'Finish' : 'Accept'}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </>
                        )}
                      </button>
                      <p className="hidden md:block text-sm text-gray-400 mt-2">
                        press <span className="font-semibold">Enter ↵</span>
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Step 4: Deliverables (Personal) or Team Size (Enterprise) */}
              {!showThankYou && currentStep === 4 && selectedPlanType === 'Personal' && (
                <>
                  <div className={`flex flex-wrap gap-2 sm:gap-3 max-h-96 overflow-y-auto ${errors.deliverables ? 'mb-2' : 'mb-8'}`}>
                    {deliverableOptions.map((deliverable) => (
                      <button
                        key={deliverable}
                        type="button"
                        onClick={() => handleDeliverableChange(deliverable)}
                        className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium transition-all text-xs sm:text-base flex items-center gap-1.5 sm:gap-2 ${
                          formData.deliverables.includes(deliverable)
                            ? 'bg-[#9F80DA] text-white shadow-md'
                            : errors.deliverables
                            ? 'bg-red-50 text-gray-700 hover:bg-red-100 border-2 border-red-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          formData.deliverables.includes(deliverable)
                            ? 'bg-white border-white'
                            : 'bg-white border-gray-300'
                        }`}>
                          {formData.deliverables.includes(deliverable) && (
                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#9F80DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        {deliverable}
                      </button>
                    ))}
                  </div>
                  {errors.deliverables && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm flex items-center gap-1.5 mb-8 justify-center"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.deliverables}
                    </motion.p>
                  )}
                  <div className="flex justify-start">
                    <div className="flex flex-col items-center">
                      <button
                        onClick={handleNextStep}
                        disabled={isSubmitting}
                        className="bg-[#9F80DA] text-white px-6 py-2 md:px-8 md:py-3 rounded-lg hover:bg-[#8A6BC5] transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading...
                          </>
                        ) : (
                          <>
                            {currentStep === steps.length - 1 ? 'Finish' : 'Accept'}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </>
                        )}
                      </button>
                      <p className="hidden md:block text-sm text-gray-400 mt-2">
                        press <span className="font-semibold">Enter ↵</span>
                      </p>
                    </div>
                  </div>
                </>
              )}

              {!showThankYou && currentStep === 4 && selectedPlanType === 'Enterprise' && (
                <>
                  <div className={`flex flex-wrap gap-2 sm:gap-3 justify-center ${errors.team_size ? 'mb-2' : 'mb-8'}`}>
                    {['1-5', '6-10', '11-25', '26-50', '51+'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          setFormData({...formData, team_size: size});
                          if (errors.team_size) {
                            setErrors({...errors, team_size: ''});
                          }
                        }}
                        className={`px-3 sm:px-6 py-1.5 sm:py-3 rounded-full font-medium transition-all text-xs sm:text-base flex items-center gap-1.5 sm:gap-2 ${
                          formData.team_size === size
                            ? 'bg-[#9F80DA] text-white shadow-md'
                            : errors.team_size
                            ? 'bg-red-50 text-gray-700 hover:bg-red-100 border-2 border-red-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          formData.team_size === size
                            ? 'bg-white border-white'
                            : 'bg-white border-gray-300'
                        }`}>
                          {formData.team_size === size && (
                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#9F80DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        {size}
                      </button>
                    ))}
                  </div>
                  {errors.team_size && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm flex items-center gap-1.5 mb-8 justify-center"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.team_size}
                    </motion.p>
                  )}
                  <div className="flex justify-start">
                    <div className="flex flex-col items-center">
                      <button
                        onClick={handleNextStep}
                        disabled={isSubmitting}
                        className="bg-[#9F80DA] text-white px-6 py-2 md:px-8 md:py-3 rounded-lg hover:bg-[#8A6BC5] transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading...
                          </>
                        ) : (
                          <>
                            {currentStep === steps.length - 1 ? 'Finish' : 'Accept'}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </>
                        )}
                      </button>
                      <p className="hidden md:block text-sm text-gray-400 mt-2">
                        press <span className="font-semibold">Enter ↵</span>
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Step 5: Deliverables (Enterprise) */}
              {!showThankYou && currentStep === 5 && (
                <>
                  <div className={`flex flex-wrap gap-2 sm:gap-3 max-h-96 overflow-y-auto ${errors.deliverables ? 'mb-2' : 'mb-8'}`}>
                    {deliverableOptions.map((deliverable) => (
                      <button
                        key={deliverable}
                        type="button"
                        onClick={() => handleDeliverableChange(deliverable)}
                        className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium transition-all text-xs sm:text-base flex items-center gap-1.5 sm:gap-2 ${
                          formData.deliverables.includes(deliverable)
                            ? 'bg-[#9F80DA] text-white shadow-md'
                            : errors.deliverables
                            ? 'bg-red-50 text-gray-700 hover:bg-red-100 border-2 border-red-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          formData.deliverables.includes(deliverable)
                            ? 'bg-white border-white'
                            : 'bg-white border-gray-300'
                        }`}>
                          {formData.deliverables.includes(deliverable) && (
                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#9F80DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        {deliverable}
                      </button>
                    ))}
                  </div>
                  {errors.deliverables && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm flex items-center gap-1.5 mb-8 justify-center"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.deliverables}
                    </motion.p>
                  )}
                  <div className="flex justify-start">
                    <div className="flex flex-col items-center">
                      <button
                        onClick={handleNextStep}
                        disabled={isSubmitting}
                        className="bg-[#9F80DA] text-white px-6 py-2 md:px-8 md:py-3 rounded-lg hover:bg-[#8A6BC5] transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading...
                          </>
                        ) : (
                          <>
                            {currentStep === steps.length - 1 ? 'Finish' : 'Accept'}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </>
                        )}
                      </button>
                      <p className="hidden md:block text-sm text-gray-400 mt-2">
                        press <span className="font-semibold">Enter ↵</span>
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Thank You Section */}
              {showThankYou && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-center space-y-6"
                >
                  {/* Confirmation Icon */}
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#86C5A8] to-[#9F80DA] flex items-center justify-center">
                      <svg className="w-6 h-6 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Main Message */}
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    You're on the list
                  </h3>

                  <div className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-normal">
                    <p>Your request has been received.</p>
                    <p>We'll review your information within the next 48-72 hours.</p>
                  </div>

                  {/* What's Next */}
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 md:p-8 mt-8">
                    <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                      What happens next?
                    </h4>
                    <ul className="space-y-3 text-left text-sm md:text-base text-gray-700">
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#9F80DA] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>You'll receive a confirmation email shortly</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#9F80DA] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>We'll analyze your needs and how to include you in our closed beta</span>
                      </li>
                    </ul>
                  </div>

                  {/* Optional Next Steps */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-4">
                      While you wait, explore what you can do with acadion
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href="#features"
                        onClick={() => setShowWelcomePopup(false)}
                        className="px-6 py-2.5 text-[#9F80DA] border-2 border-[#9F80DA] rounded-lg hover:bg-[#9F80DA] hover:text-white transition-all font-medium"
                      >
                        See all features
                      </a>
                      <button
                        onClick={() => setShowWelcomePopup(false)}
                        className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </form>

            {/* Navigation Arrows */}
            {!showThankYou && (
              <div className="hidden md:flex justify-end gap-3">
                <button
                  onClick={() => handleStepChange(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    currentStep === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => handleStepChange(Math.min(steps.length - 1, currentStep + 1))}
                  disabled={currentStep === steps.length - 1}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    currentStep === steps.length - 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Initial Popup */}
      {showInitialPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowInitialPopup(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-3xl shadow-2xl relative"
            style={{ width: '90%', aspectRatio: '850/474' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowInitialPopup(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Popup Content */}
            <div className="w-full h-full p-8 flex items-center justify-center">
              <div className="w-[70%] h-[60%]">
                <AIGeneratedCourseFeature />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
