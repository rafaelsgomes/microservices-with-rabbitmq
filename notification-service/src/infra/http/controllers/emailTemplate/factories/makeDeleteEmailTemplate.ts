import { DeleteEmailTemplateUseCase } from '@/domain/notification/application/useCases/emailTemplate/deleteEmailTemplate'
import { MongoEmailsTemplatesRepository } from '@/infra/database/repositories/mongoEmailsTemplatesRepository'

const repository = new MongoEmailsTemplatesRepository()
export const deleteEmailTemplateUseCase = new DeleteEmailTemplateUseCase(
  repository,
)
