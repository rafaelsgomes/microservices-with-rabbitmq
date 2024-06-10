import { InMemoryContactsRepository } from 'test/repositories/inMemoryContactsRepository'
import { CreateContactUseCase } from './createContact'
import { makeContact } from 'test/factories/makeContact'

let repository: InMemoryContactsRepository
let sut: CreateContactUseCase

describe('Create contact', () => {
  beforeEach(() => {
    repository = new InMemoryContactsRepository()
    sut = new CreateContactUseCase(repository)
  })
  it('should be able to create a new contact', async () => {
    const { contact } = await sut.execute({
      email: 'test@email.com',
      name: 'test',
      tags: ['test'],
    })

    expect(contact).toEqual(
      expect.objectContaining({
        email: 'test@email.com',
      }),
    )
    expect(repository.items).toHaveLength(1)
    expect(repository.items[0]).toEqual(
      expect.objectContaining({
        email: 'test@email.com',
        name: 'test',
        tags: ['test'],
      }),
    )
  })
  it('should not be able to create a new contact with same email only update tags when necessary', async () => {
    const contactOnDatabase = makeContact({
      email: 'test@email.com',
      name: 'test',
      tags: ['test'],
    })

    await repository.create(contactOnDatabase)

    await sut.execute({
      email: 'test@email.com',
      name: 'test',
      tags: ['test', 'test02'],
    })

    expect(repository.items).toHaveLength(1)
    expect(repository.items[0].updatedAt).toEqual(expect.any(Date))
    expect(repository.items[0]).toEqual(
      expect.objectContaining({
        email: 'test@email.com',
        name: 'test',
        tags: ['test', 'test02'],
      }),
    )
  })
})
