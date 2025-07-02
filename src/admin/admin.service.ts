import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin) {}

  async create(createAdminDto: CreateAdminDto) {
    return this.adminModel.create(createAdminDto);
  }

  findAdminByEmail(email: string): Promise<Admin> {
    return this.adminModel.findOne({ where: { email } });
  }

  async findAll() {
    return this.adminModel.findAll();
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found.`);
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found.`);
    }
    return admin.update(updateAdminDto);
  }

  async remove(id: number) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found.`);
    }
    return admin.destroy();
  }
}
