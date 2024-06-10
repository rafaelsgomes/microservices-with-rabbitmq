import { InMemoryEmailTemplatesRepository } from 'test/repositories/inMemoryEmailTemplatesRepository'
import { UpdateEmailTemplateUseCase } from './updateEmailTemplate'
import { makeEmailTemplate } from 'test/factories/makeEmailTemplate'
import { TemplateNotFoundError } from '../_errors/templateNotFoundError'

let repository: InMemoryEmailTemplatesRepository
let sut: UpdateEmailTemplateUseCase

describe('Update Email Template', () => {
  beforeEach(() => {
    repository = new InMemoryEmailTemplatesRepository()
    sut = new UpdateEmailTemplateUseCase(repository)
  })
  it('should be able to update emailName from email template', async () => {
    const emailTemplateOnDatabase = makeEmailTemplate({
      emailName: 'Test-01',
    })

    await repository.create(emailTemplateOnDatabase)

    const { emailTemplate } = await sut.execute({
      emailTemplateId: emailTemplateOnDatabase.id,
      emailName: 'Test-01-updated',
    })

    expect(emailTemplate).toEqual(
      expect.objectContaining({
        emailName: 'Test-01-updated',
        updatedAt: expect.any(Date),
      }),
    )
  })
  it('should be able to update content from email template', async () => {
    const emailTemplateOnDatabase = makeEmailTemplate({
      content: 'Test-01',
    })

    await repository.create(emailTemplateOnDatabase)

    const { emailTemplate } = await sut.execute({
      emailTemplateId: emailTemplateOnDatabase.id,
      content: 'Test-01-updated',
    })

    expect(emailTemplate).toEqual(
      expect.objectContaining({
        content: 'Test-01-updated',
        updatedAt: expect.any(Date),
      }),
    )
  })
  it('should be able to update subject from email template', async () => {
    const emailTemplateOnDatabase = makeEmailTemplate({
      subject: 'Test-01',
    })

    await repository.create(emailTemplateOnDatabase)

    const { emailTemplate } = await sut.execute({
      emailTemplateId: emailTemplateOnDatabase.id,
      subject: 'Test-01-updated',
    })

    expect(emailTemplate).toEqual(
      expect.objectContaining({
        subject: 'Test-01-updated',
        updatedAt: expect.any(Date),
      }),
    )
  })
  it('should not be able to update email template that does not exists', async () => {
    expect(() => {
      return sut.execute({
        emailTemplateId: 'emailTemplateId',
        emailName: 'Test-01',
      })
    }).rejects.toBeInstanceOf(TemplateNotFoundError)
  })
})
