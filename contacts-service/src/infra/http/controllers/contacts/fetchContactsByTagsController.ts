import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { fetchContactsByTagsUseCase } from './factories/makeFetchContactsByTags'
import { ContactPresenter } from '../../presenters/contactPresenter'

const fetchContactsByTagsQuerySchema = z
  .object({
    tags: z.array(z.string()),
  })
  .required()

const responseBodySchema = z.object({
  contacts: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      email: z.string(),
      tags: z.string().array(),
      isAbleToReceiveMessage: z.boolean(),
      created_at: z.date(),
      updated_at: z.date().optional(),
    }),
  ),
})

export async function FetchContactsByTagsController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/tags',
    {
      schema: {
        querystring: fetchContactsByTagsQuerySchema,
        response: {
          200: responseBodySchema,
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const { tags } = request.query
        const { contacts } = await fetchContactsByTagsUseCase.execute({
          tags,
        })

        return reply.code(200).send({
          contacts: contacts.map(ContactPresenter.toHttp),
        })
      } catch (error) {
        return reply.status(500).send({
          message: 'Internal server error',
        })
      }
    },
  )
}
