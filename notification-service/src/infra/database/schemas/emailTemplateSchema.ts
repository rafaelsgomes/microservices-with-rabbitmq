import { Status } from '@/domain/notification/entities/emailTemplate'
import { Schema } from 'mongoose'
import { MongoEmailTemplateSchema } from './interfaces/mongoEmailTemplateInterface'

export const emailTemplateSchema = new Schema<MongoEmailTemplateSchema>({
  _id: {
    type: Schema.Types.String,
  },
  content: {
    type: Schema.Types.String,
    require: true,
  },
  subject: {
    type: Schema.Types.String,
    require: true,
  },
  emailName: {
    type: Schema.Types.String,
    require: true,
    unique: true,
  },
  status: {
    type: Schema.Types.String,
    require: true,
    enum: Status,
  },
  createdAt: {
    type: Schema.Types.Date,
    require: true,
  },
  updatedAt: {
    type: Schema.Types.Date,
    require: false,
  },
  lastUsedAt: {
    type: Schema.Types.Date,
    require: false,
  },
})
