import {Types} from 'mongoose'

export type User = {
  email: string
  password: string
  demos: Array<{
    _id: string | Types.ObjectId
    tenantName: string
    stagesCompleted: Array<'tenant' | 'products' | 'customers-and-sites' | 'users-and-groups'>
    canUpdate: boolean
    description?: string
    tenantId: string

    products: Array<{
      name: string
      parameters: Array<
        'temperature' | 'voltage' | 'current' | 'status'
        // | 'gps'
        // | 'acceleration'
        // | 'light'
        // | 'pressure'
        // | 'humidity'
        // | 'volume'
      >
    }>
  }>
  createdAt: Date
  updatedAt?: Date
}
