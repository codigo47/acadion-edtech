import { CourseSSEService } from './course-sse.service';

describe('CourseSSEService', () => {
  let service: CourseSSEService;

  beforeEach(() => {
    service = new CourseSSEService();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('getEventStream', () => {
    it('returns an observable for the course key', () => {
      const stream = service.getEventStream('course-1');
      expect(stream).toBeDefined();
      expect(stream.subscribe).toBeDefined();
    });

    it('reuses subject for same key', () => {
      const s1 = service.getEventStream('course-1');
      let received = 0;
      s1.subscribe(() => { received++; });
      const s2 = service.getEventStream('course-1');
      s2.subscribe(() => { received++; });
      service.emitEvent('course-1', { type: 'progress', data: {} });
      // Subject emission is synchronous, so both subscribers should have received
      expect(received).toBe(2);
    });
  });

  describe('emitEvent', () => {
    it('sends event to subscribers', (done) => {
      const stream = service.getEventStream('course-1');
      const sub = stream.subscribe((event) => {
        expect(event.type).toBe('progress');
        sub.unsubscribe();
        done();
      });
      service.emitEvent('course-1', { type: 'progress', data: { progress: { totalUnits: 5, completedUnits: 1, failedUnits: 0, runningUnits: 1, pendingUnits: 3 } } });
    });

    it('does nothing when no subscribers', () => {
      expect(() => service.emitEvent('no-sub', { type: 'error', data: { error: 'test' } })).not.toThrow();
    });
  });

  describe('emitStatusChange', () => {
    it('emits status_change event', (done) => {
      const stream = service.getEventStream('course-1');
      const sub = stream.subscribe((event) => {
        if (event.type === 'status_change') {
          expect(event.data.phase).toBe('GENERATING_INDEX');
          expect(event.data.status).toBe('completed');
          sub.unsubscribe();
          done();
        }
      });
      service.emitStatusChange('course-1', 'GENERATING_INDEX', 'completed');
    });
  });

  describe('emitObjectivesCompleted', () => {
    it('emits objectives completed event', (done) => {
      const stream = service.getEventStream('course-1');
      const sub = stream.subscribe((event) => {
        expect(event.data.objectivesMessage).toBe('Objectives done');
        sub.unsubscribe();
        done();
      });
      service.emitObjectivesCompleted('course-1', 'Objectives done', 'Build method');
    });
  });

  describe('emitIndexCompleted', () => {
    it('emits index completed event', (done) => {
      const stream = service.getEventStream('course-1');
      const sub = stream.subscribe((event) => {
        expect(event.data.proposedIndex).toEqual({ modules: [] });
        sub.unsubscribe();
        done();
      });
      service.emitIndexCompleted('course-1', { modules: [] });
    });
  });

  describe('emitUnitProgress', () => {
    it('emits progress event', (done) => {
      const stream = service.getEventStream('course-1');
      const sub = stream.subscribe((event) => {
        expect(event.type).toBe('progress');
        expect(event.data.progress!.totalUnits).toBe(10);
        sub.unsubscribe();
        done();
      });
      service.emitUnitProgress('course-1', { totalUnits: 10, completedUnits: 2, failedUnits: 0, runningUnits: 1, pendingUnits: 7 });
    });
  });

  describe('emitUnitStarted', () => {
    it('emits unit_started event', (done) => {
      const stream = service.getEventStream('course-1');
      const sub = stream.subscribe((event) => {
        expect(event.type).toBe('unit_started');
        expect(event.data.unitCode).toBe('1.1');
        sub.unsubscribe();
        done();
      });
      service.emitUnitStarted('course-1', '1.1', 'Unit 1');
    });
  });

  describe('emitUnitFailed', () => {
    it('emits unit_failed event', (done) => {
      const stream = service.getEventStream('course-1');
      const sub = stream.subscribe((event) => {
        expect(event.type).toBe('unit_failed');
        expect(event.data.error).toBe('AI error');
        sub.unsubscribe();
        done();
      });
      service.emitUnitFailed('course-1', '1.1', 'Unit 1', 'AI error');
    });
  });

  describe('emitUnitCompleted', () => {
    it('emits unit_completed event', (done) => {
      const stream = service.getEventStream('course-1');
      const sub = stream.subscribe((event) => {
        expect(event.type).toBe('unit_completed');
        sub.unsubscribe();
        done();
      });
      service.emitUnitCompleted('course-1', '1.1', 'Unit 1', { totalUnits: 5, completedUnits: 1, failedUnits: 0, runningUnits: 0, pendingUnits: 4 });
    });
  });

  describe('emitGenerationComplete', () => {
    it('emits generation_complete event', (done) => {
      const stream = service.getEventStream('course-1');
      const sub = stream.subscribe((event) => {
        expect(event.type).toBe('generation_complete');
        sub.unsubscribe();
        done();
      });
      service.emitGenerationComplete('course-1');
    });
  });

  describe('emitError', () => {
    it('emits error event', (done) => {
      const stream = service.getEventStream('course-1');
      const sub = stream.subscribe((event) => {
        expect(event.type).toBe('error');
        expect(event.data.error).toBe('Something went wrong');
        sub.unsubscribe();
        done();
      });
      service.emitError('course-1', 'Something went wrong');
    });
  });

  describe('startLoadingTexts', () => {
    it('emits loading text immediately and rotates', () => {
      const events: any[] = [];
      const stream = service.getEventStream('course-1');
      const sub = stream.subscribe((event) => events.push(event));

      service.startLoadingTexts('course-1', 'GENERATING_OBJECTIVES');
      expect(events).toHaveLength(1);
      expect(events[0].type).toBe('loading_text');

      jest.advanceTimersByTime(6000);
      expect(events.length).toBeGreaterThanOrEqual(2);

      service.stopLoadingTexts('course-1');
      sub.unsubscribe();
    });
  });

  describe('cleanup', () => {
    it('stops loading texts without completing subject', () => {
      service.startLoadingTexts('course-1', 'GENERATING_INDEX');
      service.cleanup('course-1');
      // Should not throw
    });
  });

  describe('removeSubject', () => {
    it('completes and removes subject', () => {
      const stream = service.getEventStream('course-1');
      let completed = false;
      const sub = stream.subscribe({ complete: () => { completed = true; } });
      service.removeSubject('course-1');
      expect(completed).toBe(true);
      sub.unsubscribe();
    });
  });
});
