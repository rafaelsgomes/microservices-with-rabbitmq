import { Message, StatusType } from '@/domain/message/entities/message'
import {
  Prisma,
  Message as PrismaMessage,
  StatusType as PrismaStatusType,
} from '@prisma/client'

export class PrismaMessageMapper {
  static toDatabase(message: Message): Prisma.MessageUncheckedCreateInput {
    return {
      id: message.id,
      contactId: message.contactId,
      emailTemplateName: message.emailTemplateName,
      statusMessage: message.statusMessage,
      statusType: PrismaStatusType[message.statusType],
      type: message.type,
      createdAt: message.createdAt,
    }
  }

  static toDomain(raw: PrismaMessage): Message {
    return Message.create(
      {
        contactId: raw.contactId,
        emailTemplateName: raw.emailTemplateName,
        statusMessage: raw.statusMessage,
        statusType: StatusType[raw.statusType],
        type: raw.type,
        createdAt: raw.createdAt,
      },
      raw.id,
    )
  }
}
