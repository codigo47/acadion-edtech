-- AlterTable: Add group_key column to components
ALTER TABLE "components" ADD COLUMN "group_key" TEXT;

-- Populate groupKey values based on internalName
UPDATE "components" SET "group_key" = 'paragraph' WHERE "internalName" IN ('ParagraphBlock', 'ParagraphWithHeadingBlock', 'ParagraphWithSubheadingBlock');
UPDATE "components" SET "group_key" = 'heading' WHERE "internalName" IN ('HeadingBlock', 'SubheadingBlock');
UPDATE "components" SET "group_key" = 'highlight' WHERE "internalName" IN ('HighlightBlock', 'HighlightNoteBlock', 'HighlightColumnBlock', 'HighlightCenterLineBlock', 'HighlightLeftLineBlock', 'HighlightBackgroundBlock');
UPDATE "components" SET "group_key" = 'image' WHERE "internalName" IN ('ImageBlock', 'ImageWithTextBlock', 'ImageWithTextLeftBlock', 'ImageWithTextCenterBlock', 'ImageWithTextBottomBlock', 'ImageWithTextTopBlock');
UPDATE "components" SET "group_key" = 'quote' WHERE "internalName" IN ('QuoteBlock', 'QuoteCenterBorderBlock', 'QuoteCenterLightBlock', 'QuoteLeftLightBlock', 'QuoteLeftBlock', 'QuoteImageBlock');
UPDATE "components" SET "group_key" = 'comparison' WHERE "internalName" IN ('ComparisonBlock', 'ComparisonProsConsBlock', 'ComparisonCauseEffectBlock', 'ComparisonDosDontsBlock', 'ComparisonMythFactBlock', 'ComparisonBeforeAfterBlock');
UPDATE "components" SET "group_key" = 'chat' WHERE "internalName" IN ('ChatBlock', 'ChatFeedbackBlock', 'ChatQABlock', 'ChatQuestionWallBlock', 'ChatDialogBlock');
UPDATE "components" SET "group_key" = 'sorting' WHERE "internalName" IN ('SortingBlock', 'SortingStepsBlock');
UPDATE "components" SET "group_key" = 'button' WHERE "internalName" IN ('ButtonBlock', 'ButtonStackBlock');
