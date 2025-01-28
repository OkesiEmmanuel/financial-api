import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';


@Global() // Make the module globally available
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Export the PrismaService so it can be injected into other modules
})
export class PrismaModule {}
