import { Message } from '@/domain/message/entities/message'

export class MessagePresenter {
  static toHttp(message: Message) {
    return {
      id: message.id,
      contact_id: message.contactId,
      email_template_name: message.emailTemplateName,
      status_message: message.statusMessage,
      status_type: message.statusType,
      created_at: message.createdAt,
    }
  }
}
