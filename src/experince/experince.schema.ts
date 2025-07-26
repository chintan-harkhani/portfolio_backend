import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ExperinceDocument = Experince & Document;

@Schema({
    timestamps: true,
})
export class Experince {
    @Prop({ required: true })
    company: string;

    @Prop()
    position: string;

    @Prop()
    duration: string;
}

export const ExperinceSchema = SchemaFactory.createForClass(Experince);