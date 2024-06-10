import {
  Message,
  MessageProps,
  StatusType,
} from '@/domain/message/entities/message'
import { PrismaMessageMapper } from '@/infra/database/mappers/prismaMessageMapper'
import { PrismaService } from '@/infra/database/prisma'
import { faker } from '@faker-js/faker'

export function makeMessage(override: Partial<MessageProps> = {}, id?: string) {
  const message = Message.create(
    {
      contactId: faker.string.uuid(),
      emailTemplateName: faker.word.words({ count: { max: 10, min: 1 } }),
      statusMessage: faker.word.words({ count: { max: 10, min: 1 } }),
      statusType: StatusType.PRODUCED,
      type: faker.word.words({ count: { max: 10, min: 1 } }),
      ...override,
    },
    id,
  )
  return message
}

export class MessageFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaMessage(data: Partial<MessageProps> = {}): Promise<Message> {
    const message = makeMessage(data)

    await this.prisma.message.create({
      data: PrismaMessageMapper.toDatabase(message),
    })

    return message
  }
}
