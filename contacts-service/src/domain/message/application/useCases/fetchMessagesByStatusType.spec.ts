import { InMemoryMessagesRepository } from 'test/repositories/inMemoryMessagesRepository'
import { FetchMessagesByStatusTypeUseCase } from './fetchMessagesByStatusType'
import { makeMessage } from 'test/factories/makeMessage'
import { StatusType } from '@/domain/message/entities/message'

let repository: InMemoryMessagesRepository
let sut: FetchMessagesByStatusTypeUseCase

describe('Fetch messages by statusType', () => {
  beforeEach(() => {
    repository = new InMemoryMessagesRepository()
    sut = new FetchMessagesByStatusTypeUseCase(repository)
  })
  it('should be able to fetch messages by statusType', async () => {
    const message01OnDatabase = makeMessage({
      statusType: StatusType.PRODUCED,
      emailTemplateName: 'template-testing',
    })

    const message02OnDatabase = makeMessage({
      statusType: StatusType.ERROR,
    })

    await Promise.all([
      repository.create(message01OnDatabase),
      repository.create(message02OnDatabase),
    ])

    const { messages } = await sut.execute({
      statusType: StatusType.PRODUCED,
    })

    expect(messages).toHaveLength(1)
    expect(messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          emailTemplateName: 'template-testing',
        }),
      ]),
    )
  })
})
