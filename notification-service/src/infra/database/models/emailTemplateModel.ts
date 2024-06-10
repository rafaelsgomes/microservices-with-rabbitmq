import { model } from 'mongoose'
import { emailTemplateSchema } from '../schemas/emailTemplateSchema'
import { MongoEmailTemplateSchema } from '../schemas/interfaces/mongoEmailTemplateInterface'

export const EmailTemplateModel = model<MongoEmailTemplateSchema>(
  'EmailTemplate',
  emailTemplateSchema,
)
