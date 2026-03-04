'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { HeadingBlock } from '../../../components/blocks';
import { CustomScrollbar } from '../../../components/CustomScrollbar';
import { EditorBlock } from './EditorBlock';
import { PreviewModal } from './PreviewModal';
import { AIPromptModal } from './AIPromptModal';
import { getBlockMeta, getGroupVariants, blockMetadata } from './block-metadata';
import {
  useDeleteComponent,
  useDuplicateComponent,
  useReorderComponents,
  useUpdateComponentData,
  useSwitchComponentStyle,
} from '../../../../lib/hooks/use-course-editor';
import type { UnitComponent } from './types';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface CourseComponentData {
  id: number;
  module: number;
  unit: number;
  sequence: number;
  componentName: string;
  componentType: 'static' | 'interactive' | 'evaluation';
  componentId?: number;
  groupKey?: string | null;
  data: Record<string, unknown>;
  name?: string;
}

interface ProposedIndex {
  title: string;
  modules: Array<{
    number: number;
    title: string;
    units: Array<{ code: string; title: string }>;
  }>;
}

interface EditorContentProps {
  courseKey: string;
  proposedIndex: ProposedIndex;
  components: CourseComponentData[];
  onSaveStatusChange?: (status: SaveStatus) => void;
}

export function EditorContent({
  courseKey,
  proposedIndex,
  components,
  onSaveStatusChange,
}: EditorContentProps) {
  // Drag state — SortingSteps-style live reorder
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [localComponents, setLocalComponents] = useState(components);
  const draggedIdRef = useRef<number | null>(null);
  const localComponentsRef = useRef(localComponents);

  // Modal state
  const [previewComponent, setPreviewComponent] = useState<UnitComponent | null>(null);
  const [aiPromptComponent, setAiPromptComponent] = useState<{ id: number; name: string } | null>(null);
  // Save status
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const saveTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Sync local components from props when not dragging
  useEffect(() => {
    if (draggedIdRef.current === null) {
      const sorted = [...components].sort((a, b) => {
        if (a.module !== b.module) return a.module - b.module;
        if (a.unit !== b.unit) return a.unit - b.unit;
        return a.sequence - b.sequence;
      });
      setLocalComponents(sorted);
      localComponentsRef.current = sorted;
    }
  }, [components]);

  useEffect(() => {
    localComponentsRef.current = localComponents;
  }, [localComponents]);

  // Mutations
  const deleteComponent = useDeleteComponent(courseKey);
  const duplicateComponent = useDuplicateComponent(courseKey);
  const reorderComponents = useReorderComponents(courseKey);
  const updateComponentData = useUpdateComponentData(courseKey);
  const switchComponentStyle = useSwitchComponentStyle(courseKey);

  // Notify parent of save status changes
  useEffect(() => {
    onSaveStatusChange?.(saveStatus);
  }, [saveStatus, onSaveStatusChange]);

  const updateSaveStatus = useCallback((status: SaveStatus) => {
    setSaveStatus(status);
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    if (status === 'saved') {
      fadeTimerRef.current = setTimeout(() => setSaveStatus('idle'), 5000);
    }
  }, []);

  // Build variants lookup (group → available component variants)
  const variantsMap = useMemo(() => {
    const map = new Map<string, Array<{ componentName: string; componentId: number; name: string }>>();
    for (const comp of components) {
      if (comp.groupKey && comp.componentId) {
        if (!map.has(comp.groupKey)) {
          const groupNames = getGroupVariants(comp.groupKey);
          map.set(comp.groupKey, []);
        }
      }
    }
    for (const comp of components) {
      if (comp.groupKey && comp.componentId) {
        const variants = map.get(comp.groupKey);
        if (variants && !variants.find((v) => v.componentId === comp.componentId)) {
          variants.push({
            componentName: comp.componentName,
            componentId: comp.componentId,
            name: comp.name || getBlockMeta(comp.componentName).label,
          });
        }
      }
    }
    return map;
  }, [components]);

  // Handlers
  const handleDelete = useCallback(
    (id: number) => {
      updateSaveStatus('saving');
      deleteComponent.mutate(
        { id },
        {
          onSuccess: () => updateSaveStatus('saved'),
          onError: () => updateSaveStatus('error'),
        },
      );
    },
    [deleteComponent, updateSaveStatus],
  );

  const handleDuplicate = useCallback(
    (id: number) => {
      updateSaveStatus('saving');
      duplicateComponent.mutate(
        { id },
        {
          onSuccess: () => updateSaveStatus('saved'),
          onError: () => updateSaveStatus('error'),
        },
      );
    },
    [duplicateComponent, updateSaveStatus],
  );

  const handleSwitchStyle = useCallback(
    (id: number, newComponentId: number) => {
      updateSaveStatus('saving');
      switchComponentStyle.mutate(
        { id, newComponentId },
        {
          onSuccess: () => updateSaveStatus('saved'),
          onError: () => updateSaveStatus('error'),
        },
      );
    },
    [switchComponentStyle, updateSaveStatus],
  );

  const handleDataChange = useCallback(
    (compId: number, newData: Record<string, unknown>) => {
      updateSaveStatus('saving');
      updateComponentData.mutate(
        { id: compId, data: newData },
        {
          onSuccess: () => updateSaveStatus('saved'),
          onError: () => updateSaveStatus('error'),
        },
      );
    },
    [updateComponentData, updateSaveStatus],
  );

  const handlePreview = useCallback(
    (comp: CourseComponentData) => {
      const unitComponent: UnitComponent = {
        componentName: comp.componentName,
        order: comp.sequence,
        content: (comp.data as Record<string, unknown>) || {},
        styles: undefined,
      };
      setPreviewComponent(unitComponent);
    },
    [],
  );

  const handleAIPrompt = useCallback(
    (comp: CourseComponentData) => {
      setAiPromptComponent({
        id: comp.id,
        name: comp.name || comp.componentName,
      });
    },
    [],
  );

  const handleAIGenerate = useCallback(
    (_prompt: string) => {
      setAiPromptComponent(null);
      updateSaveStatus('saved');
    },
    [updateSaveStatus],
  );

  // Drag and drop — SortingSteps-style live reorder
  const handleDragStart = useCallback((id: number) => {
    draggedIdRef.current = id;
    setDraggedId(id);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent, targetId: number) => {
      e.preventDefault();
      const dId = draggedIdRef.current;
      if (dId === null || dId === targetId) return;

      // Only swap when mouse crosses past the target's vertical midpoint
      const targetEl = (e.currentTarget as HTMLElement);
      const rect = targetEl.getBoundingClientRect();
      const mouseY = e.clientY;

      setLocalComponents((prev) => {
        const draggedIdx = prev.findIndex((c) => c.id === dId);
        const targetIdx = prev.findIndex((c) => c.id === targetId);
        if (draggedIdx === -1 || targetIdx === -1 || draggedIdx === targetIdx) return prev;

        // Require mouse to go 10% into the target before swapping
        if (draggedIdx < targetIdx && mouseY < rect.top + rect.height * 0.1) return prev;
        if (draggedIdx > targetIdx && mouseY > rect.top + rect.height * 0.9) return prev;

        const draggedComp = prev[draggedIdx];
        const targetComp = prev[targetIdx];
        if (draggedComp.module !== targetComp.module || draggedComp.unit !== targetComp.unit) return prev;

        const newComps = [...prev];
        const [removed] = newComps.splice(draggedIdx, 1);
        newComps.splice(targetIdx, 0, removed);
        localComponentsRef.current = newComps;
        return newComps;
      });
    },
    [],
  );

  const handleDragEnd = useCallback(() => {
    const dId = draggedIdRef.current;
    if (dId !== null) {
      const current = localComponentsRef.current;
      const draggedComp = current.find((c) => c.id === dId);
      if (draggedComp) {
        const unitComps = current.filter(
          (c) => c.module === draggedComp.module && c.unit === draggedComp.unit,
        );
        const originalUnitComps = components
          .filter((c) => c.module === draggedComp.module && c.unit === draggedComp.unit)
          .sort((a, b) => a.sequence - b.sequence);

        const orderChanged = unitComps.some(
          (c, idx) => originalUnitComps[idx]?.id !== c.id,
        );

        if (orderChanged) {
          const reorderItems = unitComps.map((c, idx) => ({
            id: c.id,
            sequence: idx + 1,
          }));
          updateSaveStatus('saving');
          reorderComponents.mutate(
            { courseKey, components: reorderItems },
            {
              onSuccess: () => updateSaveStatus('saved'),
              onError: () => updateSaveStatus('error'),
            },
          );
        }
      }
    }

    draggedIdRef.current = null;
    setDraggedId(null);
  }, [components, courseKey, reorderComponents, updateSaveStatus]);

  return (
    <>
      <CustomScrollbar>
        {localComponents.length > 0 && proposedIndex ? (
          <div className="max-w-4xl mx-auto py-8 px-4">
            {/* Course title */}
            {proposedIndex.title && (
              <HeadingBlock heading={proposedIndex.title} level={1} />
            )}

            {proposedIndex.modules.map((module) => {
              const moduleComponents = localComponents.filter(
                (c) => c.module === module.number,
              );
              const unitNumbers = [
                ...new Set(moduleComponents.map((c) => c.unit)),
              ].sort((a, b) => a - b);

              const allUnits = unitNumbers.map((unitNum) => {
                if (unitNum === 0) {
                  return {
                    code: `${module.number}.0`,
                    title: 'Introduction',
                    unitNum,
                  };
                }
                if (unitNum === 99) {
                  return {
                    code: `eval-m${module.number}`,
                    title: 'Evaluation',
                    unitNum,
                  };
                }
                const indexUnit = module.units.find(
                  (u) => u.code === `${module.number}.${unitNum}`,
                );
                return {
                  code: `${module.number}.${unitNum}`,
                  title: indexUnit?.title || `Unit ${unitNum}`,
                  unitNum,
                };
              });

              return (
                <div key={module.number} className="mb-12">
                  {/* Module header */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-[#1a1a1a]">
                      Module {module.number}: {module.title}
                    </h2>
                  </div>

                  {/* Units in this module */}
                  {allUnits.map((unit) => {
                    const unitComponents = moduleComponents
                      .filter((c) => c.unit === unit.unitNum);

                    if (unitComponents.length === 0) return null;

                    return (
                      <div
                        key={unit.code}
                        id={`unit-${unit.code}`}
                        className="mb-10"
                      >
                        {/* Unit header */}
                        <div className="mb-6 flex items-center gap-3">
                          <span className="px-3 py-1 bg-[#9F80DA] text-white text-sm font-medium rounded-full">
                            {unit.code}
                          </span>
                          <h3 className="text-xl font-semibold text-[#1a1a1a]">
                            {unit.title}
                          </h3>
                        </div>

                        {/* Unit components */}
                        <div className="space-y-3">
                          {unitComponents.map((comp) => {
                            const unitComponent: UnitComponent = {
                              componentName: comp.componentName,
                              order: comp.sequence,
                              content:
                                (comp.data as Record<string, unknown>) || {},
                              styles: undefined,
                            };

                            const variants = comp.groupKey
                              ? variantsMap.get(comp.groupKey)
                              : undefined;

                            return (
                              <div key={comp.id} id={`component-${comp.id}`}>
                                <EditorBlock
                                  component={unitComponent}
                                  componentId={comp.id}
                                  componentDbId={comp.componentId || 0}
                                  groupKey={comp.groupKey || null}
                                  name={comp.name || comp.componentName}
                                  onDelete={handleDelete}
                                  onDuplicate={handleDuplicate}
                                  onPreview={() => handlePreview(comp)}
                                  onAIPrompt={() => handleAIPrompt(comp)}
                                  onSwitchStyle={handleSwitchStyle}
                                  onDragStart={handleDragStart}
                                  onDragOver={handleDragOver}
                                  onDragEnd={handleDragEnd}
                                  isDragging={draggedId === comp.id}
                                  onDataChange={(data) => handleDataChange(comp.id, data)}
                                  availableVariants={variants}
                                />

                                {/* Add button below component */}
                                <div className="flex justify-center py-2">
                                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-white bg-gray-100 hover:bg-[#9F80DA] border border-gray-300 hover:border-[#9F80DA] rounded-lg transition-all shadow-sm">
                                    <Plus className="w-3.5 h-3.5" />
                                    Add component
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center h-full">
            <div className="text-center text-gray-400">
              <div className="w-8 h-8 border-2 border-[#9F80DA] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-lg">Loading course content...</p>
            </div>
          </div>
        )}
      </CustomScrollbar>

      {/* Preview Modal */}
      {previewComponent && (
        <PreviewModal
          component={previewComponent}
          onClose={() => setPreviewComponent(null)}
        />
      )}

      {/* AI Prompt Modal */}
      {aiPromptComponent && (
        <AIPromptModal
          componentName={aiPromptComponent.name}
          onClose={() => setAiPromptComponent(null)}
          onGenerate={handleAIGenerate}
        />
      )}
    </>
  );
}
