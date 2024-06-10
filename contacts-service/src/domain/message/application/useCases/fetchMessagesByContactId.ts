import { Message } from '@/domain/message/entities/message'
import { IMessagesRepository } from '../repositories/IMessagesRepository'

interface FetchMessagesByContactIdUseCaseRequest {
  contactId: string
}

interface FetchMessagesByContactIdUseCaseResponse {
  messages: Message[]
}

export class FetchMessagesByContactIdUseCase {
  constructor(private messagesRepository: IMessagesRepository) {}
  async execute({
    contactId,
  }: FetchMessagesByContactIdUseCaseRequest): Promise<FetchMessagesByContactIdUseCaseResponse> {
    const messages =
      await this.messagesRepository.findManyByContactId(contactId)

    return {
      messages,
    }
  }
}
