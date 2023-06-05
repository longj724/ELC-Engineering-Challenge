import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodTrucksModule } from './food-trucks/food-trucks.module';

@Module({
  imports: [FoodTrucksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
