import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the person contacting',
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the person contacting',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Phone number of the person contacting',
  })
  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString({ message: 'Phone number must be a string' })
  phone_number: string;

  @ApiProperty({
    example: 'I would like more information about your services.',
    description: 'Message from the user',
  })
  @IsNotEmpty({ message: 'Message is required' })
  @IsString({ message: 'Message must be a string' })
  message: string;
}
