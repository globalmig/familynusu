import { TbCar, TbClock, TbMapPin } from "react-icons/tb";
import Reveal from "./Reveal";
import { site } from "@/lib/site-config";

const POINTS = [
  {
    icon: TbClock,
    title: "24시간 상담",
    desc: "새벽에도 전화 한 통이면 바로 상담 가능합니다.",
  },
  {
    icon: TbCar,
    title: "신속 출동",
    desc: `${site.baseArea} 기반으로 서울·경기 전 지역 빠르게 출동합니다.`,
  },
  {
    icon: TbMapPin,
    title: "전 지역 서비스",
    desc: "서울·경기 어디든 방문해 정확히 진단하고 시공합니다.",
  },
];

export default function ServiceArea() {
  return (
    <section
      id="area"
      className="bg-linear-to-b from-slate-50 to-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-bold text-orange-500">
            출동 가능 지역
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
            {site.serviceArea} 24시간 출동
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {POINTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="h-full rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <p.icon className="h-6 w-6" />
                </span>
                <p className="mt-3 text-lg font-bold text-slate-900">
                  {p.title}
                </p>
                <p className="mt-1.5 text-sm leading-6 text-slate-500">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
