import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Ali Valiyev',
    description: 'User Full Name',
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: 'ali@mail.com',
    description: 'User email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'password123',
    description: 'User confirm password',
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({
    example: '+998944454647',
    description: 'User phone number',
  })
  @IsPhoneNumber('UZ')
  phone_number: string;

  @ApiProperty({
    example: 'user.jpg',
    description: 'User photo',
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({
    example: '123456789',
    description: 'User STIR (INN)',
  })
  @IsString()
  @IsNotEmpty()
  stir: string;

  @ApiProperty({
    example: 'male',
    description: 'User gender',
  })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    example: true,
    description: 'Is user active?',
  })
  @IsNotEmpty()
  is_active: boolean;

  @ApiProperty({
    example: 'hashed_refresh_token_value',
    description: 'Refresh token (hashed)',
  })
  @IsOptional()
  @IsString()
  hashed_refresh_token?: string;

  @ApiProperty({
    example: 'link',
    description: 'Activation link',
  })
  @IsOptional()
  @IsString()
  activation_link: string;
}
