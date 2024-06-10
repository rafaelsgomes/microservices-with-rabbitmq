import { Optional } from '@/core/types/optional'
import { Entity } from '@/core/entities/entity'

export interface ContactProps {
  name: string
  email: string
  tags: string[]
  isAbleToReceiveMessage: boolean
  createdAt: Date
  updatedAt?: Date | null
}

export class Contact extends Entity<ContactProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get tags() {
    return this.props.tags
  }

  addNewTags(tags: string[]) {
    tags.map((tag) => this.props.tags.push(tag))
    this.touch()
  }

  set tags(tags: string[]) {
    this.props.tags = tags
    this.touch()
  }

  get isAbleToReceiveMessage() {
    return this.props.isAbleToReceiveMessage
  }

  isAbleToReceiveMessageToggle() {
    switch (this.props.isAbleToReceiveMessage) {
      case true:
        this.props.isAbleToReceiveMessage = false
        break
      case false:
        this.props.isAbleToReceiveMessage = true
        break
      default:
        this.props.isAbleToReceiveMessage = true
    }
    this.touch()
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
    props: Optional<ContactProps, 'createdAt' | 'isAbleToReceiveMessage'>,
    id?: string,
  ) {
    const contact = new Contact(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        isAbleToReceiveMessage: props.isAbleToReceiveMessage ?? true,
      },
      id,
    )

    return contact
  }
}
