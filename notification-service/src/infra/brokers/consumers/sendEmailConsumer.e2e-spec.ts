import { EmailTemplateFactory } from 'test/factories/makeEmailTemplate'
import { Status } from '@/domain/notification/entities/emailTemplate'
import { env } from '@/infra/env'
import { app } from '@/infra/app'
import { faker } from '@faker-js/faker'
import { waitFor } from 'test/utils/waitFor'
import { NotificationModel } from '@/infra/database/models/notificationModel'
import { config } from 'dotenv'
import RabbitMQConnection from '../rabbitMQ/rabbitMqConnection'

config({
  path: '.env',
  override: true,
})

describe('Send Email Consumer (E2E)', () => {
  let emailTemplateFactory: EmailTemplateFactory
  let rabbitMQConnection: RabbitMQConnection

  beforeAll(async () => {
    if (!process.env.RABBITMQ_TEST_ENDPOINT) {
      throw new Error(
        'Please provide a RABBITMQ_TEST_ENDPOINT environment variable',
      )
    }
    env.RABBITMQ_ENDPOINT = process.env.RABBITMQ_TEST_ENDPOINT
    emailTemplateFactory = new EmailTemplateFactory()

    rabbitMQConnection = new RabbitMQConnection()
    await rabbitMQConnection.start()
    await app.ready()
  })

  test(`should be able to send a email to recipient`, async () => {
    const template = await emailTemplateFactory.makeMongoEmailTemplate({
      status: Status.ACTIVATED,
      emailName: 'email test',
    })

    const message = {
      recipientId: faker.string.uuid(),
      recipientEmail: faker.internet.email(),
      recipientName: faker.person.fullName(),
      emailTemplateName: 'email test',
      type: 'test',
    }

    rabbitMQConnection.publishInExchange({
      exchange: 'amq.direct',
      routingKey: 'email-send',
      message: JSON.stringify(message),
    })

    await waitFor(async () => {
      const notificationOnDatabase = await NotificationModel.find({
        emailTemplateId: template.id,
      })

      expect(notificationOnDatabase[0]).toBeTruthy()
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
