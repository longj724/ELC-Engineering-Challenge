import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FoodTrucksModule } from './food-trucks/food-trucks.module';

@Module({
  imports: [FoodTrucksModule],
  controllers: [AppController],
})
export class AppModule {}
