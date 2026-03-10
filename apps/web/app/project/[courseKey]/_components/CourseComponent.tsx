import { ComponentType } from 'react';
import * as Blocks from '../../../components/blocks';
import { UnitComponent } from './types';
import { blockStylesToCss, type BlockStyles } from '@/lib/block-styles';

// Map of component names to their React components
export const BlockComponents: Record<string, ComponentType<any>> = {
  // Paragraph Blocks
  ParagraphBlock: Blocks.ParagraphBlock,
  ParagraphWithHeadingBlock: Blocks.ParagraphWithHeadingBlock,
  ParagraphWithSubheadingBlock: Blocks.ParagraphWithSubheadingBlock,
  // Heading Blocks
  HeadingBlock: Blocks.HeadingBlock,
  SubheadingBlock: Blocks.SubheadingBlock,
  // Highlight Blocks
  HighlightBlock: Blocks.HighlightBlock,
  HighlightNoteBlock: Blocks.HighlightNoteBlock,
  HighlightColumnBlock: Blocks.HighlightColumnBlock,
  HighlightCenterLineBlock: Blocks.HighlightCenterLineBlock,
  HighlightLeftLineBlock: Blocks.HighlightLeftLineBlock,
  HighlightBackgroundBlock: Blocks.HighlightBackgroundBlock,
  // Image Blocks
  ImageBlock: Blocks.ImageBlock,
  ImageWithTextBlock: Blocks.ImageWithTextBlock,
  ImageWithTextLeftBlock: Blocks.ImageWithTextLeftBlock,
  ImageWithTextCenterBlock: Blocks.ImageWithTextCenterBlock,
  ImageWithTextBottomBlock: Blocks.ImageWithTextBottomBlock,
  ImageWithTextTopBlock: Blocks.ImageWithTextTopBlock,
  // Quote Blocks
  QuoteBlock: Blocks.QuoteBlock,
  QuoteCenterBorderBlock: Blocks.QuoteCenterBorderBlock,
  QuoteCenterLightBlock: Blocks.QuoteCenterLightBlock,
  QuoteLeftLightBlock: Blocks.QuoteLeftLightBlock,
  QuoteLeftBlock: Blocks.QuoteLeftBlock,
  QuoteImageBlock: Blocks.QuoteImageBlock,
  // Comparison Blocks
  ComparisonBlock: Blocks.ComparisonBlock,
  ComparisonProsConsBlock: Blocks.ComparisonProsConsBlock,
  ComparisonCauseEffectBlock: Blocks.ComparisonCauseEffectBlock,
  ComparisonDosDontsBlock: Blocks.ComparisonDosDontsBlock,
  ComparisonMythFactBlock: Blocks.ComparisonMythFactBlock,
  ComparisonBeforeAfterBlock: Blocks.ComparisonBeforeAfterBlock,
  // Chat Blocks
  ChatBlock: Blocks.ChatBlock,
  ChatFeedbackBlock: Blocks.ChatFeedbackBlock,
  ChatQABlock: Blocks.ChatQABlock,
  ChatQuestionWallBlock: Blocks.ChatQuestionWallBlock,
  ChatDialogBlock: Blocks.ChatDialogBlock,
  // Other Static Blocks
  TableBlock: Blocks.TableBlock,
  ListBlock: Blocks.ListBlock,
  GalleryBlock: Blocks.GalleryBlock,
  GraphBlock: Blocks.GraphBlock,
  TimelineBlock: Blocks.TimelineBlock,
  SeparatorBlock: Blocks.SeparatorBlock,
  TestimonialBlock: Blocks.TestimonialBlock,
  StoryTellingBlock: Blocks.StoryTellingBlock,
  ColumnsBlock: Blocks.ColumnsBlock,
  ReviewsBlock: Blocks.ReviewsBlock,
  VideoBlock: Blocks.VideoBlock,
  AudioBlock: Blocks.AudioBlock,
  AttachmentBlock: Blocks.AttachmentBlock,
  EmbedBlock: Blocks.EmbedBlock,
  // Interactive Blocks
  CheckboxBlock: Blocks.CheckboxBlock,
  CarouselBlock: Blocks.CarouselBlock,
  AccordionBlock: Blocks.AccordionBlock,
  TabsBlock: Blocks.TabsBlock,
  LabeledImageBlock: Blocks.LabeledImageBlock,
  ScenarioBlock: Blocks.ScenarioBlock,
  SortingBlock: Blocks.SortingBlock,
  SortingStepsBlock: Blocks.SortingStepsBlock,
  FlashCardBlock: Blocks.FlashCardBlock,
  MultipleChoiceBlock: Blocks.MultipleChoiceBlock,
  MultipleResponseBlock: Blocks.MultipleResponseBlock,
  FillInTheBlankBlock: Blocks.FillInTheBlankBlock,
  MatchingPairsBlock: Blocks.MatchingPairsBlock,
  ButtonBlock: Blocks.ButtonBlock,
  ButtonStackBlock: Blocks.ButtonStackBlock,
  BannerBlock: Blocks.BannerBlock,
};

export function CourseComponent({ component }: { component: UnitComponent }) {
  const { componentName, content } = component;

  // Get the corresponding block component
  const BlockComponent = BlockComponents[componentName];

  if (BlockComponent) {
    const contentRecord = content as Record<string, unknown>;
    const styles = blockStylesToCss(contentRecord.blockStyles as BlockStyles | undefined);
    const hasStyles = Object.keys(styles).length > 0;
    // Pass the content directly as props to the block component
    return hasStyles ? (
      <div style={styles}>
        <BlockComponent {...contentRecord} />
      </div>
    ) : (
      <BlockComponent {...contentRecord} />
    );
  }

  // Fallback for unknown components
  return (
    <div className="py-6 px-6 bg-yellow-50 border border-yellow-200 rounded-lg">
      <p className="text-yellow-700 text-sm">Unknown component: {componentName}</p>
      <pre className="mt-2 text-xs text-gray-600 overflow-auto">
        {JSON.stringify(content, null, 2)}
      </pre>
    </div>
  );
}
