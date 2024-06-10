import { InMemoryContactsRepository } from 'test/repositories/inMemoryContactsRepository'
import { CreateManyContactsUseCase } from './createManyContacts'
import { makeContact } from 'test/factories/makeContact'

let repository: InMemoryContactsRepository
let sut: CreateManyContactsUseCase

describe('Create many contacts', () => {
  beforeEach(() => {
    repository = new InMemoryContactsRepository()
    sut = new CreateManyContactsUseCase(repository)
  })
  it('should be able to create many contacts', async () => {
    const { contacts } = await sut.execute({
      data: [
        {
          email: 'test01@email.com',
          name: 'test',
        },
        {
          email: 'test02@email.com',
          name: 'test',
        },
      ],
      tags: ['test'],
    })

    expect(contacts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: 'test01@email.com',
        }),
      ]),
    )
    expect(repository.items).toHaveLength(2)
    expect(repository.items[0]).toEqual(
      expect.objectContaining({
        email: 'test01@email.com',
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
      data: [
        {
          email: 'test@email.com',
          name: 'test',
        },
        {
          email: 'test01@email.com',
          name: 'test',
        },
      ],
      tags: ['test', 'test02'],
    })

    expect(repository.items).toHaveLength(2)
    expect(repository.items[0].updatedAt).toEqual(expect.any(Date))
    expect(repository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: 'test@email.com',
          name: 'test',
          tags: ['test', 'test02'],
        }),
        expect.objectContaining({
          email: 'test01@email.com',
          name: 'test',
          tags: ['test', 'test02'],
        }),
      ]),
    )
  })
})
