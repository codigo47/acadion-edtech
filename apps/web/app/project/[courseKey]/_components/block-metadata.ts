import {
  Type,
  Heading1,
  Heading2,
  Highlighter,
  Image,
  Quote,
  GitCompare,
  MessageSquare,
  Table2,
  List,
  ChevronDown,
  Layers,
  CircleDot,
  ListChecks,
  Sparkles,
  GripVertical,
  Video,
  Music,
  Paperclip,
  Code,
  LayoutGrid,
  Star,
  Clock,
  BarChart3,
  CheckSquare,
  GalleryHorizontal,
  BookOpen,
  Tag,
  ArrowDownUp,
  ListOrdered,
  MousePointer,
  Minus,
  MessageCircle,
  Users,
  HelpCircle,
  MessagesSquare,
  PenTool,
  Flag,
  type LucideIcon,
} from 'lucide-react';

export interface BlockMeta {
  icon: LucideIcon;
  color: string;
  textColor: string;
  group: string | null;
  label: string;
}

export const blockMetadata: Record<string, BlockMeta> = {
  // Paragraph group (blue)
  ParagraphBlock: { icon: Type, color: 'bg-blue-100', textColor: 'text-blue-700', group: 'paragraph', label: 'Paragraph' },
  ParagraphWithHeadingBlock: { icon: Type, color: 'bg-blue-100', textColor: 'text-blue-700', group: 'paragraph', label: 'Paragraph + Heading' },
  ParagraphWithSubheadingBlock: { icon: Type, color: 'bg-blue-100', textColor: 'text-blue-700', group: 'paragraph', label: 'Paragraph + Subheading' },

  // Heading group (indigo)
  HeadingBlock: { icon: Heading1, color: 'bg-indigo-100', textColor: 'text-indigo-700', group: 'heading', label: 'Heading' },
  SubheadingBlock: { icon: Heading2, color: 'bg-indigo-100', textColor: 'text-indigo-700', group: 'heading', label: 'Subheading' },

  // Highlight group (amber)
  HighlightBlock: { icon: Highlighter, color: 'bg-amber-100', textColor: 'text-amber-700', group: 'highlight', label: 'Highlight' },
  HighlightNoteBlock: { icon: Highlighter, color: 'bg-amber-100', textColor: 'text-amber-700', group: 'highlight', label: 'Highlight Note' },
  HighlightColumnBlock: { icon: Highlighter, color: 'bg-amber-100', textColor: 'text-amber-700', group: 'highlight', label: 'Highlight Column' },
  HighlightCenterLineBlock: { icon: Highlighter, color: 'bg-amber-100', textColor: 'text-amber-700', group: 'highlight', label: 'Highlight Center' },
  HighlightLeftLineBlock: { icon: Highlighter, color: 'bg-amber-100', textColor: 'text-amber-700', group: 'highlight', label: 'Highlight Left' },
  HighlightBackgroundBlock: { icon: Highlighter, color: 'bg-amber-100', textColor: 'text-amber-700', group: 'highlight', label: 'Highlight Background' },

  // Image group (emerald)
  ImageBlock: { icon: Image, color: 'bg-emerald-100', textColor: 'text-emerald-700', group: 'image', label: 'Image' },
  ImageWithTextBlock: { icon: Image, color: 'bg-emerald-100', textColor: 'text-emerald-700', group: 'image', label: 'Image + Text' },
  ImageWithTextLeftBlock: { icon: Image, color: 'bg-emerald-100', textColor: 'text-emerald-700', group: 'image', label: 'Image + Text Left' },
  ImageWithTextCenterBlock: { icon: Image, color: 'bg-emerald-100', textColor: 'text-emerald-700', group: 'image', label: 'Image + Text Center' },
  ImageWithTextBottomBlock: { icon: Image, color: 'bg-emerald-100', textColor: 'text-emerald-700', group: 'image', label: 'Image + Text Bottom' },
  ImageWithTextTopBlock: { icon: Image, color: 'bg-emerald-100', textColor: 'text-emerald-700', group: 'image', label: 'Image + Text Top' },

  // Quote group (green)
  QuoteBlock: { icon: Quote, color: 'bg-green-100', textColor: 'text-green-700', group: 'quote', label: 'Quote' },
  QuoteCenterBorderBlock: { icon: Quote, color: 'bg-green-100', textColor: 'text-green-700', group: 'quote', label: 'Quote Center Border' },
  QuoteCenterLightBlock: { icon: Quote, color: 'bg-green-100', textColor: 'text-green-700', group: 'quote', label: 'Quote Center Light' },
  QuoteLeftLightBlock: { icon: Quote, color: 'bg-green-100', textColor: 'text-green-700', group: 'quote', label: 'Quote Left Light' },
  QuoteLeftBlock: { icon: Quote, color: 'bg-green-100', textColor: 'text-green-700', group: 'quote', label: 'Quote Left' },
  QuoteImageBlock: { icon: Quote, color: 'bg-green-100', textColor: 'text-green-700', group: 'quote', label: 'Quote Image' },

  // Comparison blocks (purple) — each has incompatible data, no style switching
  ComparisonBlock: { icon: GitCompare, color: 'bg-purple-100', textColor: 'text-purple-700', group: null, label: 'Comparison' },
  ComparisonProsConsBlock: { icon: GitCompare, color: 'bg-purple-100', textColor: 'text-purple-700', group: null, label: 'Pros & Cons' },
  ComparisonCauseEffectBlock: { icon: GitCompare, color: 'bg-purple-100', textColor: 'text-purple-700', group: null, label: 'Cause & Effect' },
  ComparisonDosDontsBlock: { icon: GitCompare, color: 'bg-purple-100', textColor: 'text-purple-700', group: null, label: "Do's & Don'ts" },
  ComparisonMythFactBlock: { icon: GitCompare, color: 'bg-purple-100', textColor: 'text-purple-700', group: null, label: 'Myth vs Fact' },
  ComparisonBeforeAfterBlock: { icon: GitCompare, color: 'bg-purple-100', textColor: 'text-purple-700', group: null, label: 'Before & After' },

  // Chat group (teal)
  ChatBlock: { icon: MessageSquare, color: 'bg-teal-100', textColor: 'text-teal-700', group: 'chat', label: 'Chat' },
  ChatFeedbackBlock: { icon: MessageCircle, color: 'bg-teal-100', textColor: 'text-teal-700', group: 'chat', label: 'Chat Feedback' },
  ChatQABlock: { icon: HelpCircle, color: 'bg-teal-100', textColor: 'text-teal-700', group: 'chat', label: 'Chat Q&A' },
  ChatQuestionWallBlock: { icon: MessagesSquare, color: 'bg-teal-100', textColor: 'text-teal-700', group: 'chat', label: 'Question Wall' },
  ChatDialogBlock: { icon: Users, color: 'bg-teal-100', textColor: 'text-teal-700', group: 'chat', label: 'Chat Dialog' },

  // Sorting group (orange)
  SortingBlock: { icon: ArrowDownUp, color: 'bg-orange-100', textColor: 'text-orange-700', group: 'sorting', label: 'Sorting' },
  SortingStepsBlock: { icon: ListOrdered, color: 'bg-orange-100', textColor: 'text-orange-700', group: 'sorting', label: 'Sorting Steps' },

  // Button group (rose)
  ButtonBlock: { icon: MousePointer, color: 'bg-rose-100', textColor: 'text-rose-700', group: 'button', label: 'Button' },
  ButtonStackBlock: { icon: MousePointer, color: 'bg-rose-100', textColor: 'text-rose-700', group: 'button', label: 'Button Stack' },

  // Unique blocks (no group)
  TableBlock: { icon: Table2, color: 'bg-slate-100', textColor: 'text-slate-700', group: null, label: 'Table' },
  ListBlock: { icon: List, color: 'bg-slate-100', textColor: 'text-slate-700', group: null, label: 'List' },
  AccordionBlock: { icon: ChevronDown, color: 'bg-slate-100', textColor: 'text-slate-700', group: null, label: 'Accordion' },
  TabsBlock: { icon: Layers, color: 'bg-slate-100', textColor: 'text-slate-700', group: null, label: 'Tabs' },
  GalleryBlock: { icon: GalleryHorizontal, color: 'bg-slate-100', textColor: 'text-slate-700', group: null, label: 'Gallery' },
  GraphBlock: { icon: BarChart3, color: 'bg-slate-100', textColor: 'text-slate-700', group: null, label: 'Graph' },
  TimelineBlock: { icon: Clock, color: 'bg-slate-100', textColor: 'text-slate-700', group: null, label: 'Timeline' },
  SeparatorBlock: { icon: Minus, color: 'bg-gray-100', textColor: 'text-gray-500', group: null, label: 'Separator' },
  TestimonialBlock: { icon: Star, color: 'bg-slate-100', textColor: 'text-slate-700', group: null, label: 'Testimonial' },
  StoryTellingBlock: { icon: BookOpen, color: 'bg-slate-100', textColor: 'text-slate-700', group: null, label: 'Storytelling' },
  ColumnsBlock: { icon: LayoutGrid, color: 'bg-slate-100', textColor: 'text-slate-700', group: null, label: 'Columns' },
  ReviewsBlock: { icon: Star, color: 'bg-slate-100', textColor: 'text-slate-700', group: null, label: 'Reviews' },

  // Media blocks (gray)
  VideoBlock: { icon: Video, color: 'bg-gray-100', textColor: 'text-gray-700', group: null, label: 'Video' },
  AudioBlock: { icon: Music, color: 'bg-gray-100', textColor: 'text-gray-700', group: null, label: 'Audio' },
  AttachmentBlock: { icon: Paperclip, color: 'bg-gray-100', textColor: 'text-gray-700', group: null, label: 'Attachment' },
  EmbedBlock: { icon: Code, color: 'bg-gray-100', textColor: 'text-gray-700', group: null, label: 'Embed' },

  // Interactive blocks (orange)
  CheckboxBlock: { icon: CheckSquare, color: 'bg-orange-100', textColor: 'text-orange-700', group: null, label: 'Checkbox' },
  CarouselBlock: { icon: GalleryHorizontal, color: 'bg-orange-100', textColor: 'text-orange-700', group: null, label: 'Carousel' },
  LabeledImageBlock: { icon: Tag, color: 'bg-orange-100', textColor: 'text-orange-700', group: null, label: 'Labeled Image' },
  ScenarioBlock: { icon: PenTool, color: 'bg-orange-100', textColor: 'text-orange-700', group: null, label: 'Scenario' },
  FlashCardBlock: { icon: Layers, color: 'bg-orange-100', textColor: 'text-orange-700', group: null, label: 'Flash Card' },

  // Banner block (violet)
  BannerBlock: { icon: Flag, color: 'bg-violet-100', textColor: 'text-violet-700', group: null, label: 'Banner' },

  // Evaluation blocks (red)
  MultipleChoiceBlock: { icon: CircleDot, color: 'bg-red-100', textColor: 'text-red-700', group: null, label: 'Multiple Choice' },
  MultipleResponseBlock: { icon: ListChecks, color: 'bg-red-100', textColor: 'text-red-700', group: null, label: 'Multiple Response' },
  FillInTheBlankBlock: { icon: Type, color: 'bg-red-100', textColor: 'text-red-700', group: null, label: 'Fill in the Blank' },
  MatchingPairsBlock: { icon: GitCompare, color: 'bg-red-100', textColor: 'text-red-700', group: null, label: 'Matching Pairs' },
};

export function getBlockMeta(componentName: string): BlockMeta {
  return blockMetadata[componentName] || {
    icon: Sparkles,
    color: 'bg-gray-100',
    textColor: 'text-gray-600',
    group: null,
    label: componentName.replace(/Block$/, ''),
  };
}

export function getGroupVariants(group: string | null): string[] {
  if (!group) return [];
  return Object.entries(blockMetadata)
    .filter(([, meta]) => meta.group === group)
    .map(([name]) => name);
}
