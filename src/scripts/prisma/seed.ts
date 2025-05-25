// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean existing data in the correct order to avoid foreign key constraints
  await prisma.link.deleteMany();
  await prisma.access.deleteMany();
  await prisma.data.deleteMany();
  await prisma.category.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();

  // Create roles
  const userRole = await prisma.role.create({
    data: {
      name: 'User',
    },
  });

  const adminRole = await prisma.role.create({
    data: {
      name: 'Admin',
    },
  });

  // Create categories
  const informaticsCategory = await prisma.category.create({
    data: {
      name: 'Informatics',
    },
  });

  const statisticsCategory = await prisma.category.create({
    data: {
      name: 'Statistics',
    },
  });

  // Create data entries
  const informaticsData = await prisma.data.create({
    data: {
      categoryId: informaticsCategory.categoryId,
      description: 'Important tasks',
      createdAt: new Date('2023-02-15T15:15:15'),
      updatedAt: new Date('2023-03-15T15:15:15'),
      content: 'txt',
      format: 'txt',
      name: 'Informatics',
    },
  });

  const statisticsData = await prisma.data.create({
    data: {
      categoryId: statisticsCategory.categoryId,
      description: 'Important statistics',
      createdAt: new Date('2024-04-18T13:17:09'),
      updatedAt: new Date('2024-04-19T13:17:09'),
      content: 'xlsx',
      format: 'xlsx',
      name: 'Statistics',
    },
  });

  // Create users
  const vladUser = await prisma.user.create({
    data: {
      firstname: 'Vlad',
      password: '1234', // Note: In production, you should hash passwords!
      lastname: 'Koleso',
      email: 'vald_koleso@gmail.com',
      login: 'vlad',
    },
  });

  const dariaUser = await prisma.user.create({
    data: {
      firstname: 'Daria',
      password: '5678', // Note: In production, you should hash passwords!
      lastname: 'Minze',
      email: 'minze@gmail.com',
      login: 'minze',
    },
  });

  // Create access records
  await prisma.access.create({
    data: {
      userId: vladUser.userId,
      roleId: userRole.roleId,
      dataId: informaticsData.dataId,
    },
  });

  await prisma.access.create({
    data: {
      userId: dariaUser.userId,
      roleId: adminRole.roleId,
      dataId: statisticsData.dataId,
    },
  });

  // Create tags
  const informaticsTag = await prisma.tag.create({
    data: {
      name: 'informatics',
    },
  });

  const statisticsTag = await prisma.tag.create({
    data: {
      name: 'statistics',
    },
  });

  // Create links
  await prisma.link.create({
    data: {
      dataId: informaticsData.dataId,
      tagId: informaticsTag.tagId,
    },
  });

  await prisma.link.create({
    data: {
      dataId: statisticsData.dataId,
      tagId: statisticsTag.tagId,
    },
  });

  console.log('Database has been seeded successfully! 🌱');
  console.log({
    roles: await prisma.role.count(),
    categories: await prisma.category.count(),
    data: await prisma.data.count(),
    users: await prisma.user.count(),
    accesses: await prisma.access.count(),
    tags: await prisma.tag.count(),
    links: await prisma.link.count(),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
