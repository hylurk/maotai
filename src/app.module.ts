import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './task.service';
import { LoginService } from './login.service';
import { ProductService } from './product.service';
import { SpiderService } from './spider.service'

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, TasksService, LoginService, ProductService, SpiderService],
})
export class AppModule {}
