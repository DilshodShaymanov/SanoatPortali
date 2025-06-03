import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMainCategoryDto } from './dto/create-main_category.dto';
import { UpdateMainCategoryDto } from './dto/update-main_category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MainCategory } from './models/main_category.model';

@Injectable()
export class MainCategoryService {
  constructor(
    @InjectModel(MainCategory) private MainCatgeoryModel: typeof MainCategory,
  ) {}

  create(createMainCategoryDto: CreateMainCategoryDto) {
    return this.MainCatgeoryModel.create(createMainCategoryDto);
  }

  findAll() {
    return this.MainCatgeoryModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const main_category = await this.MainCatgeoryModel.findByPk(id, {
      include: { all: true },
    });
    if (!main_category) {
      throw new NotFoundException('Main Category with ID ${id} not found.');
    }
    return main_category;
  }

  async update(id: number, updateMainCategoryDto: UpdateMainCategoryDto) {
    const main_category = await this.MainCatgeoryModel.findByPk(id);
    if (!main_category) {
      throw new NotFoundException('Main Category with ID ${id} not found.');
    }
    return main_category.update(updateMainCategoryDto);
  }

  async remove(id: number) {
    const main_category = await this.MainCatgeoryModel.findByPk(id);
    if (!main_category) {
      throw new NotFoundException('Main Category with ID ${id} not found.');
    }
    return main_category.destroy();
  }
}
