import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrimaryCategoryService } from './primary_category.service';
import { CreatePrimaryCategoryDto } from './dto/create-primary_category.dto';
import { UpdatePrimaryCategoryDto } from './dto/update-primary_category.dto';

@Controller('primary-category')
export class PrimaryCategoryController {
  constructor(private readonly primaryCategoryService: PrimaryCategoryService) {}

  @Post()
  create(@Body() createPrimaryCategoryDto: CreatePrimaryCategoryDto) {
    return this.primaryCategoryService.create(createPrimaryCategoryDto);
  }

  @Get()
  findAll() {
    return this.primaryCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.primaryCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrimaryCategoryDto: UpdatePrimaryCategoryDto) {
    return this.primaryCategoryService.update(+id, updatePrimaryCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.primaryCategoryService.remove(+id);
  }
}
