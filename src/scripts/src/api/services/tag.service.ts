// src/services/tag.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TagRepository } from 'src/database/repositories/tag.repository';
import { CreateTagDto } from 'src/shared/dto/create-tag.dto';
import { TagResponseDto } from 'src/shared/dto/response-tag.dto';
import { UpdateTagDto } from 'src/shared/dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async findAll(): Promise<TagResponseDto[]> {
    const tags = await this.tagRepository.findAll();
    return tags.map(this.mapToResponseDto);
  }

  async findOne(id: number): Promise<TagResponseDto> {
    const tag = await this.tagRepository.findById(id);

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    return this.mapToResponseDto(tag);
  }

  async create(createTagDto: CreateTagDto): Promise<TagResponseDto> {
    // Check if tag name already exists
    const existingTag = await this.tagRepository.findByName(createTagDto.name);
    if (existingTag) {
      throw new ConflictException(
        `Tag with name '${createTagDto.name}' already exists`
      );
    }

    const tag = await this.tagRepository.create(createTagDto);
    return this.mapToResponseDto(tag);
  }

  async update(
    id: number,
    updateTagDto: UpdateTagDto
  ): Promise<TagResponseDto> {
    // Check if tag exists
    const existingTag = await this.tagRepository.findById(id);
    if (!existingTag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    // Check name uniqueness if updating
    if (updateTagDto.name && updateTagDto.name !== existingTag.name) {
      const tagWithName = await this.tagRepository.findByName(
        updateTagDto.name
      );
      if (tagWithName) {
        throw new ConflictException(
          `Tag with name '${updateTagDto.name}' already exists`
        );
      }
    }

    const tag = await this.tagRepository.update(id, updateTagDto);
    return this.mapToResponseDto(tag);
  }

  async remove(id: number): Promise<void> {
    const tag = await this.tagRepository.findById(id);

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    // Check if tag has links
    if (tag._count.links > 0) {
      throw new ConflictException(
        `Cannot delete tag with ID ${id} because it has ${tag._count.links} associated links`
      );
    }

    await this.tagRepository.delete(id);
  }

  async search(searchTerm: string): Promise<TagResponseDto[]> {
    const tags = await this.tagRepository.search(searchTerm);
    return tags.map((tag) => this.mapToResponseDto(tag));
  }

  async findWithLinks(id: number): Promise<any> {
    const tag = await this.tagRepository.findWithLinks(id);

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    return tag;
  }

  private mapToResponseDto(tag: any): TagResponseDto {
    return {
      tagId: tag.tagId,
      name: tag.name,
      linkCount: tag._count?.links || 0,
    };
  }
}
