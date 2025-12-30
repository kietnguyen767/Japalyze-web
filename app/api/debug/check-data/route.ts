import { NextResponse } from 'next/server';
import redis from '@/lib/redis';

export async function GET() {
  try {
    // 1. Lấy mẫu 1 User bất kỳ
    const userKeys = await redis.keys('user:*');
    let sampleUser = null;
    if (userKeys.length > 0) {
        sampleUser = await redis.hgetall(userKeys[0]); // Hoặc redis.get(userKeys[0]) tùy cách bạn lưu
    }

    // 2. Lấy mẫu Decks của user đó (nếu có)
    let sampleDecks = null;
    let sampleProgress = null;
    if (userKeys.length > 0) {
        const email = userKeys[0].replace('user:', '');
        
        const decksData = await redis.get(`decks:${email}`);
        sampleDecks = typeof decksData === 'string' ? JSON.parse(decksData) : decksData;

        const progressData = await redis.get(`exercise_progress:${email}`);
        sampleProgress = typeof progressData === 'string' ? JSON.parse(progressData) : progressData;
    }

    // 3. Lấy mẫu Community Posts
    const postsData = await redis.get('community:posts'); // Hoặc key bạn dùng
    const samplePosts = typeof postsData === 'string' ? JSON.parse(postsData) : postsData;

    return NextResponse.json({
      SAMPLE_USER: sampleUser,
      SAMPLE_DECKS: sampleDecks ? sampleDecks.slice(0, 1) : "Không có deck", // Chỉ lấy 1 deck mẫu
      SAMPLE_POSTS: samplePosts ? samplePosts.slice(0, 1) : "Không có bài viết", // Chỉ lấy 1 bài mẫu
      SAMPLE_PROGRESS: sampleProgress
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: JSON.stringify(error) });
  }
}