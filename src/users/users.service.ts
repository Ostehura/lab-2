const bcrypt = require('bcrypt');
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/userprofile/usersprofile.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(createDTO: CreateUserDto) {
    if (createDTO.password !== createDTO.confirmPassword) {
      throw new BadRequestException('Confirm password not match');
    }

    const user = await this.userRepository.find({
      where: [{ email: createDTO.email }, { username: createDTO.username }],
    });

    if (!user) {
      throw new BadRequestException('Email or username already taken!');
    }

    /**
         * This regex will enforce these rules:
            At least one upper case English letter
            At least one lower case English letter
            At least one digit
            At least one special character
            Minimum eight in length
         */
    if (
      !/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/.test(
        createDTO.password,
      )
    ) {
      throw new BadRequestException('Password doesnt match the pattern!');
    }

    const hashedPassword = await bcrypt.hash(createDTO.password, 10);

    const newProfile = await this.profileRepository.create({});
    const savedProfile = await this.profileRepository.save(newProfile);

    const newUser = this.userRepository.create({
      id: savedProfile.id,
      email: createDTO.email,
      password: hashedPassword,
      username: createDTO.username,
      profile: { id: (await savedProfile).id },
    });

    const savedUser = await this.userRepository.save(newUser);
    delete savedUser.password;

    return savedUser;
  }

  checkPassword(user: User, plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, user.password);
  }

  getAllUserTest() {
    return this.userRepository.find({
      select: {
        username: true,
        email: true,
      },
    });
  }

  findByEmailOrUsername(emailOrUsername: string) {
    return this.userRepository.findOne({
      where: [{ email: emailOrUsername }, { username: emailOrUsername }],
      relations: { profile: true },
    });
  }
}
