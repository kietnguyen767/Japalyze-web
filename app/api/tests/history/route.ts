import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/get-user";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const history = await prisma.testResult.findMany({
      where: { userId },
      include: {
        test: {
          select: {
            title: true,
            level: true,
            duration: true,
          }
        }
      },
      orderBy: { completedAt: 'desc' } // Mới nhất lên đầu
    });

    return NextResponse.json(history);
  } catch (error) {
    console.error("History error:", error);
    return NextResponse.json({ error: "Lỗi tải lịch sử" }, { status: 500 });
  }
}