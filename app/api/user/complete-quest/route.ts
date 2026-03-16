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
  // Tuần 3
  { subIds: ['w3_1_pronouns', 'w3_1_suffixes', 'w3_1_jobs', 'w3_1_places', 'w3_1_age', 'w3_1_phrases', 'w3_1_kanji_nums', 'w3_1_kanji_basic'], parentId: 'w3_1' },
  { subIds: ['w3_3_food', 'w3_3_fruits', 'w3_3_veggies', 'w3_3_music', 'w3_3_school'], parentId: 'w3_3' },
  // Tuần 4
  { subIds: ['w4_1_sports', 'w4_1_weather', 'w4_1_electro', 'w4_1_house', 'w4_1_work'], parentId: 'w4_1' },
  { subIds: ['w4_3_countries', 'w4_3_travel', 'w4_3_media', 'w4_3_emotions', 'w4_3_festivals'], parentId: 'w4_3' },
  // Tuần 5-11 Vocab Hubs
  { subIds: ['w5_vocab_food', 'w5_vocab_shop', 'w5_vocab_tools', 'w5_vocab_gifts', 'w5_vocab_electronics'], parentId: 'w5_2' },
  { subIds: ['w6_vocab_emotions', 'w6_vocab_hobbies', 'w6_vocab_media', 'w6_vocab_interests', 'w6_vocab_arts'], parentId: 'w6_2' },
  { subIds: ['w7_vocab_numbers', 'w7_vocab_time', 'w7_vocab_pos', 'w7_vocab_places'], parentId: 'w7_2' },
  { subIds: ['w8_vocab_desire', 'w8_vocab_comp', 'w8_vocab_fest', 'w8_vocab_feel', 'w8_vocab_items'], parentId: 'w8_2' },
  { subIds: ['w9_vocab_jobs', 'w9_vocab_status', 'w9_vocab_daily', 'w9_vocab_house', 'w9_vocab_perm'], parentId: 'w9_2' },
  { subIds: ['w10_vocab_veggies', 'w10_vocab_fruits', 'w10_vocab_body', 'w10_vocab_must', 'w10_vocab_order'], parentId: 'w10_2' },
  { subIds: ['w11_vocab_travel', 'w11_vocab_exp', 'w11_vocab_ability', 'w11_vocab_rec', 'w11_vocab_hobby'], parentId: 'w11_2' },
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