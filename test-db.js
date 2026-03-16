
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
    try {
        console.log("Testing connection...");
        const users = await prisma.user.findMany({ take: 1 });
        console.log("Success! Found " + users.length + " users.");
        if (users.length > 0) {
            console.log("Sample user ID:", users[0].id);
        }

        const entries = await prisma.dictionaryEntry.count();
        console.log("Dictionary entries count:", entries);
    } catch (err) {
        console.error("DATABASE CONNECTION ERROR:", err.message);
        console.error("Error code:", err.code);
    } finally {
        await prisma.$disconnect();
    }
}

test();
