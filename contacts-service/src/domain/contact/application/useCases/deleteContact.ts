import { IContactsRepository } from '../repositories/IContactsRepository'
import { ContactNotFoundError } from './_errors/contactNotFoundError'

interface DeleteContactUseCaseRequest {
  contactId: string
}

interface DeleteContactUseCaseResponse {}

export class DeleteContactUseCase {
  constructor(private contactsRepository: IContactsRepository) {}
  async execute({
    contactId,
  }: DeleteContactUseCaseRequest): Promise<DeleteContactUseCaseResponse> {
    const contact = await this.contactsRepository.findById(contactId)

    if (!contact) {
      throw new ContactNotFoundError()
    }

    await this.contactsRepository.delete(contactId)

    return {}
  }
}
