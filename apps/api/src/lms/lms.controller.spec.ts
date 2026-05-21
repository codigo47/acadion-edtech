import { Test, TestingModule } from '@nestjs/testing';
import { LmsController } from './lms.controller';
import { LmsService } from './lms.service';
import { AdaptiveService } from './adaptive.service';

const mockLmsService = {
  getStudentDashboard: jest.fn(),
  getCourseContent: jest.fn(),
  selfEnroll: jest.fn(),
  updateProgress: jest.fn(),
  completeCourse: jest.fn(),
  submitKnowledgeCheck: jest.fn(),
  adminEnroll: jest.fn(),
  adminReEnroll: jest.fn(),
};

const mockAdaptiveService = {
  getPreAssessment: jest.fn(),
  submitPreAssessment: jest.fn(),
  getPostAssessment: jest.fn(),
  submitPostAssessment: jest.fn(),
};

describe('LmsController', () => {
  let controller: LmsController;
  const req = { user: { id: 'uid' } } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LmsController],
      providers: [
        { provide: LmsService, useValue: mockLmsService },
        { provide: AdaptiveService, useValue: mockAdaptiveService },
      ],
    }).compile();
    controller = module.get<LmsController>(LmsController);
    jest.clearAllMocks();
  });

  it('getStudentDashboard delegates', async () => {
    mockLmsService.getStudentDashboard.mockResolvedValue({ enrolledCourses: [] });
    const result = await controller.getStudentDashboard(req);
    expect(result.enrolledCourses).toEqual([]);
  });

  it('getCourseContent delegates', async () => {
    mockLmsService.getCourseContent.mockResolvedValue({ courseKey: 'c1' });
    const result = await controller.getCourseContent('c1', req);
    expect(result.courseKey).toBe('c1');
  });

  it('selfEnroll delegates', async () => {
    mockLmsService.selfEnroll.mockResolvedValue({ id: 1 });
    const result = await controller.selfEnroll('c1', req);
    expect(result.id).toBe(1);
  });

  it('updateProgress delegates', async () => {
    mockLmsService.updateProgress.mockResolvedValue({ progress: 50 });
    const result = await controller.updateProgress('c1', req, { unitCode: '1.1', timeSpentSeconds: 10, completed: false });
    expect(result.progress).toBe(50);
  });

  it('completeCourse delegates', async () => {
    mockLmsService.completeCourse.mockResolvedValue({ id: 1 });
    const result = await controller.completeCourse('c1', req, { passed: true, score: 90 });
    expect(result.id).toBe(1);
  });

  it('submitKnowledgeCheck delegates', async () => {
    mockLmsService.submitKnowledgeCheck.mockResolvedValue({ attemptNumber: 1 });
    const result = await controller.submitKnowledgeCheck('c1', req, { unitCode: '1.1', questionIndex: 0, answer: 'A', isCorrect: true });
    expect(result.attemptNumber).toBe(1);
  });

  it('adminEnroll delegates', async () => {
    mockLmsService.adminEnroll.mockResolvedValue({ id: 1 });
    const result = await controller.adminEnroll('c1', { userId: 'u1' });
    expect(result.id).toBe(1);
  });

  it('adminReEnroll delegates', async () => {
    mockLmsService.adminReEnroll.mockResolvedValue({ id: 1 });
    const result = await controller.adminReEnroll('c1', 'u1');
    expect(result.id).toBe(1);
  });

  it('getPreAssessment delegates to adaptive service', async () => {
    mockAdaptiveService.getPreAssessment.mockResolvedValue({ units: [] });
    const result = await controller.getPreAssessment('c1', req);
    expect(result.units).toEqual([]);
  });

  it('submitPreAssessment delegates to adaptive service', async () => {
    mockAdaptiveService.submitPreAssessment.mockResolvedValue({ path: [] });
    const result = await controller.submitPreAssessment('c1', req, { enrollmentId: 1, answers: [] });
    expect(result.path).toEqual([]);
  });

  it('getPostAssessment delegates to adaptive service', async () => {
    mockAdaptiveService.getPostAssessment.mockResolvedValue({ units: [] });
    const result = await controller.getPostAssessment('c1', req);
    expect(result.units).toEqual([]);
  });

  it('submitPostAssessment delegates to adaptive service', async () => {
    mockAdaptiveService.submitPostAssessment.mockResolvedValue({ comparison: [] });
    const result = await controller.submitPostAssessment('c1', req, { enrollmentId: 1, answers: [] });
    expect(result.comparison).toEqual([]);
  });
});
