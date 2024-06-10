import request from 'supertest'
import { app } from '@/infra/app'
import { EmailTemplateFactory } from 'test/factories/makeEmailTemplate'
import { Status } from '@/domain/notification/entities/emailTemplate'
import { EmailTemplateModel } from '@/infra/database/models/emailTemplateModel'

describe('Change Email Template Status (E2E)', () => {
  let emailTemplateFactory: EmailTemplateFactory
  beforeAll(async () => {
    await app.ready()
    emailTemplateFactory = new EmailTemplateFactory()
  })

  test(`[PATCH] /templates/emailTemplate/:id/change-status`, async () => {
    const template = await emailTemplateFactory.makeMongoEmailTemplate({
      status: Status.DISABLED,
    })
    const response = await request(app.server)
      .patch(`/templates/emailTemplate/${template.id}/change-status`)
      .send()

    expect(response.statusCode).toBe(204)

    const emailTemplateOnDatabase = await EmailTemplateModel.findById(
      template.id,
    )
    expect(emailTemplateOnDatabase?.updatedAt).toBeTruthy()
    expect(emailTemplateOnDatabase?.status).toEqual(Status.ACTIVATED)
  })

  afterAll(async () => {
    await app.close()
  })
})
