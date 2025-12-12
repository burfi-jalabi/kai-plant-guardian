import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import AboutUs from "@/components/landing/AboutUs";
import Challenges from "@/components/landing/Challenges";
import Services from "@/components/landing/Services";
import HowItWorks from "@/components/landing/HowItWorks";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutUs />
      <Challenges />
      <Services />
      <HowItWorks />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Index;
