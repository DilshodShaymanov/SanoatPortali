import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsEmail,
  Length,
  Matches,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    description: 'Full Name of admin',
    example: 'ALi Valiyev',
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: 'admin@example.com',
    description: 'Adminning email manzili',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Admin paroli',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'password123',
    description: 'Admin parolini takrorlang',
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Admin telefon raqami',
  })
  @Matches(/^\+998[0-9]{9}$/, {
    message: 'Invalid phone number format. Correct format: +998XXXXXXXXX',
  })
  phone_number: string;

  @ApiProperty({
    description: 'Admin image',
    example: 'admin.png',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    description: 'Admin Pasport seria',
    example: 'AB1234567',
  })
  @IsString()
  @IsNotEmpty()
  pasport_seria: string;

  @ApiProperty({
    example: true,
    description: "Admin faolligini ko'rsatadi",
  })
  @IsOptional()
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    example: false,
    description: "SuperAdmin ekanligini ko'rsatadi",
  })
  @IsOptional()
  @IsBoolean()
  is_creator: boolean;

  @ApiProperty({
    example: 'hashedRefreshTokenString',
    description: 'Admin uchun hashlangan refresh token',
  })
  @IsOptional()
  @IsString()
  hashed_refresh_token?: string;
}
