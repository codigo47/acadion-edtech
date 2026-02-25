import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "./components/providers/posthog-provider";
import { QueryProvider } from "./components/providers/query-provider";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "acadion.ai - Create educational content in the AI era",
  description: "Forget all the manual tasks of instructional design and focus on creating better courses. acadion.ai is a platform that helps you create educational content in the AI era.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${onest.variable} antialiased`}
      >
        <div
          id="auth-guard"
          style={{ display: 'none', position: 'fixed', inset: 0, zIndex: 9999, background: '#fff', justifyContent: 'center', alignItems: 'center' }}
        >
          <p style={{ color: '#555', fontSize: '18px', fontWeight: 500 }}>Authenticating...</p>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var p = window.location.pathname;
                var isProtected = p.startsWith('/dashboard') || p.startsWith('/lms') || p.startsWith('/project');
                if (isProtected && !localStorage.getItem('token')) {
                  document.getElementById('auth-guard').style.display = 'flex';
                  window.location.replace('/login');
                }
              })();
            `,
          }}
        />
        <QueryProvider>
          <PostHogProvider>
            {children}
          </PostHogProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
