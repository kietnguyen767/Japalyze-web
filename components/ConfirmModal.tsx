'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
}

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Xác nhận',
    cancelText = 'Hủy',
    variant = 'danger'
}: ConfirmModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
                    >
                        {/* Header / Icon */}
                        <div className={`p-6 flex flex-col items-center text-center ${variant === 'danger' ? 'bg-red-50' : variant === 'warning' ? 'bg-yellow-50' : 'bg-blue-50'
                            }`}>
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm ${variant === 'danger' ? 'bg-red-100 text-red-600' :
                                    variant === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                                        'bg-blue-100 text-blue-600'
                                }`}>
                                <AlertCircle size={32} />
                            </div>
                            <h3 className="text-xl font-black text-slate-800 tracking-tight leading-tight">
                                {title}
                            </h3>
                        </div>

                        {/* Body */}
                        <div className="p-8 text-center text-slate-600 font-medium">
                            <p className="leading-relaxed">
                                {message}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="p-6 pt-0 flex gap-3">
                            <button
                                onClick={onClose}
                                className="flex-1 px-6 py-3.5 rounded-2xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all active:scale-95"
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                className={`flex-1 px-6 py-3.5 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-95 ${variant === 'danger' ? 'bg-gradient-to-r from-red-500 to-rose-600 hover:shadow-red-200' :
                                        variant === 'warning' ? 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:shadow-yellow-200' :
                                            'bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-blue-200'
                                    }`}
                            >
                                {confirmText}
                            </button>
                        </div>

                        {/* Close Button (Top Corner) */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
                        >
                            <X size={20} />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
