import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type EducationDocument = Education & Document;

@Schema({
    timestamps: true,
})
export class Education {
    @Prop({ required: true })
    institution: string;

    @Prop()
    degree: string;

    @Prop()
    duration: string;
}

export const EducationSchema = SchemaFactory.createForClass(Education);