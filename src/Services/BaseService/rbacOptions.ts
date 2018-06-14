import { IRbacParams } from './RBAC'

type userTypes = 'user' | 'admin'

interface IAccessType {
  name: string
  when: (params: IRbacParams) => Promise<boolean>
}

let options: {
  [k in userTypes]: {
    can: (string | IAccessType)[]
    inherits?: userTypes[]
  }
}

const isOwner: IAccessType['when'] = async ({ ownerId, requesterId }) =>
  ownerId ? requesterId === ownerId : true

options = {
  user: {
    can: [
      'user:create',
      {
        name: 'user:*',
        when: isOwner,
      },
      'book:list',
      {
        name: 'book:*',
        when: isOwner,
      },
    ],
  },
  admin: {
    can: ['*'],
    inherits: ['user'],
  },
}

export default options
