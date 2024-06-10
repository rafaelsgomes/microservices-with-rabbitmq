import { Errors } from '@/core/errors/errors'

export class ContactNotFoundError extends Error implements Errors {
  constructor() {
    super('Contact not found.')
  }
}
