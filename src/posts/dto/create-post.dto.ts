import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @MinLength(1)
  @IsString({ message: 'Text field is required.' })
  public title: string;
  @MinLength(1)
  @IsString()
  @IsOptional()
  public description: string;
}
