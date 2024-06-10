import { Contact, ContactProps } from '@/domain/contact/entities/contact'
import { PrismaContactMapper } from '@/infra/database/mappers/prismaContactMapper'
import { PrismaService } from '@/infra/database/prisma'
import { faker } from '@faker-js/faker'

export function makeContact(override: Partial<ContactProps> = {}, id?: string) {
  const contact = Contact.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email({
        allowSpecialCharacters: false,
      }),
      tags: ['test'],
      isAbleToReceiveMessage: true,
      ...override,
    },
    id,
  )
  return contact
}

export class ContactFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaContact(data: Partial<ContactProps> = {}): Promise<Contact> {
    const contact = makeContact(data)

    await this.prisma.contact.create({
      data: PrismaContactMapper.toDatabase(contact),
    })

    return contact
  }
}
