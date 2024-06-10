import { env } from '@/infra/env'
import { prismaService as prisma } from '@/infra/database/prisma'

beforeAll(async () => {
  env.NODE_ENV = 'test'
})

afterAll(async () => {
  const url = new URL(process.env.DATABASE_URL).searchParams.get('schema')
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${url}" CASCADE`)
  await prisma.$disconnect()
})
