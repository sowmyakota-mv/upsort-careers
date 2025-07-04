import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Globe, Users, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate =useNavigate()
  const handleCTAClick = () => {
    navigate('/register')
    const element = document.querySelector('#assessment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { icon: Users, value: "122+", label: "Students Placed" },
    { icon: Globe, value: "35+", label: "Trusted Partners" },
    { icon: Award, value: "100%", label: "Success Rate" }
  ];

  return (
    <section id="home" className="relative min-h-screen -mt-10 flex items-center overflow-hidden" style={{background: 'linear-gradient(to bottom, #4CA7A9, #A0D2C6)'}}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-3"></div>
      <div className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-br from-blue-100/40 to-green-100/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-green-100/30 to-blue-100/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-50/20 to-green-50/20 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-teal-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
              <CheckCircle className="w-4 h-4 mr-2" />
              Free Assessment • No Hidden Costs
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl lg:text-4xl font-bold text-slate-900 leading-tight">
              Confused About Studying Abroad or Choosing the Right Consultancy?
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
                We are Here to Help!
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
              Join our 3-step verification process to make confident, well-informed decisions about studying abroad. Powered by AI and expert insights, we help assess your readiness, match you with the right country, and connect you with trusted consultancy tie-ups to ensure transparent and reliable support.
            </p>

            {/* Benefits */}
            <div className="space-y-3">
              {[
                "AI-based readiness assessment",
                "Live expert consultation on courses, visas, and job prospects", 
                "Verified consultancy referrals with guaranteed service support"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-slate-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleCTAClick}
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
              >
                Register With Us
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-slate-300 hover:border-blue-500 hover:text-blue-600 transition-all duration-300" 
                onClick={()=>{
                  const element=document.querySelector('#process')
                  if(element){
                    element.scrollIntoView({behavior:'smooth'})
                  }
                }}
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200 mb-0">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="bg-gradient-to-br from-blue-100 to-teal-100 p-2 rounded-lg">
                      <stat.icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="/lovable-uploads/dd9a21ad-1d9f-4199-a8c5-8e851c43a32e.png" 
                alt="Three-Step Verification to Success"
                className="w-full max-w-lg mx-auto h-auto drop-shadow-2xl"
              />
            </div>
            {/* Floating Elements */}
            {/* <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg animate-float">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={20} />
                <span className="text-sm font-semibold">Visa Approved!</span>
              </div>
            </div>
            <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg animate-float" style={{animationDelay: '1s'}}>
              <div className="text-center">
                <div className="text-lg font-bold text-slate-900">95%</div>
                <div className="text-xs text-slate-600">Success Rate</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;