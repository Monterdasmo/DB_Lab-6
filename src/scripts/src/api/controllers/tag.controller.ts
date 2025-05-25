// src/controllers/tag.controller.ts
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
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTagDto } from 'src/shared/dto/create-tag.dto';
import { TagResponseDto } from 'src/shared/dto/response-tag.dto';
import { UpdateTagDto } from 'src/shared/dto/update-tag.dto';
import { TagService } from '../services/tag.service';

@Controller('api/tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async search(@Query('q') searchTerm: string): Promise<TagResponseDto[]> {
    return this.tagService.search(searchTerm || '');
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<TagResponseDto> {
    return this.tagService.findOne(id);
  }

  @Get(':id/links')
  async findWithLinks(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.tagService.findWithLinks(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(ValidationPipe) createTagDto: CreateTagDto
  ): Promise<TagResponseDto> {
    return this.tagService.create(createTagDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateTagDto: UpdateTagDto
  ): Promise<TagResponseDto> {
    return this.tagService.update(id, updateTagDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tagService.remove(id);
  }
}
