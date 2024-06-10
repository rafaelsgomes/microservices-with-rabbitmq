import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { deleteEmailTemplateUseCase } from './factories/makeDeleteEmailTemplate'
import { TemplateNotFoundError } from '@/domain/notification/application/useCases/_errors/templateNotFoundError'

const deleteEmailTemplateParamSchema = z.object({
  id: z.string().uuid(),
})

export async function DeleteEmailTemplateController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/emailTemplate/:id',
    {
      schema: {
        params: deleteEmailTemplateParamSchema,
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
        await deleteEmailTemplateUseCase.execute({
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
