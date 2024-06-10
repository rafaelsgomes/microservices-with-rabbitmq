import { Optional } from '@/core/types/optional'
import { Entity } from '@/core/entities/entity'

export enum StatusType {
  PRODUCED = 'PRODUCED',
  ERROR = 'ERROR',
  NOT_ABLE = 'NOT_ABLE',
}

export interface MessageProps {
  contactId: string
  emailTemplateName: string
  type: string
  statusMessage: string
  statusType: StatusType
  createdAt: Date
}

export class Message extends Entity<MessageProps> {
  get contactId() {
    return this.props.contactId
  }

  get emailTemplateName() {
    return this.props.emailTemplateName
  }

  get type() {
    return this.props.type
  }

  get statusMessage() {
    return this.props.statusMessage
  }

  get statusType() {
    return this.props.statusType
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: Optional<MessageProps, 'createdAt'>, id?: string) {
    const message = new Message(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return message
  }
}
