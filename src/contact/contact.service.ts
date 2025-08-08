import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Contact, ContactDocument } from './contact.schema';
import { Model } from 'mongoose';
import { MailService } from '../mailsender/mail.service';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
    private readonly mailService: MailService,
  ) {}
   async create(contactDto: any): Promise<Contact> {
    const newContact = new this.contactModel(contactDto);
    await newContact.save();

    // Send email to admin
    await this.mailService.sendMail(contactDto);

    return newContact;
  }
}
