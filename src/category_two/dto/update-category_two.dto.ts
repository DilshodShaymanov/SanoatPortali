import { PartialType } from '@nestjs/swagger';
import { CreateCategoryTwoDto } from './create-category_two.dto';

export class UpdateCategoryTwoDto extends PartialType(CreateCategoryTwoDto) {}
