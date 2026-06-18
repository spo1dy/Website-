"use client";
import { useState } from "react";
import { PrimaryBtn, Field, Input, Spinner, IconBtn } from "../components/Primitives";
import { ADMIN_CREDS } from "@/lib/data";

export default function AdminLogin({
  dark, setDark, onLogin,
}: {
  dark: boolean;
  setDark: (fn: (d: boolean) => boolean) => void;
  onLogin: () => void;
}) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  function login() {
    setLoading(true); setErr("");
    setTimeout(() => {
      if (u === ADMIN_CREDS.user && p === ADMIN_CREDS.pass) {
        onLogin();
      } else {
        setErr("Invalid credentials. Try admin / admin123");
        setLoading(false);
      }
    }, 700);
  }

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24, background: "var(--bg)",
    }}>
      {/* theme toggle in corner */}
      <div style={{ position: "fixed", top: 16, right: 16 }}>
        <IconBtn onClick={() => setDark(d => !d)}>{dark ? "☀️" : "🌙"}</IconBtn>
      </div>

      <div className="fade-up" style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: 20, padding: "40px 36px", maxWidth: 400, width: "100%",
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12, background: "var(--accent)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, margin: "0 auto 16px",
          }}>🔒</div>
          <h2 style={{ fontWeight: 700, fontSize: "1.4rem", letterSpacing: "-0.5px" }}>Admin Login</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>Sign in to manage appointments</p>
        </div>

        {err && (
          <div style={{
            background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)",
            borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "var(--danger)", marginBottom: 16,
          }}>{err}</div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Field label="Username">
            <Input placeholder="admin" value={u} onChange={e => setU(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} />
          </Field>
          <Field label="Password">
            <Input type="password" placeholder="••••••••" value={p} onChange={e => setP(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} />
          </Field>
          <PrimaryBtn large fullWidth onClick={login} disabled={loading}>
            {loading ? <Spinner /> : "Sign In"}
          </PrimaryBtn>
        </div>

        <a href="/" style={{
          background: "none", border: "none", color: "var(--muted)", cursor: "pointer",
          fontSize: 13, marginTop: 20, display: "block", textAlign: "center", textDecoration: "none",
        }}>
          ← Back to home
        </a>
      </div>
    </div>
  );
}
