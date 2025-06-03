import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAboutPortalDto } from './dto/create-about_portal.dto';
import { UpdateAboutPortalDto } from './dto/update-about_portal.dto';
import { InjectModel } from '@nestjs/sequelize';
import { AboutPortal } from './models/about_portal.model';

@Injectable()
export class AboutPortalService {
  constructor(
    @InjectModel(AboutPortal) private AboutPortalModel: typeof AboutPortal,
  ) {}

  create(createAboutPortalDto: CreateAboutPortalDto) {
    return this.AboutPortalModel.create(createAboutPortalDto);
  }

  findAll() {
    return this.AboutPortalModel.findAll();
  }

  async findOne(id: number) {
    const about_portal = await this.AboutPortalModel.findByPk(id);
    if (!about_portal) {
      throw new NotFoundException(`AboutPortal with ID ${id} not found.`);
    }
    return this.AboutPortalModel.findByPk(+id, {
      include: { all: true },
    });
  }

  async update(id: number, updateAboutPortalDto: UpdateAboutPortalDto) {
    const about_portal = await this.AboutPortalModel.findByPk(id);
    if (!about_portal) {
      throw new NotFoundException(`AboutPortal with ID ${id} not found.`);
    }
    return await about_portal.update(updateAboutPortalDto);
  }

  async remove(id: number) {
    const about_portal = await this.AboutPortalModel.findByPk(id);
    if (!about_portal) {
      throw new NotFoundException('AboutPortal with ID ${id} not found');
    }
    return about_portal.destroy();
  }
}
