import { Notification } from '@/domain/notification/entities/notification'

export class NotificationPresenter {
  static toHttp(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      recipientEmail: notification.recipientEmail,
      recipientName: notification.recipientName,
      sender: notification.sender,
      emailTemplateId: notification.emailTemplateId,
      status: notification.status,
      type: notification.type,
      created_at: notification.createdAt,
      updated_at: notification.updatedAt ?? undefined,
    }
  }
}
