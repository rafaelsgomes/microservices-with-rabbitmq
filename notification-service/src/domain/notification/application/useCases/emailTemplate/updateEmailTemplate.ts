import { EmailTemplate } from '@/domain/notification/entities/emailTemplate'
import { IEmailTemplatesRepository } from '../../repositories/IEmailTemplatesRepository'
import { TemplateAlreadyExistsError } from '../_errors/templateAlreadyExistsError'
import { TemplateNotFoundError } from '../_errors/templateNotFoundError'
import { InformationNotProvidedError } from '../_errors/informationNotProvidedError'

interface UpdateEmailTemplateRequest {
  emailTemplateId: string
  content?: string
  subject?: string
  emailName?: string
}

interface UpdateEmailTemplateResponse {
  emailTemplate: EmailTemplate
}

export class UpdateEmailTemplateUseCase {
  constructor(private emailTemplatesRepository: IEmailTemplatesRepository) {}

  async execute({
    emailTemplateId,
    content,
    emailName,
    subject,
  }: UpdateEmailTemplateRequest): Promise<UpdateEmailTemplateResponse> {
    if (!content && !emailName && !subject) {
      throw new InformationNotProvidedError()
    }

    const emailTemplate =
      await this.emailTemplatesRepository.findById(emailTemplateId)

    if (!emailTemplate) {
      throw new TemplateNotFoundError()
    }

    if (emailName && emailName !== emailTemplate.emailName) {
      const templateAlreadyExists =
        await this.emailTemplatesRepository.findByTemplateName(emailName)

      if (templateAlreadyExists) {
        throw new TemplateAlreadyExistsError()
      }
      emailTemplate.emailName = emailName
    }

    if (content && content !== emailTemplate.content)
      emailTemplate.content = content

    if (subject && subject !== emailTemplate.subject)
      emailTemplate.subject = subject

    await this.emailTemplatesRepository.save(emailTemplate)

    return {
      emailTemplate,
    }
  }
}
