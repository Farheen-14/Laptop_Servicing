import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { StockModule } from './stock/stock.module';
import { UserQueryModule } from './user_query/user_query.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type : 'mysql',
    host : 'localhost',
    username : 'root',
    password : 'root',
    port : 3306,
    database : 'laptopservicing',
    autoLoadEntities : true,
    synchronize : true
  }), UserModule, StockModule, UserQueryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
