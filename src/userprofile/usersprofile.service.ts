import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProfileDTO } from './dto/update-profile.dto';
import { Profile } from './usersprofile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async update(updateProfile: UpdateProfileDTO, id: number) {
    const profile = await this.profileRepository.findOne({
      where: { id: id },
    });
    return this.profileRepository.save({
      ...profile,
      ...updateProfile,
      updatedAt: new Date().toISOString(),
    });
  }

  async get(userId: number) {
    return await this.profileRepository.findOne({
      where: { id: userId },
    });
  }
}
