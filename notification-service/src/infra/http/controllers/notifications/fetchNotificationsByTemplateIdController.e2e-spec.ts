import request from 'supertest'
import { app } from '@/infra/app'
import { EmailTemplateFactory } from 'test/factories/makeEmailTemplate'
import { NotificationFactory } from 'test/factories/makeNotification'

describe('Fetch Notifications By Email Template Id (E2E)', () => {
  let emailTemplateFactory: EmailTemplateFactory
  let notificationFactory: NotificationFactory
  beforeAll(async () => {
    await app.ready()
    emailTemplateFactory = new EmailTemplateFactory()
    notificationFactory = new NotificationFactory()
  })

  test(`[GET] /notifications/template`, async () => {
    const template = await emailTemplateFactory.makeMongoEmailTemplate()

    Promise.all([
      await notificationFactory.makeMongoNotification({
        type: 'test e2e 01',
        emailTemplateId: template.id,
      }),
      await notificationFactory.makeMongoNotification({
        type: 'test e2e 02',
        emailTemplateId: template.id,
      }),
    ])

    const response = await request(app.server)
      .get(`/notifications/template`)
      .query({
        templateId: template.id,
      })
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      notifications: expect.arrayContaining([
        expect.objectContaining({
          type: 'test e2e 01',
          emailTemplateId: template.id,
        }),
        expect.objectContaining({
          type: 'test e2e 02',
          emailTemplateId: template.id,
        }),
      ]),
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
