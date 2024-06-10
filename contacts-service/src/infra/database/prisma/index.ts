import { env } from '@/infra/env'
import { PrismaClient } from '@prisma/client'
import { generateUniqueDatabaseURL } from 'test/utils/setDBUrl'

export class PrismaService extends PrismaClient {
  constructor() {
    super({
      log: env.NODE_ENV !== 'production' ? ['query', 'warn', 'error'] : [],
      datasources: {
        db: {
          url:
            env.NODE_ENV === 'test'
              ? generateUniqueDatabaseURL()
              : env.DATABASE_URL,
        },
      },
      errorFormat: 'pretty',
    })
  }
}
export const prismaService = new PrismaService()
