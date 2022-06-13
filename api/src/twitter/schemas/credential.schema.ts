import { Schema, Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
import {
  Schema as SchemaDecorator,
  Prop,
  SchemaFactory,
} from '@nestjs/mongoose';

@SchemaDecorator({
  timestamps: true,
})
export class Credential {
  @Prop({
    default: uuid,
  })
  public _id?: string;

  @Prop({
    index: true,
  })
  public accessToken?: string;

  @Prop({
    required: false,
    type: String,
  })
  public authSecret?: string;

  @Prop({
    required: false,
    type: String,
  })
  public requestToken?: string;

  @Prop({
    required: false,
    type: String,
  })
  public requestSecret?: string;
}

export interface CredentialDocument extends Document<string>, Credential {
  _id?: string;
  id?: string;
}

export const CredentialSchemaName: string = Credential.name;
export const CredentialSchema: Schema<CredentialDocument> =
  SchemaFactory.createForClass(Credential);
