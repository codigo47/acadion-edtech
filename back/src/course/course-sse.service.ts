import { Injectable } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';
import { LOADING_TEXTS, LoadingTextPhase } from './constants/loading-texts';

// SSE Event types
export interface SSEEvent {
  type:
    | 'progress'
    | 'status_change'
    | 'loading_text'
    | 'unit_started'
    | 'unit_completed'
    | 'unit_failed'
    | 'generation_complete'
    | 'error';
  data: SSEEventData;
}

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
  proposedIndex?: unknown;
}

@Injectable()
export class CourseSSEService {
  // Map of courseKey -> Subject for that course's events
  private courseEventSubjects = new Map<string, Subject<SSEEvent>>();

  // Map of courseKey -> loading text index for rotating messages
  private loadingTextIndexes = new Map<
    string,
    { phase: LoadingTextPhase; index: number }
  >();

  // Map of courseKey -> interval for loading text rotation
  private loadingTextIntervals = new Map<string, NodeJS.Timeout>();

  getEventStream(courseKey: string): Observable<SSEEvent> {
    if (!this.courseEventSubjects.has(courseKey)) {
      this.courseEventSubjects.set(courseKey, new Subject<SSEEvent>());
    }
    return this.courseEventSubjects.get(courseKey)!.asObservable();
  }

  emitEvent(courseKey: string, event: SSEEvent): void {
    const subject = this.courseEventSubjects.get(courseKey);
    if (subject) {
      subject.next(event);
    }
  }

  // Start rotating loading texts for a specific phase
  startLoadingTexts(courseKey: string, phase: LoadingTextPhase): void {
    // Stop any existing rotation
    this.stopLoadingTexts(courseKey);

    const texts = LOADING_TEXTS[phase];
    this.loadingTextIndexes.set(courseKey, { phase, index: 0 });

    // Emit first loading text immediately
    this.emitEvent(courseKey, {
      type: 'loading_text',
      data: {
        phase,
        loadingText: texts[0],
      },
    });

    // Rotate through loading texts every 2 seconds
    const interval = setInterval(() => {
      const current = this.loadingTextIndexes.get(courseKey);
      if (!current || current.phase !== phase) {
        this.stopLoadingTexts(courseKey);
        return;
      }

      const nextIndex = (current.index + 1) % texts.length;
      this.loadingTextIndexes.set(courseKey, { phase, index: nextIndex });

      this.emitEvent(courseKey, {
        type: 'loading_text',
        data: {
          phase,
          loadingText: texts[nextIndex],
        },
      });
    }, 2000);

    this.loadingTextIntervals.set(courseKey, interval);
  }

  stopLoadingTexts(courseKey: string): void {
    const interval = this.loadingTextIntervals.get(courseKey);
    if (interval) {
      clearInterval(interval);
      this.loadingTextIntervals.delete(courseKey);
    }
    this.loadingTextIndexes.delete(courseKey);
  }

  // Emit status change event
  emitStatusChange(
    courseKey: string,
    phase: LoadingTextPhase,
    status: 'pending' | 'running' | 'completed' | 'failed',
  ): void {
    this.emitEvent(courseKey, {
      type: 'status_change',
      data: {
        phase,
        status,
      },
    });

    // Start loading texts when status is running
    if (status === 'running') {
      this.startLoadingTexts(courseKey, phase);
    } else if (status === 'completed' || status === 'failed') {
      this.stopLoadingTexts(courseKey);
    }
  }

  // Emit objectives completed event
  emitObjectivesCompleted(
    courseKey: string,
    objectivesMessage: string,
    buildMethodMessage: string,
  ): void {
    this.stopLoadingTexts(courseKey);
    this.emitEvent(courseKey, {
      type: 'status_change',
      data: {
        phase: 'GENERATING_OBJECTIVES',
        status: 'completed',
        objectivesMessage,
        buildMethodMessage,
      },
    });
  }

  // Emit index completed event
  emitIndexCompleted(courseKey: string, proposedIndex: unknown): void {
    this.stopLoadingTexts(courseKey);
    this.emitEvent(courseKey, {
      type: 'status_change',
      data: {
        phase: 'GENERATING_INDEX',
        status: 'completed',
        proposedIndex,
      },
    });
  }

  // Emit unit progress event
  emitUnitProgress(
    courseKey: string,
    progress: SSEEventData['progress'],
  ): void {
    this.emitEvent(courseKey, {
      type: 'progress',
      data: { progress },
    });
  }

  // Emit unit started event
  emitUnitStarted(
    courseKey: string,
    unitCode: string,
    unitTitle: string,
  ): void {
    this.emitEvent(courseKey, {
      type: 'unit_started',
      data: {
        unitCode,
        unitTitle,
        status: 'running',
      },
    });
  }

  // Emit unit failed event
  emitUnitFailed(
    courseKey: string,
    unitCode: string,
    unitTitle: string,
    error: string,
  ): void {
    this.emitEvent(courseKey, {
      type: 'unit_failed',
      data: {
        unitCode,
        unitTitle,
        status: 'failed',
        error,
      },
    });
  }

  // Emit unit completed event
  emitUnitCompleted(
    courseKey: string,
    unitCode: string,
    unitTitle: string,
    progress: SSEEventData['progress'],
  ): void {
    this.emitEvent(courseKey, {
      type: 'unit_completed',
      data: {
        unitCode,
        unitTitle,
        progress,
      },
    });
  }

  // Emit generation complete event
  emitGenerationComplete(courseKey: string): void {
    this.stopLoadingTexts(courseKey);
    this.emitEvent(courseKey, {
      type: 'generation_complete',
      data: {
        message: 'Course generation completed successfully',
      },
    });
  }

  // Emit error event
  emitError(courseKey: string, error: string): void {
    this.stopLoadingTexts(courseKey);
    this.emitEvent(courseKey, {
      type: 'error',
      data: { error },
    });
  }

  // Clean up when a client disconnects
  cleanup(courseKey: string): void {
    this.stopLoadingTexts(courseKey);
    const subject = this.courseEventSubjects.get(courseKey);
    if (subject) {
      // Don't complete the subject, just clean up intervals
      // Other clients may still be connected
    }
  }

  // Remove subject when no more subscribers
  removeSubject(courseKey: string): void {
    this.stopLoadingTexts(courseKey);
    const subject = this.courseEventSubjects.get(courseKey);
    if (subject) {
      subject.complete();
      this.courseEventSubjects.delete(courseKey);
    }
  }
}
