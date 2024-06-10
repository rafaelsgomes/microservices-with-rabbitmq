import { InMemoryEmailTemplatesRepository } from 'test/repositories/inMemoryEmailTemplatesRepository'
import { GetEmailTemplateByNameUseCase } from './getEmailTemplateByName'
import { makeEmailTemplate } from 'test/factories/makeEmailTemplate'
import { TemplateNotFoundError } from '../_errors/templateNotFoundError'

let repository: InMemoryEmailTemplatesRepository
let sut: GetEmailTemplateByNameUseCase

describe('Get Email Template', () => {
  beforeEach(() => {
    repository = new InMemoryEmailTemplatesRepository()
    sut = new GetEmailTemplateByNameUseCase(repository)
  })
  it('should be able to get a email template by Name', async () => {
    const emailTemplateOnDatabase = makeEmailTemplate()

    await repository.create(emailTemplateOnDatabase)

    const { emailTemplate } = await sut.execute({
      emailTemplateName: emailTemplateOnDatabase.emailName,
    })

    expect(emailTemplate.emailName).toEqual(emailTemplateOnDatabase.emailName)
  })
  it('should not be able to get a email template that does not exists', async () => {
    expect(() => {
      return sut.execute({
        emailTemplateName: 'emailTemplateName',
      })
    }).rejects.toBeInstanceOf(TemplateNotFoundError)
  })
})
