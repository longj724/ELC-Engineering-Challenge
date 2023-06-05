import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { FoodTrucksService } from './food-trucks.service';
import * as fs from 'fs';
import * as path from 'path';
import { parse, unparse } from 'papaparse';
import { TruckData } from './types';
import { HttpService } from '@nestjs/axios';

describe('FoodTrucksService', () => {
  let httpService: DeepMocked<HttpService>;
  let foodTruckService: FoodTrucksService;
  let foodTruckCSV;
  let allMockTruckData: Array<TruckData | null> = [];

  beforeAll(async () => {
    return new Promise<void>((res) => {
      const filePath = path.resolve(
        __dirname,
        'Mobile_Food_Facility_Permit.csv',
      );

      const stream = fs.createReadStream(filePath);
      parse(stream, {
        complete: ({ data }) => {
          foodTruckCSV = unparse(data);
          allMockTruckData = data.map(
            (truckData: Array<string>, index: number) => {
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
            },
          );

          allMockTruckData = allMockTruckData.filter(
            (truckData) => truckData !== null,
          );

          res();
        },
      });
    });
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodTrucksService],
    })
      .useMocker(createMock)
      .compile();

    foodTruckService = module.get<FoodTrucksService>(FoodTrucksService);
    httpService = module.get(HttpService);
  });

  it('return all food trucks with the correct fields', async () => {
    httpService.axiosRef.mockResolvedValue({
      data: foodTruckCSV,
      headers: {},
      config: { url: '' },
      status: 200,
      statusText: '',
    });

    const getFoodTrucks = foodTruckService.getFoodTrucks({});

    await expect(getFoodTrucks).resolves.toStrictEqual(allMockTruckData);
  });

  it('return all food trucks that serve donuts', async () => {
    const foodItems = 'bbq chicken';
    httpService.axiosRef.mockResolvedValue({
      data: foodTruckCSV,
      headers: {},
      config: { url: '' },
      status: 200,
      statusText: '',
    });

    const foodTrucksWithDonuts = allMockTruckData.filter((truckData) =>
      truckData.foodItems.toUpperCase().includes(foodItems.toUpperCase()),
    );

    const getFoodTrucks = foodTruckService.getFoodTrucks({ foodItems });

    await expect(getFoodTrucks).resolves.toStrictEqual(foodTrucksWithDonuts);
  });

  it("returns all San Francisco's Hometown Creamery locations that serve ice cream", async () => {
    const name = "San Francisco's Hometown Creamery";
    const foodItems = 'ice cream';
    httpService.axiosRef.mockResolvedValue({
      data: foodTruckCSV,
      headers: {},
      config: { url: '' },
      status: 200,
      statusText: '',
    });

    const foodTrucksWithDonuts = allMockTruckData.filter(
      (truckData) =>
        truckData.foodItems.toUpperCase().includes(foodItems.toUpperCase()) &&
        truckData.applicant.toUpperCase().includes(name.toUpperCase()),
    );

    const getFoodTrucks = foodTruckService.getFoodTrucks({ name, foodItems });

    await expect(getFoodTrucks).resolves.toStrictEqual(foodTrucksWithDonuts);
  });
});
