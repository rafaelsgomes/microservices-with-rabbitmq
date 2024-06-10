import { FetchNotificationsByRecipientEmailUseCase } from '@/domain/notification/application/useCases/notification/fetchNotificationsByRecipientEmail'
import { MongoNotificationsRepository } from '@/infra/database/repositories/mongoNotificationsRepository'

const repository = new MongoNotificationsRepository()
export const fetchNotificationsByRecipientEmailUseCase =
  new FetchNotificationsByRecipientEmailUseCase(repository)
