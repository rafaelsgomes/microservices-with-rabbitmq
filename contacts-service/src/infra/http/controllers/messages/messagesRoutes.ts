import { FastifyInstance } from 'fastify'
import { SendMessageController } from './sendMessageController'
import { GetMessageByIdController } from './getMessageByIdController'
import { FetchMessagesByStatusTypeController } from './fetchMessagesByStatusTypeController'
import { FetchMessagesByContactIdController } from './fetchMessagesByContactIdController'
import { FetchMessagesByEmailTemplateNameController } from './fetchMessagesByEmailTemplateNameController'

export async function messagesRoutes(app: FastifyInstance) {
  app.register(SendMessageController)
  app.register(GetMessageByIdController)
  app.register(FetchMessagesByStatusTypeController)
  app.register(FetchMessagesByContactIdController)
  app.register(FetchMessagesByEmailTemplateNameController)
}
