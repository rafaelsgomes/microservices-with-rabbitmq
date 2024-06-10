import {
  EmailTemplate,
  EmailTemplateProps,
  Status,
} from '@/domain/notification/entities/emailTemplate'
import { faker } from '@faker-js/faker'
import { EmailTemplateModel as Model } from '@/infra/database/models/emailTemplateModel'
import { MongoEmailTemplateMapper } from '@/infra/database/mappers/mongoEmailTemplateMapper'

export function makeEmailTemplate(
  override: Partial<EmailTemplateProps> = {},
  id?: string,
) {
  const emailTemplate = EmailTemplate.create(
    {
      content: '<% if (user) { %><h2><%= user.name %></h2><% } %>',
      subject: faker.lorem.words({
        min: 2,
        max: 10,
      }),
      emailName: faker.lorem.words({
        min: 2,
        max: 5,
      }),
      status: Status.ACTIVATED,
      ...override,
    },
    id,
  )
  return emailTemplate
}

export class EmailTemplateFactory {
  async makeMongoEmailTemplate(
    data: Partial<EmailTemplateProps> = {},
  ): Promise<EmailTemplate> {
    const template = makeEmailTemplate(data)

    await Model.create(MongoEmailTemplateMapper.toDatabase(template))

    return template
  }
}
