import { site } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-10 text-slate-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-lg font-bold text-white">{site.name}</p>
        <div className="mt-3 flex flex-col gap-1 text-sm sm:flex-row sm:flex-wrap sm:gap-x-4">
          <span>대표: {site.representative}</span>
          <span>사업자등록번호: {site.bizRegNo}</span>
          <span>대표번호: {site.phone}</span>
          <span>이메일: {site.email}</span>
          <span>기반 지역: {site.baseArea}</span>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          © {site.year} {site.name}. All Rights Reserved.
        </p>
        <p className="mt-1 text-xs text-slate-500">
          홈페이지 제작:{" "}
          <a
            href="https://www.weasley-market.com/homepage-development/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-slate-600 underline-offset-2 hover:text-slate-300"
          >
            Weasley Market
          </a>
        </p>
      </div>
    </footer>
  );
}
