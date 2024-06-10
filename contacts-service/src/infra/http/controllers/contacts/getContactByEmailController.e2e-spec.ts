import request from 'supertest'
import { prismaService as prisma } from '@/infra/database/prisma'
import { app } from '@/infra/app'
import { ContactFactory } from 'test/factories/makeContact'

describe('Get contact by email (E2E)', () => {
  let contactFactory: ContactFactory
  beforeAll(async () => {
    contactFactory = new ContactFactory(prisma)
    await app.ready()
  })

  test(`[GET] /contacts/email`, async () => {
    await contactFactory.makePrismaContact({
      email: 'john@doe.com',
    })

    const response = await request(app.server)
      .get(`/contacts/email`)
      .query({
        email: 'john@doe.com',
      })
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
