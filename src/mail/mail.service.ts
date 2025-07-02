import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '../users/models/user.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(user: User) {
    const url = `${process.env.API_URL}:${process.env.PORT}/api/users/activate/${user.activation_link}`;

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Skill Academyga xush kelibsiz!',
        template: './confirm',
        context: {
          // first_name: user.first_name,
          // last_name: user.last_name,
          url,
        },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Email yuborishda xatolik!');
    }
  }
}
