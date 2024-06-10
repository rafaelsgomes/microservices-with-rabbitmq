import { ChangeEmailTemplateStatusUseCase } from '@/domain/notification/application/useCases/emailTemplate/changeEmailTemplateStatus'
import { MongoEmailsTemplatesRepository } from '@/infra/database/repositories/mongoEmailsTemplatesRepository'

const repository = new MongoEmailsTemplatesRepository()
export const changeEmailTemplateStatusUseCase =
  new ChangeEmailTemplateStatusUseCase(repository)
