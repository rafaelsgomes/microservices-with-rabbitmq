import { Message, StatusType } from '@/domain/message/entities/message'
import { IMessagesRepository } from '../repositories/IMessagesRepository'

interface CreateMessageUseCaseRequest {
  contactId: string
  emailTemplateName: string
  type: string
  statusMessage: string
  statusType: StatusType
}

interface CreateMessageUseCaseResponse {
  message: Message
}

export class CreateMessageUseCase {
  constructor(private messagesRepository: IMessagesRepository) {}
  async execute({
    contactId,
    emailTemplateName,
    statusMessage,
    statusType,
    type,
  }: CreateMessageUseCaseRequest): Promise<CreateMessageUseCaseResponse> {
    const message = Message.create({
      contactId,
      emailTemplateName,
      statusMessage,
      statusType,
      type,
    })

    await this.messagesRepository.create(message)

    return {
      message,
    }
  }
}
