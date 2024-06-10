import { InMemoryContactsRepository } from 'test/repositories/inMemoryContactsRepository'
import { FetchContactsByTagsUseCase } from './fetchContactsByTags'
import { makeContact } from 'test/factories/makeContact'

let repository: InMemoryContactsRepository
let sut: FetchContactsByTagsUseCase

describe('Fetch contacts by tags', () => {
  beforeEach(() => {
    repository = new InMemoryContactsRepository()
    sut = new FetchContactsByTagsUseCase(repository)
  })
  it('should be able to fetch contacts by tags', async () => {
    const contact01OnDatabase = makeContact({
      email: 'test01@email.com',
      name: 'test',
      tags: ['test'],
    })

    const contact02OnDatabase = makeContact({
      email: 'test02@email.com',
      name: 'test',
      tags: ['test', 'test01'],
    })

    const contact03OnDatabase = makeContact({
      email: 'test03@email.com',
      name: 'test',
      tags: ['test01'],
    })

    await repository.createMany([
      contact01OnDatabase,
      contact02OnDatabase,
      contact03OnDatabase,
    ])

    const { contacts } = await sut.execute({
      tags: ['test'],
    })

    expect(contacts).toHaveLength(2)
    expect(contacts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: 'test01@email.com',
        }),
        expect.objectContaining({
          email: 'test02@email.com',
        }),
      ]),
    )
  })
})
