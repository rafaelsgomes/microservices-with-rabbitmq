import { Notification } from '@/domain/notification/entities/notification'
import { MongoNotificationSchema } from '../schemas/interfaces/mongoNotificationInterface'

export class MongoNotificationMapper {
  static toDatabase(notification: Notification): MongoNotificationSchema {
    return {
      _id: notification.id,
      recipientId: notification.recipientId,
      recipientEmail: notification.recipientEmail,
      recipientName: notification.recipientName,
      sender: notification.sender,
      emailTemplateId: notification.emailTemplateId,
      status: notification.status,
      type: notification.type,
      createdAt: notification.createdAt,
      updatedAt: notification.updatedAt ?? undefined,
    }
  }

  static toDomain(raw: MongoNotificationSchema): Notification {
    return Notification.create(
      {
        recipientId: raw.recipientId,
        recipientEmail: raw.recipientEmail,
        recipientName: raw.recipientName,
        sender: raw.sender,
        emailTemplateId: raw.emailTemplateId,
        status: raw.status,
        type: raw.type,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw._id,
    )
  }
}
