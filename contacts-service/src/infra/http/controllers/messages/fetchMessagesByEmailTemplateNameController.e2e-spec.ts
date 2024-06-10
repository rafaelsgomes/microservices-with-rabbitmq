import request from 'supertest'
import { prismaService as prisma } from '@/infra/database/prisma'
import { app } from '@/infra/app'
import { MessageFactory } from 'test/factories/makeMessage'
import { ContactFactory } from 'test/factories/makeContact'

describe('Fetch messages by emailTemplateName (E2E)', () => {
  let contactFactory: ContactFactory
  let messageFactory: MessageFactory
  beforeAll(async () => {
    messageFactory = new MessageFactory(prisma)
    contactFactory = new ContactFactory(prisma)
    await app.ready()
  })

  test(`[GET] /messages/list/template-name`, async () => {
    const contact = await contactFactory.makePrismaContact()
    const message = await messageFactory.makePrismaMessage({
      contactId: contact.id,
      emailTemplateName: 'test-e2e',
    })
    const response = await request(app.server)
      .get(`/messages/list/template-name`)
      .query({
        emailTemplateName: 'test-e2e',
      })
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.messages).toHaveLength(1)
    expect(response.body.messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: message.id,
          email_template_name: 'test-e2e',
        }),
      ]),
    )
  })

  afterAll(async () => {
    await app.close()
  })
})
