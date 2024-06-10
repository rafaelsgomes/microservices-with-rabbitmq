import { DeleteContactUseCase } from '@/domain/contact/application/useCases/deleteContact'
import { prismaService } from '@/infra/database/prisma'
import { PrismaContactsRepository } from '@/infra/database/repositories/prismaContactsRepository'

const repository = new PrismaContactsRepository(prismaService)
export const deleteContactUseCase = new DeleteContactUseCase(repository)
