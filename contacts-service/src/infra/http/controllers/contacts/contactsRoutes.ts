import { FastifyInstance } from 'fastify'
import { CreateContactController } from './createContactController'
import { CreateManyContactsController } from './createManyContactsController'
import { DeleteContactController } from './deleteContactController'
import { FetchContactsByTagsController } from './fetchContactsByTagsController'
import { GetContactByEmailController } from './getContactByEmailController'
import { GetContactByIdController } from './getContactByIdController'
import { UpdateContactTagsController } from './updateContactTagsController'

export async function contactsRoutes(app: FastifyInstance) {
  app.register(CreateContactController)
  app.register(CreateManyContactsController)
  app.register(DeleteContactController)
  app.register(FetchContactsByTagsController)
  app.register(GetContactByEmailController)
  app.register(GetContactByIdController)
  app.register(UpdateContactTagsController)
}
