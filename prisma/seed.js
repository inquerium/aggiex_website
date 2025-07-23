import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('inquerium-GodSaveMe3$', 10);
  await prisma.user.upsert({
    where: { username: 'ruzimane' },
    update: {},
    create: { username: 'ruzimane', password: hash },
  });
  console.log('Admin user seeded!');
}

main().catch(e => { throw e }).finally(() => prisma.$disconnect()); 