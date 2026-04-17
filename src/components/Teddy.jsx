/* Teddy.jsx - A cute SVG teddy bear */
export default function Teddy({ size = 120, style = {}, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
    >
      {/* Ears */}
      <circle cx="52" cy="62" r="26" fill="#C8906A" />
      <circle cx="148" cy="62" r="26" fill="#C8906A" />
      <circle cx="52" cy="62" r="16" fill="#E8B090" />
      <circle cx="148" cy="62" r="16" fill="#E8B090" />

      {/* Body */}
      <ellipse cx="100" cy="160" rx="56" ry="55" fill="#D4956A" />

      {/* Head */}
      <circle cx="100" cy="95" r="54" fill="#D4956A" />

      {/* Face patch */}
      <ellipse cx="100" cy="108" rx="28" ry="22" fill="#E8B090" />

      {/* Eyes */}
      <circle cx="82" cy="86" r="8" fill="#3D1C00" />
      <circle cx="118" cy="86" r="8" fill="#3D1C00" />
      <circle cx="85" cy="83" r="3" fill="white" />
      <circle cx="121" cy="83" r="3" fill="white" />

      {/* Nose */}
      <ellipse cx="100" cy="100" rx="7" ry="5" fill="#3D1C00" />

      {/* Mouth */}
      <path d="M 92 107 Q 100 115 108 107" stroke="#3D1C00" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Belly */}
      <ellipse cx="100" cy="160" rx="30" ry="28" fill="#E8B090" />

      {/* Arms */}
      <ellipse cx="52" cy="148" rx="18" ry="30" fill="#D4956A" transform="rotate(-15 52 148)" />
      <ellipse cx="148" cy="148" rx="18" ry="30" fill="#D4956A" transform="rotate(15 148 148)" />

      {/* Legs */}
      <ellipse cx="76" cy="205" rx="20" ry="16" fill="#D4956A" />
      <ellipse cx="124" cy="205" rx="20" ry="16" fill="#D4956A" />

      {/* Little heart on belly */}
      <path d="M 100 155 C 100 155 94 148 91 151 C 88 154 91 160 100 166 C 109 160 112 154 109 151 C 106 148 100 155 100 155 Z" fill="#FF6B9D" />
    </svg>
  )
}
