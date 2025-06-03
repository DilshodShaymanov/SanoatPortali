import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { CategoryTwo } from '../../category_two/models/category_two.model';

interface SubCategoryCreationAttr {
  title: string;
  description: string;
  image: string;
  CategoryTwoId: number;
}

@Table({ tableName: 'sub_category' })
export class SubCategory extends Model<SubCategory, SubCategoryCreationAttr> {
  @ApiProperty({ example: 1, description: 'ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Soliq Title',
    description: 'Title of the sub-category',
  })
  @Column({
    type: DataType.STRING,
  })
  title: string;

  @ApiProperty({
    example: 'Soliq Description',
    description: 'Description of the sub-category',
  })
  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @ApiProperty({
    example: 'https://example.com/images/soliq.jpg',
    description: 'Image URL or path for the sub-category',
  })
  @Column({
    type: DataType.STRING,
  })
  image: string;

  @ApiProperty({ example: 1, description: 'CategoryTwo ID' })
  @ForeignKey(() => CategoryTwo)
  @Column({
    type: DataType.INTEGER,
  })
  CategoryTwoId: number;
  @BelongsTo(() => CategoryTwo)
  category_one: CategoryTwo;
}
