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
import { MainCategory } from '../../main_category/models/main_category.model';

interface CategoryOneCreationAttr {
  name: string;
  regionId: number;
}

@Table({ tableName: 'category_one' })
export class CategoryOne extends Model<CategoryOne, CategoryOneCreationAttr> {
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

  @HasMany(() => MainCategory)
  main_category: MainCategory[];
}
