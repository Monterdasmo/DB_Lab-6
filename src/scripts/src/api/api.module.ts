import { Module } from '@nestjs/common';
import { TagModule } from './modules/tag.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [UserModule, TagModule],
})
export class ApiModule {}
