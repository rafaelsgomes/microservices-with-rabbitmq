import {
  Notification,
  NotificationProps,
} from '@/domain/notification/entities/notification'
import { faker } from '@faker-js/faker'
import { NotificationModel as Model } from '@/infra/database/models/notificationModel'
import { MongoNotificationMapper } from '@/infra/database/mappers/mongoNotificationMapper'

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: string,
) {
  const notification = Notification.create(
    {
      emailTemplateId: faker.string.uuid(),
      recipientId: faker.string.uuid(),
      recipientEmail: faker.internet.email(),
      recipientName: faker.person.fullName(),
      sender: faker.internet.email(),
      status: 'sended',
      type: faker.lorem.slug({
        min: 1,
        max: 3,
      }),
      ...override,
    },
    id,
  )
  return notification
}

export class NotificationFactory {
  async makeMongoNotification(
    data: Partial<NotificationProps> = {},
  ): Promise<Notification> {
    const template = makeNotification(data)

    await Model.create(MongoNotificationMapper.toDatabase(template))

    return template
  }
}
