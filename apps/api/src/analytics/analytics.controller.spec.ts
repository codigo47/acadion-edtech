import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

const mockAnalyticsService = {
  getCourseAnalytics: jest.fn(),
  getCourseUserProgress: jest.fn(),
  getOrgAnalytics: jest.fn(),
  getStudentAnalytics: jest.fn(),
};

describe('AnalyticsController', () => {
  let controller: AnalyticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalyticsController],
      providers: [{ provide: AnalyticsService, useValue: mockAnalyticsService }],
    }).compile();
    controller = module.get<AnalyticsController>(AnalyticsController);
    jest.clearAllMocks();
  });

  it('getCourseAnalytics delegates to service', async () => {
    mockAnalyticsService.getCourseAnalytics.mockResolvedValue({ totalEnrollments: 5 });
    const result = await controller.getCourseAnalytics('key');
    expect(result.totalEnrollments).toBe(5);
  });

  it('getCourseUserProgress delegates to service', async () => {
    mockAnalyticsService.getCourseUserProgress.mockResolvedValue([]);
    const result = await controller.getCourseUserProgress('key');
    expect(result).toEqual([]);
  });

  it('getOrgAnalytics delegates to service', async () => {
    mockAnalyticsService.getOrgAnalytics.mockResolvedValue({ orgName: 'Org' });
    const result = await controller.getOrgAnalytics('org-key');
    expect(result.orgName).toBe('Org');
  });

  it('getStudentAnalytics delegates to service', async () => {
    mockAnalyticsService.getStudentAnalytics.mockResolvedValue({ totalEnrolled: 3 });
    const req = { user: { id: 'uid' } };
    const result = await controller.getStudentAnalytics(req);
    expect(result.totalEnrolled).toBe(3);
  });
});
