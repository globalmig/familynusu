import {
  TbDroplet,
  TbDroplets,
  TbHomeCheck,
  TbPipeline,
  TbSnowflake,
  TbUmbrella,
} from "react-icons/tb";
import Reveal from "./Reveal";

const SERVICES = [
  {
    icon: TbDroplet,
    title: "누수탐지",
    desc: "최첨단 장비로 벽체·바닥 속 누수 지점을 정확히 찾아냅니다.",
  },
  {
    icon: TbPipeline,
    title: "수도설비",
    desc: "노후 배관 교체부터 부분 수리까지 상황에 맞는 시공을 합니다.",
  },
  {
    icon: TbUmbrella,
    title: "방수공사",
    desc: "옥상·욕실·베란다 등 누수 재발을 막는 방수 시공을 진행합니다.",
  },
  {
    icon: TbSnowflake,
    title: "해빙작업",
    desc: "동파로 얼어붙은 배관을 안전하게 녹여 신속히 복구합니다.",
  },
  {
    icon: TbDroplets,
    title: "하수구 문제 해결",
    desc: "막힘·역류·냄새 등 하수구 관련 문제를 한 번에 해결합니다.",
  },
  {
    icon: TbHomeCheck,
    title: "누수 피해 복구",
    desc: "천장·벽면 등 누수로 생긴 2차 피해까지 원스톱으로 복구합니다.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-bold text-orange-500">
            전문 서비스 영역
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-900 break-keep sm:text-3xl">
            어떤 문제든 패밀리누수탐지가 정확하게 해결합니다
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 80}>
              <a
                href="https://blog.naver.com/familydetector"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <service.icon className="h-6 w-6" />
                </span>
                <p className="mt-4 text-lg font-bold text-slate-900">
                  {service.title}
                </p>
                <p className="mt-1.5 text-sm leading-6 text-slate-500">
                  {service.desc}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
