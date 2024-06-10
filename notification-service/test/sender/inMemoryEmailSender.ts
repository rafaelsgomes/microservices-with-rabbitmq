import { IEmailSender } from '@/domain/notification/application/sender/IEmailSender'

export class InMemoryEmailSender implements IEmailSender {
  async send(): Promise<{ status: string }> {
    return { status: 'sended' }
  }
}
