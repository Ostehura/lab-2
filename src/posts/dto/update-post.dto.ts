import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdatePostDto {
  @MinLength(1)
  @IsString({ message: 'Text field is required.' })
  public title: string;
  @MinLength(1)
  @IsString()
  @IsOptional()
  public description: string;
}
