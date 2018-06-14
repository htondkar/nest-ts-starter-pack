import AppController from 'Controllers/app.controller'
import { CorsMiddleware } from 'Middlewares/CORS.middleware'
import AuthModule from 'Modules/Auth/Auth.module'
import UserModule from 'Modules/User/user.module'

import { MiddlewaresConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [UserModule, AuthModule, CorsMiddleware, TypeOrmModule.forRoot()],
  controllers: [AppController],
  components: [],
})
export default class AppModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply([CorsMiddleware]).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
