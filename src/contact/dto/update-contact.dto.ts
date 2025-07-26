import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-contact.dto';

export class UpdateContactDto extends PartialType(CreateContactDto) {

    FirstName: string;

    LastName: string;

    email: string;

    phone: string;

    service: string;

    message: string;
}
