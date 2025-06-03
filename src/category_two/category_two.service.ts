import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryTwo } from './models/category_two.model';
import { CreateCategoryTwoDto } from './dto/create-category_two.dto';
import { UpdateCategoryTwoDto } from './dto/update-category_two.dto';

@Injectable()
export class CategoryTwoService {
  constructor(
    @InjectModel(CategoryTwo) private createCategoryTwoDto: typeof CategoryTwo,
  ) {}

  create(createCategoryTwoDto: CreateCategoryTwoDto) {
    return this.createCategoryTwoDto.create(createCategoryTwoDto);
  }

  findAll() {
    return this.createCategoryTwoDto.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const category_two = await this.createCategoryTwoDto.findByPk(id, {
      include: { all: true },
    });
    if (!category_two) {
      throw new NotFoundException('CategoryTwo with ID ${id} not found');
    }
    return category_two;
  }

  async update(id: number, updateCategoryTwoDto: UpdateCategoryTwoDto) {
    const category_two = await this.createCategoryTwoDto.findByPk(id);
    if (!category_two) {
      throw new NotFoundException('CategoryTwo with ID ${id} not found');
    }
    return category_two.update(updateCategoryTwoDto);
  }

  async remove(id: number) {
    const category_two = await this.createCategoryTwoDto.findByPk(id);
    if (!category_two) {
      throw new NotFoundException('CategoryTwo with ID ${id} not found');
    }
    return category_two.destroy();
  }
}
