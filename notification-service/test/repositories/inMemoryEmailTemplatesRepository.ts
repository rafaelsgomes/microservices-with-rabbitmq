import { IEmailTemplatesRepository } from '@/domain/notification/application/repositories/IEmailTemplatesRepository'
import { EmailTemplate } from '@/domain/notification/entities/emailTemplate'

export class InMemoryEmailTemplatesRepository
  implements IEmailTemplatesRepository
{
  public items: EmailTemplate[] = []

  async create(template: EmailTemplate): Promise<void> {
    this.items.push(template)
  }

  async findById(id: string): Promise<EmailTemplate | null> {
    const template = this.items.find((item) => item.id === id)

    if (!template) {
      return null
    }

    return template
  }

  async findByTemplateName(name: string): Promise<EmailTemplate | null> {
    const template = this.items.find((item) => item.emailName === name)

    if (!template) {
      return null
    }

    return template
  }

  async save(template: EmailTemplate): Promise<void> {
    const templateIndex = this.items.findIndex(
      (item) => item.id === template.id,
    )

    this.items[templateIndex] = template
  }

  async delete(id: string): Promise<void> {
    const templateIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(templateIndex, 1)
  }
}
