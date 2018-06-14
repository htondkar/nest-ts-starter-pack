import { NestInterceptor, Interceptor, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs/Observable'
import { omit } from 'ramda'
import 'rxjs/Rx'

class FieldRemover implements NestInterceptor {
  constructor(private readonly fieldsToRemove: string[]) {}

  intercept(
    dataOrRequest: any,
    ctx: ExecutionContext,
    stream$: Observable<any>
  ): Observable<any> {
    return stream$.map(omit(this.fieldsToRemove))
  }
}

@Interceptor()
export class PasswordFieldRemover extends FieldRemover implements NestInterceptor {
  constructor() {
    super(['password'])
  }
}
