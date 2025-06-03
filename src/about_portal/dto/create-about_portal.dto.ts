import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsUrl } from 'class-validator';

export class CreateAboutPortalDto {
  @ApiProperty({
    example: 'My Awesome Portal',
    description: 'Title of the portal',
  })
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @ApiProperty({
    example: 'This is an about section for the portal',
    description: 'Description of the portal',
  })
  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Contact phone number',
  })
  @IsNotEmpty({ message: 'Contact is required' })
  @IsString({ message: 'Contact must be a string' })
  contact: string;

  @ApiProperty({
    example: 'example@example.com',
    description: 'Email address for contact',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'URL to the portal image',
  })
  @IsNotEmpty({ message: 'Image is required' })
  image: string;
}
