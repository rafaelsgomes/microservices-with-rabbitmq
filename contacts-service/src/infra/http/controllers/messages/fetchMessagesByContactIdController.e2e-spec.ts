import request from 'supertest'
import { prismaService as prisma } from '@/infra/database/prisma'
import { app } from '@/infra/app'
import { MessageFactory } from 'test/factories/makeMessage'
import { ContactFactory } from 'test/factories/makeContact'

describe('Fetch messages by contact id (E2E)', () => {
  let contactFactory: ContactFactory
  let messageFactory: MessageFactory
  beforeAll(async () => {
    messageFactory = new MessageFactory(prisma)
    contactFactory = new ContactFactory(prisma)
    await app.ready()
  })

  test(`[GET] /messages/list/:contactId`, async () => {
    const contact = await contactFactory.makePrismaContact()
    const message = await messageFactory.makePrismaMessage({
      contactId: contact.id,
      emailTemplateName: 'test-e2e',
    })
    const response = await request(app.server)
      .get(`/messages/list/${contact.id}`)
      .query({
        statusType: 'PRODUCED',
      })
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.messages).toHaveLength(1)
    expect(response.body.messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: message.id,
          contact_id: contact.id,
          email_template_name: 'test-e2e',
        }),
      ]),
    )
  })

  afterAll(async () => {
    await app.close()
  })
})
