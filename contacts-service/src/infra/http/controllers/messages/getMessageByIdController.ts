import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getMessageByIdUseCase } from './factories/makeGetMessageById'
import { MessagePresenter } from '../../presenters/messagePresenter'

const getMessageParamSchema = z
  .object({
    messageId: z.string(),
  })
  .required()

const getMessageBodyResponseSchema = z.object({
  message: z.object({
    id: z.string(),
    contact_id: z.string(),
    email_template_name: z.string(),
    status_message: z.string(),
    status_type: z.string(),
    created_at: z.coerce.date(),
  }),
})

export async function GetMessageByIdController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:messageId',
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
        const { messageId } = request.params
        const { message } = await getMessageByIdUseCase.execute({
          messageId,
        })

        return reply
          .code(200)
          .send({ message: MessagePresenter.toHttp(message) })
      } catch (error) {
        return reply.status(500).send({
          message: 'Internal server error',
        })
      }
    },
  )
}
