import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { MainCategory } from '../../main_category/models/main_category.model';

interface PrimaryCategoryCreationAttr {
  title: string;
  description: string;
  image: string;
  MainCategoryId: number;
}

@Table({ tableName: 'primary_category' })
export class PrimaryCategory extends Model<
  PrimaryCategory,
  PrimaryCategoryCreationAttr
> {
  @ApiProperty({ example: 1, description: 'ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Soliq Title',
    description: 'Title of the primary-category',
  })
  @Column({
    type: DataType.STRING,
  })
  title: string;

  @ApiProperty({
    example: 'Soliq Description',
    description: 'Description of the primary-category',
  })
  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @ApiProperty({
    example: 'https://example.com/images/soliq.jpg',
    description: 'Image URL or path for the primary-category',
  })
  @Column({
    type: DataType.STRING,
  })
  image: string;

  @ApiProperty({ example: 1, description: 'Main Category ID' })
  @ForeignKey(() => MainCategory)
  @Column({
    type: DataType.INTEGER,
  })
  MainCategoryId: number;
  @BelongsTo(() => MainCategory)
  MainCategory: MainCategory;
}
