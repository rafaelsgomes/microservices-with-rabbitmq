import { SendNotificationUseCase } from '@/domain/notification/application/useCases/notification/sendNotification'
import { MongoEmailsTemplatesRepository } from '@/infra/database/repositories/mongoEmailsTemplatesRepository'
import { MongoNotificationsRepository } from '@/infra/database/repositories/mongoNotificationsRepository'
import { MailSender } from '@/infra/mailSender/mailSender'

const repository = new MongoNotificationsRepository()
const mongoEmailsTemplatesRepository = new MongoEmailsTemplatesRepository()
const mailSender = new MailSender()
export const sendNotificationUseCase = new SendNotificationUseCase(
  repository,
  mongoEmailsTemplatesRepository,
  mailSender,
)
