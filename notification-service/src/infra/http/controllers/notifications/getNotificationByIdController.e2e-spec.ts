import request from 'supertest'
import { app } from '@/infra/app'
import { EmailTemplateFactory } from 'test/factories/makeEmailTemplate'
import { NotificationFactory } from 'test/factories/makeNotification'

describe('Get Notification By Id (E2E)', () => {
  let emailTemplateFactory: EmailTemplateFactory
  let notificationFactory: NotificationFactory

  beforeAll(async () => {
    await app.ready()
    emailTemplateFactory = new EmailTemplateFactory()
    notificationFactory = new NotificationFactory()
  })

  test(`[GET] /notifications/:id`, async () => {
    const template = await emailTemplateFactory.makeMongoEmailTemplate({
      emailName: 'test e2e',
    })

    const notification = await notificationFactory.makeMongoNotification({
      type: 'test e2e 01',
      emailTemplateId: template.id,
    })

    const response = await request(app.server)
      .get(`/notifications/${notification.id}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      notification: expect.objectContaining({
        type: 'test e2e 01',
        emailTemplateId: template.id,
      }),
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
