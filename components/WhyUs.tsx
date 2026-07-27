import { TbCircleCheckFilled, TbCircleXFilled } from "react-icons/tb";
import Reveal from "./Reveal";

const ROWS = [
  {
    label: "진단 방식",
    other: "전화로 대략 안내",
    ours: "현장 확인 후 정확한 원인 진단",
  },
  {
    label: "공사 범위",
    other: "과도한 철거·공사",
    ours: "필요한 부분만 최소한으로",
  },
  {
    label: "장비",
    other: "일반 장비",
    ours: "최첨단 누수탐지 전용 장비",
  },
  {
    label: "출동 범위·시간",
    other: "지역·시간 제한",
    ours: "서울·경기 전 지역 24시간",
  },
  {
    label: "보험 서류",
    other: "미지원",
    ours: "기술소견서 등 서류 지원",
  },
];

export default function WhyUs() {
  return (
    <section id="why" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-bold text-orange-500">WHY?</p>
          <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
            왜 패밀리누수탐지인가요?
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            다른 업체와 꼼꼼히 비교해보세요
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-8 overflow-x-auto rounded-2xl ring-1 ring-slate-100">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500">
                  <th className="p-4 text-left font-semibold">비교 항목</th>
                  <th className="p-4 text-left font-semibold">일반 업체</th>
                  <th className="p-4 text-left font-semibold text-blue-800">
                    패밀리누수탐지
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
                  >
                    <td className="p-4 font-semibold text-slate-700">
                      {row.label}
                    </td>
                    <td className="p-4 text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <TbCircleXFilled className="h-4 w-4 shrink-0 text-slate-300" />
                        {row.other}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-blue-800">
                      <span className="flex items-center gap-1.5">
                        <TbCircleCheckFilled className="h-4 w-4 shrink-0 text-blue-600" />
                        {row.ours}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
