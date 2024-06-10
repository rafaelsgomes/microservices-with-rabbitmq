import request from 'supertest'
import { prismaService as prisma } from '@/infra/database/prisma'
import { app } from '@/infra/app'
import { MessageFactory } from 'test/factories/makeMessage'
import { ContactFactory } from 'test/factories/makeContact'

describe('Get message by id (E2E)', () => {
  let contactFactory: ContactFactory
  let messageFactory: MessageFactory
  beforeAll(async () => {
    messageFactory = new MessageFactory(prisma)
    contactFactory = new ContactFactory(prisma)
    await app.ready()
  })

  test(`[GET] /messages/:messageId`, async () => {
    const contact = await contactFactory.makePrismaContact()
    const message = await messageFactory.makePrismaMessage({
      contactId: contact.id,
      emailTemplateName: 'test-e2e',
    })
    const response = await request(app.server)
      .get(`/messages/${message.id}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.message).toEqual(
      expect.objectContaining({
        id: message.id,
        email_template_name: 'test-e2e',
      }),
    )
  })

  afterAll(async () => {
    await app.close()
  })
})
