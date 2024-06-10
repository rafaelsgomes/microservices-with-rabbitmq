import { CreateEmailTemplateUseCase } from '@/domain/notification/application/useCases/emailTemplate/createEmailTemplate'
import { MongoEmailsTemplatesRepository } from '@/infra/database/repositories/mongoEmailsTemplatesRepository'

const repository = new MongoEmailsTemplatesRepository()
export const createEmailTemplateUseCase = new CreateEmailTemplateUseCase(
  repository,
)
