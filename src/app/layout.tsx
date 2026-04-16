import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "고동욱 | Frontend Developer Portfolio",
  description:
    "프론트엔드 개발자 고동욱의 포트폴리오. 인프라 비용 최적화, QA SDK 설계, 대규모 서비스 아키텍처 개선 경험.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <header className="no-print border-b border-border">
          <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-bold tracking-tight">
              고동욱
            </Link>
            <div className="flex items-center gap-6 text-sm text-muted">
              <Link href="/#projects" className="hover:text-foreground transition">
                Projects
              </Link>
              <Link href="/#skills" className="hover:text-foreground transition">
                Skills
              </Link>
              <Link href="/#blog" className="hover:text-foreground transition">
                Blog
              </Link>
              <a
                href="https://github.com/kotom320"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition"
              >
                GitHub
              </a>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="no-print border-t border-border py-8 text-center text-sm text-muted">
          <p>&copy; 2024-2026 고동욱. All rights reserved.</p>
          <p className="mt-1">kotom320@gmail.com</p>
        </footer>
      </body>
    </html>
  );
}
