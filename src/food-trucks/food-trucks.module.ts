import { Module } from '@nestjs/common';
import { FoodTrucksService } from './food-trucks.service';
import { FoodTrucksController } from './food-trucks.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [FoodTrucksController],
  providers: [FoodTrucksService],
})
export class FoodTrucksModule {}
