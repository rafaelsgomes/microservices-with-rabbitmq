import { env } from '@/infra/env'
import mongoose from 'mongoose'

export async function mongooseService() {
  try {
    const connection = await mongoose.connect(env.DATABASE_URL, {
      serverApi: { version: '1', strict: true, deprecationErrors: true },
    })
    await mongoose.connection.db.admin().command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
    )
    return connection
  } catch (error) {
    await mongoose.disconnect()
    throw new Error(`${error}`)
  }
}
