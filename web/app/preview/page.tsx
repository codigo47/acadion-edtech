'use client';

import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

// Loading Components
import ChatLoadingIndicator from '../components/loaders/ChatLoadingIndicator';
import DotMatrixLoader from '../components/loaders/DotMatrixLoader';
import StarLoader from '../components/loaders/StarLoader';

// Paragraph Components
import ParagraphBlock from '../components/blocks/ParagraphBlock';
import ParagraphWithHeadingBlock from '../components/blocks/ParagraphWithHeadingBlock';
import ParagraphWithSubheadingBlock from '../components/blocks/ParagraphWithSubheadingBlock';
import ColumnsBlock from '../components/blocks/ColumnsBlock';

// Heading Components
import HeadingBlock from '../components/blocks/HeadingBlock';
import SubheadingBlock from '../components/blocks/SubheadingBlock';

// Highlight Components
import HighlightBlock from '../components/blocks/HighlightBlock';
import HighlightColumnBlock from '../components/blocks/HighlightColumnBlock';
import HighlightCenterLineBlock from '../components/blocks/HighlightCenterLineBlock';
import HighlightLeftLineBlock from '../components/blocks/HighlightLeftLineBlock';
import HighlightBackgroundBlock from '../components/blocks/HighlightBackgroundBlock';

// Image Components
import ImageBlock from '../components/blocks/ImageBlock';
import ImageWithTextBlock from '../components/blocks/ImageWithTextBlock';
import ImageWithTextLeftBlock from '../components/blocks/ImageWithTextLeftBlock';
import ImageWithTextCenterBlock from '../components/blocks/ImageWithTextCenterBlock';
import ImageWithTextBottomBlock from '../components/blocks/ImageWithTextBottomBlock';
import ImageWithTextTopBlock from '../components/blocks/ImageWithTextTopBlock';

// Comparison Components
import ComparisonBlock from '../components/blocks/ComparisonBlock';
import ComparisonBeforeAfterBlock from '../components/blocks/ComparisonBeforeAfterBlock';
import ComparisonProsConsBlock from '../components/blocks/ComparisonProsConsBlock';
import ComparisonCauseEffectBlock from '../components/blocks/ComparisonCauseEffectBlock';
import ComparisonDosDontsBlock from '../components/blocks/ComparisonDosDontsBlock';
import ComparisonMythFactBlock from '../components/blocks/ComparisonMythFactBlock';

// Chat Components
import ChatBlock from '../components/blocks/ChatBlock';
import ChatQABlock from '../components/blocks/ChatQABlock';
import ChatQuestionWallBlock from '../components/blocks/ChatQuestionWallBlock';
import ChatDialogBlock from '../components/blocks/ChatDialogBlock';

// Quote Components
import QuoteBlock from '../components/blocks/QuoteBlock';
import QuoteCenterBorderBlock from '../components/blocks/QuoteCenterBorderBlock';
import QuoteCenterLightBlock from '../components/blocks/QuoteCenterLightBlock';
import QuoteLeftLightBlock from '../components/blocks/QuoteLeftLightBlock';
import QuoteLeftBlock from '../components/blocks/QuoteLeftBlock';
import QuoteImageBlock from '../components/blocks/QuoteImageBlock';

// Other Components
import TableBlock from '../components/blocks/TableBlock';
import ListBlock from '../components/blocks/ListBlock';
import GalleryBlock from '../components/blocks/GalleryBlock';
import GraphBlock from '../components/blocks/GraphBlock';
import TimelineBlock from '../components/blocks/TimelineBlock';
import SeparatorBlock from '../components/blocks/SeparatorBlock';
import TestimonialBlock from '../components/blocks/TestimonialBlock';
import CheckboxBlock from '../components/blocks/CheckboxBlock';
import CarouselBlock from '../components/blocks/CarouselBlock';
import AccordionBlock from '../components/blocks/AccordionBlock';
import TabsBlock from '../components/blocks/TabsBlock';
import LabeledImageBlock from '../components/blocks/LabeledImageBlock';
import ScenarioBlock from '../components/blocks/ScenarioBlock';
import SortingBlock from '../components/blocks/SortingBlock';
import SortingStepsBlock from '../components/blocks/SortingStepsBlock';
import FlashCardBlock from '../components/blocks/FlashCardBlock';
import MultipleChoiceBlock from '../components/blocks/MultipleChoiceBlock';
import MultipleResponseBlock from '../components/blocks/MultipleResponseBlock';
import FillInTheBlankBlock from '../components/blocks/FillInTheBlankBlock';
import MatchingPairsBlock from '../components/blocks/MatchingPairsBlock';
import ButtonBlock from '../components/blocks/ButtonBlock';
import StoryTellingBlock, { BubbleShape } from '../components/blocks/StoryTellingBlock';

// New Components
import ReviewsBlock from '../components/blocks/ReviewsBlock';
import VideoBlock from '../components/blocks/VideoBlock';
import AudioBlock from '../components/blocks/AudioBlock';
import AttachmentBlock from '../components/blocks/AttachmentBlock';
import EmbedBlock from '../components/blocks/EmbedBlock';
import ButtonStackBlock from '../components/blocks/ButtonStackBlock';

const sampleImage = '/sample.jpeg';

// StoryTelling images
const storyTellingImages = {
  torsoGrande: [
    '/story-telling-block/torso-grande1.png',
    '/story-telling-block/torso-grande-1.png',
    '/story-telling-block/torso-grande-2.png',
    '/story-telling-block/torso-grande-4.png',
    '/story-telling-block/torso-grande-5.png',
  ],
  torsoAlto: [
    '/story-telling-block/torso-alto-1.png',
    '/story-telling-block/torso-alto-2.png',
    '/story-telling-block/torso-alto-3.png',
    '/story-telling-block/torso-alto-4.png',
    '/story-telling-block/torso-alto-5.png',
    '/story-telling-block/torso-alto-6.png',
    '/story-telling-block/torso-alto-7.png',
    '/story-telling-block/torso-alto-8.png',
    '/story-telling-block/torso-alto-9.png',
    '/story-telling-block/torso-alto-10.png',
    '/story-telling-block/torso-alto-11.png',
    '/story-telling-block/torso-alto-12.png',
  ],
  sinPiernas: [
    '/story-telling-block/sin-piernas-1.png',
    '/story-telling-block/sin-piernas-2.png',
    '/story-telling-block/sin-piernas-3.png',
    '/story-telling-block/sin-piernas-4.png',
    '/story-telling-block/sin-piernas-5.png',
    '/story-telling-block/sin-piernas-6.png',
  ],
};

const sampleTexts = [
  "Welcome to our learning platform! I'm here to guide you through your educational journey.",
  "Did you know? Studies show that interactive learning can improve retention by up to 75%.",
  "Let me share a quick tip: Taking notes while learning helps consolidate your memory.",
  "Great job on completing this module! You're making excellent progress.",
  "Remember to take breaks every 25 minutes to maintain focus and productivity.",
  "Here's an interesting fact about the topic we're covering today...",
  "I'm thinking about the best way to explain this concept to you.",
  "Have you tried practicing with real-world examples? It makes a huge difference!",
  "Let's review what we've learned so far before moving on to the next section.",
  "This is one of the most important concepts in this course. Pay close attention!",
  "Don't worry if this seems complex at first - everyone starts somewhere.",
  "Excellent question! Let me break this down into simpler parts for you.",
];

const bubbleShapes = [BubbleShape.Classic, BubbleShape.Rounded, BubbleShape.Cloud, BubbleShape.Square, BubbleShape.Thought];
const bubbleColors = ['#FFFFFF', '#E8F4FD', '#FEF3C7', '#DCFCE7', '#FCE7F3', '#F3E8FF'];

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

        {/* ============================================ */}
        {/* LOADING INDICATORS */}
        {/* ============================================ */}
        <HeadingBlock heading="Loading Indicators" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />

        <ParagraphBlock content="ChatLoadingIndicator (Chat style with bouncing dots):" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <div className={`p-6 rounded-xl ${dark ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
          <ChatLoadingIndicator loadingText={null} />
        </div>
        <div className={`p-6 rounded-xl mt-4 ${dark ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
          <ChatLoadingIndicator loadingText="Generating course content..." />
        </div>
        <div className={`p-6 rounded-xl mt-4 ${dark ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
          <ChatLoadingIndicator loadingText="Analyzing your request..." />
        </div>

        <div className="mt-6">
          <ParagraphBlock content="DotMatrixLoader (3x3 grid animation with rotating text):" contentStyle={{ fontWeight: '600' }} dark={dark} />
        </div>
        <div className={`p-8 rounded-xl ${dark ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
          <DotMatrixLoader dark={dark} />
        </div>
        <div className={`p-8 rounded-xl mt-4 ${dark ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
          <DotMatrixLoader
            dark={dark}
            texts={['Generating course content...', 'Analyzing structure...', 'Creating modules...', 'Almost ready...']}
            rotationInterval={1500}
          />
        </div>
        <div className={`p-8 rounded-xl mt-4 ${dark ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
          <DotMatrixLoader
            dark={dark}
            texts={['Saving changes...']}
          />
        </div>

        <div className="mt-6">
          <ParagraphBlock content="StarLoader (4-pointed star animation):" contentStyle={{ fontWeight: '600' }} dark={dark} />
        </div>
        <div className={`p-8 rounded-xl ${dark ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
          <StarLoader dark={dark} />
        </div>
        <div className={`p-8 rounded-xl mt-4 ${dark ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
          <StarLoader
            dark={dark}
            texts={['Generating content...', 'Almost ready...', 'Finishing up...']}
            rotationInterval={1500}
          />
        </div>
        <div className={`p-8 rounded-xl mt-4 ${dark ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
          <StarLoader
            dark={dark}
            size={1.5}
            texts={['Loading your course...']}
          />
        </div>

        <SeparatorBlock height={60} color="blue" showLine={true} showNumber={true} number={2} dark={dark} />

        {/* ============================================ */}
        {/* SEPARATOR BLOCK VARIANTS */}
        {/* ============================================ */}
        <HeadingBlock heading="SeparatorBlock Variants" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />

        <ParagraphBlock content="Line only (showLine=true, showNumber=false):" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <SeparatorBlock height={40} color="gray" showLine={true} showNumber={false} dark={dark} />
        <SeparatorBlock height={40} color="red" showLine={true} showNumber={false} dark={dark} />
        <SeparatorBlock height={40} color="green" showLine={true} showNumber={false} dark={dark} />
        <SeparatorBlock height={40} color="blue" showLine={true} showNumber={false} dark={dark} />
        <SeparatorBlock height={40} color="yellow" showLine={true} showNumber={false} dark={dark} />

        <div className="mt-6">
          <ParagraphBlock content="Number only (showLine=false, showNumber=true):" contentStyle={{ fontWeight: '600' }} dark={dark} />
        </div>
        <SeparatorBlock height={60} color="gray" showLine={false} showNumber={true} number={1} dark={dark} />
        <SeparatorBlock height={60} color="red" showLine={false} showNumber={true} number={2} dark={dark} />
        <SeparatorBlock height={60} color="green" showLine={false} showNumber={true} number={3} dark={dark} />
        <SeparatorBlock height={60} color="blue" showLine={false} showNumber={true} number={4} dark={dark} />
        <SeparatorBlock height={60} color="yellow" showLine={false} showNumber={true} number={5} dark={dark} />

        <div className="mt-6">
          <ParagraphBlock content="Line with number (showLine=true, showNumber=true):" contentStyle={{ fontWeight: '600' }} dark={dark} />
        </div>
        <SeparatorBlock height={60} color="gray" showLine={true} showNumber={true} number={1} dark={dark} />
        <SeparatorBlock height={60} color="red" showLine={true} showNumber={true} number={2} dark={dark} />
        <SeparatorBlock height={60} color="green" showLine={true} showNumber={true} number={3} dark={dark} />
        <SeparatorBlock height={60} color="blue" showLine={true} showNumber={true} number={4} dark={dark} />
        <SeparatorBlock height={60} color="yellow" showLine={true} showNumber={true} number={5} dark={dark} />

        <div className="mt-6">
          <ParagraphBlock content="Spacer only (showLine=false, showNumber=false):" contentStyle={{ fontWeight: '600' }} dark={dark} />
        </div>
        <div className={`border-2 border-dashed ${dark ? 'border-gray-600' : 'border-gray-300'} rounded`}>
          <SeparatorBlock height={60} showLine={false} showNumber={false} dark={dark} />
        </div>
        <ParagraphBlock content="(The dashed border shows the separator area)" contentStyle={{ fontSize: '12px', color: dark ? '#9ca3af' : '#6B7280', fontStyle: 'italic' }} dark={dark} />

        <SeparatorBlock height={60} color="gray" showLine={true} showNumber={true} number={3} dark={dark} />

        {/* ============================================ */}
        {/* HEADING COMPONENTS */}
        {/* ============================================ */}
        <HeadingBlock heading="Heading Components" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />

        <ParagraphBlock content="HeadingBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <HeadingBlock heading="Welcome to Our Learning Platform" level={1} dark={dark} />
        <HeadingBlock heading="Chapter 1: Introduction" level={2} dark={dark} />
        <HeadingBlock heading="Section 1.1: Getting Started" level={3} dark={dark} />

        <ParagraphBlock content="SubheadingBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <SubheadingBlock subheading="This is a subheading for additional context" dark={dark} />

        <SeparatorBlock height={60} color="blue" showLine={true} showNumber={true} number={2} dark={dark} />

        {/* ============================================ */}
        {/* PARAGRAPH COMPONENTS */}
        {/* ============================================ */}
        <HeadingBlock heading="Paragraph Components" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />

        <ParagraphBlock content="ParagraphBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ParagraphBlock
          content="E-learning has revolutionized the way we acquire knowledge and skills. With the advent of digital technology, learners can now access high-quality educational content from anywhere in the world."
          dark={dark}
        />

        <ParagraphBlock content="ParagraphWithHeadingBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ParagraphWithHeadingBlock
          heading="About E-Learning"
          content="This flexibility has made education more accessible and convenient than ever before. Whether you're looking to advance your career, learn a new hobby, or simply expand your horizons."
          dark={dark}
        />

        <ParagraphBlock content="ParagraphWithSubheadingBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ParagraphWithSubheadingBlock
          subheading="Key Benefits"
          content="E-learning offers endless possibilities for growth and development, allowing you to learn at your own pace and on your own schedule."
          dark={dark}
        />

        <ParagraphBlock content="ColumnsBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ColumnsBlock
          content="First column with introductory content about the course structure and methodology. Second column explaining the learning objectives and expected outcomes. Third column describing the assessment methods and certification process."
          columns={3}
          dark={dark}
        />

        <SeparatorBlock height={60} color="green" showLine={true} showNumber={true} number={3} dark={dark} />

        {/* ============================================ */}
        {/* HIGHLIGHT COMPONENTS */}
        {/* ============================================ */}
        <HeadingBlock heading="Highlight Components" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />

        <ParagraphBlock content="HighlightBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <HighlightBlock
          highlight="Important: Always save your progress before closing the course module."
          dark={dark}
        />

        <ParagraphBlock content="HighlightColumnBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <HighlightColumnBlock
          highlight="This highlight is centered with extra padding for emphasis."
          dark={dark}
        />

        <ParagraphBlock content="HighlightCenterLineBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <HighlightCenterLineBlock
          highlight="A centered highlight with a decorative line above."
          lineColor="#9F80DA"
          dark={dark}
        />

        <ParagraphBlock content="HighlightLeftLineBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <HighlightLeftLineBlock
          highlight="Left-aligned highlight with a decorative line."
          lineColor="#22C55E"
          dark={dark}
        />

        <ParagraphBlock content="HighlightBackgroundBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <HighlightBackgroundBlock
          highlight="This highlight has a subtle background color for visual emphasis."
          dark={dark}
        />

        <SeparatorBlock height={60} color="yellow" showLine={true} showNumber={true} number={4} dark={dark} />

        {/* ============================================ */}
        {/* IMAGE COMPONENTS */}
        {/* ============================================ */}
        <HeadingBlock heading="Image Components" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />

        <ParagraphBlock content="ImageBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ImageBlock image={sampleImage} alt="Sample image" dark={dark} />

        <ParagraphBlock content="ImageWithTextBlock (image left, text right):" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ImageWithTextBlock
          image={sampleImage}
          text="Image with text on the right side - perfect for feature highlights and descriptions."
          dark={dark}
        />

        <ParagraphBlock content="ImageWithTextLeftBlock (text left, image right):" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ImageWithTextLeftBlock
          image={sampleImage}
          text="Text on the left with image on the right - ideal for alternating layouts."
          dark={dark}
        />

        <ParagraphBlock content="ImageWithTextCenterBlock (overlay):" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ImageWithTextCenterBlock
          image={sampleImage}
          text="Centered overlay text on the image"
          dark={dark}
        />

        <ParagraphBlock content="ImageWithTextBottomBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ImageWithTextBottomBlock
          image={sampleImage}
          text="Text caption displayed below the image"
          dark={dark}
        />

        <ParagraphBlock content="ImageWithTextTopBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ImageWithTextTopBlock
          image={sampleImage}
          text="Text caption displayed above the image"
          dark={dark}
        />

        <SeparatorBlock height={60} color="red" showLine={true} showNumber={true} number={5} dark={dark} />

        {/* ============================================ */}
        {/* COMPARISON COMPONENTS */}
        {/* ============================================ */}
        <HeadingBlock heading="Comparison Components" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />

        <ParagraphBlock content="ComparisonBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ComparisonBlock
          items={[
            { title: 'Basic Plan', content: 'Access to 10 courses, Email support, Basic certificate' },
            { title: 'Pro Plan', content: 'Access to 50 courses, Priority support, Verified certificate' },
          ]}
          dark={dark}
        />

        <ParagraphBlock content="ComparisonBeforeAfterBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ComparisonBeforeAfterBlock
          beforeItems={['Manual data entry', 'Paper-based processes', 'Limited accessibility']}
          afterItems={['Automated workflows', 'Digital documentation', 'Access from anywhere']}
          dark={dark}
        />

        <ParagraphBlock content="ComparisonProsConsBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ComparisonProsConsBlock
          pros={['Flexible learning schedule', 'Cost effective', 'Wide variety of courses']}
          cons={['Requires self-discipline', 'Limited hands-on practice', 'Internet dependency']}
          dark={dark}
        />

        <ParagraphBlock content="ComparisonCauseEffectBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ComparisonCauseEffectBlock
          cause="Poor time management and lack of clear goals"
          effect="Missed deadlines and decreased productivity"
          dark={dark}
        />

        <ParagraphBlock content="ComparisonDosDontsBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ComparisonDosDontsBlock
          dos={['Set clear learning goals', 'Take regular breaks', 'Practice consistently']}
          donts={['Procrastinate', 'Skip exercises', 'Multitask while learning']}
          dark={dark}
        />

        <ParagraphBlock content="ComparisonMythFactBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ComparisonMythFactBlock
          myth="You need expensive courses to learn effectively"
          fact="Many free resources are excellent and studies show equal or better outcomes"
          dark={dark}
        />

        <SeparatorBlock height={60} color="gray" showLine={true} showNumber={true} number={6} dark={dark} />

        {/* ============================================ */}
        {/* CHAT COMPONENTS */}
        {/* ============================================ */}
        <HeadingBlock heading="Chat Components" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />

        <ParagraphBlock content="ChatBlock (full featured):" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ChatBlock
          messages={[
            { participantId: 'receiver', text: 'Hi! How can I help you today?', time: '10:00 AM' },
            { participantId: 'sender', text: 'I have a question about the React course.', time: '10:01 AM' },
            { participantId: 'receiver', text: 'Sure! What would you like to know?', time: '10:02 AM' },
          ]}
          sender={{ name: 'Student', avatar: sampleImage }}
          receiver={{ name: 'Support', avatar: sampleImage }}
          dark={dark}
        />

        <ParagraphBlock content="ChatQABlock (names only):" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ChatQABlock
          messages={[
            { participantId: 'receiver', text: 'What is the difference between let and const?' },
            { participantId: 'sender', text: 'let allows reassignment, const does not.' },
          ]}
          sender={{ name: 'Instructor' }}
          receiver={{ name: 'Student' }}
          dark={dark}
        />

        <ParagraphBlock content="ChatQuestionWallBlock (2 columns Q&A):" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ChatQuestionWallBlock
          items={[
            { question: 'What is React?', answer: 'A JavaScript library for building user interfaces.' },
            { question: 'What are hooks?', answer: 'Functions that let you use state in functional components.' },
          ]}
          dark={dark}
        />

        <ParagraphBlock content="ChatDialogBlock (bubbles only):" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ChatDialogBlock
          messages={[
            { text: 'Hello!', isLeft: true },
            { text: 'Hi there!', isLeft: false },
            { text: 'How are you?', isLeft: true },
            { text: 'Great, thanks!', isLeft: false },
          ]}
          dark={dark}
        />

        <SeparatorBlock height={60} color="blue" showLine={true} showNumber={true} number={7} dark={dark} />

        {/* ============================================ */}
        {/* QUOTE COMPONENTS */}
        {/* ============================================ */}
        <HeadingBlock heading="Quote Components" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />

        <ParagraphBlock content="QuoteBlock (default):" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <QuoteBlock
          content="Education is the most powerful weapon which you can use to change the world."
          author="Nelson Mandela"
          avatar={sampleImage}
          dark={dark}
        />

        <ParagraphBlock content="QuoteCenterBorderBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <QuoteCenterBorderBlock
          content="The beautiful thing about learning is that no one can take it away from you."
          author="B.B. King"
          avatar={sampleImage}
          dark={dark}
        />

        <ParagraphBlock content="QuoteCenterLightBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <QuoteCenterLightBlock
          content="Live as if you were to die tomorrow. Learn as if you were to live forever."
          author="Mahatma Gandhi"
          dark={dark}
        />

        <ParagraphBlock content="QuoteLeftLightBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <QuoteLeftLightBlock
          content="The only way to do great work is to love what you do."
          author="Steve Jobs"
          avatar={sampleImage}
          dark={dark}
        />

        <ParagraphBlock content="QuoteLeftBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <QuoteLeftBlock
          content="Success is not final, failure is not fatal: it is the courage to continue that counts."
          author="Winston Churchill"
          avatar={sampleImage}
          dark={dark}
        />

        <ParagraphBlock content="QuoteImageBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <QuoteImageBlock
          content="In the middle of difficulty lies opportunity."
          author="Albert Einstein"
          backgroundImage={sampleImage}
          dark={dark}
        />

        <SeparatorBlock height={60} color="green" showLine={true} showNumber={true} number={8} dark={dark} />

        {/* ============================================ */}
        {/* LIST BLOCK STYLES */}
        {/* ============================================ */}
        <HeadingBlock heading="ListBlock Styles" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />

        <ParagraphBlock content="Default (unordered):" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ListBlock
          items={['Interactive video lessons', 'Downloadable resources', 'Community forums']}
          ordered={false}
          dark={dark}
        />

        <ParagraphBlock content="Check style:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ListBlock
          items={['Complete introduction', 'Read documentation', 'Submit assignment']}
          listStyle="check"
          dark={dark}
        />

        <ParagraphBlock content="Numbered style:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ListBlock
          items={['Create your account', 'Browse courses', 'Start learning']}
          listStyle="numbered"
          dark={dark}
        />

        <ParagraphBlock content="Gradient style:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ListBlock
          items={['First step with gradient', 'Second step highlighted', 'Third step complete']}
          listStyle="gradient"
          accentColor="#9F80DA"
          dark={dark}
        />

        <ParagraphBlock content="Bordered style:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ListBlock
          items={['Bordered item one', 'Bordered item two', 'Bordered item three']}
          listStyle="bordered"
          dark={dark}
        />

        <ParagraphBlock content="Cards style:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ListBlock
          items={['Card item one', 'Card item two', 'Card item three', 'Card item four']}
          listStyle="cards"
          dark={dark}
        />

        <SeparatorBlock height={60} color="yellow" showLine={true} showNumber={true} number={9} dark={dark} />

        {/* ============================================ */}
        {/* NEW COMPONENTS: Reviews, Video, Audio, Attachment, Embed, ButtonStack */}
        {/* ============================================ */}
        <HeadingBlock heading="New Components" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />

        <ParagraphBlock content="ReviewsBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ReviewsBlock
          reviews={[
            { id: '1', name: 'Sarah Johnson', avatar: sampleImage, rating: 5, review: 'This course completely changed my career trajectory. Highly recommended!' },
            { id: '2', name: 'Michael Chen', rating: 4, review: 'Great content and well-structured lessons. Could use more practical examples.' },
            { id: '3', name: 'Emily Davis', avatar: sampleImage, rating: 5, review: 'The best online learning experience I\'ve ever had!' },
          ]}
          dark={dark}
        />

        <ParagraphBlock content="VideoBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <VideoBlock
          url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          title="Sample Video"
          dark={dark}
        />

        <ParagraphBlock content="AudioBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <AudioBlock
          url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          title="Sample Audio Track"
          dark={dark}
        />

        <ParagraphBlock content="AttachmentBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <AttachmentBlock
          attachments={[
            { id: '1', name: 'Course-Syllabus.pdf', url: '#', size: '2.4 MB' },
            { id: '2', name: 'Project-Template.docx', url: '#', size: '856 KB' },
            { id: '3', name: 'Data-Analysis.xlsx', url: '#', size: '1.2 MB' },
            { id: '4', name: 'Resources.zip', url: '#', size: '15.8 MB' },
          ]}
          dark={dark}
        />

        <ParagraphBlock content="EmbedBlock:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <EmbedBlock
          url="https://player.vimeo.com/video/76979871"
          title="Vimeo Embed"
          aspectRatio="16:9"
          dark={dark}
        />

        <ParagraphBlock content="ButtonStackBlock (cards style):" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ButtonStackBlock
          title="Quick Actions"
          items={[
            { id: '1', text: 'Start Course', description: 'Begin your learning journey', url: '#', icon: 'Play' },
            { id: '2', text: 'Download Materials', description: 'Get course resources', url: '#', icon: 'Download' },
            { id: '3', text: 'Contact Support', description: 'Get help when you need it', url: '#', icon: 'Mail' },
          ]}
          stackStyle="cards"
          dark={dark}
        />

        <ParagraphBlock content="ButtonStackBlock (minimal style):" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ButtonStackBlock
          title="Navigation"
          items={[
            { id: '1', text: 'Getting Started Guide', url: '#' },
            { id: '2', text: 'API Documentation', url: '#' },
            { id: '3', text: 'Community Forum', url: '#' },
          ]}
          stackStyle="minimal"
          dark={dark}
        />

        <ParagraphBlock content="ButtonStackBlock (bordered style):" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ButtonStackBlock
          items={[
            { id: '1', text: 'Module 1: Introduction', description: 'Learn the basics', url: '#', icon: 'BookOpen' },
            { id: '2', text: 'Module 2: Advanced Topics', description: 'Deep dive into concepts', url: '#', icon: 'BookOpen' },
          ]}
          stackStyle="bordered"
          accentColor="#22C55E"
          dark={dark}
        />

        <ParagraphBlock content="ButtonStackBlock (gradient style):" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <ButtonStackBlock
          title="Learning Path"
          items={[
            { id: '1', text: 'Fundamentals', description: 'Core concepts', url: '#' },
            { id: '2', text: 'Intermediate', description: 'Build your skills', url: '#' },
            { id: '3', text: 'Advanced', description: 'Master the topic', url: '#' },
          ]}
          stackStyle="gradient"
          accentColor="#9F80DA"
          dark={dark}
        />

        <SeparatorBlock height={60} color="red" showLine={true} showNumber={true} number={10} dark={dark} />

        {/* ============================================ */}
        {/* TABLE BLOCK */}
        {/* ============================================ */}
        <HeadingBlock heading="TableBlock" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />
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

        <SeparatorBlock height={60} color="gray" showLine={true} showNumber={true} number={11} dark={dark} />

        {/* ============================================ */}
        {/* GALLERY BLOCK */}
        {/* ============================================ */}
        <HeadingBlock heading="GalleryBlock" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <GalleryBlock
          images={[
            { src: sampleImage, alt: 'Gallery Image 1' },
            { src: sampleImage, alt: 'Gallery Image 2' },
            { src: sampleImage, alt: 'Gallery Image 3' },
            { src: sampleImage, alt: 'Gallery Image 4' },
          ]}
          dark={dark}
        />

        <SeparatorBlock height={60} color="blue" showLine={true} showNumber={true} number={12} dark={dark} />

        {/* ============================================ */}
        {/* GRAPH BLOCK */}
        {/* ============================================ */}
        <HeadingBlock heading="GraphBlock" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />
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

        <SeparatorBlock height={60} color="green" showLine={true} showNumber={true} number={13} dark={dark} />

        {/* ============================================ */}
        {/* TIMELINE BLOCK */}
        {/* ============================================ */}
        <HeadingBlock heading="TimelineBlock" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <TimelineBlock
          events={[
            { title: 'Course Launch', description: 'We launched our first online course.', date: 'January 2023' },
            { title: 'Mobile App Release', description: 'Our mobile app became available.', date: 'April 2023' },
            { title: 'Community Milestone', description: 'Reached 10,000 active learners.', date: 'August 2023' },
          ]}
          dark={dark}
        />

        <SeparatorBlock height={60} color="yellow" showLine={true} showNumber={true} number={14} dark={dark} />

        {/* ============================================ */}
        {/* STORYTELLING BLOCK */}
        {/* ============================================ */}
        <HeadingBlock heading="StoryTellingBlock" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />

        <ParagraphBlock content="Torso Grande Style:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        {storyTellingImages.torsoGrande.map((image, index) => (
          <StoryTellingBlock
            key={`torso-grande-${index}`}
            avatarImage={image}
            avatarName={`Character ${index + 1}`}
            text={sampleTexts[index % sampleTexts.length]}
            avatarPosition={index % 2 === 0 ? 'left' : 'right'}
            bubbleStyle={{
              shape: bubbleShapes[index % bubbleShapes.length],
              backgroundColor: dark ? undefined : bubbleColors[index % bubbleColors.length],
            }}
            dark={dark}
          />
        ))}

        <ParagraphBlock content="Torso Alto Style:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        {storyTellingImages.torsoAlto.map((image, index) => (
          <StoryTellingBlock
            key={`torso-alto-${index}`}
            avatarImage={image}
            avatarName={`Guide ${index + 1}`}
            text={sampleTexts[index % sampleTexts.length]}
            avatarPosition={index % 2 === 0 ? 'left' : 'right'}
            bubbleStyle={{
              shape: bubbleShapes[index % bubbleShapes.length],
              backgroundColor: dark ? undefined : bubbleColors[index % bubbleColors.length],
            }}
            dark={dark}
          />
        ))}

        <ParagraphBlock content="Sin Piernas Style:" contentStyle={{ fontWeight: '600' }} dark={dark} />
        {storyTellingImages.sinPiernas.map((image, index) => (
          <StoryTellingBlock
            key={`sin-piernas-${index}`}
            avatarImage={image}
            avatarName={`Instructor ${index + 1}`}
            text={sampleTexts[index % sampleTexts.length]}
            avatarPosition={index % 2 === 0 ? 'left' : 'right'}
            bubbleStyle={{
              shape: bubbleShapes[index % bubbleShapes.length],
              backgroundColor: dark ? undefined : bubbleColors[index % bubbleColors.length],
              borderColor: index % 2 === 0 ? '#9F80DA' : undefined,
            }}
            dark={dark}
          />
        ))}

        <SeparatorBlock height={60} color="red" showLine={true} showNumber={true} number={15} dark={dark} />

        {/* ============================================ */}
        {/* TESTIMONIAL BLOCK */}
        {/* ============================================ */}
        <HeadingBlock heading="TestimonialBlock" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <TestimonialBlock
          testimonials={[
            {
              title: 'Life Changing Experience',
              content: 'This platform completely changed my career trajectory!',
              name: 'Sarah Johnson',
              role: 'Software Developer',
              avatar: sampleImage,
            },
            {
              title: 'Highly Recommended',
              content: 'I learned more in 3 months here than in 2 years of self-study.',
              name: 'Michael Chen',
              role: 'Data Analyst',
              avatar: sampleImage,
            },
          ]}
          dark={dark}
        />

        <SeparatorBlock height={80} color="red" showLine={true} showNumber={false} dark={dark} />
        <HeadingBlock heading="Interactive Blocks" level={2} textStyle={{ textAlign: 'center', color: dark ? '#ffffff' : '#1a1a1a' }} dark={dark} />
        <SeparatorBlock height={40} color="red" showLine={true} showNumber={false} dark={dark} />

        <SeparatorBlock height={60} color="gray" showLine={true} showNumber={true} number={16} dark={dark} />

        {/* ============================================ */}
        {/* CHECKBOX BLOCK */}
        {/* ============================================ */}
        <HeadingBlock heading="CheckboxBlock" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <CheckboxBlock
          items={[
            { id: '1', text: 'Complete introduction video', checked: true },
            { id: '2', text: 'Read chapter 1 notes', checked: false },
            { id: '3', text: 'Submit first assignment', checked: false },
          ]}
          blockStyle="A"
          dark={dark}
        />

        <SeparatorBlock height={60} color="blue" showLine={true} showNumber={true} number={17} dark={dark} />

        {/* ============================================ */}
        {/* CAROUSEL BLOCK */}
        {/* ============================================ */}
        <HeadingBlock heading="CarouselBlock" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <CarouselBlock
          images={[
            { src: sampleImage, alt: 'Slide 1', caption: 'Modern Learning Environment' },
            { src: sampleImage, alt: 'Slide 2', caption: 'Interactive Course Content' },
            { src: sampleImage, alt: 'Slide 3', caption: 'Certificate of Completion' },
          ]}
          dark={dark}
        />

        <SeparatorBlock height={60} color="green" showLine={true} showNumber={true} number={18} dark={dark} />

        {/* ============================================ */}
        {/* ACCORDION BLOCK (with images) */}
        {/* ============================================ */}
        <HeadingBlock heading="AccordionBlock (with images)" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <AccordionBlock
          items={[
            {
              id: 'faq1',
              title: 'How do I enroll in a course?',
              content: 'Simply browse our course catalog, select the course you\'re interested in, and click the "Enroll Now" button.',
              image: sampleImage,
              imagePosition: 'right',
            },
            {
              id: 'faq2',
              title: 'Can I get a refund?',
              content: 'Yes! We offer a 30-day money-back guarantee.',
              image: sampleImage,
              imagePosition: 'left',
            },
            {
              id: 'faq3',
              title: 'Are certificates included?',
              content: 'Yes, upon completion of any course, you\'ll receive a digital certificate.',
              image: sampleImage,
              imagePosition: 'top',
            },
          ]}
          blockStyle="A"
          dark={dark}
        />

        <SeparatorBlock height={60} color="yellow" showLine={true} showNumber={true} number={19} dark={dark} />

        {/* ============================================ */}
        {/* TABS BLOCK */}
        {/* ============================================ */}
        <HeadingBlock heading="TabsBlock" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <TabsBlock
          items={[
            { id: 'overview', title: 'Overview', content: 'This comprehensive course covers all the fundamentals.', image: sampleImage },
            { id: 'curriculum', title: 'Curriculum', content: 'The course is divided into 12 modules.' },
            { id: 'instructor', title: 'Instructor', content: 'John Smith is a senior software engineer.', image: sampleImage },
          ]}
          dark={dark}
        />

        <SeparatorBlock height={60} color="red" showLine={true} showNumber={true} number={20} dark={dark} />

        {/* ============================================ */}
        {/* LABELED IMAGE BLOCK (with navigation) */}
        {/* ============================================ */}
        <HeadingBlock heading="LabeledImageBlock (with navigation arrows)" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <LabeledImageBlock
          image={sampleImage}
          items={[
            { id: '1', title: 'Header Section', content: 'The main navigation and branding area.', x: 20, y: 15 },
            { id: '2', title: 'Content Area', content: 'The primary content display region.', x: 50, y: 50 },
            { id: '3', title: 'Sidebar', content: 'Quick access to modules and progress.', x: 85, y: 40 },
            { id: '4', title: 'Footer', content: 'Links to support and social media.', x: 50, y: 85 },
          ]}
          dark={dark}
        />

        <SeparatorBlock height={60} color="gray" showLine={true} showNumber={true} number={21} dark={dark} />

        {/* ============================================ */}
        {/* SCENARIO BLOCK */}
        {/* ============================================ */}
        <HeadingBlock heading="ScenarioBlock" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />
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

        <SeparatorBlock height={60} color="blue" showLine={true} showNumber={true} number={22} dark={dark} />

        {/* ============================================ */}
        {/* SORTING BLOCKS */}
        {/* ============================================ */}
        <HeadingBlock heading="Sorting Blocks" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />

        <ParagraphBlock content="SortingStepsBlock (order steps):" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <SortingStepsBlock
          items={[
            { id: '1', title: 'Testing', content: 'Verify the software works correctly', correctOrder: 4 },
            { id: '2', title: 'Requirements', content: 'Gather and document needs', correctOrder: 1 },
            { id: '3', title: 'Deployment', content: 'Release to production', correctOrder: 5 },
            { id: '4', title: 'Design', content: 'Plan the architecture', correctOrder: 2 },
            { id: '5', title: 'Implementation', content: 'Write the code', correctOrder: 3 },
          ]}
          dark={dark}
        />

        <ParagraphBlock content="SortingBlock (categorize cards):" contentStyle={{ fontWeight: '600' }} dark={dark} />
        <SortingBlock
          cards={[
            { id: '1', title: 'React', content: 'JavaScript library for UI', correctCategory: 'frontend' },
            { id: '2', title: 'Node.js', content: 'JavaScript runtime', correctCategory: 'backend' },
            { id: '3', title: 'Vue.js', content: 'Progressive framework', correctCategory: 'frontend' },
            { id: '4', title: 'Express', content: 'Web framework for Node', correctCategory: 'backend' },
            { id: '5', title: 'Angular', content: 'Platform for web apps', correctCategory: 'frontend' },
            { id: '6', title: 'Django', content: 'Python web framework', correctCategory: 'backend' },
          ]}
          categories={[
            { id: 'frontend', title: 'Frontend' },
            { id: 'backend', title: 'Backend' },
          ]}
          dark={dark}
        />

        <SeparatorBlock height={60} color="green" showLine={true} showNumber={true} number={23} dark={dark} />

        {/* ============================================ */}
        {/* FLASH CARD BLOCK */}
        {/* ============================================ */}
        <HeadingBlock heading="FlashCardBlock" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <FlashCardBlock
          items={[
            { id: '1', question: 'What does HTML stand for?', answer: 'HyperText Markup Language' },
            { id: '2', question: 'What is CSS used for?', answer: 'Styling and layout of web pages' },
            { id: '3', question: 'What is JavaScript?', answer: 'A programming language for web interactivity' },
          ]}
          dark={dark}
        />

        <SeparatorBlock height={60} color="yellow" showLine={true} showNumber={true} number={24} dark={dark} />

        {/* ============================================ */}
        {/* MULTIPLE CHOICE BLOCK (with feedback) */}
        {/* ============================================ */}
        <HeadingBlock heading="MultipleChoiceBlock (with feedback)" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <MultipleChoiceBlock
          question="Which of the following is NOT a JavaScript data type?"
          items={[
            { id: 'a', text: 'String', isCorrect: false, feedback: 'String is a valid primitive type in JavaScript.' },
            { id: 'b', text: 'Boolean', isCorrect: false, feedback: 'Boolean is a valid primitive type in JavaScript.' },
            { id: 'c', text: 'Float', isCorrect: true, feedback: 'Correct! JavaScript only has "Number" for numeric values, not separate Float/Integer types.' },
            { id: 'd', text: 'Number', isCorrect: false, feedback: 'Number is a valid primitive type in JavaScript.' },
          ]}
          dark={dark}
        />

        <SeparatorBlock height={60} color="red" showLine={true} showNumber={true} number={25} dark={dark} />

        {/* ============================================ */}
        {/* MULTIPLE RESPONSE BLOCK (with feedback) */}
        {/* ============================================ */}
        <HeadingBlock heading="MultipleResponseBlock (with feedback)" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <MultipleResponseBlock
          question="Which of the following are valid React hooks?"
          items={[
            { id: 'a', text: 'useState', isCorrect: true },
            { id: 'b', text: 'useEffect', isCorrect: true },
            { id: 'c', text: 'useRender', isCorrect: false },
            { id: 'd', text: 'useCallback', isCorrect: true },
            { id: 'e', text: 'useHTML', isCorrect: false },
          ]}
          correctFeedback="Excellent! You correctly identified all the valid React hooks."
          incorrectFeedback="Not quite. useState, useEffect, and useCallback are built-in React hooks."
          dark={dark}
        />

        <SeparatorBlock height={60} color="gray" showLine={true} showNumber={true} number={26} dark={dark} />

        {/* ============================================ */}
        {/* FILL IN THE BLANK BLOCK (multiple answers) */}
        {/* ============================================ */}
        <HeadingBlock heading="FillInTheBlankBlock (multiple correct answers)" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />
        <FillInTheBlankBlock
          items={[
            { id: '1', text: 'In React, we use ___ to manage component state.', answers: ['useState', 'use state', 'usestate'] },
            { id: '2', text: 'The ___ hook is used for side effects in React.', answers: ['useEffect', 'use effect', 'useeffect'] },
            { id: '3', text: 'CSS stands for Cascading Style ___.', answers: ['Sheets', 'sheets', 'SHEETS'] },
          ]}
          dark={dark}
        />

        <SeparatorBlock height={60} color="blue" showLine={true} showNumber={true} number={27} dark={dark} />

        {/* ============================================ */}
        {/* MATCHING PAIRS BLOCK */}
        {/* ============================================ */}
        <HeadingBlock heading="MatchingPairsBlock" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />
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

        <SeparatorBlock height={60} color="green" showLine={true} showNumber={true} number={28} dark={dark} />

        {/* ============================================ */}
        {/* BUTTON BLOCK */}
        {/* ============================================ */}
        <HeadingBlock heading="ButtonBlock" level={2} textStyle={{ color: '#9F80DA' }} dark={dark} />
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
