import { PartialType } from '@nestjs/swagger';
import { CreateAboutPortalDto } from './create-about_portal.dto';

export class UpdateAboutPortalDto extends PartialType(CreateAboutPortalDto) {}
