import { Test, TestingModule } from '@nestjs/testing';
import { AttachedEventService } from './attached-event.service';

describe('AttachedEventService', () => {
  let service: AttachedEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttachedEventService],
    }).compile();

    service = module.get<AttachedEventService>(AttachedEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
