import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type profileDocument = Profile & Document;

@Schema({
    timestamps: true,
})
export class Profile {
    @Prop({ required: true })
    name: string;

    @Prop()
    desc: string;

    @Prop()
    position: string;

    @Prop()
    avtaruri: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);