import { InMemoryEmailTemplatesRepository } from 'test/repositories/inMemoryEmailTemplatesRepository'
import { CreateEmailTemplateUseCase } from './createEmailTemplate'
import { makeEmailTemplate } from 'test/factories/makeEmailTemplate'
import { TemplateAlreadyExistsError } from '../_errors/templateAlreadyExistsError'

let repository: InMemoryEmailTemplatesRepository
let sut: CreateEmailTemplateUseCase

describe('Create Email Template', () => {
  beforeEach(() => {
    repository = new InMemoryEmailTemplatesRepository()
    sut = new CreateEmailTemplateUseCase(repository)
  })
  it('should be able to create a new email template', async () => {
    const { emailTemplate } = await sut.execute({
      content: '<% if (user) { %><h2><%= user.name %></h2><% } %>',
      subject: 'Test',
      emailName: 'New Template Name',
      status: 'DISABLED',
    })

    expect(emailTemplate).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        emailName: 'New Template Name',
      }),
    )
    expect(repository.items.length).toEqual(1)
  })
  it('should not be able to create a new email template if name already exists', async () => {
    const emailTemplate = makeEmailTemplate({
      emailName: 'New Template Name',
    })

    await repository.create(emailTemplate)

    expect(() => {
      return sut.execute({
        content: '<% if (user) { %><h2><%= user.name %></h2><% } %>',
        subject: 'Test',
        emailName: 'New Template Name',
        status: 'DISABLED',
      })
    }).rejects.toBeInstanceOf(TemplateAlreadyExistsError)
  })
})
