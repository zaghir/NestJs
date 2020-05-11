import { Test, TestingModule } from '@nestjs/testing';
import { ValidationBlService } from './validation-bl.service';

describe('ValidationBlService', () => {
  let service: ValidationBlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidationBlService],
    }).compile();

    service = module.get<ValidationBlService>(ValidationBlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
