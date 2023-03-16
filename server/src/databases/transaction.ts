import mongoose from 'mongoose'

// By default the transactions connection is used to perform transactions
// Callback should return promise, that's how withTransaction knows when to commit the transaction
export async function performTransaction(callback: (session: mongoose.ClientSession) => Promise<any>) {
  const session = await mongoose.connection.startSession()
  try {
    return await session.withTransaction(() => callback(session))
  } catch (error) {
    throw error
  }
}
