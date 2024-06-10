import { Errors } from '@/core/errors/errors'

export class TemplateNotFoundError extends Error implements Errors {
  constructor() {
    super('Email template not found')
  }
}
