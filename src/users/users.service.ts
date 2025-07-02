import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({
      where: { email },
    });
  }

  async findAll() {
    return this.userModel.findAll();
  }

  async findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const update = await this.userModel.update(updateUserDto, {
      where: { id },
      returning: true,
    });
    return update;
  }

  async remove(id: number) {
    return this.userModel.destroy({ where: { id } });
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }
    const [affectedCount, affectedUsers] = await this.userModel.update(
      { is_active: true },
      {
        where: {
          activation_link: link,
          is_active: false,
        },
        returning: true,
      },
    );
    if (affectedCount === 0 || !affectedUsers.length) {
      throw new BadRequestException(
        "Foydalanuvchi allaqachon faollashtirilgan yoki havola noto'g'ri",
      );
    }
    const activatedUser = affectedUsers[0];
    return {
      message: 'Foydalanuvchi muvaffaqiyatli faollashtirildi!',
      user: {
        id: activatedUser.id,
        email: activatedUser.email,
        is_active: activatedUser.is_active,
      },
    };
  }
}
