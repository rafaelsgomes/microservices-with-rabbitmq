import { z } from 'zod'
import { rabbitMQConnection } from '../rabbitMQ/rabbitMqConnection'
import { getContactByIdUseCase } from '@/infra/http/controllers/contacts/factories/makeGetContactById'
import { createMessageUseCase } from './factories/makeCreateMessage'
import { StatusType } from '@/domain/message/entities/message'

export const MessagePayloadSchema = z.object({
  recipientId: z.string().uuid(),
  recipientName: z.string(),
  recipientEmail: z.string(),
  emailTemplateName: z.string(),
  type: z.string(),
})

interface ProduceMessageRequest {
  contactId: string
  emailTemplateName: string
  type: string
}

export class SendEmailProducer {
  async produce({
    contactId,
    emailTemplateName,
    type,
  }: ProduceMessageRequest): Promise<{ status: string }> {
    try {
      const { contact } = await getContactByIdUseCase.execute({
        contactId,
      })

      if (!contactId) {
        const { message } = await createMessageUseCase.execute({
          contactId,
          emailTemplateName,
          type,
          statusMessage: `Contact ${contactId} not found`,
          statusType: StatusType.ERROR,
        })
        return { status: message.statusType }
      }

      if (!contact.isAbleToReceiveMessage) {
        const { message } = await createMessageUseCase.execute({
          contactId,
          emailTemplateName,
          type,
          statusMessage: `Contact ${contactId} is not able to receive message`,
          statusType: StatusType.NOT_ABLE,
        })
        return { status: message.statusType }
      }

      const messageToSend = {
        recipientId: contact.id,
        recipientEmail: contact.email,
        recipientName: contact.name,
        emailTemplateName,
        type,
      }

      const sended = await rabbitMQConnection.publishInExchange({
        exchange: 'amq.direct',
        routingKey: 'email-send',
        message: JSON.stringify(messageToSend),
      })

      if (!sended) {
        const { message } = await createMessageUseCase.execute({
          contactId,
          emailTemplateName,
          type,
          statusMessage: `Message not sended to contact ${contactId}`,
          statusType: StatusType.ERROR,
        })
        return { status: message.statusType }
      }

      const { message } = await createMessageUseCase.execute({
        contactId,
        emailTemplateName,
        type,
        statusMessage: `Message sended to contact ${contactId}`,
        statusType: StatusType.PRODUCED,
      })
      return { status: message.statusType }
    } catch (error) {
      const { message } = await createMessageUseCase.execute({
        contactId,
        emailTemplateName,
        type,
        statusMessage: `Message not sended to contact ${contactId}`,
        statusType: StatusType.ERROR,
      })
      return { status: message.statusType }
    }
  }
}

export const sendEmailProducer = new SendEmailProducer()
