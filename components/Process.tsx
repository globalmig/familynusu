import Reveal from "./Reveal";

const STEPS = [
  {
    step: "STEP 01",
    title: "전화 상담",
    desc: "전화로 증상을 알려주세요. 24시간 상담 가능합니다.",
  },
  {
    step: "STEP 02",
    title: "현장 방문 진단",
    desc: "전문 장비로 현장을 정밀 점검하고 원인과 예상 비용을 안내합니다.",
  },
  {
    step: "STEP 03",
    title: "최소 공사로 시공 완료",
    desc: "합의된 범위 내에서 필요한 부분만 신속하고 깔끔하게 마무리합니다.",
  },
];

export default function Process() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-bold text-orange-500">진행 절차</p>
          <h2 className="mt-2 text-2xl font-black text-slate-900 break-keep sm:text-3xl">
            간단한 3단계로 해결합니다
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.step} delay={i * 100} className="h-full">
              <div className="relative flex h-full flex-col rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <span className="text-xs font-black tracking-wider text-blue-700">
                  {s.step}
                </span>
                <p className="mt-2 text-lg font-bold text-slate-900">
                  {s.title}
                </p>
                <p className="mt-1.5 text-sm leading-6 text-slate-500">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
