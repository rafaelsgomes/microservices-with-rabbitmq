import { Errors } from '@/core/errors/errors'

export class NotificationNotFoundError extends Error implements Errors {
  constructor() {
    super('Email notification not found')
  }
}
