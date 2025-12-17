import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import AboutUs from "@/components/landing/AboutUs";
import Challenges from "@/components/landing/Challenges";
import Services from "@/components/landing/Services";
import HowItWorks from "@/components/landing/HowItWorks";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('onboarding-complete');
    if (hasOnboarded !== 'true') {
      navigate('/onboarding', { replace: true });
    }
  }, [navigate]);

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
