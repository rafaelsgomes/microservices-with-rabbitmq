import { Notification } from '../../entities/notification'

export interface INotificationsRepository {
  create(notification: Notification): Promise<void>
  findById(id: string): Promise<Notification | null>
  findManyByRecipientEmail(recipientEmail: string): Promise<Notification[]>
  findManyByTemplateId(templateId: string): Promise<Notification[]>
  save(notification: Notification): Promise<void>
}
