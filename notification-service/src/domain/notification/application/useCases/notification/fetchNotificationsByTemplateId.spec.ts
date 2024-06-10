import { FetchNotificationsByTemplateIdUseCase } from './fetchNotificationsByTemplateId'
import { InMemoryNotificationsRepository } from 'test/repositories/inMemoryNotificationsRepository'
import { makeNotification } from 'test/factories/makeNotification'
import { faker } from '@faker-js/faker'

let repository: InMemoryNotificationsRepository
let sut: FetchNotificationsByTemplateIdUseCase

describe('Fetch notifications', () => {
  beforeEach(() => {
    repository = new InMemoryNotificationsRepository()
    sut = new FetchNotificationsByTemplateIdUseCase(repository)
  })
  it('should be able to fetch notifications by templateId', async () => {
    const templateId = faker.string.uuid()
    const notificationOnDatabase01 = makeNotification({
      emailTemplateId: templateId,
    })

    const notificationOnDatabase02 = makeNotification({
      emailTemplateId: templateId,
    })

    Promise.all([
      await repository.create(notificationOnDatabase01),
      await repository.create(notificationOnDatabase02),
    ])

    const { notifications } = await sut.execute({
      templateId,
    })

    expect(notifications).toHaveLength(2)
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          emailTemplateId: templateId,
        }),
        expect.objectContaining({
          emailTemplateId: templateId,
        }),
      ]),
    )
  })
})
