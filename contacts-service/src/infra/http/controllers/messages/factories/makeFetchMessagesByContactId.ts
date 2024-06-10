import { FetchMessagesByContactIdUseCase } from '@/domain/message/application/useCases/fetchMessagesByContactId'
import { prismaService } from '@/infra/database/prisma'
import { PrismaMessagesRepository } from '@/infra/database/repositories/prismaMessagesRepository'

const repository = new PrismaMessagesRepository(prismaService)
export const fetchMessagesByContactIdUseCase =
  new FetchMessagesByContactIdUseCase(repository)
