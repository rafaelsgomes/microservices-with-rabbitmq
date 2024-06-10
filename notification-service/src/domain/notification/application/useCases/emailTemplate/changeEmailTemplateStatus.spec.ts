import { InMemoryEmailTemplatesRepository } from 'test/repositories/inMemoryEmailTemplatesRepository'
import { ChangeEmailTemplateStatusUseCase } from './changeEmailTemplateStatus'
import { makeEmailTemplate } from 'test/factories/makeEmailTemplate'
import { Status } from '@/domain/notification/entities/emailTemplate'
import { TemplateNotFoundError } from '../_errors/templateNotFoundError'

let repository: InMemoryEmailTemplatesRepository
let sut: ChangeEmailTemplateStatusUseCase

describe('Change Email Template Status', () => {
  beforeEach(() => {
    repository = new InMemoryEmailTemplatesRepository()
    sut = new ChangeEmailTemplateStatusUseCase(repository)
  })
  it('should be able to change email template status to ACTIVATED', async () => {
    const emailTemplateOnDatabase = makeEmailTemplate({
      status: Status.DISABLED,
    })

    await repository.create(emailTemplateOnDatabase)

    const { emailTemplate } = await sut.execute({
      emailTemplateId: emailTemplateOnDatabase.id,
    })

    expect(emailTemplate).toEqual(
      expect.objectContaining({
        status: Status.ACTIVATED,
        updatedAt: expect.any(Date),
      }),
    )
  })
  it('should be able to change email template status to DISABLED', async () => {
    const emailTemplateOnDatabase = makeEmailTemplate({
      status: Status.ACTIVATED,
    })

    await repository.create(emailTemplateOnDatabase)

    const { emailTemplate } = await sut.execute({
      emailTemplateId: emailTemplateOnDatabase.id,
    })

    expect(emailTemplate).toEqual(
      expect.objectContaining({
        status: Status.DISABLED,
        updatedAt: expect.any(Date),
      }),
    )
  })
  it('should not be able to change status when email template that does not exists', async () => {
    expect(() => {
      return sut.execute({
        emailTemplateId: 'emailTemplateId',
      })
    }).rejects.toBeInstanceOf(TemplateNotFoundError)
  })
})
