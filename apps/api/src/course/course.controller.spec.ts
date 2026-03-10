import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseSSEService } from './course-sse.service';
import { TaskName } from './enums/task-name.enum';
import { Subject } from 'rxjs';

const mockCourseService = {
  create: jest.fn(),
  generateTitle: jest.fn(),
  setAudience: jest.fn(),
  setObjective: jest.fn(),
  setBuildingMethod: jest.fn(),
  setModules: jest.fn(),
  setUnits: jest.fn(),
  getExerciseTypes: jest.fn(),
  setEvaluation: jest.fn(),
  setEvaluationDetails: jest.fn(),
  setBranding: jest.fn(),
  generateCourse: jest.fn(),
  findAllByUserId: jest.fn(),
  findByKey: jest.fn(),
  getCourseComponents: jest.fn(),
};

const mockSSEService = {
  getEventStream: jest.fn(),
};

describe('CourseController', () => {
  let controller: CourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        { provide: CourseService, useValue: mockCourseService },
        { provide: CourseSSEService, useValue: mockSSEService },
      ],
    }).compile();
    controller = module.get<CourseController>(CourseController);
    jest.clearAllMocks();
  });

  describe('executeTask', () => {
    it('dispatches CREATE_COURSE', async () => {
      mockCourseService.create.mockResolvedValue({ courseKey: 'k1' });
      const result = await controller.executeTask({ taskName: TaskName.CREATE_COURSE, userId: 'u1' } as any);
      expect(result.courseKey).toBe('k1');
    });

    it('dispatches GENERATE_TITLE', async () => {
      mockCourseService.generateTitle.mockResolvedValue({ success: true });
      const result = await controller.executeTask({ taskName: TaskName.GENERATE_TITLE, courseKey: 'k1', topic: 'AI' } as any);
      expect(result.success).toBe(true);
    });

    it('dispatches SET_AUDIENCE', async () => {
      mockCourseService.setAudience.mockResolvedValue({ success: true });
      const result = await controller.executeTask({ taskName: TaskName.SET_AUDIENCE, courseKey: 'k1', audience: 'devs' } as any);
      expect(result.success).toBe(true);
    });

    it('dispatches SET_OBJECTIVE', async () => {
      mockCourseService.setObjective.mockResolvedValue({ success: true });
      const result = await controller.executeTask({ taskName: TaskName.SET_OBJECTIVE, courseKey: 'k1', objective: 'learn' } as any);
      expect(result.success).toBe(true);
    });

    it('dispatches SET_BUILDING_METHOD', async () => {
      mockCourseService.setBuildingMethod.mockResolvedValue({ success: true });
      const result = await controller.executeTask({ taskName: TaskName.SET_BUILDING_METHOD, courseKey: 'k1', buildingMethod: 'ai' } as any);
      expect(result.success).toBe(true);
    });

    it('dispatches SET_MODULES', async () => {
      mockCourseService.setModules.mockResolvedValue({ success: true });
      const result = await controller.executeTask({ taskName: TaskName.SET_MODULES, courseKey: 'k1', modulesCount: 3 } as any);
      expect(result.success).toBe(true);
    });

    it('dispatches SET_UNITS', async () => {
      mockCourseService.setUnits.mockResolvedValue({ success: true });
      const result = await controller.executeTask({ taskName: TaskName.SET_UNITS, courseKey: 'k1', modules: {} } as any);
      expect(result.success).toBe(true);
    });

    it('dispatches GET_EXERCISE_TYPES', async () => {
      mockCourseService.getExerciseTypes.mockResolvedValue({ exerciseTypes: [] });
      const result = await controller.executeTask({ taskName: TaskName.GET_EXERCISE_TYPES, courseKey: 'k1', conversationKey: 'c1' } as any);
      expect(result.exerciseTypes).toEqual([]);
    });

    it('dispatches SET_EVALUATION', async () => {
      mockCourseService.setEvaluation.mockResolvedValue({ success: true });
      const result = await controller.executeTask({ taskName: TaskName.SET_EVALUATION, courseKey: 'k1', conversationKey: 'c1', selectedComponents: [] } as any);
      expect(result.success).toBe(true);
    });

    it('dispatches SET_EVALUATION_DETAILS', async () => {
      mockCourseService.setEvaluationDetails.mockResolvedValue({ success: true });
      const result = await controller.executeTask({ taskName: TaskName.SET_EVALUATION_DETAILS, courseKey: 'k1' } as any);
      expect(result.success).toBe(true);
    });

    it('dispatches SET_BRANDING', async () => {
      mockCourseService.setBranding.mockResolvedValue({ success: true });
      const result = await controller.executeTask({ taskName: TaskName.SET_BRANDING, courseKey: 'k1' } as any);
      expect(result.success).toBe(true);
    });

    it('dispatches GENERATE_COURSE', async () => {
      mockCourseService.generateCourse.mockResolvedValue({ success: true, totalJobs: 5 });
      const result = await controller.executeTask({ taskName: TaskName.GENERATE_COURSE, courseKey: 'k1' } as any);
      expect(result.totalJobs).toBe(5);
    });

    it('throws on unknown task', async () => {
      await expect(
        controller.executeTask({ taskName: 'UNKNOWN_TASK' } as any),
      ).rejects.toThrow('Unknown task: UNKNOWN_TASK');
    });
  });

  describe('findAll', () => {
    it('returns courses for authenticated user', async () => {
      mockCourseService.findAllByUserId.mockResolvedValue([{ key: 'k1' }]);
      const req = { user: { id: 'u1' } } as any;
      const result = await controller.findAll(req, { page: 1, limit: 20 });
      expect(result).toHaveLength(1);
    });
  });

  describe('findOne', () => {
    it('delegates to service', async () => {
      mockCourseService.findByKey.mockResolvedValue({ key: 'k1' });
      const result = await controller.findOne('k1');
      expect(result.key).toBe('k1');
    });
  });

  describe('getCourseComponents', () => {
    it('delegates to service', async () => {
      mockCourseService.getCourseComponents.mockResolvedValue({ components: [] });
      const result = await controller.getCourseComponents('k1');
      expect(result.components).toEqual([]);
    });
  });

  describe('events', () => {
    it('returns observable that maps SSE events to MessageEvents', (done) => {
      const subject = new Subject();
      mockSSEService.getEventStream.mockReturnValue(subject.asObservable());

      const observable = controller.events('k1');
      const sub = observable.subscribe((event) => {
        expect(event.data).toEqual({ type: 'progress', data: {} });
        expect(event.type).toBe('progress');
        sub.unsubscribe();
        done();
      });

      subject.next({ type: 'progress', data: {} });
    });
  });
});
