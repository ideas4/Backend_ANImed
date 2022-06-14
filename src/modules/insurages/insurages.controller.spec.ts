import { Test, TestingModule } from '@nestjs/testing';
import { InsuragesController } from './insurages.controller';

describe('InsuragesController', () => {
  let controller: InsuragesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InsuragesController],
    }).compile();

    controller = module.get<InsuragesController>(InsuragesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
