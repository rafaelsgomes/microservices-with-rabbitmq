import { Entity } from './entity'
import { Optional } from '@/core/types/optional'

export enum Status {
  ACTIVATED = 'ACTIVATED',
  DISABLED = 'DISABLED',
}

export interface EmailTemplateProps {
  content: string
  subject: string
  emailName: string
  status: Status
  createdAt: Date
  updatedAt?: Date | null
  lastUsedAt?: Date | null
}

export class EmailTemplate extends Entity<EmailTemplateProps> {
  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get subject() {
    return this.props.subject
  }

  set subject(subject: string) {
    this.props.subject = subject
    this.touch()
  }

  get emailName() {
    return this.props.emailName
  }

  set emailName(emailName: string) {
    this.props.emailName = emailName
    this.touch()
  }

  get status() {
    return this.props.status
  }

  changeStatus() {
    switch (this.props.status) {
      case Status.ACTIVATED:
        this.props.status = Status.DISABLED
        break
      case Status.DISABLED:
        this.props.status = Status.ACTIVATED
        break
      default:
        this.props.status = Status.ACTIVATED
    }
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get lastUsedAt() {
    return this.props.lastUsedAt
  }

  use() {
    this.props.lastUsedAt = new Date()
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<EmailTemplateProps, 'createdAt'>, id?: string) {
    const emailTemplate = new EmailTemplate(
      {
        ...props,
        status: props.status ?? Status.ACTIVATED,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return emailTemplate
  }
}
