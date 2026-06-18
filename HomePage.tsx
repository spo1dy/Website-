"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Topbar } from "../components/Topbar";
import { PrimaryBtn, GhostBtn } from "../components/Primitives";
import { SERVICES } from "@/lib/data";

const SERVICE_ICONS = ["🩺","💇","✨","🦷","🏃","💆","👁️","🥗"];

function ServiceCard({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--surface)",
        border: `1px solid ${hovered ? "var(--accent)" : "var(--border)"}`,
        borderRadius: "var(--radius)", padding: "24px 20px", cursor: "pointer",
        transform: hovered ? "translateY(-2px)" : "none",
        transition: "border-color .2s, transform .2s",
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
      <p style={{ fontWeight: 600, fontSize: 14 }}>{label}</p>
    </div>
  );
}

export default function HomePage({ dark, setDark }: {
  dark: boolean;
  setDark: (fn: (d: boolean) => boolean) => void;
}) {
  const router = useRouter();

  return (
    <>
      <Topbar
        dark={dark} setDark={setDark}
        onHome={() => {}}
        onBook={() => router.push("/book")}
        current="home"
      />
      <div style={{ paddingTop: 60 }}>
        {/* Hero */}
        <section style={{
          minHeight: "90vh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", textAlign: "center",
          padding: "80px 24px", position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
            width: 600, height: 600, borderRadius: "50%",
            background: "radial-gradient(circle,rgba(99,102,241,.15) 0%,transparent 70%)",
            pointerEvents: "none",
          }} />

          <div className="fade-up" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "var(--surface2)", border: "1px solid var(--border)",
            borderRadius: 100, padding: "6px 16px", marginBottom: 28,
            fontSize: 13, color: "var(--accent2)", fontWeight: 500,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--success)", display: "inline-block" }} />
            Now accepting bookings
          </div>

          <h1 className="fade-up d1" style={{
            fontSize: "clamp(2.4rem,6vw,4.2rem)", fontWeight: 800,
            lineHeight: 1.08, letterSpacing: "-2px", maxWidth: 680, marginBottom: 20,
          }}>
            Book your appointment<br />
            <span style={{
              background: "linear-gradient(135deg,#6366F1,#818CF8,#A5B4FC)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>in seconds.</span>
          </h1>

          <p className="fade-up d2" style={{
            fontSize: 18, color: "var(--muted)", maxWidth: 480, lineHeight: 1.7, marginBottom: 40,
          }}>
            Premium scheduling for clinics, salons and wellness studios. Real-time availability, instant confirmation.
          </p>

          <div className="fade-up d3" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <PrimaryBtn large onClick={() => router.push("/book")}>Book an Appointment →</PrimaryBtn>
          </div>
        </section>

        {/* Services */}
        <section style={{ padding: "80px 24px", maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{
              color: "var(--accent2)", fontWeight: 600, fontSize: 13,
              letterSpacing: "1px", textTransform: "uppercase", marginBottom: 12,
            }}>Our Services</p>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, letterSpacing: "-1px" }}>What we offer</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16 }}>
            {SERVICES.map((s, i) => (
              <ServiceCard key={s} icon={SERVICE_ICONS[i]} label={s} onClick={() => router.push("/book")} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "80px 24px", textAlign: "center", borderTop: "1px solid var(--border)" }}>
          <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 700, marginBottom: 16, letterSpacing: "-1px" }}>
            Ready to get started?
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: 32 }}>
            Pick a time that works for you — we'll handle the rest.
          </p>
          <PrimaryBtn large onClick={() => router.push("/book")}>Book Now — It's Free</PrimaryBtn>
        </section>

        <footer style={{ padding: "24px", textAlign: "center", color: "var(--muted)", fontSize: 13, borderTop: "1px solid var(--border)" }}>
          2026 ApptFlow · All rights reserved
        </footer>
      </div>
    </>
  );
}
