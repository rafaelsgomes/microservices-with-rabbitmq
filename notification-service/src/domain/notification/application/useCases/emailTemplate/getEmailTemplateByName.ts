import { EmailTemplate } from '@/domain/notification/entities/emailTemplate'
import { IEmailTemplatesRepository } from '../../repositories/IEmailTemplatesRepository'
import { TemplateNotFoundError } from '../_errors/templateNotFoundError'

interface GetEmailTemplateByNameRequest {
  emailTemplateName: string
}

interface GetEmailTemplateByNameResponse {
  emailTemplate: EmailTemplate
}

export class GetEmailTemplateByNameUseCase {
  constructor(private emailTemplatesRepository: IEmailTemplatesRepository) {}

  async execute({
    emailTemplateName,
  }: GetEmailTemplateByNameRequest): Promise<GetEmailTemplateByNameResponse> {
    const emailTemplate =
      await this.emailTemplatesRepository.findByTemplateName(emailTemplateName)

    if (!emailTemplate) {
      throw new TemplateNotFoundError()
    }

    return {
      emailTemplate,
    }
  }
}
