'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import Footer from '../components/Footer';
import { features as allFeatures } from '@/lib/constants';

// Filter features that should show in compare plans and map to the expected format
const features = allFeatures
  .filter(f => f.showInComparePlans)
  .map(f => ({
    name: f.title,
    description: f.description,
    starter: f.plan === 'All Plans' || f.plan === 'Starter',
    pro: f.plan === 'All Plans' || f.plan === 'Starter' || f.plan === 'Pro',
    enterprise: true,
  }));

// Add enterprise-only features that are not in the shared constants
const enterpriseOnlyFeatures = [
  {
    name: 'Custom Onboarding',
    description: 'Get personalized onboarding sessions tailored to your team\'s needs and workflow requirements.',
    starter: false,
    pro: false,
    enterprise: true,
  },
  {
    name: 'Personalized Support',
    description: 'Access dedicated account management and priority support for your organization.',
    starter: false,
    pro: false,
    enterprise: true,
  },
  {
    name: 'Custom Integrations',
    description: 'Connect acadion.ai with your existing tools and systems through custom API integrations.',
    starter: false,
    pro: false,
    enterprise: true,
  },
];

const allCompareFeatures = [...features, ...enterpriseOnlyFeatures];

const planDetails = {
  starter: {
    name: 'Starter',
    price: '$30',
    period: 'per month',
    yearlyPrice: '$288',
    credits: '3,000 credits',
    courseHours: '30 course hours',
    courses: '1 free course',
    gradient: 'from-blue-500 to-purple-500',
    popular: false,
  },
  pro: {
    name: 'Pro',
    price: '$50',
    period: 'per month',
    yearlyPrice: '$480',
    credits: '4,000 credits',
    courseHours: '40 course hours',
    courses: 'Unlimited courses',
    gradient: 'from-purple-500 to-pink-500',
    popular: true,
  },
  enterprise: {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    yearlyPrice: 'Contact us',
    credits: '5,000+ credits',
    courseHours: '50+ course hours',
    courses: 'Unlimited courses',
    gradient: 'from-purple-600 to-blue-600',
    popular: false,
  },
};

export default function ComparePlansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <img
                src="/landing/acadion2.png"
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
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Compare <span className="text-[#9F80DA]">Plans</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Find the perfect plan for your course creation needs
          </motion.p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Mobile hint */}
          <p className="text-sm text-gray-500 text-center mb-4 md:hidden">
            Swipe to see all plans →
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl overflow-x-auto"
          >
            <div className="min-w-[800px]">
            {/* Plan Headers */}
            <div className="grid grid-cols-5 border-b border-gray-200">
              <div className="col-span-2 p-6 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">Features</h3>
              </div>
              {Object.entries(planDetails).map(([key, plan]) => (
                <div
                  key={key}
                  className={`p-6 text-center ${plan.popular ? 'bg-purple-50 border-x-2 border-t-2 border-purple-200' : 'bg-gray-50'}`}
                >
                  {plan.popular ? (
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-white mb-2">
                      Most Popular
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-2 invisible">
                      Placeholder
                    </span>
                  )}
                  <h3 className={`text-xl font-bold bg-gradient-to-r ${plan.gradient} text-transparent bg-clip-text`}>
                    {plan.name}
                  </h3>
                  {plan.price === 'Custom' ? (
                    <>
                      <div className="mt-2">
                        <span className="text-3xl font-bold text-gray-900">Custom pricing</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Contact us
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="mt-2">
                        <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{plan.period}</p>
                      <p className="text-sm text-gray-500">
                        {plan.yearlyPrice}/year
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Plan Quick Stats */}
            <div className="grid grid-cols-5 border-b border-gray-200 bg-gray-50">
              <div className="col-span-2 p-4">
                <span className="text-sm font-medium text-gray-700">Credits included</span>
              </div>
              {Object.entries(planDetails).map(([key, plan]) => (
                <div key={key} className={`p-4 text-center ${plan.popular ? 'bg-purple-50 border-x-2 border-purple-200' : ''}`}>
                  <span className="text-sm font-semibold text-gray-900">{plan.credits}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-5 border-b border-gray-200 bg-gray-50">
              <div className="col-span-2 p-4">
                <span className="text-sm font-medium text-gray-700">Course hours</span>
              </div>
              {Object.entries(planDetails).map(([key, plan]) => (
                <div key={key} className={`p-4 text-center ${plan.popular ? 'bg-purple-50 border-x-2 border-purple-200' : ''}`}>
                  <span className="text-sm font-semibold text-gray-900">{plan.courseHours}</span>
                </div>
              ))}
            </div>

            {/* Feature Rows */}
            {allCompareFeatures.map((feature, index) => (
              <div
                key={feature.name}
                className={`grid grid-cols-5 border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
              >
                <div className="col-span-2 p-4 flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#9F80DA] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="text-sm font-medium text-gray-900">{feature.name}</span>
                    <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                  </div>
                </div>
                <div className={`p-4 flex items-center justify-center ${planDetails.starter.popular ? 'bg-purple-50/50 border-x-2 border-purple-200' : ''}`}>
                  {feature.starter ? (
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <X className="w-5 h-5 text-gray-400" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div className={`p-4 flex items-center justify-center ${planDetails.pro.popular ? 'bg-purple-50/50 border-x-2 border-purple-200' : ''}`}>
                  {feature.pro ? (
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <X className="w-5 h-5 text-gray-400" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div className={`p-4 flex items-center justify-center ${planDetails.enterprise.popular ? 'bg-purple-50/50 border-x-2 border-purple-200' : ''}`}>
                  {feature.enterprise ? (
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <X className="w-5 h-5 text-gray-400" strokeWidth={3} />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* CTA Row */}
            <div className="grid grid-cols-5 bg-gray-50">
              <div className="col-span-2 p-6"></div>
              <div className="p-6 text-center">
                <Link
                  href="/#pricing"
                  className="inline-block w-full bg-[#9F80DA] text-white py-3 px-6 rounded-full hover:bg-[#8A6BC5] transition-all font-medium"
                >
                  Get Started
                </Link>
              </div>
              <div className={`p-6 text-center ${planDetails.pro.popular ? 'bg-purple-50 border-x-2 border-b-2 border-purple-200 rounded-b-lg' : ''}`}>
                <Link
                  href="/#pricing"
                  className="inline-block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-full hover:opacity-90 transition-all font-medium"
                >
                  Get Started
                </Link>
              </div>
              <div className="p-6 text-center">
                <Link
                  href="/#pricing"
                  className="inline-block w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-full hover:opacity-90 transition-all font-medium"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
