import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createManyContactsUseCase } from './factories/makeCreateManyContacts'

const createManyContactsBodySchema = z.object({
  tags: z.string().array(),
  data: z
    .object({
      name: z.string(),
      email: z.string().email(),
    })
    .required()
    .array()
    .min(1),
})

export async function CreateManyContactsController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/many-contacts',
    {
      schema: {
        body: createManyContactsBodySchema,
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
        const { data, tags } = request.body
        await createManyContactsUseCase.execute({
          tags,
          data,
        })

        return reply.code(201).send()
      } catch (error) {
        return reply.status(500).send({
          message: 'Internal server error',
        })
      }
    },
  )
}
