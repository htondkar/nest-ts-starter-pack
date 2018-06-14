import { Entity, Column } from 'typeorm'
import { Base } from 'Entities/Base.entity'
import { IOwnAble } from './Base.entity'

@Entity()
export class UserEntity extends Base implements IOwnAble {
  @Column() name: string

  @Column({ unique: true })
  email: string

  @Column({ select: false })
  password: string

  @Column({ default: 'user' })
  role: 'user' | 'admin'
}
