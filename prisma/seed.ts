import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(process.env.ADMINISTRATOR_PASSWORD, salt);
    await prisma.administrator.create({
      data: {
        password: hash,
        name: process.env.ADMINISTRATOR_NAME,
        surname: process.env.ADMINISTRATOR_SURNAME,
        phone: process.env.ADMINISTRATOR_PHONE,
      },
    });
  } catch (err) {
    console.error(err);
  }
}

main();
