import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "패밀리누수탐지 | 서울·경기 24시간 누수탐지·수도설비·방수공사",
  description:
    "서울 도봉구 기반 패밀리누수탐지. 최첨단 누수탐지 장비와 현장 경험으로 정확한 원인 진단, 최소한의 공사로 깔끔하게 해결합니다. 누수탐지·수도설비·방수공사·해빙작업·하수구 문제까지 서울·경기 전 지역 24시간 출동.",
  keywords: [
    "패밀리누수탐지",
    "누수탐지",
    "서울누수",
    "경기누수",
    "수도설비",
    "방수공사",
    "해빙작업",
    "하수구막힘",
    "도봉구누수",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-slate-800">
        {children}
      </body>
    </html>
  );
}
