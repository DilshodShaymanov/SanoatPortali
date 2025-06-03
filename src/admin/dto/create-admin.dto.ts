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
    example: 'Sardor Sobidjonov',
  })
  @IsString({ message: 'Full name must be a string' })
  @Length(3, 50, {
    message: 'Full name length must be between 3 and 50 characters',
  })
  full_name: string;

  @ApiProperty({
    description: 'Email address of admin',
    example: 'admin@gmail.com',
  })
  @IsEmail({}, { message: 'Invalid email address format' })
  @Length(5, 100, {
    message: 'Email length must be between 5 and 100 characters',
  })
  email: string;

  @ApiProperty({ description: 'Password', example: 'P@ssw0rd' })
  @IsString({ message: 'Password must be a string' })
  @Length(8, 100, {
    message: 'Password length must be at least 8 characters',
  })
  password: string;

  @ApiProperty({ description: 'Confirm Password', example: 'P@ssw0rd' })
  @IsString({ message: 'Confirm password must be a string' })
  @Length(8, 100, {
    message: 'Confirm password length must be at least 8 characters',
  })
  confirm_password: string;

  @ApiProperty({
    description: 'Admin phone number',
    example: '+998901234567',
  })
  @Matches(/^\+998[0-9]{9}$/, {
    message: 'Invalid phone number format. Correct format: +998XXXXXXXXX',
  })
  phone_number: string;

  @ApiProperty({ description: 'Admin image', example: 'admin.png' })
  @IsString({ message: 'Amin image must be a string' })
  @IsNotEmpty()
  image: string;

  @ApiProperty({ description: 'Admin Pasport seria', example: 'AB1234567' })
  @IsString({ message: 'Admin Pasport seria must be a string' })
  @IsNotEmpty()
  pasport_seria: string;

  @ApiProperty({
    example: false,
    description: 'superadmin or admin',
  })
  @IsOptional()
  @IsBoolean()
  is_creator: boolean;

  @ApiProperty({
    example: true,
    description: 'Admin activ or IsActive',
  })
  @IsOptional()
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    example: 'hashedRefreshTokenString',
    description: 'Admin uchun hashed refresh token',
  })
  @IsOptional()
  @IsString()
  hashed_refresh_token?: string;
}
