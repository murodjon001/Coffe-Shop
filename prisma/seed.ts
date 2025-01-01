import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(process.env.SUPER_USER_PASSWORD, salt);

    await prisma.superuser.create({
      data: {
        password: hash,
        name: process.env.SUPER_USER_NAME,
        surname: process.env.SUPER_USER_SURNAME,
        phone: process.env.SUPER_USER_PHONE,
      },
    });
  } catch (err) {
    console.error(err);
  }
}

main();
