"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Topbar } from "./Topbar";
import { PrimaryBtn, Field, Input, Select, Spinner } from "./Primitives";
import { useAppointments } from "./AppointmentsContext";
import { SERVICES, ALL_SLOTS, todayStr, Appointment } from "@/lib/data";

function SlotBtn({ slot, taken, selected, onClick }: {
  slot: string; taken: boolean; selected: boolean; onClick: () => void;
}) {
  return (
    <button
      disabled={taken}
      onClick={onClick}
      style={{
        padding: "9px 4px", borderRadius: 8, fontSize: 13, fontWeight: 500,
        border: `1px solid ${selected ? "var(--accent)" : "var(--border)"}`,
        background: selected ? "var(--accent)" : "var(--surface2)",
        color: selected ? "#fff" : taken ? "var(--muted)" : "var(--text)",
        cursor: taken ? "not-allowed" : "pointer",
        opacity: taken ? 0.45 : 1,
        transition: "all .15s",
        textDecoration: taken ? "line-through" : "none",
      }}
    >{slot}</button>
  );
}

type FormData = { name: string; phone: string; email: string; service: string; date: string; time: string; notes: string; };
type FormErrors = Partial<Record<keyof FormData, string>>;

export default function BookingPage({
  dark, setDark, onBooked,
}: {
  dark: boolean;
  setDark: (fn: (d: boolean) => boolean) => void;
  onBooked: (appt: Appointment) => void;
}) {
  const router = useRouter();
  const { addAppointment, bookedSlots } = useAppointments();
  const [form, setForm] = useState<FormData>({ name:"", phone:"", email:"", service:"", date:"", time:"", notes:"" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const occupied = useMemo(() => bookedSlots(form.date), [form.date, bookedSlots]);

  function updateField(k: keyof FormData, v: string) {
    if (k === "date") setForm(f => ({ ...f, date: v, time: "" }));
    else setForm(f => ({ ...f, [k]: v }));
  }

  function validate() {
    const e: FormErrors = {};
    if (!form.name.trim())  e.name    = "Name is required";
    if (!form.phone.trim()) e.phone   = "Phone is required";
    if (!form.service)      e.service = "Select a service";
    if (!form.date)         e.date    = "Pick a date";
    if (!form.time)         e.time    = "Pick a time slot";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit() {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      const appt = addAppointment(form);
      onBooked(appt);
      setLoading(false);
    }, 900);
  }

  const availableCount = ALL_SLOTS.filter(s => !occupied.includes(s)).length;

  return (
    <>
      <Topbar
        dark={dark} setDark={setDark}
        onHome={() => router.push("/")}
        onBook={() => {}}
        current="book"
      />
      <div style={{ minHeight: "100vh", padding: "80px 24px 60px" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <button
            onClick={() => router.push("/")}
            style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 14, marginBottom: 24, display: "flex", alignItems: "center", gap: 6, padding: 0 }}
          >
            &#8592; Back to home
          </button>

          <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 700, letterSpacing: "-1px", marginBottom: 6 }}>Book an Appointment</h1>
          <p style={{ color: "var(--muted)", marginBottom: 36, fontSize: 15 }}>Fill in your details and we will confirm your slot.</p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column", gap: 20 }}>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Field label="Full Name *" error={errors.name}>
                <Input placeholder="e.g. Ayesha Khan" value={form.name} onChange={e => updateField("name", e.target.value)} hasError={!!errors.name} />
              </Field>
              <Field label="Phone Number *" error={errors.phone}>
                <Input placeholder="03XX-XXXXXXX" value={form.phone} onChange={e => updateField("phone", e.target.value)} hasError={!!errors.phone} />
              </Field>
            </div>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Field label="Email (optional)">
                <Input type="email" placeholder="you@example.com" value={form.email} onChange={e => updateField("email", e.target.value)} />
              </Field>
              <Field label="Service *" error={errors.service}>
                <Select value={form.service} onChange={e => updateField("service", e.target.value)} hasError={!!errors.service}>
                  <option value="">Select a service...</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </Select>
              </Field>
            </div>

            <Field label="Date *" error={errors.date}>
              <Input type="date" min={todayStr()} value={form.date} onChange={e => updateField("date", e.target.value)} hasError={!!errors.date} />
            </Field>

            <Field label="Time Slot *" error={errors.time}>
              {!form.date ? (
                <p style={{ color: "var(--muted)", fontSize: 14, padding: "12px 0", fontStyle: "italic" }}>Select a date first to see available time slots.</p>
              ) : availableCount === 0 ? (
                <p style={{ color: "var(--danger)", fontSize: 14, padding: "12px 0" }}>No slots available for this date. Please choose another day.</p>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(100px,1fr))", gap: 8 }}>
                  {ALL_SLOTS.map(slot => {
                    const taken = occupied.includes(slot);
                    const sel = form.time === slot;
                    return (
                      <SlotBtn key={slot} slot={slot} taken={taken} selected={sel}
                        onClick={() => { if (!taken) updateField("time", slot); }} />
                    );
                  })}
                </div>
              )}
            </Field>

            <Field label="Notes / Message">
              <textarea
                placeholder="Any special requests or notes..."
                rows={3}
                value={form.notes}
                onChange={e => updateField("notes", e.target.value)}
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border)", background: "var(--surface2)",
                  color: "var(--text)", fontSize: 14, fontFamily: "inherit",
                  outline: "none", resize: "vertical", minHeight: 80,
                }}
              />
            </Field>

            <PrimaryBtn large fullWidth onClick={submit} disabled={loading}>
              {loading ? <Spinner /> : "Confirm Appointment"}
            </PrimaryBtn>
          </div>
        </div>
      </div>
    </>
  );
}
