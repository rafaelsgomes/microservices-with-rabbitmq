import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { emailsTemplatesRoutes } from './http/controllers/emailTemplate/emailTemplateRoutes'
import { mongooseService } from './database/mongoose'
import { notificationsRoutes } from './http/controllers/notifications/notificationRoutes'
import { rabbitMQConnection } from './brokers/rabbitMQ/rabbitMqConnection'
import { sendEmailConsumer } from './brokers/consumers/sendEmailConsumer'

export const app = fastify({
  logger: env.NODE_ENV !== 'production',
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(mongooseService)

app.register(emailsTemplatesRoutes, {
  prefix: 'templates',
})

app.register(notificationsRoutes, {
  prefix: 'notifications',
})

app.register(async () => {
  await rabbitMQConnection.start()
})
app.register(async () => {
  await sendEmailConsumer.send()
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
