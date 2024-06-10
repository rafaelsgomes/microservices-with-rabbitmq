import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getContactByIdUseCase } from './factories/makeGetContactById'
import { ContactPresenter } from '../../presenters/contactPresenter'

const getContactByIdParamSchema = z
  .object({
    contactId: z.string(),
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

export async function GetContactByIdController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:contactId',
    {
      schema: {
        params: getContactByIdParamSchema,
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
        const { contactId } = request.params
        const { contact } = await getContactByIdUseCase.execute({
          contactId,
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
