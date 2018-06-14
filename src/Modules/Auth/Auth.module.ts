import { AuthController } from 'Controllers/auth.controller'
import UserModule from 'Modules/User/user.module'
import { AuthService } from 'Services/Auth/Auth.service'
import { JwtStrategy } from 'Services/Auth/jwt.strategy'
import { Module } from '@nestjs/common'

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  components: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export default class AuthModule {
  // empty class
}
