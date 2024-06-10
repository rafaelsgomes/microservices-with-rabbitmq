import { FetchNotificationsByRecipientEmailUseCase } from './fetchNotificationsByRecipientEmail'
import { InMemoryNotificationsRepository } from 'test/repositories/inMemoryNotificationsRepository'
import { makeNotification } from 'test/factories/makeNotification'
import { faker } from '@faker-js/faker'

let repository: InMemoryNotificationsRepository
let sut: FetchNotificationsByRecipientEmailUseCase

describe('Fetch notifications', () => {
  beforeEach(() => {
    repository = new InMemoryNotificationsRepository()
    sut = new FetchNotificationsByRecipientEmailUseCase(repository)
  })
  it('should be able to fetch notifications by recipientEmail', async () => {
    const recipientEmail = faker.internet.email()
    const notificationOnDatabase01 = makeNotification({
      recipientEmail,
    })

    const notificationOnDatabase02 = makeNotification({
      recipientEmail,
    })

    Promise.all([
      await repository.create(notificationOnDatabase01),
      await repository.create(notificationOnDatabase02),
    ])

    const { notifications } = await sut.execute({
      recipientEmail,
    })

    expect(notifications).toHaveLength(2)
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recipientEmail,
        }),
        expect.objectContaining({
          recipientEmail,
        }),
      ]),
    )
  })
})
