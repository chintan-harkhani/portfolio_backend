import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AboutDocument = About & Document;

@Schema()
export class Info {
    @Prop({ required: true })
    fieldName: string;

    @Prop({ required: true })
    fieldValue: string;
}

const InfoSchema = SchemaFactory.createForClass(Info);

@Schema({ timestamps: true })
export class About {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    desc: string;

    @Prop({ type: [InfoSchema], required: true })
    info: Info[];
}

export const AboutSchema = SchemaFactory.createForClass(About);
