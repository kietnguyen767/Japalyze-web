import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import redis from '@/lib/redis';

// ── Định nghĩa nhóm: khi tất cả sub-quest trong nhóm hoàn thành
//    thì tự động mark quest cha (parentId) ──────────────────────
const QUEST_GROUPS: { subIds: string[]; parentId: string }[] = [
  // Tuần 1: Khi xong 2 bài tập phụ -> Mark xong quest 'w1_3' (Hira: Luyện tập)
  { subIds: ['prac_hira', 'prac_hira_daku'], parentId: 'w1_3' },
  // Tuần 2: Khi xong 2 bài tập phụ -> Mark xong quest 'w2_3' (Kata: Luyện tập)
  { subIds: ['prac_kata', 'prac_kata_daku'], parentId: 'w2_3' },
];

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;
    const userId = await redis.get(`session:${token}`);

    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { questId } = await request.json();
    if (!questId) return NextResponse.json({ error: 'Missing questId' }, { status: 400 });

    // Lưu quest (bỏ qua nếu đã tồn tại)
    try {
      await prisma.userProgress.create({
        data: { userId: userId as string, questId }
      });
    } catch (_) { /* unique constraint – bỏ qua */ }

    // ── Kiểm tra tự động hoàn thành quest cha ──────────────────
    const group = QUEST_GROUPS.find(g => g.subIds.includes(questId));
    if (group) {
      // Lấy tất cả quest đã hoàn thành của user
      const completed = await prisma.userProgress.findMany({
        where: { userId: userId as string },
        select: { questId: true }
      });
      const completedSet = new Set(completed.map(c => c.questId));

      // Nếu toàn bộ sub-quest đã done → mark quest cha
      const allDone = group.subIds.every(id => completedSet.has(id));
      if (allDone && !completedSet.has(group.parentId)) {
        try {
          await prisma.userProgress.create({
            data: { userId: userId as string, questId: group.parentId }
          });
        } catch (_) { /* đã tồn tại */ }
      }
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}