import { InMemoryEmailTemplatesRepository } from 'test/repositories/inMemoryEmailTemplatesRepository'
import { DeleteEmailTemplateUseCase } from './deleteEmailTemplate'
import { makeEmailTemplate } from 'test/factories/makeEmailTemplate'
import { TemplateNotFoundError } from '../_errors/templateNotFoundError'

let repository: InMemoryEmailTemplatesRepository
let sut: DeleteEmailTemplateUseCase

describe('Delete Email Template', () => {
  beforeEach(() => {
    repository = new InMemoryEmailTemplatesRepository()
    sut = new DeleteEmailTemplateUseCase(repository)
  })
  it('should be able to delete a email template by id', async () => {
    const emailTemplateOnDatabase = makeEmailTemplate()

    await repository.create(emailTemplateOnDatabase)

    await sut.execute({
      emailTemplateId: emailTemplateOnDatabase.id,
    })

    expect(repository.items.length).toEqual(0)
  })
  it('should not be able to delete a email template that does not exists', async () => {
    expect(() => {
      return sut.execute({
        emailTemplateId: 'emailTemplateId',
      })
    }).rejects.toBeInstanceOf(TemplateNotFoundError)
  })
})
