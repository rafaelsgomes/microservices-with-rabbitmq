import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { changeEmailTemplateStatusUseCase } from './factories/makeChangeEmailTemplateStatus'
import { TemplateNotFoundError } from '@/domain/notification/application/useCases/_errors/templateNotFoundError'

const changeEmailTemplateStatusParamSchema = z.object({
  id: z.string().uuid(),
})

export async function ChangeEmailTemplateStatusController(
  app: FastifyInstance,
) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/emailTemplate/:id/change-status',
    {
      schema: {
        params: changeEmailTemplateStatusParamSchema,
        response: {
          204: z.void(),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params
        await changeEmailTemplateStatusUseCase.execute({
          emailTemplateId: id,
        })

        return reply.code(204).send()
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
