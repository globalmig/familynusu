import Image from "next/image";
import { TbCircleCheckFilled, TbShieldCheck, TbTool } from "react-icons/tb";
import Reveal from "./Reveal";
import { site } from "@/lib/site-config";

const BADGES = [
  { icon: TbCircleCheckFilled, label: "정확한 진단" },
  { icon: TbTool, label: "최소한의 공사" },
  { icon: TbShieldCheck, label: "신속한 사후 대응" },
];

export default function BrandStory() {
  return (
    <section className="relative overflow-hidden bg-blue-950 py-16 text-white sm:py-20">
      <Image
        src="/bg_2.jpg"
        alt="배관 부속을 조립하는 설비 기사"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-blue-950/88" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="text-sm font-bold text-orange-300">BRAND STORY</p>
          <h2 className="mt-2 text-2xl font-black leading-tight sm:text-3xl">
            &quot;가족&quot;에게 추천하듯,
            <br />
            정직하게 진단하고 시공합니다
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
            {site.shortName}은 이름 그대로, 가족처럼 신뢰할 수 있는 진단과
            시공을 약속합니다. 대표 {site.representative}이 직접 현장을
            확인하고, 불필요한 철거와 과잉 공사 없이 필요한 부분만 정확하게
            해결해 드립니다. 과장 없는 진단, 투명한 견적, 확실한 마무리 —
            말보다 결과로 보여드리겠습니다.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-semibold">
            {BADGES.map((badge) => (
              <span
                key={badge.label}
                className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/20"
              >
                <badge.icon className="h-4 w-4 text-orange-300" />
                {badge.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
