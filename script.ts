import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// const prisma = new PrismaClient({ log: ['query'] });

async function main() {
  await prisma.user.deleteMany();
  const user = await prisma.user.create({
    data: {
      name: 'John',
      email: 'john@test.com',
      age: 29,
      userPreference: {
        create: {
          emailUpdates: true,
        },
      },
    },
    // include: {
    //   userPreference: true
    // }
    select: {
      userPreference: {
        select: {
          emailUpdates: true,
        },
      },
    },
  });

  const users = await prisma.user.createMany({
    data: [
      {
        name: 'David',
        email: 'david@test.com',
        age: 26,
      },
      {
        name: 'Sally',
        email: 'sally@test.com',
        age: 22,
      },
    ],
  });

  const userFound = await prisma.user.findUnique({
    where: {
      name_age: {
        age: 26,
        name: 'David',
      },
    },
  });

  const usersFound = await prisma.user.findMany({
    where: {
      // name: 'John',
      // name: {not: "John"},
      // name: { equals: 'John' },
      // name: { in: ['John', 'David'] },
      // name: { notIn: ['John', 'David'] },
      // age: {gt: 20}
      // email: { contains: '@test.com' },
      // email: { endsWith: '.com' },
      email: { startsWith: 'jo' },
    },
    orderBy: {
      age: 'desc',
    },
    take: 2,
    skip: 1,
  });

  console.log(user);
  console.log(users);
  console.log(userFound);
}

main()
  .catch(error => {
    console.error(error.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
