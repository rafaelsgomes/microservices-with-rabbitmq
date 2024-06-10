import request from 'supertest'
import { prismaService as prisma } from '@/infra/database/prisma'
import { app } from '@/infra/app'
import { ContactFactory } from 'test/factories/makeContact'

describe('Fetch contacts by tags (E2E)', () => {
  let contactFactory: ContactFactory
  beforeAll(async () => {
    contactFactory = new ContactFactory(prisma)
    await app.ready()
  })

  test(`[GET] /contacts/tags`, async () => {
    await Promise.all([
      contactFactory.makePrismaContact({
        tags: ['test-e2e'],
      }),
      contactFactory.makePrismaContact({
        tags: ['testing-e2e'],
      }),
    ])

    const response = await request(app.server)
      .get(`/contacts/tags`)
      .query({
        tags: ['test-e2e', 'testing-e2e'],
      })
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.contacts).toHaveLength(2)
    expect(response.body).toEqual({
      contacts: expect.arrayContaining([
        expect.objectContaining({
          tags: ['test-e2e'],
        }),
        expect.objectContaining({
          tags: ['testing-e2e'],
        }),
      ]),
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
