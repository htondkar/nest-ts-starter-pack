import { Get, Controller } from '@nestjs/common'

@Controller()
export default class AppController {
  @Get()
  root() {
    return {
      date: new Date(),
      uptime: process.uptime(),
    }
  }
}
