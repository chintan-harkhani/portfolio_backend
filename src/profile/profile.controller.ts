import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Post('create')
  create(@Body() createProfileDto: CreateProfileDto): Promise<any> {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  async getAll(): Promise<any[]> {
    return this.profileService.findAll();
  }

    @Put()
    async updateOne(@Body() updateDto: UpdateProfileDto) {
      return this.profileService.update(updateDto);
    }
}
