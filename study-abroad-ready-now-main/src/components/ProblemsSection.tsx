import { AlertTriangle, Plane } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

const WhoWeAreSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="about"
      className="py-10 my-16 bg-blue-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center px-6 relative">
        {/* Left Side Image */}
        <div className="relative flex justify-center">
          <img
            src="/lovable-uploads/who-we-are.png"
            alt="Who We Are"
            className="rounded-2xl shadow-xl w-full max-w-xl object-cover"
          />
        </div>

        {/* Right Side Content */}
        <div>
          {/* Tag */}
          <div className="inline-block mb-4 px-4 py-1 border-l-4 border-red-600 bg-red-50 text-red-700 font-semibold text-sm uppercase tracking-wide">
            Who We Are
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-snug">
            Best Immigration & Visa
            <br />
            <span className="text-red-600">Consultation.</span>
          </h2>

          <p className="text-lg text-slate-600 mb-6">
            We provide expert immigration and visa guidance with years of
            experience, helping students and professionals achieve their dreams
            abroad quickly and seamlessly.
          </p>

          {/* Bullet Points */}
          <ul className="space-y-2 text-slate-700 mb-6">
            <li className="flex items-center gap-2">
              <span className="text-red-600 font-bold">➤</span> Expertise Visa
              Processing
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-600 font-bold">➤</span> Fastest Working
              Process
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-600 font-bold">➤</span> Trusted Guidance
            </li>
          </ul>

          {/* Button */}
          <button
            onClick={() => navigate("/about")}
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded shadow hover:bg-red-700 transition"
          >
            Read More
          </button>
        </div>
      </div>

      {/* Floating Plane */}
      <Plane className="w-6 h-6 text-red-500 absolute top-20 right-10 animate-float" />
    </section>
  );
};

// Extra Tailwind animations
const customAnimations = `
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-float {
  animation: float 4s ease-in-out infinite;
}
`;

const ProblemsSection = () => {
  const problems = [
    "Lack of proper financial planning before applying",
    "Wasting time and money on the wrong study abroad choices",
    "Overlooking family and financial responsibilities before moving abroad",
    "Course dropouts due to mismatch or difficulty in chosen programs",
    "Struggles in obtaining permanent residency post-study",
    "Limited awareness of the job market in the destination country",
    "Choosing the wrong consultancy without background checks",
    "Consultancies failing to provide promised support after you go abroad",
    "Lack of transparency throughout the entire process, from planning to settlement",
  ];

  return (
    <section id="assessment" className="bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Common Student Challenges
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Why Students Struggle
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
              Going Abroad
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Don't let these common mistakes derail your study abroad dreams
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-1.5">
                <div className="bg-red-100 p-1.5 rounded-md group-hover:bg-red-200 transition-colors">
                  <AlertTriangle
                    className="text-red-500 flex-shrink-0"
                    size={18}
                  />
                </div>
                <p className="text-slate-700 font-medium leading-relaxed">
                  {problem}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-lg p-6 shadow-lg">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              Our 3-Step Process Helps You Avoid These Problems
            </h3>
            <p className="text-green-700 text-lg">
              Get AI driven assessment, expert guidance, and verified consultancy
              matching
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <>
      <ScrollToTop />
      <style>{customAnimations}</style>
      <WhoWeAreSection />
      <ProblemsSection />
    </>
  );
};

export default HomePage;
