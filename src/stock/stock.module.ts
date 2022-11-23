import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Stock } from './entities/stock.entity';

@Module({
  imports : [TypeOrmModule.forFeature([User,Stock])],
  controllers: [StockController],
  providers: [StockService]
})
export class StockModule {}
