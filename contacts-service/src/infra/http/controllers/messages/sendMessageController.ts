import { sendEmailProducer } from '@/infra/brokers/producer/sendEmailProducer'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

const sendMessageBodySchema = z
  .object({
    contactsIds: z.string().array().min(1),
    emailTemplateName: z.string(),
    type: z.string(),
  })
  .required()

export async function SendMessageController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/send-message',
    {
      schema: {
        body: sendMessageBodySchema,
        response: {
          201: z.void(),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const { contactsIds, emailTemplateName, type } = request.body
        Promise.all(
          contactsIds.map((contactId) => {
            return sendEmailProducer.produce({
              contactId,
              emailTemplateName,
              type,
            })
          }),
        )

        return reply.code(201).send()
      } catch (error) {
        return reply.status(500).send({
          message: 'Internal server error',
        })
      }
    },
  )
}
