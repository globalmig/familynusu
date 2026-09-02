import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ConsultProvider from "@/components/ConsultProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { casesStore } from "@/lib/content";

export const metadata: Metadata = {
  title: "작업 사례 | 패밀리누수탐지",
};

export const dynamic = "force-dynamic";

export default async function CasesPage() {
  const cases = await casesStore.list();

  return (
    <ConsultProvider>
      <Header />
      <main className="flex-1 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-bold text-orange-500">작업 분야</p>
          <h1 className="mt-2 text-2xl font-black text-slate-900 break-keep sm:text-3xl">
            작업 사례 모아보기
          </h1>

          {cases.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cases.map((item) => (
                <Link
                  key={item.id}
                  href={`/cases/${item.id}`}
                  className="block h-full overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={`/api/media/${item.imageKey}`}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-base font-bold text-slate-900">
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="mt-1.5 whitespace-pre-line text-sm leading-6 text-slate-500">
                        {item.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-400">
              등록된 작업사례가 없습니다.
            </div>
          )}
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </ConsultProvider>
  );
}
