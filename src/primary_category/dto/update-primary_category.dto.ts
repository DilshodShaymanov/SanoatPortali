import { PartialType } from '@nestjs/swagger';
import { CreatePrimaryCategoryDto } from './create-primary_category.dto';

export class UpdatePrimaryCategoryDto extends PartialType(CreatePrimaryCategoryDto) {}
