import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventName } from 'src/shared/enum/event-names';
import { SendOtpEvent } from '../events/send-otp.event';
import { CustomHttpException } from 'src/infrastructure/errors/custom-http-exception';
import { SystemError } from 'src/shared/system-error.enum';

@Injectable()
export class SendOptListener {
  private readonly logger = new Logger(SendOptListener.name);

  constructor(private readonly mailerService: MailerService) {}

  @OnEvent(EventName.SEND_OTP)
  async handle(event: SendOtpEvent) {
    try {
      await this.mailerService.sendMail({
        to: event.email,
        subject: 'Your one time password',
        text: `Your  one time password is ${event.otp}. This password is valid for 1 minute`,
      });
    } catch (err) {
      this.logger.error(err);

      throw new CustomHttpException(
        'SendOptListener',
        SystemError.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }
}
