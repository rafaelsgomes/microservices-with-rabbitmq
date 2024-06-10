import request from 'supertest'
import { app } from '@/infra/app'
import { EmailTemplateModel } from '@/infra/database/models/emailTemplateModel'

describe('Create Email Template (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  test(`[POST] /templates/emailTemplate`, async () => {
    const response = await request(app.server)
      .post('/templates/emailTemplate')
      .send({
        content: '<% if (user) { %><h2><%= user.name %></h2><% } %>',
        emailName: 'email test',
        subject: 'testing e2e',
      })

    expect(response.statusCode).toBe(201)

    const emailTemplateOnDatabase = await EmailTemplateModel.findOne({
      emailName: 'email test',
    })
    expect(emailTemplateOnDatabase).toBeTruthy()
  })

  afterAll(async () => {
    await app.close()
  })
})
