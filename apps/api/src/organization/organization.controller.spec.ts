import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';

const mockService = {
  create: jest.fn(),
  getUserOrganizations: jest.fn(),
  getOrganization: jest.fn(),
  inviteMember: jest.fn(),
  updateMemberRole: jest.fn(),
  removeMember: jest.fn(),
};

describe('OrganizationController', () => {
  let controller: OrganizationController;
  const req = { user: { id: 'uid' } } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationController],
      providers: [{ provide: OrganizationService, useValue: mockService }],
    }).compile();
    controller = module.get<OrganizationController>(OrganizationController);
    jest.clearAllMocks();
  });

  it('create delegates to service', async () => {
    mockService.create.mockResolvedValue({ id: 1 });
    const result = await controller.create(req, { name: 'Org' });
    expect(result.id).toBe(1);
  });

  it('getMyOrganizations delegates to service', async () => {
    mockService.getUserOrganizations.mockResolvedValue([]);
    const result = await controller.getMyOrganizations(req);
    expect(result).toEqual([]);
  });

  it('getOrganization delegates to service', async () => {
    mockService.getOrganization.mockResolvedValue({ id: 1 });
    const result = await controller.getOrganization('key');
    expect(result.id).toBe(1);
  });

  it('inviteMember delegates to service', async () => {
    mockService.inviteMember.mockResolvedValue({ message: 'ok' });
    const result = await controller.inviteMember('key', { email: 'a@b.com', role: 'student' });
    expect(result.message).toBe('ok');
  });

  it('updateMemberRole delegates to service', async () => {
    mockService.updateMemberRole.mockResolvedValue({ role: 'editor' });
    const result = await controller.updateMemberRole('key', 'u1', { role: 'editor' });
    expect(result.role).toBe('editor');
  });

  it('removeMember delegates to service', async () => {
    mockService.removeMember.mockResolvedValue({});
    await controller.removeMember('key', 'u1');
    expect(mockService.removeMember).toHaveBeenCalledWith('key', 'u1');
  });
});
