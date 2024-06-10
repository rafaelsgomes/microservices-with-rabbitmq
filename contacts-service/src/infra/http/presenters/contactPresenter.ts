import { Contact } from '@/domain/contact/entities/contact'

export class ContactPresenter {
  static toHttp(contact: Contact) {
    return {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      isAbleToReceiveMessage: contact.isAbleToReceiveMessage,
      tags: contact.tags,
      created_at: contact.createdAt,
      updated_at: contact.updatedAt ?? undefined,
    }
  }
}
