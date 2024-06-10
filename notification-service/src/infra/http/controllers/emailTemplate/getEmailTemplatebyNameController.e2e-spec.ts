import request from 'supertest'
import { app } from '@/infra/app'
import { EmailTemplateFactory } from 'test/factories/makeEmailTemplate'

describe('Get Email Template By Name (E2E)', () => {
  let emailTemplateFactory: EmailTemplateFactory
  beforeAll(async () => {
    await app.ready()
    emailTemplateFactory = new EmailTemplateFactory()
  })

  test(`[GET] /templates/emailTemplate/name`, async () => {
    await emailTemplateFactory.makeMongoEmailTemplate({
      emailName: 'test e2e',
    })
    const response = await request(app.server)
      .get('/templates/emailTemplate/name')
      .query({
        name: 'test e2e',
      })
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      email_template: expect.objectContaining({
        id: expect.any(String),
        emailName: 'test e2e',
      }),
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
