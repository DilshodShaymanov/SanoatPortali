import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryOneService } from './category_one.service';
import { CreateCategoryOneDto } from './dto/create-category_one.dto';
import { UpdateCategoryOneDto } from './dto/update-category_one.dto';

@Controller('category-one')
export class CategoryOneController {
  constructor(private readonly categoryOneService: CategoryOneService) {}

  @Post()
  create(@Body() createCategoryOneDto: CreateCategoryOneDto) {
    return this.categoryOneService.create(createCategoryOneDto);
  }

  @Get()
  findAll() {
    return this.categoryOneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryOneService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryOneDto: UpdateCategoryOneDto,
  ) {
    return this.categoryOneService.update(+id, updateCategoryOneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryOneService.remove(+id);
  }
}
