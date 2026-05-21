'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';

export default function PrivacyPolicyPage() {
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last Updated: November 23, 2025</p>

          <div className="prose prose-lg max-w-none text-gray-700">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="mb-4">
                Acadion.ai LLC ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your information when you use our platform and
                services (collectively, the "Services").
              </p>
              <p className="mb-4">
                Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that you
                have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with our
                policies and practices, please do not use our Services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">2.1 Information You Provide</h3>
              <p className="mb-4">We collect information that you voluntarily provide when you:</p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li>Create an account (name, email address, password)</li>
                <li>Update your profile (job title, organization, professional information)</li>
                <li>Create and save course content</li>
                <li>Upload files and learning assets</li>
                <li>Communicate with our support team</li>
                <li>Participate in surveys or provide feedback</li>
                <li>Subscribe to our newsletter or marketing communications</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">2.2 Automatically Collected Information</h3>
              <p className="mb-4">When you use our Services, we automatically collect:</p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li>Device information (device type, operating system, browser type)</li>
                <li>Usage data (pages visited, features used, time spent)</li>
                <li>IP address and general location information</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Log data (access times, error logs, performance metrics)</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">2.3 Content You Create</h3>
              <p className="mb-4">
                We store the learning content you create using our platform, including courses, assessments, multimedia
                files, and related materials. This content is stored securely and remains your property.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use the collected information to:</p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li>Provide, maintain, and improve our Services</li>
                <li>Process your transactions and manage your account</li>
                <li>Personalize your experience and provide tailored recommendations</li>
                <li>Communicate with you about updates, security alerts, and support matters</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Analyze usage patterns to improve our platform</li>
                <li>Detect, prevent, and address technical issues and security threats</li>
                <li>Comply with legal obligations and enforce our Terms of Service</li>
                <li>Train and improve our AI models to enhance platform functionality</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. AI and Machine Learning</h2>
              <p className="mb-4">
                Our platform uses artificial intelligence and machine learning to provide features such as content
                generation, personalized recommendations, and automated course creation assistance.
              </p>
              <p className="mb-4">
                We may use anonymized and aggregated content data to train and improve our AI models. Your specific
                course content is not used to train models that serve other users unless you explicitly opt-in to
                sharing your content for this purpose.
              </p>
              <p className="mb-4">
                AI-generated suggestions and content should always be reviewed by users for accuracy, appropriateness,
                and quality before use in production courses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Information Sharing and Disclosure</h2>
              <p className="mb-4">We do not sell your personal information. We may share your information in the following circumstances:</p>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">5.1 Service Providers</h3>
              <p className="mb-4">
                We work with third-party service providers who perform services on our behalf, such as hosting, data
                analysis, payment processing, and customer support. These providers have access only to information
                needed to perform their functions and are obligated to maintain confidentiality.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">5.2 Business Transfers</h3>
              <p className="mb-4">
                If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as
                part of that transaction. We will notify you via email and/or prominent notice on our platform of any
                such change in ownership.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">5.3 Legal Requirements</h3>
              <p className="mb-4">
                We may disclose your information if required by law, subpoena, or other legal process, or if we believe
                disclosure is necessary to protect our rights, your safety, or the safety of others.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">5.4 With Your Consent</h3>
              <p className="mb-4">
                We may share your information with third parties when you provide explicit consent to do so.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational measures to protect your information against
                unauthorized access, alteration, disclosure, or destruction:
              </p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and penetration testing</li>
                <li>Access controls and authentication measures</li>
                <li>Employee training on data protection</li>
                <li>Incident response procedures</li>
              </ul>
              <p className="mb-4">
                However, no method of transmission over the internet or electronic storage is 100% secure. While we
                strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="mb-4">
                We retain your information for as long as your account is active or as needed to provide Services. We
                will retain and use your information as necessary to comply with legal obligations, resolve disputes,
                and enforce our agreements.
              </p>
              <p className="mb-4">
                You may request deletion of your account and associated data at any time. Upon request, we will delete
                or anonymize your personal information within 30 days, except where we are required to retain it for
                legal or operational purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Your Rights and Choices</h2>
              <p className="mb-4">Depending on your location, you may have the following rights:</p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Restriction:</strong> Request restriction of processing of your information</li>
                <li><strong>Objection:</strong> Object to processing of your information</li>
                <li><strong>Withdraw Consent:</strong> Withdraw previously given consent</li>
              </ul>
              <p className="mb-4">
                To exercise these rights, please contact us at privacy@acadion.ai. We will respond to your request
                within 30 days.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cookies and Tracking Technologies</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to collect and track information and improve our Services.
                You can instruct your browser to refuse all cookies or indicate when a cookie is being sent. However,
                some features of our Services may not function properly without cookies.
              </p>
              <p className="mb-4">
                For more information about our use of cookies, please see our <Link href="/cookies" className="text-[#9F80DA] hover:underline">Cookie Policy</Link>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. International Data Transfers</h2>
              <p className="mb-4">
                Your information may be transferred to and maintained on computers located outside your state, province,
                country, or other governmental jurisdiction where data protection laws may differ. We ensure appropriate
                safeguards are in place for such transfers in accordance with applicable laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Children's Privacy</h2>
              <p className="mb-4">
                Our Services are not intended for individuals under 18 years of age. We do not knowingly collect
                personal information from children. If you become aware that a child has provided us with personal
                information, please contact us, and we will take steps to delete such information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this
                Privacy Policy periodically for any changes.
              </p>
              <p className="mb-4">
                Changes to this Privacy Policy are effective when posted. Continued use of our Services after changes
                constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="mb-4">
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2"><strong>Acadion.ai LLC</strong></p>
                <p className="mb-2">Email: privacy@acadion.ai</p>
                <p className="mb-2">Privacy Officer: privacy@acadion.ai</p>
                <p>Response Time: Within 5 business days</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Additional Information for Specific Regions</h2>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">14.1 California Residents (CCPA)</h3>
              <p className="mb-4">
                California residents have additional rights under the California Consumer Privacy Act (CCPA). For more
                information about your California privacy rights, please contact us at privacy@acadion.ai.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">14.2 European Economic Area (GDPR)</h3>
              <p className="mb-4">
                If you are in the European Economic Area, you have rights under the General Data Protection Regulation
                (GDPR). For more information, please see our <Link href="/gdpr" className="text-[#9F80DA] hover:underline">GDPR Compliance</Link> page.
              </p>
            </section>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
