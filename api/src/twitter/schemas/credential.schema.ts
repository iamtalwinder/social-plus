import { Schema, Document } from 'mongoose';
import {
  Schema as SchemaDecorator,
  Prop,
  SchemaFactory,
} from '@nestjs/mongoose';
import { BaseClass, idPlugin } from 'src/common';

@SchemaDecorator({
  timestamps: true,
})
export class Credential extends BaseClass {
  @Prop({
    index: true,
  })
  public accessToken?: string;

  @Prop({
    required: false,
    type: String,
  })
  public authSecret?: string;
}

export interface CredentialDocument extends Document<string>, Credential {
  _id?: string;
  id?: string;
}

export const CredentialSchemaName: string = Credential.name;
export const CredentialSchema: Schema<CredentialDocument> =
  SchemaFactory.createForClass(Credential);

CredentialSchema.plugin(idPlugin);
