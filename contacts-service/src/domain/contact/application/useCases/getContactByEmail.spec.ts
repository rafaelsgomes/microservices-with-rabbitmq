import { InMemoryContactsRepository } from 'test/repositories/inMemoryContactsRepository'
import { GetContactByEmailUseCase } from './getContactByEmail'
import { makeContact } from 'test/factories/makeContact'
import { ContactNotFoundError } from './_errors/contactNotFoundError'

let repository: InMemoryContactsRepository
let sut: GetContactByEmailUseCase

describe('Get contact by e-mail', () => {
  beforeEach(() => {
    repository = new InMemoryContactsRepository()
    sut = new GetContactByEmailUseCase(repository)
  })
  it('should be able to get a contact by e-mail', async () => {
    const contactOnDatabase = makeContact({
      email: 'test@email.com',
      name: 'test',
      tags: ['test'],
    })

    await repository.create(contactOnDatabase)

    const { contact } = await sut.execute({
      email: 'test@email.com',
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
        email: 'test@email.com',
      })
    }).rejects.toBeInstanceOf(ContactNotFoundError)
  })
})
