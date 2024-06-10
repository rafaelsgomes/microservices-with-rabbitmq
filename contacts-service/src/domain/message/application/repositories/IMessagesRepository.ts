import { Message, StatusType } from '../../entities/message'

export interface IMessagesRepository {
  create(message: Message): Promise<void>
  findById(id: string): Promise<Message | null>
  findManyByContactId(contactId: string): Promise<Message[]>
  findManyByEmailTemplateName(emailTemplateName: string): Promise<Message[]>
  findManyByStatusType(statusType: StatusType): Promise<Message[]>
}
