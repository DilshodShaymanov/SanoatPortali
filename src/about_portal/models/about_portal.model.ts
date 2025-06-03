import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface AboutPortalCreationAttr {
  title: string;
  description: string;
  contact: string;
  email: string;
  image: string;
}

@Table({ tableName: 'about_portal' })
export class AboutPortal extends Model<AboutPortal, AboutPortalCreationAttr> {
  @ApiProperty({ example: 1, description: 'ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'My Awesome Portal',
    description: 'Title of the portal',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 'This is the about section of the portal.',
    description: 'Description of the portal',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Contact phone number',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  contact: string;

  @ApiProperty({ example: 'example@example.com', description: 'Email address' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'URL or path to the portal image',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;
}
