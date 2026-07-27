"use client";

import { useEffect, useState } from "react";

const ACTIVITIES = [
  { name: "조OO님", region: "서울 마포구", service: "오래된 배관 교체" },
  { name: "김OO님", region: "경기 의정부시", service: "하수구 막힘 해결" },
  { name: "이OO님", region: "서울 도봉구", service: "천장 누수 진단" },
  { name: "박OO님", region: "경기 양주시", service: "동파 배관 해빙" },
  { name: "최OO님", region: "서울 노원구", service: "화장실 누수 수리" },
];

const SHOW_MS = 5000;
const GAP_MS = 4000;
const START_DELAY_MS = 2000;

function randomMinutesAgo() {
  const mins = 2 + Math.floor(Math.random() * 38);
  return `${mins}분 전`;
}

export default function LiveActivityToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [timeLabel, setTimeLabel] = useState("");

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const cycle = () => {
      setTimeLabel(randomMinutesAgo());
      setVisible(true);

      timers.push(
        setTimeout(() => {
          setVisible(false);
          timers.push(
            setTimeout(() => {
              setIndex((i) => (i + 1) % ACTIVITIES.length);
              cycle();
            }, GAP_MS)
          );
        }, SHOW_MS)
      );
    };

    timers.push(setTimeout(cycle, START_DELAY_MS));

    return () => timers.forEach(clearTimeout);
  }, []);

  const item = ACTIVITIES[index];

  return (
    <div
      aria-hidden
      className={`fixed left-4 top-20 z-30 hidden w-64 max-w-[78vw] rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-100 transition-all duration-500 sm:block sm:w-72 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
          <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
          {item.name} · 상담 접수
        </p>
        <span className="shrink-0 text-[11px] text-slate-400">
          {timeLabel}
        </span>
      </div>
      <p className="mt-1.5 text-xs text-slate-500">
        {item.region} · {item.service}
      </p>
    </div>
  );
}
