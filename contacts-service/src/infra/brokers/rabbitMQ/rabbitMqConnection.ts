import { env } from '@/infra/env'
import { Channel, Connection, Message, connect } from 'amqplib'

interface publishInExchangeRequest {
  exchange: string
  routingKey: string
  message: string
}

interface consumeRequest {
  queue: string
  callback: (message: Message) => void
}

export default class RabbitMQConnection {
  private connection: Connection
  private consumerChannel: Channel
  private producerChannel: Channel

  async start(): Promise<void> {
    this.connection = await connect(env.RABBITMQ_ENDPOINT)
  }

  async consume({ callback, queue }: consumeRequest) {
    this.consumerChannel = await this.connection.createChannel()
    return this.consumerChannel.consume(
      queue,
      (message) => {
        if (message !== null) {
          console.log('Received:', message.content.toString())
          callback(message)
        } else {
          console.log('Consumer cancelled by server')
        }
      },
      {
        noAck: false,
      },
    )
  }

  async publishInExchange({
    exchange,
    message,
    routingKey,
  }: publishInExchangeRequest): Promise<boolean> {
    this.producerChannel = await this.connection.createChannel()
    return this.producerChannel.publish(
      exchange,
      routingKey,
      Buffer.from(message),
    )
  }

  async ackMessage(message: Message) {
    return this.consumerChannel.ack(message)
  }
}

export const rabbitMQConnection = new RabbitMQConnection()
