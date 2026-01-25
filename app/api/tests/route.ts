import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const tests = await prisma.mockTest.findMany({
      select: {
        id: true,
        title: true,
        level: true,
        duration: true,
        isPremium: true, // <--- QUAN TRỌNG: Cần lấy trường này để Frontend hiện ổ khóa
        _count: { select: { questions: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(tests);
  } catch (error) {
    console.error("Fetch Tests Error:", error);
    return NextResponse.json({ error: "Lỗi tải dữ liệu" }, { status: 500 });
  }
}