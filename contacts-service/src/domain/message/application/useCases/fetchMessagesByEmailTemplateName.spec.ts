import { InMemoryMessagesRepository } from 'test/repositories/inMemoryMessagesRepository'
import { FetchMessagesByEmailTemplateNameUseCase } from './fetchMessagesByEmailTemplateName'
import { makeMessage } from 'test/factories/makeMessage'

let repository: InMemoryMessagesRepository
let sut: FetchMessagesByEmailTemplateNameUseCase

describe('Fetch messages by emailTemplateName', () => {
  beforeEach(() => {
    repository = new InMemoryMessagesRepository()
    sut = new FetchMessagesByEmailTemplateNameUseCase(repository)
  })
  it('should be able to fetch messages by emailTemplateName', async () => {
    const message01OnDatabase = makeMessage({
      emailTemplateName: 'template-testing',
    })

    const message02OnDatabase = makeMessage({
      emailTemplateName: 'template-testing',
    })

    await Promise.all([
      repository.create(message01OnDatabase),
      repository.create(message02OnDatabase),
    ])

    const { messages } = await sut.execute({
      emailTemplateName: 'template-testing',
    })

    expect(messages).toHaveLength(2)
    expect(messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          emailTemplateName: 'template-testing',
        }),
        expect.objectContaining({
          emailTemplateName: 'template-testing',
        }),
      ]),
    )
  })
})
