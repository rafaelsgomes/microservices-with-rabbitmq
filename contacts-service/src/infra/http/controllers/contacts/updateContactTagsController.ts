import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { updateContactTagsUseCase } from './factories/makeUpdateContactTags'

const UpdateContactTagsParamSchema = z
  .object({
    contactId: z.string(),
  })
  .required()

const UpdateContactTagsBodySchema = z
  .object({
    tags: z.string().array().min(1),
  })
  .required()

export async function UpdateContactTagsController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/:contactId',
    {
      schema: {
        body: UpdateContactTagsBodySchema,
        params: UpdateContactTagsParamSchema,
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
        const { tags } = request.body
        const { contactId } = request.params
        await updateContactTagsUseCase.execute({
          contactId,
          tags,
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
