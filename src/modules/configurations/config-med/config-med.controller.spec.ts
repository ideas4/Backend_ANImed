import { Test, TestingModule } from '@nestjs/testing';
import { ConfigMedController } from './config-med.controller';

describe('ConfigMedController', () => {
  let controller: ConfigMedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigMedController],
    }).compile();

    controller = module.get<ConfigMedController>(ConfigMedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
