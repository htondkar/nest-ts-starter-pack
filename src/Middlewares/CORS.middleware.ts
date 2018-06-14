import { ExpressMiddleware, Middleware, NestMiddleware } from '@nestjs/common'

const allowedOrigins = ['http://localhost:3000']

@Middleware()
export class CorsMiddleware implements NestMiddleware {
  resolve(): ExpressMiddleware {
    return (req, res, next) => {
      if (allowedOrigins.indexOf(req.header('Origin')) > -1) {
        res.header('Access-Control-Allow-Origin', req.header('Origin'))
        res.header('Access-Control-Allow-Headers', 'content-type')
        res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')
      }

      next()
    }
  }
}
