import { Message } from '@/domain/message/entities/message'
import { IMessagesRepository } from '../repositories/IMessagesRepository'

interface FetchMessagesByEmailTemplateNameUseCaseRequest {
  emailTemplateName: string
}

interface FetchMessagesByEmailTemplateNameUseCaseResponse {
  messages: Message[]
}

export class FetchMessagesByEmailTemplateNameUseCase {
  constructor(private messagesRepository: IMessagesRepository) {}
  async execute({
    emailTemplateName,
  }: FetchMessagesByEmailTemplateNameUseCaseRequest): Promise<FetchMessagesByEmailTemplateNameUseCaseResponse> {
    const messages =
      await this.messagesRepository.findManyByEmailTemplateName(
        emailTemplateName,
      )

    return {
      messages,
    }
  }
}
