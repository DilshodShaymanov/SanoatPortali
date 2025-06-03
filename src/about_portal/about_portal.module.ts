import { Module } from '@nestjs/common';
import { AboutPortalService } from './about_portal.service';
import { AboutPortalController } from './about_portal.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AboutPortal } from './models/about_portal.model';

@Module({
  imports: [SequelizeModule.forFeature([AboutPortal])],
  controllers: [AboutPortalController],
  providers: [AboutPortalService],
})
export class AboutPortalModule {}
