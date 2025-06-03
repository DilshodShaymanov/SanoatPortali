import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ContactCreationAttr {
  name: string;
  email: string;
  phone_number: string;
  message: string;
}

@Table({ tableName: 'contact' })
export class Contact extends Model<Contact, ContactCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the contact entry',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the person contacting',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the person contacting',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Phone number of the person contacting',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;

  @ApiProperty({
    example: 'I would like more information about your services.',
    description: 'Message from the user',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  message: string;
}
