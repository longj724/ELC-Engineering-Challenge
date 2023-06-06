### Overview

This is a REST API for the CSV dataset found at [DataSF.org](https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat/data). It is built using [NestJS](https://nestjs.com/) and hosted at https://elc-engineering-challenge-production.up.railway.app/food-trucks. A frontend that uses this API to display food truck data
can be found at https://elc-engineering-challenge-frontend.vercel.app/. The frontend is built using React and (Mapbox)[https://www.mapbox.com/]to render the markers on the map. The frontend repository can be found at - https://github.com/longj724/ELC-Engineering-Challenge-Frontend.

### Documentation

Endpoints

- (GET) https://elc-engineering-challenge-production.up.railway.app/food-trucks
  - Optional Query Parameters
    - food-items: Returns food trucks that serve the entered food items.
    - name: Returns food trucks that match the entered name.

### Running the API locally

1. Clone this repository
2. Run `yarn install`
3. Create a .env file and add the `PORT` variable. The port can be whatever port you want to access the API on.
4. The API can be accessed at http://localhost:(YOUR_PORT_NUMBER)/food-trucks
