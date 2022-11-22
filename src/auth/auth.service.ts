import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { AccessToken } from './interface/accesToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(usernameOrEmail: string, password: string): Promise<User> {
    const user = await this.userService.findByEmailOrUsername(usernameOrEmail);
    if (user && (await this.userService.checkPassword(user, password))) {
      const { password, ...result } = user;
      return result as any;
    }
    return null;
  }

  async login(loginDto: LoginUserDto): Promise<AccessToken> {
    let user: User;

    try {
      user = await this.userService.findByEmailOrUsername(loginDto.username);
    } catch (err) {
      throw new UnauthorizedException(
        `There isn't any user with email or username: ${loginDto.username}`,
      );
    }

    if (!(await this.userService.checkPassword(user, loginDto.password))) {
      throw new UnauthorizedException(`Wrong password`);
    }

    const payload = { username: user.username, userId: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(signUp: CreateUserDto): Promise<User> {
    const user = await this.userService.create(signUp);
    const { password, ...result } = user;
    return result as any;
  }
}
