import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ApptFlow — Book Your Appointment",
  description: "Premium scheduling for clinics, salons and wellness studios.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
