import { Module } from '@nestjs/common';
import { MainCategoryService } from './main_category.service';
import { MainCategoryController } from './main_category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MainCategory } from './models/main_category.model';

@Module({
  imports: [SequelizeModule.forFeature([MainCategory])],
  controllers: [MainCategoryController],
  providers: [MainCategoryService],
})
export class MainCategoryModule {}
