import { GetContactByEmailUseCase } from '@/domain/contact/application/useCases/getContactByEmail'
import { prismaService } from '@/infra/database/prisma'
import { PrismaContactsRepository } from '@/infra/database/repositories/prismaContactsRepository'

const repository = new PrismaContactsRepository(prismaService)
export const getContactByEmailUseCase = new GetContactByEmailUseCase(repository)
