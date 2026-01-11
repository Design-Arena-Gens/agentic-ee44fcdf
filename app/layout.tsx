import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Coder Studio",
  description: "Generate ideas, scaffolds, and test outlines for your next software project"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen text-slate-100 bg-[#0d0f1f]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[400px] h-[400px] bg-ink-500/25 blur-[140px] rounded-full -top-40 -left-20" />
          <div className="absolute w-[340px] h-[340px] bg-indigo-500/20 blur-[160px] rounded-full bottom-10 right-[-120px]" />
        </div>
        <main className="relative z-10 mx-auto max-w-6xl px-6 py-12">
          {children}
        </main>
      </body>
    </html>
  );
}
