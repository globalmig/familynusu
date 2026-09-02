"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import type { ContentItem } from "@/lib/content-store";
import type { ContentNamespace } from "@/lib/content";

const LABELS: Record<
  ContentNamespace,
  { formTitle: string; itemLabel: string; empty: string }
> = {
  cases: {
    formTitle: "새 작업사례 등록",
    itemLabel: "작업사례",
    empty: "등록된 작업사례가 없습니다.",
  },
};

export default function AdminDashboard({
  namespace,
  initialItems,
}: {
  namespace: ContentNamespace;
  initialItems: ContentItem[];
}) {
  const apiBase = `/api/content/${namespace}`;
  const labels = LABELS[namespace];

  const [items, setItems] = useState(initialItems);
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
      const res = await fetch(apiBase, { method: "POST", body: formData });
      const data = (await res.json()) as {
        item?: ContentItem;
        error?: string;
      };
      if (!res.ok || !data.item) {
        throw new Error(data.error || "등록에 실패했습니다.");
      }
      setItems((prev) => [data.item as ContentItem, ...prev]);
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
    if (!confirm(`이 ${labels.itemLabel}를 삭제할까요?`)) return;
    setDeletingId(id);

    try {
      const res = await fetch(`${apiBase}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-3 rounded-3xl border border-slate-100 bg-slate-50 p-5"
      >
        <p className="text-sm font-bold text-slate-700">{labels.formTitle}</p>
        <input
          name="title"
          required
          placeholder="제목"
          className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />
        <textarea
          name="description"
          rows={3}
          placeholder="내용 (선택)"
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

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
              <Image
                src={`/api/media/${item.imageKey}`}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-sm font-bold text-slate-900">
                {item.title}
              </p>
              {item.description && (
                <p className="mt-1 whitespace-pre-line text-xs leading-5 text-slate-500">
                  {item.description}
                </p>
              )}
              <button
                onClick={() => handleDelete(item.id)}
                disabled={deletingId === item.id}
                className="mt-3 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
              >
                {deletingId === item.id ? "삭제 중..." : "삭제"}
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="col-span-full text-sm text-slate-400">
            {labels.empty}
          </p>
        )}
      </div>
    </div>
  );
}
