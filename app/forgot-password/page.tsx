'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Loader2, Send, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                setSubmitted(true);
            } else {
                const contentType = res.headers.get('content-type');
                let data: any = {};

                if (contentType && contentType.includes('application/json')) {
                    data = await res.json();
                    setError(data.message || 'Đã xảy ra lỗi');
                } else {
                    const text = await res.text();
                    console.error('❌ Non-JSON response:', text);
                    setError(`Server Error: ${res.status}`);
                }
            }
        } catch (err) {
            console.error('Forgot password submission error:', err);
            setError('Lỗi kết nối server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-10 animate-fade-in-up">

                <Link href="/login" className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors mb-8 font-medium text-sm group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Quay lại đăng nhập
                </Link>

                {submitted ? (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800 mb-4">Kiểm tra Email của bạn</h1>
                        <p className="text-slate-600 mb-8">
                            Chúng tôi đã gửi hướng dẫn khôi phục mật khẩu đến <strong>{email}</strong>.
                            Vui lòng kiểm tra hộp thư (và cả thư rác).
                        </p>
                        <Link
                            href="/login"
                            className="block w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
                        >
                            Về trang đăng nhập
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-slate-800 mb-2">Quên mật khẩu?</h1>
                            <p className="text-slate-500">Nhập email của bạn để nhận liên kết khôi phục mật khẩu.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Email tài khoản</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="email"
                                        placeholder="name@example.com"
                                        className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <><Send size={20} /> Gửi yêu cầu</>}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
