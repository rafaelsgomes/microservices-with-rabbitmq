import { FetchMessagesByStatusTypeUseCase } from '@/domain/message/application/useCases/fetchMessagesByStatusType'
import { prismaService } from '@/infra/database/prisma'
import { PrismaMessagesRepository } from '@/infra/database/repositories/prismaMessagesRepository'

const repository = new PrismaMessagesRepository(prismaService)
export const fetchMessagesByStatusTypeUseCase =
  new FetchMessagesByStatusTypeUseCase(repository)
