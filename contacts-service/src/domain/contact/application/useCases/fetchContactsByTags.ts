import { Contact } from '@/domain/contact/entities/contact'
import { IContactsRepository } from '../repositories/IContactsRepository'

interface FetchContactsByTagsUseCaseRequest {
  tags: string[]
}

interface FetchContactsByTagsUseCaseResponse {
  contacts: Contact[]
}

export class FetchContactsByTagsUseCase {
  constructor(private contactsRepository: IContactsRepository) {}
  async execute({
    tags,
  }: FetchContactsByTagsUseCaseRequest): Promise<FetchContactsByTagsUseCaseResponse> {
    const contacts = await this.contactsRepository.findManyByTags(tags)

    return {
      contacts,
    }
  }
}
