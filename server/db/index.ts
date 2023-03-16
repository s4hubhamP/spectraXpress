import {logger} from '../logger'
import {createConnection} from './connection'

// By using two separate connection pools we ensure that slow queries don't impact the fast queries

// This is the fast connection
// IT is intended to be used for the small queries that completes quickly
const transactionsConnection = createConnection({
  retryReads: true,
  retryWrites: true,
  w: 'majority', // TODO:
  // If mongo server not responding within 20 seconds, driver shall throw an error
  // 10 seconds also ensures that the request is expected to be fast request
  socketTimeoutMS: 10000,
  minPoolSize: 10,
  maxPoolSize: 40,
  bufferCommands: true,
  connectTimeoutMS: 20000,
})

// This is the connection that will be used for the long running complex queries
// We don't want to slow down the default connection so we will use this connection for the long running queries
const analyticsConnection = createConnection({
  w: 'majority', // TODO:
  socketTimeoutMS: 30000,
  minPoolSize: 10,
  maxPoolSize: 40,
  bufferCommands: true,
  connectTimeoutMS: 20000,
})

export const waitForConnections = () =>
  Promise.all(
    [transactionsConnection, analyticsConnection].map((connectionAndModels, idx) => {
      const connection = connectionAndModels.getConnection()
      return new Promise((res, rej) => {
        // Success event
        connection.on('open', () => {
          // console.log(`Connected to connection #${idx + 1}`)
          connection.removeAllListeners('open')
          connection.removeAllListeners('disconnected')
          connection.removeAllListeners('error')
          res(connectionAndModels)
        })

        // Error events
        connection.on('disconnected', error => {
          console.log(`Disconnected from connection #${idx + 1}`)
          console.log('error', error)
          rej(error)
        })
        connection.on('error', error => {
          console.log(`Error while Making a connection #${idx + 1}`)
          console.log('error', error)
          rej(error)
        })
      })
    }),
  ).then(() => logger.log('info', 'Connected to all connections'))

export {transactionsConnection, analyticsConnection}
