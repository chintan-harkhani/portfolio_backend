// src/service/service.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceDocument = DefultService & Document;

@Schema()
export class DefultService {
  @Prop({ required: true })
  key: string;

  @Prop({ required: true })
  name: string;
}

export const ServiceSchema = SchemaFactory.createForClass(DefultService);