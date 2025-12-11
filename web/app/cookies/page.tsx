'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';

export default function CookiePolicyPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-gray-600 mb-8">Last Updated: November 23, 2025</p>

          <div className="prose prose-lg max-w-none text-gray-700">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="mb-4">
                This Cookie Policy explains how Acadion.ai LLC ("we," "us," or "our") uses cookies and similar tracking
                technologies when you visit our website and use our platform (collectively, the "Services").
              </p>
              <p className="mb-4">
                This policy provides detailed information about the types of cookies we use, why we use them, and how
                you can control them.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. What Are Cookies?</h2>
              <p className="mb-4">
                Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you
                visit a website. Cookies are widely used to make websites work more efficiently and provide information
                to website owners.
              </p>
              <p className="mb-4">
                Cookies can be "persistent" (remain on your device until deleted or expired) or "session" (deleted when
                you close your browser). They can also be "first-party" (set by us) or "third-party" (set by other
                domains).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Why We Use Cookies</h2>
              <p className="mb-4">We use cookies for several purposes:</p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Essential functionality:</strong> To enable core platform features and secure your account</li>
                <li><strong>Performance and analytics:</strong> To understand how users interact with our Services</li>
                <li><strong>Personalization:</strong> To remember your preferences and customize your experience</li>
                <li><strong>Security:</strong> To detect and prevent fraud and abuse</li>
                <li><strong>Marketing:</strong> To deliver relevant advertising and measure campaign effectiveness</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Types of Cookies We Use</h2>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">4.1 Strictly Necessary Cookies</h3>
              <p className="mb-4">
                These cookies are essential for the Services to function properly. They enable core functionality such
                as security, authentication, and account access. Without these cookies, certain services cannot be provided.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="font-semibold mb-2">Examples:</p>
                <ul className="list-disc ml-6 space-y-1 text-sm">
                  <li><strong>session_id:</strong> Maintains your login session (Session cookie)</li>
                  <li><strong>csrf_token:</strong> Protects against cross-site request forgery attacks (Session cookie)</li>
                  <li><strong>cookie_consent:</strong> Remembers your cookie preferences (1 year)</li>
                </ul>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">4.2 Performance and Analytics Cookies</h3>
              <p className="mb-4">
                These cookies collect information about how you use our Services, such as which pages you visit most
                often and whether you receive error messages. This helps us improve our platform's performance and
                user experience.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="font-semibold mb-2">Examples:</p>
                <ul className="list-disc ml-6 space-y-1 text-sm">
                  <li><strong>analytics_user:</strong> Tracks anonymous usage statistics (2 years)</li>
                  <li><strong>performance_metrics:</strong> Monitors platform performance (30 days)</li>
                </ul>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">4.3 Functionality Cookies</h3>
              <p className="mb-4">
                These cookies allow us to remember choices you make (such as language preference, region, or customization
                settings) and provide enhanced, personalized features.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="font-semibold mb-2">Examples:</p>
                <ul className="list-disc ml-6 space-y-1 text-sm">
                  <li><strong>user_preferences:</strong> Stores your UI preferences and settings (1 year)</li>
                  <li><strong>theme_mode:</strong> Remembers your theme selection (light/dark mode) (1 year)</li>
                  <li><strong>recent_projects:</strong> Tracks your recently accessed projects (30 days)</li>
                </ul>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">4.4 Targeting and Advertising Cookies</h3>
              <p className="mb-4">
                These cookies track your browsing habits to deliver advertisements that are relevant to you and your
                interests. They also measure the effectiveness of advertising campaigns.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="font-semibold mb-2">Examples:</p>
                <ul className="list-disc ml-6 space-y-1 text-sm">
                  <li><strong>_fbp:</strong> Facebook Pixel for tracking conversions (3 months)</li>
                  <li><strong>IDE, DSID:</strong> Google advertising cookies (1-2 years)</li>
                  <li><strong>linkedin_insight:</strong> LinkedIn conversion tracking (180 days)</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Third-Party Cookies</h2>
              <p className="mb-4">
                We use services from third-party companies that may set their own cookies when you use our Services.
                We do not control these third-party cookies.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Third-party services we use include:</h3>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>PostHog:</strong> Product analytics and user behavior tracking</li>
                <li><strong>Stripe:</strong> Payment processing (fraud prevention)</li>
                <li><strong>Intercom:</strong> Customer support and communication</li>
                <li><strong>Facebook Pixel:</strong> Advertising and conversion tracking</li>
                <li><strong>LinkedIn Insight Tag:</strong> Professional network advertising</li>
              </ul>

              <p className="mb-4">
                For more information about how these third parties use cookies, please refer to their privacy policies:
              </p>
              <ul className="list-disc ml-6 mb-4 space-y-1 text-sm">
                <li><a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#9F80DA] hover:underline">PostHog Privacy Policy</a></li>
                <li><a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#9F80DA] hover:underline">Stripe Privacy Policy</a></li>
                <li><a href="https://www.intercom.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-[#9F80DA] hover:underline">Intercom Privacy Policy</a></li>
                <li><a href="https://www.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer" className="text-[#9F80DA] hover:underline">Facebook Privacy Policy</a></li>
                <li><a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#9F80DA] hover:underline">LinkedIn Privacy Policy</a></li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. How to Control Cookies</h2>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">6.1 Cookie Preference Center</h3>
              <p className="mb-4">
                When you first visit our website, you'll see a cookie consent banner where you can accept or customize
                your cookie preferences. You can change your preferences at any time by accessing our Cookie Preference
                Center at the bottom of any page.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">6.2 Browser Settings</h3>
              <p className="mb-4">
                Most web browsers allow you to control cookies through their settings. You can set your browser to:
              </p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li>Block all cookies</li>
                <li>Block third-party cookies only</li>
                <li>Delete cookies when you close your browser</li>
                <li>Receive notifications when cookies are being set</li>
              </ul>

              <p className="mb-4">Learn how to manage cookies in popular browsers:</p>
              <ul className="list-disc ml-6 mb-4 space-y-1 text-sm">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#9F80DA] hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-[#9F80DA] hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#9F80DA] hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-[#9F80DA] hover:underline">Microsoft Edge</a></li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">6.3 Opt-Out Tools</h3>
              <p className="mb-4">You can opt out of certain advertising cookies through:</p>
              <ul className="list-disc ml-6 mb-4 space-y-1">
                <li><a href="http://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-[#9F80DA] hover:underline">Network Advertising Initiative Opt-Out</a></li>
                <li><a href="http://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-[#9F80DA] hover:underline">Digital Advertising Alliance Opt-Out</a></li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">6.4 Mobile Devices</h3>
              <p className="mb-4">
                On mobile devices, you can adjust your privacy settings in your device's settings menu to limit ad
                tracking and control app permissions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Impact of Disabling Cookies</h2>
              <p className="mb-4">
                If you disable cookies, some features of our Services may not function properly:
              </p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li>You may need to log in more frequently</li>
                <li>Your preferences and customizations may not be saved</li>
                <li>Some features may be unavailable or work improperly</li>
                <li>We may not be able to remember your cookie preferences</li>
              </ul>
              <p className="mb-4">
                <strong>Note:</strong> Strictly necessary cookies cannot be disabled as they are essential for the
                Services to function.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Do Not Track (DNT) Signals</h2>
              <p className="mb-4">
                Some browsers have a "Do Not Track" feature that signals to websites you visit that you do not want to
                have your online activity tracked. Currently, there is no industry standard for how to respond to DNT
                signals, and we do not respond to DNT browser signals at this time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Other Tracking Technologies</h2>
              <p className="mb-4">
                In addition to cookies, we may use other tracking technologies:
              </p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Web Beacons (Pixels):</strong> Small graphics embedded in emails and web pages to track user activity</li>
                <li><strong>Local Storage:</strong> Browser storage that allows websites to store data locally on your device</li>
                <li><strong>Session Storage:</strong> Temporary storage that is deleted when you close your browser</li>
                <li><strong>Mobile SDKs:</strong> Code integrated into mobile apps to collect analytics and enable features</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Updates to This Policy</h2>
              <p className="mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for legal,
                operational, or regulatory reasons. We will notify you of any material changes by posting the updated
                policy on our website and updating the "Last Updated" date.
              </p>
              <p className="mb-4">
                We encourage you to review this Cookie Policy periodically to stay informed about how we use cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="mb-4">
                If you have questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2"><strong>Acadion.ai LLC</strong></p>
                <p className="mb-2">Email: privacy@acadion.ai</p>
                <p className="mb-2">Cookie Questions: cookies@acadion.ai</p>
                <p>Response Time: Within 5 business days</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Related Policies</h2>
              <p className="mb-4">
                For more information about how we handle your personal information, please review:
              </p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><Link href="/privacy" className="text-[#9F80DA] hover:underline">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-[#9F80DA] hover:underline">Terms of Service</Link></li>
                <li><Link href="/gdpr" className="text-[#9F80DA] hover:underline">GDPR Compliance</Link></li>
              </ul>
            </section>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
