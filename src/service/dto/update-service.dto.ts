import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {

    num: string;

    title?: string;

    desc?: string;

    href?: string;
}
