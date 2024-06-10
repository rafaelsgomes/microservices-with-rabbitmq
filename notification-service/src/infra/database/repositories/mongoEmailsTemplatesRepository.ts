import { IEmailTemplatesRepository } from '@/domain/notification/application/repositories/IEmailTemplatesRepository'
import { EmailTemplate } from '@/domain/notification/entities/emailTemplate'
import { MongoEmailTemplateMapper } from '../mappers/mongoEmailTemplateMapper'
import { EmailTemplateModel as Model } from '../models/emailTemplateModel'

export class MongoEmailsTemplatesRepository
  implements IEmailTemplatesRepository
{
  async create(template: EmailTemplate): Promise<void> {
    await Model.create(MongoEmailTemplateMapper.toDatabase(template))
  }

  async findById(id: string): Promise<EmailTemplate | null> {
    const template = await Model.findById(id)

    if (!template) {
      return null
    }

    return MongoEmailTemplateMapper.toDomain(template)
  }

  async findByTemplateName(name: string): Promise<EmailTemplate | null> {
    const template = await Model.findOne({
      emailName: name,
    })

    if (!template) {
      return null
    }

    return MongoEmailTemplateMapper.toDomain(template)
  }

  async save(template: EmailTemplate): Promise<void> {
    await Model.updateOne({
      _id: template.id,
      $set: MongoEmailTemplateMapper.toDatabase(template),
    })
  }

  async delete(id: string): Promise<void> {
    await Model.deleteOne({
      _id: id,
    })
  }
}
