import { Module } from '@nestjs/common';
import { PrimaryCategoryService } from './primary_category.service';
import { PrimaryCategoryController } from './primary_category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PrimaryCategory } from './models/primary_category.model';

@Module({
  imports: [SequelizeModule.forFeature([PrimaryCategory])],
  controllers: [PrimaryCategoryController],
  providers: [PrimaryCategoryService],
})
export class PrimaryCategoryModule {}
