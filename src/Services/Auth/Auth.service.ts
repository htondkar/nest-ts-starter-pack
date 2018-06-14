import * as jwt from 'jsonwebtoken'
import { Component, BadRequestException } from '@nestjs/common'
import UserService from 'Services/User/user.service'
import { UserEntity } from '../../Entities/User.entity'
import { LoginDTO } from 'dataTransferObjects/Auth/login.DTO'

export type loginCredentials = { email: string; password: 'string' }

@Component()
export class AuthService {
  constructor(private readonly Users: UserService) {}

  async login(credentials: LoginDTO) {
    const user = await this.validateUser(credentials)

    if (!user) {
      throw new BadRequestException('username or password is wrong')
    }

    return this.createToken(user)
  }

  async createToken(user: UserEntity) {
    const SECRET_CODE = 'secret'
    const expiresIn = 60 * 60 * 60

    const token = jwt.sign({ email: user.email, name: user.name }, SECRET_CODE, { expiresIn })

    return {
      token,
      expiresIn,
    }
  }

  async validateUser(credentials: LoginDTO): Promise<any> {
    return await this.Users.getUserByEmail(credentials.email)
  }
}
