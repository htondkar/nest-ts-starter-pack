import { AuthService } from 'Services/Auth/Auth.service'

import { Controller, Post, Body } from '@nestjs/common'
import { LoginDTO } from 'dataTransferObjects/Auth/login.DTO'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDTO) {
    return this.authService.login(body)
  }
}
