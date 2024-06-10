import { EmailTemplate } from '@/domain/notification/entities/emailTemplate'
import { IEmailTemplatesRepository } from '../../repositories/IEmailTemplatesRepository'
import { TemplateNotFoundError } from '../_errors/templateNotFoundError'

interface GetEmailTemplateByIdRequest {
  emailTemplateId: string
}

interface GetEmailTemplateByIdResponse {
  emailTemplate: EmailTemplate
}

export class GetEmailTemplateByIdUseCase {
  constructor(private emailTemplatesRepository: IEmailTemplatesRepository) {}

  async execute({
    emailTemplateId,
  }: GetEmailTemplateByIdRequest): Promise<GetEmailTemplateByIdResponse> {
    const emailTemplate =
      await this.emailTemplatesRepository.findById(emailTemplateId)

    if (!emailTemplate) {
      throw new TemplateNotFoundError()
    }

    return {
      emailTemplate,
    }
  }
}
