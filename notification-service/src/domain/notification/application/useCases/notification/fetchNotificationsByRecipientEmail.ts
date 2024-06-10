import { Notification } from '@/domain/notification/entities/notification'
import { INotificationsRepository } from '../../repositories/INotificationsRepository'

interface FetchNotificationsByRecipientEmailRequest {
  recipientEmail: string
}

interface FetchNotificationsByRecipientEmailResponse {
  notifications: Notification[]
}

export class FetchNotificationsByRecipientEmailUseCase {
  constructor(private notificationsRepository: INotificationsRepository) {}

  async execute({
    recipientEmail,
  }: FetchNotificationsByRecipientEmailRequest): Promise<FetchNotificationsByRecipientEmailResponse> {
    const notifications =
      await this.notificationsRepository.findManyByRecipientEmail(
        recipientEmail,
      )

    return {
      notifications,
    }
  }
}
