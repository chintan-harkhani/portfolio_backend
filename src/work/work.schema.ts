// src/project/schemas/project.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkDocument = Work & Document;

@Schema()
export class Work {
  @Prop({ required: true })
  num: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  desc: string;

  @Prop({ required: true })
  stack: string[];

  @Prop({ required: true })
  image: string;

  @Prop()
  live: string;

  @Prop()
  github: string;
}

export const WorkSchema = SchemaFactory.createForClass(Work);
