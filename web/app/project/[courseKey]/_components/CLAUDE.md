# Course Editor Components

## Overview

The course editor at `/project/[courseKey]` allows inline editing of course content. This directory contains all editor-specific components.

## Component Hierarchy

```
page.tsx (Course Editor Page — ~2000 lines)
└── EditorContent.tsx (Content area with drag-drop)
    └── EditorBlock.tsx (Wrapper per component)
        ├── Top bar: type tag, toolbar (AI, Properties, Preview, Duplicate, Delete), drag handle
        ├── EditableCourseComponent.tsx (Inline editor — ~3800 lines, main file)
        ├── BlockFooter.tsx (Style controls: font size, alignment, text color, spacing, background)
        └── PropertiesPopup.tsx (Per-block-type properties: zoomable, autoPlay, etc.)
```

## Key Files

### `EditableCourseComponent.tsx` (~3800 lines)

The largest file — contains all inline editable versions of blocks. Structured as:

1. **`EditableCourseComponent`** function (lines 1-230) — Router that matches `componentName` to the right editor
2. **Helper components** (lines 230+):
   - `EditableText` — Contenteditable with 2s debounce save on blur/idle
   - `EditableItemsBlock` — Generic items editor (add/remove/reorder items)
   - `EditableImageBlock` — Image with picker overlay
   - `EditableImageWithTextBlock` — Side-by-side image + text
   - `EditableMultipleChoiceBlock`, `EditableTableBlock`, etc. — Specialized editors
   - `TwoListColumnEditor` — For comparison blocks (pros/cons, dos/don'ts, etc.)

### `EditorBlock.tsx`

Wrapper for each component with:
- Style variant dropdown (when block has `groupKey` with multiple variants)
- Toolbar: AI prompt, Properties, Preview, Duplicate, Delete (with confirmation)
- Drag handle for reordering
- `blockStylesToCss()` applied to content wrapper div
- `BlockFooter` with style controls

### `BlockFooter.tsx`

Bottom bar with styling controls. Saves to `content.blockStyles`:

```typescript
interface BlockStyles {
  marginTop?: string;    // none | small | medium | large
  marginBottom?: string; // none | small | medium | large
  backgroundColor?: string; // hex color
  textColor?: string;    // hex color → sets --block-text-color CSS var
  textAlign?: string;    // left | center | right
  fontSize?: string;     // small | normal | large | xlarge
}
```

**`blockStylesToCss()`** converts BlockStyles to React.CSSProperties + `--block-text-color` CSS variable. Used in three places:
1. `EditorBlock.tsx` — editor view wrapper
2. `CourseComponent.tsx` — preview modal wrapper
3. `CoursePlayer.tsx` — LMS player wrapper

Also renders **image size presets** (25%-75%) for ImageWithTextBlock and ImageWithTextLeftBlock.

### `PropertiesPopup.tsx`

Per-block-type properties popup. Opens from toolbar gear icon. Properties saved directly to `content`:

| Component | Properties |
|-----------|-----------|
| ImageBlock, ImageWithText* | zoomable (toggle) |
| GalleryBlock | zoomable (toggle) |
| CarouselBlock | autoPlay (toggle), autoPlayInterval (number 3-10) |
| TableBlock | headerRow (toggle), stripedRows (toggle) |
| AccordionBlock | openFirst (toggle) |
| TabsBlock | openFirst (toggle) |

### `EditableText.tsx`

Inline contenteditable element with:
- 2-second idle debounce
- Save on blur
- Placeholder via CSS `data-editable-placeholder`
- Configurable HTML tag (p, h1, h2, h3, div, span)
- Multiline toggle (prevents Enter in single-line mode)

### `block-metadata.ts`

Maps `componentName` → `{ icon, color, textColor, group, label }`:
- `icon`: Lucide icon component
- `color`: Tailwind bg class (e.g., `bg-blue-100`)
- `textColor`: Tailwind text class
- `group`: Group key for style switching (null = no switching)
- `label`: Human-readable name shown in editor

### `types.ts`

```typescript
interface UnitComponent {
  id: number;
  componentName: string;
  name: string;
  module: number;
  unit: number;
  sequence: number;
  content: { title?: string; text?: string; items?: any[]; ... };
  groupKey?: string | null;
  componentId: number;
}
```

## Data Flow

```
User edits content
→ EditableText.onChange / onDataChange callback
→ EditorContent.handleDataChange(componentId, newData)
→ useUpdateComponentData mutation (optimistic update)
→ PATCH /api/v1/course/components/:id/data
→ Prisma updates CourseComponent.data JSON
```

## Patterns

### Delete Confirmation
Always show inline "Delete? Yes/No" before destructive actions:
```typescript
const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
// Show: "Delete?" + Yes/No buttons
// Never use opacity-0 group-hover on delete buttons — keep always visible
```

### Delete Button Visibility
Delete buttons must always be visible with muted styling:
```
text-gray-300 hover:text-red-500 transition-colors
```
Do NOT use `opacity-0 group-hover:opacity-100` on delete buttons.

### Image Picker
Use `ImagePickerModal` for any image selection:
```typescript
const [showPicker, setShowPicker] = useState(false);
// ... <ImageOverlay image={url} onChangeImage={() => setShowPicker(true)} />
// ... {showPicker && <ImagePickerModal currentUrl={url} onSelect={...} onClose={...} />}
```

### Foreground Color in Editors
All inline editor components must use `var(--block-text-color, <fallback>)`:
```typescript
style={{ color: 'var(--block-text-color, #6B7280)' }}
// NOT: style={{ color: '#6B7280' }}
// NOT: className="text-gray-700" (Tailwind overrides CSS var)
```

### courseColors Prop

Branding colors are threaded from page.tsx → EditorContent → EditorBlock → BlockFooter:
```
page.tsx:          courseColors={[visualIdentity.primaryColor, visualIdentity.secondaryColor]}
EditorContent:     courseColors prop → passes to <EditorBlock courseColors={courseColors}>
EditorBlock:       courseColors prop → passes to <BlockFooter courseColors={courseColors}>
```

### Heading↔Subheading Data Migration

When switching between HeadingBlock and SubheadingBlock via the style dropdown, `handleSwitchStyle` in EditorContent.tsx automatically copies `data.heading` ↔ `data.subheading` so content is preserved across the switch.

### groupVariants

The variant dropdown for style switching is powered by `groupVariants` from the backend (`GET /course/:key/components`). This returns ALL sibling components for each `groupKey`, not just the ones used in the current course. This ensures the dropdown always shows all available variants.

### Input Save Pattern
Never save on every keystroke. Two patterns:
1. **EditableText** — 2s debounce + blur save (preferred)
2. **Local state + onBlur** — For inputs that can't use EditableText:
```typescript
const [localValue, setLocalValue] = useState(initialValue);
<input value={localValue} onChange={e => setLocalValue(e.target.value)}
       onBlur={() => onDataChange({ ...content, field: localValue })} />
```
