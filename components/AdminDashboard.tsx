"use client";

import Image from "next/image";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { TbPencil, TbPhotoUp, TbPlus, TbTrash, TbX } from "react-icons/tb";
import type { ContentItem } from "@/lib/content-store";
import { HOMEPAGE_PREVIEW_LIMIT, type ContentNamespace } from "@/lib/content";

const LABELS: Record<
  ContentNamespace,
  { formTitle: string; itemLabel: string; empty: string }
> = {
  cases: {
    formTitle: "작업사례",
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

function FileField({
  currentFileHint,
  required,
}: {
  currentFileHint?: string;
  required?: boolean;
}) {
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-blue-500 hover:bg-blue-50">
      <TbPhotoUp size={18} />
      <span className="truncate">
        {fileName ?? currentFileHint ?? "이미지 선택"}
      </span>
      <input
        type="file"
        name="image"
        accept="image/*"
        required={required}
        className="hidden"
        onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
      />
    </label>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <TbX className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
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
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deletingSelection, setDeletingSelection] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);
  const [createSubmitting, setCreateSubmitting] = useState(false);
  const [createError, setCreateError] = useState("");

  const [editItem, setEditItem] = useState<ContentItem | null>(null);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [editError, setEditError] = useState("");

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => item.title.toLowerCase().includes(q));
  }, [items, query]);

  const homepageVisibleIds = useMemo(
    () => new Set(items.slice(0, HOMEPAGE_PREVIEW_LIMIT).map((item) => item.id)),
    [items]
  );

  async function handleCreateSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setCreateSubmitting(true);
    setCreateError("");

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
      setCreateOpen(false);
    } catch (err) {
      setCreateError(
        err instanceof Error ? err.message : "등록 중 오류가 발생했습니다."
      );
    } finally {
      setCreateSubmitting(false);
    }
  }

  async function handleEditSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editItem) return;
    const formData = new FormData(e.currentTarget);

    setEditSubmitting(true);
    setEditError("");

    try {
      const res = await fetch(`${apiBase}/${editItem.id}`, {
        method: "PATCH",
        body: formData,
      });
      const data = (await res.json()) as {
        item?: ContentItem;
        error?: string;
      };
      if (!res.ok || !data.item) {
        throw new Error(data.error || "수정에 실패했습니다.");
      }
      const updated = data.item;
      setItems((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      setEditItem(null);
    } catch (err) {
      setEditError(
        err instanceof Error ? err.message : "수정 중 오류가 발생했습니다."
      );
    } finally {
      setEditSubmitting(false);
    }
  }

  function toggleSelected(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  async function handleDeleteSelected() {
    if (selectedIds.size === 0) return;
    if (!confirm(`선택한 ${selectedIds.size}개의 ${labels.itemLabel}를 삭제할까요?`))
      return;

    setDeletingSelection(true);
    try {
      const res = await fetch(apiBase, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selectedIds) }),
      });
      if (!res.ok) throw new Error();
      setItems((prev) => prev.filter((item) => !selectedIds.has(item.id)));
      setSelectedIds(new Set());
    } catch {
      alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setDeletingSelection(false);
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
            {items.length === 0
              ? "기본 예시 표시 중"
              : items.length > HOMEPAGE_PREVIEW_LIMIT
              ? `최신 ${HOMEPAGE_PREVIEW_LIMIT}개만 노출 중`
              : "전체 노출 중"}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="제목으로 검색"
            className="w-full max-w-xs rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
          <p className="text-xs font-semibold text-slate-400">
            {filteredItems.length}개 표시 중
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDeleteSelected}
            disabled={selectedIds.size === 0 || deletingSelection}
            title={
              selectedIds.size > 0
                ? `선택한 ${selectedIds.size}개 삭제`
                : "삭제할 항목을 선택하세요"
            }
            className="flex items-center gap-1.5 rounded-full bg-red-50 px-3.5 py-2 text-xs font-bold text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-300"
          >
            <TbTrash size={16} />
            {deletingSelection
              ? "삭제 중..."
              : selectedIds.size > 0
              ? `삭제 (${selectedIds.size})`
              : "삭제"}
          </button>
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-orange-500 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-orange-600"
          >
            <TbPlus size={16} />
            추가
          </button>
        </div>
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
              <label className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-md bg-white/90 shadow-sm">
                <input
                  type="checkbox"
                  checked={selectedIds.has(item.id)}
                  onChange={() => toggleSelected(item.id)}
                  className="h-4 w-4 accent-blue-600"
                />
              </label>
              <span
                className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[11px] font-bold shadow-sm ${
                  homepageVisibleIds.has(item.id)
                    ? "bg-blue-700 text-white"
                    : "bg-white/90 text-slate-400"
                }`}
              >
                {homepageVisibleIds.has(item.id) ? "홈 노출 중" : "홈 미노출"}
              </span>
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
                  onClick={() => {
                    setEditItem(item);
                    setEditError("");
                  }}
                  className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-200"
                >
                  <TbPencil size={14} />
                  수정
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

      {createOpen && (
        <Modal
          title={`새 ${labels.formTitle} 등록`}
          onClose={() => !createSubmitting && setCreateOpen(false)}
        >
          <form onSubmit={handleCreateSubmit} className="space-y-3">
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
            <FileField required />
            {createError && (
              <p className="text-xs font-medium text-red-500">
                {createError}
              </p>
            )}
            <button
              type="submit"
              disabled={createSubmitting}
              className="w-full rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {createSubmitting ? "업로드 중..." : "등록하기"}
            </button>
          </form>
        </Modal>
      )}

      {editItem && (
        <Modal
          title={`${labels.formTitle} 수정`}
          onClose={() => !editSubmitting && setEditItem(null)}
        >
          <form onSubmit={handleEditSubmit} className="space-y-3">
            <input
              name="title"
              required
              defaultValue={editItem.title}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
            <textarea
              name="description"
              rows={3}
              defaultValue={editItem.description}
              placeholder="내용 (선택)"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
            <FileField currentFileHint="이미지를 바꾸려면 선택 (선택 안 하면 기존 이미지 유지)" />
            {editError && (
              <p className="text-xs font-medium text-red-500">{editError}</p>
            )}
            <button
              type="submit"
              disabled={editSubmitting}
              className="w-full rounded-full bg-blue-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {editSubmitting ? "저장 중..." : "저장하기"}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
