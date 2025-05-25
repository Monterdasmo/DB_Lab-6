// src/repositories/tag.repository.ts
import { Injectable } from '@nestjs/common';
import { Prisma, Tag } from '@prisma/client';
import { PrismaService } from 'src/api/services/prisma.service';

@Injectable()
export class TagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<(Tag & { _count: { links: number } })[]> {
    return this.prisma.tag.findMany({
      include: {
        _count: {
          select: { links: true },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findById(
    tagId: number
  ): Promise<(Tag & { _count: { links: number } }) | null> {
    return this.prisma.tag.findUnique({
      where: { tagId },
      include: {
        _count: {
          select: { links: true },
        },
      },
    });
  }

  async findByName(name: string): Promise<Tag | null> {
    return this.prisma.tag.findUnique({
      where: { name },
    });
  }

  async create(data: Prisma.TagCreateInput): Promise<Tag> {
    return this.prisma.tag.create({
      data,
    });
  }

  async update(tagId: number, data: Prisma.TagUpdateInput): Promise<Tag> {
    return this.prisma.tag.update({
      where: { tagId },
      data,
    });
  }

  async delete(tagId: number): Promise<Tag> {
    return this.prisma.tag.delete({
      where: { tagId },
    });
  }

  async findWithLinks(tagId: number): Promise<(Tag & { links: any[] }) | null> {
    return this.prisma.tag.findUnique({
      where: { tagId },
      include: {
        links: {
          include: {
            data: true,
          },
        },
      },
    });
  }

  async count(): Promise<number> {
    return this.prisma.tag.count();
  }

  async search(searchTerm: string): Promise<Tag[]> {
    return this.prisma.tag.findMany({
      where: {
        name: {
          contains: searchTerm,
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
  }
}
