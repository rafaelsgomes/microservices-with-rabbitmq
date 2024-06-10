import { IMessagesRepository } from '@/domain/message/application/repositories/IMessagesRepository'
import { Message, StatusType } from '@/domain/message/entities/message'
import { PrismaService } from '../prisma'
import { PrismaMessageMapper } from '../mappers/prismaMessageMapper'

export class PrismaMessagesRepository implements IMessagesRepository {
  constructor(private prisma: PrismaService) {}
  async create(message: Message): Promise<void> {
    await this.prisma.message.create({
      data: PrismaMessageMapper.toDatabase(message),
    })
  }

  async findById(id: string): Promise<Message | null> {
    const message = await this.prisma.message.findUnique({
      where: {
        id,
      },
    })
    if (!message) {
      return null
    }

    return PrismaMessageMapper.toDomain(message)
  }

  async findManyByContactId(contactId: string): Promise<Message[]> {
    const messages = await this.prisma.message.findMany({
      where: {
        contactId,
      },
    })

    return messages.map(PrismaMessageMapper.toDomain)
  }

  async findManyByEmailTemplateName(
    emailTemplateName: string,
  ): Promise<Message[]> {
    const messages = await this.prisma.message.findMany({
      where: {
        emailTemplateName,
      },
    })

    return messages.map(PrismaMessageMapper.toDomain)
  }

  async findManyByStatusType(statusType: StatusType): Promise<Message[]> {
    const messages = await this.prisma.message.findMany({
      where: {
        statusType,
      },
    })

    return messages.map(PrismaMessageMapper.toDomain)
  }
}
