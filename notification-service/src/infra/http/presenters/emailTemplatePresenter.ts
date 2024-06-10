import { EmailTemplate } from '@/domain/notification/entities/emailTemplate'

export class EmailTemplatePresenter {
  static toHttp(template: EmailTemplate) {
    return {
      id: template.id,
      content: template.content,
      emailName: template.emailName,
      subject: template.subject,
      status: template.status,
      created_at: template.createdAt,
      updated_at: template.updatedAt ?? undefined,
      lastUsed_at: template.lastUsedAt ?? undefined,
    }
  }
}
