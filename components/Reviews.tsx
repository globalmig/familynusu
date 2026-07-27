import Reveal from "./Reveal";
import ReviewsMarquee from "./ReviewsMarquee";

export default function Reviews() {
  return (
    <section id="reviews" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-bold text-orange-500">이용 안내</p>
          <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
            이런 상황에서 이렇게 도와드립니다
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            실제 고객 후기는 시공이 쌓이는 대로 이곳에 업데이트할 예정입니다.
          </p>
        </Reveal>
      </div>

      <Reveal delay={100}>
        <ReviewsMarquee />
      </Reveal>
    </section>
  );
}
