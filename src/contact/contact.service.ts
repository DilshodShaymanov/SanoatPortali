import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Contact } from './models/contact.model';

@Injectable()
export class ContactService {
  constructor(@InjectModel(Contact) private ContactModel: typeof Contact) {}

  create(createContactDto: CreateContactDto) {
    return this.ContactModel.create(createContactDto);
  }

  findAll() {
    return this.ContactModel.findAll();
  }

  async findOne(id: number) {
    const contact = await this.ContactModel.findByPk(id);
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found.`);
    }
    return contact;
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    const contact = await this.ContactModel.findByPk(id);
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found.`);
    }
    return contact.update(updateContactDto);
  }

  async remove(id: number) {
    const contact = await this.ContactModel.findByPk(id);
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found.`);
    }
    return contact.destroy();
  }
}
