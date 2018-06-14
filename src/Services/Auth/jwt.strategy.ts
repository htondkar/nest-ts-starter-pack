import * as passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Component, UnauthorizedException } from '@nestjs/common'
import { AuthService, loginCredentials } from './Auth.service'
import { Request } from 'express'
import { UserEntity } from '../../Entities/User.entity'

type passportDone = (error: Error | null, data: UserEntity | false) => void

@Component()
export class JwtStrategy extends Strategy {
  constructor(private readonly authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: 'secret',
      },
      async (req: Request, payload: loginCredentials, next: passportDone) =>
        await this.verify(req, payload, next)
    )

    passport.use(this)
  }

  public verify = async (req: Request, payload: loginCredentials, done: passportDone) => {
    const user = await this.authService.validateUser(payload)

    if (!user) {
      return done(new UnauthorizedException(), false)
    }

    done(null, user)
  }
}
