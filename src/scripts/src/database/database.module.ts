import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/api/services/prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
