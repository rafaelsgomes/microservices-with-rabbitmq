import {
  EmailTemplate,
  Status,
} from '@/domain/notification/entities/emailTemplate'
import { IEmailTemplatesRepository } from '../../repositories/IEmailTemplatesRepository'
import { TemplateAlreadyExistsError } from '../_errors/templateAlreadyExistsError'

interface CreateEmailTemplateRequest {
  content: string
  subject: string
  emailName: string
  status?: string
}

interface CreateEmailTemplateResponse {
  emailTemplate: EmailTemplate
}

export class CreateEmailTemplateUseCase {
  constructor(private emailTemplatesRepository: IEmailTemplatesRepository) {}

  async execute({
    content,
    emailName,
    status,
    subject,
  }: CreateEmailTemplateRequest): Promise<CreateEmailTemplateResponse> {
    const templateAlreadyExists =
      await this.emailTemplatesRepository.findByTemplateName(emailName)

    if (templateAlreadyExists) {
      throw new TemplateAlreadyExistsError()
    }

    const emailTemplate = EmailTemplate.create({
      content,
      emailName,
      status: status ? Status[status] : Status.ACTIVATED,
      subject,
    })

    await this.emailTemplatesRepository.create(emailTemplate)

    return {
      emailTemplate,
    }
  }
}
