import { Message, StatusType } from '@/domain/message/entities/message'
import { IMessagesRepository } from '../repositories/IMessagesRepository'

interface FetchMessagesByStatusTypeUseCaseRequest {
  statusType: StatusType
}

interface FetchMessagesByStatusTypeUseCaseResponse {
  messages: Message[]
}

export class FetchMessagesByStatusTypeUseCase {
  constructor(private messagesRepository: IMessagesRepository) {}
  async execute({
    statusType,
  }: FetchMessagesByStatusTypeUseCaseRequest): Promise<FetchMessagesByStatusTypeUseCaseResponse> {
    const messages =
      await this.messagesRepository.findManyByStatusType(statusType)

    return {
      messages,
    }
  }
}
