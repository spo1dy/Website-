"use client";
import { useState } from "react";

// ── PrimaryBtn ────────────────────────────────────────────────────────────────
export function PrimaryBtn({
  children, onClick, large, small, fullWidth, disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  large?: boolean; small?: boolean; fullWidth?: boolean; disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={e => { if (!disabled) (e.currentTarget as HTMLButtonElement).style.opacity = ".82"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        background: "var(--accent)", color: "#fff",
        border: "1px solid transparent", borderRadius: "var(--radius-sm)",
        fontFamily: "inherit", fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1, transition: "opacity .18s",
        fontSize: large ? 15 : small ? 13 : 14,
        padding: large ? "12px 24px" : small ? "7px 14px" : "9px 18px",
        width: fullWidth ? "100%" : "auto",
      }}
    >{children}</button>
  );
}

// ── GhostBtn ──────────────────────────────────────────────────────────────────
export function GhostBtn({
  children, onClick, large, small, fullWidth, active,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  large?: boolean; small?: boolean; fullWidth?: boolean; active?: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        background: (hov || active) ? "var(--surface2)" : "transparent",
        color: "var(--text)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)",
        fontFamily: "inherit", fontWeight: 600, cursor: "pointer", transition: "background .18s",
        fontSize: large ? 15 : small ? 13 : 14,
        padding: large ? "12px 24px" : small ? "7px 14px" : "9px 18px",
        width: fullWidth ? "100%" : "auto",
      }}
    >{children}</button>
  );
}

// ── DangerBtn ─────────────────────────────────────────────────────────────────
export function DangerBtn({ children, onClick, fullWidth }: {
  children: React.ReactNode; onClick?: () => void; fullWidth?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        background: "rgba(239,68,68,.1)", color: "var(--danger)",
        border: "1px solid rgba(239,68,68,.3)", borderRadius: "var(--radius-sm)",
        fontFamily: "inherit", fontWeight: 600, cursor: "pointer",
        fontSize: 14, padding: "9px 18px", width: fullWidth ? "100%" : "auto",
      }}
    >{children}</button>
  );
}

// ── IconBtn ───────────────────────────────────────────────────────────────────
export function IconBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void; }) {
  return (
    <button onClick={onClick} style={{
      width: 36, height: 36, borderRadius: 8, border: "1px solid var(--border)",
      background: "var(--surface2)", cursor: "pointer", fontSize: 16, color: "var(--text)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>{children}</button>
  );
}

// ── Field ─────────────────────────────────────────────────────────────────────
export function Field({ label, children, error }: {
  label: string; children: React.ReactNode; error?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)" }}>{label}</label>
      {children}
      {error ? <span style={{ fontSize: 12, color: "var(--danger)" }}>{error}</span> : null}
    </div>
  );
}

// ── Input ─────────────────────────────────────────────────────────────────────
export function Input({
  type = "text", placeholder, value, onChange, onKeyDown, hasError, style: extra, min,
}: {
  type?: string; placeholder?: string; value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  hasError?: boolean; style?: React.CSSProperties; min?: string;
}) {
  const base: React.CSSProperties = {
    width: "100%", padding: "10px 14px", borderRadius: "var(--radius-sm)",
    border: `1px solid ${hasError ? "var(--danger)" : "var(--border)"}`,
    background: "var(--surface2)", color: "var(--text)",
    fontSize: 14, fontFamily: "inherit", outline: "none", transition: "border-color .15s",
    ...extra,
  };
  return (
    <input type={type} placeholder={placeholder} value={value}
      onChange={onChange} onKeyDown={onKeyDown} min={min} style={base} />
  );
}

// ── Select ────────────────────────────────────────────────────────────────────
export function Select({ children, value, onChange, hasError, style: extra }: {
  children: React.ReactNode; value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  hasError?: boolean; style?: React.CSSProperties;
}) {
  const base: React.CSSProperties = {
    width: "100%", padding: "10px 14px", borderRadius: "var(--radius-sm)",
    border: `1px solid ${hasError ? "var(--danger)" : "var(--border)"}`,
    background: "var(--surface2)", color: "var(--text)",
    fontSize: 14, fontFamily: "inherit", outline: "none", appearance: "none",
    ...extra,
  };
  return <select value={value} onChange={onChange} style={base}>{children}</select>;
}

// ── Spinner ───────────────────────────────────────────────────────────────────
export function Spinner() {
  return (
    <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
      <span style={{
        width: 16, height: 16, border: "2px solid #fff", borderTopColor: "transparent",
        borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block",
      }} />
      Loading...
    </span>
  );
}
