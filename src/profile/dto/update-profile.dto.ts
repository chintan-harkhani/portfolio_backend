import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {

     name: string;

    desc?: string;

    position?: string;

    avtaruri?: string;
}
