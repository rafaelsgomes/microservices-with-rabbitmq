import { EmailTemplate } from '../../entities/emailTemplate'

export interface IEmailTemplatesRepository {
  create(template: EmailTemplate): Promise<void>
  findById(id: string): Promise<EmailTemplate | null>
  findByTemplateName(name: string): Promise<EmailTemplate | null>
  save(template: EmailTemplate): Promise<void>
  delete(id: string): Promise<void>
}
