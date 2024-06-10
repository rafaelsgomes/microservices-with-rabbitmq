import { Notification } from '@/domain/notification/entities/notification'
import { IEmailTemplatesRepository } from '../../repositories/IEmailTemplatesRepository'
import { INotificationsRepository } from '../../repositories/INotificationsRepository'
import { TemplateNotFoundError } from '../_errors/templateNotFoundError'
import { IEmailSender } from '../../sender/IEmailSender'
import { Status } from '@/domain/notification/entities/emailTemplate'
import { EmailTemplateDisabledError } from '../_errors/emailTemplateDisabledError'

interface SendNotificationRequest {
  recipientId: string
  recipientName: string
  recipientEmail: string
  sender: string
  emailTemplateName: string
  type: string
}

interface SendNotificationResponse {
  notification: Notification
}

export class SendNotificationUseCase {
  constructor(
    private notificationsRepository: INotificationsRepository,
    private emailTemplateRepository: IEmailTemplatesRepository,
    private emailSender: IEmailSender,
  ) {}

  async execute({
    emailTemplateName,
    recipientId,
    recipientName,
    recipientEmail,
    sender,
    type,
  }: SendNotificationRequest): Promise<SendNotificationResponse> {
    const emailTemplate =
      await this.emailTemplateRepository.findByTemplateName(emailTemplateName)

    if (!emailTemplate) {
      throw new TemplateNotFoundError()
    }

    if (emailTemplate.status === Status.DISABLED) {
      throw new EmailTemplateDisabledError()
    }

    const notification = Notification.create({
      recipientId,
      recipientName,
      recipientEmail: recipientEmail.toLowerCase(),
      sender,
      type,
      emailTemplateId: emailTemplate.id,
    })

    const { status } = await this.emailSender.send(notification, emailTemplate)

    notification.status = status

    await this.notificationsRepository.create(notification)

    return {
      notification,
    }
  }
}
