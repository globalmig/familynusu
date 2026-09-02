"use client";

import { useRouter } from "next/navigation";
import AdminDashboard from "./AdminDashboard";
import type { ContentItem } from "@/lib/content-store";

export default function AdminPanel({
  initialCases,
}: {
  initialCases: ContentItem[];
}) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-slate-900">관리자 페이지</h1>
        <button
          onClick={handleLogout}
          className="text-sm font-semibold text-slate-500 hover:text-slate-700"
        >
          로그아웃
        </button>
      </div>

      <div className="mt-6">
        <AdminDashboard namespace="cases" initialItems={initialCases} />
      </div>
    </div>
  );
}
