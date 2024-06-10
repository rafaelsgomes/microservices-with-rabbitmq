import { CreateManyContactsUseCase } from '@/domain/contact/application/useCases/createManyContacts'
import { prismaService } from '@/infra/database/prisma'
import { PrismaContactsRepository } from '@/infra/database/repositories/prismaContactsRepository'

const repository = new PrismaContactsRepository(prismaService)
export const createManyContactsUseCase = new CreateManyContactsUseCase(
  repository,
)
