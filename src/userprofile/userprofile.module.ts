import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfileController } from './userprofile.controller';
import { Profile } from './usersprofile.entity';
import { ProfileService } from './usersprofile.service';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  controllers: [UserProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
