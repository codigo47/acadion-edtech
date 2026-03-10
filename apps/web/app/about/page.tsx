'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Lightbulb, Target, Heart } from 'lucide-react';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <img
                src="/landing/acadion2.png"
                alt="acadion Logo"
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
            About <span className="text-[#9F80DA]">acadion.ai</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
            We're a team of passionate instructional designers and developers
            who transformed our vision into reality
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-4">
                It all started in a small co-working space in early 2023. We
                were a team of five instructional designers, each with years of
                experience working in different sectors: corporate training,
                higher education, and EdTech startups. Despite our different
                backgrounds, we all shared the same frustrations.
              </p>
              <p className="mb-4">
                The tools we used daily were either too complex, too limited, or
                simply didn't understand the unique needs of instructional
                designers. We spent more time fighting with our tools than
                creating meaningful learning experiences. The rise of AI
                promised to change everything, but most solutions felt like they
                were built by engineers for engineers, not by educators for
                educators.
              </p>
              <p className="mb-4">
                One evening, over coffee and whiteboards filled with sketches,
                we asked ourselves: "What if we built the tool we wish we had?"
                That question sparked a journey that would change our lives
                forever.
              </p>
              <p className="mb-4">
                We pooled our savings, left our stable jobs, and dove headfirst
                into building acadion.ai. The early days were intense: long
                nights of coding, countless user interviews with fellow
                instructional designers, and iterations upon iterations of our
                platform. We weren't just building software; we were crafting a
                companion for the modern instructional designer.
              </p>
              <p className="mb-4">
                Our breakthrough came when we realized that AI shouldn't replace
                the instructional designer's expertise, it should amplify it. We
                developed our Course Copilot to work alongside designers,
                handling the repetitive tasks and technical complexities while
                leaving the creative and pedagogical decisions where they
                belong: in your hands.
              </p>
              <p>
                Today, Acadion.ai LLC is used by instructional designers across
                the globe, from freelancers creating courses from their home
                offices to teams in Fortune 500 companies. But we haven't
                forgotten our roots. We're still that team of instructional
                designers at heart, constantly learning from our community and
                evolving our platform to meet your needs.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[#9F80DA]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Designer-First
              </h3>
              <p className="text-gray-600">
                Every feature is built with instructional designers' workflows
                in mind, because we are you.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                AI Innovation
              </h3>
              <p className="text-gray-600">
                We continuously push boundaries to bring cutting-edge AI
                technology to learning design.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Learning Impact
              </h3>
              <p className="text-gray-600">
                We measure our success by the quality and effectiveness of
                learning experiences created on our platform.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Community
              </h3>
              <p className="text-gray-600">
                We're building more than software; we're fostering a community
                of innovative learning professionals.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Join Our Journey
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We're always looking for talented individuals who share our passion
            for transforming education through technology.
          </p>
          <Link
            href="/careers"
            className="inline-block bg-[#9F80DA] text-white px-8 py-4 rounded-full hover:bg-[#8A6BC5] transition-colors font-medium text-lg"
          >
            View Open Positions
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
