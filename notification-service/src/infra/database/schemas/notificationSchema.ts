import { Schema } from 'mongoose'
import { MongoNotificationSchema } from './interfaces/mongoNotificationInterface'

export const notificationSchema = new Schema<MongoNotificationSchema>({
  _id: {
    type: Schema.Types.String,
  },
  recipientId: {
    type: Schema.Types.String,
    require: true,
  },
  recipientName: {
    type: Schema.Types.String,
    require: true,
  },
  recipientEmail: {
    type: Schema.Types.String,
    require: true,
    lowercase: true,
  },
  sender: {
    type: Schema.Types.String,
    require: true,
  },
  emailTemplateId: {
    type: Schema.Types.String,
    require: true,
  },
  status: {
    type: Schema.Types.String,
    require: true,
  },
  type: {
    type: Schema.Types.String,
    require: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    require: true,
  },
  updatedAt: {
    type: Schema.Types.Date,
    require: false,
  },
})
