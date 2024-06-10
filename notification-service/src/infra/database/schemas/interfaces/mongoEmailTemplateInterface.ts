import { Status } from '@/domain/notification/entities/emailTemplate'
import { z } from 'zod'

export const mongoEmailTemplateSchema = z.object({
  _id: z.string().uuid(),
  content: z.string(),
  subject: z.string(),
  emailName: z.string(),
  status: z.nativeEnum(Status),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  lastUsedAt: z.date().optional(),
})

export type MongoEmailTemplateSchema = z.infer<typeof mongoEmailTemplateSchema>
