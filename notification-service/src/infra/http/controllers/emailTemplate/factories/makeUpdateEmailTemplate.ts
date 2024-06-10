import { UpdateEmailTemplateUseCase } from '@/domain/notification/application/useCases/emailTemplate/updateEmailTemplate'
import { MongoEmailsTemplatesRepository } from '@/infra/database/repositories/mongoEmailsTemplatesRepository'

const repository = new MongoEmailsTemplatesRepository()
export const updateEmailTemplateUseCase = new UpdateEmailTemplateUseCase(
  repository,
)
