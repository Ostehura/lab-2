import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateProfileDTO } from './dto/update-profile.dto';

import { ProfileService } from './usersprofile.service';

@Controller('userprofile')
export class UserProfileController {
  constructor(private readonly userProfileService: ProfileService) {}

  @Get(':id')
  async getById(@Param('id', new ParseIntPipe()) id: number) {
    return this.userProfileService.get(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateProfileDTO,
    @Req() req: any,
  ) {
    return this.userProfileService.update(body, id);
  }
}
