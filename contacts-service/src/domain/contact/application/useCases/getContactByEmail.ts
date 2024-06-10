import { Contact } from '@/domain/contact/entities/contact'
import { IContactsRepository } from '../repositories/IContactsRepository'
import { ContactNotFoundError } from './_errors/contactNotFoundError'

interface GetContactByEmailUseCaseRequest {
  email: string
}

interface GetContactByEmailUseCaseResponse {
  contact: Contact
}

export class GetContactByEmailUseCase {
  constructor(private contactsRepository: IContactsRepository) {}
  async execute({
    email,
  }: GetContactByEmailUseCaseRequest): Promise<GetContactByEmailUseCaseResponse> {
    const contact = await this.contactsRepository.findByEmail(email)

    if (!contact) {
      throw new ContactNotFoundError()
    }

    return {
      contact,
    }
  }
}
