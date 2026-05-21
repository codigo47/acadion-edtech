'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'freelance-vs-corporate-instructional-design',
    title: 'Freelance vs Corporate: Which Path is Right for Your Instructional Design Career?',
    excerpt: 'Explore the pros and cons of working as a freelance instructional designer versus joining a corporate L&D team. Learn about income potential, work-life balance, creative freedom, and career growth opportunities in both paths.',
    date: 'February 3, 2024',
    readTime: '8 min read',
    category: 'Career',
    author: 'Vanessa Jiordan'
  },
  {
    slug: 'learning-management-systems-guide',
    title: 'The Complete Guide to Learning Management Systems (LMS) and Related Technologies',
    excerpt: 'Navigate the complex landscape of learning technologies. From traditional LMS platforms to LXP, authoring tools, and content libraries—understand which systems you need to master as an instructional designer.',
    date: 'February 17, 2024',
    readTime: '12 min read',
    category: 'Technology',
    author: 'Vanessa Jiordan'
  },
  {
    slug: 'ai-powered-elearning-comparison',
    title: 'Traditional vs AI-Powered eLearning: A Comprehensive Comparison',
    excerpt: 'How does AI change the game for eLearning development? Compare traditional authoring approaches with modern AI-powered platforms, exploring efficiency gains, personalization capabilities, and content quality.',
    date: 'March 2, 2024',
    readTime: '10 min read',
    category: 'AI & Technology',
    author: 'Vanessa Jiordan'
  },
  {
    slug: 'teacher-to-instructional-designer',
    title: 'From Classroom to Courseware: Reinventing Yourself as an Instructional Designer',
    excerpt: 'A practical roadmap for educators transitioning into instructional design. Learn how to leverage your teaching experience, what new skills to develop, and how to build a portfolio that stands out.',
    date: 'March 16, 2024',
    readTime: '9 min read',
    category: 'Career',
    author: 'Vanessa Jiordan'
  },
  {
    slug: 'accessibility-compliance-wcag',
    title: 'Accessibility in eLearning: Meeting WCAG Standards Without Compromising Design',
    excerpt: 'Create beautiful, engaging courses that everyone can access. This guide covers WCAG 2.1 compliance, accessible design patterns, testing tools, and common pitfalls to avoid.',
    date: 'March 30, 2024',
    readTime: '11 min read',
    category: 'Accessibility',
    author: 'Vanessa Jiordan'
  },
  {
    slug: 'instructional-design-models-comparison',
    title: 'ADDIE vs SAM vs Design Thinking: Choosing the Right Instructional Design Model',
    excerpt: 'Not all projects fit the same methodology. Compare popular instructional design frameworks and learn when to use each approach for maximum effectiveness and client satisfaction.',
    date: 'April 13, 2024',
    readTime: '10 min read',
    category: 'Methodology',
    author: 'Vanessa Jiordan'
  },
  {
    slug: 'microlearning-strategies',
    title: 'Microlearning That Actually Works: Design Strategies for Modern Learners',
    excerpt: 'Short doesn\'t mean shallow. Discover how to design impactful microlearning experiences that fit busy schedules while still achieving meaningful learning outcomes.',
    date: 'April 27, 2024',
    readTime: '7 min read',
    category: 'Design Strategy',
    author: 'Vanessa Jiordan'
  },
  {
    slug: 'assessment-design-best-practices',
    title: 'Beyond Multiple Choice: Innovative Assessment Strategies for eLearning',
    excerpt: 'Move past traditional quizzes to create assessments that truly measure learning. Explore scenario-based questions, simulations, performance tasks, and formative assessment techniques.',
    date: 'May 11, 2024',
    readTime: '9 min read',
    category: 'Assessment',
    author: 'Vanessa Jiordan'
  },
  {
    slug: 'building-instructional-design-portfolio',
    title: 'Building an Instructional Design Portfolio That Gets You Hired',
    excerpt: 'Your portfolio is your most powerful job search tool. Learn what to include, how to present your work under NDA, creating case studies, and showcasing your design process.',
    date: 'November 8, 2025',
    readTime: '8 min read',
    category: 'Career',
    author: 'Vanessa Jiordan'
  },
  {
    slug: 'future-of-instructional-design',
    title: 'The Future of Instructional Design: Trends Shaping Our Field in 2025 and Beyond',
    excerpt: 'Stay ahead of the curve with insights into emerging trends: AI assistants, immersive learning, adaptive technologies, skills-based learning, and the evolving role of instructional designers.',
    date: 'November 22, 2025',
    readTime: '12 min read',
    category: 'Industry Trends',
    author: 'Vanessa Jiordan'
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <img
                src="/landing/acadion.png"
                alt="Acadion Logo"
                className="h-8 object-contain cursor-pointer"
              />
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-[#9F80DA] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Acadion.ai <span className="text-[#9F80DA]">Blog</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
            Insights, strategies, and inspiration for instructional designers
          </motion.p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden group cursor-pointer">
                    {/* Category Badge */}
                    <div className="p-6 pb-4">
                      <span className="inline-block bg-[#9F80DA]/10 text-[#9F80DA] px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="px-6 pb-6 flex-grow flex flex-col">
                      <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#9F80DA] transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>

                      {/* Author */}
                      <div className="mt-3 text-sm text-gray-600">
                        By {post.author}
                      </div>

                      {/* Read More */}
                      <div className="mt-4 flex items-center gap-2 text-[#9F80DA] font-medium group-hover:gap-3 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Acadion.ai LLC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
