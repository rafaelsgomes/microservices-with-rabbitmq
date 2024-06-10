import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { deleteContactUseCase } from './factories/makeDeleteContact'

const createContactParamSchema = z
  .object({
    contactId: z.string().uuid(),
  })
  .required()

export async function DeleteContactController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/:contactId',
    {
      schema: {
        params: createContactParamSchema,
        response: {
          204: z.void(),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const { contactId } = request.params
        await deleteContactUseCase.execute({
          contactId,
        })

        return reply.code(204).send()
      } catch (error) {
        return reply.status(500).send({
          message: 'Internal server error',
        })
      }
    },
  )
}
