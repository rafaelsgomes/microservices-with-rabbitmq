import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { contactsRoutes } from './http/controllers/contacts/contactsRoutes'
import { rabbitMQConnection } from './brokers/rabbitMQ/rabbitMqConnection'
import { messagesRoutes } from './http/controllers/messages/messagesRoutes'

export const app = fastify({
  logger: env.NODE_ENV !== 'production',
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(async () => {
  await rabbitMQConnection.start()
})

app.register(contactsRoutes, {
  prefix: 'contacts',
})

app.register(messagesRoutes, {
  prefix: 'messages',
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({
    message: 'Internal Sever Error',
  })
})
