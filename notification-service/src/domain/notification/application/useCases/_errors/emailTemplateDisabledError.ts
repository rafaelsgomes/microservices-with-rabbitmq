import { Errors } from '@/core/errors/errors'

export class EmailTemplateDisabledError extends Error implements Errors {
  constructor() {
    super('Email template disabled.')
  }
}
