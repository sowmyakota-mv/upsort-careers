import { CheckCircle, Users, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";

const ThreeStepProcess = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIntendedRoute } = useAuth();

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
      cta: "", // Button removed
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
      cta: "", // Button removed
      gradient: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <section id="process" className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Target className="w-4 h-4 mr-2" />
            Our Proven Process
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Your Bridge to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
              Study Abroad Success
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our comprehensive 3-step verification process ensures you're fully prepared for your international education journey.
          </p>
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-4 top-8 bg-white rounded-full p-4 shadow-lg border-4 border-slate-100 z-10">
                <span className="text-2xl font-bold text-slate-600">0{index + 1}</span>
              </div>

              {index < steps.length - 1 && (
                <div className="absolute left-4 top-20 w-0.5 h-20 bg-slate-200 z-0"></div>
              )}

              <div className="bg-white rounded-3xl shadow-xl p-8 ml-16 hover:shadow-2xl transition-all duration-500 border border-slate-100">
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-1 space-y-6">
                    <div className={`inline-flex items-center gap-3 bg-gradient-to-r ${step.gradient} text-white px-4 py-2 rounded-full`}>
                      <step.icon size={20} />
                      <span className="font-semibold">Step {index + 1}</span>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight">
                      {step.title}
                    </h3>

                    <p className={`text-lg font-semibold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                      {step.subtitle}
                    </p>

                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Only render button for Step 1 */}
                    {index === 0 && (
                      <Button
                        className={`bg-gradient-to-r ${step.gradient} hover:shadow-lg transition-all duration-300 group`}
                        onClick={() => {
                          if (step.route) {
                            if (isAuthenticated) {
                              navigate(step.route);
                            } else {
                              setIntendedRoute(step.route);
                              toast({
                                title: "Authentication Required",
                                description: "Please login or register to start the assessment.",
                                variant: "destructive",
                              });
                              navigate("/register");
                            }
                          }
                        }}
                      >
                        {step.cta}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    )}
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid md:grid-cols-2 gap-4">
                      {step.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                          <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                          <span className="text-slate-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreeStepProcess;
