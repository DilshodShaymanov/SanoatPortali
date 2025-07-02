import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { Admin } from '../admin/models/admin.model';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { SignInAdminDto } from './dto/singnin-admin.dto';
import { User } from '../users/models/user.model';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
  ) {}

  // Admin uchun tokenlar yaratish
  async generateTokensWithAdmin(admin: Admin) {
    const payload = {
      id: admin.id,
      full_name: admin.full_name,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    try {
      const [access_token, refresh_token] = await Promise.all([
        this.jwtService.signAsync(payload, {
          secret: process.env.ACCESS_TOKEN_KEY,
          expiresIn: process.env.ACCESS_TOKEN_TIME,
        }),
        this.jwtService.signAsync(payload, {
          secret: process.env.REFRESH_TOKEN_KEY,
          expiresIn: process.env.REFRESH_TOKEN_TIME,
        }),
      ]);

      return { access_token, refresh_token };
    } catch (error) {
      throw new InternalServerErrorException(
        'Token yaratishda xatolik yuz berdi',
      );
    }
  }

  // Refresh Admin tokenni yangilash
  async updateRefreshTokenAdmin(id: number, refreshToken: string) {
    try {
      const hashed_refresh_token = await bcrypt.hash(refreshToken, 10);

      const admin = await this.adminService.update(id, {
        hashed_refresh_token,
      });
      return admin;
    } catch (error) {
      throw new Error('Refresh tokenni yangilashda xatolik yuz berdi');
    }
  }

  // Refresh tokenni cookie-ga joylashtirish
  private setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_TIME_MS),
      secure: true,
      sameSite: 'strict',
    });
  }

  // Adminni ro‘yxatdan o‘tkazish
  async signUpAdmin(createAdminDto: CreateAdminDto, res: Response) {
    try {
      const candidate = await this.adminService.findAdminByEmail(
        createAdminDto.email,
      );
      if (candidate) {
        throw new BadRequestException('Bunday Admin mavjud');
      }

      if (createAdminDto.password !== createAdminDto.confirm_password) {
        throw new BadRequestException('Parollar mos emas');
      }

      const hashed_password = await bcrypt.hash(createAdminDto.password, 10);
      const newAdmin = await this.adminService.create({
        ...createAdminDto,
        password: hashed_password,
      });

      const tokens = await this.generateTokensWithAdmin(newAdmin);
      const admin = await this.updateRefreshTokenAdmin(
        newAdmin.id,
        tokens.refresh_token,
      );

      this.setRefreshTokenCookie(res, tokens.refresh_token);

      const response = {
        message: "Admin muvaffaqiyatli ro'yxatdan o'tdi!",
        admin: admin,
        access_token: tokens.access_token,
      };
      return response;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || "Admin ro'yxatdan o'tishda xatolik yuz berdi",
      );
    }
  }

  // Sign In Admin
  async signInAdmin(signInAdminDto: SignInAdminDto, res: Response) {
    try {
      const admin = await this.adminService.findAdminByEmail(
        signInAdminDto.email,
      );

      if (!admin) {
        throw new BadRequestException("Email yoki parol noto'g'ri");
      }

      const isPasswordValid = await bcrypt.compare(
        signInAdminDto.password,
        admin.password,
      );
      if (!isPasswordValid) {
        throw new BadRequestException("Email yoki parol noto'g'ri");
      }

      await this.adminService.update(admin.id, { is_active: true });

      const tokens = await this.generateTokensWithAdmin(admin);
      await this.updateRefreshTokenAdmin(admin.id, tokens.refresh_token);

      this.setRefreshTokenCookie(res, tokens.refresh_token);

      return {
        message: 'Tizimga muvaffaqiyatli kirildi',
        admin: {
          full_name: admin.full_name,
          email: admin.email,
          is_active: admin.is_active,
          is_creator: admin.is_creator,
        },
        access_token: tokens.access_token,
      };
    } catch (error) {
      throw new UnauthorizedException(
        error.message || 'Admin tizimga kirishda xatolik yuz berdi',
      );
    }
  }

  // Sign Out Admin
  async signOut(refreshToken: string, res: Response) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const admin = await this.adminService.findOne(payload.id);
      if (!admin) {
        throw new BadRequestException('Admin topilmadi');
      }

      await this.adminService.update(admin.id, {
        is_active: false,
        hashed_refresh_token: null,
      });

      const updatedAdmin = await this.adminService.findOne(admin.id);

      res.clearCookie('refresh_token');

      return {
        message: 'Tizimdan muvaffaqiyatli chiqildi',
        is_active: updatedAdmin.is_active,
      };
    } catch (error) {
      console.error('Xatolik:', error);
      throw new UnauthorizedException(
        error.message || 'Admin tizimdan chiqishda xatolik yuz berdi',
      );
    }
  }

  // Refresh Token Admin
  async refreshToken(refreshToken: string, res: Response) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const admin = await this.adminService.findOne(payload.id);
      if (!admin || !admin.hashed_refresh_token) {
        throw new BadRequestException(
          "Admin topilmadi yoki refresh token noto'g'ri",
        );
      }

      const isRefreshTokenValid = await bcrypt.compare(
        refreshToken,
        admin.hashed_refresh_token,
      );
      if (!isRefreshTokenValid) {
        throw new BadRequestException("Refresh token noto'g'ri");
      }

      const tokens = await this.generateTokensWithAdmin(admin);
      await this.updateRefreshTokenAdmin(admin.id, tokens.refresh_token);

      this.setRefreshTokenCookie(res, tokens.refresh_token);

      return {
        message: 'Token yangilandi😊',
        access_token: tokens.access_token,
      };
    } catch (error) {
      throw new UnauthorizedException(
        error.message || 'Admin refresh token yangilashda xatolik yuz berdi',
      );
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  // User uchun tokenlar yaratish
  async generateTokensWithUser(user: User) {
    const payload = {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      is_active: user.is_active,
    };

    try {
      const [access_token, refresh_token] = await Promise.all([
        this.jwtService.signAsync(payload, {
          secret: process.env.ACCESS_TOKEN_KEY,
          expiresIn: process.env.ACCESS_TOKEN_TIME,
        }),
        this.jwtService.signAsync(payload, {
          secret: process.env.REFRESH_TOKEN_KEY,
          expiresIn: process.env.REFRESH_TOKEN_TIME,
        }),
      ]);

      return { access_token, refresh_token };
    } catch (error) {
      throw new InternalServerErrorException(
        'Token yaratishda xatolik yuz berdi',
      );
    }
  }

  // Refresh User tokenni yangilash
  async updateRefreshTokenUser(id: number, refreshToken: string) {
    try {
      const hashed_refresh_token = await bcrypt.hash(refreshToken, 10);

      await this.usersService.update(id, { hashed_refresh_token });
    } catch (error) {
      throw new Error('Refresh tokenni yangilashda xatolik yuz berdi');
    }
  }

  // Userni ro‘yxatdan o‘tkazish
  async signUpUser(createUserDto: CreateUserDto, res: Response) {
    const candidate = await this.usersService.findUserByEmail(
      createUserDto.email,
    );

    if (candidate) {
      throw new BadRequestException('Bunday Foydalnuvchi mavjud');
    }
    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException('Parollar mos emas');
    }

    const hashed_password = await bcrypt.hash(createUserDto.password, 7);

    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hashed_password,
    });

    const tokens = await this.generateTokensWithUser(newUser);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 10);

    const activation_link = uuid.v4();

    const updatedUser = await this.usersService.update(newUser.id, {
      hashed_refresh_token,
      activation_link,
    });

    this.setRefreshTokenCookie(res, tokens.refresh_token);

    try {
      await this.mailService.sendMail(updatedUser[1][0]);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Xat yuborishda xatolik');
    }

    const response = {
      message: "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi!",
      user: updatedUser[1][0],
      access_token: tokens.access_token,
    };
    return response;
  }

  // Sign In User
  async signInUser(signInAdminDto: SignInAdminDto, res: Response) {
    const user = await this.usersService.findUserByEmail(signInAdminDto.email);

    if (!user) {
      throw new BadRequestException("Login yoki parol noto'g'ri");
    }

    const isPasswordValid = await bcrypt.compare(
      signInAdminDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException("Login yoki parol noto'g'ri");
    }

    if (!user.is_active) {
      throw new BadRequestException('Foydalanuvchi hali faollashtirilmagan');
    }

    const tokens = await this.generateTokensWithUser(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 10);

    await this.usersService.update(user.id, {
      hashed_refresh_token,
    });

    this.setRefreshTokenCookie(res, tokens.refresh_token);

    const response = {
      message: 'Foydalanuvchi tizimga muvaffaqiyatli kirdi',
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
      },
      access_token: tokens.access_token,
    };

    return response;
  }

  // Sign Out User
  async signOutUser(refreshToken: string, res: Response) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      if (!payload) {
        throw new BadRequestException("Foydalanuvchi verifikatsiyadan o'tmadi");
      }

      const user = await this.usersService.findOne(payload.id);
      if (!user) {
        throw new BadRequestException('Foydalanuvchi topilmadi');
      }

      await this.usersService.update(user.id, { hashed_refresh_token: null });

      res.clearCookie('refresh_token');

      return {
        message: 'Foydalanuvchi tizimdan muvaffaqiyatli chiqdi',
      };
    } catch (error) {
      throw new UnauthorizedException(
        error.message || 'Foydalanuvchi tizimdan chiqishda xatolik yuz berdi',
      );
    }
  }

  // Refresh Token User
  async refreshTokenUser(refreshToken: string, res: Response) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const user = await this.usersService.findOne(payload.id);

      if (!user || !user.hashed_refresh_token) {
        throw new BadRequestException(
          "Foydalanuvchi topilmadi yoki refresh token noto'g'ri",
        );
      }

      const isRefreshTokenValid = await bcrypt.compare(
        refreshToken,
        user.hashed_refresh_token,
      );
      if (!isRefreshTokenValid) {
        throw new BadRequestException("Refresh token noto'g'ri");
      }

      const tokens = await this.generateTokensWithUser(user);
      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 10);

      await this.usersService.update(user.id, { hashed_refresh_token });

      this.setRefreshTokenCookie(res, tokens.refresh_token);

      return {
        message: 'Token yangilandi😊',
        access_token: tokens.access_token,
      };
    } catch (error) {
      throw new BadRequestException(
        'Foydalanuvchi refresh token yangilashda xatolik',
      );
    }
  }
}
