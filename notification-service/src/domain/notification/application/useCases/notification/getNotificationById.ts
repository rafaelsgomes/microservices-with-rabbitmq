import { Notification } from '@/domain/notification/entities/notification'
import { INotificationsRepository } from '../../repositories/INotificationsRepository'
import { NotificationNotFoundError } from '../_errors/notificationNotFoundError'

interface GetNotificationByIdRequest {
  notificationId: string
}

interface GetNotificationByIdResponse {
  notification: Notification
}

export class GetNotificationByIdUseCase {
  constructor(private notificationsRepository: INotificationsRepository) {}

  async execute({
    notificationId,
  }: GetNotificationByIdRequest): Promise<GetNotificationByIdResponse> {
    const notification =
      await this.notificationsRepository.findById(notificationId)

    if (!notification) {
      throw new NotificationNotFoundError()
    }

    return {
      notification,
    }
  }
}
