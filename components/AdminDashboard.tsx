"use client";

import Image from "next/image";
import { useMemo, useState, type FormEvent } from "react";
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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

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
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => item.title.toLowerCase().includes(q));
  }, [items, query]);

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

  const latestDate = items[0]?.createdAt;

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-slate-400">
            전체 {labels.itemLabel}
          </p>
          <p className="mt-1 text-2xl font-black text-slate-900">
            {items.length}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-slate-400">최근 등록일</p>
          <p className="mt-1 text-sm font-bold text-slate-900 sm:text-base">
            {latestDate ? formatDate(latestDate) : "-"}
          </p>
        </div>
        <div className="col-span-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:col-span-1">
          <p className="text-xs font-semibold text-slate-400">홈페이지 노출</p>
          <p className="mt-1 text-sm font-bold text-slate-900 sm:text-base">
            {items.length > 0 ? "등록된 사례 표시 중" : "기본 예시 표시 중"}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
        <form
          onSubmit={handleSubmit}
          className="h-fit space-y-3 rounded-3xl border border-slate-100 bg-slate-50 p-5 lg:sticky lg:top-6"
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
            className="w-full rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {submitting ? "업로드 중..." : "등록하기"}
          </button>
        </form>

        <div>
          <div className="flex items-center justify-between gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="제목으로 검색"
              className="w-full max-w-xs rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
            <p className="shrink-0 text-xs font-semibold text-slate-400">
              {filteredItems.length}개 표시 중
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <Image
                    src={`/api/media/${item.imageKey}`}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 33vw, 100vw"
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
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-xs text-slate-400">
                      {formatDate(item.createdAt)}
                    </p>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
                    >
                      {deletingId === item.id ? "삭제 중..." : "삭제"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredItems.length === 0 && (
              <p className="col-span-full text-sm text-slate-400">
                {items.length === 0 ? labels.empty : "검색 결과가 없습니다."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
