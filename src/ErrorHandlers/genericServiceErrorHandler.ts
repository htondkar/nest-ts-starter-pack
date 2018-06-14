import {
  HttpException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common'

// converts errors thrown by the ORM into errors that
//  are caught by the controllers (HttpException class)
export default function genericServiceErrorHandler(error: Error & {code?: string}) {
  if (error instanceof HttpException) throw error

  // DB duplicate entry error
  if (error.code === 'ER_DUP_ENTRY')
    throw new BadRequestException(error.message)

  throw new InternalServerErrorException('Unhandled exception', error.toString())
}
