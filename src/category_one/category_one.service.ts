import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryOneDto } from './dto/create-category_one.dto';
import { UpdateCategoryOneDto } from './dto/update-category_one.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryOne } from './models/category_one.model';

@Injectable()
export class CategoryOneService {
  constructor(
    @InjectModel(CategoryOne) private CategoryOneModel: typeof CategoryOne,
  ) {}

  create(createCategoryOneDto: CreateCategoryOneDto) {
    return this.CategoryOneModel.create(createCategoryOneDto);
  }

  findAll() {
    return this.CategoryOneModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const category_one = await this.CategoryOneModel.findByPk(id, {
      include: { all: true },
    });
    if (!category_one) {
      throw new NotFoundException('CategoryOne with ID ${id} not found');
    }
    return category_one;
  }

  async update(id: number, updateCategoryOneDto: UpdateCategoryOneDto) {
    const category_one = await this.CategoryOneModel.findByPk(id);
    if (!category_one) {
      throw new NotFoundException('CategoryOne with ID ${id} not found');
    }
    return category_one.update(updateCategoryOneDto);
  }

  async remove(id: number) {
    const category_one = await this.CategoryOneModel.findByPk(id);
    if (!category_one) {
      throw new NotFoundException('CategoryOne with ID ${id} not found');
    }
    return category_one.destroy();
  }
}
