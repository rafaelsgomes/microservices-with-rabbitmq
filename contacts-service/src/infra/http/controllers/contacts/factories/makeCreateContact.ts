import { CreateContactUseCase } from '@/domain/contact/application/useCases/createContact'
import { prismaService } from '@/infra/database/prisma'
import { PrismaContactsRepository } from '@/infra/database/repositories/prismaContactsRepository'

const repository = new PrismaContactsRepository(prismaService)
export const createContactUseCase = new CreateContactUseCase(repository)
