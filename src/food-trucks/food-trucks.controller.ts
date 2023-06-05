import { Controller, Get, Query } from '@nestjs/common';
import { FoodTrucksService } from './food-trucks.service';

@Controller('food-trucks')
export class FoodTrucksController {
  constructor(private readonly foodTrucksService: FoodTrucksService) {}

  @Get()
  findFoodTrucks(
    @Query('food-items') foodItems: string,
    @Query('name') name: string,
  ) {
    return this.foodTrucksService.getFoodTrucks({ foodItems, name });
  }
}
