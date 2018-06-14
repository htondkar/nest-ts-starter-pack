import { UserEntity } from 'Entities/User.entity'
import {
  CreateDateColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm'

export interface IOwnAble {
  owner: UserEntity
}

export abstract class Base {
  @PrimaryGeneratedColumn('uuid') id: string

  @CreateDateColumn() createdAt: Date

  @UpdateDateColumn() updatedAt: Date

  @OneToOne(() => UserEntity)
  @JoinColumn()
  owner: UserEntity
}
