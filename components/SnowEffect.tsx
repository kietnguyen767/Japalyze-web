// components/SnowEffect.tsx
export default function SnowEffect() {
  return (
    <div className="fixed bg-white inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) translateX(-10px); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(100vh) translateX(10px); opacity: 0; }
        }
        .snowflake {
          position: absolute;
          top: -10%;
          color: #bfdbfe;
          font-size: 1em;
          opacity: 0.8;
          animation: fall linear infinite;
        }
      `}</style>

      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${10 + Math.random() * 20}px`,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
}
