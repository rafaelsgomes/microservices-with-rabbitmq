import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createEmailTemplateUseCase } from './factories/makeCreateEmailTemplate'
import { TemplateAlreadyExistsError } from '@/domain/notification/application/useCases/_errors/templateAlreadyExistsError'

const createEmailTemplateBodySchema = z.object({
  content: z.string(),
  emailName: z.string(),
  subject: z.string(),
})

export async function CreateEmailTemplateController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/emailTemplate',
    {
      schema: {
        body: createEmailTemplateBodySchema,
        response: {
          201: z.void(),
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const { content, emailName, subject } = request.body
        await createEmailTemplateUseCase.execute({
          content,
          emailName,
          subject,
        })

        return reply.code(201).send()
      } catch (error) {
        if (error instanceof TemplateAlreadyExistsError) {
          return reply.status(409).send({
            message: error.message,
          })
        }
      }
    },
  )
}
