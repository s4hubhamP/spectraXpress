import mongoose from 'mongoose'

import {MasterProductSchema} from '../schemas/MasterProduct'
import {LogSchema} from '../schemas/Log'
import {SiteSchema} from '../schemas/Site'
import {DeviceRawDataSchema} from '../schemas/DeviceRawData'
import {SiteStatusSchema} from '../schemas/SiteStatus'
import {CustomerSchema} from '../schemas/Customer'
import {GatewaySchema} from '../schemas/Gateway'
import {ProductSchema} from '../schemas/Product'
import {TenantSchema} from '../schemas/Tenant'
import {DeviceSchema} from '../schemas/Device'
import {DeviceHistorySchema} from '../schemas/DeviceHistory'
import {PermissionSchema} from '../schemas/Permission'
import {RoleSchema} from '../schemas/Role'
import {SiteGatewaySchema} from '../schemas/SiteGateway'
import {SiteGatewayHistorySchema} from '../schemas/SiteGatewayHistory'
import {UIConfigSchema} from '../schemas/UIConfig'
import {UserSchema} from '../schemas/User'
import {UserGroupSchema} from '../schemas/UserGroup'
import {SMSTemplateSchema} from '../schemas/SMSTemplate'

const config = require('../../../config/config.json')[process.env.NODE_ENV || 'local']
const database = config.api.db

export function createConnection(options: mongoose.ConnectOptions) {
  const url = `${database.protocol}://${encodeURIComponent(database.user)}:${encodeURIComponent(
    database.password,
  )}@${database.host}/${database.name}?retryWrites=true&w=majority`

  const connection = mongoose.createConnection(url, options)

  // Define models
  const models = {
    MasterProduct: connection.model('MasterProduct', MasterProductSchema),
    Log: connection.model('Log', LogSchema),
    Site: connection.model('Site', SiteSchema),
    DeviceRawData: connection.model('DeviceRawData', DeviceRawDataSchema),
    SiteStatus: connection.model('SiteStatus', SiteStatusSchema),
    Customer: connection.model('Customer', CustomerSchema),
    Gateway: connection.model('Gateway', GatewaySchema),
    Product: connection.model('Product', ProductSchema),
    Tenant: connection.model('Tenant', TenantSchema),
    Device: connection.model('Device', DeviceSchema),
    DeviceHistory: connection.model('DeviceHistory', DeviceHistorySchema),
    Permission: connection.model('Permission', PermissionSchema),
    Role: connection.model('Role', RoleSchema),
    SiteGateway: connection.model('SiteGateway', SiteGatewaySchema),
    SiteGatewayHistory: connection.model('SiteGatewayHistory', SiteGatewayHistorySchema),
    UIConfig: connection.model('UIConfig', UIConfigSchema),
    User: connection.model('User', UserSchema),
    UserGroup: connection.model('UserGroup', UserGroupSchema),
    SMSTemplate: connection.model('SMSTemplate', SMSTemplateSchema),
  } as const

  type ConnectionAndModels = {getConnection: () => mongoose.Connection} & typeof models

  const _r: ConnectionAndModels = {
    getConnection: () => connection,
    ...models,
  }

  return _r

  //TODO: Improve typings
}
