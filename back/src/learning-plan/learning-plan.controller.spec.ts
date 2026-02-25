import { Test, TestingModule } from '@nestjs/testing';
import { LearningPlanController } from './learning-plan.controller';
import { LearningPlanService } from './learning-plan.service';

const mockService = {
  getOrgPlans: jest.fn(),
  getPlanDetail: jest.fn(),
  createPlan: jest.fn(),
  updatePlan: jest.fn(),
  deletePlan: jest.fn(),
  addCourse: jest.fn(),
  removeCourse: jest.fn(),
  reorderCourses: jest.fn(),
  assignToUser: jest.fn(),
  assignToGroup: jest.fn(),
  getStudentPlanDetail: jest.fn(),
};

describe('LearningPlanController', () => {
  let controller: LearningPlanController;
  const req = { user: { id: 'uid' } } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearningPlanController],
      providers: [{ provide: LearningPlanService, useValue: mockService }],
    }).compile();
    controller = module.get<LearningPlanController>(LearningPlanController);
    jest.clearAllMocks();
  });

  it('getOrgPlans delegates', async () => {
    mockService.getOrgPlans.mockResolvedValue([]);
    expect(await controller.getOrgPlans('org')).toEqual([]);
  });

  it('getPlanDetail delegates', async () => {
    mockService.getPlanDetail.mockResolvedValue({ id: 1 });
    expect(await controller.getPlanDetail(1)).toEqual({ id: 1 });
  });

  it('createPlan delegates', async () => {
    mockService.createPlan.mockResolvedValue({ id: 1 });
    expect(await controller.createPlan('org', { name: 'P' })).toEqual({ id: 1 });
  });

  it('updatePlan delegates', async () => {
    mockService.updatePlan.mockResolvedValue({ id: 1 });
    expect(await controller.updatePlan(1, { name: 'U' })).toEqual({ id: 1 });
  });

  it('deletePlan delegates', async () => {
    mockService.deletePlan.mockResolvedValue({ id: 1 });
    expect(await controller.deletePlan(1)).toEqual({ id: 1 });
  });

  it('addCourse delegates', async () => {
    mockService.addCourse.mockResolvedValue({ courseId: 5 });
    expect(await controller.addCourse(1, { courseId: 5 })).toEqual({ courseId: 5 });
  });

  it('removeCourse delegates', async () => {
    mockService.removeCourse.mockResolvedValue({});
    await controller.removeCourse(1, 5);
    expect(mockService.removeCourse).toHaveBeenCalledWith(1, 5);
  });

  it('reorderCourses delegates', async () => {
    mockService.reorderCourses.mockResolvedValue([]);
    await controller.reorderCourses(1, { courses: [] });
    expect(mockService.reorderCourses).toHaveBeenCalled();
  });

  it('assignToUser delegates', async () => {
    mockService.assignToUser.mockResolvedValue({ id: 1 });
    expect(await controller.assignToUser(1, { userId: 'u1' })).toEqual({ id: 1 });
  });

  it('assignToGroup delegates', async () => {
    mockService.assignToGroup.mockResolvedValue({ assigned: 2, total: 3 });
    expect(await controller.assignToGroup(1, { groupId: 10 })).toEqual({ assigned: 2, total: 3 });
  });

  it('getStudentPlanDetail delegates', async () => {
    mockService.getStudentPlanDetail.mockResolvedValue({ id: 1 });
    expect(await controller.getStudentPlanDetail(1, req)).toEqual({ id: 1 });
  });
});
