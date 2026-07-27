import { TbCar, TbSearch, TbTool } from "react-icons/tb";
import Reveal from "./Reveal";

const PROMISES = [
  {
    icon: TbSearch,
    title: "정확한 진단",
    desc: "최첨단 누수탐지 장비로 원인부터 명확하게 짚어냅니다.",
  },
  {
    icon: TbTool,
    title: "최소한의 공사",
    desc: "불필요한 철거 없이 필요한 부분만 깔끔하게 시공합니다.",
  },
  {
    icon: TbCar,
    title: "24시간 출동",
    desc: "서울·경기 전 지역, 언제든 전화 한 통이면 출동합니다.",
  },
];

export default function PromiseStrip() {
  return (
    <section id="promise" className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PROMISES.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <div className="flex h-full items-start gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-5 shadow-sm transition-shadow hover:shadow-md">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-800 text-white">
                  <item.icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-lg font-bold text-slate-900">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
