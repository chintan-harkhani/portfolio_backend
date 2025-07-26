import { PartialType } from '@nestjs/mapped-types';
import { CreateDefultserviceDto } from './create-defultservice.dto';

export class UpdateDefultserviceDto extends PartialType(CreateDefultserviceDto) {}
