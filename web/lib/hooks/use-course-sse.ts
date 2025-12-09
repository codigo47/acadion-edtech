import { useEffect, useRef, useCallback, useState } from 'react';

// SSE Event types matching backend
export type SSEEventType =
  | 'progress'
  | 'status_change'
  | 'loading_text'
  | 'unit_started'
  | 'unit_completed'
  | 'unit_failed'
  | 'generation_complete'
  | 'error';

export type LoadingTextPhase =
  | 'GENERATING_OBJECTIVES'
  | 'GENERATING_INDEX'
  | 'GENERATING_UNIT'
  | 'GENERATING_TITLE';

export interface SSEEventData {
  phase?: LoadingTextPhase;
  loadingText?: string;
  status?: 'pending' | 'running' | 'completed' | 'failed';
  progress?: {
    totalUnits: number;
    completedUnits: number;
    failedUnits: number;
    runningUnits: number;
    pendingUnits: number;
  };
  unitCode?: string;
  unitTitle?: string;
  error?: string;
  message?: string;
  objectivesMessage?: string;
  buildMethodMessage?: string;
  proposedIndex?: ProposedIndex;
}

export interface SSEEvent {
  type: SSEEventType;
  data: SSEEventData;
}

export interface ProposedIndex {
  title: string;
  modules: Array<{
    number: number;
    title: string;
    units: Array<{ code: string; title: string }>;
  }>;
}

export interface UnitStatus {
  unitCode: string;
  unitTitle: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
}

export interface CourseSSEState {
  isConnected: boolean;
  loadingText: string | null;
  phase: LoadingTextPhase | null;
  progress: SSEEventData['progress'] | null;
  units: UnitStatus[];
  objectivesMessage: string | null;
  buildMethodMessage: string | null;
  proposedIndex: ProposedIndex | null;
  isComplete: boolean;
  error: string | null;
  lastEvent: SSEEvent | null;
}

interface UseCourseSSEOptions {
  enabled?: boolean;
  onObjectivesCompleted?: (objectivesMessage: string, buildMethodMessage: string) => void;
  onIndexCompleted?: (proposedIndex: ProposedIndex) => void;
  onUnitCompleted?: (unitCode: string, unitTitle: string, progress: SSEEventData['progress']) => void;
  onGenerationComplete?: () => void;
  onError?: (error: string) => void;
}

export function useCourseSSE(
  courseKey: string | null,
  options: UseCourseSSEOptions = {}
): CourseSSEState {
  const {
    enabled = true,
    onObjectivesCompleted,
    onIndexCompleted,
    onUnitCompleted,
    onGenerationComplete,
    onError,
  } = options;

  const eventSourceRef = useRef<EventSource | null>(null);

  const [state, setState] = useState<CourseSSEState>({
    isConnected: false,
    loadingText: null,
    phase: null,
    progress: null,
    units: [],
    objectivesMessage: null,
    buildMethodMessage: null,
    proposedIndex: null,
    isComplete: false,
    error: null,
    lastEvent: null,
  });

  const handleEvent = useCallback(
    (event: MessageEvent) => {
      try {
        const sseEvent: SSEEvent = JSON.parse(event.data);

        setState((prev) => ({
          ...prev,
          lastEvent: sseEvent,
        }));

        switch (sseEvent.type) {
          case 'loading_text':
            setState((prev) => ({
              ...prev,
              loadingText: sseEvent.data.loadingText || null,
              phase: sseEvent.data.phase || null,
            }));
            break;

          case 'status_change':
            if (sseEvent.data.phase === 'GENERATING_OBJECTIVES' && sseEvent.data.status === 'completed') {
              const objMsg = sseEvent.data.objectivesMessage || '';
              const buildMsg = sseEvent.data.buildMethodMessage || '';
              setState((prev) => ({
                ...prev,
                objectivesMessage: objMsg,
                buildMethodMessage: buildMsg,
                loadingText: null,
              }));
              onObjectivesCompleted?.(objMsg, buildMsg);
            } else if (sseEvent.data.phase === 'GENERATING_INDEX' && sseEvent.data.status === 'completed') {
              const index = sseEvent.data.proposedIndex as ProposedIndex;
              setState((prev) => ({
                ...prev,
                proposedIndex: index,
                loadingText: null,
              }));
              onIndexCompleted?.(index);
            }
            break;

          case 'progress':
            setState((prev) => ({
              ...prev,
              progress: sseEvent.data.progress || null,
            }));
            break;

          case 'unit_started':
            if (sseEvent.data.unitCode && sseEvent.data.unitTitle) {
              setState((prev) => {
                const existingUnit = prev.units.find(u => u.unitCode === sseEvent.data.unitCode);
                if (existingUnit) {
                  // Update existing unit status
                  return {
                    ...prev,
                    units: prev.units.map(u =>
                      u.unitCode === sseEvent.data.unitCode
                        ? { ...u, status: 'running' as const }
                        : u
                    ),
                  };
                } else {
                  // Add new unit
                  return {
                    ...prev,
                    units: [...prev.units, {
                      unitCode: sseEvent.data.unitCode!,
                      unitTitle: sseEvent.data.unitTitle!,
                      status: 'running' as const,
                    }],
                  };
                }
              });
            }
            break;

          case 'unit_completed':
            const unitProgress = sseEvent.data.progress;
            setState((prev) => ({
              ...prev,
              progress: unitProgress || null,
              units: prev.units.map(u =>
                u.unitCode === sseEvent.data.unitCode
                  ? { ...u, status: 'completed' as const }
                  : u
              ),
            }));
            if (sseEvent.data.unitCode && sseEvent.data.unitTitle && unitProgress) {
              onUnitCompleted?.(sseEvent.data.unitCode, sseEvent.data.unitTitle, unitProgress);
            }
            break;

          case 'unit_failed':
            if (sseEvent.data.unitCode) {
              setState((prev) => ({
                ...prev,
                units: prev.units.map(u =>
                  u.unitCode === sseEvent.data.unitCode
                    ? { ...u, status: 'failed' as const }
                    : u
                ),
              }));
            }
            break;

          case 'generation_complete':
            setState((prev) => ({
              ...prev,
              isComplete: true,
              loadingText: null,
            }));
            onGenerationComplete?.();
            break;

          case 'error':
            const errorMsg = sseEvent.data.error || 'Unknown error';
            setState((prev) => ({
              ...prev,
              error: errorMsg,
              loadingText: null,
            }));
            onError?.(errorMsg);
            break;
        }
      } catch (e) {
        console.error('Failed to parse SSE event:', e);
      }
    },
    [onObjectivesCompleted, onIndexCompleted, onUnitCompleted, onGenerationComplete, onError]
  );

  const connect = useCallback(() => {
    if (!courseKey || !enabled) return;

    // Close existing connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const url = `${apiUrl}/v1/course/${courseKey}/events`;

    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      setState((prev) => ({ ...prev, isConnected: true, error: null }));
    };

    eventSource.onerror = () => {
      setState((prev) => ({ ...prev, isConnected: false }));
      // Attempt to reconnect after 3 seconds
      setTimeout(() => {
        if (enabled && courseKey) {
          connect();
        }
      }, 3000);
    };

    // Listen for all event types
    const eventTypes: SSEEventType[] = [
      'progress',
      'status_change',
      'loading_text',
      'unit_started',
      'unit_completed',
      'unit_failed',
      'generation_complete',
      'error',
    ];

    eventTypes.forEach((eventType) => {
      eventSource.addEventListener(eventType, handleEvent);
    });

    // Also listen to generic messages
    eventSource.onmessage = handleEvent;
  }, [courseKey, enabled, handleEvent]);

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setState((prev) => ({ ...prev, isConnected: false }));
    }
  }, []);

  // Connect/disconnect based on enabled and courseKey
  useEffect(() => {
    if (enabled && courseKey) {
      connect();
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [enabled, courseKey, connect, disconnect]);

  // Reset state when courseKey changes
  useEffect(() => {
    setState({
      isConnected: false,
      loadingText: null,
      phase: null,
      progress: null,
      units: [],
      objectivesMessage: null,
      buildMethodMessage: null,
      proposedIndex: null,
      isComplete: false,
      error: null,
      lastEvent: null,
    });
  }, [courseKey]);

  return state;
}
