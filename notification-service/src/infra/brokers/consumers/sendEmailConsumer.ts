import { z } from 'zod'
import { sendNotificationUseCase } from './factories/makeSendNotification'
import { rabbitMQConnection } from '../rabbitMQ/rabbitMqConnection'
import { env } from '@/infra/env'

export const MessagePayloadSchema = z.object({
  recipientId: z.string().uuid(),
  recipientName: z.string(),
  recipientEmail: z.string(),
  emailTemplateName: z.string(),
  type: z.string(),
})

export class SendEmailConsumer {
  async send() {
    try {
      await rabbitMQConnection.consume({
        queue: 'email-send',
        callback: async (message) => {
          const {
            emailTemplateName,
            recipientEmail,
            recipientId,
            recipientName,
            type,
          } = MessagePayloadSchema.parse(JSON.parse(message.content.toString()))

          const { notification } = await sendNotificationUseCase.execute({
            emailTemplateName,
            recipientEmail,
            recipientId,
            recipientName,
            sender: env.SENDER_EMAIL,
            type,
          })

          if (notification.status === 'sended') {
            await rabbitMQConnection.ackMessage(message)
          }
        },
      })
    } catch (error) {
      return { status: `${error}` }
    }
  }
}

export const sendEmailConsumer = new SendEmailConsumer()
