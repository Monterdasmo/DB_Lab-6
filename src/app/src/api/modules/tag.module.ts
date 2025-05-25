import { Module } from '@nestjs/common';
import { TagRepository } from 'src/database/repositories/tag.repository';
import { TagController } from '../controllers/tag.controller';
import { TagService } from '../services/tag.service';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TagController],
  providers: [TagService, TagRepository],
  exports: [TagService],
})
export class TagModule {}
