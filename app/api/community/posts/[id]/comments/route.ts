import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserId } from '@/lib/get-user';
export const dynamic = 'force-dynamic';
// GET: Lấy bình luận của 1 bài viết
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: id },
      orderBy: { createdAt: 'desc' }, // Mới nhất lên đầu
      include: {
        user: {
            select: { name: true, avatar: true, email: true }
        }
      }
    });
    console.log("✅ Loaded", comments.length, "comments for post:", id);
    return NextResponse.json(comments);
  } catch (error) {
    console.error("❌ Comments GET Error:", error);
    return NextResponse.json({ error: 'Lỗi tải bình luận', details: String(error) }, { status: 500 });
  }
}

// POST: Gửi bình luận mới
export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const userId = await getUserId();
    console.log("🔍 Comment request - userId:", userId, "postId:", id);
    
    if (!userId) {
      console.error("❌ No userId - user not logged in");
      return NextResponse.json({ error: 'Vui lòng đăng nhập' }, { status: 401 });
    }

    try {
        const { content } = await request.json();
        if (!content || content.trim().length === 0) {
          console.error("❌ Empty content");
          return NextResponse.json({ error: 'Nội dung trống' }, { status: 400 });
        }

        const postId = id;
        if (!postId) {
          console.error("❌ No postId provided");
          return NextResponse.json({ error: 'Post ID không hợp lệ' }, { status: 400 });
        }

        const newComment = await prisma.comment.create({
            data: {
                content,
                postId,
                userId
            },
            // Trả về kèm thông tin user để Frontend hiển thị ngay lập tức
            include: {
                user: { select: { name: true, avatar: true, email: true } } 
            }
        });

        console.log("✅ Created comment for post:", id);
        return NextResponse.json(newComment);

    } catch (error: any) {
        console.error("❌ Comments POST Error:", error.message);
        console.error("Full error:", error);
        return NextResponse.json({ error: 'Lỗi bình luận', details: error.message }, { status: 500 });
    }
}