import {
  EmailTemplate,
  Status,
} from '@/domain/notification/entities/emailTemplate'
import { MongoEmailTemplateSchema } from '../schemas/interfaces/mongoEmailTemplateInterface'

export class MongoEmailTemplateMapper {
  static toDatabase(emailTemplate: EmailTemplate): MongoEmailTemplateSchema {
    return {
      _id: emailTemplate.id,
      content: emailTemplate.content,
      subject: emailTemplate.subject,
      emailName: emailTemplate.emailName,
      status: emailTemplate.status,
      createdAt: emailTemplate.createdAt,
      updatedAt: emailTemplate.updatedAt ?? undefined,
      lastUsedAt: emailTemplate.lastUsedAt ?? undefined,
    }
  }

  static toDomain(raw: MongoEmailTemplateSchema): EmailTemplate {
    return EmailTemplate.create(
      {
        content: raw.content,
        emailName: raw.emailName,
        status: Status[raw.status],
        subject: raw.subject,
        createdAt: raw.createdAt,
        lastUsedAt: raw.lastUsedAt,
        updatedAt: raw.updatedAt,
      },
      raw._id,
    )
  }
}
