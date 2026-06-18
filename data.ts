// ── Shared constants & types ─────────────────────────────────────────────────

export const SERVICES = [
  "General Consultation",
  "Hair & Styling",
  "Skincare Treatment",
  "Dental Checkup",
  "Physiotherapy",
  "Massage Therapy",
  "Eye Examination",
  "Nutritional Counseling",
];

export const ALL_SLOTS = [
  "09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM",
  "12:00 PM","12:30 PM","01:00 PM","01:30 PM","02:00 PM","02:30 PM",
  "03:00 PM","03:30 PM","04:00 PM","04:30 PM","05:00 PM","05:30 PM",
];

export const STATUS_META: Record<string, { color: string; bg: string }> = {
  Pending:   { color: "#F59E0B", bg: "rgba(245,158,11,0.12)"  },
  Confirmed: { color: "#6366F1", bg: "rgba(99,102,241,0.12)"  },
  Completed: { color: "#10B981", bg: "rgba(16,185,129,0.12)"  },
  Cancelled: { color: "#EF4444", bg: "rgba(239,68,68,0.12)"   },
};

export const ADMIN_CREDS = { user: "admin", pass: "admin123" };

export const SEED_APPOINTMENTS: Appointment[] = [
  { id:1, name:"Ayesha Khan",  phone:"0300-1234567", email:"ayesha@mail.com", service:"Hair & Styling",       date:"2026-06-20", time:"10:00 AM", notes:"Colour treatment please", status:"Confirmed" },
  { id:2, name:"Bilal Raza",   phone:"0311-9876543", email:"",                service:"General Consultation", date:"2026-06-20", time:"11:00 AM", notes:"",                       status:"Pending"   },
  { id:3, name:"Sara Ahmed",   phone:"0321-5556677", email:"sara@mail.com",   service:"Skincare Treatment",   date:"2026-06-21", time:"02:00 PM", notes:"Sensitive skin",          status:"Pending"   },
  { id:4, name:"Omar Farooq",  phone:"0333-1122334", email:"omar@mail.com",   service:"Massage Therapy",      date:"2026-06-19", time:"03:00 PM", notes:"Deep tissue",             status:"Completed" },
  { id:5, name:"Zara Malik",   phone:"0345-6677889", email:"",                service:"Eye Examination",      date:"2026-06-22", time:"09:30 AM", notes:"",                       status:"Pending"   },
];

export interface Appointment {
  id: number;
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  status: string;
}

export function formatDate(d: string) {
  if (!d) return "";
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
}

export function todayStr() {
  return new Date().toISOString().split("T")[0];
}
