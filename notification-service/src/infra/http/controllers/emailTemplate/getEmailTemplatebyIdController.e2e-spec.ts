import request from 'supertest'
import { app } from '@/infra/app'
import { EmailTemplateFactory } from 'test/factories/makeEmailTemplate'

describe('Get Email Template By Id (E2E)', () => {
  let emailTemplateFactory: EmailTemplateFactory
  beforeAll(async () => {
    await app.ready()
    emailTemplateFactory = new EmailTemplateFactory()
  })

  test(`[GET] /templates/emailTemplate`, async () => {
    const template = await emailTemplateFactory.makeMongoEmailTemplate({
      emailName: 'test e2e',
    })
    const response = await request(app.server)
      .get(`/templates/emailTemplate/${template.id}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      email_template: expect.objectContaining({
        id: template.id,
        emailName: 'test e2e',
      }),
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
