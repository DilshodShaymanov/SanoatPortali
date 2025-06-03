import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrimaryCategoryDto } from './dto/create-primary_category.dto';
import { UpdatePrimaryCategoryDto } from './dto/update-primary_category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PrimaryCategory } from './models/primary_category.model';

@Injectable()
export class PrimaryCategoryService {
  constructor(
    @InjectModel(PrimaryCategory)
    private PrimaryCategoryModel: typeof PrimaryCategory,
  ) {}

  create(createPrimaryCategoryDto: CreatePrimaryCategoryDto) {
    return this.PrimaryCategoryModel.create(createPrimaryCategoryDto);
  }

  findAll() {
    return this.PrimaryCategoryModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const primary_category = await this.PrimaryCategoryModel.findByPk(id, {
      include: { all: true },
    });
    if (!primary_category) {
      throw new NotFoundException('Primary Category with ID ${id} not found.');
    }
    return primary_category;
  }

  async update(id: number, updatePrimaryCategoryDto: UpdatePrimaryCategoryDto) {
    const primary_category = await this.PrimaryCategoryModel.findByPk(id);
    if (!primary_category) {
      throw new NotFoundException('Primary Category with ID ${id} not found.');
    }
    return primary_category.update(updatePrimaryCategoryDto);
  }

  async remove(id: number) {
    const primary_category = await this.PrimaryCategoryModel.findByPk(id);
    if (!primary_category) {
      throw new NotFoundException('Primary Category with ID ${id} not found.');
    }
    return primary_category.destroy();
  }
}
