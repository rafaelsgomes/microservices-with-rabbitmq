import { Contact } from '@/domain/contact/entities/contact'
import { IContactsRepository } from '../repositories/IContactsRepository'
import { ContactNotFoundError } from './_errors/contactNotFoundError'

interface GetContactByIdUseCaseRequest {
  contactId: string
}

interface GetContactByIdUseCaseResponse {
  contact: Contact
}

export class GetContactByIdUseCase {
  constructor(private contactsRepository: IContactsRepository) {}
  async execute({
    contactId,
  }: GetContactByIdUseCaseRequest): Promise<GetContactByIdUseCaseResponse> {
    const contact = await this.contactsRepository.findById(contactId)

    if (!contact) {
      throw new ContactNotFoundError()
    }

    return {
      contact,
    }
  }
}
