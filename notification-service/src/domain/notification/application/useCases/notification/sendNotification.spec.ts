import { InMemoryEmailTemplatesRepository } from 'test/repositories/inMemoryEmailTemplatesRepository'
import { SendNotificationUseCase } from './sendNotification'
import { makeEmailTemplate } from 'test/factories/makeEmailTemplate'
import { TemplateNotFoundError } from '../_errors/templateNotFoundError'
import { InMemoryNotificationsRepository } from 'test/repositories/inMemoryNotificationsRepository'
import { InMemoryEmailSender } from 'test/sender/inMemoryEmailSender'
import { faker } from '@faker-js/faker'

let repository: InMemoryNotificationsRepository
let inMemoryEmailTemplatesRepository: InMemoryEmailTemplatesRepository
let inMemoryEmailSender: InMemoryEmailSender
let sut: SendNotificationUseCase

describe('Send notification', () => {
  beforeEach(() => {
    repository = new InMemoryNotificationsRepository()
    inMemoryEmailTemplatesRepository = new InMemoryEmailTemplatesRepository()
    inMemoryEmailSender = new InMemoryEmailSender()
    sut = new SendNotificationUseCase(
      repository,
      inMemoryEmailTemplatesRepository,
      inMemoryEmailSender,
    )
  })
  it('should be able to send a notification', async () => {
    const emailTemplateOnDatabase = makeEmailTemplate()

    await inMemoryEmailTemplatesRepository.create(emailTemplateOnDatabase)

    const { notification } = await sut.execute({
      emailTemplateName: emailTemplateOnDatabase.emailName,
      recipientId: faker.string.uuid(),
      recipientEmail: faker.internet.email(),
      recipientName: faker.person.fullName(),
      sender: faker.internet.email(),
      type: 'user-created',
    })

    expect(notification).toEqual(
      expect.objectContaining({
        emailTemplateId: emailTemplateOnDatabase.id,
        status: 'sended',
        updatedAt: expect.any(Date),
      }),
    )
  })
  it('should not be able to send a notification when email template that does not exists', async () => {
    expect(() => {
      return sut.execute({
        emailTemplateName: 'emailTemplateName',
        recipientId: faker.string.uuid(),
        recipientEmail: faker.internet.email(),
        recipientName: faker.person.fullName(),
        sender: faker.internet.email(),
        type: 'user-created',
      })
    }).rejects.toBeInstanceOf(TemplateNotFoundError)
  })
})
