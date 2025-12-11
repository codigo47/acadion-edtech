'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Eye, FileText, UserCheck, Globe } from 'lucide-react';
import Footer from '../components/Footer';

export default function GDPRPage() {
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#9F80DA] to-[#7B61C0]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Shield className="w-16 h-16 text-white mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">GDPR Compliance</h1>
            <p className="text-xl text-white/90">
              Our commitment to protecting your privacy and data rights under the General Data Protection Regulation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="prose prose-lg max-w-none text-gray-700">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to GDPR</h2>
              <p className="mb-4">
                Acadion.ai LLC is committed to protecting the privacy and security of your personal data in accordance
                with the EU General Data Protection Regulation (GDPR). This page explains how we comply with GDPR
                requirements and what rights you have regarding your personal data.
              </p>
              <p className="mb-4">
                The GDPR provides comprehensive data protection rights to individuals in the European Economic Area (EEA).
                Even if you're not in the EEA, we apply GDPR principles to all our users worldwide as part of our
                commitment to privacy.
              </p>
            </section>

            {/* GDPR Principles */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">GDPR Principles We Follow</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <Lock className="w-8 h-8 text-[#9F80DA] mb-3" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Lawfulness & Transparency</h3>
                  <p className="text-gray-600 text-sm">
                    We process data lawfully, fairly, and transparently. We clearly communicate what data we collect
                    and how we use it.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <FileText className="w-8 h-8 text-[#9F80DA] mb-3" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Purpose Limitation</h3>
                  <p className="text-gray-600 text-sm">
                    We collect data only for specified, explicit, and legitimate purposes and don't process it in ways
                    incompatible with those purposes.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <Eye className="w-8 h-8 text-[#9F80DA] mb-3" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Data Minimization</h3>
                  <p className="text-gray-600 text-sm">
                    We collect only the data that is adequate, relevant, and necessary for our specified purposes.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <UserCheck className="w-8 h-8 text-[#9F80DA] mb-3" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Accuracy</h3>
                  <p className="text-gray-600 text-sm">
                    We ensure personal data is accurate and kept up to date, with reasonable steps taken to rectify or
                    erase inaccurate data.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <Shield className="w-8 h-8 text-[#9F80DA] mb-3" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Storage Limitation</h3>
                  <p className="text-gray-600 text-sm">
                    We retain personal data only as long as necessary for the purposes for which it was collected.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <Globe className="w-8 h-8 text-[#9F80DA] mb-3" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Integrity & Confidentiality</h3>
                  <p className="text-gray-600 text-sm">
                    We implement appropriate security measures to protect data against unauthorized or unlawful processing
                    and accidental loss.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights Under GDPR</h2>
              <p className="mb-6">
                As a data subject under GDPR, you have the following rights regarding your personal data:
              </p>

              <div className="space-y-6">
                <div className="bg-white border-l-4 border-[#9F80DA] p-6 rounded-r-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">1. Right to Be Informed</h3>
                  <p className="text-gray-700 mb-2">
                    You have the right to clear, transparent information about how we collect and use your personal data.
                  </p>
                  <p className="text-sm text-gray-600">
                    We provide this information through our <Link href="/privacy" className="text-[#9F80DA] hover:underline">Privacy Policy</Link> and
                    this GDPR compliance page.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-[#9F80DA] p-6 rounded-r-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">2. Right of Access</h3>
                  <p className="text-gray-700 mb-2">
                    You have the right to request a copy of the personal data we hold about you.
                  </p>
                  <p className="text-sm text-gray-600">
                    Submit a data access request to: <a href="mailto:gdpr@acadion.ai" className="text-[#9F80DA] hover:underline">gdpr@acadion.ai</a>
                  </p>
                </div>

                <div className="bg-white border-l-4 border-[#9F80DA] p-6 rounded-r-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">3. Right to Rectification</h3>
                  <p className="text-gray-700 mb-2">
                    You have the right to have inaccurate or incomplete personal data corrected.
                  </p>
                  <p className="text-sm text-gray-600">
                    Update your information directly in your account settings or contact us for assistance.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-[#9F80DA] p-6 rounded-r-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">4. Right to Erasure ("Right to Be Forgotten")</h3>
                  <p className="text-gray-700 mb-2">
                    You have the right to request deletion of your personal data in certain circumstances.
                  </p>
                  <p className="text-sm text-gray-600">
                    Submit a deletion request to: <a href="mailto:gdpr@acadion.ai" className="text-[#9F80DA] hover:underline">gdpr@acadion.ai</a>.
                    We will respond within 30 days.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-[#9F80DA] p-6 rounded-r-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">5. Right to Restrict Processing</h3>
                  <p className="text-gray-700 mb-2">
                    You have the right to request that we restrict how we use your personal data in certain situations.
                  </p>
                  <p className="text-sm text-gray-600">
                    This right applies when you contest data accuracy, object to processing, or when processing is unlawful.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-[#9F80DA] p-6 rounded-r-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">6. Right to Data Portability</h3>
                  <p className="text-gray-700 mb-2">
                    You have the right to receive your personal data in a structured, commonly used, machine-readable format.
                  </p>
                  <p className="text-sm text-gray-600">
                    Request data export through your account settings or by contacting <a href="mailto:gdpr@acadion.ai" className="text-[#9F80DA] hover:underline">gdpr@acadion.ai</a>
                  </p>
                </div>

                <div className="bg-white border-l-4 border-[#9F80DA] p-6 rounded-r-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">7. Right to Object</h3>
                  <p className="text-gray-700 mb-2">
                    You have the right to object to certain types of processing, including direct marketing.
                  </p>
                  <p className="text-sm text-gray-600">
                    You can opt out of marketing communications at any time using the unsubscribe link in emails or
                    through your account settings.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-[#9F80DA] p-6 rounded-r-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">8. Rights Related to Automated Decision-Making</h3>
                  <p className="text-gray-700 mb-2">
                    You have the right not to be subject to decisions based solely on automated processing that
                    significantly affects you.
                  </p>
                  <p className="text-sm text-gray-600">
                    While we use AI for content suggestions, all significant decisions require human review and input.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Legal Bases for Processing</h2>
              <p className="mb-4">
                We process your personal data based on the following legal grounds:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#9F80DA] mt-1">•</span>
                  <div>
                    <strong className="text-gray-900">Contractual Necessity:</strong>
                    <span className="text-gray-700"> Processing necessary to provide our Services under our Terms of Service</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#9F80DA] mt-1">•</span>
                  <div>
                    <strong className="text-gray-900">Consent:</strong>
                    <span className="text-gray-700"> Processing based on your explicit consent, which you can withdraw at any time</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#9F80DA] mt-1">•</span>
                  <div>
                    <strong className="text-gray-900">Legitimate Interests:</strong>
                    <span className="text-gray-700"> Processing necessary for our legitimate business interests, provided they don't override your rights</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#9F80DA] mt-1">•</span>
                  <div>
                    <strong className="text-gray-900">Legal Obligations:</strong>
                    <span className="text-gray-700"> Processing required to comply with legal obligations</span>
                  </div>
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">International Data Transfers</h2>
              <p className="mb-4">
                If you are located in the EEA, your personal data may be transferred to and processed in countries
                outside the EEA, including the United States. We ensure appropriate safeguards are in place:
              </p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li>Standard Contractual Clauses approved by the European Commission</li>
                <li>Adequacy decisions recognizing equivalent data protection</li>
                <li>Binding corporate rules for intra-group transfers</li>
                <li>Certification schemes and codes of conduct</li>
              </ul>
              <p className="mb-4">
                We continuously monitor international data transfer mechanisms to ensure compliance with evolving
                regulations and court decisions.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security Measures</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational measures to ensure data security:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#9F80DA]">✓</span>
                    <span>Encryption of data in transit (TLS/SSL) and at rest (AES-256)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9F80DA]">✓</span>
                    <span>Regular security audits and penetration testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9F80DA]">✓</span>
                    <span>Access controls and authentication (including 2FA)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9F80DA]">✓</span>
                    <span>Employee training on data protection and security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9F80DA]">✓</span>
                    <span>Incident response and data breach notification procedures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9F80DA]">✓</span>
                    <span>Regular backups and disaster recovery planning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9F80DA]">✓</span>
                    <span>Vendor security assessments and data processing agreements</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Breach Notification</h2>
              <p className="mb-4">
                In the event of a personal data breach that is likely to result in a risk to your rights and freedoms,
                we will:
              </p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li>Notify the relevant supervisory authority within 72 hours of becoming aware of the breach</li>
                <li>Notify affected individuals without undue delay if the breach is likely to result in high risk</li>
                <li>Provide clear information about the nature of the breach and steps being taken</li>
                <li>Document all data breaches, including facts, effects, and remedial actions</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Protection Officer</h2>
              <p className="mb-4">
                We have appointed a Data Protection Officer (DPO) to oversee our GDPR compliance and data protection
                strategy. You can contact our DPO regarding:
              </p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li>Questions about how we process your personal data</li>
                <li>Exercising your GDPR rights</li>
                <li>Data protection concerns or complaints</li>
                <li>Data processing agreements and vendor assessments</li>
              </ul>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2"><strong>Data Protection Officer Contact:</strong></p>
                <p className="mb-1">Email: <a href="mailto:dpo@acadion.ai" className="text-[#9F80DA] hover:underline">dpo@acadion.ai</a></p>
                <p className="mb-1">GDPR Requests: <a href="mailto:gdpr@acadion.ai" className="text-[#9F80DA] hover:underline">gdpr@acadion.ai</a></p>
                <p>Response Time: Within 30 days</p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Exercising Your Rights</h2>
              <p className="mb-4">
                To exercise any of your GDPR rights, please:
              </p>
              <ol className="list-decimal ml-6 mb-4 space-y-2">
                <li>Send an email to <a href="mailto:gdpr@acadion.ai" className="text-[#9F80DA] hover:underline">gdpr@acadion.ai</a> with your request</li>
                <li>Include sufficient information for us to verify your identity</li>
                <li>Clearly state which right(s) you wish to exercise</li>
                <li>Provide any relevant details to help us process your request</li>
              </ol>
              <p className="mb-4">
                We will respond to your request within 30 days. In complex cases, we may extend this period by an
                additional 60 days and will inform you of the extension and reasons for the delay.
              </p>
              <p className="mb-4">
                In most cases, exercising your rights is free of charge. However, we may charge a reasonable fee if
                requests are manifestly unfounded, excessive, or repetitive.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Right to Lodge a Complaint</h2>
              <p className="mb-4">
                If you believe we have not handled your personal data in accordance with GDPR, you have the right to
                lodge a complaint with your local supervisory authority (Data Protection Authority).
              </p>
              <p className="mb-4">
                You can find your data protection authority at: <a href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" target="_blank" rel="noopener noreferrer" className="text-[#9F80DA] hover:underline">European Data Protection Board - Members</a>
              </p>
              <p className="mb-4">
                However, we encourage you to contact us first so we can address your concerns directly.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Data</h2>
              <p className="mb-4">
                Our Services are not directed at children under 16 years of age. We do not knowingly collect personal
                data from children under 16. If we become aware that we have collected personal data from a child under
                16, we will take steps to delete such information.
              </p>
              <p className="mb-4">
                If you believe we have collected data from a child under 16, please contact us immediately at
                <a href="mailto:gdpr@acadion.ai" className="text-[#9F80DA] hover:underline"> gdpr@acadion.ai</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Page</h2>
              <p className="mb-4">
                We may update this GDPR compliance page to reflect changes in our practices, legal requirements, or
                GDPR guidance. We will notify you of material changes through our website or by email.
              </p>
              <p className="mb-4">
                This page was last updated: <strong>November 23, 2025</strong>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Resources</h2>
              <p className="mb-4">For more information about your privacy and data protection:</p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><Link href="/privacy" className="text-[#9F80DA] hover:underline">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="text-[#9F80DA] hover:underline">Cookie Policy</Link></li>
                <li><Link href="/terms" className="text-[#9F80DA] hover:underline">Terms of Service</Link></li>
                <li><a href="https://gdpr.eu/" target="_blank" rel="noopener noreferrer" className="text-[#9F80DA] hover:underline">Official GDPR Portal</a></li>
              </ul>
            </section>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions About Your Data?</h2>
          <p className="text-xl text-gray-600 mb-8">
            We're committed to transparency and protecting your privacy. Contact us anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:gdpr@acadion.ai"
              className="inline-block bg-[#9F80DA] text-white px-8 py-4 rounded-full hover:bg-[#8A6BC5] transition-colors font-medium"
            >
              Contact Data Protection Officer
            </a>
            <a
              href="mailto:privacy@acadion.ai"
              className="inline-block bg-white text-[#9F80DA] border-2 border-[#9F80DA] px-8 py-4 rounded-full hover:bg-[#9F80DA] hover:text-white transition-colors font-medium"
            >
              General Privacy Questions
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
