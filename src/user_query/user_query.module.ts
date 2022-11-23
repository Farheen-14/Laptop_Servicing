import { Module } from '@nestjs/common';
import { UserQueryService } from './user_query.service';
import { UserQueryController } from './user_query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserQuery } from './entities/user_query.entity';

@Module({
  imports : [TypeOrmModule.forFeature([User,UserQuery])],
  controllers: [UserQueryController],
  providers: [UserQueryService]
})
export class UserQueryModule {}
