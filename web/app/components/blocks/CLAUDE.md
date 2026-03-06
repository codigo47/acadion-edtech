# Content Block System

## Overview

80+ reusable content blocks that render course content. Each block has two versions:

1. **Read-only** (this directory) — The canonical visual representation. Used in `/preview`, `/lms`, PreviewModal, and public portfolio pages via `CourseComponent` and `CoursePlayer`.
2. **Editor** (this directory, co-located) — Inline editable version used in `/project`. Each `FooBlock.tsx` has a corresponding `EditableFooBlock.tsx` in the same directory. Replaces static text with `EditableText`, adds image pickers, item add/remove controls, etc.

### File Naming Convention

- Read-only: `FooBlock.tsx` (default export)
- Editor: `EditableFooBlock.tsx` (named export)
- Shared editor helpers: `editable-helpers.tsx` (named exports: `BlurInput`, `TwoListColumnEditor`, `EditableItemsBlock`, `twoListConfig`)

The main router in `app/project/[courseKey]/_components/EditableCourseComponent.tsx` (~180 lines) imports all editors from this directory and dispatches by `componentName`.

### Visual Parity Rule

**Editor components MUST look identical to their read-only counterparts.** Same colors, fonts, spacing, border styles, backgrounds, and layout. The only differences allowed are:
- Text is editable (contenteditable via `EditableText`)
- Images are clickable to open `ImagePickerModal`
- Items have add/remove/reorder controls
- Placeholders shown for empty content

When modifying a read-only block's visual style (colors, padding, border-radius, typography), the corresponding `EditableFooBlock.tsx` in this directory must be updated to match, and vice versa. If a block uses shared base components (Paragraph, Heading, Highlight, Quote), the editor should use the same CSS classes and inline styles.

## Block Categories

| Category | Color | Group Key | Variants |
|----------|-------|-----------|----------|
| Paragraph | blue | `paragraph` | Paragraph, WithHeading, WithSubheading |
| Heading | indigo | `heading` | Heading, Subheading |
| Highlight | amber | `highlight` | Default, Note, Column, CenterLine, LeftLine, Background |
| Image | emerald | `image-text` | Image, WithText, WithTextLeft, WithTextCenter, WithTextBottom, WithTextTop |
| Quote | green | `quote` | Default, CenterBorder, CenterLight, LeftLight, Left, Image |
| Comparison | purple | null (no switching) | Default, ProsCons, CauseEffect, DosDonts, MythFact, BeforeAfter |
| Chat | teal | `chat` | Default, Feedback, QA, QuestionWall, Dialog |
| Interactive | orange | null | Checkbox, Carousel, Accordion, Tabs, LabeledImage, Scenario, Sorting, SortingSteps, FlashCard |
| Evaluation | red | null | MultipleChoice, MultipleResponse, FillInTheBlank, MatchingPairs |
| Button | pink | null | Button, ButtonStack, Banner |
| Media | gray | null | Video, Audio, Attachment, Embed |
| Layout | various | null | Table, List, Gallery, Graph, Timeline, Separator, Testimonial, StoryTelling, Columns, Reviews |

## Shared Types (`types.ts`)

```typescript
interface TextStyle {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  fontStyle?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: string;
}

interface BackgroundStyle {
  backgroundColor?: string;
  padding?: string;
  borderRadius?: string;
}

type BlockStyle = 'A' | 'B' | 'C';
```

## Block Component Pattern

```typescript
'use client';
import React from 'react';
import { TextStyle } from './types';

export interface MyBlockProps {
  content: string;
  textStyle?: TextStyle;
  dark?: boolean;
}

export default function MyBlock({
  content,
  textStyle = {},
  dark = false,
}: MyBlockProps) {
  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <p style={{
        fontSize: textStyle.fontSize,
        color: textStyle.color || (dark ? '#d1d5db' : 'var(--block-text-color, inherit)'),
        lineHeight: textStyle.lineHeight || '1.6',
      }}>
        {content}
      </p>
    </div>
  );
}
```

## Critical: CSS Variable for Text Color

`--block-text-color` is set by `blockStylesToCss()` on the wrapper div when the user picks a text color in BlockFooter. All blocks MUST use it as fallback:

```typescript
// CORRECT — respects BlockFooter text color
color: textStyle.color || (dark ? '#d1d5db' : 'var(--block-text-color, #374151)')

// WRONG — ignores BlockFooter text color
color: textStyle.color || (dark ? '#d1d5db' : '#374151')
color: textStyle.color || (dark ? '#d1d5db' : undefined)
```

For `undefined` fallbacks, use `'var(--block-text-color, inherit)'`.

## Critical: CSS Variable for Font Size

`--block-font-size` is set by `blockStylesToCss()` on the wrapper div when the user picks a font size in BlockFooter (same pattern as `--block-text-color`). Use it to respect user font size overrides:

```typescript
// In editable blocks — use var with appropriate fallback
style={{ fontSize: 'var(--block-font-size, 1rem)' }}

// Values: 0.875rem (S), 1rem (M), 1.125rem (L), 1.25rem (XL)
```

## Color Picker

Use `<ColorPicker>` from `app/components/ColorPicker.tsx` for ALL color selection UIs in block editors. Do not create inline color pickers.

## Shared Base Components

Most blocks delegate to shared components — edit these to affect many blocks at once:

- **`Paragraph.tsx`** — Used by ParagraphBlock, ParagraphWithHeadingBlock, ParagraphWithSubheadingBlock
- **`Heading.tsx`** — Used by HeadingBlock, SubheadingBlock, and any block with headings
- **`Highlight.tsx`** — Used by all HighlightBlock variants
- **`Quote.tsx`** — Used by QuoteBlock (others have their own)
- **`Comparison.tsx`** — Used by ComparisonBlock

## Block Registration

Blocks are registered in `app/project/[courseKey]/_components/CourseComponent.tsx`:

```typescript
export const BlockComponents: Record<string, ComponentType<any>> = {
  ParagraphBlock: Blocks.ParagraphBlock,
  HeadingBlock: Blocks.HeadingBlock,
  // ... all 80+ blocks
};
```

The `Blocks` import comes from `app/components/blocks/index.ts` barrel export.

## Adding a New Block

1. Create `MyNewBlock.tsx` in this directory with the standard pattern (default export)
2. Create `EditableMyNewBlock.tsx` in this directory with named export
3. Export both from `index.ts`
4. Register read-only block in `CourseComponent.tsx` (`BlockComponents` map)
5. Add block metadata in `_components/block-metadata.ts`
6. Add routing case in `_components/EditableCourseComponent.tsx` (imports from `@/app/components/blocks`)
7. Add to `Component` table in database (via migration or seed)

## Props Consumed From PropertiesPopup

These props are saved in `content` and must be read by the block:
- `zoomable` → ImageBlock, GalleryBlock
- `autoPlay`, `autoPlayInterval` → CarouselBlock
- `headerRow`, `stripedRows` → TableBlock
- `openFirst` → AccordionBlock, TabsBlock

## Dark Mode

All blocks accept `dark?: boolean`. Pattern:
- Light: default Tailwind colors
- Dark: explicit gray-800/900 backgrounds, lighter text colors
