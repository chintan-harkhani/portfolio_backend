import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type StateDocument = State & Document;

@Schema({
    timestamps: true,
})
export class State {
    @Prop({ required: true })
    experience: number;

    @Prop()
    projects: number;

    @Prop()
    technologies: number;

    @Prop()
    commits: number;
}

export const StateSchema = SchemaFactory.createForClass(State);