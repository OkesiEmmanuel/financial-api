import { Module } from '@nestjs/common';
import { HashService } from './hash.service';
import { ResponseService } from './response.service';

@Module({
  providers: [HashService, ResponseService]
})
export class UtilsModule {}
