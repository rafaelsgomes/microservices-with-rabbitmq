import { Contact } from '@/domain/contact/entities/contact'
import { IContactsRepository } from '../repositories/IContactsRepository'
import { ContactNotFoundError } from './_errors/contactNotFoundError'

interface UpdateContactTagsUseCaseRequest {
  contactId: string
  tags: string[]
}

interface UpdateContactTagsUseCaseResponse {
  contact: Contact
}

export class UpdateContactTagsUseCase {
  constructor(private contactsRepository: IContactsRepository) {}
  async execute({
    contactId,
    tags,
  }: UpdateContactTagsUseCaseRequest): Promise<UpdateContactTagsUseCaseResponse> {
    const contact = await this.contactsRepository.findById(contactId)

    if (!contact) {
      throw new ContactNotFoundError()
    }

    if (tags.length > 0) {
      contact.tags = tags
      await this.contactsRepository.save(contact)
    }

    return {
      contact,
    }
  }
}
