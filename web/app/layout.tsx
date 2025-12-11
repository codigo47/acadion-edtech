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
        <QueryProvider>
          <PostHogProvider>
            {children}
          </PostHogProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
