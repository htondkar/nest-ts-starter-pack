import { UserController } from 'Controllers/user.controller'
import { UserEntity } from 'Entities/User.entity'
import UserService from 'Services/User/user.service'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import DataWrapper from 'Interceptors/dataWrapper.interceptor'
import { PasswordFieldRemover } from 'Interceptors/removeFields.interceptor'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), DataWrapper, PasswordFieldRemover],
  controllers: [UserController],
  components: [UserService],
  exports: [UserService],
})
export default class UserModule {
  // empty class
}
