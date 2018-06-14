import { UserEntity } from 'Entities/User.entity';
import { NextFunction, Request, Response } from 'express';
import * as passport from 'passport';

import { CanActivate, ExecutionContext, Guard, UnauthorizedException } from '@nestjs/common';

type GuardCtx = {res: Response & {req: Request & {user?: UserEntity}}; next: NextFunction}

@Guard()
export default class AuthGuard implements CanActivate {
  async canActivate(
    { res, next }: GuardCtx,
    context: ExecutionContext,
  ): Promise<boolean> {

    const isAuthenticated = await new Promise<boolean>((resolve, reject) => {
      const authenticator = passport.authenticate(
        'jwt',
        { session: false },
        (error: Error, user: UserEntity) => {
          if (error || !user) return resolve(false)
          res.req.user = user
          return resolve(true)
        },
      )

      authenticator(res.req, res, next)
    })

    if (!isAuthenticated) throw new UnauthorizedException()

    return true
  }
}
