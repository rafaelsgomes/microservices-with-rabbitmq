import { GetMessageByIdUseCase } from '@/domain/message/application/useCases/getMessageById'
import { prismaService } from '@/infra/database/prisma'
import { PrismaMessagesRepository } from '@/infra/database/repositories/prismaMessagesRepository'

const repository = new PrismaMessagesRepository(prismaService)
export const getMessageByIdUseCase = new GetMessageByIdUseCase(repository)
