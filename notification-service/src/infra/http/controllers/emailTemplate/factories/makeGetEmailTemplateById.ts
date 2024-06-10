import { GetEmailTemplateByIdUseCase } from '@/domain/notification/application/useCases/emailTemplate/getEmailTemplateById'
import { MongoEmailsTemplatesRepository } from '@/infra/database/repositories/mongoEmailsTemplatesRepository'

const repository = new MongoEmailsTemplatesRepository()
export const getEmailTemplateByIdUseCase = new GetEmailTemplateByIdUseCase(
  repository,
)
