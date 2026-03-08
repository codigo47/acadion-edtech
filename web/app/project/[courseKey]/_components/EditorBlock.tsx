'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  GripVertical,
  Sparkles,
  Eye,
  Copy,
  Trash2,
  ChevronDown,
  Settings,
} from 'lucide-react';
import { getBlockMeta } from './block-metadata';
import { EditableCourseComponent } from './EditableCourseComponent';
import { FormatToolBar } from '@/app/components/FormatToolBar';
import { blockStylesToCss, blockStylesToFormat, formatToBlockStyles, type BlockStyles } from '@/lib/block-styles';
import { SeparatorSecondRow, ScenarioSecondRow, TablePresetControl, ImageSizeSecondRow, ColumnsControl } from './block-toolbar-rows';
import { PropertiesPopup } from './PropertiesPopup';
import type { UnitComponent } from './types';

// Components that hide ALL text controls (formatting, color, alignment, font size)
const NO_TEXT_CONTROLS = new Set([
  'ImageBlock',
  'VideoBlock',
  'AudioBlock',
  'AttachmentBlock',
  'EmbedBlock',
  'GalleryBlock',
  'LabeledImageBlock',
  'GraphBlock',
]);

// Components that hide text formatting, color and alignment but keep font size
const NO_TEXT_KEEP_FONT_SIZE = new Set([
  'SeparatorBlock',
  'ScenarioBlock',
]);

// Components that only hide font size (they have their own fixed sizing)
const NO_FONT_SIZE = new Set([
  'HeadingBlock',
  'SubheadingBlock',
  'TableBlock',
  'CarouselBlock',
  'FlashCardBlock',
  'MultipleChoiceBlock',
  'MultipleResponseBlock',
  'FillInTheBlankBlock',
  'MatchingPairsBlock',
  'SortingBlock',
  'SortingStepsBlock',
  'ButtonBlock',
  'ButtonStackBlock',
  'BannerBlock',
  'TimelineBlock',
  'CheckboxBlock',
]);

function getHideControls(componentName?: string): Set<string> {
  const hidden = new Set(['vAlign', 'lineColor', 'superSub']);
  if (!componentName) return hidden;

  if (NO_TEXT_CONTROLS.has(componentName)) {
    hidden.add('textFormatting');
    hidden.add('textColor');
    hidden.add('hAlign');
    hidden.add('fontSize');
  } else if (NO_TEXT_KEEP_FONT_SIZE.has(componentName)) {
    hidden.add('textFormatting');
    hidden.add('textColor');
    hidden.add('hAlign');
  } else if (NO_FONT_SIZE.has(componentName)) {
    hidden.add('fontSize');
  }
  return hidden;
}

function getExtraControls(
  componentName: string | undefined,
  content: Record<string, unknown>,
  onDataChange: (data: Record<string, unknown>) => void,
  projectColors?: string[],
): React.ReactNode | undefined {
  switch (componentName) {
    case 'SeparatorBlock':
      return <SeparatorSecondRow content={content} onDataChange={onDataChange} projectColors={projectColors} />;
    case 'ScenarioBlock':
      return <ScenarioSecondRow content={content} onDataChange={onDataChange} projectColors={projectColors} />;
    case 'TableBlock':
      return <TablePresetControl content={content} onDataChange={onDataChange} />;
    case 'ImageWithTextBlock':
    case 'ImageWithTextLeftBlock':
      return <ImageSizeSecondRow content={content} onDataChange={onDataChange} />;
    case 'ColumnsBlock':
      return <ColumnsControl content={content} onDataChange={onDataChange} />;
    default:
      return undefined;
  }
}

interface EditorBlockProps {
  component: UnitComponent;
  componentId: number;
  componentDbId: number;
  groupKey: string | null;
  name: string;
  onDelete: (id: number) => void;
  onDuplicate: (id: number) => void;
  onPreview: () => void;
  onAIPrompt: () => void;
  onSwitchStyle: (id: number, newComponentId: number) => void;
  onDragStart: (id: number) => void;
  onDragOver: (e: React.DragEvent, id: number) => void;
  onDragEnd: () => void;
  isDragging: boolean;
  onDataChange: (data: Record<string, unknown>) => void;
  availableVariants?: Array<{ componentName: string; componentId: number; name: string }>;
  courseColors?: string[];
}

export function EditorBlock({
  component,
  componentId,
  componentDbId,
  groupKey,
  name,
  onDelete,
  onDuplicate,
  onPreview,
  onAIPrompt,
  onSwitchStyle,
  onDragStart,
  onDragOver,
  onDragEnd,
  isDragging,
  onDataChange,
  availableVariants,
  courseColors,
}: EditorBlockProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showStyleDropdown, setShowStyleDropdown] = useState(false);
  const [showProperties, setShowProperties] = useState(false);
  const styleDropdownRef = useRef<HTMLDivElement>(null);
  const propertiesRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);

  // Local blockStyles state for instant UI response + debounced save
  const content = component.content as Record<string, unknown>;
  const serverBlockStyles = (content?.blockStyles as BlockStyles) || {};
  const [localBlockStyles, setLocalBlockStyles] = useState<BlockStyles>(serverBlockStyles);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Sync from server when server data changes (e.g. after AI edit, undo, etc.)
  useEffect(() => {
    setLocalBlockStyles(serverBlockStyles);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(serverBlockStyles)]);

  const handleFormatChange = useCallback((newStyles: BlockStyles) => {
    setLocalBlockStyles(newStyles);
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      onDataChange({ ...content, blockStyles: newStyles });
    }, 600);
  }, [content, onDataChange]);

  // Flush pending save on unmount
  useEffect(() => () => clearTimeout(saveTimerRef.current), []);

  const meta = getBlockMeta(component.componentName);
  const Icon = meta.icon;
  const hasVariants = groupKey && availableVariants && availableVariants.length > 1;

  // Close style dropdown on click outside
  useEffect(() => {
    if (!showStyleDropdown) return;
    const handleClick = (e: MouseEvent) => {
      if (styleDropdownRef.current && !styleDropdownRef.current.contains(e.target as Node)) {
        setShowStyleDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showStyleDropdown]);

  return (
    <div
      ref={blockRef}
      className={`relative bg-white rounded-xl border-2 transition-all duration-200 ${
        isDragging
          ? 'opacity-50 scale-[1.02] shadow-xl border-[#9F80DA] ring-2 ring-[#9F80DA]/20'
          : 'border-gray-200 hover:border-[#9F80DA]'
      }`}
      onDragOver={(e) => onDragOver(e, componentId)}
    >
      {/* Top bar — absolute center for toolbar */}
      <div className="relative flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200 rounded-t-xl">
        {/* Left: Component type tag (dropdown when hasVariants) */}
        {hasVariants ? (
          <div className="relative z-10" ref={styleDropdownRef}>
            <button
              onClick={() => setShowStyleDropdown(!showStyleDropdown)}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors ${meta.color} hover:opacity-80`}
            >
              <Icon className={`w-3.5 h-3.5 ${meta.textColor}`} />
              <span className={`text-xs font-medium ${meta.textColor}`}>{meta.label}</span>
              <ChevronDown className={`w-3 h-3 ${meta.textColor} transition-transform ${showStyleDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showStyleDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 w-max">
                {availableVariants!.map((variant) => {
                  const variantMeta = getBlockMeta(variant.componentName);
                  const VIcon = variantMeta.icon;
                  const isActive = variant.componentId === componentDbId;
                  return (
                    <button
                      key={variant.componentId}
                      onClick={() => {
                        if (!isActive) {
                          onSwitchStyle(componentId, variant.componentId);
                        }
                        setShowStyleDropdown(false);
                      }}
                      className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors whitespace-nowrap ${
                        isActive
                          ? 'bg-[#9F80DA]/10 text-[#9F80DA] font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <VIcon className="w-4 h-4" />
                      <span>{variant.name}</span>
                      {isActive && (
                        <span className="ml-auto text-xs text-[#9F80DA]">Current</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className={`relative z-10 flex items-center gap-1.5 px-2 py-1 rounded-md ${meta.color}`}>
            <Icon className={`w-3.5 h-3.5 ${meta.textColor}`} />
            <span className={`text-xs font-medium ${meta.textColor}`}>{meta.label}</span>
          </div>
        )}

        {/* Center: Action toolbar — absolutely centered across full width */}
        <div className="absolute inset-x-0 flex items-center justify-center gap-1 pointer-events-none">
          <div className="flex items-center gap-1 pointer-events-auto">
          <ToolbarButton
            icon={<Sparkles className="w-5 h-5" />}
            tooltip="AI"
            onClick={onAIPrompt}
          />
          <div className="relative" ref={propertiesRef}>
            <ToolbarButton
              icon={<Settings className="w-5 h-5" />}
              tooltip="Properties"
              onClick={() => setShowProperties(!showProperties)}
              active={showProperties}
            />
            {showProperties && (
              <PropertiesPopup
                componentName={component.componentName}
                content={component.content as Record<string, unknown>}
                onDataChange={onDataChange}
                onClose={() => setShowProperties(false)}
              />
            )}
          </div>
          <ToolbarButton
            icon={<Eye className="w-5 h-5" />}
            tooltip="Preview"
            onClick={onPreview}
          />
          <ToolbarButton
            icon={<Copy className="w-5 h-5" />}
            tooltip="Duplicate"
            onClick={() => onDuplicate(componentId)}
          />
          {showDeleteConfirm ? (
            <div className="flex items-center gap-1 px-2 py-1 bg-red-50 rounded-md">
              <span className="text-xs text-red-600 font-medium">Delete?</span>
              <button
                onClick={() => {
                  onDelete(componentId);
                  setShowDeleteConfirm(false);
                }}
                className="px-2 py-0.5 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded transition-colors"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
              >
                No
              </button>
            </div>
          ) : (
            <ToolbarButton
              icon={<Trash2 className="w-5 h-5" />}
              tooltip="Delete"
              onClick={() => setShowDeleteConfirm(true)}
              variant="danger"
            />
          )}
          </div>
        </div>

        {/* Right: Drag handle */}
        <div
          draggable
          onDragStart={(e) => {
            if (blockRef.current) {
              const rect = blockRef.current.getBoundingClientRect();
              e.dataTransfer.setDragImage(
                blockRef.current,
                e.clientX - rect.left,
                e.clientY - rect.top,
              );
            }
            onDragStart(componentId);
          }}
          onDragEnd={onDragEnd}
          className="relative z-10 cursor-grab active:cursor-grabbing p-1 rounded hover:bg-gray-200 transition-colors text-gray-400 hover:text-gray-600 select-none"
        >
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      {/* Component content */}
      <div
        style={blockStylesToCss(localBlockStyles)}
        className="rounded-lg"
      >
        <EditableCourseComponent component={component} onDataChange={onDataChange} />
      </div>

      {/* Block footer with styling controls */}
      <FormatToolBar
        variant="inline"
        format={blockStylesToFormat(localBlockStyles)}
        onChange={(fmt) => handleFormatChange(formatToBlockStyles(fmt))}
        projectColors={courseColors}
        hideControls={getHideControls(component.componentName)}
        extraControls={getExtraControls(component.componentName, content, onDataChange, courseColors)}
      />
    </div>
  );
}

function ToolbarButton({
  icon,
  tooltip,
  onClick,
  variant = 'default',
  active = false,
}: {
  icon: React.ReactNode;
  tooltip: string;
  onClick: () => void;
  variant?: 'default' | 'danger';
  active?: boolean;
}) {
  return (
    <div className="relative group/tooltip">
      <button
        onClick={onClick}
        className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
          active
            ? 'bg-[#9F80DA] text-white'
            : variant === 'danger'
              ? 'text-gray-500 hover:bg-red-50 hover:text-red-500'
              : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700'
        }`}
      >
        {icon}
      </button>
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 text-xs text-white bg-gray-800 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
        {tooltip}
      </span>
    </div>
  );
}
