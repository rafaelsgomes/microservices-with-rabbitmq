import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getNotificationByIdUseCase } from './factories/makeGetNotificationById'
import { NotificationPresenter } from '../../presenters/notificationPresenter'
import { NotificationNotFoundError } from '@/domain/notification/application/useCases/_errors/notificationNotFoundError'

const getNotificationParamSchema = z.object({
  id: z.string().uuid(),
})

export async function GetNotificationByIdController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: {
        params: getNotificationParamSchema,
        response: {
          200: z.object({
            notification: z.object({
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
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params
        const { notification } = await getNotificationByIdUseCase.execute({
          notificationId: id,
        })

        return reply.code(200).send({
          notification: NotificationPresenter.toHttp(notification),
        })
      } catch (error) {
        if (error instanceof NotificationNotFoundError) {
          return reply.status(404).send({
            message: error.message,
          })
        }
      }
    },
  )
}
