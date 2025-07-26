import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { StateService } from './state.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) { }

  @Post('create')
  create(@Body() createStateDto: CreateStateDto) {
    return this.stateService.create(createStateDto);
  }

  @Get()
  async getAll(): Promise<any[]> {
    return this.stateService.findAll();
  }

  @Put('update')
  async updateOne(@Body() updateDto: UpdateStateDto) {
    return this.stateService.update(updateDto);
  }
}
