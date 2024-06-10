import { InMemoryMessagesRepository } from 'test/repositories/inMemoryMessagesRepository'
import { GetMessageByIdUseCase } from './getMessageById'
import { makeMessage } from 'test/factories/makeMessage'
import { MessageNotFoundError } from './_errors/messageNotFoundError'

let repository: InMemoryMessagesRepository
let sut: GetMessageByIdUseCase

describe('Get message by id', () => {
  beforeEach(() => {
    repository = new InMemoryMessagesRepository()
    sut = new GetMessageByIdUseCase(repository)
  })
  it('should be able to get a message by id', async () => {
    const messageOnDatabase = makeMessage({
      emailTemplateName: 'template-testing',
    })

    await repository.create(messageOnDatabase)

    const { message } = await sut.execute({
      messageId: messageOnDatabase.id,
    })

    expect(message).toEqual(
      expect.objectContaining({
        emailTemplateName: 'template-testing',
      }),
    )
  })
  it('should not be able to get a non existing message', async () => {
    expect(() => {
      return sut.execute({
        messageId: 'messageOnDatabase.id',
      })
    }).rejects.toBeInstanceOf(MessageNotFoundError)
  })
})
