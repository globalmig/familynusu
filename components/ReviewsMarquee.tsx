"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import { TbQuote } from "react-icons/tb";

const SCENARIOS = [
  {
    service: "누수탐지",
    text: "새벽에도 전화 한 통이면 상담이 가능하고, 방문 후에는 벽을 뜯기 전에 정확한 원인부터 짚어드립니다. 필요한 부분만 최소로 공사해 비용 부담을 줄여드립니다.",
  },
  {
    service: "하수구 문제 해결",
    text: "역류·막힘 증상은 고압 장비로 원인을 확인한 뒤 신속하게 해결합니다. 작업 전후 과정을 사진으로 안내해 드립니다.",
  },
  {
    service: "누수 피해 복구",
    text: "아랫집 천장 누수처럼 보험 처리가 필요한 경우, 기술 소견서 등 필요한 서류를 함께 챙겨드립니다.",
  },
  {
    service: "동파 해빙",
    text: "한겨울 배관 동파도 늦은 시간 상관없이 출동해 신속하고 꼼꼼하게 조치해 드립니다.",
  },
  {
    service: "방수공사",
    text: "옥상·베란다·욕실 등 재발이 잦은 부위는 원인을 먼저 확인한 뒤, 꼭 필요한 범위만 방수 시공해 드립니다.",
  },
  {
    service: "수도설비",
    text: "노후 배관은 무조건 전체 교체를 권하지 않고, 상태를 살펴 부분 교체로 해결할 수 있는지부터 안내해 드립니다.",
  },
];

const LOOP = [...SCENARIOS, ...SCENARIOS];
const AUTO_SPEED = 32; // px per second

export default function ReviewsMarquee() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const draggedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      halfWidthRef.current = track.scrollWidth / 2;
    };
    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);

    let lastTime = performance.now();
    let raf = requestAnimationFrame(function loop(time) {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (!draggingRef.current) {
        offsetRef.current -= AUTO_SPEED * dt;
      }

      const half = halfWidthRef.current;
      if (half > 0) {
        if (offsetRef.current <= -half) offsetRef.current += half;
        if (offsetRef.current > 0) offsetRef.current -= half;
      }

      track.style.transform = `translateX(${offsetRef.current}px)`;
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
    };
  }, []);

  function handlePointerDown(e: PointerEvent) {
    draggingRef.current = true;
    draggedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    wrapRef.current?.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: PointerEvent) {
    if (!draggingRef.current) return;
    const delta = e.clientX - dragStartXRef.current;
    if (Math.abs(delta) > 3) draggedRef.current = true;
    offsetRef.current = dragStartOffsetRef.current + delta;
  }

  function handlePointerUp(e: PointerEvent) {
    draggingRef.current = false;
    wrapRef.current?.releasePointerCapture(e.pointerId);
  }

  return (
    <div
      ref={wrapRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative mt-10 cursor-grab touch-pan-y overflow-hidden select-none active:cursor-grabbing mask-[linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
    >
      <div ref={trackRef} className="flex w-max gap-5 px-4 will-change-transform sm:px-6">
        {LOOP.map((item, i) => (
          <div
            key={`${item.service}-${i}`}
            className="relative flex h-56 w-72 shrink-0 flex-col gap-4 rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-100 sm:h-52 sm:w-80 sm:p-7"
          >
            <TbQuote className="absolute right-6 top-6 h-8 w-8 text-blue-100" />
            <span className="w-fit rounded-full bg-blue-800 px-3 py-1 text-xs font-bold text-white">
              {item.service}
            </span>
            <p className="line-clamp-5 text-sm leading-7 text-slate-600">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
