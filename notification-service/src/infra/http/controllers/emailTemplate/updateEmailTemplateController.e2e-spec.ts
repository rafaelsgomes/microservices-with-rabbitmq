import request from 'supertest'
import { app } from '@/infra/app'
import { EmailTemplateFactory } from 'test/factories/makeEmailTemplate'
import { EmailTemplateModel } from '@/infra/database/models/emailTemplateModel'

describe('Update Email Template (E2E)', () => {
  let emailTemplateFactory: EmailTemplateFactory
  beforeAll(async () => {
    await app.ready()
    emailTemplateFactory = new EmailTemplateFactory()
  })

  test(`[PATCH] /templates/emailTemplate/:id`, async () => {
    const template = await emailTemplateFactory.makeMongoEmailTemplate()
    const response = await request(app.server)
      .patch(`/templates/emailTemplate/${template.id}`)
      .send({
        emailName: 'test e2e - updated',
      })

    expect(response.statusCode).toBe(204)

    const emailTemplateOnDatabase = await EmailTemplateModel.findById(
      template.id,
    )
    expect(emailTemplateOnDatabase?.updatedAt).toBeTruthy()
    expect(emailTemplateOnDatabase?.emailName).toEqual('test e2e - updated')
  })

  afterAll(async () => {
    await app.close()
  })
})
