
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProblemsSection from "@/components/ProblemsSection";
import ThreeStepProcess from "@/components/ThreeStepProcess";
import SuccessStories from "@/components/SuccessStories";
import ContactSection from "@/components/ContactSection";
import RegistrationForm from "@/components/RegistrationForm";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ProblemsSection />
      <ThreeStepProcess />
      <RegistrationForm />
      <SuccessStories />
      <ContactSection />
    </div>
  );
};

export default Index;
