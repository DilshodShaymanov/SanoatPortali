import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { District } from '../../district/models/district.model';
import { CategoryOne } from '../../category_one/models/category_one.model';
import { CategoryTwo } from '../../category_two/models/category_two.model';

interface IRegionAttr {
  name: string;
}

@Table({ tableName: 'region' })
export class Region extends Model<Region, IRegionAttr> {
  @ApiProperty({ example: 1, description: 'Region ID' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Tashkent', description: 'Region Name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => District)
  districts: District[];

  @HasMany(() => CategoryOne)
  category_one: CategoryOne[];

  @HasMany(() => CategoryTwo)
  category_two: CategoryTwo[];
}
