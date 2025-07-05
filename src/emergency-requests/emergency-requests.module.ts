import { Module } from '@nestjs/common';
import { EmergencyRequestsController } from './emergency-requests.controller';
import { EmergencyRequestsService } from './emergency-requests.service';

@Module({
  controllers: [EmergencyRequestsController],
  providers: [EmergencyRequestsService],
})
export class EmergencyRequestsModule {}
