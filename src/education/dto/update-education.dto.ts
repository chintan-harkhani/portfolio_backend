import { PartialType } from '@nestjs/mapped-types';
import { CreateEducationDto } from './create-education.dto';

export class UpdateEducationDto extends PartialType(CreateEducationDto) {

    institution: string
    degree: string
    duration: string
}
