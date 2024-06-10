import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { fetchMessagesByEmailTemplateNameUseCase } from './factories/makeFetchMessagesByEmailTemplateName'
import { MessagePresenter } from '../../presenters/messagePresenter'

const getMessageQuerySchema = z
  .object({
    emailTemplateName: z.string(),
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

export async function FetchMessagesByEmailTemplateNameController(
  app: FastifyInstance,
) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/list/template-name',
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
        const { emailTemplateName } = request.query
        const { messages } =
          await fetchMessagesByEmailTemplateNameUseCase.execute({
            emailTemplateName,
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
