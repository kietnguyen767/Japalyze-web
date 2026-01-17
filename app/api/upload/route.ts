import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';
import fs from 'fs';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: "Không có file nào được tải lên" }, { status: 400 });
    }

    // 1. Chuyển file thành Buffer để lưu
    const buffer = Buffer.from(await file.arrayBuffer());

    // 2. Tạo tên file mới (tránh trùng tên)
    // Ví dụ: image.jpg -> 1705632000_image.jpg
    const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
    
    // 3. Định nghĩa đường dẫn lưu (Lưu vào public/images/reading)
    // Đảm bảo bạn đã tạo thư mục này: public/images/reading
    const uploadDir = path.join(process.cwd(), "public/images/reading");
    
    // Tạo thư mục nếu chưa có
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);

    // 4. Ghi file vào ổ cứng
    await writeFile(filePath, buffer);

    // 5. Trả về đường dẫn để lưu vào DB
    const fileUrl = `/images/reading/${filename}`;
    
    return NextResponse.json({ url: fileUrl });

  } catch (error) {
    console.error("Lỗi upload:", error);
    return NextResponse.json({ error: "Upload thất bại" }, { status: 500 });
  }
}