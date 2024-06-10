import request from 'supertest'
import { prismaService as prisma } from '@/infra/database/prisma'
import { app } from '@/infra/app'
import { ContactFactory } from 'test/factories/makeContact'

describe('Delete contact (E2E)', () => {
  let contactFactory: ContactFactory
  beforeAll(async () => {
    contactFactory = new ContactFactory(prisma)
    await app.ready()
  })

  test(`[DELETE] /contacts/:contactId`, async () => {
    const contact = await contactFactory.makePrismaContact()
    const response = await request(app.server)
      .delete(`/contacts/${contact.id}`)
      .send()

    expect(response.statusCode).toBe(204)

    const contactOnDatabase = await prisma.contact.findUnique({
      where: {
        id: contact.id,
      },
    })

    expect(contactOnDatabase).toBeNull()
  })

  afterAll(async () => {
    await app.close()
  })
})
