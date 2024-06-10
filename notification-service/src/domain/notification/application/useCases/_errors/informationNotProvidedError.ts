import { Errors } from '@/core/errors/errors'

export class InformationNotProvidedError extends Error implements Errors {
  constructor() {
    super('Information not provided.')
  }
}
