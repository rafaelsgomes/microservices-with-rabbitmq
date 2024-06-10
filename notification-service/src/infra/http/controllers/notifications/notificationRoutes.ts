import { FastifyInstance } from 'fastify'
import { FetchNotificationsByRecipientEmailController } from './fetchNotificationsByRecipientEmailController'
import { FetchNotificationsByTemplateIdController } from './fetchNotificationsByTemplateIdController'
import { GetNotificationByIdController } from './getNotificationByIdController'

export async function notificationsRoutes(app: FastifyInstance) {
  app.register(FetchNotificationsByRecipientEmailController)
  app.register(FetchNotificationsByTemplateIdController)
  app.register(GetNotificationByIdController)
}
