import { INotificationsRepository } from '@/domain/notification/application/repositories/INotificationsRepository'
import { Notification } from '@/domain/notification/entities/notification'
import { MongoNotificationMapper } from '../mappers/mongoNotificationMapper'
import { NotificationModel as Model } from '../models/notificationModel'

export class MongoNotificationsRepository implements INotificationsRepository {
  async create(notification: Notification): Promise<void> {
    await Model.create(MongoNotificationMapper.toDatabase(notification))
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = await Model.findById(id)

    if (!notification) {
      return null
    }

    return MongoNotificationMapper.toDomain(notification)
  }

  async findManyByRecipientEmail(
    recipientEmail: string,
  ): Promise<Notification[]> {
    const notifications = await Model.find({
      recipientEmail,
    })

    return notifications.map(MongoNotificationMapper.toDomain)
  }

  async findManyByTemplateId(templateId: string): Promise<Notification[]> {
    const notifications = await Model.find({
      emailTemplateId: templateId,
    })

    return notifications.map(MongoNotificationMapper.toDomain)
  }

  async save(notification: Notification): Promise<void> {
    await Model.updateOne({
      _id: notification.id,
      $set: MongoNotificationMapper.toDatabase(notification),
    })
  }
}
