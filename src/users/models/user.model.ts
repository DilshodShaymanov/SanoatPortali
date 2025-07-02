import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface ICreationUserAttr {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone_number: string;
  image?: string;
  stir: string;
  gender: 'male' | 'female' | 'other';
  is_active: boolean;
  hashed_refresh_token?: string;
  activation_link?: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, ICreationUserAttr> {
  @ApiProperty({ example: 1, description: 'Foydalanuvchi ID raqami' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 'Ali Valiyev',
    description: 'User Full Name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @ApiProperty({
    example: 'ali@mail.com',
    description: 'User email',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'Ali12345',
    description: 'Foydalanuvchi paroli',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: 'Ali12345',
    description: 'Parolni tasdiqlash',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  confirm_password: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Telefon raqami',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phone_number: string;

  @ApiProperty({
    example: 'user.jpg',
    description: 'Foydalanuvchi rasmi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;

  @ApiProperty({
    example: '123456789',
    description: 'STIR (INN) raqami',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  stir: string;

  @ApiProperty({
    example: 'male',
    description: 'Jinsi (male/female)',
  })
  @Column({
    type: DataType.ENUM('male', 'female'),
    allowNull: false,
  })
  gender: 'male' | 'female';

  @ApiProperty({
    example: true,
    description: 'Faollik holati',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: 'hashed_refresh_token_string',
    description: 'Hashed refresh token',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  hashed_refresh_token?: string;

  @ApiProperty({
    example: 'abc123def456',
    description: 'Faollashtirish havolasi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  activation_link?: string;
}
