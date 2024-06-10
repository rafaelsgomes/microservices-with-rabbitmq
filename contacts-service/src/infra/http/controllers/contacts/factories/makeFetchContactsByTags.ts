import { FetchContactsByTagsUseCase } from '@/domain/contact/application/useCases/fetchContactsByTags'
import { prismaService } from '@/infra/database/prisma'
import { PrismaContactsRepository } from '@/infra/database/repositories/prismaContactsRepository'

const repository = new PrismaContactsRepository(prismaService)
export const fetchContactsByTagsUseCase = new FetchContactsByTagsUseCase(
  repository,
)
