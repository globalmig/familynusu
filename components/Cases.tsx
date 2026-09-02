import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { casesStore } from "@/lib/content";

type CaseCard = {
  id?: string;
  image: string;
  title: string;
  description?: string;
};

const FALLBACK_CASES: CaseCard[] = [
  { image: "/space/1.jpg", title: "옥상·베란다 방수" },
  { image: "/space/2.jpg", title: "화장실·욕실 누수" },
  { image: "/space/3.jpg", title: "주방·세면대 배관" },
  { image: "/space/4.jpg", title: "동파 배관 해빙" },
  { image: "/space/5.jpg", title: "아랫집 천장 피해" },
  { image: "/space/6.jpg", title: "하수구 막힘·역류" },
];

const MAX_PREVIEW = 6;

export default async function Cases() {
  const cases = await casesStore.list();
  const hasRealCases = cases.length > 0;
  const allItems: CaseCard[] = hasRealCases
    ? cases.map((c) => ({
        id: c.id,
        image: `/api/media/${c.imageKey}`,
        title: c.title,
        description: c.description,
      }))
    : FALLBACK_CASES;
  const items = allItems.slice(0, MAX_PREVIEW);
  const hasMore = allItems.length > MAX_PREVIEW;

  return (
    <section id="cases" className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-bold text-orange-500">작업 분야</p>
          <h2 className="mt-2 text-2xl font-black text-slate-900 break-keep sm:text-3xl">
            이런 현장을 자주 만납니다
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {hasRealCases
              ? "실제 시공 사진과 사례입니다."
              : "실제 시공 사진과 사례는 순차적으로 업데이트할 예정입니다."}
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c, i) => {
            const card = (
              <div className="h-full overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md">
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-base font-bold text-slate-900">
                    {c.title}
                  </p>
                  {c.description && (
                    <p className="mt-1.5 whitespace-pre-line text-sm leading-6 text-slate-500">
                      {c.description}
                    </p>
                  )}
                </div>
              </div>
            );

            return (
              <Reveal key={c.id ?? `${c.title}-${i}`} delay={i * 70}>
                {c.id ? (
                  <Link href={`/cases/${c.id}`} className="block h-full">
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </Reveal>
            );
          })}
        </div>

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <Link
              href="/cases"
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-orange-500 hover:text-orange-500"
            >
              자세히보기
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
