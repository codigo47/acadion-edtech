'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import posthog from 'posthog-js';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    designers: '',
    company: ''
  });

  const menuItems = ['Features', 'How it Works', 'Testimonials', 'FAQ', 'Contact'];

  const features = [
    {
      title: 'AI-Generated Courses from Any Source',
      description: 'Upload PDFs, text documents, website links, videos, or audio files and watch as our AI transforms them into structured, engaging courses automatically. No matter the format, Course Scribe handles it all.',
      image: '/placeholder-feature-1.jpg'
    },
    {
      title: 'Full Manual Editing Control',
      description: 'Manually edit any block or resource in your course. Fine-tune content, adjust layouts, modify assessments, and customize every element to match your exact vision and requirements.',
      image: '/placeholder-feature-2.jpg'
    },
    {
      title: 'Industry-Standard Export Formats',
      description: 'Export your courses to SCORM 1.2, xAPI (Tin Can API), and other standard formats. Seamlessly integrate with any LMS platform including Moodle, Canvas, Blackboard, and more.',
      image: '/placeholder-feature-3.jpg'
    },
    {
      title: 'Multi-Language Course Support',
      description: 'Create courses in multiple languages to reach a global audience. Easily translate and localize content to meet the needs of learners worldwide.',
      image: '/placeholder-feature-4.jpg'
    },
    {
      title: 'Rich Interactive Resources',
      description: 'Engage learners with diverse interactive elements including multiple choice, flip cards, sorting activities, true/false questions, fill in the blanks, drag and drop, matching pairs, sequencing, hotspots, and more.',
      image: '/placeholder-feature-5.jpg'
    },
    {
      title: 'Multimedia Course Creation',
      description: 'Build dynamic courses combining text, images, and videos. Create rich multimedia learning experiences that keep learners engaged and improve knowledge retention.',
      image: '/placeholder-feature-6.jpg'
    },
    {
      title: 'AI-Powered QA Magic Button',
      description: 'Streamline quality assurance with our "Magic Button" feature. Automatically address reviewer comments and feedback using AI, saving hours of manual revision work.',
      image: '/placeholder-feature-7.jpg'
    },
    {
      title: 'Instructional Design Models',
      description: 'Create courses based on proven pedagogical frameworks including Bloom\'s Taxonomy, Kirkpatrick Model, Gagné\'s 9 Events of Instruction, and ADDIE framework compliance for effective learning outcomes.',
      image: '/placeholder-feature-8.jpg'
    },
    {
      title: 'White Label Customization',
      description: 'Make it your own with complete white label capabilities. Customize fonts, colors, and logos to match your brand identity perfectly and deliver a consistent brand experience.',
      image: '/placeholder-feature-9.jpg'
    },
    {
      title: 'Dark Mode for Modern Learning',
      description: 'Offer learners a comfortable viewing experience with built-in dark mode support. Reduce eye strain and provide a modern, accessible learning environment.',
      image: '/placeholder-feature-10.jpg'
    },
    {
      title: 'WCAG 2.1 Accessibility Compliance',
      description: 'Ensure your courses are accessible to all learners with WCAG 2.1 compliance. Meet legal requirements and provide inclusive learning experiences for users with disabilities.',
      image: '/placeholder-feature-11.jpg'
    },
    {
      title: 'AI Image Generation',
      description: 'Generate custom images on-demand without needing stock photo subscriptions. Create unique, relevant visuals for your courses instantly using AI-powered image generation.',
      image: '/placeholder-feature-12.jpg'
    },
    {
      title: 'Complete Learning Assets Library',
      description: 'Generate a comprehensive suite of professional learning deliverables automatically: e-learning modules, microlearning content, job aids, quick reference guides, facilitator guides, participant workbooks, ILT presentation decks, and assessments - everything you need for effective training programs.',
      image: '/placeholder-feature-13.jpg'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Martinez',
      role: 'Learning & Development Manager',
      company: 'TechCorp Inc.',
      review: 'Course Scribe has transformed how we create training content. What used to take weeks now takes days. The AI-powered generation is incredibly accurate and saves our team countless hours.',
      avatar: 'SM'
    },
    {
      name: 'Michael Chen',
      role: 'Instructional Designer',
      company: 'EduLearn Solutions',
      review: 'As an instructional designer, I was skeptical at first. But Course Scribe has become an indispensable tool in my workflow. It handles the tedious work so I can focus on creating engaging learning experiences.',
      avatar: 'MC'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Training',
      company: 'Global Finance Group',
      review: 'The ROI on Course Scribe has been phenomenal. We\'ve reduced course development time by 70% and our team can now focus on strategic initiatives instead of manual formatting.',
      avatar: 'ER'
    },
    {
      name: 'James Thompson',
      role: 'Senior Course Developer',
      company: 'HealthEd Systems',
      review: 'I love how Course Scribe understands context and maintains consistency across all our courses. The export features are seamless and work perfectly with our existing LMS.',
      avatar: 'JT'
    },
    {
      name: 'Priya Patel',
      role: 'Director of Education',
      company: 'StartupAcademy',
      review: 'Course Scribe has been a game-changer for our small team. We can now produce the same quality content as organizations with 10x our resources. Absolutely worth every penny.',
      avatar: 'PP'
    },
    {
      name: 'David Kim',
      role: 'Training Coordinator',
      company: 'Manufacturing Pro',
      review: 'The ability to upload any content format and get a professional course is amazing. Our compliance training development has never been faster or more efficient.',
      avatar: 'DK'
    }
  ];

  const faqs = [
    {
      question: 'What types of content can I upload to Course Scribe?',
      answer: 'Course Scribe accepts a wide variety of content formats including videos, PDFs, PowerPoint presentations, Word documents, audio files, and more. Our AI is trained to understand and process different content types to create cohesive courses.'
    },
    {
      question: 'How long does it take to create a course?',
      answer: 'The time varies depending on the amount of content you upload, but typically a course can be generated in minutes. Most users find that what used to take days or weeks now takes just a few hours, including customization and review.'
    },
    {
      question: 'Can I customize the AI-generated content?',
      answer: 'Absolutely! While our AI does an excellent job of creating course content, you have full control to edit, modify, and customize everything. Think of Course Scribe as your intelligent assistant that handles the heavy lifting, but you remain in complete control.'
    },
    {
      question: 'Is Course Scribe compatible with my LMS?',
      answer: 'Yes! Course Scribe supports exports in SCORM 1.2, SCORM 2004, xAPI (Tin Can), and other standard formats. We\'re compatible with all major LMS platforms including Moodle, Canvas, Blackboard, and more.'
    },
    {
      question: 'How secure is my content?',
      answer: 'Security is our top priority. All data is encrypted in transit and at rest. We\'re SOC 2 Type II certified and fully GDPR compliant. Your content is never used to train our AI models, and you maintain complete ownership of your intellectual property.'
    },
    {
      question: 'Do you offer team collaboration features?',
      answer: 'Yes! Course Scribe includes robust collaboration tools. Multiple team members can work on the same course simultaneously, leave comments, suggest edits, and manage approval workflows. We offer different permission levels to suit your organizational needs.'
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'We offer comprehensive support including detailed documentation, video tutorials, and email support for all plans. Premium plans include priority support, dedicated account management, and personalized onboarding sessions.'
    },
    {
      question: 'Can I try Course Scribe before committing?',
      answer: 'Absolutely! We offer a 14-day free trial with full access to all features. No credit card required. You can create up to 3 courses during the trial period to fully evaluate if Course Scribe is right for you.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Send event to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        debug_mode: process.env.NODE_ENV === 'development',
        event_category: 'Form',
        event_label: 'Contact Form Submission',
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        number_of_designers: formData.designers,
        company: formData.company || 'Not provided',
      });
    }

    console.log('Form submitted:', formData);
    setShowSuccessPopup(true);

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      designers: '',
      company: ''
    });

    // Auto-close popup after 5 seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 5000);
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
        className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#9F80DA] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">CS</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">Course Scribe</span>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-600 hover:text-[#9F80DA] transition-colors font-medium"
                >
                  {item}
                </a>
              ))}
              <a
                href="#contact"
                className="bg-[#9F80DA] text-white px-6 py-2.5 rounded-full hover:bg-[#8A6BC5] transition-colors font-medium"
              >
                Start Now
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
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
              <p className="text-gray-600 text-lg">Trusted by 2,500+ teams</p>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
            >
              Create educational content<br />in the AI era
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
            >
              Forget all the manual tasks of instructional design and focus on creating better educational content.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#contact"
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                7 MIN SETUP
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#9F80DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                GDPR COMPLIANT
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#9F80DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                ISO27001
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
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 bg-[#9F80DA] rounded-2xl mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-2xl font-semibold text-gray-700">Dashboard Preview</p>
                  <p className="text-gray-500 mt-2">Your complete course creation workspace</p>
                </div>
              </div>
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
              Everything you need to create amazing courses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features that streamline your course creation process
            </p>
          </motion.div>

          {features.map((feature, index) => (
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
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
              <div className="flex-1 w-full">
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl shadow-xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-[#9F80DA] rounded-xl mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-600">Feature Visualization</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Get started in 3 simple steps
            </h2>
            <p className="text-xl text-gray-600">
              From content to course in minutes
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-12"
          >
            {[
              {
                step: '01',
                title: 'Sign Up',
                description: 'Create your free account in seconds. No credit card required. Start with our generous free tier.',
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                )
              },
              {
                step: '02',
                title: 'Upload Your Content',
                description: 'Drop in your videos, documents, presentations, or any content. Our AI processes everything instantly.',
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                )
              },
              {
                step: '03',
                title: 'Customize and Publish',
                description: 'Review, edit, and customize your course. Export to any format or LMS with a single click.',
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-[#9F80DA] text-white rounded-2xl mb-6">
                    {item.icon}
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-[#9F80DA]">{item.step}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
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
                  <div className="w-12 h-12 bg-[#9F80DA] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">{testimonial.avatar}</span>
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
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
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
                Join 2,500+ teams creating better courses faster
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-3xl p-8 shadow-xl">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9F80DA] focus:border-transparent outline-none transition"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9F80DA] focus:border-transparent outline-none transition"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9F80DA] focus:border-transparent outline-none transition"
                  placeholder="john.doe@company.com"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Instructional Designers *
                </label>
                <select
                  required
                  value={formData.designers}
                  onChange={(e) => setFormData({...formData, designers: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9F80DA] focus:border-transparent outline-none transition"
                >
                  <option value="">Select...</option>
                  <option value="1-5">1-5</option>
                  <option value="6-10">6-10</option>
                  <option value="11-25">11-25</option>
                  <option value="26-50">26-50</option>
                  <option value="51+">51+</option>
                </select>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name (optional)
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9F80DA] focus:border-transparent outline-none transition"
                  placeholder="Your Company"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#9F80DA] text-white py-4 rounded-full hover:bg-[#8A6BC5] transition-all transform hover:scale-105 font-medium text-lg shadow-lg"
              >
                Start Free Trial
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              Companies that trust us
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="flex items-center justify-center">
                  <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 font-semibold">LOGO</span>
                  </div>
                </div>
              ))}
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
              What's often asked about Course Scribe
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
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#9F80DA] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">CS</span>
                </div>
                <span className="ml-3 text-xl font-bold">Course Scribe</span>
              </div>
              <p className="text-gray-400 mb-6">
                Making course creation simple with AI-powered tools.
              </p>
              <a
                href="#contact"
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
                    <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white transition-colors">
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
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Course Scribe. All rights reserved.
              </p>
              <div className="flex gap-6">
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

      {/* Success Popup */}
      {showSuccessPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowSuccessPopup(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Success icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#9F80DA] to-[#8A6BC5] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Message */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Thank you for your interest!</h3>
              <p className="text-gray-600 leading-relaxed">
                We'll be in touch soon to help you get started with Course Scribe.
              </p>
            </div>

            {/* Optional close button */}
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="mt-6 w-full bg-[#9F80DA] text-white py-3 rounded-full hover:bg-[#8A6BC5] transition-all font-medium"
            >
              Got it!
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
