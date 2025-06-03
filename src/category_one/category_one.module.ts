import { Module } from '@nestjs/common';
import { CategoryOneService } from './category_one.service';
import { CategoryOneController } from './category_one.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryOne } from './models/category_one.model';

@Module({
  imports: [SequelizeModule.forFeature([CategoryOne])],
  controllers: [CategoryOneController],
  providers: [CategoryOneService],
})
export class CategoryOneModule {}
