import { Star, Quote, ArrowRight } from "lucide-react";

const SuccessStories = () => {
  const stories = [
    {
      quote: "The readiness test showed I needed better financial planning. I saved properly and now studying in Canada without stress.",
      name: "Rahul",
      details: "Computer Science Student in Toronto",
      rating: 5
    },
    {
      quote: "Their expert in Australia gave me real job market insights. I chose the right course and got internship immediately.",
      name: "Priya", 
      details: "Business Student in Melbourne",
      rating: 5
    },
    {
      quote: "The consultancy they recommended was transparent and supportive. Got my US student visa approved in first attempt.",
      name: "Arjun",
      details: "Engineering Student in California", 
      rating: 5
    }
  ];

  return (
    <section id="stories" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Star className="w-4 h-4 mr-2" />
            Success Stories
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Students Living Their
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">
              Study Abroad Dreams
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Real stories from students who used our platform to successfully study abroad
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stories.map((story, index) => (
            <div key={index} className="group bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:-translate-y-2">
              <div className="mb-6">
                <Quote className="text-blue-500 mb-4" size={32} />
                <p className="text-slate-700 text-lg leading-relaxed italic font-medium">
                  "{story.quote}"
                </p>
              </div>
              
              <div className="border-t border-slate-200 pt-6">
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-500 fill-current" size={16} />
                  ))}
                </div>
                
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-bold text-slate-900">{story.name}</h4>
                    <p className="text-slate-600 text-sm">{story.details}</p>
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

export default SuccessStories;
