import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World this is new nesstjs app that will be used to do something!';
  }
}
