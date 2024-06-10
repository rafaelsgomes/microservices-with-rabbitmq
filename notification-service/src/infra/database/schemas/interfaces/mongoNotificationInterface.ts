import { z } from 'zod'

export const mongoNotificationSchema = z.object({
  _id: z.string().uuid(),
  recipientId: z.string().uuid(),
  recipientName: z.string(),
  recipientEmail: z.string(),
  sender: z.string(),
  emailTemplateId: z.string().uuid(),
  status: z.string(),
  type: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

export type MongoNotificationSchema = z.infer<typeof mongoNotificationSchema>
