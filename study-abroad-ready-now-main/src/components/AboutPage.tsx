const AboutPage = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-bold text-center mb-10">
          About <span className="text-red-600">Us</span>
        </h1>

        {/* Who We Are */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-800">Who We Are</h2>
            <p className="text-slate-600 mb-4">
              We are a leading immigration and visa consultancy dedicated to
              guiding students, professionals, and families toward achieving
              their dreams abroad. With years of expertise, we simplify the
              process and provide transparent support at every step.
            </p>
            <p className="text-slate-600">
              Our commitment goes beyond just processing visas—we focus on
              preparing clients for cultural adaptability, career success, and
              long-term settlement in their chosen countries.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="/lovable-uploads/who-we-are.png"
              alt="About Us"
              className="rounded-2xl shadow-lg w-full max-w-md object-cover"
            />
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Why Choose Us</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li>Experienced consultants with global expertise</li>
            <li>End-to-end visa and career guidance</li>
            <li>Transparent pricing and reliable support</li>
            <li>Personalized solutions for every client</li>
            <li>High success rate in visa approvals</li>
          </ul>
        </div>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-800">Our Mission</h2>
            <p className="text-slate-600">
              To empower individuals by providing expert immigration guidance,
              fostering global opportunities, and ensuring a seamless journey
              toward international education and careers.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-800">Our Vision</h2>
            <p className="text-slate-600">
              To become the most trusted global partner for study abroad and
              immigration, known for transparency, innovation, and life-changing
              opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
