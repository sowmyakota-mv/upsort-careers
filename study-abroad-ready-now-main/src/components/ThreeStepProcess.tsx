import { CheckCircle, Users, Target, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ThreeStepProcess = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: CheckCircle,
      title: "Study Abroad Readiness Assessment",
      subtitle: "Free Online Test to Check Your Preparation",
      description:
        "20-question evaluation covering financial readiness, academic preparation, cultural adaptability, and language proficiency.",
      features: [
        "Financial readiness for International Education",
        "Family Support Assessment",
        "Willingness and Readiness to Commit to Hard Work",
        "Free Readiness Assessment with a Detailed Percentage Score",
        "Results Will Be Provided Shortly via Email or Phone Call",
        "Expert Review and Discussion Based on your Answers",
      ],
      cta: "Start Your Assessment",
      gradient: "from-blue-500 to-blue-600",
      route: "/assessment",
    },
    {
      icon: Target,
      title: "Country Selection and Career Guidance",
      subtitle: "Find the Best Country for Your Career Goals",
      description:
        "Complete job market analysis, visa requirements, and cultural preparation with live consultations from overseas professionals.",
      features: [
        "Job market analysis for your field",
        "Complete visa requirements explanation",
        "Cost of living comparison",
        "University and course recommendations",
        "Live consultations with overseas professionals",
        "Cultural preparation and lifestyle guidance",
      ],
      cta: "",
      gradient: "from-teal-500 to-teal-600",
    },
    {
      icon: Users,
      title: "Education Consultancy Matching",
      subtitle: "Get Matched with Best Study Abroad Consultants",
      description:
        "Verified list of top education consultants with transparent pricing and quality assurance.",
      features: [
        "Verified list of top education consultants",
        "Compare consultancy services and success rates",
        "Transparent pricing with no hidden costs",
        "Reference discounts from partner consultancies",
        "Quality assurance and regular follow-ups",
        "Track your application process",
      ],
      cta: "",
      gradient: "from-orange-500 to-orange-600",
    },
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <section id="process" className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto relative">
        
        {/* Box 1: Title + Paragraph */}
        <div className="bg-[rgba(28,103,109,0.87)] rounded-3xl shadow-xl p-12 text-center relative z-10">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Target className="w-4 h-4 mr-2" />
            Our Proven Process
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Your Bridge to{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-teal-200">
              Study Abroad Success
            </span>
          </h2>
          <p className="text-lg text-slate-100 max-w-3xl mx-auto font-medium mb-14">
            Our comprehensive 3-step verification process helps you avoid
            common struggles and ensures you're fully prepared for your
            international education journey.
          </p>
        </div>

        {/* Box 2: Steps (Centered & Overlapping) */}
        <div className="relative -mt-20">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-slate-200 relative z-20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              
              {/* Left */}
              <div className="space-y-6 text-left">
                {(() => {
                  const Icon = steps[currentStep].icon;
                  return (
                    <div
                      className={`inline-flex items-center gap-3 bg-gradient-to-r ${steps[currentStep].gradient} text-white px-4 py-2 rounded-lg`}
                    >
                      <Icon size={22} />
                      <span className="font-semibold">Step {currentStep + 1}</span>
                    </div>
                  );
                })()}

                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight">
                  {steps[currentStep].title}
                </h3>

                <p
                  className={`text-lg font-semibold bg-gradient-to-r ${steps[currentStep].gradient} bg-clip-text text-transparent`}
                >
                  {steps[currentStep].subtitle}
                </p>

                <p className="text-slate-600 leading-relaxed">
                  {steps[currentStep].description}
                </p>

                {steps[currentStep].cta && (
                  <Button
                    className={`bg-gradient-to-r ${steps[currentStep].gradient} hover:shadow-lg transition-all duration-300 group`}
                    onClick={() => {
                      if (steps[currentStep].route) {
                        navigate(steps[currentStep].route);
                      }
                    }}
                  >
                    {steps[currentStep].cta}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                )}
              </div>

              {/* Right: Features */}
              <div>
                <div className="grid gap-3">
                  {steps[currentStep].features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                      <span className="text-slate-700 font-medium leading-snug">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Arrows (Rectangular Buttons) */}
            <button
              onClick={prevStep}
              className="absolute left-[-6rem] top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 py-4 shadow-lg"
            >
              <ChevronLeft size={30} />
            </button>
            <button
              onClick={nextStep}
              className="absolute right-[-6rem] top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 py-4 shadow-lg"
            >
              <ChevronRight size={30} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeStepProcess;
