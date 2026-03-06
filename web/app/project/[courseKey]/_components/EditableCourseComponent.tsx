'use client';

import { CourseComponent } from './CourseComponent';
import type { UnitComponent } from './types';
import {
  // Group editors
  NotionStyleBlock, isParagraphOrHeading,
  EditableChatBlock, isChatBlock,
  EditableImageWithTextBlock, isImageWithTextBlock,
  EditableListBlock, isListBlock,
  EditableTwoListBlock, isComparisonTwoList,
  EditableTwoFieldBlock,
  EditableMediaUrlBlock,
  // Shared helpers
  twoListConfig,
  // Standalone editors
  EditableTabsBlock,
  EditableAccordionBlock,
  EditableSortingStepsBlock,
  EditableMultipleResponseBlock,
  EditableComparisonCauseEffectBlock,
  EditableImageBlock,
  EditableMultipleChoiceBlock,
  EditableFillInTheBlankBlock,
  EditableMatchingPairsBlock,
  EditableSortingBlock,
  EditableComparisonBlock,
  EditableChatQuestionWallBlock,
  EditableChatDialogBlock,
  EditableTimelineBlock,
  EditableFlashCardBlock,
  EditableTestimonialBlock,
  EditableReviewsBlock,
  EditableTableBlock,
  EditableButtonBlock,
  EditableButtonStackBlock,
  EditableEmbedBlock,
  EditableAttachmentBlock,
  EditableCarouselBlock,
  EditableGalleryBlock,
  EditableStoryTellingBlock,
  EditableColumnsBlock,
  EditableScenarioBlock,
  EditableLabeledImageBlock,
  EditableSeparatorBlock,
  EditableBannerBlock,
} from '@/app/components/blocks';

interface EditableCourseComponentProps {
  component: UnitComponent;
  onDataChange: (data: Record<string, unknown>) => void;
}

export function EditableCourseComponent({
  component,
  onDataChange,
}: EditableCourseComponentProps) {
  const { componentName, content } = component;

  // Tabs
  if (componentName === 'TabsBlock') {
    return <EditableTabsBlock content={content} onDataChange={onDataChange} />;
  }

  // Accordion
  if (componentName === 'AccordionBlock') {
    return <EditableAccordionBlock content={content} onDataChange={onDataChange} />;
  }

  // Lists
  if (isListBlock(componentName)) {
    return <EditableListBlock component={component} componentName={componentName} content={content} onDataChange={onDataChange} />;
  }

  // Image+text
  if (isImageWithTextBlock(componentName)) {
    return <EditableImageWithTextBlock componentName={componentName} content={content} onDataChange={onDataChange} />;
  }

  // Image only
  if (componentName === 'ImageBlock') {
    return <EditableImageBlock component={component} content={content} onDataChange={onDataChange} />;
  }

  // SortingSteps
  if (componentName === 'SortingStepsBlock') {
    return <EditableSortingStepsBlock content={content} onDataChange={onDataChange} />;
  }

  // MultipleResponse
  if (componentName === 'MultipleResponseBlock') {
    return <EditableMultipleResponseBlock content={content} onDataChange={onDataChange} />;
  }

  // MultipleChoice
  if (componentName === 'MultipleChoiceBlock') {
    return <EditableMultipleChoiceBlock content={content} onDataChange={onDataChange} />;
  }

  // FillInTheBlank
  if (componentName === 'FillInTheBlankBlock') {
    return <EditableFillInTheBlankBlock content={content} onDataChange={onDataChange} />;
  }

  // MatchingPairs
  if (componentName === 'MatchingPairsBlock') {
    return <EditableMatchingPairsBlock content={content} onDataChange={onDataChange} />;
  }

  // SortingBlock (categories)
  if (componentName === 'SortingBlock') {
    return <EditableSortingBlock content={content} onDataChange={onDataChange} />;
  }

  // Paragraphs, headings, highlights, quotes
  if (isParagraphOrHeading(componentName)) {
    return <NotionStyleBlock componentName={componentName} content={content} onDataChange={onDataChange} />;
  }

  // Comparisons
  if (componentName === 'ComparisonCauseEffectBlock') {
    return <EditableComparisonCauseEffectBlock content={content} onDataChange={onDataChange} />;
  }
  if (componentName === 'ComparisonMythFactBlock') {
    return <EditableTwoFieldBlock content={content} onDataChange={onDataChange} fieldA="myth" fieldB="fact" labelA="Myth" labelB="Fact" colorA="bg-red-100" colorB="bg-green-100" />;
  }
  if (isComparisonTwoList(componentName)) {
    const cfg = twoListConfig[componentName]!;
    return <EditableTwoListBlock content={content} onDataChange={onDataChange} config={cfg} />;
  }
  if (componentName === 'ComparisonBlock') {
    return <EditableComparisonBlock content={content} onDataChange={onDataChange} />;
  }

  // Chat blocks
  if (isChatBlock(componentName)) {
    return <EditableChatBlock content={content} onDataChange={onDataChange} componentName={componentName} />;
  }
  if (componentName === 'ChatQuestionWallBlock') {
    return <EditableChatQuestionWallBlock content={content} onDataChange={onDataChange} />;
  }
  if (componentName === 'ChatDialogBlock') {
    return <EditableChatDialogBlock content={content} onDataChange={onDataChange} />;
  }

  // Items-based blocks
  if (componentName === 'TimelineBlock') {
    return <EditableTimelineBlock content={content} onDataChange={onDataChange} />;
  }
  if (componentName === 'FlashCardBlock') {
    return <EditableFlashCardBlock content={content} onDataChange={onDataChange} />;
  }
  if (componentName === 'TestimonialBlock') {
    return <EditableTestimonialBlock content={content} onDataChange={onDataChange} />;
  }
  if (componentName === 'ReviewsBlock') {
    return <EditableReviewsBlock content={content} onDataChange={onDataChange} />;
  }

  // Table
  if (componentName === 'TableBlock') {
    return <EditableTableBlock content={content} onDataChange={onDataChange} />;
  }

  // Buttons
  if (componentName === 'ButtonBlock') {
    return <EditableButtonBlock content={content} onDataChange={onDataChange} />;
  }
  if (componentName === 'ButtonStackBlock') {
    return <EditableButtonStackBlock content={content} onDataChange={onDataChange} />;
  }

  // Media
  if (componentName === 'VideoBlock' || componentName === 'AudioBlock') {
    return <EditableMediaUrlBlock content={content} onDataChange={onDataChange} label={componentName === 'VideoBlock' ? 'Video' : 'Audio'} />;
  }
  if (componentName === 'EmbedBlock') {
    return <EditableEmbedBlock content={content} onDataChange={onDataChange} />;
  }
  if (componentName === 'AttachmentBlock') {
    return <EditableAttachmentBlock content={content} onDataChange={onDataChange} />;
  }

  // Carousel / Gallery
  if (componentName === 'CarouselBlock') {
    return <EditableCarouselBlock content={content} onDataChange={onDataChange} />;
  }
  if (componentName === 'GalleryBlock') {
    return <EditableGalleryBlock content={content} onDataChange={onDataChange} />;
  }

  // StoryTelling
  if (componentName === 'StoryTellingBlock') {
    return <EditableStoryTellingBlock content={content} onDataChange={onDataChange} />;
  }

  // Columns
  if (componentName === 'ColumnsBlock') {
    return <EditableColumnsBlock content={content} onDataChange={onDataChange} />;
  }

  // Scenario
  if (componentName === 'ScenarioBlock') {
    return <EditableScenarioBlock content={content} onDataChange={onDataChange} />;
  }

  // LabeledImage
  if (componentName === 'LabeledImageBlock') {
    return <EditableLabeledImageBlock content={content} onDataChange={onDataChange} />;
  }

  // Separator
  if (componentName === 'SeparatorBlock') {
    return <EditableSeparatorBlock content={content} onDataChange={onDataChange} />;
  }

  // Banner
  if (componentName === 'BannerBlock') {
    return <EditableBannerBlock content={content} onDataChange={onDataChange} />;
  }

  // Everything else (Graph, etc.): show as-is
  return <CourseComponent component={component} />;
}
