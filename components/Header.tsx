"use client";

import { useState } from "react";
import Image from "next/image";
import { TbMenu2, TbX } from "react-icons/tb";
import { site } from "@/lib/site-config";
import { useConsult } from "./ConsultProvider";

const NAV_ITEMS = [
  { href: "#services", label: "서비스소개" },
  { href: "#promise", label: "고객님과의 약속" },
  { href: "#why", label: "패밀리누수탐지?" },
  { href: "#area", label: "방문 가능 지역" },
  { href: "#cases", label: "작업 사례" },
  { href: "#faq", label: "자주 묻는 질문" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { open } = useConsult();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="/" className="flex shrink-0 items-center">
          <Image
            src="/logo.png"
            alt={`${site.name} 로고`}
            width={1274}
            height={369}
            priority
            className="h-9 w-auto sm:h-11"
          />
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-blue-700"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={site.phoneHref}
            className="hidden text-sm font-bold text-blue-800 sm:block"
          >
            {site.phone}
          </a>
          <button
            onClick={open}
            className="hidden rounded-full bg-orange-500 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-orange-600 md:block md:px-4 md:text-sm"
          >
            무료 상담 신청
          </button>
          <button
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setMenuOpen((v) => !v)}
            className="ml-1 flex h-9 w-9 items-center justify-center text-slate-700 lg:hidden"
          >
            {menuOpen ? (
              <TbX className="h-6 w-6" />
            ) : (
              <TbMenu2 className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-slate-100 bg-white px-4 py-3 lg:hidden">
          <ul className="flex flex-col gap-3 text-sm font-medium text-slate-600">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-1"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
