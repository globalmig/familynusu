"use client";

import { useEffect, useState, type FormEvent } from "react";
import { TbX } from "react-icons/tb";
import { site } from "@/lib/site-config";

export default function ConsultModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setAgreed(false);
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const contact = (form.elements.namedItem("contact") as HTMLInputElement)
      .value;
    const region = (form.elements.namedItem("region") as HTMLInputElement)
      .value;
    const message = (
      form.elements.namedItem("message") as HTMLTextAreaElement
    ).value;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, region, message }),
      });

      if (!res.ok) {
        throw new Error();
      }

      setSubmitted(true);
    } catch {
      setError(
        "접수 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 전화로 문의해주세요."
      );
    } finally {
      setSubmitting(false);
    }
  }

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
          <h3 className="text-xl font-bold text-slate-900">
            무료 상담 신청
          </h3>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <TbX className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center">
            <p className="text-lg font-semibold text-blue-700">
              상담 신청이 접수되었습니다.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              빠르게 확인 후 연락드리겠습니다. 급하시면 바로 전화 주세요.
            </p>
            <a
              href={site.phoneHref}
              className="mt-4 inline-block rounded-full bg-blue-700 px-6 py-2.5 font-semibold text-white hover:bg-blue-800"
            >
              {site.phone}
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              name="name"
              required
              placeholder="성함"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
            <input
              name="contact"
              required
              placeholder="연락처 (예: 010-1234-5678)"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
            <input
              name="region"
              required
              placeholder="지역 (예: 서울 도봉구, 경기 의정부)"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
            <textarea
              name="message"
              required
              rows={3}
              placeholder="문의내용(증상 설명)"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
            <label className="flex items-start gap-2 text-xs text-slate-500">
              <input
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5"
              />
              상담 접수를 위해 성함, 연락처, 지역, 문의내용을 수집하며, 상담
              완료 후 1년간 보관 후 파기됩니다. 개인정보 수집 및 이용에
              동의합니다.
            </label>
            {error && (
              <p className="text-xs font-medium text-red-500">{error}</p>
            )}
            <button
              type="submit"
              disabled={!agreed || submitting}
              className="w-full rounded-full bg-orange-500 py-3 font-bold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {submitting ? "접수 중..." : "상담 신청하기"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
