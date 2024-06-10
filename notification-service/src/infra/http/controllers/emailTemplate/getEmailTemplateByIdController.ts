import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getEmailTemplateByIdUseCase } from './factories/makeGetEmailTemplateById'
import { EmailTemplatePresenter } from '../../presenters/emailTemplatePresenter'
import { TemplateNotFoundError } from '@/domain/notification/application/useCases/_errors/templateNotFoundError'

const getEmailTemplateParamSchema = z.object({
  id: z.string().uuid(),
})

export async function GetEmailTemplateByIdController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/emailTemplate/:id',
    {
      schema: {
        params: getEmailTemplateParamSchema,
        response: {
          200: z.object({
            email_template: z.object({
              id: z.string().uuid(),
              content: z.string(),
              emailName: z.string(),
              subject: z.string(),
              status: z.string(),
              created_at: z.date(),
              updated_at: z.date().optional(),
              lastUsed_at: z.date().optional(),
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
        const { emailTemplate } = await getEmailTemplateByIdUseCase.execute({
          emailTemplateId: id,
        })

        return reply.code(200).send({
          email_template: EmailTemplatePresenter.toHttp(emailTemplate),
        })
      } catch (error) {
        if (error instanceof TemplateNotFoundError) {
          return reply.status(404).send({
            message: error.message,
          })
        }
      }
    },
  )
}
