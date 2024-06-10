import { env } from '@/infra/env'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

export function generateUniqueDatabaseURL() {
  const schemaId = randomUUID()
  if (!env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable')
  }
  const url = new URL(env.DATABASE_URL)
  url.searchParams.set('schema', schemaId)
  const urlString = url.toString()

  process.env.DATABASE_URL = urlString

  execSync('pnpm prisma migrate deploy')

  return urlString
}
