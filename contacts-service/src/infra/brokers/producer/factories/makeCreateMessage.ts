import { CreateMessageUseCase } from '@/domain/message/application/useCases/createMessage'
import { prismaService } from '@/infra/database/prisma'
import { PrismaMessagesRepository } from '@/infra/database/repositories/prismaMessagesRepository'

const repository = new PrismaMessagesRepository(prismaService)
export const createMessageUseCase = new CreateMessageUseCase(repository)
