import { Repository } from 'typeorm'
import { Component, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'Entities/User.entity'
import BaseService from '../BaseService/base.service'
import { UserDTO } from 'dataTransferObjects/User/User.DTO'

@Component()
export default class UserService extends BaseService<UserEntity> {
  constructor(@InjectRepository(UserEntity) private readonly Users: Repository<UserEntity>) {
    super(Users, { dataName: 'User' })
  }

  getUserByEmail(email: string) {
    return this.Users.findOne({ email })
  }

  // override user creation
  async create(data: UserDTO): Promise<UserEntity> {
    const user = (await this.Users.save({ ...data, role: 'user' })) as UserEntity

    await this.update(user.id, { ...user, owner: user.id })
    const updatedUser = await this.getById(user.id)

    if (!updatedUser) throw new InternalServerErrorException('can not update user')

    return updatedUser
  }
}
