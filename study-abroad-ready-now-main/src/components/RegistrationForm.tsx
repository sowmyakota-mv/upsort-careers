import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import emailjs from 'emailjs-com';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

let debounceTimer: ReturnType<typeof setTimeout>;

const RegistrationForm = () => {
  const { login, intendedRoute, setIntendedRoute } = useAuth();
  const navigate = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailExists, setEmailExists] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contact: '',
    city: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Live password match validation
    if (name === 'confirmPassword' || (name === 'password' && updatedFormData.confirmPassword.length > 0)) {
      if (updatedFormData.password !== updatedFormData.confirmPassword) {
        setPasswordError('Passwords do not match!');
      } else {
        setPasswordError('');
      }
    }

    // Live email availability check
    if (name === 'email') {
      try {
        if (value.trim().length > 5) {
          const res = await axios.get(`/api/auth/check-email?email=${value}`);
          if (res.data.exists) {
  setEmailExists(true);
  setEmailError('Email already registered. Please login!'); // Show it here
} else {
  setEmailExists(false);
  setError('');
  setEmailError('');
}
        } else {
          setEmailExists(false);
          setError('');
        }
      } catch (err) {
        console.error('Email check error:', err);
        setEmailExists(false);
      }
    }
  };

  const sendRegistrationEmail = () => {
    const templateParams = {
      name: formData.fullName,
      email: formData.email,
      contact: formData.contact,
      city: formData.city,
    };

    emailjs.send('service_6m3emyd', 'template_p3v0tvf', templateParams, 'WV4ATcmY4I9TjdaBe')
      .then((response) => {
        console.log('Registration Email sent successfully!', response.status, response.text);
      })
      .catch((err) => {
        console.error('Failed to send registration email:', err);
      });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (passwordError || emailError) {
      return;
    }

    setIsLoading(true);

    const { confirmPassword, ...submitData } = formData;

    axios.post('/api/auth/register', submitData)
      .then(res => {
        console.log('Registration successful:', res.data);
        sendRegistrationEmail();
        login({ name: formData.fullName, email: formData.email });
        setIsSubmitted(true);
      })
      .catch(err => {
  console.error('Registration error:', err.response?.data || err.message);
  setError(err.response?.data?.message || err.message || 'Registration failed.');
})

      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <section id="auth" className="min-h-screen flex flex-col lg:flex-row">
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
        {isSubmitted ? (
          <div className='flex flex-col justify-center items-center w-full min-h-[500px] bg-white p-10 text-center rounded-xl shadow-lg'>
            <h2 className='text-4xl font-bold mb-4 text-gray-800'>Thank You!</h2>
            <p className='text-lg text-gray-600 mb-2'>Your submission has been successfully received.</p>
            <button onClick={handleReturnHome} className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300'>
              OK
            </button>
          </div>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="w-full max-w-md space-y-6 bg-gray-50 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Create Account</h2>
            <p className="text-gray-600 text-center mb-6">Let's start with your personal details</p>

            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${emailExists ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                  required
                  onChange={handleInputChange}
                />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Contact Number *</label>
                <input
                  type="tel"
                  name="contact"
                  placeholder="Enter your phone number"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  onChange={handleInputChange}
                />
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
                />
              </div>

              {/* Password with Toggle */}
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2">Password *</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  onChange={handleInputChange}
                />
                <span
                  className="absolute top-10 right-4 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </span>
              </div>

              {/* Confirm Password with Toggle */}
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2">Confirm Password *</label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${passwordError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                  required
                  onChange={handleInputChange}
                />
                <span
                  className="absolute top-10 right-4 cursor-pointer text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </span>
                {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !!passwordError || emailExists}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>

            <p className="text-center text-sm mt-4">
              Already have an account?{' '}
              <button type="button" onClick={() => navigate('/login')} className="text-blue-600 font-semibold hover:underline">
                Login
              </button>
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

export default RegistrationForm;
