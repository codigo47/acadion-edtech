import { Test, TestingModule } from '@nestjs/testing';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

const mockService = {
  getOrgGroups: jest.fn(),
  getGroupDetail: jest.fn(),
  createGroup: jest.fn(),
  updateGroup: jest.fn(),
  deleteGroup: jest.fn(),
  addMember: jest.fn(),
  removeMember: jest.fn(),
};

describe('GroupController', () => {
  let controller: GroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupController],
      providers: [{ provide: GroupService, useValue: mockService }],
    }).compile();
    controller = module.get<GroupController>(GroupController);
    jest.clearAllMocks();
  });

  it('getOrgGroups delegates to service', async () => {
    mockService.getOrgGroups.mockResolvedValue([]);
    const result = await controller.getOrgGroups('org-key');
    expect(result).toEqual([]);
  });

  it('getGroupDetail delegates to service', async () => {
    mockService.getGroupDetail.mockResolvedValue({ id: 1 });
    const result = await controller.getGroupDetail(1);
    expect(result.id).toBe(1);
  });

  it('createGroup delegates to service', async () => {
    mockService.createGroup.mockResolvedValue({ id: 1, name: 'G' });
    const result = await controller.createGroup('org-key', { name: 'G' });
    expect(result.name).toBe('G');
  });

  it('updateGroup delegates to service', async () => {
    mockService.updateGroup.mockResolvedValue({ id: 1 });
    const result = await controller.updateGroup(1, { name: 'Updated' });
    expect(result.id).toBe(1);
  });

  it('deleteGroup delegates to service', async () => {
    mockService.deleteGroup.mockResolvedValue({ id: 1 });
    const result = await controller.deleteGroup(1);
    expect(result.id).toBe(1);
  });

  it('addMember delegates to service', async () => {
    mockService.addMember.mockResolvedValue({ groupId: 1, userId: 'u1' });
    const result = await controller.addMember(1, { userId: 'u1' });
    expect(result.userId).toBe('u1');
  });

  it('removeMember delegates to service', async () => {
    mockService.removeMember.mockResolvedValue({});
    await controller.removeMember(1, 'u1');
    expect(mockService.removeMember).toHaveBeenCalledWith(1, 'u1');
  });
});
