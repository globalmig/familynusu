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
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href="/cases"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-700"
          >
            <TbArrowLeft size={16} />
            작업 사례 목록
          </Link>

          <div className="mt-4 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
            <div className="relative aspect-4/3 overflow-hidden sm:aspect-16/9">
              <Image
                src={`/api/media/${item.imageKey}`}
                alt={item.title}
                fill
                sizes="(min-width: 640px) 768px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <h1 className="text-xl font-black text-slate-900 break-keep sm:text-2xl">
                {item.title}
              </h1>
              {item.description && (
                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">
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
