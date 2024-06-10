import request from 'supertest'
import { prismaService as prisma } from '@/infra/database/prisma'
import { app } from '@/infra/app'
import { ContactFactory } from 'test/factories/makeContact'
import { config } from 'dotenv'
import { env } from '@/infra/env'
import RabbitMQConnection from '@/infra/brokers/rabbitMQ/rabbitMqConnection'
import { waitFor } from 'test/utils/waitFor'

config({
  path: '.env',
  override: true,
})

describe('Send message (E2E)', () => {
  let contactFactory: ContactFactory
  let rabbitMQConnection: RabbitMQConnection
  beforeAll(async () => {
    if (!process.env.RABBITMQ_TEST_ENDPOINT) {
      throw new Error(
        'Please provide a RABBITMQ_TEST_ENDPOINT environment variable',
      )
    }
    env.RABBITMQ_ENDPOINT = process.env.RABBITMQ_TEST_ENDPOINT
    contactFactory = new ContactFactory(prisma)

    rabbitMQConnection = new RabbitMQConnection()
    await rabbitMQConnection.start()
    await app.ready()
  })

  test(`[POST] /messages/send-message`, async () => {
    const contact = await contactFactory.makePrismaContact()
    const response = await request(app.server)
      .post('/messages/send-message')
      .send({
        contactsIds: [contact.id],
        emailTemplateName: 'testing-e2e',
        type: 'test-e2e',
      })

    expect(response.statusCode).toBe(201)

    await waitFor(async () => {
      const contactOnDatabase = await prisma.message.findFirst({
        where: {
          contactId: contact.id,
        },
      })

      expect(contactOnDatabase).toBeTruthy()
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
