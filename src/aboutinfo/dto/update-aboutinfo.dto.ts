import { PartialType } from '@nestjs/mapped-types';
import { CreateAboutinfoDto } from './create-aboutinfo.dto';
export class Info {
    fieldName: string;
    fieldValue: string;
}
export class UpdateAboutinfoDto extends PartialType(CreateAboutinfoDto) {

    title: string;
    desc: string;
    info: Info[];
}
