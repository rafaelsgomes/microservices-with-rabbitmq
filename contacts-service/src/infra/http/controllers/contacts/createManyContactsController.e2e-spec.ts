import request from 'supertest'
import { prismaService as prisma } from '@/infra/database/prisma'
import { app } from '@/infra/app'

describe('Create many contacts (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  test(`[POST] /contacts/many-contacts`, async () => {
    const response = await request(app.server)
      .post('/contacts/many-contacts')
      .send({
        data: [
          {
            name: 'John Doe',
            email: 'john@doe.com',
          },
          {
            name: 'John Doe 2',
            email: 'john@doe2.com',
          },
        ],
        tags: ['test-e2e'],
      })

    expect(response.statusCode).toBe(201)

    const contactOnDatabase = await prisma.contact.findMany({
      where: {
        email: {
          in: ['john@doe.com', 'john@doe2.com'],
        },
      },
    })

    expect(contactOnDatabase).toBeTruthy()
  })

  afterAll(async () => {
    await app.close()
  })
})
