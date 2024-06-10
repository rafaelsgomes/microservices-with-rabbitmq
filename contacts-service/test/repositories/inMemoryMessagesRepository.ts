import { IMessagesRepository } from '@/domain/message/application/repositories/IMessagesRepository'
import { Message, StatusType } from '@/domain/message/entities/message'

export class InMemoryMessagesRepository implements IMessagesRepository {
  public items: Message[] = []
  async create(message: Message): Promise<void> {
    this.items.push(message)
  }

  async findById(id: string): Promise<Message | null> {
    const message = this.items.find((message) => message.id === id)

    if (!message) {
      return null
    }

    return message
  }

  async findManyByContactId(contactId: string): Promise<Message[]> {
    const messages = this.items.filter(
      (message) => message.contactId === contactId,
    )

    return messages
  }

  async findManyByEmailTemplateName(
    emailTemplateName: string,
  ): Promise<Message[]> {
    const messages = this.items.filter(
      (message) => message.emailTemplateName === emailTemplateName,
    )

    return messages
  }

  async findManyByStatusType(statusType: StatusType): Promise<Message[]> {
    const messages = this.items.filter(
      (message) => message.statusType === statusType,
    )

    return messages
  }
}
