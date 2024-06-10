import { Notification } from '@/domain/notification/entities/notification'
import { INotificationsRepository } from '../../repositories/INotificationsRepository'

interface FetchNotificationsByTemplateIdRequest {
  templateId: string
}

interface FetchNotificationsByTemplateIdResponse {
  notifications: Notification[]
}

export class FetchNotificationsByTemplateIdUseCase {
  constructor(private notificationsRepository: INotificationsRepository) {}

  async execute({
    templateId,
  }: FetchNotificationsByTemplateIdRequest): Promise<FetchNotificationsByTemplateIdResponse> {
    const notifications =
      await this.notificationsRepository.findManyByTemplateId(templateId)

    return {
      notifications,
    }
  }
}
