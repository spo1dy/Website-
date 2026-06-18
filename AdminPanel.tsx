"use client";
import { useState, useMemo } from "react";
import { GhostBtn, DangerBtn, IconBtn, Input, Select } from "../components/Primitives";
import { Appointment, SERVICES, STATUS_META, formatDate, todayStr } from "@/lib/data";

// ── ApptCard ──────────────────────────────────────────────────────────────────
function ApptCard({ appt, onStatus, onDelete }: {
  appt: Appointment;
  onStatus: (id: number, status: string) => void;
  onDelete: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const meta = STATUS_META[appt.status] ?? STATUS_META.Pending;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--surface)",
        border: `1px solid ${hovered ? "var(--accent)" : "var(--border)"}`,
        borderRadius: "var(--radius)", padding: "18px 20px",
        display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center",
        transition: "border-color .2s",
      }}
    >
      <div style={{ flex: "1 1 220px", minWidth: 0 }}>
        <p style={{ fontWeight: 600, fontSize: 15 }}>{appt.name}</p>
        <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 2 }}>
          {appt.phone}{appt.email ? ` · ${appt.email}` : ""}
        </p>
      </div>
      <div style={{ flex: "1 1 160px", minWidth: 0 }}>
        <p style={{ fontSize: 13, fontWeight: 500 }}>{appt.service}</p>
        <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 2 }}>
          {formatDate(appt.date)} · {appt.time}
        </p>
      </div>
      {appt.notes ? (
        <div style={{ flex: "1 1 160px", minWidth: 0 }}>
          <p style={{ fontSize: 12, color: "var(--muted)", fontStyle: "italic", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            &ldquo;{appt.notes}&rdquo;
          </p>
        </div>
      ) : null}
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ padding: "4px 12px", borderRadius: 100, fontSize: 12, fontWeight: 600, background: meta.bg, color: meta.color }}>
          {appt.status}
        </span>
        <Select value={appt.status} onChange={e => onStatus(appt.id, e.target.value)} style={{ padding: "5px 10px", fontSize: 12, borderRadius: 8, width: "auto" }}>
          {Object.keys(STATUS_META).map(s => <option key={s} value={s}>{s}</option>)}
        </Select>
        <button
          onClick={onDelete}
          style={{
            width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(239,68,68,.3)",
            background: "rgba(239,68,68,.08)", color: "var(--danger)", cursor: "pointer",
            fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >✕</button>
      </div>
    </div>
  );
}

// ── CalendarView ──────────────────────────────────────────────────────────────
function CalendarView({ dates, onStatus, onDelete }: {
  dates: Record<string, Appointment[]>;
  onStatus: (id: number, status: string) => void;
  onDelete: (id: number) => void;
}) {
  const sorted = Object.keys(dates).sort();
  if (sorted.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>📅</div>
        <p>No appointments to show.</p>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {sorted.map(date => (
        <div key={date} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
          <div style={{ padding: "12px 18px", background: "var(--surface2)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>📅</span>
            <span style={{ fontWeight: 700, fontSize: 15 }}>{formatDate(date)}</span>
            <span style={{ marginLeft: "auto", padding: "2px 10px", background: "var(--accent)", borderRadius: 100, fontSize: 12, color: "#fff", fontWeight: 600 }}>
              {dates[date].length} appt{dates[date].length !== 1 ? "s" : ""}
            </span>
          </div>
          <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
            {dates[date].map(a => (
              <ApptCard key={a.id} appt={a} onStatus={onStatus} onDelete={() => onDelete(a.id)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── AdminPanel ────────────────────────────────────────────────────────────────
export default function AdminPanel({
  dark, setDark, appointments, onStatus, onDelete, onLogout,
}: {
  dark: boolean;
  setDark: (fn: (d: boolean) => boolean) => void;
  appointments: Appointment[];
  onStatus: (id: number, status: string) => void;
  onDelete: (id: number) => void;
  onLogout: () => void;
}) {
  const [search, setSearch]   = useState("");
  const [filterDate, setFD]   = useState("");
  const [filterSvc, setFS]    = useState("");
  const [filterStat, setFST]  = useState("");
  const [panelView, setPV]    = useState<"list"|"calendar">("list");
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    let r = appointments;
    if (search)      r = r.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.phone.includes(search));
    if (filterDate)  r = r.filter(a => a.date === filterDate);
    if (filterSvc)   r = r.filter(a => a.service === filterSvc);
    if (filterStat)  r = r.filter(a => a.status === filterStat);
    return [...r].sort((a, b) => a.date.localeCompare(b.date));
  }, [appointments, search, filterDate, filterSvc, filterStat]);

  const stats = useMemo(() => ({
    total:     appointments.length,
    pending:   appointments.filter(a => a.status === "Pending").length,
    confirmed: appointments.filter(a => a.status === "Confirmed").length,
    today:     appointments.filter(a => a.date === todayStr()).length,
  }), [appointments]);

  const calDates = useMemo(() => {
    const map: Record<string, Appointment[]> = {};
    filtered.forEach(a => { if (!map[a.date]) map[a.date] = []; map[a.date].push(a); });
    return map;
  }, [filtered]);

  const hasFilters = search || filterDate || filterSvc || filterStat;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: dark ? "rgba(15,17,23,.9)" : "rgba(240,242,248,.9)",
        backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)",
        padding: "0 24px", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>✦</div>
          <span style={{ fontWeight: 700, fontSize: 15 }}>ApptFlow</span>
          <span style={{ padding: "2px 10px", background: "var(--surface2)", borderRadius: 100, fontSize: 12, color: "var(--accent2)", fontWeight: 600 }}>Admin</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <GhostBtn small onClick={() => setPV(v => v === "list" ? "calendar" : "list")}>
            {panelView === "list" ? "Calendar View" : "List View"}
          </GhostBtn>
          <IconBtn onClick={() => setDark(d => !d)}>{dark ? "☀️" : "🌙"}</IconBtn>
          <GhostBtn small onClick={onLogout}>Logout</GhostBtn>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        {/* stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 12, marginBottom: 28 }}>
          {[
            { label: "Total",     val: stats.total,     icon: "📊", color: "var(--accent)" },
            { label: "Pending",   val: stats.pending,   icon: "⏳", color: "var(--warn)"   },
            { label: "Confirmed", val: stats.confirmed, icon: "✅", color: "var(--success)"},
            { label: "Today",     val: stats.today,     icon: "📅", color: "#EC4899"       },
          ].map(s => (
            <div key={s.label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "20px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>{s.label}</span>
                <span style={{ fontSize: 20 }}>{s.icon}</span>
              </div>
              <div style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-1px", color: s.color, marginTop: 4 }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* filters */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "16px 18px", marginBottom: 20, display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
          <Input placeholder="Search name or phone..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: "1 1 180px", minWidth: 0 }} />
          <Input type="date" value={filterDate} onChange={e => setFD(e.target.value)} style={{ flex: "1 1 140px", minWidth: 0 }} />
          <Select value={filterSvc} onChange={e => setFS(e.target.value)} style={{ flex: "1 1 160px", minWidth: 0 }}>
            <option value="">All services</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </Select>
          <Select value={filterStat} onChange={e => setFST(e.target.value)} style={{ flex: "1 1 130px", minWidth: 0 }}>
            <option value="">All statuses</option>
            {Object.keys(STATUS_META).map(s => <option key={s} value={s}>{s}</option>)}
          </Select>
          {hasFilters && <GhostBtn small onClick={() => { setSearch(""); setFD(""); setFS(""); setFST(""); }}>Clear</GhostBtn>}
        </div>

        {/* list or calendar */}
        {panelView === "list" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
                <p>No appointments match your filters.</p>
              </div>
            )}
            {filtered.map(a => (
              <ApptCard key={a.id} appt={a} onStatus={onStatus} onDelete={() => setConfirmId(a.id)} />
            ))}
          </div>
        ) : (
          <CalendarView dates={calDates} onStatus={onStatus} onDelete={id => setConfirmId(id)} />
        )}
      </div>

      {/* delete confirm modal */}
      {confirmId !== null && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.6)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 32, maxWidth: 360, width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
            <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Delete Appointment?</h3>
            <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>This action cannot be undone.</p>
            <div style={{ display: "flex", gap: 10 }}>
              <GhostBtn fullWidth onClick={() => setConfirmId(null)}>Cancel</GhostBtn>
              <DangerBtn fullWidth onClick={() => { onDelete(confirmId); setConfirmId(null); }}>Delete</DangerBtn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
