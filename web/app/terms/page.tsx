'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfServicePage() {
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last Updated: November 23, 2025</p>

          <div className="prose prose-lg max-w-none text-gray-700">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="mb-4">
                These Terms of Service ("Terms") constitute a legally binding agreement between you and Acadion.ai LLC
                ("Company," "we," "us," or "our") concerning your access to and use of the Acadion.ai platform and
                related services (collectively, the "Services").
              </p>
              <p className="mb-4">
                By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these
                Terms, you may not access or use the Services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Eligibility</h2>
              <p className="mb-4">
                You must be at least 18 years old to use our Services. By using our Services, you represent and warrant
                that you meet this age requirement and have the legal capacity to enter into these Terms.
              </p>
              <p className="mb-4">
                If you are using the Services on behalf of an organization, you represent that you have the authority
                to bind that organization to these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Account Registration and Security</h2>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">3.1 Account Creation</h3>
              <p className="mb-4">
                To access certain features of our Services, you must create an account. You agree to provide accurate,
                current, and complete information during registration and to update such information to keep it accurate,
                current, and complete.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">3.2 Account Security</h3>
              <p className="mb-4">You are responsible for:</p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access or security breach</li>
                <li>Using a strong, unique password</li>
              </ul>
              <p className="mb-4">
                We are not liable for any loss or damage arising from your failure to maintain account security.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">3.3 Account Termination</h3>
              <p className="mb-4">
                We reserve the right to suspend or terminate your account if you violate these Terms or engage in
                conduct that we determine, in our sole discretion, to be inappropriate or harmful to the Services or
                other users.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Subscription Plans and Billing</h2>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">4.1 Subscription Plans</h3>
              <p className="mb-4">
                We offer various subscription plans with different features and pricing. Plan details, features, and
                pricing are described on our website and may change with notice.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">4.2 Billing</h3>
              <p className="mb-4">
                Subscription fees are billed in advance on a monthly or annual basis, depending on your chosen plan.
                You authorize us to charge your payment method for the applicable fees.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">4.3 Automatic Renewal</h3>
              <p className="mb-4">
                Subscriptions automatically renew at the end of each billing period unless you cancel before the renewal
                date. You will be charged the then-current rate for your subscription plan.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">4.4 Cancellation and Refunds</h3>
              <p className="mb-4">
                You may cancel your subscription at any time. Cancellation takes effect at the end of your current
                billing period, and you will retain access until that date. We do not provide refunds for partial months
                or years, except as required by law or at our discretion.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">4.5 Free Trials</h3>
              <p className="mb-4">
                We may offer free trial periods. If you do not cancel before the trial ends, you will be automatically
                charged for the subscription. We reserve the right to determine trial eligibility.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Use of Services</h2>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">5.1 License Grant</h3>
              <p className="mb-4">
                Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to
                access and use the Services for your internal business or personal purposes.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">5.2 Acceptable Use</h3>
              <p className="mb-4">You agree not to:</p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li>Use the Services for any illegal purpose or in violation of any laws</li>
                <li>Interfere with or disrupt the Services or servers</li>
                <li>Attempt to gain unauthorized access to any portion of the Services</li>
                <li>Use automated means to access the Services except as permitted</li>
                <li>Reverse engineer, decompile, or disassemble any aspect of the Services</li>
                <li>Remove, alter, or obscure any proprietary notices</li>
                <li>Use the Services to transmit viruses, malware, or harmful code</li>
                <li>Impersonate any person or entity or misrepresent your affiliation</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Share your account credentials with others</li>
                <li>Scrape, spider, or crawl the Services</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">5.3 Service Availability</h3>
              <p className="mb-4">
                We strive to maintain high availability of our Services but do not guarantee uninterrupted access. We
                may modify, suspend, or discontinue any part of the Services at any time with or without notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Content and Intellectual Property</h2>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">6.1 Your Content</h3>
              <p className="mb-4">
                You retain all ownership rights to the content you create, upload, or store using our Services ("Your
                Content"). By using our Services, you grant us a limited license to host, store, and process Your Content
                solely to provide and improve the Services.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">6.2 Content Responsibility</h3>
              <p className="mb-4">You are solely responsible for Your Content and represent that:</p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li>You own or have the necessary rights to Your Content</li>
                <li>Your Content does not violate any laws or third-party rights</li>
                <li>Your Content does not contain malicious code or harmful materials</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">6.3 AI-Generated Content</h3>
              <p className="mb-4">
                Our Services use AI to assist in content generation. AI-generated content suggestions are provided as-is.
                You are responsible for reviewing, editing, and ensuring the accuracy and appropriateness of all content
                before use, including AI-generated content.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">6.4 Our Intellectual Property</h3>
              <p className="mb-4">
                The Services, including all software, text, images, trademarks, service marks, and other content provided
                by us (excluding Your Content), are owned by Acadion.ai LLC and protected by intellectual property laws.
                You may not use our trademarks or copyrighted materials without our prior written consent.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">6.5 Feedback</h3>
              <p className="mb-4">
                If you provide feedback, suggestions, or ideas about our Services, you grant us a perpetual, worldwide,
                royalty-free license to use such feedback without compensation or attribution.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacy and Data Protection</h2>
              <p className="mb-4">
                Your use of the Services is also governed by our <Link href="/privacy" className="text-[#9F80DA] hover:underline">Privacy Policy</Link>, which
                is incorporated into these Terms by reference. Please review our Privacy Policy to understand our data
                practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Third-Party Services</h2>
              <p className="mb-4">
                Our Services may integrate with or link to third-party services, websites, or applications. We are not
                responsible for the content, policies, or practices of third-party services. Your use of third-party
                services is at your own risk and subject to their terms and conditions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Disclaimers and Limitations of Liability</h2>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">9.1 Disclaimers</h3>
              <p className="mb-4">
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                OR NON-INFRINGEMENT.
              </p>
              <p className="mb-4">
                We do not warrant that the Services will be uninterrupted, error-free, or secure, or that defects will
                be corrected. We do not warrant the accuracy, completeness, or reliability of any content or AI-generated
                suggestions.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">9.2 Limitation of Liability</h3>
              <p className="mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, ACADION.AI LLC AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND
                AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
                OR ANY LOSS OF PROFITS, REVENUE, DATA, OR USE, ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICES.
              </p>
              <p className="mb-4">
                OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICES SHALL NOT
                EXCEED THE AMOUNTS YOU HAVE PAID US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Indemnification</h2>
              <p className="mb-4">
                You agree to indemnify, defend, and hold harmless Acadion.ai LLC and its officers, directors, employees,
                and agents from any claims, liabilities, damages, losses, and expenses (including attorneys' fees)
                arising out of or related to:
              </p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li>Your use of the Services</li>
                <li>Your violation of these Terms</li>
                <li>Your Content</li>
                <li>Your violation of any third-party rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Dispute Resolution</h2>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">11.1 Informal Resolution</h3>
              <p className="mb-4">
                Before filing a claim, you agree to contact us at legal@acadion.ai to attempt to resolve the dispute
                informally. We will attempt to resolve disputes in good faith.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">11.2 Arbitration</h3>
              <p className="mb-4">
                Any dispute that cannot be resolved informally shall be resolved through binding arbitration in accordance
                with the American Arbitration Association's Commercial Arbitration Rules. The arbitration shall be
                conducted in English in the United States.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">11.3 Class Action Waiver</h3>
              <p className="mb-4">
                You agree that disputes must be brought on an individual basis and not as part of any class or
                representative action. There shall be no right or authority for any disputes to be arbitrated or litigated
                on a class-action basis.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the United States and the
                state in which Acadion.ai LLC is registered, without regard to conflict of law principles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these Terms at any time. We will notify you of material changes by
                posting the updated Terms on our website and updating the "Last Updated" date. Your continued use of
                the Services after changes become effective constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. General Provisions</h2>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">14.1 Entire Agreement</h3>
              <p className="mb-4">
                These Terms, together with our Privacy Policy and any other policies referenced herein, constitute the
                entire agreement between you and Acadion.ai LLC regarding the Services.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">14.2 Severability</h3>
              <p className="mb-4">
                If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in
                full force and effect.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">14.3 Waiver</h3>
              <p className="mb-4">
                Our failure to enforce any provision of these Terms shall not constitute a waiver of that provision or
                any other provision.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">14.4 Assignment</h3>
              <p className="mb-4">
                You may not assign or transfer these Terms or your rights under these Terms without our prior written
                consent. We may assign these Terms without restriction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact Information</h2>
              <p className="mb-4">
                If you have questions about these Terms, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2"><strong>Acadion.ai LLC</strong></p>
                <p className="mb-2">Email: legal@acadion.ai</p>
                <p className="mb-2">Support: support@acadion.ai</p>
                <p>Response Time: Within 5 business days</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>

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
