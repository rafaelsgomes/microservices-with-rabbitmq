import { Entity } from './entity'
import { Optional } from '@/core/types/optional'

export interface NotificationProps {
  recipientId: string
  recipientName: string
  recipientEmail: string
  sender: string
  emailTemplateId: string
  status: string
  type: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Notification extends Entity<NotificationProps> {
  get recipientId() {
    return this.props.recipientId
  }

  get recipientName() {
    return this.props.recipientName
  }

  get recipientEmail() {
    return this.props.recipientEmail
  }

  get sender() {
    return this.props.sender
  }

  get emailTemplateId() {
    return this.props.emailTemplateId
  }

  get status() {
    return this.props.status
  }

  set status(status: string) {
    this.props.status = status
    this.touch()
  }

  get type() {
    return this.props.type
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<NotificationProps, 'createdAt' | 'status'>,
    id?: string,
  ) {
    const notification = new Notification(
      {
        ...props,
        status: props.status ?? 'created',
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return notification
  }
}
