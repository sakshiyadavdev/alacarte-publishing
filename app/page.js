import Hero from "@/components/Hero";
import AudienceSection from "@/components/AudienceSection";
import ServicesSection from "@/components/ServicesSection";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <AudienceSection />
      <ServicesSection />
      <Testimonials />
      <CTASection />
    </>
  );
}