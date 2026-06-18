"use client";
import { useRouter } from "next/navigation";
import { PrimaryBtn, GhostBtn } from "./Primitives";
import { Appointment, formatDate } from "@/lib/data";

export default function ConfirmPage({ booking }: { booking: Appointment | null }) {
  const router = useRouter();

  const rows = booking ? [
    ["Name",    booking.name],
    ["Phone",   booking.phone],
    ["Service", booking.service],
    ["Date",    formatDate(booking.date)],
    ["Time",    booking.time],
  ] : [];

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24, background: "var(--bg)",
    }}>
      <div className="fade-up" style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: 20, padding: "48px 40px", maxWidth: 480, width: "100%", textAlign: "center",
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: "rgba(16,185,129,.15)", border: "2px solid var(--success)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 32, margin: "0 auto 24px",
        }}>✓</div>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: 8, letterSpacing: "-0.5px", color: "var(--success)" }}>
          Booking Confirmed!
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: 32, lineHeight: 1.6 }}>
          Your appointment has been booked successfully. We will reach out to confirm shortly.
        </p>

        {booking && (
          <div style={{ background: "var(--surface2)", borderRadius: 12, padding: 20, textAlign: "left", marginBottom: 28 }}>
            {rows.map(([k, v]) => (
              <div key={k} style={{
                display: "flex", justifyContent: "space-between",
                padding: "6px 0", borderBottom: "1px solid var(--border)", fontSize: 14,
              }}>
                <span style={{ color: "var(--muted)" }}>{k}</span>
                <span style={{ fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <PrimaryBtn fullWidth onClick={() => router.push("/book")}>Book Another</PrimaryBtn>
          <GhostBtn fullWidth onClick={() => router.push("/")}>Go Home</GhostBtn>
        </div>
      </div>
    </div>
  );
}
