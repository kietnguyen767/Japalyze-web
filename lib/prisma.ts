const { PrismaClient, Prisma } = require('@prisma/client');

const globalForPrisma = global as unknown as { prisma: any; Prisma: any };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query'],
    });

export const PrismaHelper = Prisma;

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
    globalForPrisma.Prisma = Prisma;
}

export default prisma;