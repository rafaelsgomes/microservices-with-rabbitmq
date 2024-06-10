import { Contact } from '@/domain/contact/entities/contact'
import { Prisma, Contact as PrismaContact } from '@prisma/client'

export class PrismaContactMapper {
  static toDatabase(contact: Contact): Prisma.ContactUncheckedCreateInput {
    return {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      tags: contact.tags,
      isAbleToReceiveMessage: contact.isAbleToReceiveMessage ?? true,
      createdAt: contact.createdAt,
      updatedAt: contact.updatedAt ?? null,
    }
  }

  static toDomain(raw: PrismaContact): Contact {
    return Contact.create(
      {
        email: raw.email,
        name: raw.name,
        tags: raw.tags,
        createdAt: raw.createdAt,
        isAbleToReceiveMessage: raw.isAbleToReceiveMessage ?? true,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    )
  }
}
