"use client";
import { GhostBtn, IconBtn } from "./Primitives";

export function Topbar({
  dark, setDark, onHome, onBook, current,
}: {
  dark: boolean;
  setDark: (fn: (d: boolean) => boolean) => void;
  onHome: () => void;
  onBook: () => void;
  current?: string;
}) {
  const nav: React.CSSProperties = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    background: dark ? "rgba(15,17,23,.88)" : "rgba(240,242,248,.88)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid var(--border)",
    padding: "0 24px", height: 60,
    display: "flex", alignItems: "center", justifyContent: "space-between",
  };
  return (
    <nav style={nav}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={onHome}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, background: "var(--accent)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
        }}>✦</div>
        <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.5px" }}>ApptFlow</span>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <GhostBtn small onClick={onHome}  active={current === "home"}>Home</GhostBtn>
        <GhostBtn small onClick={onBook}  active={current === "book"}>Book Now</GhostBtn>
        {/* Admin link intentionally removed from public nav — visit /admin directly */}
        <IconBtn onClick={() => setDark(d => !d)}>{dark ? "☀️" : "🌙"}</IconBtn>
      </div>
    </nav>
  );
}
