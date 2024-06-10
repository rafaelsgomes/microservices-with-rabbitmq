import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createContactUseCase } from './factories/makeCreateContact'

const createContactBodySchema = z
  .object({
    name: z.string(),
    email: z.string(),
    tags: z.string().array(),
  })
  .required()

export async function CreateContactController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: {
        body: createContactBodySchema,
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
        const { name, email, tags } = request.body
        await createContactUseCase.execute({
          name,
          email,
          tags,
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
