import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  Header,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
/*
when you dont add any route in the ontroller parameter then the default route will be your-domain-.com/ or in this case localhost
examples id we add products as a string to the controller @Controller('products')then this controller 
will use your-domain.com/products as its base route and will only be targeted for that
*/
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   *
   * if you want the get request to be linked to users route then here you would add @Get('users') and that will be considered as your-domain.com/users get route call.
   */
  @Get()
  getHello(): { name: string } {
    return { name: 'Max' };
    // return this.appService.getHello();
  }
}
