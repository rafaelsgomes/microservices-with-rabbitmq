import request from 'supertest'
import { prismaService as prisma } from '@/infra/database/prisma'
import { app } from '@/infra/app'

describe('Create contact (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  test(`[POST] /contacts`, async () => {
    const response = await request(app.server)
      .post('/contacts')
      .send({
        name: 'John Doe',
        email: 'john@doe.com',
        tags: ['test-e2e'],
      })

    expect(response.statusCode).toBe(201)

    const contactOnDatabase = await prisma.contact.findUnique({
      where: {
        email: 'john@doe.com',
      },
    })

    expect(contactOnDatabase).toBeTruthy()
  })

  afterAll(async () => {
    await app.close()
  })
})
