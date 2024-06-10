import { env } from '@/infra/env'
import { randomUUID } from 'node:crypto'
import { config } from 'dotenv'
import mongoose from 'mongoose'

config({
  path: '.env',
  override: true,
})

function generateUniqueDatabaseURL(schemaId: string) {
  if (!env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable')
  }
  const url = new URL(env.DATABASE_URL)
  url.pathname = schemaId
  return url.toString()
}

beforeAll(async () => {
  const schemaId = randomUUID()
  const databaseURL = generateUniqueDatabaseURL(schemaId)
  env.DATABASE_URL = databaseURL ?? env.DATABASE_URL
  await mongoose.connection.close()
  await mongoose.connect(env.DATABASE_URL, {
    serverApi: { version: '1', strict: true, deprecationErrors: true },
  })
})

afterAll(async () => {
  await mongoose.connection.db.dropDatabase()
  await mongoose.connection.close()
})
