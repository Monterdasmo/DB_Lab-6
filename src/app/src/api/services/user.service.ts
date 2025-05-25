import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/database/repositories/user.repository';
import { CreateUserDto } from 'src/shared/dto/create-user.dto';
import { UpdateUserDto } from 'src/shared/dto/update-user.dto';
import { UserResponseDto } from 'src/shared/dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return users.map(this.mapToResponseDto);
  }

  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.mapToResponseDto(user);
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // Check if email already exists
    const existingUserByEmail = await this.userRepository.findByEmail(
      createUserDto.email
    );
    if (existingUserByEmail) {
      throw new ConflictException('Email already exists');
    }

    // Check if login already exists
    const existingUserByLogin = await this.userRepository.findByLogin(
      createUserDto.login
    );
    if (existingUserByLogin) {
      throw new ConflictException('Login already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.mapToResponseDto(user);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto
  ): Promise<UserResponseDto> {
    // Check if user exists
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Check email uniqueness if updating
    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      const userWithEmail = await this.userRepository.findByEmail(
        updateUserDto.email
      );
      if (userWithEmail) {
        throw new ConflictException('Email already exists');
      }
    }

    // Check login uniqueness if updating
    if (updateUserDto.login && updateUserDto.login !== existingUser.login) {
      const userWithLogin = await this.userRepository.findByLogin(
        updateUserDto.login
      );
      if (userWithLogin) {
        throw new ConflictException('Login already exists');
      }
    }

    // Hash password if updating
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const user = await this.userRepository.update(id, updateUserDto);
    return this.mapToResponseDto(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.delete(id);
  }

  async validateUser(
    login: string,
    password: string
  ): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findByLogin(login);

    if (user && (await bcrypt.compare(password, user.password))) {
      return this.mapToResponseDto(user);
    }

    return null;
  }

  private mapToResponseDto(user: any): UserResponseDto {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
