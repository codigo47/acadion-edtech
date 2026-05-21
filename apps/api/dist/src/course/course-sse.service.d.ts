import { Observable } from 'rxjs';
import { LoadingTextPhase } from './constants/loading-texts';
export interface SSEEvent {
    type: 'progress' | 'status_change' | 'loading_text' | 'unit_started' | 'unit_completed' | 'unit_failed' | 'generation_complete' | 'error';
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
export declare class CourseSSEService {
    private courseEventSubjects;
    private loadingTextIndexes;
    private loadingTextIntervals;
    getEventStream(courseKey: string): Observable<SSEEvent>;
    emitEvent(courseKey: string, event: SSEEvent): void;
    startLoadingTexts(courseKey: string, phase: LoadingTextPhase): void;
    stopLoadingTexts(courseKey: string): void;
    emitStatusChange(courseKey: string, phase: LoadingTextPhase, status: 'pending' | 'running' | 'completed' | 'failed'): void;
    emitObjectivesCompleted(courseKey: string, objectivesMessage: string, buildMethodMessage: string): void;
    emitIndexCompleted(courseKey: string, proposedIndex: unknown): void;
    emitUnitProgress(courseKey: string, progress: SSEEventData['progress']): void;
    emitUnitStarted(courseKey: string, unitCode: string, unitTitle: string): void;
    emitUnitFailed(courseKey: string, unitCode: string, unitTitle: string, error: string): void;
    emitUnitCompleted(courseKey: string, unitCode: string, unitTitle: string, progress: SSEEventData['progress']): void;
    emitGenerationComplete(courseKey: string): void;
    emitError(courseKey: string, error: string): void;
    cleanup(courseKey: string): void;
    removeSubject(courseKey: string): void;
}
