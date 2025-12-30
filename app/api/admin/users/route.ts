import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserId } from '@/lib/get-user';

// GET: Lấy danh sách tất cả User (Code Prisma Mới)
export async function GET() {
  try {
    // 1. Check quyền (Phải là Admin mới được xem)
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Not authenticated', users: [] }, { status: 401 });

    // 2. Kiểm tra xem user có phải Admin không
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    if (user?.role !== 'admin') {
      return NextResponse.json({ error: 'Not authorized - Admin only', users: [] }, { status: 403 });
    } 

    // 2. Lấy dữ liệu từ PostgreSQL
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }, // Người mới nhất lên đầu
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isPremium: true,
        createdAt: true,
      }
    });

    // 3. Trả về đúng định dạng { users: [...] }
    return NextResponse.json({ users });

  } catch (error) {
    console.error("Admin Users Error:", error);
    return NextResponse.json({ users: [] }); 
  }
}

// DELETE: Xóa User (Code Prisma Mới)
export async function DELETE(request: Request) {
  try {
    // 1. Check authentication
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

    // 2. Check authorization (Admin only)
    const admin = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });
    
    if (admin?.role !== 'admin') {
      return NextResponse.json({ error: 'Not authorized - Admin only' }, { status: 403 });
    }

    const { email } = await request.json();
    
    // 3. Xóa user theo email
    await prisma.user.delete({ where: { email } });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete User Error:", error);
    return NextResponse.json({ error: 'Lỗi xóa', details: String(error) }, { status: 500 });
  }
}

// PATCH: Cập nhật Role/Premium (Code Prisma Mới)
export async function PATCH(request: Request) {
  try {
    // 1. Check authentication
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

    // 2. Check authorization (Admin only)
    const admin = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });
    
    if (admin?.role !== 'admin') {
      return NextResponse.json({ error: 'Not authorized - Admin only' }, { status: 403 });
    }

    const { email, role, type, value } = await request.json();
    
    // 3. Tìm user xem có tồn tại không
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // 4. Update Premium
    if (type === 'premium') {
        await prisma.user.update({
            where: { email },
            data: { isPremium: value } // value là true/false
        });
    } 
    // 5. Update Role (admin/user)
    else if (role) {
        await prisma.user.update({
            where: { email },
            data: { role } 
        });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update User Error:", error);
    return NextResponse.json({ error: 'Lỗi update', details: String(error) }, { status: 500 });
  }
}