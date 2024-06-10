import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { updateEmailTemplateUseCase } from './factories/makeUpdateEmailTemplate'
import { TemplateNotFoundError } from '@/domain/notification/application/useCases/_errors/templateNotFoundError'
import { InformationNotProvidedError } from '@/domain/notification/application/useCases/_errors/informationNotProvidedError'
import { TemplateAlreadyExistsError } from '@/domain/notification/application/useCases/_errors/templateAlreadyExistsError'

const updateEmailTemplateBodySchema = z.object({
  content: z.string().optional(),
  subject: z.string().optional(),
  emailName: z.string().optional(),
})

const updateEmailTemplateParamSchema = z.object({
  id: z.string().uuid(),
})

export async function UpdateEmailTemplateController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/emailTemplate/:id',
    {
      schema: {
        params: updateEmailTemplateParamSchema,
        body: updateEmailTemplateBodySchema,
        response: {
          204: z.void(),
          400: z.object({
            message: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params
        const { content, emailName, subject } = request.body

        await updateEmailTemplateUseCase.execute({
          emailTemplateId: id,
          content,
          emailName,
          subject,
        })

        return reply.code(204).send()
      } catch (error) {
        if (error instanceof InformationNotProvidedError) {
          return reply.status(400).send({
            message: error.message,
          })
        }

        if (error instanceof TemplateNotFoundError) {
          return reply.status(404).send({
            message: error.message,
          })
        }

        if (error instanceof TemplateAlreadyExistsError) {
          return reply.status(409).send({
            message: error.message,
          })
        }
      }
    },
  )
}
