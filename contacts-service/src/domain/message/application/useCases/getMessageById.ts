import { Message } from '@/domain/message/entities/message'
import { IMessagesRepository } from '../repositories/IMessagesRepository'
import { MessageNotFoundError } from './_errors/messageNotFoundError'

interface GetMessageByIdUseCaseRequest {
  messageId: string
}

interface GetMessageByIdUseCaseResponse {
  message: Message
}

export class GetMessageByIdUseCase {
  constructor(private messagesRepository: IMessagesRepository) {}
  async execute({
    messageId,
  }: GetMessageByIdUseCaseRequest): Promise<GetMessageByIdUseCaseResponse> {
    const message = await this.messagesRepository.findById(messageId)

    if (!message) {
      throw new MessageNotFoundError()
    }

    return {
      message,
    }
  }
}
