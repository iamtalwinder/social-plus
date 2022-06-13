import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCredentialDto } from '../dto';
import { CredentialDocument, CredentialSchemaName } from '../schemas';

@Injectable()
export class CredentialService {
  constructor(
    @InjectModel(CredentialSchemaName)
    private readonly credentialDocument: Model<CredentialDocument>,
  ) {}

  public async create(
    authId?: string,
    dto?: CreateCredentialDto,
  ): Promise<CredentialDocument> {
    if (authId) {
      return this.credentialDocument.create({
        _id: authId,
        ...dto,
      } as any);
    }

    return this.credentialDocument.create({
      ...dto,
    } as any);
  }

  public async update(
    credential: CredentialDocument,
    dto: CreateCredentialDto,
  ): Promise<CredentialDocument> {
    return this.credentialDocument.findOneAndUpdate(
      { _id: credential.id },
      {
        $set: {
          ...dto,
        },
      },
      {
        new: true,
        upsert: true,
      },
    );
  }

  public async updateById(
    id: string,
    dto: CreateCredentialDto,
  ): Promise<CredentialDocument> {
    return this.credentialDocument.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          ...dto,
        },
      },
    );
  }

  public async getByRequestToken(
    requestToken: string,
  ): Promise<CredentialDocument> {
    return this.credentialDocument.findOne({
      requestToken,
    });
  }
}
