import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserId } from '@/lib/get-user';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = await getUserId();
  console.log("🔍 Like request - userId:", userId, "postId:", id);
  
  if (!userId) {
    console.error("❌ No userId - user not logged in");
    return NextResponse.json({ error: 'Vui lòng đăng nhập' }, { status: 401 });
  }

  const postId = id;
  
  if (!postId) {
    console.error("❌ No postId provided");
    return NextResponse.json({ error: 'Post ID không hợp lệ' }, { status: 400 });
  }

  try {
    // 1. Kiểm tra xem đã like chưa (Dựa vào cặp khóa unique postId + userId)
    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId
        }
      }
    });

    if (existingLike) {
      // --- NẾU ĐÃ LIKE RỒI -> XÓA (UNLIKE) ---
      await prisma.like.delete({
        where: {
          postId_userId: { postId, userId }
        }
      });
      console.log("✅ Unlike post:", postId);
      return NextResponse.json({ status: 'unliked' });
    } else {
      // --- NẾU CHƯA LIKE -> TẠO MỚI (LIKE) ---
      await prisma.like.create({
        data: {
          postId,
          userId
        }
      });
      console.log("✅ Liked post:", postId);
      return NextResponse.json({ status: 'liked' });
    }

  } catch (error: any) {
    console.error("❌ Like Error:", error.message);
    console.error("Full error:", error);
    return NextResponse.json({ error: 'Lỗi xử lý like', details: error.message }, { status: 500 });
  }
}