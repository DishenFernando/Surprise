import { useState, useRef, useEffect } from "react"
import Teddy from "./components/Teddy"
import FloatingHearts from "./components/FloatingHearts"

/* ─── Birthday answer ─── */
const SECRET_MONTH = 9   // September
const SECRET_DAY   = 17
const SECRET_YEAR  = 2004

/* ─── Sparkle dots ─── */
function Sparkle({ style }) {
  return (
    <div
      style={{
        position: "absolute",
        width: 8, height: 8,
        borderRadius: "50%",
        background: "var(--gold)",
        boxShadow: "0 0 8px 3px #FFD70088",
        animation: "twinkle 2s ease-in-out infinite",
        ...style,
      }}
    />
  )
}

/* ─── Gate screen ─── */
function BirthdayGate({ onUnlock }) {
  const [month, setMonth]   = useState("")
  const [day, setDay]       = useState("")
  const [year, setYear]     = useState("")
  const [shake, setShake]   = useState(false)
  const [hint, setHint]     = useState("")

  function handleSubmit() {
    if (
      parseInt(month) === SECRET_MONTH &&
      parseInt(day)   === SECRET_DAY   &&
      parseInt(year)  === SECRET_YEAR
    ) {
      onUnlock()
    } else {
      setShake(true)
      setHint("Hmm… try again 🐾")
      setTimeout(() => setShake(false), 600)
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: 16,
    border: "2px solid #FFB3C6",
    background: "#FFF0F5",
    fontSize: 18,
    color: "var(--text-dark)",
    fontFamily: "Quicksand, sans-serif",
    fontWeight: 600,
    textAlign: "center",
    outline: "none",
    transition: "border 0.2s",
  }

  return (
    <div style={gateWrap}>
      <style>{`
        @keyframes bounceTeddy {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50%       { transform: translateY(-18px) rotate(3deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.3; transform: scale(0.5); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-10px); }
          40%       { transform: translateX(10px); }
          60%       { transform: translateX(-8px); }
          80%       { transform: translateX(8px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        input:focus { border-color: var(--rose) !important; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
      `}</style>

      {/* Sparkles */}
      <Sparkle style={{ top: "12%", left: "10%" }} />
      <Sparkle style={{ top: "20%", right: "12%", animationDelay: "0.7s" }} />
      <Sparkle style={{ bottom: "20%", left: "14%", animationDelay: "1.2s" }} />
      <Sparkle style={{ bottom: "15%", right: "10%", animationDelay: "0.4s" }} />

      <div style={{ animation: "bounceTeddy 3s ease-in-out infinite" }}>
        <Teddy size={140} />
      </div>

      <h1 style={titleStyle}>psst… something's waiting for you 🌸</h1>
      <p style={subStyle}>Enter your birthday to open it ✨</p>

      <div style={{
        display: "flex", gap: 10, width: "100%", maxWidth: 340,
        animation: shake ? "shake 0.5s ease" : "none",
      }}>
        <input
          type="number"
          placeholder="MM"
          value={month}
          onChange={e => setMonth(e.target.value)}
          style={{ ...inputStyle, flex: 1 }}
          maxLength={2}
        />
        <input
          type="number"
          placeholder="DD"
          value={day}
          onChange={e => setDay(e.target.value)}
          style={{ ...inputStyle, flex: 1 }}
          maxLength={2}
        />
        <input
          type="number"
          placeholder="YYYY"
          value={year}
          onChange={e => setYear(e.target.value)}
          style={{ ...inputStyle, flex: 2 }}
          maxLength={4}
        />
      </div>

      {hint && <p style={{ color: "var(--rose)", fontWeight: 600, marginTop: 8 }}>{hint}</p>}

      <button
        onClick={handleSubmit}
        style={btnStyle}
        onMouseEnter={e => e.target.style.transform = "scale(1.07)"}
        onMouseLeave={e => e.target.style.transform = "scale(1)"}
      >
        Open the surprise 🎀
      </button>
    </div>
  )
}

/* ─── Reveal screen ─── */
function SurpriseReveal() {
  const audioRef  = useRef(null)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    // Auto-play music when page loads
    if (audioRef.current) {
      audioRef.current.volume = 0.4
      audioRef.current.play().catch(() => {})
    }
  }, [])

  function toggleMute() {
    if (audioRef.current) {
      audioRef.current.muted = !muted
      setMuted(!muted)
    }
  }

  const messages = [
    { emoji: "🌸", text: "You are someone truly special." },
    { emoji: "✨", text: "The kind of person who makes ordinary days feel magic." },
    { emoji: "💌", text: "Someone has been wanting to tell you this for a long time." },
    { emoji: "🐾", text: "He's a little shy, and maybe a little obvious about it…" },
    { emoji: "🌹", text: "But he hope, with all his heart, you give him one small chance." },
    { emoji: "💬", text: "Just… one conversation. That's all he's asking for. 🥺" },
  ]

  return (
    <div style={revealWrap}>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.3; transform: scale(0.5); }
        }
        @keyframes floatSide {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50%       { transform: translateY(-22px) rotate(5deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.5); }
          70%  { transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          14%  { transform: scale(1.2); }
          28%  { transform: scale(1); }
          42%  { transform: scale(1.15); }
          70%  { transform: scale(1); }
        }
      `}</style>

      {/* Background music */}
      <audio ref={audioRef} loop>
        {/* Replace src with your mp3 URL or put music.mp3 in /public folder */}
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {/* Mute button */}
      <button
        onClick={toggleMute}
        style={{
          position: "fixed", top: 20, right: 20,
          background: "white", border: "2px solid var(--pink)",
          borderRadius: 50, width: 44, height: 44,
          fontSize: 20, display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 99,
          boxShadow: "0 4px 12px #FFB3C633",
          cursor: "pointer", transition: "transform 0.2s",
        }}
        onMouseEnter={e => e.target.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.target.style.transform = "scale(1)"}
      >
        {muted ? "🔇" : "🎵"}
      </button>

      <FloatingHearts />

      {/* Sparkles */}
      <Sparkle style={{ top: "8%",  left: "8%" }} />
      <Sparkle style={{ top: "15%", right: "10%", animationDelay: "0.5s" }} />
      <Sparkle style={{ top: "50%", left: "4%",   animationDelay: "1s" }} />
      <Sparkle style={{ bottom: "20%", right: "7%", animationDelay: "1.5s" }} />

      {/* Header */}
      <div style={{ textAlign: "center", animation: "popIn 0.8s ease forwards" }}>
        <div style={{ fontSize: 52, animation: "heartbeat 2s ease-in-out infinite" }}>🌸</div>
        <h1 style={{ ...titleStyle, fontSize: "clamp(28px, 6vw, 42px)", marginTop: 12 }}>
          Hey, you…
        </h1>
        <p style={{ ...subStyle, fontSize: 16, maxWidth: 320 }}>
          Someone left this little note just for you.
        </p>
      </div>

      {/* Teddies */}
      <div style={{ display: "flex", gap: 30, alignItems: "flex-end", marginBottom: 10 }}>
        <div style={{ animation: "floatSide 3s ease-in-out infinite" }}>
          <Teddy size={110} />
        </div>
        <div style={{ animation: "floatSide 3.5s 0.5s ease-in-out infinite" }}>
          <Teddy size={90} />
        </div>
      </div>

      {/* Message cards */}
      <div style={cardsWrap}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...cardStyle,
              animation: `fadeInUp 0.6s ${0.3 + i * 0.2}s ease both`,
            }}
          >
            <span style={{ fontSize: 26 }}>{msg.emoji}</span>
            <p style={{ fontFamily: "Dancing Script, cursive", fontSize: 21, color: "var(--text-dark)", lineHeight: 1.5 }}>
              {msg.text}
            </p>
          </div>
        ))}
      </div>

      {/* Closing */}
      <div style={{
        textAlign: "center",
        animation: "fadeInUp 0.6s 1.8s ease both",
        opacity: 0,
        maxWidth: 360,
      }}>
        <p style={{ fontFamily: "Dancing Script, cursive", fontSize: 26, color: "var(--rose)", lineHeight: 1.6 }}>
          You deserve to be told how wonderful you are. 💕
        </p>
        <p style={{ color: "var(--text-mid)", fontSize: 15, marginTop: 12, fontWeight: 500 }}>
          — with love, from someone nearby 🐾
        </p>
      </div>

    </div>
  )
}

/* ─── Root App ─── */
export default function App() {
  const [unlocked, setUnlocked] = useState(false)

  return unlocked ? <SurpriseReveal /> : <BirthdayGate onUnlock={() => setUnlocked(true)} />
}

/* ─── Shared styles ─── */
const gateWrap = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 22,
  padding: "40px 24px",
  background: "linear-gradient(160deg, #FFF0F8 0%, #FFF5F0 50%, #FFF0F8 100%)",
  position: "relative",
  overflow: "hidden",
}

const revealWrap = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: 28,
  padding: "50px 24px 80px",
  background: "linear-gradient(160deg, #FFF0F8 0%, #FFF9F5 50%, #FFF0F8 100%)",
  position: "relative",
  overflow: "hidden",
}

const titleStyle = {
  fontFamily: "Dancing Script, cursive",
  fontSize: "clamp(28px, 6vw, 38px)",
  color: "var(--text-dark)",
  textAlign: "center",
  lineHeight: 1.3,
}

const subStyle = {
  color: "var(--text-mid)",
  fontSize: 15,
  textAlign: "center",
  fontWeight: 500,
  maxWidth: 280,
}

const btnStyle = {
  background: "linear-gradient(135deg, #FF6B9D, #FF4D8D)",
  color: "white",
  border: "none",
  borderRadius: 50,
  padding: "16px 40px",
  fontSize: 17,
  fontWeight: 700,
  fontFamily: "Quicksand, sans-serif",
  cursor: "pointer",
  boxShadow: "0 8px 24px #FF6B9D55",
  transition: "transform 0.2s",
  marginTop: 6,
}

const cardsWrap = {
  display: "flex",
  flexDirection: "column",
  gap: 14,
  width: "100%",
  maxWidth: 400,
}

const cardStyle = {
  background: "rgba(255,255,255,0.85)",
  backdropFilter: "blur(12px)",
  borderRadius: 20,
  padding: "18px 22px",
  display: "flex",
  alignItems: "center",
  gap: 14,
  boxShadow: "0 4px 20px #FFB3C622",
  border: "1.5px solid #FFD6E888",
  opacity: 0,
}
