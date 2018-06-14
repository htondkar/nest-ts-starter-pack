import { NestInterceptor, Interceptor, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs/Observable'
import 'rxjs/Rx'

@Interceptor()
export default class DataWrapper implements NestInterceptor {
  intercept(
    dataOrRequest: any,
    ctx: ExecutionContext,
    stream$: Observable<any>,
  ): Observable<any> {
    return stream$.map((data: any) => ({ data }))
  }
}
