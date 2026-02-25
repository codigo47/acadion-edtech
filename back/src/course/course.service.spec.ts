import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getQueueToken } from '@nestjs/bullmq';
import { CourseService } from './course.service';
import { PrismaService } from '../prisma/prisma.service';
import { CourseSSEService } from './course-sse.service';
import { COURSE_ORCHESTRATION_QUEUE } from './constants';

const mockPrisma = {
  course: {
    create: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
  },
  conversation: { create: jest.fn() },
  message: { findFirst: jest.fn(), create: jest.fn() },
  courseStep: { create: jest.fn() },
  component: { findMany: jest.fn() },
  courseComponent: { findMany: jest.fn() },
};

const mockQueue = { add: jest.fn() };

const mockSSE = {
  emitStatusChange: jest.fn(),
  emitUnitProgress: jest.fn(),
};

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: getQueueToken(COURSE_ORCHESTRATION_QUEUE), useValue: mockQueue },
        { provide: CourseSSEService, useValue: mockSSE },
      ],
    }).compile();
    service = module.get<CourseService>(CourseService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('creates course and conversation', async () => {
      mockPrisma.course.create.mockResolvedValue({ key: 'abc-123' });
      mockPrisma.conversation.create.mockResolvedValue({ id: 'conv-1' });

      const result = await service.create({ taskName: 'CREATE_COURSE' as any, userId: 'u1' });
      expect(result.courseKey).toBe('abc-123');
      expect(result.conversationKey).toBe('conv-1');
      expect(mockPrisma.course.create).toHaveBeenCalledWith({ data: { userId: 'u1' } });
    });
  });

  describe('generateTitle', () => {
    it('updates course input and returns AI message', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1, input: {} });
      mockPrisma.course.update.mockResolvedValue({});
      mockPrisma.message.findFirst.mockResolvedValue(null);
      mockPrisma.message.create.mockResolvedValue({});

      const result = await service.generateTitle({
        taskName: 'GENERATE_TITLE' as any,
        courseKey: 'k1',
        conversationKey: 'c1',
        topic: 'AI Basics',
      });
      expect(result.success).toBe(true);
      expect(result.aiMessage).toBeDefined();
      expect(mockPrisma.course.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { input: { topic: 'AI Basics' } },
        }),
      );
    });

    it('throws NotFoundException when course not found', async () => {
      mockPrisma.course.findFirst.mockResolvedValue(null);
      await expect(
        service.generateTitle({ taskName: 'GENERATE_TITLE' as any, courseKey: 'bad', conversationKey: 'c1', topic: 'x' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByKey', () => {
    it('returns course with BigInt sequence converted', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({
        id: 1,
        key: 'k1',
        conversations: [{
          id: 'conv-1',
          messages: [{ id: 'm1', sequence: BigInt(1) }],
        }],
        steps: [],
      });

      const result = await service.findByKey('k1');
      expect(result.conversations[0].messages[0].sequence).toBe(1);
    });

    it('throws NotFoundException when course not found', async () => {
      mockPrisma.course.findFirst.mockResolvedValue(null);
      await expect(service.findByKey('bad')).rejects.toThrow(NotFoundException);
    });
  });

  describe('setAudience', () => {
    it('updates audience and returns AI message', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1, input: { topic: 'AI' } });
      mockPrisma.course.update.mockResolvedValue({});
      mockPrisma.message.findFirst.mockResolvedValue({ sequence: BigInt(1) });
      mockPrisma.message.create.mockResolvedValue({});

      const result = await service.setAudience({
        taskName: 'SET_AUDIENCE' as any,
        courseKey: 'k1',
        conversationKey: 'c1',
        audience: 'beginners',
      });
      expect(result.success).toBe(true);
      expect(result.aiMessage).toBeDefined();
    });

    it('throws NotFoundException when course not found', async () => {
      mockPrisma.course.findFirst.mockResolvedValue(null);
      await expect(
        service.setAudience({ taskName: 'SET_AUDIENCE' as any, courseKey: 'bad', conversationKey: 'c1', audience: 'x' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('setObjective', () => {
    it('creates step and enqueues job', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1, input: { topic: 'AI', audience: 'devs' } });
      mockPrisma.course.update.mockResolvedValue({});
      mockPrisma.message.findFirst.mockResolvedValue(null);
      mockPrisma.message.create.mockResolvedValue({});
      mockPrisma.courseStep.create.mockResolvedValue({});
      mockQueue.add.mockResolvedValue({});

      const result = await service.setObjective({
        taskName: 'SET_OBJECTIVE' as any,
        courseKey: 'k1',
        conversationKey: 'c1',
        objective: 'learn basics',
      });
      expect(result.success).toBe(true);
      expect(mockQueue.add).toHaveBeenCalledWith('generate_objectives', expect.objectContaining({ courseKey: 'k1' }));
    });
  });

  describe('setBuildingMethod', () => {
    it('updates building method and returns AI message', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1, input: {} });
      mockPrisma.course.update.mockResolvedValue({});
      mockPrisma.message.findFirst.mockResolvedValue(null);
      mockPrisma.message.create.mockResolvedValue({});

      const result = await service.setBuildingMethod('k1', {
        taskName: 'SET_BUILDING_METHOD' as any,
        conversationKey: 'c1',
        buildingMethod: 'ai',
      } as any);
      expect(result.success).toBe(true);
      expect(result.maxModules).toBe(10);
    });

    it('throws NotFoundException when course not found', async () => {
      mockPrisma.course.findFirst.mockResolvedValue(null);
      await expect(
        service.setBuildingMethod('bad', { conversationKey: 'c1', buildingMethod: 'ai' } as any),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('setModules', () => {
    it('updates modules count and returns AI message', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1, input: {} });
      mockPrisma.course.update.mockResolvedValue({});
      mockPrisma.message.findFirst.mockResolvedValue(null);
      mockPrisma.message.create.mockResolvedValue({});

      const result = await service.setModules('k1', {
        taskName: 'SET_MODULES' as any,
        conversationKey: 'c1',
        modulesCount: 3,
      } as any);
      expect(result.success).toBe(true);
      expect(result.modulesCount).toBe(3);
      expect(result.maxUnits).toBe(10);
    });
  });

  describe('setUnits', () => {
    it('updates units and returns next screen', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1, input: {} });
      mockPrisma.course.update.mockResolvedValue({});
      mockPrisma.message.findFirst.mockResolvedValue(null);
      mockPrisma.message.create.mockResolvedValue({});

      const result = await service.setUnits('k1', {
        taskName: 'SET_UNITS' as any,
        conversationKey: 'c1',
        modules: { '1': { units: 3 }, '2': { units: 2 } },
      } as any);
      expect(result.success).toBe(true);
      expect(result.nextScreen).toBe('evaluation');
    });
  });

  describe('getExerciseTypes', () => {
    it('returns exercise components', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1 });
      mockPrisma.component.findMany.mockResolvedValue([
        { id: 1, name: 'Multiple Choice' },
        { id: 2, name: 'True/False' },
      ]);
      mockPrisma.message.findFirst.mockResolvedValue(null);
      mockPrisma.message.create.mockResolvedValue({});

      const result = await service.getExerciseTypes('k1', 'c1');
      expect(result.success).toBe(true);
      expect(result.exerciseTypes).toHaveLength(2);
    });

    it('throws NotFoundException when course not found', async () => {
      mockPrisma.course.findFirst.mockResolvedValue(null);
      await expect(service.getExerciseTypes('bad', 'c1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('setEvaluation', () => {
    it('updates evaluation and returns AI message', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1, input: {} });
      mockPrisma.course.update.mockResolvedValue({});
      mockPrisma.message.findFirst.mockResolvedValue(null);
      mockPrisma.message.create.mockResolvedValue({});

      const result = await service.setEvaluation('k1', 'c1', [{ id: 1, name: 'MCQ' }]);
      expect(result.success).toBe(true);
    });
  });

  describe('setEvaluationDetails', () => {
    it('updates evaluation details and returns next screen', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1, input: {} });
      mockPrisma.course.update.mockResolvedValue({});
      mockPrisma.message.findFirst.mockResolvedValue(null);
      mockPrisma.message.create.mockResolvedValue({});

      const result = await service.setEvaluationDetails('k1', {
        conversationKey: 'c1',
        knowledgeCheckEndUnit: true,
        knowledgeCheckEndModule: true,
        finalExercise: false,
        restrictions: '',
      });
      expect(result.success).toBe(true);
      expect(result.nextScreen).toBe('visualIdentity');
    });
  });

  describe('updateTitle', () => {
    it('delegates to prisma', async () => {
      mockPrisma.course.update.mockResolvedValue({ id: 1, title: 'New Title' });
      const result = await service.updateTitle(1, 'New Title');
      expect(result.title).toBe('New Title');
    });
  });

  describe('setBranding', () => {
    it('creates step and enqueues index generation', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1, input: {} });
      mockPrisma.course.update.mockResolvedValue({});
      mockPrisma.message.findFirst.mockResolvedValue(null);
      mockPrisma.message.create.mockResolvedValue({});
      mockPrisma.courseStep.create.mockResolvedValue({});
      mockQueue.add.mockResolvedValue({});

      const result = await service.setBranding('k1', {
        taskName: 'SET_BRANDING' as any,
        conversationKey: 'c1',
        primaryColor: '#000',
        secondaryColor: '#fff',
        fontFamily: 'Arial',
      } as any);
      expect(result.success).toBe(true);
      expect(result.nextScreen).toBe('generatingIndex');
      expect(mockQueue.add).toHaveBeenCalledWith('generate_index', expect.objectContaining({ courseKey: 'k1' }));
    });
  });

  describe('generateCourse', () => {
    it('creates jobs for modules with units', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({
        id: 1,
        input: { evaluationDetails: { knowledgeCheckEndModule: true, finalExercise: true } },
        output: {
          proposedIndex: {
            title: 'Course',
            modules: [
              {
                number: 1,
                title: 'Module 1',
                units: [
                  { code: '1.1', title: 'Unit 1' },
                  { code: '1.2', title: 'Evaluation' },
                ],
              },
            ],
          },
        },
      });
      mockPrisma.course.update.mockResolvedValue({});
      mockPrisma.courseStep.create.mockResolvedValue({});
      mockQueue.add.mockResolvedValue({});

      const result = await service.generateCourse('k1');
      expect(result.success).toBe(true);
      // intro(1) + content unit 1.1(1) + module eval(1) + course eval(1) = 4
      // (1.2 "Evaluation" is skipped as content)
      expect(result.totalJobs).toBe(4);
      expect(mockSSE.emitStatusChange).toHaveBeenCalledWith('k1', 'GENERATING_COURSE', 'running');
    });

    it('throws NotFoundException when course not found', async () => {
      mockPrisma.course.findFirst.mockResolvedValue(null);
      await expect(service.generateCourse('bad')).rejects.toThrow(NotFoundException);
    });

    it('throws NotFoundException when no proposed index', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1, input: {}, output: {} });
      await expect(service.generateCourse('k1')).rejects.toThrow(NotFoundException);
    });

    it('skips module eval and course eval when not configured', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({
        id: 1,
        input: {},
        output: {
          proposedIndex: {
            title: 'Course',
            modules: [{ number: 1, title: 'M1', units: [{ code: '1.1', title: 'U1' }] }],
          },
        },
      });
      mockPrisma.course.update.mockResolvedValue({});
      mockPrisma.courseStep.create.mockResolvedValue({});
      mockQueue.add.mockResolvedValue({});

      const result = await service.generateCourse('k1');
      // intro(1) + content(1) = 2 (no module eval, no course eval)
      expect(result.totalJobs).toBe(2);
    });
  });

  describe('findAllByUserId', () => {
    it('returns courses for user', async () => {
      mockPrisma.course.findMany.mockResolvedValue([
        { id: 1, key: 'k1', title: 'C1', status: 'completed' },
      ]);
      const result = await service.findAllByUserId('u1');
      expect(result).toHaveLength(1);
      expect(result[0].key).toBe('k1');
    });
  });

  describe('getCourseComponents', () => {
    it('returns components for a course', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1 });
      mockPrisma.courseComponent.findMany.mockResolvedValue([
        {
          id: 10,
          module: 1,
          unit: 1,
          sequence: 1,
          data: {},
          component: { internalName: 'text_block', name: 'Text Block', type: 'content' },
        },
      ]);

      const result = await service.getCourseComponents('k1');
      expect(result.courseId).toBe(1);
      expect(result.components).toHaveLength(1);
      expect(result.components[0].componentName).toBe('text_block');
    });

    it('throws NotFoundException when course not found', async () => {
      mockPrisma.course.findFirst.mockResolvedValue(null);
      await expect(service.getCourseComponents('bad')).rejects.toThrow(NotFoundException);
    });
  });
});
