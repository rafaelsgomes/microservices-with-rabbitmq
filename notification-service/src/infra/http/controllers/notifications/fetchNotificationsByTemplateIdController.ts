import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { fetchNotificationsByTemplateIdUseCase } from './factories/makeFetchNotificationsByTemplateId'
import { NotificationPresenter } from '../../presenters/notificationPresenter'

const fetchNotificationsQuerySchema = z.object({
  templateId: z.string().uuid(),
})

export async function FetchNotificationsByTemplateIdController(
  app: FastifyInstance,
) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/template',
    {
      schema: {
        querystring: fetchNotificationsQuerySchema,
        response: {
          200: z.object({
            notifications: z.array(
              z.object({
                id: z.string().uuid(),
                recipientId: z.string(),
                recipientEmail: z.string(),
                recipientName: z.string(),
                sender: z.string(),
                emailTemplateId: z.string(),
                status: z.string(),
                type: z.string(),
                created_at: z.date(),
                updated_at: z.date().optional(),
              }),
            ),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const { templateId } = request.query
        const { notifications } =
          await fetchNotificationsByTemplateIdUseCase.execute({
            templateId,
          })

        return reply.code(200).send({
          notifications: notifications.map(NotificationPresenter.toHttp),
        })
      } catch (error) {
        return reply.status(500).send({
          message: 'Internal server error',
        })
      }
    },
  )
}
