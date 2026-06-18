"use client";
import { createContext, useContext, useState } from "react";
import { Appointment, SEED_APPOINTMENTS } from "@/lib/data";

interface AppCtx {
  appointments: Appointment[];
  nextId: number;
  addAppointment: (a: Omit<Appointment, "id" | "status">) => Appointment;
  updateStatus: (id: number, status: string) => void;
  deleteAppt: (id: number) => void;
  bookedSlots: (date: string) => string[];
}

const Ctx = createContext<AppCtx | null>(null);

export function AppointmentsProvider({ children }: { children: React.ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>(SEED_APPOINTMENTS);
  const [nextId, setNextId] = useState(SEED_APPOINTMENTS.length + 1);

  function addAppointment(appt: Omit<Appointment, "id" | "status">): Appointment {
    const full: Appointment = { ...appt, id: nextId, status: "Pending" };
    setAppointments(p => [...p, full]);
    setNextId(n => n + 1);
    return full;
  }

  function updateStatus(id: number, status: string) {
    setAppointments(p => p.map(a => a.id === id ? { ...a, status } : a));
  }

  function deleteAppt(id: number) {
    setAppointments(p => p.filter(a => a.id !== id));
  }

  function bookedSlots(date: string) {
    return appointments.filter(a => a.date === date).map(a => a.time);
  }

  return (
    <Ctx.Provider value={{ appointments, nextId, addAppointment, updateStatus, deleteAppt, bookedSlots }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAppointments() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppointments must be used inside AppointmentsProvider");
  return ctx;
}
