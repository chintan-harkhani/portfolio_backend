// mail.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor(private readonly configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            service: 'gmail', // using Gmail service
            auth: {
                user: this.configService.get<string>('EMAIL_USER'),
                pass: this.configService.get<string>('EMAIL_PASS'),
            },
        });
    }

    async sendMail(contactData: {
        FirstName: string;
        LastName: string;
        email: string;
        phone: string;
        service: string;
        message: string;
    }) {
        try {

            const { FirstName, LastName, email, phone, service, message } = contactData;

            const mailOptions = {
                from: email,
                to: `"mail" <${this.configService.get('EMAIL_USER')}>`,
                subject: 'new user contact',
                html: `
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> ${FirstName} ${LastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
            };

            return this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Mail send error:', error);
            return false;
        }
    }
    //   private transporter = nodemailer.createTransport({
    //     service: 'gmail', // or use host, port, secure, etc.
    //     auth: {
    //       user: 'harkhanichintan943@gmail.com',
    //       pass: 'ohwm qwaq anut edmb', // NOT your Gmail password
    //     },
    //   });

    //   async sendContactEmail(contactData: {
    //     FirstName: string;
    //     LastName: string;
    //     email: string;
    //     phone: string;
    //     service: string;
    //     message: string;
    //   }) {
    //     const { FirstName, LastName, email, phone, service, message } = contactData;

    //     const mailOptions = {
    //       from: email,
    //       to: ',
    //       subject: 'New Contact Form Submission',
    //       html: `
    //         <h3>New Contact Message</h3>
    //         <p><strong>Name:</strong> ${FirstName} ${LastName}</p>
    //         <p><strong>Email:</strong> ${email}</p>
    //         <p><strong>Phone:</strong> ${phone}</p>
    //         <p><strong>Service:</strong> ${service}</p>
    //         <p><strong>Message:</strong></p>
    //         <p>${message}</p>
    //       `,
    //     };

    //     return this.transporter.sendMail(mailOptions);
    //   }
}
