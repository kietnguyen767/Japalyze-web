'use client';

import React, { useEffect, useState } from 'react';

// Định nghĩa kiểu dữ liệu cho cánh hoa để code rõ ràng hơn
type SakuraPetal = {
  id: number;
  left: string;
  animationDuration: string;
  animationDelay: string;
  fontSize: string;
  color: string;
  opacity: number;
   isPetal: boolean; // true = petal character, false = flower character
};

export default function SakuraEffect() {
  // 1. Khởi tạo state rỗng. Server sẽ render ra mảng rỗng (hoặc null).
  const [petals, setPetals] = useState<SakuraPetal[]>([]);

  // 2. useEffect CHỈ chạy ở Client sau khi render lần đầu
  useEffect(() => {
    const newPetals = [...Array(15)].map((_, i) => ({
      id: i,
      // Di chuyển toàn bộ logic Math.random() vào đây
      left: `${Math.random() * 100}%`,
      animationDuration: `${8 + Math.random() * 10}s`,
      animationDelay: `${Math.random() * 5}s`,
      fontSize: `${12 + Math.random() * 14}px`,
      color: Math.random() > 0.5 ? '#fbcfe8' : '#f9a8d4',
      opacity: 0.6 + Math.random() * 0.4,
      isPetal: Math.random() > 0.5,
    }));
    
    // Cập nhật state để kích hoạt render lại ở Client
    setPetals(newPetals);
  }, []);

  // Nếu chưa có dữ liệu (lúc ở server hoặc mới load), không render gì cả để tránh lệch
  if (petals.length === 0) {
    return null; 
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes sakura-fall {
          0% {
            transform: translateY(-10vh) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(100px) rotate(360deg);
            opacity: 0;
          }
        }

        .sakura {
          position: absolute;
          top: -10%;
          color: #fbcfe8;
          text-shadow: 0 0 5px rgba(255, 182, 193, 0.5);
          user-select: none;
          animation-name: sakura-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>

      {/* Render danh sách từ State thay vì tạo trực tiếp */}
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="sakura"
          style={{
            left: petal.left,
            animationDuration: petal.animationDuration,
            animationDelay: petal.animationDelay,
            fontSize: petal.fontSize,
            color: petal.color,
            opacity: petal.opacity,
          }}
        >
          {petal.isPetal ? '❀' : '🌸'}
        </div>
      ))}
    </div>
  );
}