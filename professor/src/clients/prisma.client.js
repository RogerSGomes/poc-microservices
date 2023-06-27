const { PrismaClient } = require('@prisma/client');

const prismaClient = new PrismaClient();

async function dbConnect() {
  await prismaClient.$connect();
}

async function dbDisconnect() {
  await prismaClient.$disconnect();
}

module.exports = { prismaClient, dbConnect, dbDisconnect };
