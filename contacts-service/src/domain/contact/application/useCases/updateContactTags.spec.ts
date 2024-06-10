import { InMemoryContactsRepository } from 'test/repositories/inMemoryContactsRepository'
import { UpdateContactTagsUseCase } from './updateContactTags'
import { makeContact } from 'test/factories/makeContact'

let repository: InMemoryContactsRepository
let sut: UpdateContactTagsUseCase

describe('Update contact tags', () => {
  beforeEach(() => {
    repository = new InMemoryContactsRepository()
    sut = new UpdateContactTagsUseCase(repository)
  })
  it('should be able to update a contact tags', async () => {
    const contactOnDatabase = makeContact({
      email: 'test@email.com',
      name: 'test',
      tags: ['test'],
    })

    await repository.create(contactOnDatabase)

    await sut.execute({
      contactId: contactOnDatabase.id,
      tags: ['test02'],
    })

    expect(repository.items).toHaveLength(1)
    expect(repository.items[0].updatedAt).toEqual(expect.any(Date))
    expect(repository.items[0]).toEqual(
      expect.objectContaining({
        tags: ['test02'],
      }),
    )
  })
})
