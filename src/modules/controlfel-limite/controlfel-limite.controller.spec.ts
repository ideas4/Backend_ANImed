import { Test, TestingModule } from '@nestjs/testing';
import { ControlfelLimiteController } from './controlfel-limite.controller';

describe('ControlfelLimiteController', () => {
  let controller: ControlfelLimiteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ControlfelLimiteController],
    }).compile();

    controller = module.get<ControlfelLimiteController>(ControlfelLimiteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
