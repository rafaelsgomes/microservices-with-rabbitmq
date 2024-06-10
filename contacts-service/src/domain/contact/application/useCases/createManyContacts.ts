import { Contact } from '@/domain/contact/entities/contact'
import { IContactsRepository } from '../repositories/IContactsRepository'

interface CreateManyContactsUseCaseRequest {
  data: {
    name: string
    email: string
  }[]
  tags: string[]
}

interface CreateManyContactsUseCaseResponse {
  contacts: Contact[]
}

export class CreateManyContactsUseCase {
  constructor(private contactsRepository: IContactsRepository) {}
  async execute({
    data,
    tags,
  }: CreateManyContactsUseCaseRequest): Promise<CreateManyContactsUseCaseResponse> {
    const contacts: Contact[] = []
    const emails = data.map((contact) => contact.email)
    const contactsAlreadyExists =
      await this.contactsRepository.findManyByEmails(emails)

    if (contactsAlreadyExists.length > 0) {
      contactsAlreadyExists.map((contact) => {
        const newTags = tags.filter((tag) => !contact.tags.includes(tag))

        if (newTags.length > 0) {
          contact.addNewTags(newTags)
        }
        contacts.push(contact)
        const contactIndexOnNewContacts = data.findIndex(
          (item) => item.email === contact.email,
        )
        data.splice(contactIndexOnNewContacts, 1)
        return contact
      })
      await this.contactsRepository.saveMany(contactsAlreadyExists)
    }

    const newContacts = data.map((item) => {
      const contact = Contact.create({
        email: item.email,
        name: item.name,
        tags,
      })

      contacts.push(contact)

      return contact
    })

    await this.contactsRepository.createMany(newContacts)

    return {
      contacts,
    }
  }
}
