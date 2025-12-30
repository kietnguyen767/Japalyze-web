// app/page.tsx
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  const features = [
    { title: "Flashcard Thông Minh", desc: "Tự động lặp lại ngắt quãng (SRS) giúp nhớ từ vựng vĩnh viễn.", emoji: "🎴" },
    { title: "Roleplay AI", desc: "Đóng vai gọi món, hỏi đường, phỏng vấn xin việc với AI.", emoji: "🎭" },
    { title: "Learning Path", desc: "Lộ trình học tập cá nhân hóa từ N5 đến N1.", emoji: "🗺️" },
    { title: "Dịch Thông Minh", desc: "Dịch thuật chính xác với AI, kèm giải thích ngữ pháp.", emoji: "💬" },
    { title: "Bài Tập Thực Hành", desc: "Hơn 5000 câu hỏi luyện thi JLPT.", emoji: "📝" },
    { title: "Cộng Đồng Học Tập", desc: "Kết nối và chia sẻ kinh nghiệm học tập.", emoji: "⚔️" }
  ];

  return (
    <div className="min-h-screen  text-slate-600 selection:bg-blue-100 selection:text-blue-700 relative">
      
      {/* Navbar - Đảm bảo z-index cao hơn nền */}
      <div className="relative z-10">
        <Navbar />
      </div>

      <main className="">
        {/* === HERO SECTION === */}
        <section className="pt-20 px-4 relative overflow-hidden">
          <div className="container mx-auto max-w-6xl text-center relative">
            {/* Background Blur Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-100 to-sky-100 rounded-full blur-3xl -z-10 opacity-40"></div>

            <div className="inline-block mb-6">
              <span className="bg-gradient-to-r from-blue-50 to-sky-50 text-blue-600 px-5 py-2 rounded-full text-sm font-semibold border border-blue-200 shadow-sm inline-flex items-center gap-2 animate-pulse">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
                ✨ Phiên bản AI 2.0 mới ra mắt
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              Học tiếng Nhật <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 animate-gradient">
                Thông minh hơn với AI
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              JapaLyze giúp bạn chinh phục JLPT từ N5 đến N1. 
              Lộ trình cá nhân hóa, hội thoại thực tế và sửa lỗi tức thì.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full text-lg font-bold shadow-xl shadow-blue-200 transition-all hover:-translate-y-1 hover:shadow-2xl">
                Học thử miễn phí ngay
              </button>
              <button className="w-full sm:w-auto px-10 py-4 bg-white text-blue-600 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 rounded-full text-lg font-semibold transition-all">
                Tìm hiểu phương pháp
              </button>
            </div>
          </div>
        </section>

        {/* === GRID TÍNH NĂNG CHI TIẾT === */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-10 text-slate-900">Tính Năng Nổi Bật</h2>
          <p className="text-center text-gray-600 mx-auto mb-12 max-w-2xl">
            Học tiếng Nhật hiệu quả với công nghệ AI tiên tiến và phương pháp giảng dạy hiện đại
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-xl shadow-md border border-gray-200 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 relative"
              >
                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {item.emoji}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-blue-500 transition-all duration-300 group-hover:w-3/4 rounded-full"></span>
              </div>
            ))}
          </div>
        </section>

        {/* === CTA SECTION === */}
        <section className="text-center py-16 border-t border-slate-100">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">Sẵn sàng bắt đầu hành trình học tiếng Nhật? 🚀</h2>
          <p className="text-gray-700 mb-8">Đăng ký ngay để trải nghiệm miễn phí!</p>
          <Link href="/register" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg shadow-md transition-colors">
            Đăng ký ngay →
          </Link>
        </section>

        {/* === FOOTER === */}
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 text-center md:text-left">
              
              {/* Cột trái: Giới thiệu & Social */}
              <div className="flex flex-col md:pl-16">
                <h2 className="text-3xl font-bold text-white mb-4">JapaLyze</h2>
                <p className="text-slate-400 leading-relaxed mb-8 pr-0 md:pr-12">
                  Nền tảng học tiếng Nhật thông minh với AI, giúp bạn chinh phục JLPT và giao tiếp tự tin trong mọi tình huống.
                </p>

                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Kết nối với chúng tôi</h3>
                  <div className="flex items-center justify-center md:justify-start space-x-4">
                    {/* Facebook */}
                    <a href="#" className="p-3 bg-slate-800 text-slate-400 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                    </a>
                    {/* TikTok */}
                    <a href="#" className="p-3 bg-slate-800 text-slate-400 rounded-full hover:bg-black hover:text-white transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v8.88c-.08 3.01-2.61 5.43-5.63 5.43-3.21 0-5.81-2.6-5.81-5.81 0-3.21 2.6-5.81 5.81-5.81.7.01 1.4.14 2.05.4v4.13c-.34-.16-.71-.23-1.09-.23-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5c1.38 0 2.5-1.12 2.5-2.5v-16.55z"/></svg>
                    </a>
                    {/* YouTube */}
                    <a href="#" className="p-3 bg-slate-800 text-slate-400 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Cột phải: Liên kết */}
              <div className="md:pl-16">
                <h3 className="text-lg font-bold text-white mb-6">Liên kết nhanh</h3>
                <div className="flex flex-col space-y-4 text-base">
                  {['Về chúng tôi', 'Khóa học AI', 'Blog chia sẻ', 'Chính sách & Điều khoản', 'Trung tâm trợ giúp'].map((link) => (
                    <a key={link} href="#" className="hover:text-blue-400 transition-colors w-fit mx-auto md:mx-0">
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
              © {new Date().getFullYear()} JapaLyze. Nền tảng học tiếng Nhật thông minh Việt Nam.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}