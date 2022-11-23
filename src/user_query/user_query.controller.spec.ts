import { Test, TestingModule } from '@nestjs/testing';
import { UserQueryController } from './user_query.controller';
import { UserQueryService } from './user_query.service';

describe('UserQueryController', () => {
  let controller: UserQueryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserQueryController],
      providers: [UserQueryService],
    }).compile();

    controller = module.get<UserQueryController>(UserQueryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
