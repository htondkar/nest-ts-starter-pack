import * as rbac from 'easy-rbac'
import rbacOptions from './rbacOptions'

export type userRoles = 'user' | 'admin'

export interface IRbacParams {
  requesterId: string | number
  ownerId: string | number
  [key: string]: any
}

export interface IRbacInstance {
  can: (role: userRoles, action: string, ctx: IRbacParams) => boolean
}

const accessControl = rbac.create(rbacOptions)
export default accessControl
