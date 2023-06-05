export interface TruckData {
  locationid: string;
  applicant: string;
  facilityType: string;
  locationDescription: string;
  address: string;
  latitude: string;
  longitude: string;
  foodItems: string;
  schedule: string;
  daysHours: string;
}

export interface FoodTruckQueryParams {
  name?: string;
  foodItems?: string;
}
