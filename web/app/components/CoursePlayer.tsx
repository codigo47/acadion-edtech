'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  useLmsCourseContent,
  useLmsUpdateProgress,
  type ProposedModule,
} from '../../lib/hooks/use-lms';
import { BlockComponents } from '../project/[courseKey]/_components/CourseComponent';

// ---- Time tracking ----
function useActiveTimer(onTick: (seconds: number) => void, intervalSeconds = 30) {
  const accumulated = useRef(0);
  const lastActive = useRef(Date.now());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        accumulated.current += Math.floor((Date.now() - lastActive.current) / 1000);
      } else {
        lastActive.current = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    timerRef.current = setInterval(() => {
      const delta = Math.floor((Date.now() - lastActive.current) / 1000);
      const total = accumulated.current + delta;
      if (total > 0) {
        onTick(total);
        accumulated.current = 0;
        lastActive.current = Date.now();
      }
    }, intervalSeconds * 1000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [onTick, intervalSeconds]);
}

// ---- Focus loss tracking ----
function useFocusLossTracker() {
  const count = useRef(0);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) count.current++;
    };
    const handleBlur = () => {
      count.current++;
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  const getAndReset = useCallback(() => {
    const val = count.current;
    count.current = 0;
    return val;
  }, []);

  return { getAndReset };
}

// ---- Inactivity timer ----
function useInactivityTimer(timeoutMinutes = 5) {
  const [showModal, setShowModal] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowModal(false);
    timerRef.current = setTimeout(() => {
      setShowModal(true);
    }, timeoutMinutes * 60 * 1000);
  }, [timeoutMinutes]);

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
    events.forEach((e) => document.addEventListener(e, resetTimer));
    resetTimer();

    return () => {
      events.forEach((e) => document.removeEventListener(e, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetTimer]);

  return { showModal, dismiss: resetTimer };
}

// ---- Adaptive mode labels ----
const adaptiveModeLabels: Record<string, string> = {
  skip: 'Skipped (accredited)',
  check_only: 'Knowledge check only',
  full: 'Full content',
  extended: 'Extended content',
  deep: 'In-depth content',
};

// ---- Unit sidebar item ----
function UnitItem({
  moduleNum,
  unit,
  isActive,
  isCompleted,
  isLocked,
  adaptiveMode,
  onClick,
}: {
  moduleNum: number;
  unit: { code: string; title: string };
  isActive: boolean;
  isCompleted: boolean;
  isLocked: boolean;
  adaptiveMode?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`w-full text-left px-3 py-2.5 rounded-lg flex items-start gap-2.5 transition-all ${
        isActive
          ? 'bg-[#9F80DA]/10 border border-[#9F80DA]/30 text-[#1a1a1a]'
          : isLocked
          ? 'opacity-40 cursor-not-allowed text-gray-400'
          : 'hover:bg-gray-100 text-gray-700'
      }`}
    >
      <div className={`w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center border ${
        isCompleted
          ? 'bg-green-500 border-green-500'
          : isActive
          ? 'border-[#9F80DA] bg-[#9F80DA]/10'
          : 'border-gray-300'
      }`}>
        {isCompleted ? (
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        ) : isLocked ? (
          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        ) : (
          <span className="text-[10px] font-bold text-gray-400">{unit.code}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-medium leading-tight ${isActive ? 'text-[#9F80DA]' : ''}`}>
          {unit.title}
        </p>
        <p className="text-[10px] text-gray-400 mt-0.5">Unit {unit.code}</p>
        {adaptiveMode && adaptiveMode !== 'full' && (
          <span className="text-[9px] px-1.5 py-0.5 bg-purple-50 text-purple-600 rounded mt-1 inline-block">
            {adaptiveModeLabels[adaptiveMode] ?? adaptiveMode}
          </span>
        )}
      </div>
    </button>
  );
}

// ---- Main component ----
export default function CoursePlayer({
  courseKey,
  backUrl,
  backLabel,
}: {
  courseKey: string;
  backUrl: string;
  backLabel: string;
}) {
  const router = useRouter();

  const { data, isLoading, error } = useLmsCourseContent(courseKey);
  const updateProgress = useLmsUpdateProgress(courseKey);
  const focusTracker = useFocusLossTracker();
  const { showModal: showInactivityModal, dismiss: dismissInactivity } = useInactivityTimer(5);

  // Current unit state
  const [activeUnitCode, setActiveUnitCode] = useState<string | null>(null);
  const mainContentRef = useRef<HTMLElement>(null);

  // Build flat list of all units
  const allUnits = data?.proposedIndex?.modules.flatMap((m) =>
    m.units.map((u) => ({ ...u, moduleNum: m.number, moduleTitle: m.title })),
  ) ?? [];

  // Check if adaptive redirect needed (only for learn mode)
  useEffect(() => {
    if (!data) return;
    if (data.isAdaptive && !data.adaptivePath && !data.enrollment.startedAt) {
      router.replace(`/lms/${courseKey}/pre-assessment`);
    }
  }, [data, courseKey, router]);

  // Set initial unit on load
  useEffect(() => {
    if (!data || activeUnitCode) return;

    const completedCodes = new Set(
      data.unitProgress.filter((p) => p.completedAt).map((p) => p.unitCode),
    );

    const firstIncomplete = allUnits.find((u) => !completedCodes.has(u.code));
    setActiveUnitCode(firstIncomplete?.code ?? allUnits[0]?.code ?? null);
  }, [data]);

  // Scroll to top when active unit changes
  useEffect(() => {
    if (activeUnitCode && mainContentRef.current) {
      mainContentRef.current.scrollTo(0, 0);
    }
  }, [activeUnitCode]);

  // Time tracking with focus loss
  const handleTimeTick = useCallback(
    (seconds: number) => {
      if (!activeUnitCode) return;
      const focusLoss = focusTracker.getAndReset();
      updateProgress.mutate({
        unitCode: activeUnitCode,
        timeSpentSeconds: seconds,
        focusLossCount: focusLoss > 0 ? focusLoss : undefined,
      });
    },
    [activeUnitCode, updateProgress, focusTracker],
  );
  useActiveTimer(handleTimeTick);

  // Mark unit as complete and move to next
  const handleCompleteUnit = useCallback(async () => {
    if (!activeUnitCode) return;
    await updateProgress.mutateAsync({
      unitCode: activeUnitCode,
      timeSpentSeconds: 0,
      completed: true,
    });

    // Move to next non-skipped unit
    const currentIdx = allUnits.findIndex((u) => u.code === activeUnitCode);
    for (let i = currentIdx + 1; i < allUnits.length; i++) {
      const adaptiveItem = data?.adaptivePath?.find((a) => a.unitCode === allUnits[i].code);
      if (adaptiveItem?.mode !== 'skip') {
        setActiveUnitCode(allUnits[i].code);
        return;
      }
    }
    // If no more units, stay on last
    if (currentIdx < allUnits.length - 1) {
      setActiveUnitCode(allUnits[currentIdx + 1].code);
    }
  }, [activeUnitCode, allUnits, updateProgress, data]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#9F80DA] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Could not load course content.</p>
        <button
          onClick={() => router.push(backUrl)}
          className="text-sm text-[#9F80DA] hover:underline"
        >
          {backLabel}
        </button>
      </div>
    );
  }

  const completedCodes = new Set(
    data.unitProgress.filter((p) => p.completedAt).map((p) => p.unitCode),
  );

  const lockedSet = new Set(data.lockedUnits ?? []);

  // Get adaptive mode for active unit
  const activeAdaptive = data.adaptivePath?.find((a) => a.unitCode === activeUnitCode);

  // Active unit components
  const activeComponents = activeUnitCode
    ? (data.componentsByUnit[activeUnitCode] ?? [])
    : [];

  // Progress stats
  const totalUnits = allUnits.length;
  const completedCount = completedCodes.size;
  const progressPct = totalUnits > 0 ? Math.round((completedCount / totalUnits) * 100) : 0;

  // Is current unit already done?
  const isCurrentUnitDone = activeUnitCode ? completedCodes.has(activeUnitCode) : false;

  // Is this the last unit?
  const currentIdx = allUnits.findIndex((u) => u.code === activeUnitCode);
  const isLastUnit = currentIdx === allUnits.length - 1;

  // Find active unit info
  const activeUnit = allUnits.find((u) => u.code === activeUnitCode);

  return (
    <div className="h-screen bg-white font-[var(--font-onest)] flex flex-col overflow-hidden">
      {/* Inactivity modal */}
      {showInactivityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center shadow-xl">
            <p className="text-lg font-semibold text-[#1a1a1a] mb-2">Are you still there?</p>
            <p className="text-sm text-gray-500 mb-6">You have been inactive for a while.</p>
            <button
              onClick={dismissInactivity}
              className="px-6 py-2.5 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white font-medium rounded-xl hover:from-[#8A6BC5] hover:to-[#7B5BB5] transition-all"
            >
              I am here!
            </button>
          </div>
        </div>
      )}

      {/* Top navbar */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm flex-shrink-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push(backUrl)}
            className="flex items-center gap-1.5 p-2 hover:bg-gray-100 rounded transition-colors text-sm text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {backLabel}
          </button>
          <h1 className="text-sm font-semibold text-[#1a1a1a] max-w-xs truncate">
            {data.courseTitle || 'Course'}
          </h1>
          {data.isAdaptive && (
            <span className="text-[10px] px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-medium">Adaptive</span>
          )}
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3 flex-1 mx-8 max-w-sm">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 whitespace-nowrap">
            {completedCount}/{totalUnits}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">{progressPct}% complete</span>
          {data.isAdaptive && data.enrollment.completedAt && (
            <button
              onClick={() => router.push(`/lms/${courseKey}/post-assessment`)}
              className="text-xs text-[#9F80DA] hover:underline"
            >
              Post-Assessment
            </button>
          )}
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-gray-50 border-r border-gray-200 overflow-y-auto flex-shrink-0">
          <div className="p-4">
            {data.proposedIndex?.modules.map((module: ProposedModule) => (
              <div key={module.number} className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1 mb-2">
                  Module {module.number} · {module.title}
                </p>
                <div className="space-y-1">
                  {module.units.map((unit) => {
                    const isLocked = lockedSet.has(unit.code);
                    const adaptiveItem = data.adaptivePath?.find((a) => a.unitCode === unit.code);

                    return (
                      <UnitItem
                        key={unit.code}
                        moduleNum={module.number}
                        unit={unit}
                        isActive={activeUnitCode === unit.code}
                        isCompleted={completedCodes.has(unit.code)}
                        isLocked={isLocked}
                        adaptiveMode={adaptiveItem?.mode}
                        onClick={() => setActiveUnitCode(unit.code)}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main ref={mainContentRef} className="flex-1 overflow-y-auto bg-white">
          {activeUnit && (
            <div className="max-w-3xl mx-auto px-6 py-8">
              {/* Unit header */}
              <div className="mb-8">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                  Unit {activeUnit.code}
                </p>
                <h2 className="text-2xl font-bold text-[#1a1a1a]">{activeUnit.title}</h2>
                {activeAdaptive && activeAdaptive.mode !== 'full' && (
                  <span className="inline-flex items-center gap-1 mt-2 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                    {adaptiveModeLabels[activeAdaptive.mode]}
                  </span>
                )}
                {isCurrentUnitDone && (
                  <span className="inline-flex items-center gap-1 mt-2 ml-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Completed
                  </span>
                )}
              </div>

              {/* Unit components */}
              <div className="space-y-6">
                {activeAdaptive?.mode === 'skip' ? (
                  <div className="text-center py-20 text-gray-400">
                    <p className="text-lg font-semibold mb-2">Unit Accredited</p>
                    <p>You indicated high confidence in this topic. It has been marked complete.</p>
                  </div>
                ) : activeComponents.length === 0 ? (
                  <div className="text-center py-20 text-gray-400">
                    <p>Content is being generated for this unit.</p>
                  </div>
                ) : (
                  activeComponents.map((comp, idx) => {
                    const BlockComponent = BlockComponents[comp.component];
                    if (!BlockComponent) {
                      return (
                        <div key={idx} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-yellow-700 text-sm">Unknown component: {comp.component}</p>
                        </div>
                      );
                    }
                    return (
                      <div key={idx}>
                        <BlockComponent {...(comp.content as Record<string, unknown>)} />
                      </div>
                    );
                  })
                )}
              </div>

              {/* Navigation footer */}
              <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
                {/* Previous */}
                <button
                  onClick={() => {
                    if (currentIdx > 0) setActiveUnitCode(allUnits[currentIdx - 1].code);
                  }}
                  disabled={currentIdx === 0}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#9F80DA] disabled:opacity-30 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {currentIdx > 0 ? allUnits[currentIdx - 1].title : 'Previous'}
                </button>

                {/* Complete / Next */}
                {isLastUnit ? (
                  <button
                    onClick={handleCompleteUnit}
                    disabled={isCurrentUnitDone || updateProgress.isPending}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow hover:from-green-600 hover:to-green-700 disabled:opacity-50 transition-all"
                  >
                    {isCurrentUnitDone ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        Course Complete!
                      </>
                    ) : (
                      <>
                        Finish Course
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleCompleteUnit}
                    disabled={updateProgress.isPending}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white font-semibold rounded-xl shadow hover:from-[#8A6BC5] hover:to-[#7B5BB5] disabled:opacity-50 transition-all"
                  >
                    {isCurrentUnitDone ? 'Next Unit' : 'Complete & Continue'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
