// src/repositories/user.repository.ts
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/api/services/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({});
  }

  async findById(userId: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { userId },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByLogin(login: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { login },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
      include: {
        accesses: {
          include: {
            role: true,
            data: true,
          },
        },
      },
    });
  }

  async update(userId: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { userId },
      data,
      include: {
        accesses: {
          include: {
            role: true,
            data: true,
          },
        },
      },
    });
  }

  async delete(userId: number): Promise<User> {
    return this.prisma.user.delete({
      where: { userId },
    });
  }

  async count(): Promise<number> {
    return this.prisma.user.count();
  }
}
