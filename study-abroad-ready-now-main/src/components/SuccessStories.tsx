import { Star, CheckCircle, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

// ---------------- WHY CHOOSE US ----------------
const WhyChooseUs = () => {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-5">
        
        {/* Left side - Red background */}
        <div className="md:col-span-2 bg-red-400 text-white p-10 space-y-8">
          <h2 className="text-3xl font-bold leading-snug">
            We ensure prompt <br /> services for visa & Immigration
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-8 h-8 text-white bg-red-800 rounded-full p-1" />
              <div>
                <h4 className="text-lg font-semibold">Fastest Working Process</h4>
                <p className="text-red-100 text-sm">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="w-8 h-8 text-white bg-red-800 rounded-full p-1" />
              <div>
                <h4 className="text-lg font-semibold">Expertise visa Processing</h4>
                <p className="text-red-100 text-sm">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="w-8 h-8 text-white bg-red-800 rounded-full p-1" />
              <div>
                <h4 className="text-lg font-semibold">Expert Support Panel</h4>
                <p className="text-red-100 text-sm">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="md:col-span-3 bg-white p-10 text-slate-800">
          <div className="inline-block mb-6">
            <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
              WHY CHOOSE US
            </span>
          </div>

          <h3 className="text-2xl font-bold mb-4 leading-snug">
            We are professional <br /> Expert in Immigration
          </h3>

          <p className="text-slate-600 mb-8 text-sm">
            There are many variations of passages available but the majority
            have suffered alteration in some form, by injected randomised words
            which don’t simply free text now slightly.
          </p>

          {/* Progress bars */}
          <div className="mb-6">
            <div className="flex justify-between text-xs font-medium mb-1">
              <span>Visa Consultation</span>
              <span>85%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full">
              <div className="h-2 bg-red-600 rounded-full w-[85%]" />
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between text-xs font-medium mb-1">
              <span>Immigration Consultancy</span>
              <span>90%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full">
              <div className="h-2 bg-red-600 rounded-full w-[90%]" />
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex items-center gap-4">
            <div className="bg-red-100 text-red-600 p-3 rounded-full">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-slate-600 text-sm">Call for free</p>
              <p className="text-lg font-bold text-red-600">+91-9705131111</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------------- SUCCESS STORIES ----------------
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

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % stories.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [stories.length]);

  const prevSlide = () => setCurrent((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev + 1) % stories.length);

  return (
    <section id="stories" className="mb-8 py-1 px-6 bg-slate-50 text-slate-800 scroll-mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side */}
        <div>
          <span className="bg-red-100 text-red-700 px-4 py-1 rounded text-sm font-semibold">
            &gt;&gt; TESTIMONIALS
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
            What say peoples <br /> about us
          </h2>
          <p className="text-slate-600 mb-10 max-w-md">
            We strongly support best practice sharing across our operations
            around the world and across various transportation sectors.
          </p>

          {/* Navigation Arrows */}
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 transition"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Right Side - Testimonial Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <div
              key={index}
              className={`bg-white text-slate-800 rounded-xl shadow-lg p-6 transition transform ${
                index === current ? "scale-100" : "scale-95 opacity-70"
              }`}
            >
              <div className="flex gap-1 mb-3">
                {[...Array(story.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-500 fill-current" size={16} />
                ))}
              </div>
              <p className="text-slate-600 mb-4 text-sm italic">"{story.quote}"</p>
              <h5 className="font-bold">{story.name}</h5>
              <p className="text-red-600 text-sm">{story.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------------- PAGE EXPORT ----------------
const HomePage = () => {
  return (
    <>
      <WhyChooseUs />
      <SuccessStories />
    </>
  );
};

export default HomePage;
