'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Briefcase, ArrowRight } from 'lucide-react';

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
}

const jobPostings: JobPosting[] = [
  {
    id: 'id-senior',
    title: 'Senior Instructional Designer',
    department: 'Learning Design',
    location: 'Remote (US)',
    type: 'Full-time',
    description: 'Lead the design of innovative learning experiences using our AI-powered platform. Work directly with clients to transform their training needs into engaging, effective courses.',
    responsibilities: [
      'Design and develop comprehensive learning experiences using ADDIE, SAM, or other instructional design models',
      'Collaborate with subject matter experts to analyze learning needs and create effective solutions',
      'Create storyboards, scripts, and design documents for multimedia courses',
      'Mentor junior instructional designers and provide design feedback',
      'Stay current with learning science research and emerging trends in instructional design'
    ],
    qualifications: [
      '5+ years of experience in instructional design',
      'Master\'s degree in Instructional Design, Educational Technology, or related field',
      'Expert knowledge of adult learning theory and instructional design models',
      'Proficiency with authoring tools (Articulate, Captivate, or similar)',
      'Strong portfolio demonstrating excellent design work',
      'Experience with LMS platforms and SCORM standards'
    ]
  },
  {
    id: 'id-junior',
    title: 'Instructional Designer',
    department: 'Learning Design',
    location: 'Remote (US)',
    type: 'Full-time',
    description: 'Join our growing team to create engaging learning experiences. Perfect for someone with 2-3 years of experience looking to grow their career in a fast-paced, innovative environment.',
    responsibilities: [
      'Develop interactive eLearning courses using Acadion.ai platform',
      'Work with senior designers to implement instructional strategies',
      'Create assessments and interactive activities aligned with learning objectives',
      'Conduct quality assurance testing on course materials',
      'Participate in client meetings and incorporate feedback into designs'
    ],
    qualifications: [
      '2+ years of instructional design experience',
      'Bachelor\'s degree in Instructional Design, Education, or related field',
      'Knowledge of learning theories and instructional design principles',
      'Experience with eLearning authoring tools',
      'Strong written and verbal communication skills',
      'Detail-oriented with excellent project management skills'
    ]
  },
  {
    id: 'sales-exec',
    title: 'Sales Executive',
    department: 'Sales',
    location: 'Remote (US)',
    type: 'Full-time',
    description: 'Drive growth by introducing Acadion.ai to learning and development teams at forward-thinking organizations. Ideal for someone passionate about EdTech and consultative selling.',
    responsibilities: [
      'Generate and qualify new sales leads through various channels',
      'Conduct product demonstrations and presentations to potential clients',
      'Develop and maintain relationships with key decision-makers in L&D departments',
      'Collaborate with the product team to communicate customer needs and feedback',
      'Meet and exceed monthly and quarterly sales targets',
      'Maintain accurate records in CRM system'
    ],
    qualifications: [
      '3+ years of B2B SaaS sales experience, preferably in EdTech or learning platforms',
      'Proven track record of meeting or exceeding sales quotas',
      'Strong understanding of the L&D landscape and corporate training needs',
      'Excellent presentation and communication skills',
      'Self-motivated with ability to work independently',
      'Experience with Salesforce or similar CRM platforms'
    ]
  },
  {
    id: 'ops-manager',
    title: 'Operations Manager',
    department: 'Operations',
    location: 'Remote (US)',
    type: 'Full-time',
    description: 'Streamline our operations and help scale our growing business. You\'ll work across all departments to optimize processes and ensure smooth delivery of our services.',
    responsibilities: [
      'Manage day-to-day operations and coordinate between departments',
      'Develop and implement operational processes and procedures',
      'Monitor project timelines and resource allocation',
      'Analyze operational data and provide insights for improvement',
      'Manage vendor relationships and procurement processes',
      'Support customer success initiatives and client onboarding'
    ],
    qualifications: [
      '4+ years of operations management experience, preferably in tech or SaaS',
      'Bachelor\'s degree in Business Administration, Operations Management, or related field',
      'Strong analytical and problem-solving skills',
      'Experience with project management tools (Asana, Monday, or similar)',
      'Excellent organizational and multitasking abilities',
      'Strong communication skills and ability to work cross-functionally'
    ]
  },
  {
    id: 'ai-engineer',
    title: 'AI Full Stack Engineer',
    department: 'Engineering',
    location: 'Remote (US)',
    type: 'Full-time',
    description: 'Build the future of AI-powered learning experiences. We\'re looking for three talented engineers to join our core team and help scale our platform.',
    responsibilities: [
      'Develop and maintain full-stack features for our AI-powered learning platform',
      'Build and optimize AI/ML models for content generation and personalization',
      'Design and implement scalable backend services and APIs',
      'Create intuitive, responsive front-end interfaces using modern frameworks',
      'Collaborate with instructional designers to translate learning requirements into technical solutions',
      'Participate in code reviews and contribute to technical architecture decisions',
      'Monitor and optimize application performance and reliability'
    ],
    qualifications: [
      '3+ years of full-stack development experience',
      'Strong proficiency in Python and JavaScript/TypeScript',
      'Experience with modern frontend frameworks (React, Next.js, Vue)',
      'Knowledge of backend frameworks (FastAPI, Django, Node.js)',
      'Hands-on experience with LLMs, RAG systems, or other AI/ML technologies',
      'Experience with cloud platforms (AWS, GCP, or Azure)',
      'Understanding of database systems (PostgreSQL, MongoDB, vector databases)',
      'Familiarity with containerization (Docker, Kubernetes)',
      'Strong problem-solving skills and attention to detail',
      'Bonus: Experience in EdTech or learning platforms'
    ]
  }
];

export default function CareersPage() {
  const scrollToJobs = () => {
    document.getElementById('open-roles')?.scrollIntoView({ behavior: 'smooth' });
  };

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
            Join the <span className="text-[#9F80DA]">Acadion.ai</span> Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 leading-relaxed mb-8"
          >
            Help us transform the future of learning and development with AI-powered tools
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={scrollToJobs}
            className="inline-block bg-[#9F80DA] text-white px-8 py-4 rounded-full hover:bg-[#8A6BC5] transition-colors font-medium text-lg"
          >
            View Open Roles
          </motion.button>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Working at Acadion.ai</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation First</h3>
                <p className="text-gray-600">
                  Work with cutting-edge AI technology and shape the future of learning design.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🌍</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Remote-First</h3>
                <p className="text-gray-600">
                  Work from anywhere with flexible hours and a supportive, distributed team.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📚</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Growth Mindset</h3>
                <p className="text-gray-600">
                  Continuous learning opportunities with conference attendance and skill development.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#9F80DA] to-[#7B61C0] rounded-2xl p-8 md:p-12 text-white">
              <h3 className="text-2xl font-bold mb-4">Our Culture</h3>
              <p className="text-lg mb-4 opacity-90">
                At Acadion.ai, we're more than a team—we're a community of passionate educators, designers, and technologists
                united by a common mission: to make learning design more accessible, efficient, and impactful.
              </p>
              <p className="text-lg mb-4 opacity-90">
                We value autonomy, creativity, and collaboration. Every team member has a voice in shaping our product and
                company direction. We celebrate wins together, learn from setbacks, and maintain a healthy work-life balance.
              </p>
              <p className="text-lg opacity-90">
                As a small but growing team, you'll have the opportunity to make a significant impact, wear multiple hats,
                and grow alongside the company. We offer competitive salaries, equity options, comprehensive health benefits,
                unlimited PTO, and a professional development budget.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section id="open-roles" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Open Positions</h2>
          <div className="space-y-6">
            {jobPostings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    {job.id === 'ai-engineer' && (
                      <span className="inline-block mt-2 md:mt-0 bg-[#9F80DA] text-white px-3 py-1 rounded-full text-sm font-medium">
                        3 Positions
                      </span>
                    )}
                  </div>

                  <p className="text-gray-700 mb-6">{job.description}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Responsibilities</h4>
                      <ul className="space-y-2">
                        {job.responsibilities.map((item, idx) => (
                          <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                            <span className="text-[#9F80DA] mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Qualifications</h4>
                      <ul className="space-y-2">
                        {job.qualifications.map((item, idx) => (
                          <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                            <span className="text-[#9F80DA] mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <a
                      href={`mailto:careers@acadion.ai?subject=Application for ${job.title}`}
                      className="inline-flex items-center gap-2 bg-[#9F80DA] text-white px-6 py-3 rounded-full hover:bg-[#8A6BC5] transition-colors font-medium"
                    >
                      Apply Now
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Don't See a Perfect Fit?</h2>
          <p className="text-xl text-gray-600 mb-8">
            We're always interested in meeting talented people. Send us your resume and tell us how you'd like to contribute.
          </p>
          <a
            href="mailto:careers@acadion.ai?subject=General Application"
            className="inline-block bg-[#9F80DA] text-white px-8 py-4 rounded-full hover:bg-[#8A6BC5] transition-colors font-medium text-lg"
          >
            Get in Touch
          </a>
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
