import { Injectable } from '@nestjs/common';
import { parse } from 'papaparse';
import { HttpService } from '@nestjs/axios';
import { TruckData, FoodTruckQueryParams } from './types';

const FOOD_TRUCK_DATA_URL =
  'https://data.sfgov.org/api/views/rqzj-sfat/rows.csv';

@Injectable()
export class FoodTrucksService {
  constructor(private readonly httpService: HttpService) {}

  private async _fetchFoodTruckData() {
    const { data } = await this.httpService.axiosRef({
      method: 'GET',
      url: FOOD_TRUCK_DATA_URL,
    });
    let truckData = [];

    parse(data, {
      complete: ({ data }) => {
        truckData = data.map((truckData: Array<string>, index: number) => {
          if (index === 0 || truckData.length < 29) return null;

          return {
            locationid: truckData[0],
            applicant: truckData[1],
            facilityType: truckData[2],
            locationDescription: truckData[4],
            address: truckData[5],
            foodItems: truckData[11],
            latitude: truckData[14],
            longitude: truckData[15],
            schedule: truckData[16],
            daysHours: truckData[17],
          };
        });

        truckData = truckData.filter((truckData) => truckData !== null);
      },
    });

    return truckData;
  }

  async getFoodTrucks({ foodItems, name }: FoodTruckQueryParams) {
    let foodTruckData = await this._fetchFoodTruckData();

    if (foodItems) {
      foodTruckData = foodTruckData.filter((truckData: TruckData) =>
        truckData.foodItems.toUpperCase().includes(foodItems.toUpperCase()),
      );
    }

    if (name) {
      foodTruckData = foodTruckData.filter((truckData: TruckData) =>
        truckData.applicant.toUpperCase().includes(name.toUpperCase()),
      );
    }

    return foodTruckData;
  }
}
