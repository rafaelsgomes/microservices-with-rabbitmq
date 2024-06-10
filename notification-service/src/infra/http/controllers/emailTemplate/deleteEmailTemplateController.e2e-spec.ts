import request from 'supertest'
import { app } from '@/infra/app'
import { EmailTemplateFactory } from 'test/factories/makeEmailTemplate'
import { EmailTemplateModel } from '@/infra/database/models/emailTemplateModel'

describe('Delete Email Template (E2E)', () => {
  let emailTemplateFactory: EmailTemplateFactory
  beforeAll(async () => {
    await app.ready()
    emailTemplateFactory = new EmailTemplateFactory()
  })

  test(`[DELETE] /templates/emailTemplate/:id`, async () => {
    const template = await emailTemplateFactory.makeMongoEmailTemplate()
    const response = await request(app.server)
      .delete(`/templates/emailTemplate/${template.id}`)
      .send()

    expect(response.statusCode).toBe(204)

    const emailTemplateOnDatabase = await EmailTemplateModel.findById(
      template.id,
    )
    expect(emailTemplateOnDatabase).toBeNull()
  })

  afterAll(async () => {
    await app.close()
  })
})
