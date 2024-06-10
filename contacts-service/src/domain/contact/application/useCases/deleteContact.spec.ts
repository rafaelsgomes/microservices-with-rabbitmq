import { InMemoryContactsRepository } from 'test/repositories/inMemoryContactsRepository'
import { DeleteContactUseCase } from './deleteContact'
import { makeContact } from 'test/factories/makeContact'
import { ContactNotFoundError } from './_errors/contactNotFoundError'

let repository: InMemoryContactsRepository
let sut: DeleteContactUseCase

describe('Delete contact', () => {
  beforeEach(() => {
    repository = new InMemoryContactsRepository()
    sut = new DeleteContactUseCase(repository)
  })
  it('should be able to delete a contact by id', async () => {
    const contactOnDatabase = makeContact({
      email: 'test@email.com',
      name: 'test',
      tags: ['test'],
    })

    await repository.create(contactOnDatabase)

    await sut.execute({
      contactId: contactOnDatabase.id,
    })

    expect(repository.items.length).toEqual(0)
  })
  it('should not be able to delete a contact that does not exists', async () => {
    expect(() => {
      return sut.execute({
        contactId: 'contact.id',
      })
    }).rejects.toBeInstanceOf(ContactNotFoundError)
  })
})
