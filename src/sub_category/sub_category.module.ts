import { Module } from '@nestjs/common';
import { SubCategoryService } from './sub_category.service';
import { SubCategoryController } from './sub_category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubCategory } from './models/sub_category.model';

@Module({
  imports: [SequelizeModule.forFeature([SubCategory])],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
})
export class SubCategoryModule {}
