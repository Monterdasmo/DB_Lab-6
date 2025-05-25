# Реалізація інформаційного та програмного забезпечення

## SQL-скрипт для створення на початкового наповнення бази даних

```mysql
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema opendata
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `opendata` ;

-- -----------------------------------------------------
-- Schema opendata
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `opendata` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
USE `opendata` ;

-- -----------------------------------------------------
-- Table `opendata`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opendata`.`role` ;

CREATE TABLE IF NOT EXISTS `opendata`.`role` (
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opendata`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opendata`.`category` ;

CREATE TABLE IF NOT EXISTS `opendata`.`category` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `parent_categoty_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  INDEX `parent_category_idx` (`parent_categoty_id` ASC) VISIBLE,
  CONSTRAINT `parent_category`
    FOREIGN KEY (`parent_categoty_id`)
    REFERENCES `opendata`.`category` (`parent_categoty_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opendata`.`data`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opendata`.`data` ;

CREATE TABLE IF NOT EXISTS `opendata`.`data` (
  `data_id` INT NOT NULL AUTO_INCREMENT,
  `category_id` INT NOT NULL,
  `description` LONGTEXT NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `content` VARCHAR(45) NOT NULL,
  `format` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`data_id`, `category_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  INDEX `fk_data_category_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `fk_data_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `opendata`.`category` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opendata`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opendata`.`user` ;

CREATE TABLE IF NOT EXISTS `opendata`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `login` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `login_UNIQUE` (`login` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opendata`.`access`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opendata`.`access` ;

CREATE TABLE IF NOT EXISTS `opendata`.`access` (
  `access_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  `data_id` INT NOT NULL,
  PRIMARY KEY (`access_id`, `user_id`, `role_id`, `data_id`),
  INDEX `fk_Access_Data_idx` (`data_id` ASC) VISIBLE,
  INDEX `fk_Access_Role_idx` (`role_id` ASC) VISIBLE,
  INDEX `fk_Access_User_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_Access_Data`
    FOREIGN KEY (`data_id`)
    REFERENCES `opendata`.`data` (`data_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Access_Role`
    FOREIGN KEY (`role_id`)
    REFERENCES `opendata`.`role` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Access_User`
    FOREIGN KEY (`user_id`)
    REFERENCES `opendata`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opendata`.`tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opendata`.`tag` ;

CREATE TABLE IF NOT EXISTS `opendata`.`tag` (
  `tag_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`tag_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opendata`.`link`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opendata`.`link` ;

CREATE TABLE IF NOT EXISTS `opendata`.`link` (
  `link_id` INT NOT NULL AUTO_INCREMENT,
  `data_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`link_id`, `data_id`, `tag_id`),
  INDEX `fk_link_data_idx` (`data_id` ASC) VISIBLE,
  INDEX `fk_link_tag_idx` (`tag_id` ASC) VISIBLE,
  CONSTRAINT `fk_link_data`
    FOREIGN KEY (`data_id`)
    REFERENCES `opendata`.`data` (`data_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_link_tag`
    FOREIGN KEY (`tag_id`)
    REFERENCES `opendata`.`tag` (`tag_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `opendata`.`role`
-- -----------------------------------------------------
START TRANSACTION;
USE `opendata`;
INSERT INTO `opendata`.`role` (`role_id`, `name`) VALUES (DEFAULT, 'User');
INSERT INTO `opendata`.`role` (`role_id`, `name`) VALUES (DEFAULT, 'Admin');

COMMIT;


-- -----------------------------------------------------
-- Data for table `opendata`.`category`
-- -----------------------------------------------------
START TRANSACTION;
USE `opendata`;
INSERT INTO `opendata`.`category` (`category_id`, `name`, `parent_categoty_id`) VALUES (DEFAULT,, 'Informatics', NULL);
INSERT INTO `opendata`.`category` (`category_id`, `name`, `parent_categoty_id`) VALUES (DEFAULT,, 'Statistics', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `opendata`.`data`
-- -----------------------------------------------------
START TRANSACTION;
USE `opendata`;
INSERT INTO `opendata`.`data` (`data_id`, `category_id`, `description`, `createdAt`, `updatedAt`, `content`, `format`, `name`) VALUES (DEFAULT,, 1, 'Important tasks', '2023-02-15 15:15:15', '2023-03-15 15:15:15', 'txt', 'txt', 'Informatics');
INSERT INTO `opendata`.`data` (`data_id`, `category_id`, `description`, `createdAt`, `updatedAt`, `content`, `format`, `name`) VALUES (DEFAULT,, 2, 'Important statistics', '2024-04-18 13:17:09', '2024-04-19 13:17:09', 'xlsx', 'xlsx', 'Statistics');

COMMIT;


-- -----------------------------------------------------
-- Data for table `opendata`.`user`
-- -----------------------------------------------------
START TRANSACTION;
USE `opendata`;
INSERT INTO `opendata`.`user` (`user_id`, `firstname`, `password`, `lastname`, `email`, `login`) VALUES (DEFAULT, 'Vlad', '1234', 'Koleso', 'vald_koleso@gmail.com', 'vlad');
INSERT INTO `opendata`.`user` (`user_id`, `firstname`, `password`, `lastname`, `email`, `login`) VALUES (DEFAULT, 'Daria', '5678', 'Minze', 'minze@gmail.com', 'minze');

COMMIT;


-- -----------------------------------------------------
-- Data for table `opendata`.`access`
-- -----------------------------------------------------
START TRANSACTION;
USE `opendata`;
INSERT INTO `opendata`.`access` (`access_id`, `user_id`, `role_id`, `data_id`) VALUES (DEFAULT, 1, 1, 1);
INSERT INTO `opendata`.`access` (`access_id`, `user_id`, `role_id`, `data_id`) VALUES (DEFAULT, 2, 2, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `opendata`.`tag`
-- -----------------------------------------------------
START TRANSACTION;
USE `opendata`;
INSERT INTO `opendata`.`tag` (`tag_id`, `name`) VALUES (DEFAULT, 'informatics');
INSERT INTO `opendata`.`tag` (`tag_id`, `name`) VALUES (DEFAULT,, 'statistics');

COMMIT;


-- -----------------------------------------------------
-- Data for table `opendata`.`link`
-- -----------------------------------------------------
START TRANSACTION;
USE `opendata`;
INSERT INTO `opendata`.`link` (`link_id`, `data_id`, `tag_id`) VALUES (DEFAULT, 1, 1);
INSERT INTO `opendata`.`link` (`link_id`, `data_id`, `tag_id`) VALUES (DEFAULT, 2, 2);

COMMIT;

```

## RESTfull сервіс для управління даними

### Схема бази даних Prisma ORM

```prisma
// This is your Prisma schema file for the OpenData system
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Role {
  roleId   Int      @id @default(autoincrement()) @map("role_id")
  name     String   @unique @db.VarChar(45)
  accesses Access[]

  @@map("role")
}

model Category {
  categoryId       Int        @id @default(autoincrement()) @map("category_id")
  name             String     @unique @db.VarChar(45)
  parentCategoryId Int?       @map("parent_category_id")
  parentCategory   Category?  @relation("CategoryToCategory", fields: [parentCategoryId], references: [categoryId])
  subCategories    Category[] @relation("CategoryToCategory")
  data             Data[]

  @@index([parentCategoryId])
  @@map("category")
}

model Data {
  dataId      Int      @id @default(autoincrement()) @map("data_id")
  categoryId  Int      @map("category_id")
  description String?  @db.LongText
  createdAt   DateTime @db.DateTime(0)
  updatedAt   DateTime @db.DateTime(0)
  content     String   @db.VarChar(45)
  format      String   @db.VarChar(45)
  name        String   @unique @db.VarChar(45)
  category    Category @relation(fields: [categoryId], references: [categoryId])
  accesses    Access[]
  links       Link[]

  @@index([categoryId])
  @@map("data")
}

model User {
  userId    Int      @id @default(autoincrement()) @map("user_id")
  firstname String   @db.VarChar(45)
  password  String   @db.VarChar(255) // Increased to accommodate bcrypt hash
  lastname  String   @db.VarChar(45)
  email     String   @unique @db.VarChar(100) // Also increased email length
  login     String   @unique @db.VarChar(45)
  accesses  Access[]

  @@map("user")
}

model Access {
  accessId Int  @id @default(autoincrement()) @map("access_id")
  userId   Int  @map("user_id")
  roleId   Int  @map("role_id")
  dataId   Int  @map("data_id")
  user     User @relation(fields: [userId], references: [userId])
  role     Role @relation(fields: [roleId], references: [roleId])
  data     Data @relation(fields: [dataId], references: [dataId])

  @@index([userId])
  @@index([roleId])
  @@index([dataId])
  @@map("access")
}

model Tag {
  tagId Int    @id @default(autoincrement()) @map("tag_id")
  name  String @unique @db.VarChar(45)
  links Link[]

  @@map("tag")
}

model Link {
  linkId Int  @id @default(autoincrement()) @map("link_id")
  dataId Int  @map("data_id")
  tagId  Int  @map("tag_id")
  data   Data @relation(fields: [dataId], references: [dataId])
  tag    Tag  @relation(fields: [tagId], references: [tagId])

  @@index([dataId])
  @@index([tagId])
  @@map("link")
}
```

### Головний файл програми

```ts
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const port = process.env.PORT || 3000

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
		})
	)

	const config = new DocumentBuilder()
		.setTitle('DB-6 API')
		.setDescription('The DB-6 API description')
		.setVersion('1.0')
		.build()

	const documentFactory = () => SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api', app, documentFactory)

	await app.listen(port)

	console.info(`Started server on 127.0.0.1:${port}`)
}
bootstrap()
```

### Mодулі програми

#### Головний модуль

```ts
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ApiModule } from './api/api.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		ApiModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
```

#### Головний модуль API

```ts
import { Module } from '@nestjs/common'
import { TagModule } from './modules/tag.module'
import { UserModule } from './modules/user.module'

@Module({
	imports: [UserModule, TagModule],
})
export class ApiModule {}
```

#### User модуль

```ts
import { Module } from '@nestjs/common'
import { UserRepository } from 'src/database/repositories/user.repository'
import { UserController } from '../controllers/user.controller'
import { UserService } from '../services/user.service'
import { PrismaModule } from './prisma.module'

@Module({
	imports: [PrismaModule],
	controllers: [UserController],
	providers: [UserService, UserRepository],
	exports: [UserService],
})
export class UserModule {}
```

#### Tag модуль

```ts
import { Module } from '@nestjs/common'
import { TagRepository } from 'src/database/repositories/tag.repository'
import { TagController } from '../controllers/tag.controller'
import { TagService } from '../services/tag.service'
import { PrismaModule } from './prisma.module'

@Module({
	imports: [PrismaModule],
	controllers: [TagController],
	providers: [TagService, TagRepository],
	exports: [TagService],
})
export class TagModule {}
```

### Сервіси програми

#### User сервіс

```ts
import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { UserRepository } from 'src/database/repositories/user.repository'
import { CreateUserDto } from 'src/shared/dto/create-user.dto'
import { UpdateUserDto } from 'src/shared/dto/update-user.dto'
import { UserResponseDto } from 'src/shared/dto/user-response.dto'

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async findAll(): Promise<UserResponseDto[]> {
		const users = await this.userRepository.findAll()
		return users.map(this.mapToResponseDto)
	}

	async findOne(id: number): Promise<UserResponseDto> {
		const user = await this.userRepository.findById(id)

		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`)
		}

		return this.mapToResponseDto(user)
	}

	async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
		const existingUserByEmail = await this.userRepository.findByEmail(
			createUserDto.email
		)
		if (existingUserByEmail) {
			throw new ConflictException('Email already exists')
		}

		const existingUserByLogin = await this.userRepository.findByLogin(
			createUserDto.login
		)
		if (existingUserByLogin) {
			throw new ConflictException('Login already exists')
		}

		const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

		const user = await this.userRepository.create({
			...createUserDto,
			password: hashedPassword,
		})

		return this.mapToResponseDto(user)
	}

	async update(
		id: number,
		updateUserDto: UpdateUserDto
	): Promise<UserResponseDto> {
		const existingUser = await this.userRepository.findById(id)
		if (!existingUser) {
			throw new NotFoundException(`User with ID ${id} not found`)
		}

		if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
			const userWithEmail = await this.userRepository.findByEmail(
				updateUserDto.email
			)
			if (userWithEmail) {
				throw new ConflictException('Email already exists')
			}
		}

		if (updateUserDto.login && updateUserDto.login !== existingUser.login) {
			const userWithLogin = await this.userRepository.findByLogin(
				updateUserDto.login
			)
			if (userWithLogin) {
				throw new ConflictException('Login already exists')
			}
		}

		if (updateUserDto.password) {
			updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10)
		}

		const user = await this.userRepository.update(id, updateUserDto)
		return this.mapToResponseDto(user)
	}

	async remove(id: number): Promise<void> {
		const user = await this.userRepository.findById(id)

		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`)
		}

		await this.userRepository.delete(id)
	}

	async validateUser(
		login: string,
		password: string
	): Promise<UserResponseDto | null> {
		const user = await this.userRepository.findByLogin(login)

		if (user && (await bcrypt.compare(password, user.password))) {
			return this.mapToResponseDto(user)
		}

		return null
	}

	private mapToResponseDto(user: any): UserResponseDto {
		const { password, ...userWithoutPassword } = user
		return userWithoutPassword
	}
}
```

#### Tag сервіс

```ts
// src/services/tag.service.ts
import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { TagRepository } from 'src/database/repositories/tag.repository'
import { CreateTagDto } from 'src/shared/dto/create-tag.dto'
import { TagResponseDto } from 'src/shared/dto/response-tag.dto'
import { UpdateTagDto } from 'src/shared/dto/update-tag.dto'

@Injectable()
export class TagService {
	constructor(private readonly tagRepository: TagRepository) {}

	async findAll(): Promise<TagResponseDto[]> {
		const tags = await this.tagRepository.findAll()
		return tags.map(this.mapToResponseDto)
	}

	async findOne(id: number): Promise<TagResponseDto> {
		const tag = await this.tagRepository.findById(id)

		if (!tag) {
			throw new NotFoundException(`Tag with ID ${id} not found`)
		}

		return this.mapToResponseDto(tag)
	}

	async create(createTagDto: CreateTagDto): Promise<TagResponseDto> {
		// Check if tag name already exists
		const existingTag = await this.tagRepository.findByName(createTagDto.name)
		if (existingTag) {
			throw new ConflictException(
				`Tag with name '${createTagDto.name}' already exists`
			)
		}

		const tag = await this.tagRepository.create(createTagDto)
		return this.mapToResponseDto(tag)
	}

	async update(
		id: number,
		updateTagDto: UpdateTagDto
	): Promise<TagResponseDto> {
		const existingTag = await this.tagRepository.findById(id)
		if (!existingTag) {
			throw new NotFoundException(`Tag with ID ${id} not found`)
		}

		if (updateTagDto.name && updateTagDto.name !== existingTag.name) {
			const tagWithName = await this.tagRepository.findByName(updateTagDto.name)
			if (tagWithName) {
				throw new ConflictException(
					`Tag with name '${updateTagDto.name}' already exists`
				)
			}
		}

		const tag = await this.tagRepository.update(id, updateTagDto)
		return this.mapToResponseDto(tag)
	}

	async remove(id: number): Promise<void> {
		const tag = await this.tagRepository.findById(id)

		if (!tag) {
			throw new NotFoundException(`Tag with ID ${id} not found`)
		}

		if (tag._count.links > 0) {
			throw new ConflictException(
				`Cannot delete tag with ID ${id} because it has ${tag._count.links} associated links`
			)
		}

		await this.tagRepository.delete(id)
	}

	async search(searchTerm: string): Promise<TagResponseDto[]> {
		const tags = await this.tagRepository.search(searchTerm)
		return tags.map(tag => this.mapToResponseDto(tag))
	}

	async findWithLinks(id: number): Promise<any> {
		const tag = await this.tagRepository.findWithLinks(id)

		if (!tag) {
			throw new NotFoundException(`Tag with ID ${id} not found`)
		}

		return tag
	}

	private mapToResponseDto(tag: any): TagResponseDto {
		return {
			tagId: tag.tagId,
			name: tag.name,
			linkCount: tag._count?.links || 0,
		}
	}
}
```

### Контролери програми

#### User контролер

```ts
// src/controllers/user.controller.ts
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
	ValidationPipe,
} from '@nestjs/common'
import { CreateUserDto } from 'src/shared/dto/create-user.dto'
import { UpdateUserDto } from 'src/shared/dto/update-user.dto'
import { UserResponseDto } from 'src/shared/dto/user-response.dto'
import { UserService } from '../services/user.service'

@Controller('api/users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async findAll(): Promise<UserResponseDto[]> {
		return this.userService.findAll()
	}

	@Get(':id')
	async findOne(
		@Param('id', ParseIntPipe) id: number
	): Promise<UserResponseDto> {
		return this.userService.findOne(id)
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(
		@Body(ValidationPipe) createUserDto: CreateUserDto
	): Promise<UserResponseDto> {
		return this.userService.create(createUserDto)
	}

	@Put(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body(ValidationPipe) updateUserDto: UpdateUserDto
	): Promise<UserResponseDto> {
		return this.userService.update(id, updateUserDto)
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.userService.remove(id)
	}
}
```

#### Tag контролер

```ts
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
} from '@nestjs/common'
import { CreateTagDto } from 'src/shared/dto/create-tag.dto'
import { TagResponseDto } from 'src/shared/dto/response-tag.dto'
import { UpdateTagDto } from 'src/shared/dto/update-tag.dto'
import { TagService } from '../services/tag.service'

@Controller('api/tags')
export class TagController {
	constructor(private readonly tagService: TagService) {}

	@Get()
	async findAll(): Promise<TagResponseDto[]> {
		return this.tagService.findAll()
	}

	@Get('search')
	async search(@Query('q') searchTerm: string): Promise<TagResponseDto[]> {
		return this.tagService.search(searchTerm || '')
	}

	@Get(':id')
	async findOne(
		@Param('id', ParseIntPipe) id: number
	): Promise<TagResponseDto> {
		return this.tagService.findOne(id)
	}

	@Get(':id/links')
	async findWithLinks(@Param('id', ParseIntPipe) id: number): Promise<any> {
		return this.tagService.findWithLinks(id)
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(
		@Body(ValidationPipe) createTagDto: CreateTagDto
	): Promise<TagResponseDto> {
		return this.tagService.create(createTagDto)
	}

	@Put(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body(ValidationPipe) updateTagDto: UpdateTagDto
	): Promise<TagResponseDto> {
		return this.tagService.update(id, updateTagDto)
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.tagService.remove(id)
	}
}
```

### Репозиторії програми

#### User репозиторій

```ts
// src/repositories/user.repository.ts
import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'src/api/services/prisma.service'

@Injectable()
export class UserRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findAll(): Promise<User[]> {
		return this.prisma.user.findMany({})
	}

	async findById(userId: number): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: { userId },
		})
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: { email },
		})
	}

	async findByLogin(login: string): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: { login },
		})
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
		})
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
		})
	}

	async delete(userId: number): Promise<User> {
		return this.prisma.user.delete({
			where: { userId },
		})
	}

	async count(): Promise<number> {
		return this.prisma.user.count()
	}
}
```

#### Tag репозиторій

```ts
// src/repositories/tag.repository.ts
import { Injectable } from '@nestjs/common'
import { Prisma, Tag } from '@prisma/client'
import { PrismaService } from 'src/api/services/prisma.service'

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
		})
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
		})
	}

	async findByName(name: string): Promise<Tag | null> {
		return this.prisma.tag.findUnique({
			where: { name },
		})
	}

	async create(data: Prisma.TagCreateInput): Promise<Tag> {
		return this.prisma.tag.create({
			data,
		})
	}

	async update(tagId: number, data: Prisma.TagUpdateInput): Promise<Tag> {
		return this.prisma.tag.update({
			where: { tagId },
			data,
		})
	}

	async delete(tagId: number): Promise<Tag> {
		return this.prisma.tag.delete({
			where: { tagId },
		})
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
		})
	}

	async count(): Promise<number> {
		return this.prisma.tag.count()
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
		})
	}
}
```

### Підключення до бази даних

#### Модуль

```ts
import { Global, Module } from '@nestjs/common'
import { PrismaService } from '../services/prisma.service'

@Global()
@Module({
	providers: [PrismaService],
	exports: [PrismaService],
})
export class PrismaModule {}
```

#### Сервіс

```ts
import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient {
	constructor() {
		super({
			datasources: {
				db: {
					url: process.env.DATABASE_URL,
				},
			},
		})
	}
}
```
