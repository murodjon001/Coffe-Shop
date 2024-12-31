import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventName } from 'src/shared/enum/event-names';
import { SendPasswordEvent } from '../events/send-password.event';

@Injectable()
export class SendPasswordListener {
  private readonly logger = new Logger(SendPasswordListener.name);

  constructor(private readonly mailerService: MailerService) {}

  @OnEvent(EventName.SEND_PASSWORD)
  async handle(event: SendPasswordEvent) {
    try {
      console.log(event);

      await this.mailerService.sendMail({
        to: event.email,
        subject: 'Your password',
        text: `Your password is ${event.password}.`,
      });
    } catch (err) {
      this.logger.error(err);
    }
  }
}
