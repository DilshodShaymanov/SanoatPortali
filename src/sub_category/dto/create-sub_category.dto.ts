import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubCategoryDto {
  @ApiProperty({
    example: 'Soliq title',
    description: 'Title of the sub-category',
  })
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @ApiProperty({
    example: 'Soliq descriptiom',
    description: 'Description of the sub-category',
  })
  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @ApiProperty({
    example: 'https://example.com/images/soliq.jpg',
    description: 'Image URL or path for the sub-category',
  })
  @IsNotEmpty({ message: 'Image is required' })
  @IsString({ message: 'Image must be a string' })
  image: string;
}
