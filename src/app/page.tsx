import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { Footer } from "@/components/landing/Footer";
// You could add more sections like Testimonials, How it Works, Pricing etc.

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        {/* Add other sections here */}
        {/* <HowItWorksSection /> */}
        {/* <TestimonialsSection /> */}
        {/* <CallToActionSection /> */}
      </main>
      <Footer />
    </div>
  );
}