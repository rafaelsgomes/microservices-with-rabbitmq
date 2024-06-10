import { InMemoryMessagesRepository } from 'test/repositories/inMemoryMessagesRepository'
import { FetchMessagesByContactIdUseCase } from './fetchMessagesByContactId'
import { makeMessage } from 'test/factories/makeMessage'
import { faker } from '@faker-js/faker'

let repository: InMemoryMessagesRepository
let sut: FetchMessagesByContactIdUseCase

describe('Fetch messages by contactId', () => {
  beforeEach(() => {
    repository = new InMemoryMessagesRepository()
    sut = new FetchMessagesByContactIdUseCase(repository)
  })
  it('should be able to fetch messages by contactId', async () => {
    const contactId = faker.string.uuid()
    const message01OnDatabase = makeMessage({
      contactId,
      emailTemplateName: 'template-testing-01',
    })

    const message02OnDatabase = makeMessage({
      contactId,
      emailTemplateName: 'template-testing-02',
    })

    await Promise.all([
      repository.create(message01OnDatabase),
      repository.create(message02OnDatabase),
    ])

    const { messages } = await sut.execute({
      contactId,
    })

    expect(messages).toHaveLength(2)
    expect(messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          emailTemplateName: 'template-testing-01',
        }),
        expect.objectContaining({
          emailTemplateName: 'template-testing-02',
        }),
      ]),
    )
  })
})
