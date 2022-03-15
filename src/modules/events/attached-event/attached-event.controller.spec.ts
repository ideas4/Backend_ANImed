import { Test, TestingModule } from '@nestjs/testing';
import { AttachedEventController } from './attached-event.controller';

describe('AttachedEventController', () => {
  let controller: AttachedEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttachedEventController],
    }).compile();

    controller = module.get<AttachedEventController>(AttachedEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
