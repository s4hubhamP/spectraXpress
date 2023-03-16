import mongoose from 'mongoose'

export function createConnection(url: string, options: mongoose.ConnectOptions) {
  const connection = mongoose.createConnection(url, options)

  return connection

  // Define models
  // const models = {
  //   MasterProduct: connection.model('MasterProduct', MasterProductSchema),
  //   Log: connection.model('Log', LogSchema),
  //   Site: connection.model('Site', SiteSchema),
  //   DeviceRawData: connection.model('DeviceRawData', DeviceRawDataSchema),
  //   SiteStatus: connection.model('SiteStatus', SiteStatusSchema),
  //   Customer: connection.model('Customer', CustomerSchema),
  //   Gateway: connection.model('Gateway', GatewaySchema),
  //   Product: connection.model('Product', ProductSchema),
  //   Tenant: connection.model('Tenant', TenantSchema),
  //   Device: connection.model('Device', DeviceSchema),
  //   DeviceHistory: connection.model('DeviceHistory', DeviceHistorySchema),
  //   Permission: connection.model('Permission', PermissionSchema),
  //   Role: connection.model('Role', RoleSchema),
  //   SiteGateway: connection.model('SiteGateway', SiteGatewaySchema),
  //   SiteGatewayHistory: connection.model('SiteGatewayHistory', SiteGatewayHistorySchema),
  //   UIConfig: connection.model('UIConfig', UIConfigSchema),
  //   User: connection.model('User', UserSchema),
  //   UserGroup: connection.model('UserGroup', UserGroupSchema),
  //   SMSTemplate: connection.model('SMSTemplate', SMSTemplateSchema),
  // } as const

  // type ConnectionAndModels = {getConnection: () => mongoose.Connection} & typeof models

  // const _r: ConnectionAndModels = {
  //   getConnection: () => connection,
  //   ...models,
  // }

  // return _r

  //TODO: Improve typings
}
