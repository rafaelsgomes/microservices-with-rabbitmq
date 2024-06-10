import request from 'supertest'
import { prismaService as prisma } from '@/infra/database/prisma'
import { app } from '@/infra/app'
import { ContactFactory } from 'test/factories/makeContact'

describe('Get contact by id (E2E)', () => {
  let contactFactory: ContactFactory
  beforeAll(async () => {
    contactFactory = new ContactFactory(prisma)
    await app.ready()
  })

  test(`[GET] /contacts/:contactId`, async () => {
    const contact = await contactFactory.makePrismaContact({
      email: 'john@doe.com',
    })

    const response = await request(app.server)
      .get(`/contacts/${contact.id}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.contact).toEqual(
      expect.objectContaining({
        email: 'john@doe.com',
      }),
    )
  })

  afterAll(async () => {
    await app.close()
  })
})
