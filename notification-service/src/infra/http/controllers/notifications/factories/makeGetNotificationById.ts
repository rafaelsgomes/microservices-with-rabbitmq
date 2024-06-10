import { GetNotificationByIdUseCase } from '@/domain/notification/application/useCases/notification/getNotificationById'
import { MongoNotificationsRepository } from '@/infra/database/repositories/mongoNotificationsRepository'

const repository = new MongoNotificationsRepository()
export const getNotificationByIdUseCase = new GetNotificationByIdUseCase(
  repository,
)
