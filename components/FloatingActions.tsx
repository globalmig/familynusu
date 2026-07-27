"use client";

import { useEffect, useState } from "react";
import { TbArrowUp, TbPhone } from "react-icons/tb";
import { site } from "@/lib/site-config";
import { useConsult } from "./ConsultProvider";

export default function FloatingActions() {
  const { open } = useConsult();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-2.5 sm:right-6">
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="맨 위로"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 shadow-lg ring-1 ring-slate-200 transition hover:text-blue-700"
        >
          <TbArrowUp className="h-5 w-5" />
        </button>
      )}
      <button
        onClick={open}
        className="rounded-full bg-slate-800 px-4 py-2.5 text-xs font-bold text-white shadow-lg transition hover:bg-slate-900"
      >
        무료 상담
      </button>
      <a
        href={site.phoneHref}
        className="pulse-cta flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-orange-600"
      >
        <TbPhone className="h-4 w-4" />
        전화상담
      </a>
    </div>
  );
}
