"use client";
import { useState } from "react";
import { SEED_APPOINTMENTS, Appointment } from "@/lib/data";
import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";

export default function AdminRoute() {
  const [dark, setDark] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>(SEED_APPOINTMENTS);

  function updateStatus(id: number, status: string) {
    setAppointments(p => p.map(a => a.id === id ? { ...a, status } : a));
  }

  function deleteAppt(id: number) {
    setAppointments(p => p.filter(a => a.id !== id));
  }

  return (
    <div className={`app${dark ? "" : " light"}`}>
      {!loggedIn
        ? <AdminLogin dark={dark} setDark={setDark} onLogin={() => setLoggedIn(true)} />
        : <AdminPanel
            dark={dark}
            setDark={setDark}
            appointments={appointments}
            onStatus={updateStatus}
            onDelete={deleteAppt}
            onLogout={() => setLoggedIn(false)}
          />
      }
    </div>
  );
}
