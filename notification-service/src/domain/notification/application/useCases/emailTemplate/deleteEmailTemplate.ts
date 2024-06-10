import { IEmailTemplatesRepository } from '../../repositories/IEmailTemplatesRepository'
import { TemplateNotFoundError } from '../_errors/templateNotFoundError'

interface DeleteEmailTemplateRequest {
  emailTemplateId: string
}

interface DeleteEmailTemplateResponse {}

export class DeleteEmailTemplateUseCase {
  constructor(private emailTemplatesRepository: IEmailTemplatesRepository) {}

  async execute({
    emailTemplateId,
  }: DeleteEmailTemplateRequest): Promise<DeleteEmailTemplateResponse> {
    const emailTemplate =
      await this.emailTemplatesRepository.findById(emailTemplateId)

    if (!emailTemplate) {
      throw new TemplateNotFoundError()
    }

    await this.emailTemplatesRepository.delete(emailTemplateId)

    return {}
  }
}
