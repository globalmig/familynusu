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
          <h2 className="mt-2 text-2xl font-black text-slate-900 break-keep sm:text-3xl">
            왜 패밀리누수탐지인가요?
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            다른 업체와 꼼꼼히 비교해보세요
          </p>
        </Reveal>

        <Reveal delay={120}>
          {/* Mobile: stacked cards */}
          <div className="mt-8 space-y-3 sm:hidden">
            {ROWS.map((row) => (
              <div
                key={row.label}
                className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100"
              >
                <p className="text-sm font-semibold text-slate-700">
                  {row.label}
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  <div className="rounded-lg border border-slate-200 bg-white p-3">
                    <p className="text-xs font-medium text-slate-400">
                      일반 업체
                    </p>
                    <span className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
                      <TbCircleXFilled className="h-4 w-4 shrink-0 text-slate-300" />
                      {row.other}
                    </span>
                  </div>
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                    <p className="text-xs font-medium text-blue-700">
                      패밀리누수탐지
                    </p>
                    <span className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-blue-800">
                      <TbCircleCheckFilled className="h-4 w-4 shrink-0 text-blue-600" />
                      {row.ours}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tablet & up: table */}
          <div className="mt-8 hidden overflow-x-auto rounded-2xl ring-1 ring-slate-100 sm:block">
            <table className="w-full border-collapse text-sm">
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
