import Image from "next/image";
import { TbCircleCheckFilled, TbPhone } from "react-icons/tb";
import { site } from "@/lib/site-config";
import InlineConsultForm from "./InlineConsultForm";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-blue-950 text-white">
      <Image
        src="/hero2.png"
        alt="청음기로 싱크대 하부 배관의 누수를 정밀 진단하는 패밀리누수탐지 기술자"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-blue-950/75" />
      <div className="absolute inset-0 bg-linear-to-r from-blue-950 via-blue-950/70 to-transparent" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-8">
        <div>
          <p className="text-sm font-bold tracking-wide text-orange-300 sm:text-base">
            서울·경기 전 지역 · 24시간 출동
          </p>

          <h1 className="mt-3 text-3xl font-black leading-tight break-keep sm:text-5xl">
            정확한 진단이 곧
            <br />
            <span className="text-orange-300">최소한의 공사</span>로
            이어집니다
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-blue-50 sm:text-base">
            최첨단 누수탐지 장비와 풍부한 현장 경험으로 원인을 정확히 찾아,
            불필요한 철거와 과도한 공사 없이 깔끔하게 해결해 드립니다.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold sm:text-sm">
            {["누수탐지", "수도설비", "방수공사", "해빙작업", "하수구 문제 해결"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/20"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          <div className="mt-8 hidden gap-3 md:flex">
            <a
              href={site.phoneHref}
              className="flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-base font-bold shadow-lg transition-colors hover:bg-orange-600"
            >
              <TbPhone className="h-5 w-5" />
              바로 전화상담 {site.phone}
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-blue-100">
            {["정확한 원인 진단", "최소한의 공사", "24시간 출동"].map((label) => (
              <span key={label} className="flex items-center gap-1.5">
                <TbCircleCheckFilled className="h-4 w-4 text-orange-300" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <InlineConsultForm />
      </div>
    </section>
  );
}
