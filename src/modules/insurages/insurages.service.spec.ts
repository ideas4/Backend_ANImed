import { Test, TestingModule } from '@nestjs/testing';
import { InsuragesService } from './insurages.service';

describe('InsuragesService', () => {
  let service: InsuragesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InsuragesService],
    }).compile();

    service = module.get<InsuragesService>(InsuragesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
