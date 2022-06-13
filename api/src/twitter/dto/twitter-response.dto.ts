import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class TwitterResponseDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  public oauthToken: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public oauthTokenSecret: string;
}
