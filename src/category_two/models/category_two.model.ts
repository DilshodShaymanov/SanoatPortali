import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Region } from '../../region/models/region.model';
import { SubCategory } from '../../sub_category/models/sub_category.model';

interface CategoryTwoCreationAttr {
  name: string;
  regionId: number;
}

@Table({ tableName: 'category_two' })
export class CategoryTwo extends Model<CategoryTwo, CategoryTwoCreationAttr> {
  @ApiProperty({ example: 1, description: 'ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Technology',
    description: 'Name of the first-level category',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({ example: 1, description: 'Region ID' })
  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  regionId: number;
  @BelongsTo(() => Region)
  region: Region;

  @HasMany(() => SubCategory)
  sub_category: SubCategory[];
}
