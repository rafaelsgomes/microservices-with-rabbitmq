import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { fetchMessagesByStatusTypeUseCase } from './factories/makeFetchMessagesByStatusType'
import { MessagePresenter } from '../../presenters/messagePresenter'
import { StatusType } from '@/domain/message/entities/message'

const getMessageQuerySchema = z
  .object({
    statusType: z.nativeEnum(StatusType),
  })
  .required()

const getMessageBodyResponseSchema = z.object({
  messages: z.array(
    z.object({
      id: z.string(),
      contact_id: z.string(),
      email_template_name: z.string(),
      status_message: z.string(),
      status_type: z.string(),
      created_at: z.coerce.date(),
    }),
  ),
})

export async function FetchMessagesByStatusTypeController(
  app: FastifyInstance,
) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/list/status-type',
    {
      schema: {
        querystring: getMessageQuerySchema,
        response: {
          200: getMessageBodyResponseSchema,
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const { statusType } = request.query
        const { messages } = await fetchMessagesByStatusTypeUseCase.execute({
          statusType,
        })

        return reply
          .code(200)
          .send({ messages: messages.map(MessagePresenter.toHttp) })
      } catch (error) {
        return reply.status(500).send({
          message: 'Internal server error',
        })
      }
    },
  )
}
