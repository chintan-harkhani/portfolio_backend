import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ServiceDocument = Service & Document;

@Schema({
    timestamps: true,
})
export class Service {
    @Prop({ required: true })
    num: number;

    @Prop()
    title: string;

    @Prop()
    desc: string;

    @Prop()
    href: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);