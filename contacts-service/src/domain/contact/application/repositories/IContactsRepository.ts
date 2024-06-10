import { Contact } from '../../entities/contact'

export interface IContactsRepository {
  create(contact: Contact): Promise<void>
  createMany(contacts: Contact[]): Promise<void>
  findByEmail(email: string): Promise<Contact | null>
  findManyByEmails(emails: string[]): Promise<Contact[]>
  findById(id: string): Promise<Contact | null>
  findManyByTags(tags: string[]): Promise<Contact[]>
  save(contact: Contact): Promise<void>
  saveMany(contacts: Contact[]): Promise<void>
  delete(id: string): Promise<void>
}
