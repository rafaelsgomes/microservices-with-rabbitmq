import { InMemoryMessagesRepository } from 'test/repositories/inMemoryMessagesRepository'
import { CreateMessageUseCase } from './createMessage'
import { faker } from '@faker-js/faker'
import { StatusType } from '@/domain/message/entities/message'

let repository: InMemoryMessagesRepository
let sut: CreateMessageUseCase

describe('Create message', () => {
  beforeEach(() => {
    repository = new InMemoryMessagesRepository()
    sut = new CreateMessageUseCase(repository)
  })
  it('should be able to create a new message', async () => {
    const contactId = faker.string.uuid()
    const { message } = await sut.execute({
      contactId,
      emailTemplateName: 'template-test-unit',
      statusMessage: 'testing status',
      statusType: StatusType.PRODUCED,
      type: 'testing type',
    })

    expect(message).toEqual(
      expect.objectContaining({
        emailTemplateName: 'template-test-unit',
      }),
    )
    expect(repository.items).toHaveLength(1)
    expect(repository.items[0]).toEqual(
      expect.objectContaining({
        contactId,
        emailTemplateName: 'template-test-unit',
        statusMessage: 'testing status',
        statusType: StatusType.PRODUCED,
        type: 'testing type',
      }),
    )
  })
})
