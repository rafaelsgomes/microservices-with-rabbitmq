import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getContactByEmailUseCase } from './factories/makeGetContactByEmail'
import { ContactPresenter } from '../../presenters/contactPresenter'

const getContactByEmailQuerySchema = z
  .object({
    email: z.string(),
  })
  .required()

const responseBodySchema = z.object({
  contact: z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string(),
    tags: z.string().array(),
    isAbleToReceiveMessage: z.boolean(),
    created_at: z.date(),
    updated_at: z.date().optional(),
  }),
})

export async function GetContactByEmailController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/email',
    {
      schema: {
        querystring: getContactByEmailQuerySchema,
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
        const { email } = request.query
        const { contact } = await getContactByEmailUseCase.execute({
          email,
        })

        return reply.code(200).send({
          contact: ContactPresenter.toHttp(contact),
        })
      } catch (error) {
        return reply.status(500).send({
          message: 'Internal server error',
        })
      }
    },
  )
}
