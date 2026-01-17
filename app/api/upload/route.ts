import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// 1. Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    // 2. Lấy file từ FormData
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: "Không tìm thấy file" }, { status: 400 });
    }

    // 3. Chuyển File object thành Buffer để Cloudinary hiểu được
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 4. Upload lên Cloudinary (Dùng Promise để wrap hàm upload_stream)
    const uploadResult: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'japaweb-reading', // Tên thư mục trên Cloudinary (tự đặt)
          resource_type: 'auto',     // Tự động nhận diện ảnh/video
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      // Ghi buffer vào stream upload
      uploadStream.end(buffer);
    });

    // 5. Trả về đường dẫn ảnh online (secure_url là link https)
    return NextResponse.json({ 
        url: uploadResult.secure_url 
    });

  } catch (error) {
    console.error("Lỗi upload Cloudinary:", error);
    return NextResponse.json({ error: "Upload thất bại" }, { status: 500 });
  }
}