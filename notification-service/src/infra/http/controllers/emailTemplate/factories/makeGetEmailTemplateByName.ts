import { GetEmailTemplateByNameUseCase } from '@/domain/notification/application/useCases/emailTemplate/getEmailTemplateByName'
import { MongoEmailsTemplatesRepository } from '@/infra/database/repositories/mongoEmailsTemplatesRepository'

const repository = new MongoEmailsTemplatesRepository()
export const getEmailTemplateByNameUseCase = new GetEmailTemplateByNameUseCase(
  repository,
)
