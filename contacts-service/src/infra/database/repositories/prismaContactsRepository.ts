import { IContactsRepository } from '@/domain/contact/application/repositories/IContactsRepository'
import { Contact } from '@/domain/contact/entities/contact'
import { PrismaService } from '../prisma'
import { PrismaContactMapper } from '../mappers/prismaContactMapper'

export class PrismaContactsRepository implements IContactsRepository {
  constructor(private prisma: PrismaService) {}
  async create(contact: Contact): Promise<void> {
    await this.prisma.contact.create({
      data: PrismaContactMapper.toDatabase(contact),
    })
  }

  async createMany(contacts: Contact[]): Promise<void> {
    await this.prisma.contact.createMany({
      data: contacts.map(PrismaContactMapper.toDatabase),
    })
  }

  async findByEmail(email: string): Promise<Contact | null> {
    const contact = await this.prisma.contact.findUnique({
      where: {
        email,
      },
    })
    if (!contact) {
      return null
    }

    return PrismaContactMapper.toDomain(contact)
  }

  async findManyByEmails(emails: string[]): Promise<Contact[]> {
    const contacts = await this.prisma.contact.findMany({
      where: {
        email: {
          in: emails,
        },
      },
    })

    return contacts.map(PrismaContactMapper.toDomain)
  }

  async findById(id: string): Promise<Contact | null> {
    const contact = await this.prisma.contact.findUnique({
      where: {
        id,
      },
    })
    if (!contact) {
      return null
    }

    return PrismaContactMapper.toDomain(contact)
  }

  async findManyByTags(tags: string[]): Promise<Contact[]> {
    const contacts = await this.prisma.contact.findMany({
      where: {
        tags: {
          hasSome: tags,
        },
      },
    })

    return contacts.map(PrismaContactMapper.toDomain)
  }

  async save(contact: Contact): Promise<void> {
    await this.prisma.contact.update({
      where: {
        id: contact.id,
      },
      data: PrismaContactMapper.toDatabase(contact),
    })
  }

  async saveMany(contacts: Contact[]): Promise<void> {
    await this.prisma.contact.updateMany({
      where: {
        id: {
          in: contacts.map((item) => item.id),
        },
      },
      data: contacts.map(PrismaContactMapper.toDatabase),
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.contact.delete({ where: { id } })
  }
}
