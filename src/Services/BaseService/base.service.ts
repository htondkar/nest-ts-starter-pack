import { Repository } from 'typeorm'
import { BadRequestException } from '@nestjs/common'
import { Base } from 'Entities/Base.entity'
import accessControl, { IRbacInstance } from 'Services/BaseService/RBAC'

interface IServiceOptions {
  dataName: string
}

export default class BaseService<T extends Base> {
  readonly accessManager: IRbacInstance

  constructor(readonly Repository: Repository<T>, readonly options: IServiceOptions) {
    this.accessManager = accessControl
  }

  getById(id: string): Promise<T | undefined> {
    return this.Repository.findOne(id, { relations: ['owner'] })
  }

  getAll(): Promise<T[]> {
    return this.Repository.find()
  }

  async create(data: any, ownerId?: string): Promise<T> {
    if (ownerId) {
      data.owner = ownerId
    }

    return this.Repository.save(data)
  }

  async update(id: string, newData: any) {
    await this.Repository.update(id, newData)
    return this.getById(id)
  }

  deleteById(id: string) {
    return this.Repository.delete(id)
  }

  async can(action: string, requesterId: string, requestedId: string) {
    // retrieve the item
    const item = await this.getById(requestedId)
    if (!item) throw new BadRequestException('Requested item does not exist')

    // get the owner
    const owner = item.owner
    if (!owner) return true

    // check the accesses
    return this.accessManager.can(owner.role, action, {
      requesterId,
      ownerId: owner.id,
    })
  }

  async isTheOwner(requesterId: string, requestedId: string): Promise<boolean> {
    const entity = await this.getById(requestedId)

    if (!entity)
      throw new BadRequestException(`requested ${this.options.dataName} does not exist`)

    if (!entity.owner) return true

    if (entity.owner.id !== requesterId) return false

    return true
  }
}
