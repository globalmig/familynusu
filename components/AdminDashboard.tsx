"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { CaseItem } from "@/lib/cases";

export default function AdminDashboard({
  initialCases,
}: {
  initialCases: CaseItem[];
}) {
  const router = useRouter();
  const [cases, setCases] = useState(initialCases);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/cases", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as {
        case?: CaseItem;
        error?: string;
      };
      if (!res.ok || !data.case) {
        throw new Error(data.error || "등록에 실패했습니다.");
      }
      setCases((prev) => [data.case as CaseItem, ...prev]);
      form.reset();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "등록 중 오류가 발생했습니다."
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("이 작업사례를 삭제할까요?")) return;
    setDeletingId(id);

    try {
      const res = await fetch(`/api/cases/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setCases((prev) => prev.filter((c) => c.id !== id));
    } catch {
      alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-slate-900">작업사례 관리</h1>
        <button
          onClick={handleLogout}
          className="text-sm font-semibold text-slate-500 hover:text-slate-700"
        >
          로그아웃
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-3 rounded-3xl border border-slate-100 bg-slate-50 p-5"
      >
        <p className="text-sm font-bold text-slate-700">새 작업사례 등록</p>
        <input
          name="title"
          required
          placeholder="제목 (예: 옥상 방수 시공)"
          className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />
        <textarea
          name="description"
          rows={2}
          placeholder="간단한 설명 (선택)"
          className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />
        <input
          name="image"
          type="file"
          accept="image/*"
          required
          className="w-full text-sm text-slate-600"
        />
        {error && <p className="text-xs font-medium text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {submitting ? "업로드 중..." : "등록하기"}
        </button>
      </form>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {cases.map((c) => (
          <div
            key={c.id}
            className="group relative aspect-4/5 overflow-hidden rounded-2xl bg-slate-100"
          >
            <Image
              src={`/api/cases/image/${c.imageKey}`}
              alt={c.title}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
            <p className="absolute inset-x-0 bottom-10 px-3 text-sm font-bold text-white drop-shadow">
              {c.title}
            </p>
            <button
              onClick={() => handleDelete(c.id)}
              disabled={deletingId === c.id}
              className="absolute bottom-2 right-2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-red-600 transition-colors hover:bg-white disabled:opacity-60"
            >
              {deletingId === c.id ? "삭제 중..." : "삭제"}
            </button>
          </div>
        ))}
        {cases.length === 0 && (
          <p className="col-span-full text-sm text-slate-400">
            등록된 작업사례가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
