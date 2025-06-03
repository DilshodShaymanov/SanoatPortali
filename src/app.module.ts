import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { AdminModule } from './admin/admin.module';
import { DistrictModule } from './district/district.module';
import { RegionModule } from './region/region.module';
import { UsersModule } from './users/users.module';
import { ContactModule } from './contact/contact.module';
import { AboutPortalModule } from './about_portal/about_portal.module';
import { CategoryOneModule } from './category_one/category_one.module';
import { CategoryTwoModule } from './category_two/category_two.module';
import { MainCategoryModule } from './main_category/main_category.module';
import { SubCategoryModule } from './sub_category/sub_category.module';
import { PrimaryCategoryModule } from './primary_category/primary_category.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    AdminModule,
    DistrictModule,
    RegionModule,
    UsersModule,
    ContactModule,
    AboutPortalModule,
    CategoryOneModule,
    CategoryTwoModule,
    MainCategoryModule,
    SubCategoryModule,
    PrimaryCategoryModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
