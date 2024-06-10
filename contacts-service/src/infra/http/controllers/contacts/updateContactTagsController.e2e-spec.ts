import request from 'supertest'
import { prismaService as prisma } from '@/infra/database/prisma'
import { app } from '@/infra/app'
import { ContactFactory } from 'test/factories/makeContact'

describe('Update contact tags (E2E)', () => {
  let contactFactory: ContactFactory
  beforeAll(async () => {
    contactFactory = new ContactFactory(prisma)
    await app.ready()
  })

  test(`[PATCH] /contacts/:contactId`, async () => {
    const contact = await contactFactory.makePrismaContact({
      email: 'john@doe.com',
      tags: ['test-e2e'],
    })

    const response = await request(app.server)
      .patch(`/contacts/${contact.id}`)
      .send({
        tags: ['new-tag'],
      })

    expect(response.statusCode).toBe(204)

    const contactOnDatabase = await prisma.contact.findUnique({
      where: {
        id: contact.id,
      },
    })

    expect(contactOnDatabase?.updatedAt).toEqual(expect.any(Date))
    expect(contactOnDatabase?.tags).toEqual(['new-tag'])
  })

  afterAll(async () => {
    await app.close()
  })
})
