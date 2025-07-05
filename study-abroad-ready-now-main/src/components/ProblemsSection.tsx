import { AlertTriangle, X } from "lucide-react";

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
    "Lack of transparency throughout the entire process, from planning to settlement"
  ];

  return (
    <section id="assessment" className="py-12 px-4 bg-white">
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
                  <AlertTriangle className="text-red-500 flex-shrink-0" size={18} />
                </div>
                <p className="text-slate-700 font-medium leading-relaxed">{problem}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-lg p-6 shadow-lg">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              Our 1-Step Process Helps You Avoid These Problems
            </h3>
            <p className="text-green-700 text-lg">
              Get AI driven assessment, expert guidance, and verified consultancy matching
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
