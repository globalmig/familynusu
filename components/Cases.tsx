import Image from "next/image";
import Reveal from "./Reveal";

const CASE_TYPES = [
  { image: "/space/1.jpg", title: "옥상·베란다 방수" },
  { image: "/space/2.jpg", title: "화장실·욕실 누수" },
  { image: "/space/3.jpg", title: "주방·세면대 배관" },
  { image: "/space/4.jpg", title: "동파 배관 해빙" },
  { image: "/space/5.jpg", title: "아랫집 천장 피해" },
  { image: "/space/6.jpg", title: "하수구 막힘·역류" },
];

export default function Cases() {
  return (
    <section id="cases" className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-bold text-orange-500">작업 분야</p>
          <h2 className="mt-2 text-2xl font-black text-slate-900 break-keep sm:text-3xl">
            이런 현장을 자주 만납니다
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            실제 시공 사진과 사례는 순차적으로 업데이트할 예정입니다.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {CASE_TYPES.map((c, i) => (
            <Reveal key={c.title} delay={i * 70}>
              <div className="group relative aspect-4/5 overflow-hidden rounded-3xl">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
                <p className="absolute inset-x-0 bottom-0 p-4 text-base font-bold text-white drop-shadow break-keep sm:p-5 sm:text-lg">
                  {c.title}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
