import { Optional } from '@nestjs/common';
import { IsDate, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateProfileDTO {
  @IsOptional()
  @IsDate()
  public birthDate: Date;
  @IsOptional()
  @IsString()
  public aboutMe: string;
  @IsOptional()
  @IsUrl()
  public telegram: string;
  @IsOptional()
  @IsUrl()
  public twitter: string;
  @IsOptional()
  @IsUrl()
  public instagram: string;
}
