"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseSSEService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const loading_texts_1 = require("./constants/loading-texts");
let CourseSSEService = class CourseSSEService {
    courseEventSubjects = new Map();
    loadingTextIndexes = new Map();
    loadingTextIntervals = new Map();
    getEventStream(courseKey) {
        if (!this.courseEventSubjects.has(courseKey)) {
            this.courseEventSubjects.set(courseKey, new rxjs_1.Subject());
        }
        return this.courseEventSubjects.get(courseKey).asObservable();
    }
    emitEvent(courseKey, event) {
        const subject = this.courseEventSubjects.get(courseKey);
        if (subject) {
            subject.next(event);
        }
    }
    startLoadingTexts(courseKey, phase) {
        this.stopLoadingTexts(courseKey);
        const texts = loading_texts_1.LOADING_TEXTS[phase];
        this.loadingTextIndexes.set(courseKey, { phase, index: 0 });
        this.emitEvent(courseKey, {
            type: 'loading_text',
            data: {
                phase,
                loadingText: texts[0],
            },
        });
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
        }, 6000);
        this.loadingTextIntervals.set(courseKey, interval);
    }
    stopLoadingTexts(courseKey) {
        const interval = this.loadingTextIntervals.get(courseKey);
        if (interval) {
            clearInterval(interval);
            this.loadingTextIntervals.delete(courseKey);
        }
        this.loadingTextIndexes.delete(courseKey);
    }
    emitStatusChange(courseKey, phase, status) {
        this.emitEvent(courseKey, {
            type: 'status_change',
            data: {
                phase,
                status,
            },
        });
        if (status === 'running') {
            this.startLoadingTexts(courseKey, phase);
        }
        else if (status === 'completed' || status === 'failed') {
            this.stopLoadingTexts(courseKey);
        }
    }
    emitObjectivesCompleted(courseKey, objectivesMessage, buildMethodMessage) {
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
    emitIndexCompleted(courseKey, proposedIndex) {
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
    emitUnitProgress(courseKey, progress) {
        this.emitEvent(courseKey, {
            type: 'progress',
            data: { progress },
        });
    }
    emitUnitStarted(courseKey, unitCode, unitTitle) {
        this.emitEvent(courseKey, {
            type: 'unit_started',
            data: {
                unitCode,
                unitTitle,
                status: 'running',
            },
        });
    }
    emitUnitFailed(courseKey, unitCode, unitTitle, error) {
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
    emitUnitCompleted(courseKey, unitCode, unitTitle, progress) {
        this.emitEvent(courseKey, {
            type: 'unit_completed',
            data: {
                unitCode,
                unitTitle,
                progress,
            },
        });
    }
    emitGenerationComplete(courseKey) {
        this.stopLoadingTexts(courseKey);
        this.emitEvent(courseKey, {
            type: 'generation_complete',
            data: {
                message: 'Course generation completed successfully',
            },
        });
    }
    emitError(courseKey, error) {
        this.stopLoadingTexts(courseKey);
        this.emitEvent(courseKey, {
            type: 'error',
            data: { error },
        });
    }
    cleanup(courseKey) {
        this.stopLoadingTexts(courseKey);
        const subject = this.courseEventSubjects.get(courseKey);
        if (subject) {
        }
    }
    removeSubject(courseKey) {
        this.stopLoadingTexts(courseKey);
        const subject = this.courseEventSubjects.get(courseKey);
        if (subject) {
            subject.complete();
            this.courseEventSubjects.delete(courseKey);
        }
    }
};
exports.CourseSSEService = CourseSSEService;
exports.CourseSSEService = CourseSSEService = __decorate([
    (0, common_1.Injectable)()
], CourseSSEService);
//# sourceMappingURL=course-sse.service.js.map