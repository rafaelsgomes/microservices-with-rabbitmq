import { FetchMessagesByEmailTemplateNameUseCase } from '@/domain/message/application/useCases/fetchMessagesByEmailTemplateName'
import { prismaService } from '@/infra/database/prisma'
import { PrismaMessagesRepository } from '@/infra/database/repositories/prismaMessagesRepository'

const repository = new PrismaMessagesRepository(prismaService)
export const fetchMessagesByEmailTemplateNameUseCase =
  new FetchMessagesByEmailTemplateNameUseCase(repository)
