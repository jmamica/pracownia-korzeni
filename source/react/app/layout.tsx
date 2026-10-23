import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pracownia Korzeni — konfigurator drzewa genealogicznego",
  description: "Zacznij projekt indywidualnego drzewa genealogicznego od kilku informacji, zdjęć i rodzinnych historii.",
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pl"><body>{children}</body></html>;
}
