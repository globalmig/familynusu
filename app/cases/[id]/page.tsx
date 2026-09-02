import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TbArrowLeft } from "react-icons/tb";
import ConsultProvider from "@/components/ConsultProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { casesStore } from "@/lib/content";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = await casesStore.get(id);
  return { title: item ? `${item.title} | 패밀리누수탐지` : "작업 사례" };
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await casesStore.get(id);
  if (!item) notFound();

  return (
    <ConsultProvider>
      <Header />
      <main className="flex-1 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Link
            href="/cases"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-700"
          >
            <TbArrowLeft size={16} />
            작업 사례 목록
          </Link>

          <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100 lg:sticky lg:top-24">
              <Image
                src={`/api/media/${item.imageKey}`}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
                className="object-cover"
              />
            </div>

            <div>
              <h1 className="text-xl font-black text-slate-900 break-keep sm:text-2xl">
                {item.title}
              </h1>
              <p className="mt-2 text-xs font-semibold text-slate-400">
                {formatDate(item.createdAt)}
              </p>
              {item.description && (
                <p className="mt-6 whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </ConsultProvider>
  );
}
