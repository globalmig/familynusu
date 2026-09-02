import ConsultProvider from "@/components/ConsultProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

export default function Loading() {
  return (
    <ConsultProvider>
      <Header />
      <main className="flex-1 animate-pulse bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="h-3.5 w-20 rounded bg-slate-200" />
          <div className="mt-3 h-7 w-64 rounded bg-slate-200" />

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-3xl bg-white ring-1 ring-slate-100">
                <div className="aspect-4/3 bg-slate-200" />
                <div className="space-y-2 p-5">
                  <div className="h-4 w-1/2 rounded bg-slate-200" />
                  <div className="h-3 w-full rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </ConsultProvider>
  );
}
