import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import emailjs from 'emailjs-com';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const RegistrationForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    city: '',
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [contactError, setContactError] = useState('');

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'email') {
      if (!validateEmail(value)) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
      }
    }
  };

  const handleContactChange = (value) => {
    setFormData((prev) => ({ ...prev, contact: value }));

    if (value.length < 7 || value.length > 15) {
      setContactError('Contact number must be between 7 and 15 digits.');
    } else {
      setContactError('');
    }
  };

  const sendRegistrationEmail = () => {
    const templateParams = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      contact: formData.contact,
      city: formData.city,
    };

    return emailjs
      .send('service_6m3emyd', 'template_p3v0tvf', templateParams, 'WV4ATcmY4I9TjdaBe')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
      })
      .catch((err) => {
        console.error('Email sending failed:', err);
      });
  };

  const saveRegistrationToBackend = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Backend submission failed');

      const result = await response.json();
      console.log('Backend Response:', result);
      return result;
    } catch (error) {
      console.error('Error in backend submission:', error);
      throw error;
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!navigator.onLine) {
      setError('You are offline. Please check your internet connection.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (formData.contact.length < 7 || formData.contact.length > 15) {
      setContactError('Contact number must be between 7 and 15 digits.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await sendRegistrationEmail();
      await saveRegistrationToBackend();

      login({ name: `${formData.firstName} ${formData.lastName}`, email: formData.email });
      setSubmittedData(formData);
      setFormData({ firstName: '', lastName: '', contact: '', email: '', city: '' });
      setIsSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturnHome = () => navigate('/');

  return (
    <section id="auth" className="min-h-screen flex flex-col-reverse lg:flex-row">
      {/* Left Panel */}
      <div
        className="lg:w-1/2 bg-cover bg-center text-white flex justify-center items-center p-10"
        style={{ backgroundImage: "url('/lovable-uploads/background-image.jpg')" }}
      >
        <div className="text-center flex flex-col items-center">
          <img src="/lovable-uploads/Upsort-career.png" alt="Upsort Careers" className="h-16 w-auto mb-4" />
          <h2 className="text-4xl font-bold uppercase mb-6">Upsort Career</h2>
          <p className="text-2xl font-semibold leading-relaxed max-w-xl mb-4">
            "At Upsort Career, we guide you in making confident, well-informed decisions about studying abroad. Our trusted consultants and AI-powered assessment ensure you're on the right path to your dream destination."
          </p>
          <p className="italic text-lg mt-2">— Your Trusted Pathway to Global Success</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="lg:w-1/2 flex justify-center items-center bg-white p-10">
        {isSubmitted ? (
          <div className="flex flex-col justify-center items-center w-full min-h-[500px] bg-white p-10 text-center rounded-xl shadow-lg">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Thank You!</h2>
            <p className="text-lg text-gray-600 mb-2">Your submission has been successfully received.</p>
            <button
              onClick={handleReturnHome}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              OK
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleRegisterSubmit}
            className="w-full max-w-md space-y-6 bg-gray-50 p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Hi 👋</h2>
            <p className="text-gray-600 text-center mb-6">Let's start with your personal details</p>

            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your First Name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  onChange={handleInputChange}
                  value={formData.firstName}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter your Last Name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  onChange={handleInputChange}
                  value={formData.lastName}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  onChange={handleInputChange}
                  value={formData.email}
                />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Contact Number *</label>
                <PhoneInput
                  country={'auto'}
                  enableSearch={true}
                  value={formData.contact}
                  onChange={handleContactChange}
                  placeholder="Enter your phone number"
                  inputStyle={{ width: '100%', height: '50px' }}
                />
                {contactError && <p className="text-red-500 text-sm mt-1">{contactError}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter your city"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  onChange={handleInputChange}
                  value={formData.city}
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full ${emailError || contactError || !navigator.onLine ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                } text-white font-semibold py-3 rounded-lg transition duration-300`}
              disabled={!!emailError || !!contactError || isLoading || !navigator.onLine}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default RegistrationForm;
