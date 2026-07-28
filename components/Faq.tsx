"use client";

import { useState } from "react";
import { TbChevronDown } from "react-icons/tb";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "방문 견적을 받으면 무조건 수리를 진행해야 하나요?",
    a: "아닙니다. 현장을 정밀 점검한 후 원인과 예상 비용을 먼저 안내해 드립니다. 진행 여부는 고객님이 결정하시며, 단순 점검만 진행될 경우 소정의 점검비 외 추가 비용은 없습니다.",
  },
  {
    q: "누수탐지부터 공사까지 시간이 얼마나 걸리나요?",
    a: "단순 하수구 막힘은 1시간 내외로 해결되며, 누수는 탐지 시간에 따라 달라집니다. 원인 지점을 정확히 찾으면 대부분 당일 공사가 가능합니다.",
  },
  {
    q: "아랫집 천장 누수 피해, 보험으로 처리할 수 있나요?",
    a: "일상생활 배상책임보험에 가입되어 있다면 보험 처리가 가능합니다. 기술 소견서, 작업 전후 사진 등 필요 서류를 챙겨드립니다.",
  },
  {
    q: "왜 최소한의 공사를 강조하나요?",
    a: "누수탐지 장비로 원인을 정확히 찾으면 불필요한 철거 없이 필요한 부분만 수리할 수 있습니다. 과잉 공사를 줄여 비용과 시간을 아껴드립니다.",
  },
  {
    q: "서울·경기 어디든 방문이 가능한가요?",
    a: "네, 도봉동을 기반으로 서울·경기 전 지역 24시간 출동합니다. 지역과 증상을 알려주시면 빠르게 안내드립니다.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-bold text-orange-500">
            자주 묻는 질문
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-900 break-keep sm:text-3xl">
            궁금한 점을 미리 확인해보세요
          </h2>
        </Reveal>

        <div className="mt-8 divide-y divide-slate-100 rounded-3xl border border-slate-100 shadow-sm">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-bold text-slate-800 sm:text-base">
                    Q{i + 1}. {item.q}
                  </span>
                  <TbChevronDown
                    className={`h-5 w-5 shrink-0 text-blue-700 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm leading-6 text-slate-500">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
