import { UserDTO, UserType } from 'dataTransferObjects/User/User.DTO'
import { Request } from 'express'
import AuthGuard from 'Guards/Auth.guard'
import DataWrapper from 'Interceptors/dataWrapper.interceptor'
import { PasswordFieldRemover } from 'Interceptors/removeFields.interceptor'
import PasswordEncrypt from 'Pipes/Password.pipe'
import Validation from 'Pipes/Validations.pipe'
import UserService from 'Services/User/user.service'

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common'

import { UserEntity } from '../Entities/User.entity'
import genericServiceErrorHandler from '../ErrorHandlers/genericServiceErrorHandler'

@Controller('users')
@UseInterceptors(DataWrapper)
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get('')
  @UseGuards(AuthGuard)
  getAllUsers() {
    return this.UserService.getAll()
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    return this.UserService.getById(id)
  }

  @Post('')
  @UseInterceptors(PasswordFieldRemover)
  @UsePipes(new Validation(), new PasswordEncrypt<UserType>('password'))
  addUser(@Body() body: UserDTO) {
    return this.UserService.create(body).catch(genericServiceErrorHandler)
  }

  @Patch(':id/edit')
  @UseGuards(AuthGuard)
  @UsePipes(
    new Validation({ skipMissingProperties: true, whitelist: true }),
    new PasswordEncrypt<UserType>('password')
  )
  async editUser(
    @Req() request: Request & { user: UserEntity },
    @Param('id') requestedId: string,
    @Body() body: UserDTO
  ) {
    if (!(await this.UserService.getById(requestedId)))
      throw new BadRequestException('User does not exists ')

    if (!(await this.UserService.isTheOwner(request.user.id, requestedId)))
      throw new UnauthorizedException('You are not the owner')

    return this.UserService.update(requestedId, body)
  }
}
