import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { fetchMessagesByContactIdUseCase } from './factories/makeFetchMessagesByContactId'
import { MessagePresenter } from '../../presenters/messagePresenter'

const getMessageParamSchema = z
  .object({
    contactId: z.string().uuid(),
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

export async function FetchMessagesByContactIdController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/list/:contactId',
    {
      schema: {
        params: getMessageParamSchema,
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
        const { contactId } = request.params
        const { messages } = await fetchMessagesByContactIdUseCase.execute({
          contactId,
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
