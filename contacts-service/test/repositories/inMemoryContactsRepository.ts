import { IContactsRepository } from '@/domain/contact/application/repositories/IContactsRepository'
import { Contact } from '@/domain/contact/entities/contact'

export class InMemoryContactsRepository implements IContactsRepository {
  public items: Contact[] = []
  async create(contact: Contact): Promise<void> {
    this.items.push(contact)
  }

  async createMany(contacts: Contact[]): Promise<void> {
    contacts.map((contact) => this.items.push(contact))
  }

  async findByEmail(email: string): Promise<Contact | null> {
    const contact = this.items.find((contact) => contact.email === email)

    if (!contact) {
      return null
    }

    return contact
  }

  async findManyByEmails(emails: string[]): Promise<Contact[]> {
    const contacts = this.items.filter((item) => emails.includes(item.email))

    return contacts
  }

  async findById(id: string): Promise<Contact | null> {
    const contact = this.items.find((contact) => contact.id === id)

    if (!contact) {
      return null
    }

    return contact
  }

  async findManyByTags(tags: string[]): Promise<Contact[]> {
    const contacts = this.items.filter((contact) =>
      contact.tags.some((tag) => tags.includes(tag)),
    )

    return contacts
  }

  async save(contact: Contact): Promise<void> {
    const contactIndex = this.items.findIndex((item) => item.id === contact.id)

    this.items[contactIndex] = contact
  }

  async saveMany(contacts: Contact[]): Promise<void> {
    contacts.map((contact) => {
      const contactIndex = this.items.findIndex(
        (item) => item.id === contact.id,
      )

      return (this.items[contactIndex] = contact)
    })
  }

  async delete(id: string): Promise<void> {
    const contactIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(contactIndex, 1)
  }
}
