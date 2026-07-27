"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site-config";

export default function InlineConsultForm() {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
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

    const subject = encodeURIComponent(`[무료 상담 신청] ${name}`);
    const body = encodeURIComponent(
      `성함: ${name}\n연락처: ${contact}\n지역: ${region}\n문의내용: ${message}`
    );

    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <div className="w-full rounded-3xl bg-white p-5 text-slate-800 shadow-2xl sm:p-6">
      <p className="text-lg font-black text-blue-900">무료 상담 신청</p>
      <p className="mt-1 text-xs text-slate-500">
        아래 내용을 남겨주시면 빠르게 연락드리겠습니다.
      </p>

      {submitted ? (
        <div className="mt-6 py-6 text-center">
          <p className="text-base font-bold text-blue-700">
            메일 작성창이 열렸습니다.
          </p>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            내용을 확인 후 전송해주시면 확인되는대로 연락드립니다. 급하시면
            바로 전화 주세요.
          </p>
          <a
            href={site.phoneHref}
            className="mt-4 inline-block rounded-full bg-blue-700 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-800"
          >
            {site.phone}
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-2.5">
          <input
            name="name"
            required
            placeholder="성함"
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
          <input
            name="contact"
            required
            placeholder="연락처 (예: 010-1234-5678)"
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
          <input
            name="region"
            required
            placeholder="지역 (예: 서울 도봉구, 경기 의정부)"
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
          <textarea
            name="message"
            required
            rows={3}
            placeholder="문의내용(증상 설명)"
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
          <label className="flex items-start gap-2 text-[11px] leading-4 text-slate-500">
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
          <button
            type="submit"
            disabled={!agreed}
            className="w-full rounded-full bg-orange-500 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            상담 신청하기
          </button>
        </form>
      )}
    </div>
  );
}
