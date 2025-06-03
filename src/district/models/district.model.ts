import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Region } from '../../region/models/region.model';

interface IDistrictAttr {
  name: string;
  regionId: number;
}

@Table({ tableName: 'district' })
export class District extends Model<District, IDistrictAttr> {
  @ApiProperty({ example: 1, description: 'ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'chilonzor', description: 'district name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 1, description: 'Region ID' })
  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  regionId: number;
  @BelongsTo(() => Region)
  region: Region;
}
