import ConsultProvider from "@/components/ConsultProvider";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PromiseStrip from "@/components/PromiseStrip";
import Services from "@/components/Services";
import BrandStory from "@/components/BrandStory";
import WhyUs from "@/components/WhyUs";
import ServiceArea from "@/components/ServiceArea";
import Process from "@/components/Process";
import Cases from "@/components/Cases";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import BottomCta from "@/components/BottomCta";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import LiveActivityToast from "@/components/LiveActivityToast";

export default function Home() {
  return (
    <ConsultProvider>
      <Header />
      <LiveActivityToast />
      <main className="flex-1">
        <Hero />
        <PromiseStrip />
        <Services />
        <BrandStory />
        <WhyUs />
        <ServiceArea />
        <Process />
        <Cases />
        <Reviews />
        <Faq />
        <BottomCta />
      </main>
      <Footer />
      <FloatingActions />
    </ConsultProvider>
  );
}
