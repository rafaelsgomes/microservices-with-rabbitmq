import { Contact } from '@/domain/contact/entities/contact'
import { IContactsRepository } from '../repositories/IContactsRepository'

interface CreateContactUseCaseRequest {
  name: string
  email: string
  tags: string[]
}

interface CreateContactUseCaseResponse {
  contact: Contact
}

export class CreateContactUseCase {
  constructor(private contactsRepository: IContactsRepository) {}
  async execute({
    email,
    name,
    tags,
  }: CreateContactUseCaseRequest): Promise<CreateContactUseCaseResponse> {
    const contactAlreadyExists =
      await this.contactsRepository.findByEmail(email)

    if (contactAlreadyExists) {
      const newTags = tags.filter(
        (tag) => !contactAlreadyExists.tags.includes(tag),
      )

      if (newTags.length > 0) {
        contactAlreadyExists.addNewTags(newTags)
        await this.contactsRepository.save(contactAlreadyExists)
      }

      return {
        contact: contactAlreadyExists,
      }
    }

    const contact = Contact.create({
      email,
      name,
      tags,
    })
    await this.contactsRepository.create(contact)

    return {
      contact,
    }
  }
}
