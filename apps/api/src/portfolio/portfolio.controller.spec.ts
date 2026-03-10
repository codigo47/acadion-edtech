import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';

const mockPortfolioService = {
  getMyPortfolio: jest.fn(),
  upsertPortfolio: jest.fn(),
  updateCourses: jest.fn(),
  getPortfolioAnalytics: jest.fn(),
  getByUsername: jest.fn(),
  trackVisit: jest.fn(),
  sendContactMessage: jest.fn(),
};

describe('PortfolioController', () => {
  let controller: PortfolioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortfolioController],
      providers: [{ provide: PortfolioService, useValue: mockPortfolioService }],
    }).compile();
    controller = module.get<PortfolioController>(PortfolioController);
    jest.clearAllMocks();
  });

  const req = { user: { id: 'uid', email: 'a@b.com' } } as any;

  it('getMyPortfolio delegates to service', async () => {
    mockPortfolioService.getMyPortfolio.mockResolvedValue({ id: 1 });
    const result = await controller.getMyPortfolio(req);
    expect(result.id).toBe(1);
  });

  it('updatePortfolio delegates to service', async () => {
    mockPortfolioService.upsertPortfolio.mockResolvedValue({ id: 1 });
    const result = await controller.updatePortfolio(req, { title: 'New' });
    expect(result.id).toBe(1);
  });

  it('updateCourses delegates to service', async () => {
    mockPortfolioService.updateCourses.mockResolvedValue({ id: 1 });
    const result = await controller.updateCourses(req, { courseIds: [1, 2] });
    expect(result.id).toBe(1);
  });

  it('getAnalytics delegates to service', async () => {
    mockPortfolioService.getPortfolioAnalytics.mockResolvedValue({ totalVisits: 10 });
    const result = await controller.getAnalytics(req);
    expect(result.totalVisits).toBe(10);
  });

  it('getByUsername delegates to service', async () => {
    mockPortfolioService.getByUsername.mockResolvedValue({ user: {}, portfolio: {} });
    const result = await controller.getByUsername('test');
    expect(result).toBeDefined();
  });

  it('trackVisit delegates to service', async () => {
    mockPortfolioService.trackVisit.mockResolvedValue({ id: 1 });
    const result = await controller.trackVisit('test', { country: 'AR' });
    expect(result.id).toBe(1);
  });

  it('sendContact delegates to service', async () => {
    mockPortfolioService.sendContactMessage.mockResolvedValue({ id: 1 });
    const result = await controller.sendContact('test', { name: 'J', email: 'j@t.com', message: 'Hi' });
    expect(result.id).toBe(1);
  });
});
