import { InMemoryContactsRepository } from 'test/repositories/inMemoryContactsRepository'
import { GetContactByIdUseCase } from './getContactById'
import { makeContact } from 'test/factories/makeContact'
import { ContactNotFoundError } from './_errors/contactNotFoundError'

let repository: InMemoryContactsRepository
let sut: GetContactByIdUseCase

describe('Get contact by id', () => {
  beforeEach(() => {
    repository = new InMemoryContactsRepository()
    sut = new GetContactByIdUseCase(repository)
  })
  it('should be able to get a contact by id', async () => {
    const contactOnDatabase = makeContact({
      email: 'test@email.com',
      name: 'test',
      tags: ['test'],
    })

    await repository.create(contactOnDatabase)

    const { contact } = await sut.execute({
      contactId: contactOnDatabase.id,
    })

    expect(contact).toEqual(
      expect.objectContaining({
        email: 'test@email.com',
      }),
    )
  })
  it('should not be able to get a contact that does not exists', async () => {
    expect(() => {
      return sut.execute({
        contactId: 'contact.id',
      })
    }).rejects.toBeInstanceOf(ContactNotFoundError)
  })
})
