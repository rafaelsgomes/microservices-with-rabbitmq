import { EmailTemplate } from '@/domain/notification/entities/emailTemplate'
import { IEmailTemplatesRepository } from '../../repositories/IEmailTemplatesRepository'
import { TemplateNotFoundError } from '../_errors/templateNotFoundError'

interface ChangeEmailTemplateStatusRequest {
  emailTemplateId: string
}

interface ChangeEmailTemplateStatusResponse {
  emailTemplate: EmailTemplate
}

export class ChangeEmailTemplateStatusUseCase {
  constructor(private emailTemplatesRepository: IEmailTemplatesRepository) {}

  async execute({
    emailTemplateId,
  }: ChangeEmailTemplateStatusRequest): Promise<ChangeEmailTemplateStatusResponse> {
    const emailTemplate =
      await this.emailTemplatesRepository.findById(emailTemplateId)

    if (!emailTemplate) {
      throw new TemplateNotFoundError()
    }

    emailTemplate.changeStatus()

    await this.emailTemplatesRepository.save(emailTemplate)

    return {
      emailTemplate,
    }
  }
}
