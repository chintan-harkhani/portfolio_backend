    // contact.schema.ts
    import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
    import { Document } from 'mongoose';

    export type ContactDocument = Contact & Document;

    @Schema({ timestamps: true })
    export class Contact {
        @Prop({ required: true })
        FirstName: string;

        @Prop({ required: true })
        LastName: string;

        @Prop({ required: true })
        email: string;

        @Prop({ required: true })
        phone: string;

        @Prop({ required: true })
        service: string;

        @Prop({ required: true })
        message: string;


    }

    export const ContactSchema = SchemaFactory.createForClass(Contact);
