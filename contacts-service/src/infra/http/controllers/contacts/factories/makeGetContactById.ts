import { GetContactByIdUseCase } from '@/domain/contact/application/useCases/getContactById'
import { prismaService } from '@/infra/database/prisma'
import { PrismaContactsRepository } from '@/infra/database/repositories/prismaContactsRepository'

const repository = new PrismaContactsRepository(prismaService)
export const getContactByIdUseCase = new GetContactByIdUseCase(repository)
