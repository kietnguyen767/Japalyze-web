import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const count = await prisma.translationHistory.count()
    console.log(`Total history records: ${count}`)
    const history = await prisma.translationHistory.findMany({
        orderBy: { createdAt: 'desc' },
        take: 3
    })
    console.log(JSON.stringify(history, null, 2))
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
