import { EmailTemplate } from '../../entities/emailTemplate'
import { Notification } from '../../entities/notification'

export interface IEmailSender {
  send(
    notification: Notification,
    template: EmailTemplate,
  ): Promise<{ status: string }>
}
