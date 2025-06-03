import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AboutPortalService } from './about_portal.service';
import { CreateAboutPortalDto } from './dto/create-about_portal.dto';
import { UpdateAboutPortalDto } from './dto/update-about_portal.dto';

@Controller('about-portal')
export class AboutPortalController {
  constructor(private readonly aboutPortalService: AboutPortalService) {}

  @Post()
  create(@Body() createAboutPortalDto: CreateAboutPortalDto) {
    return this.aboutPortalService.create(createAboutPortalDto);
  }

  @Get()
  findAll() {
    return this.aboutPortalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aboutPortalService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAboutPortalDto: UpdateAboutPortalDto,
  ) {
    return this.aboutPortalService.update(+id, updateAboutPortalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aboutPortalService.remove(+id);
  }
}
