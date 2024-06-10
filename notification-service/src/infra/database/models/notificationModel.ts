import { model } from 'mongoose'
import { notificationSchema } from '../schemas/notificationSchema'
import { MongoNotificationSchema } from '../schemas/interfaces/mongoNotificationInterface'

export const NotificationModel = model<MongoNotificationSchema>(
  'Notification',
  notificationSchema,
)
