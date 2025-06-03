import { Module } from '@nestjs/common';
import { CategoryTwoService } from './category_two.service';
import { CategoryTwoController } from './category_two.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryTwo } from './models/category_two.model';

@Module({
  imports: [SequelizeModule.forFeature([CategoryTwo])],
  controllers: [CategoryTwoController],
  providers: [CategoryTwoService],
})
export class CategoryTwoModule {}
