import { FetchNotificationsByTemplateIdUseCase } from '@/domain/notification/application/useCases/notification/fetchNotificationsByTemplateId'
import { MongoNotificationsRepository } from '@/infra/database/repositories/mongoNotificationsRepository'

const repository = new MongoNotificationsRepository()
export const fetchNotificationsByTemplateIdUseCase =
  new FetchNotificationsByTemplateIdUseCase(repository)
