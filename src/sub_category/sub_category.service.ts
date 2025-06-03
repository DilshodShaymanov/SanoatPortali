import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub_category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub_category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { SubCategory } from './models/sub_category.model';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel(SubCategory) private SubCategoryModel: typeof SubCategory,
  ) {}

  create(createSubCategoryDto: CreateSubCategoryDto) {
    return this.SubCategoryModel.create(createSubCategoryDto);
  }

  findAll() {
    return this.SubCategoryModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const sub_category = await this.SubCategoryModel.findByPk(id, {
      include: { all: true },
    });
    if (!sub_category) {
      throw new NotFoundException('SubCategory with ID ${id} not found.');
    }
    return sub_category;
  }

  async update(id: number, updateSubCategoryDto: UpdateSubCategoryDto) {
    const sub_category = await this.SubCategoryModel.findByPk(id);
    if (!sub_category) {
      throw new NotFoundException('SubCategory with ID ${id} not found.');
    }
    return sub_category.update(updateSubCategoryDto);
  }

  async remove(id: number) {
    const sub_category = await this.SubCategoryModel.findByPk(id);
    if (!sub_category) {
      throw new NotFoundException('SubCategory with ID ${id} not found.');
    }
    return sub_category.destroy();
  }
}
