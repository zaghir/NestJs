import { Test, TestingModule } from '@nestjs/testing';
import { ValidationBlController } from './validation-bl.controller';

describe('ValidationBl Controller', () => {
  let controller: ValidationBlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValidationBlController],
    }).compile();

    controller = module.get<ValidationBlController>(ValidationBlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
