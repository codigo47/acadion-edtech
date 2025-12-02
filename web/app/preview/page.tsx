'use client';

import React from 'react';
import ParagraphBlock from '../components/blocks/ParagraphBlock';
import HeadingBlock from '../components/blocks/HeadingBlock';
import TableBlock from '../components/blocks/TableBlock';
import HighlightBlock from '../components/blocks/HighlightBlock';
import ListBlock from '../components/blocks/ListBlock';
import ImageBlock from '../components/blocks/ImageBlock';
import GalleryBlock from '../components/blocks/GalleryBlock';
import GraphBlock from '../components/blocks/GraphBlock';
import TimelineBlock from '../components/blocks/TimelineBlock';
import SeparatorBlock from '../components/blocks/SeparatorBlock';
import ComparisonBlock from '../components/blocks/ComparisonBlock';
import ChatBlock from '../components/blocks/ChatBlock';
import QuoteBlock from '../components/blocks/QuoteBlock';
import TestimonialBlock from '../components/blocks/TestimonialBlock';
import CheckboxBlock from '../components/blocks/CheckboxBlock';
import CarouselBlock from '../components/blocks/CarouselBlock';
import AccordionBlock from '../components/blocks/AccordionBlock';
import TabsBlock from '../components/blocks/TabsBlock';
import LabeledImageBlock from '../components/blocks/LabeledImageBlock';
import ScenarioBlock from '../components/blocks/ScenarioBlock';
import SortingBlock from '../components/blocks/SortingBlock';
import FlashCardBlock from '../components/blocks/FlashCardBlock';
import MultipleChoiceBlock from '../components/blocks/MultipleChoiceBlock';
import MultipleResponseBlock from '../components/blocks/MultipleResponseBlock';
import FillInTheBlankBlock from '../components/blocks/FillInTheBlankBlock';
import MatchingPairsBlock from '../components/blocks/MatchingPairsBlock';
import ButtonBlock from '../components/blocks/ButtonBlock';

const sampleImage = '/sample.jpeg';

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Block Components Preview</h1>
        <p className="text-gray-600 text-center mb-12">
          A comprehensive showcase of all available block components
        </p>

        {/* Static Blocks Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-primary">
            Static Blocks
          </h2>

          {/* Heading Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">HeadingBlock</h3>
            <HeadingBlock
              heading="Welcome to Our Learning Platform"
              level={1}
              textStyle={{ color: '#1a1a1a' }}
            />
            <HeadingBlock
              heading="Chapter 1: Introduction"
              level={2}
              textStyle={{ color: '#374151' }}
            />
            <HeadingBlock
              heading="Section 1.1: Getting Started"
              level={3}
              textStyle={{ color: '#6B7280' }}
            />
          </div>

          {/* Paragraph Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">ParagraphBlock</h3>
            <ParagraphBlock
              heading="About E-Learning"
              content="E-learning has revolutionized the way we acquire knowledge and skills. With the advent of digital technology, learners can now access high-quality educational content from anywhere in the world. This flexibility has made education more accessible and convenient than ever before. Whether you're looking to advance your career, learn a new hobby, or simply expand your horizons, e-learning offers endless possibilities for growth and development."
              columns={2}
              headingStyle={{ color: '#9F80DA', fontWeight: '700' }}
              contentStyle={{ lineHeight: '1.8' }}
            />
          </div>

          {/* Table Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">TableBlock</h3>
            <TableBlock
              rows={5}
              columns={4}
              content={[
                ['Course', 'Duration', 'Level', 'Rating'],
                ['React Fundamentals', '8 hours', 'Beginner', '4.8/5'],
                ['Advanced TypeScript', '12 hours', 'Advanced', '4.9/5'],
                ['Node.js Backend', '10 hours', 'Intermediate', '4.7/5'],
                ['Python for Data Science', '15 hours', 'Intermediate', '4.6/5'],
              ]}
              textStyle={{ fontSize: '14px' }}
            />
          </div>

          {/* Highlight Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">HighlightBlock</h3>
            <HighlightBlock
              highlight="Important: Always save your progress before closing the course module."
              blockStyle="A"
            />
            <HighlightBlock
              highlight="Note: This course includes hands-on projects and real-world examples."
              blockStyle="B"
            />
            <HighlightBlock
              highlight="Tip: Take breaks every 25 minutes to maximize your learning efficiency."
              blockStyle="C"
            />
          </div>

          {/* List Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">ListBlock</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="font-medium mb-2">Unordered List:</p>
                <ListBlock
                  items={[
                    'Interactive video lessons',
                    'Downloadable resources',
                    'Community discussion forums',
                    'Certificate upon completion',
                  ]}
                  ordered={false}
                />
              </div>
              <div>
                <p className="font-medium mb-2">Ordered List:</p>
                <ListBlock
                  items={[
                    'Create your account',
                    'Browse available courses',
                    'Enroll in your chosen course',
                    'Start learning!',
                  ]}
                  ordered={true}
                />
              </div>
            </div>
          </div>

          {/* Image Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">ImageBlock</h3>
            <div className="space-y-6">
              <ImageBlock
                image={sampleImage}
                text="Image with text on the right side - perfect for feature highlights"
                layout="image-left"
                textStyle={{ fontSize: '16px', lineHeight: '1.6' }}
                textBackgroundStyle={{ backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '8px' }}
              />
              <ImageBlock
                image={sampleImage}
                text="Stretched image with overlay text"
                layout="stretched"
              />
            </div>
          </div>

          {/* Gallery Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">GalleryBlock</h3>
            <GalleryBlock
              images={[
                { src: sampleImage, alt: 'Gallery Image 1' },
                { src: sampleImage, alt: 'Gallery Image 2' },
                { src: sampleImage, alt: 'Gallery Image 3' },
                { src: sampleImage, alt: 'Gallery Image 4' },
              ]}
            />
          </div>

          {/* Graph Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">GraphBlock</h3>
            <div className="grid grid-cols-2 gap-6">
              <GraphBlock
                graphType="line"
                title="Monthly Progress"
                data={[
                  { name: 'Jan', value: 65 },
                  { name: 'Feb', value: 72 },
                  { name: 'Mar', value: 78 },
                  { name: 'Apr', value: 85 },
                  { name: 'May', value: 90 },
                ]}
              />
              <GraphBlock
                graphType="bar"
                title="Course Completion Rates"
                data={[
                  { name: 'React', value: 85 },
                  { name: 'Python', value: 78 },
                  { name: 'Node.js', value: 92 },
                  { name: 'SQL', value: 70 },
                ]}
              />
              <GraphBlock
                graphType="pie"
                title="Student Demographics"
                data={[
                  { name: 'Americas', value: 35 },
                  { name: 'Europe', value: 30 },
                  { name: 'Asia', value: 25 },
                  { name: 'Other', value: 10 },
                ]}
              />
              <GraphBlock
                graphType="donut"
                title="Learning Preferences"
                data={[
                  { name: 'Video', value: 45 },
                  { name: 'Reading', value: 25 },
                  { name: 'Practice', value: 30 },
                ]}
              />
            </div>
          </div>

          {/* Timeline Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">TimelineBlock</h3>
            <TimelineBlock
              events={[
                {
                  title: 'Course Launch',
                  description: 'We launched our first online course with over 100 students enrolled.',
                  date: 'January 2023',
                },
                {
                  title: 'Mobile App Release',
                  description: 'Our mobile app became available on iOS and Android platforms.',
                  date: 'April 2023',
                },
                {
                  title: 'Community Milestone',
                  description: 'Reached 10,000 active learners in our community.',
                  date: 'August 2023',
                },
                {
                  title: 'Enterprise Solution',
                  description: 'Launched enterprise training solutions for corporate clients.',
                  date: 'December 2023',
                },
              ]}
            />
          </div>

          {/* Separator Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">SeparatorBlock</h3>
            <p className="text-sm text-gray-500 mb-2">Line only:</p>
            <SeparatorBlock height={40} color="gray" showLine={true} showNumber={false} />
            <p className="text-sm text-gray-500 mb-2">Number only:</p>
            <SeparatorBlock height={60} color="blue" showLine={false} showNumber={true} number={1} />
            <p className="text-sm text-gray-500 mb-2">Line with number:</p>
            <SeparatorBlock height={60} color="green" showLine={true} showNumber={true} number={2} />
            <p className="text-sm text-gray-500 mb-2">Space only:</p>
            <SeparatorBlock height={40} showLine={false} showNumber={false} />
          </div>

          {/* Comparison Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">ComparisonBlock</h3>
            <ComparisonBlock
              items={[
                { title: 'Basic Plan', content: 'Access to 10 courses, Email support, Basic certificate' },
                { title: 'Pro Plan', content: 'Access to 50 courses, Priority support, Verified certificate' },
                { title: 'Enterprise', content: 'Unlimited courses, Dedicated support, Custom branding' },
              ]}
              blockStyle="A"
            />
          </div>

          {/* Chat Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">ChatBlock</h3>
            <ChatBlock
              messages={[
                { participantId: 'receiver', text: 'Hi! How can I help you today?', time: '10:00 AM' },
                { participantId: 'sender', text: 'I have a question about the React course.', time: '10:01 AM' },
                { participantId: 'receiver', text: 'Sure! What would you like to know?', time: '10:02 AM' },
                { participantId: 'sender', text: 'Is prior JavaScript knowledge required?', time: '10:03 AM' },
                { participantId: 'receiver', text: 'Yes, basic JavaScript knowledge is recommended before starting the React course.', time: '10:04 AM' },
              ]}
              sender={{ name: 'Student', avatar: sampleImage }}
              receiver={{ name: 'Support', avatar: sampleImage }}
              senderBubbleColor="#9F80DA"
              receiverBubbleColor="#E5E7EB"
            />
          </div>

          {/* Quote Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">QuoteBlock</h3>
            <QuoteBlock
              quotes={[
                {
                  content: 'Education is the most powerful weapon which you can use to change the world.',
                  author: 'Nelson Mandela',
                  avatar: sampleImage,
                },
                {
                  content: 'The beautiful thing about learning is that no one can take it away from you.',
                  author: 'B.B. King',
                },
                {
                  content: 'Live as if you were to die tomorrow. Learn as if you were to live forever.',
                  author: 'Mahatma Gandhi',
                },
              ]}
            />
          </div>

          {/* Testimonial Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">TestimonialBlock</h3>
            <TestimonialBlock
              testimonials={[
                {
                  title: 'Life Changing Experience',
                  content: 'This platform completely changed my career trajectory. The courses are well-structured and the instructors are amazing!',
                  name: 'Sarah Johnson',
                  role: 'Software Developer',
                  avatar: sampleImage,
                },
                {
                  title: 'Highly Recommended',
                  content: 'I learned more in 3 months here than in 2 years of self-study. The community support is incredible.',
                  name: 'Michael Chen',
                  role: 'Data Analyst',
                  avatar: sampleImage,
                },
                {
                  title: 'Worth Every Penny',
                  content: 'The quality of content and the practical projects helped me land my dream job. Thank you!',
                  name: 'Emily Davis',
                  role: 'UX Designer',
                  avatar: sampleImage,
                },
              ]}
            />
          </div>
        </section>

        {/* Interactive Blocks Section */}
        <section>
          <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-primary">
            Interactive Blocks
          </h2>

          {/* Checkbox Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">CheckboxBlock</h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">Style A:</p>
                <CheckboxBlock
                  items={[
                    { id: '1', text: 'Complete introduction video', checked: true },
                    { id: '2', text: 'Read chapter 1 notes', checked: false },
                    { id: '3', text: 'Submit first assignment', checked: false },
                  ]}
                  blockStyle="A"
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Style B:</p>
                <CheckboxBlock
                  items={[
                    { id: '4', text: 'Watch tutorial video', checked: true },
                    { id: '5', text: 'Practice exercises', checked: false },
                    { id: '6', text: 'Take the quiz', checked: false },
                  ]}
                  blockStyle="B"
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Style C:</p>
                <CheckboxBlock
                  items={[
                    { id: '7', text: 'Review materials', checked: false },
                    { id: '8', text: 'Join study group', checked: false },
                    { id: '9', text: 'Complete project', checked: false },
                  ]}
                  blockStyle="C"
                />
              </div>
            </div>
          </div>

          {/* Carousel Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">CarouselBlock</h3>
            <CarouselBlock
              images={[
                { src: sampleImage, alt: 'Slide 1', caption: 'Modern Learning Environment' },
                { src: sampleImage, alt: 'Slide 2', caption: 'Interactive Course Content' },
                { src: sampleImage, alt: 'Slide 3', caption: 'Certificate of Completion' },
              ]}
            />
          </div>

          {/* Accordion Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">AccordionBlock</h3>
            <AccordionBlock
              items={[
                {
                  id: 'faq1',
                  title: 'How do I enroll in a course?',
                  content: 'Simply browse our course catalog, select the course you\'re interested in, and click the "Enroll Now" button. You\'ll be guided through the payment process if required.',
                },
                {
                  id: 'faq2',
                  title: 'Can I get a refund?',
                  content: 'Yes! We offer a 30-day money-back guarantee. If you\'re not satisfied with your course, contact our support team within 30 days of purchase for a full refund.',
                },
                {
                  id: 'faq3',
                  title: 'Are certificates included?',
                  content: 'Yes, upon completion of any course, you\'ll receive a digital certificate that you can share on LinkedIn or add to your resume.',
                },
              ]}
              blockStyle="A"
            />
          </div>

          {/* Tabs Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">TabsBlock</h3>
            <TabsBlock
              items={[
                {
                  id: 'overview',
                  title: 'Overview',
                  content: 'This comprehensive course covers all the fundamentals of web development, from HTML and CSS to JavaScript and React. Perfect for beginners who want to start their coding journey.',
                  image: sampleImage,
                },
                {
                  id: 'curriculum',
                  title: 'Curriculum',
                  content: 'The course is divided into 12 modules, each focusing on a specific topic. You\'ll learn through video lectures, hands-on projects, and interactive quizzes.',
                },
                {
                  id: 'instructor',
                  title: 'Instructor',
                  content: 'John Smith is a senior software engineer with over 15 years of experience. He has taught over 100,000 students worldwide and is passionate about making coding accessible to everyone.',
                  image: sampleImage,
                },
              ]}
            />
          </div>

          {/* Labeled Image Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">LabeledImageBlock</h3>
            <LabeledImageBlock
              image={sampleImage}
              items={[
                { id: '1', title: 'Header Section', content: 'The main navigation and branding area of the application.', x: 20, y: 15 },
                { id: '2', title: 'Content Area', content: 'The primary content display region where course materials are shown.', x: 50, y: 50 },
                { id: '3', title: 'Sidebar', content: 'Quick access to course modules and progress tracking.', x: 85, y: 40 },
                { id: '4', title: 'Footer', content: 'Links to support, policies, and social media.', x: 50, y: 85 },
              ]}
            />
          </div>

          {/* Scenario Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">ScenarioBlock</h3>
            <ScenarioBlock
              image={sampleImage}
              question="A customer is complaining about a delayed shipment. What's the best response?"
              answers={[
                { id: 'a', text: 'Tell them to wait patiently', order: 1, isCorrect: false },
                { id: 'b', text: 'Apologize and offer a tracking update with compensation', order: 2, isCorrect: true },
                { id: 'c', text: 'Blame the shipping company', order: 3, isCorrect: false },
                { id: 'd', text: 'Ignore the complaint', order: 4, isCorrect: false },
              ]}
            />
          </div>

          {/* Sorting Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">SortingBlock</h3>
            <p className="text-gray-600 mb-4">Arrange the software development lifecycle phases in the correct order:</p>
            <SortingBlock
              items={[
                { id: '1', title: 'Testing', content: 'Verify the software works correctly', correctOrder: 4 },
                { id: '2', title: 'Requirements', content: 'Gather and document needs', correctOrder: 1 },
                { id: '3', title: 'Deployment', content: 'Release to production', correctOrder: 5 },
                { id: '4', title: 'Design', content: 'Plan the architecture', correctOrder: 2 },
                { id: '5', title: 'Implementation', content: 'Write the code', correctOrder: 3 },
              ]}
            />
          </div>

          {/* Flash Card Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">FlashCardBlock</h3>
            <FlashCardBlock
              items={[
                { id: '1', question: 'What does HTML stand for?', answer: 'HyperText Markup Language' },
                { id: '2', question: 'What is CSS used for?', answer: 'Styling and layout of web pages' },
                { id: '3', question: 'What is JavaScript?', answer: 'A programming language for web interactivity' },
                { id: '4', question: 'What is React?', answer: 'A JavaScript library for building user interfaces' },
              ]}
            />
          </div>

          {/* Multiple Choice Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">MultipleChoiceBlock</h3>
            <MultipleChoiceBlock
              question="Which of the following is NOT a JavaScript data type?"
              items={[
                { id: 'a', text: 'String', isCorrect: false },
                { id: 'b', text: 'Boolean', isCorrect: false },
                { id: 'c', text: 'Float', isCorrect: true },
                { id: 'd', text: 'Number', isCorrect: false },
              ]}
            />
          </div>

          {/* Multiple Response Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">MultipleResponseBlock</h3>
            <MultipleResponseBlock
              question="Which of the following are valid React hooks?"
              items={[
                { id: 'a', text: 'useState', isCorrect: true },
                { id: 'b', text: 'useEffect', isCorrect: true },
                { id: 'c', text: 'useRender', isCorrect: false },
                { id: 'd', text: 'useCallback', isCorrect: true },
                { id: 'e', text: 'useHTML', isCorrect: false },
              ]}
            />
          </div>

          {/* Fill in the Blank Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">FillInTheBlankBlock</h3>
            <FillInTheBlankBlock
              items={[
                { id: '1', text: 'In React, we use ___ to manage component state.', answer: 'useState' },
                { id: '2', text: 'The ___ hook is used for side effects in React.', answer: 'useEffect' },
                { id: '3', text: 'CSS stands for Cascading Style ___.', answer: 'Sheets' },
              ]}
            />
          </div>

          {/* Matching Pairs Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">MatchingPairsBlock</h3>
            <p className="text-gray-600 mb-4">Match the programming concept with its definition:</p>
            <MatchingPairsBlock
              itemsA={[
                { id: 'a1', text: 'Variable', matchingNumber: 1 },
                { id: 'a2', text: 'Function', matchingNumber: 2 },
                { id: 'a3', text: 'Loop', matchingNumber: 3 },
                { id: 'a4', text: 'Array', matchingNumber: 4 },
              ]}
              itemsB={[
                { id: 'b1', text: 'Stores multiple values', matchingNumber: 4 },
                { id: 'b2', text: 'Repeats code execution', matchingNumber: 3 },
                { id: 'b3', text: 'Reusable block of code', matchingNumber: 2 },
                { id: 'b4', text: 'Container for data', matchingNumber: 1 },
              ]}
            />
          </div>

          {/* Button Block */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">ButtonBlock</h3>
            <ButtonBlock
              items={[
                {
                  id: '1',
                  text: 'Get Started',
                  url: '#',
                  style: 'primary',
                  size: 'large',
                  icon: 'ArrowRight',
                  iconPosition: 'right',
                  label: 'Ready to begin?',
                  layout: 'button-right',
                },
                {
                  id: '2',
                  text: 'Learn More',
                  url: '#',
                  style: 'secondary',
                  size: 'medium',
                  icon: 'BookOpen',
                  iconPosition: 'left',
                },
                {
                  id: '3',
                  text: 'Contact Us',
                  url: '#',
                  style: 'tertiary',
                  size: 'small',
                  icon: 'Mail',
                  iconPosition: 'left',
                  label: 'Have questions?',
                  layout: 'button-left',
                },
              ]}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
