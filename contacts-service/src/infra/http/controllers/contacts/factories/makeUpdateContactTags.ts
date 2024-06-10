import { UpdateContactTagsUseCase } from '@/domain/contact/application/useCases/updateContactTags'
import { prismaService } from '@/infra/database/prisma'
import { PrismaContactsRepository } from '@/infra/database/repositories/prismaContactsRepository'

const repository = new PrismaContactsRepository(prismaService)
export const updateContactTagsUseCase = new UpdateContactTagsUseCase(repository)
