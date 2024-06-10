import { Errors } from '@/core/errors/errors'

export class TemplateAlreadyExistsError extends Error implements Errors {
  constructor() {
    super('Email template name already exists')
  }
}
