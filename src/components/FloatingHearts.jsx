import { useEffect, useState } from "react"

function FloatingHeart({ id }) {
  const left = Math.random() * 95
  const delay = Math.random() * 8
  const duration = 6 + Math.random() * 6
  const size = 10 + Math.random() * 22
  const colors = ["#FF6B9D", "#FF4D8D", "#FFB3C6", "#FF9DC5", "#FF8CB5"]
  const color = colors[Math.floor(Math.random() * colors.length)]

  return (
    <div
      style={{
        position: "fixed",
        left: `${left}%`,
        bottom: "-50px",
        width: size,
        height: size,
        opacity: 0,
        animation: `floatHeart ${duration}s ${delay}s ease-in infinite`,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  )
}

export default function FloatingHearts() {
  const [hearts] = useState(() => Array.from({ length: 18 }, (_, i) => i))

  return (
    <>
      <style>{`
        @keyframes floatHeart {
          0%   { transform: translateY(0) scale(1) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.8; }
          80%  { opacity: 0.5; }
          100% { transform: translateY(-110vh) scale(0.6) rotate(20deg); opacity: 0; }
        }
      `}</style>
      {hearts.map(id => <FloatingHeart key={id} id={id} />)}
    </>
  )
}
