import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SaveCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;
}
