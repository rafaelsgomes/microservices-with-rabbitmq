import { IEmailSender } from '@/domain/notification/application/sender/IEmailSender'
import { EmailTemplate } from '@/domain/notification/entities/emailTemplate'
import { Notification } from '@/domain/notification/entities/notification'

export class MailSender implements IEmailSender {
  async send(
    notification: Notification,
    template: EmailTemplate,
  ): Promise<{ status: string }> {
    // Your code comes here
    console.log(
      `Notification sent to ${notification.recipientEmail} using emailTemplate ${template.id}`,
    )
    return {
      status: 'sended',
    }
  }
}
