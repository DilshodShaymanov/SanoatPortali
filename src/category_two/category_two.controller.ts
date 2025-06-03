import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryTwoService } from './category_two.service';
import { CreateCategoryTwoDto } from './dto/create-category_two.dto';
import { UpdateCategoryTwoDto } from './dto/update-category_two.dto';

@Controller('category-two')
export class CategoryTwoController {
  constructor(private readonly categoryTwoService: CategoryTwoService) {}

  @Post()
  create(@Body() createCategoryTwoDto: CreateCategoryTwoDto) {
    return this.categoryTwoService.create(createCategoryTwoDto);
  }

  @Get()
  findAll() {
    return this.categoryTwoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryTwoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryTwoDto: UpdateCategoryTwoDto,
  ) {
    return this.categoryTwoService.update(+id, updateCategoryTwoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryTwoService.remove(+id);
  }
}
