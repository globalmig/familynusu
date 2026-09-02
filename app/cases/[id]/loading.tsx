import ConsultProvider from "@/components/ConsultProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

export default function Loading() {
  return (
    <ConsultProvider>
      <Header />
      <main className="flex-1 animate-pulse bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="h-4 w-28 rounded bg-slate-200" />

          <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="aspect-4/3 rounded-3xl bg-slate-200" />
            <div>
              <div className="h-7 w-2/3 rounded bg-slate-200" />
              <div className="mt-3 h-3 w-24 rounded bg-slate-200" />
              <div className="mt-6 space-y-2.5">
                <div className="h-3.5 w-full rounded bg-slate-200" />
                <div className="h-3.5 w-full rounded bg-slate-200" />
                <div className="h-3.5 w-2/3 rounded bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </ConsultProvider>
  );
}
