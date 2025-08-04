// mail.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor(private readonly configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,      // e.g., 'smtp.gmail.com'
            port: Number(process.env.SMTP_PORT),  // usually 587 or 465
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for others
            auth: {
                user: process.env.SMTP_USER,    // your SMTP username/email
                pass: process.env.SMTP_PASS,    // your SMTP password
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
            console.log(email);


            const mailOptions = {
                from:email,
                to:  `"YourAppName" <${this.configService.get('SMTP_USER')}>`,
                subject: 'Test Email',
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

            console.log(mailOptions);



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
