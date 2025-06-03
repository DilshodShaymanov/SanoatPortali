import { PartialType } from '@nestjs/swagger';
import { CreateCategoryOneDto } from './create-category_one.dto';

export class UpdateCategoryOneDto extends PartialType(CreateCategoryOneDto) {}
