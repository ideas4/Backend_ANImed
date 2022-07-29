import { Test, TestingModule } from '@nestjs/testing';
import { ControlfelLimiteService } from './controlfel-limite.service';

describe('ControlfelLimiteService', () => {
  let service: ControlfelLimiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ControlfelLimiteService],
    }).compile();

    service = module.get<ControlfelLimiteService>(ControlfelLimiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
