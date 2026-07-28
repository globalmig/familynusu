"use client";

import { TbHeadset, TbPhone, TbSparkles } from "react-icons/tb";
import Reveal from "./Reveal";
import { site } from "@/lib/site-config";
import { useConsult } from "./ConsultProvider";

export default function BottomCta() {
  const { open } = useConsult();

  return (
    <section className="bg-blue-900 py-14 text-white sm:py-16">
      <Reveal>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 text-center sm:px-6">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
            <TbHeadset className="h-7 w-7 text-orange-300" />
          </span>
          <h2 className="text-2xl font-black break-keep sm:text-3xl">
            더 궁금한 점이 있으신가요?
          </h2>
          <p className="text-sm text-blue-100 sm:text-base">
            지금 바로 연락주세요.
            <br />
            24시간 친절하게 안내해드리겠습니다.
          </p>
          <p className="text-2xl font-black text-orange-300">{site.phone}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={site.phoneHref}
              className="flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 font-bold shadow-lg transition-colors hover:bg-orange-600"
            >
              <TbPhone className="h-5 w-5" />
              전화 상담하기
            </a>
            <button
              onClick={open}
              className="flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3.5 font-bold ring-1 ring-white/30 transition-colors hover:bg-white/20"
            >
              <TbSparkles className="h-5 w-5" />
              무료 상담 신청
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
