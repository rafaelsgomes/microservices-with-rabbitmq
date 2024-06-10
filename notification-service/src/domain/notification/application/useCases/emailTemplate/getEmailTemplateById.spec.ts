import { InMemoryEmailTemplatesRepository } from 'test/repositories/inMemoryEmailTemplatesRepository'
import { GetEmailTemplateByIdUseCase } from './getEmailTemplateById'
import { makeEmailTemplate } from 'test/factories/makeEmailTemplate'
import { TemplateNotFoundError } from '../_errors/templateNotFoundError'

let repository: InMemoryEmailTemplatesRepository
let sut: GetEmailTemplateByIdUseCase

describe('Get Email Template', () => {
  beforeEach(() => {
    repository = new InMemoryEmailTemplatesRepository()
    sut = new GetEmailTemplateByIdUseCase(repository)
  })
  it('should be able to get a email template by id', async () => {
    const emailTemplateOnDatabase = makeEmailTemplate()

    await repository.create(emailTemplateOnDatabase)

    const { emailTemplate } = await sut.execute({
      emailTemplateId: emailTemplateOnDatabase.id,
    })

    expect(emailTemplate.id).toEqual(emailTemplateOnDatabase.id)
  })
  it('should not be able to get a email template that does not exists', async () => {
    expect(() => {
      return sut.execute({
        emailTemplateId: 'emailTemplateId',
      })
    }).rejects.toBeInstanceOf(TemplateNotFoundError)
  })
})
