'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  ArrowRight,
  Briefcase,
  Cpu,
  Accessibility,
  Layout,
  Brain,
  ClipboardList,
  Target,
  Folder,
  TrendingUp,
} from 'lucide-react';
import { blogPosts } from './data';

const categories = [
  { id: 'Career', icon: Briefcase, label: { en: 'Career', es: 'Carrera' } },
  {
    id: 'Technology',
    icon: Cpu,
    label: { en: 'Technology', es: 'Tecnología' },
  },
  { id: 'AI', icon: Brain, label: { en: 'AI', es: 'IA' } },
  {
    id: 'Accessibility',
    icon: Accessibility,
    label: { en: 'Accessibility', es: 'Accesibilidad' },
  },
  {
    id: 'Methodology',
    icon: Layout,
    label: { en: 'Methodology', es: 'Metodología' },
  },
  {
    id: 'Design Strategy',
    icon: Target,
    label: { en: 'Design Strategy', es: 'Estrategia de Diseño' },
  },
  {
    id: 'Assessment',
    icon: ClipboardList,
    label: { en: 'Assessment', es: 'Evaluación' },
  },
  {
    id: 'Industry Trends',
    icon: TrendingUp,
    label: { en: 'Industry Trends', es: 'Tendencias' },
  },
];

// Helper function to get category icon
const getCategoryIcon = (categoryId: string) => {
  const category = categories.find((c) => c.id === categoryId);
  return category ? category.icon : Folder;
};

export default function BlogPage() {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredPosts =
    selectedCategories.length === 0
      ? blogPosts
      : blogPosts.filter((post) => selectedCategories.includes(post.category));

  // Get the 3 most recent posts for "What's new" section
  const latestPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  // Get remaining posts for the grid (excluding featured if no filter, or all filtered)
  const remainingPosts =
    selectedCategories.length === 0
      ? filteredPosts.filter((post) => !latestPosts.includes(post))
      : filteredPosts;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <img
                  src="/landing/acadion2.png"
                  alt="Acadion Logo"
                  className="h-8 object-contain cursor-pointer"
                />
              </Link>
              <span className="text-gray-300 text-2xl font-light">|</span>
              <span className="text-xl font-bold text-[#9F80DA] mt-[5px]">
                Blog
              </span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-[#9F80DA] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {language === 'en' ? 'Back to acadion.ai' : 'Volver a acadion.ai'}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with Background */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#9F80DA]/5 via-white to-[#9F80DA]/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#9F80DA]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#9F80DA]/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Language Switcher */}
            <div className="flex justify-end mb-6 gap-2">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-lg transition-all text-sm font-medium ${
                  language === 'en'
                    ? 'bg-[#9F80DA] text-white shadow-md'
                    : 'bg-white/80 text-gray-600 hover:bg-white border border-gray-200'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('es')}
                className={`px-3 py-1.5 rounded-lg transition-all text-sm font-medium ${
                  language === 'es'
                    ? 'bg-[#9F80DA] text-white shadow-md'
                    : 'bg-white/80 text-gray-600 hover:bg-white border border-gray-200'
                }`}
              >
                Español
              </button>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-semibold text-[#9F80DA] tracking-wider mb-3"
            >
              {language === 'en'
                ? 'acadion.ai Presents:'
                : 'acadion.ai Presenta:'}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              {language === 'en'
                ? 'The Instructional Design Hub'
                : 'El Centro de Diseño Instruccional'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 leading-relaxed mb-4"
            >
              {language === 'en'
                ? 'Insights, strategies, and expert perspectives from experienced L&D professionals.'
                : 'Perspectivas, estrategias y conocimientos expertos de profesionales experimentados en L&D.'}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-base text-gray-500 leading-relaxed max-w-2xl mx-auto"
            >
              {language === 'en'
                ? 'Our content is 100% sourced from real-world instructional design experience. Practical guides, industry trends, and actionable advice to help you grow your skills and advance your career.'
                : 'Nuestro contenido proviene 100% de experiencia real en diseño instruccional. Guías prácticas, tendencias de la industria y consejos accionables para desarrollar tus habilidades y avanzar en tu carrera.'}
            </motion.p>
          </div>

          {/* Category Filters */}
          <div className="max-w-7xl mx-auto mt-10">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedCategories.includes(category.id);
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryToggle(category.id)}
                    className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-medium transition-all text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 ${
                      isSelected
                        ? 'bg-[#9F80DA] text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? 'bg-white border-white'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-2.5 h-2.5 text-[#9F80DA]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <Icon className="w-4 h-4" />
                    {category.label[language]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* What's New Section - Only show when no filters are applied */}
      {selectedCategories.length === 0 && (
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex items-center gap-4"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {language === 'en' ? "What's New" : 'Novedades'}
              </h2>
              <div className="flex-grow h-1 bg-gradient-to-r from-[#9F80DA] to-transparent rounded-full" />
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Featured Post (Latest) - Left Column */}
              {latestPosts[0] &&
                (() => {
                  const CategoryIcon = getCategoryIcon(latestPosts[0].category);
                  return (
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="lg:w-1/2"
                    >
                      <Link
                        href={`/blog/${latestPosts[0].slug}?lang=${language}`}
                      >
                        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden group cursor-pointer">
                          <div className="p-8 flex-grow flex flex-col">
                            <span className="inline-flex items-center gap-2 bg-[#9F80DA]/10 text-[#9F80DA] px-4 py-2 rounded-full text-sm font-medium mb-4 self-start">
                              <CategoryIcon className="w-4 h-4" />
                              {latestPosts[0].category}
                            </span>
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-[#9F80DA] transition-colors">
                              {latestPosts[0].title[language]}
                            </h2>
                            <p className="text-gray-600 mb-6 flex-grow text-lg leading-relaxed">
                              {latestPosts[0].excerpt[language]}
                            </p>
                            <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                              <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {latestPosts[0].date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {latestPosts[0].readTime[language]}
                                </span>
                              </div>
                            </div>
                            <div className="mt-3 text-sm text-gray-600">
                              {language === 'en' ? 'By' : 'Por'}{' '}
                              {latestPosts[0].author}
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-[#9F80DA] font-medium group-hover:gap-3 transition-all">
                              {language === 'en' ? 'Read More' : 'Leer Más'}
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  );
                })()}

              {/* Right Column - 2 Posts Stacked */}
              <div className="lg:w-1/2 flex flex-col gap-6">
                {latestPosts.slice(1, 3).map((post, index) => {
                  const CategoryIcon = getCategoryIcon(post.category);
                  return (
                    <motion.article
                      key={post.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex-1 min-h-0"
                    >
                      <Link
                        href={`/blog/${post.slug}?lang=${language}`}
                        className="block h-full"
                      >
                        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer h-full flex flex-col">
                          <div className="p-6 flex-grow flex flex-col justify-between">
                            <div>
                              <span className="inline-flex items-center gap-2 bg-[#9F80DA]/10 text-[#9F80DA] px-3 py-1 rounded-full text-sm font-medium mb-3">
                                <CategoryIcon className="w-3.5 h-3.5" />
                                {post.category}
                              </span>
                              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#9F80DA] transition-colors line-clamp-2">
                                {post.title[language]}
                              </h2>
                              <p className="text-gray-600 mb-4 line-clamp-2">
                                {post.excerpt[language]}
                              </p>
                            </div>
                            <div>
                              <div className="flex items-center text-sm text-gray-500">
                                <div className="flex items-center gap-4">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {post.date}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {post.readTime[language]}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-4 flex items-center gap-2 text-[#9F80DA] font-medium group-hover:gap-3 transition-all">
                                {language === 'en' ? 'Read More' : 'Leer Más'}
                                <ArrowRight className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {selectedCategories.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex items-center gap-4"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {language === 'en' ? 'All Articles' : 'Todos los Artículos'}
              </h2>
              <div className="flex-grow h-1 bg-gradient-to-r from-[#9F80DA] to-transparent rounded-full" />
            </motion.div>
          )}

          {remainingPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {language === 'en'
                  ? 'No articles found for the selected categories.'
                  : 'No se encontraron artículos para las categorías seleccionadas.'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingPosts.map((post, index) => {
                const CategoryIcon = getCategoryIcon(post.category);
                return (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link href={`/blog/${post.slug}?lang=${language}`}>
                      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden group cursor-pointer">
                        {/* Category Badge */}
                        <div className="p-6 pb-4">
                          <span className="inline-flex items-center gap-2 bg-[#9F80DA]/10 text-[#9F80DA] px-3 py-1 rounded-full text-sm font-medium">
                            <CategoryIcon className="w-3.5 h-3.5" />
                            {post.category}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="px-6 pb-6 flex-grow flex flex-col">
                          <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#9F80DA] transition-colors line-clamp-2">
                            {post.title[language]}
                          </h2>
                          <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                            {post.excerpt[language]}
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
                                {post.readTime[language]}
                              </span>
                            </div>
                          </div>

                          {/* Author */}
                          <div className="mt-3 text-sm text-gray-600">
                            {language === 'en' ? 'By' : 'Por'} {post.author}
                          </div>

                          {/* Read More */}
                          <div className="mt-4 flex items-center gap-2 text-[#9F80DA] font-medium group-hover:gap-3 transition-all">
                            {language === 'en' ? 'Read More' : 'Leer Más'}
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          )}
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
