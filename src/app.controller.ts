import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  index() {
    return 'This is a REST API for the https://data.sfgov.org/ Food Truck CSV Data Set. Documentation for this API can be found at https://github.com/longj724/ELC-Engineering-Challenge';
  }
}
