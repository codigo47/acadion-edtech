'use client';

import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
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
  const [dark, setDark] = useState(false);

  return (
    <div className={`min-h-screen py-12 transition-colors ${dark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-5xl mx-auto px-4">

        {/* Theme Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDark(!dark)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              dark
                ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>

        <HeadingBlock heading="Block Components Preview" level={1} textStyle={{ textAlign: 'center' }} dark={dark} />
        <ParagraphBlock content="A comprehensive showcase of all available block components" contentStyle={{ textAlign: 'center', color: dark ? '#9ca3af' : '#6B7280' }} dark={dark} />

        <SeparatorBlock height={60} color="gray" showLine={true} showNumber={true} number={1} dark={dark} />

        {/* HeadingBlock */}
        <HeadingBlock heading="HeadingBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <HeadingBlock heading="Welcome to Our Learning Platform" level={1} textStyle={{ color: dark ? '#ffffff' : '#1a1a1a' }} dark={dark} />
        <HeadingBlock heading="Chapter 1: Introduction" level={2} textStyle={{ color: dark ? '#d1d5db' : '#374151' }} dark={dark} />
        <HeadingBlock heading="Section 1.1: Getting Started" level={3} textStyle={{ color: dark ? '#9ca3af' : '#6B7280' }} dark={dark} />

        <SeparatorBlock height={60} color="blue" showLine={true} showNumber={true} number={2} dark={dark} />

        {/* ParagraphBlock */}
        <HeadingBlock heading="ParagraphBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <ParagraphBlock
          heading="About E-Learning"
          content="E-learning has revolutionized the way we acquire knowledge and skills. With the advent of digital technology, learners can now access high-quality educational content from anywhere in the world. This flexibility has made education more accessible and convenient than ever before. Whether you're looking to advance your career, learn a new hobby, or simply expand your horizons, e-learning offers endless possibilities for growth and development."
          columns={2}
          headingStyle={{ color: '#9F80DA', fontWeight: '700' }}
          contentStyle={{ lineHeight: '1.8' }}
          dark={dark}
        />

        <SeparatorBlock height={60} color="green" showLine={true} showNumber={true} number={3} dark={dark} />

        {/* TableBlock */}
        <HeadingBlock heading="TableBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
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
          dark={dark}
        />

        <SeparatorBlock height={60} color="yellow" showLine={true} showNumber={true} number={4} dark={dark} />

        {/* HighlightBlock */}
        <HeadingBlock heading="HighlightBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <HighlightBlock
          highlight="Important: Always save your progress before closing the course module."
          blockStyle="A"
          dark={dark}
        />
        <HighlightBlock
          highlight="Note: This course includes hands-on projects and real-world examples."
          blockStyle="B"
          dark={dark}
        />
        <HighlightBlock
          highlight="Tip: Take breaks every 25 minutes to maximize your learning efficiency."
          blockStyle="C"
          dark={dark}
        />

        <SeparatorBlock height={60} color="red" showLine={true} showNumber={true} number={5} dark={dark} />

        {/* ListBlock */}
        <HeadingBlock heading="ListBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <ParagraphBlock content="Unordered List:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ListBlock
          items={[
            'Interactive video lessons',
            'Downloadable resources',
            'Community discussion forums',
            'Certificate upon completion',
          ]}
          ordered={false}
          dark={dark}
        />
        <ParagraphBlock content="Ordered List:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ListBlock
          items={[
            'Create your account',
            'Browse available courses',
            'Enroll in your chosen course',
            'Start learning!',
          ]}
          ordered={true}
          dark={dark}
        />

        <SeparatorBlock height={60} color="gray" showLine={true} showNumber={true} number={6} dark={dark} />

        {/* ImageBlock */}
        <HeadingBlock heading="ImageBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <ParagraphBlock content="Layout: image-left" contentStyle={{ fontWeight: '500', color: dark ? '#9ca3af' : '#6B7280' }} dark={dark} />
        <ImageBlock
          image={sampleImage}
          text="Image with text on the right side - perfect for feature highlights"
          layout="image-left"
          textStyle={{ fontSize: '16px', lineHeight: '1.6' }}
          textBackgroundStyle={{ backgroundColor: dark ? '#1f2937' : '#f3f4f6', padding: '20px', borderRadius: '8px' }}
          dark={dark}
        />
        <ParagraphBlock content="Layout: stretched" contentStyle={{ fontWeight: '500', color: dark ? '#9ca3af' : '#6B7280' }} dark={dark} />
        <ImageBlock
          image={sampleImage}
          text="Stretched image with overlay text"
          layout="stretched"
          dark={dark}
        />

        <SeparatorBlock height={60} color="blue" showLine={true} showNumber={true} number={7} dark={dark} />

        {/* GalleryBlock */}
        <HeadingBlock heading="GalleryBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <GalleryBlock
          images={[
            { src: sampleImage, alt: 'Gallery Image 1' },
            { src: sampleImage, alt: 'Gallery Image 2' },
            { src: sampleImage, alt: 'Gallery Image 3' },
            { src: sampleImage, alt: 'Gallery Image 4' },
          ]}
          dark={dark}
        />

        <SeparatorBlock height={60} color="green" showLine={true} showNumber={true} number={8} dark={dark} />

        {/* GraphBlock */}
        <HeadingBlock heading="GraphBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <ParagraphBlock content="Line Chart:" contentStyle={{ fontWeight: '500', color: dark ? '#9ca3af' : '#6B7280' }} dark={dark} />
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
          dark={dark}
        />
        <ParagraphBlock content="Bar Chart:" contentStyle={{ fontWeight: '500', color: dark ? '#9ca3af' : '#6B7280' }} dark={dark} />
        <GraphBlock
          graphType="bar"
          title="Course Completion Rates"
          data={[
            { name: 'React', value: 85 },
            { name: 'Python', value: 78 },
            { name: 'Node.js', value: 92 },
            { name: 'SQL', value: 70 },
          ]}
          dark={dark}
        />
        <ParagraphBlock content="Pie Chart:" contentStyle={{ fontWeight: '500', color: dark ? '#9ca3af' : '#6B7280' }} dark={dark} />
        <GraphBlock
          graphType="pie"
          title="Student Demographics"
          data={[
            { name: 'Americas', value: 35 },
            { name: 'Europe', value: 30 },
            { name: 'Asia', value: 25 },
            { name: 'Other', value: 10 },
          ]}
          dark={dark}
        />
        <ParagraphBlock content="Donut Chart:" contentStyle={{ fontWeight: '500', color: dark ? '#9ca3af' : '#6B7280' }} dark={dark} />
        <GraphBlock
          graphType="donut"
          title="Learning Preferences"
          data={[
            { name: 'Video', value: 45 },
            { name: 'Reading', value: 25 },
            { name: 'Practice', value: 30 },
          ]}
          dark={dark}
        />

        <SeparatorBlock height={60} color="yellow" showLine={true} showNumber={true} number={9} dark={dark} />

        {/* TimelineBlock */}
        <HeadingBlock heading="TimelineBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
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
          dark={dark}
        />

        <SeparatorBlock height={60} color="red" showLine={true} showNumber={true} number={10} dark={dark} />

        {/* SeparatorBlock */}
        <HeadingBlock heading="SeparatorBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <ParagraphBlock content="Line only:" contentStyle={{ fontWeight: '500', color: dark ? '#9ca3af' : '#6B7280' }} dark={dark} />
        <SeparatorBlock height={40} color="gray" showLine={true} showNumber={false} dark={dark} />
        <ParagraphBlock content="Number only:" contentStyle={{ fontWeight: '500', color: dark ? '#9ca3af' : '#6B7280' }} dark={dark} />
        <SeparatorBlock height={60} color="blue" showLine={false} showNumber={true} number={1} dark={dark} />
        <ParagraphBlock content="Line with number:" contentStyle={{ fontWeight: '500', color: dark ? '#9ca3af' : '#6B7280' }} dark={dark} />
        <SeparatorBlock height={60} color="green" showLine={true} showNumber={true} number={2} dark={dark} />
        <ParagraphBlock content="Space only:" contentStyle={{ fontWeight: '500', color: dark ? '#9ca3af' : '#6B7280' }} dark={dark} />
        <SeparatorBlock height={40} showLine={false} showNumber={false} dark={dark} />

        <SeparatorBlock height={60} color="gray" showLine={true} showNumber={true} number={11} dark={dark} />

        {/* ComparisonBlock */}
        <HeadingBlock heading="ComparisonBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <ComparisonBlock
          items={[
            { title: 'Basic Plan', content: 'Access to 10 courses, Email support, Basic certificate' },
            { title: 'Pro Plan', content: 'Access to 50 courses, Priority support, Verified certificate' },
            { title: 'Enterprise', content: 'Unlimited courses, Dedicated support, Custom branding' },
          ]}
          blockStyle="A"
          dark={dark}
        />

        <SeparatorBlock height={60} color="blue" showLine={true} showNumber={true} number={12} dark={dark} />

        {/* ChatBlock */}
        <HeadingBlock heading="ChatBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
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
          receiverBubbleColor={dark ? '#374151' : '#E5E7EB'}
          dark={dark}
        />

        <SeparatorBlock height={60} color="green" showLine={true} showNumber={true} number={13} dark={dark} />

        {/* QuoteBlock */}
        <HeadingBlock heading="QuoteBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
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
          dark={dark}
        />

        <SeparatorBlock height={60} color="yellow" showLine={true} showNumber={true} number={14} dark={dark} />

        {/* TestimonialBlock */}
        <HeadingBlock heading="TestimonialBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
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
          dark={dark}
        />

        <SeparatorBlock height={80} color="red" showLine={true} showNumber={false} dark={dark} />
        <HeadingBlock heading="Interactive Blocks" level={2} textStyle={{ textAlign: 'center', color: dark ? '#ffffff' : '#1a1a1a' }} dark={dark} />
        <SeparatorBlock height={40} color="red" showLine={true} showNumber={false} dark={dark} />

        <SeparatorBlock height={60} color="gray" showLine={true} showNumber={true} number={15} dark={dark} />

        {/* CheckboxBlock */}
        <HeadingBlock heading="CheckboxBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <ParagraphBlock content="Style A:" contentStyle={{ fontWeight: '500', color: dark ? '#9ca3af' : '#6B7280' }} dark={dark} />
        <CheckboxBlock
          items={[
            { id: '1', text: 'Complete introduction video', checked: true },
            { id: '2', text: 'Read chapter 1 notes', checked: false },
            { id: '3', text: 'Submit first assignment', checked: false },
          ]}
          blockStyle="A"
          dark={dark}
        />
        <ParagraphBlock content="Style B:" contentStyle={{ fontWeight: '500', color: dark ? '#9ca3af' : '#6B7280' }} dark={dark} />
        <CheckboxBlock
          items={[
            { id: '4', text: 'Watch tutorial video', checked: true },
            { id: '5', text: 'Practice exercises', checked: false },
            { id: '6', text: 'Take the quiz', checked: false },
          ]}
          blockStyle="B"
          dark={dark}
        />
        <ParagraphBlock content="Style C:" contentStyle={{ fontWeight: '500', color: dark ? '#9ca3af' : '#6B7280' }} dark={dark} />
        <CheckboxBlock
          items={[
            { id: '7', text: 'Review materials', checked: false },
            { id: '8', text: 'Join study group', checked: false },
            { id: '9', text: 'Complete project', checked: false },
          ]}
          blockStyle="C"
          dark={dark}
        />

        <SeparatorBlock height={60} color="blue" showLine={true} showNumber={true} number={16} dark={dark} />

        {/* CarouselBlock */}
        <HeadingBlock heading="CarouselBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <CarouselBlock
          images={[
            { src: sampleImage, alt: 'Slide 1', caption: 'Modern Learning Environment' },
            { src: sampleImage, alt: 'Slide 2', caption: 'Interactive Course Content' },
            { src: sampleImage, alt: 'Slide 3', caption: 'Certificate of Completion' },
          ]}
          dark={dark}
        />

        <SeparatorBlock height={60} color="green" showLine={true} showNumber={true} number={17} dark={dark} />

        {/* AccordionBlock */}
        <HeadingBlock heading="AccordionBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
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
          dark={dark}
        />

        <SeparatorBlock height={60} color="yellow" showLine={true} showNumber={true} number={18} dark={dark} />

        {/* TabsBlock */}
        <HeadingBlock heading="TabsBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
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
          dark={dark}
        />

        <SeparatorBlock height={60} color="red" showLine={true} showNumber={true} number={19} dark={dark} />

        {/* LabeledImageBlock */}
        <HeadingBlock heading="LabeledImageBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <LabeledImageBlock
          image={sampleImage}
          items={[
            { id: '1', title: 'Header Section', content: 'The main navigation and branding area of the application.', x: 20, y: 15 },
            { id: '2', title: 'Content Area', content: 'The primary content display region where course materials are shown.', x: 50, y: 50 },
            { id: '3', title: 'Sidebar', content: 'Quick access to course modules and progress tracking.', x: 85, y: 40 },
            { id: '4', title: 'Footer', content: 'Links to support, policies, and social media.', x: 50, y: 85 },
          ]}
          dark={dark}
        />

        <SeparatorBlock height={60} color="gray" showLine={true} showNumber={true} number={20} dark={dark} />

        {/* ScenarioBlock */}
        <HeadingBlock heading="ScenarioBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <ScenarioBlock
          image={sampleImage}
          question="A customer is complaining about a delayed shipment. What's the best response?"
          answers={[
            { id: 'a', text: 'Tell them to wait patiently', order: 1, isCorrect: false },
            { id: 'b', text: 'Apologize and offer a tracking update with compensation', order: 2, isCorrect: true },
            { id: 'c', text: 'Blame the shipping company', order: 3, isCorrect: false },
            { id: 'd', text: 'Ignore the complaint', order: 4, isCorrect: false },
          ]}
          dark={dark}
        />

        <SeparatorBlock height={60} color="blue" showLine={true} showNumber={true} number={21} dark={dark} />

        {/* SortingBlock */}
        <HeadingBlock heading="SortingBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <ParagraphBlock content="Arrange the software development lifecycle phases in the correct order:" contentStyle={{ color: dark ? '#9ca3af' : '#4B5563' }} dark={dark} />
        <SortingBlock
          items={[
            { id: '1', title: 'Testing', content: 'Verify the software works correctly', correctOrder: 4 },
            { id: '2', title: 'Requirements', content: 'Gather and document needs', correctOrder: 1 },
            { id: '3', title: 'Deployment', content: 'Release to production', correctOrder: 5 },
            { id: '4', title: 'Design', content: 'Plan the architecture', correctOrder: 2 },
            { id: '5', title: 'Implementation', content: 'Write the code', correctOrder: 3 },
          ]}
          dark={dark}
        />

        <SeparatorBlock height={60} color="green" showLine={true} showNumber={true} number={22} dark={dark} />

        {/* FlashCardBlock */}
        <HeadingBlock heading="FlashCardBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <FlashCardBlock
          items={[
            { id: '1', question: 'What does HTML stand for?', answer: 'HyperText Markup Language' },
            { id: '2', question: 'What is CSS used for?', answer: 'Styling and layout of web pages' },
            { id: '3', question: 'What is JavaScript?', answer: 'A programming language for web interactivity' },
            { id: '4', question: 'What is React?', answer: 'A JavaScript library for building user interfaces' },
          ]}
          dark={dark}
        />

        <SeparatorBlock height={60} color="yellow" showLine={true} showNumber={true} number={23} dark={dark} />

        {/* MultipleChoiceBlock */}
        <HeadingBlock heading="MultipleChoiceBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <MultipleChoiceBlock
          question="Which of the following is NOT a JavaScript data type?"
          items={[
            { id: 'a', text: 'String', isCorrect: false },
            { id: 'b', text: 'Boolean', isCorrect: false },
            { id: 'c', text: 'Float', isCorrect: true },
            { id: 'd', text: 'Number', isCorrect: false },
          ]}
          dark={dark}
        />

        <SeparatorBlock height={60} color="red" showLine={true} showNumber={true} number={24} dark={dark} />

        {/* MultipleResponseBlock */}
        <HeadingBlock heading="MultipleResponseBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <MultipleResponseBlock
          question="Which of the following are valid React hooks?"
          items={[
            { id: 'a', text: 'useState', isCorrect: true },
            { id: 'b', text: 'useEffect', isCorrect: true },
            { id: 'c', text: 'useRender', isCorrect: false },
            { id: 'd', text: 'useCallback', isCorrect: true },
            { id: 'e', text: 'useHTML', isCorrect: false },
          ]}
          dark={dark}
        />

        <SeparatorBlock height={60} color="gray" showLine={true} showNumber={true} number={25} dark={dark} />

        {/* FillInTheBlankBlock */}
        <HeadingBlock heading="FillInTheBlankBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <FillInTheBlankBlock
          items={[
            { id: '1', text: 'In React, we use ___ to manage component state.', answer: 'useState' },
            { id: '2', text: 'The ___ hook is used for side effects in React.', answer: 'useEffect' },
            { id: '3', text: 'CSS stands for Cascading Style ___.', answer: 'Sheets' },
          ]}
          dark={dark}
        />

        <SeparatorBlock height={60} color="blue" showLine={true} showNumber={true} number={26} dark={dark} />

        {/* MatchingPairsBlock */}
        <HeadingBlock heading="MatchingPairsBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <ParagraphBlock content="Match the programming concept with its definition:" contentStyle={{ color: dark ? '#9ca3af' : '#4B5563' }} dark={dark} />
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
          dark={dark}
        />

        <SeparatorBlock height={60} color="green" showLine={true} showNumber={true} number={27} dark={dark} />

        {/* ButtonBlock */}
        <HeadingBlock heading="ButtonBlock" level={3} textStyle={{ color: '#9F80DA' }} dark={dark} />
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
          dark={dark}
        />

        <SeparatorBlock height={80} color="gray" showLine={true} showNumber={false} dark={dark} />

      </div>
    </div>
  );
}
