import { PartialType } from '@nestjs/mapped-types';
import { CreateExperinceDto } from './create-experince.dto';

export class UpdateExperinceDto extends PartialType(CreateExperinceDto) {

    company: string
    position: string
    duration: string
}
