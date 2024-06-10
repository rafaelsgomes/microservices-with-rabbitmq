import { FastifyInstance } from 'fastify'
import { CreateEmailTemplateController } from './createEmailTemplateController'
import { GetEmailTemplateByNameController } from './getEmailTemplateByNameController'
import { GetEmailTemplateByIdController } from './getEmailTemplateByIdController'
import { ChangeEmailTemplateStatusController } from './changeEmailTemplateStatusController'
import { UpdateEmailTemplateController } from './updateEmailTemplateController'
import { DeleteEmailTemplateController } from './deleteEmailTemplateController'

export async function emailsTemplatesRoutes(app: FastifyInstance) {
  app.register(CreateEmailTemplateController)
  app.register(GetEmailTemplateByNameController)
  app.register(GetEmailTemplateByIdController)
  app.register(ChangeEmailTemplateStatusController)
  app.register(UpdateEmailTemplateController)
  app.register(DeleteEmailTemplateController)
}
