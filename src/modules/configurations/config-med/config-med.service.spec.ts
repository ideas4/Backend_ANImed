import { Test, TestingModule } from '@nestjs/testing';
import { ConfigMedService } from './config-med.service';

describe('ConfigMedService', () => {
  let service: ConfigMedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigMedService],
    }).compile();

    service = module.get<ConfigMedService>(ConfigMedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
