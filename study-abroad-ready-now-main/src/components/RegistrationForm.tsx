import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate=useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReturnHome = () => {
    navigate('/')
  };

  return (
    <section id="register" className="min-h-screen flex flex-col lg:flex-row">
      
      <div
        className="lg:w-1/2 bg-cover bg-center text-white flex justify-start items-center p-10"
        style={{ backgroundImage: "url('/lovable-uploads/background-image.jpg')" }}
      >
        <div className="text-center flex flex-col items-center -mt-24">
          <img
            src="/lovable-uploads/Upsort-career.png"
            alt="Upsort Careers"
            className="h-16 w-auto mb-4"
          />
          <h2 className="text-4xl font-bold uppercase mb-6">Upsort Career</h2>
          <p className="text-2xl font-semibold leading-relaxed max-w-xl mb-4">
            "At Upsort Career, we guide you in making confident, well-informed decisions about studying abroad.
            Our trusted consultants and AI-powered assessment ensure you're on the right path to your dream destination."
          </p>
          <p className="italic text-lg mt-2">— Your Trusted Pathway to Global Success</p>
        </div>
      </div>

      
      <div className="lg:w-1/2 flex justify-center items-center bg-white p-10">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 bg-gray-50 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Registration Form</h2>
            <p className="text-gray-600 text-center mb-6">Let's start with your personal details</p>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">First Name *</label>
                <input type="text" placeholder="Enter your first name" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Last Name *</label>
                <input type="text" placeholder="Enter your last name" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                <input type="email" placeholder="Enter your email" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                <input type="tel" placeholder="Enter your phone number" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">City</label>
                <input type="text" placeholder="Enter your city" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Register
            </button>
          </form>
        ) : (
          <div className='flex flex-col justify-center items-center w-full min-h-[500px] bg-white p-10 text-center rounded-xl shadow-lg'>
            <h2 className='text-4xl font-bold mb-4 text-gray-800'>Thank You!</h2>
            <p className='text-lg text-gray-600 mb-6'>Your registration has been successfully submitted.</p>
            <button
              onClick={handleReturnHome}
              className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300'
            >
              OK
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RegistrationForm;
