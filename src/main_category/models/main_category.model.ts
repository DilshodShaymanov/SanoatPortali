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
import { CategoryOne } from '../../category_one/models/category_one.model';
import { PrimaryCategory } from '../../primary_category/models/primary_category.model';

interface MainCategoryCreationAttr {
  name: string;
  CategoryOneId: number;
}

@Table({ tableName: 'main_category' })
export class MainCategory extends Model<
  MainCategory,
  MainCategoryCreationAttr
> {
  @ApiProperty({ example: 1, description: 'ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Soliq', description: 'Name of the main category' })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({ example: 1, description: 'CategoryOne ID' })
  @ForeignKey(() => CategoryOne)
  @Column({
    type: DataType.INTEGER,
  })
  CategoryOneId: number;
  @BelongsTo(() => CategoryOne)
  category_one: CategoryOne;

  @HasMany(() => PrimaryCategory)
  primary_category: PrimaryCategory[];
}
