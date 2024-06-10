import { Errors } from '@/core/errors/errors'

export class MessageNotFoundError extends Error implements Errors {
  constructor() {
    super('Message not found.')
  }
}
