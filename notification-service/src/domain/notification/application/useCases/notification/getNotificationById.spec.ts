import { GetNotificationByIdUseCase } from './getNotificationById'
import { InMemoryNotificationsRepository } from 'test/repositories/inMemoryNotificationsRepository'
import { makeNotification } from 'test/factories/makeNotification'
import { NotificationNotFoundError } from '../_errors/notificationNotFoundError'

let repository: InMemoryNotificationsRepository
let sut: GetNotificationByIdUseCase

describe('Get notification', () => {
  beforeEach(() => {
    repository = new InMemoryNotificationsRepository()
    sut = new GetNotificationByIdUseCase(repository)
  })
  it('should be able to get a notification by id', async () => {
    const notificationOnDatabase = makeNotification()

    await repository.create(notificationOnDatabase)

    const { notification } = await sut.execute({
      notificationId: notificationOnDatabase.id,
    })

    expect(notification).toEqual(
      expect.objectContaining({
        id: notificationOnDatabase.id,
      }),
    )
  })
  it('should not be able to get a notification that does not exists', async () => {
    expect(() => {
      return sut.execute({
        notificationId: 'notificationId',
      })
    }).rejects.toBeInstanceOf(NotificationNotFoundError)
  })
})
