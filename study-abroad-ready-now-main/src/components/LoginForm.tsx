import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear error on input change
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const emailCheckRes = await axios.get(`/api/auth/check-email?email=${formData.email}`);

      if (!emailCheckRes.data.exists) {
        setError("This email is not registered.");
        setIsLoading(false);
        return;
      }

      const response = await axios.post("/api/auth/login", formData);
      const user = response.data.user;

      login(user);
      navigate("/");
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="auth" className="min-h-screen flex flex-col lg:flex-row">
      <div
        className="lg:w-1/2 bg-cover bg-center text-white flex justify-start items-center p-10"
        style={{ backgroundImage: "url('/lovable-uploads/background-image.jpg')" }}
      >
        <div className="text-center flex flex-col items-center -mt-24">
          <img src="/lovable-uploads/Upsort-career.png" alt="Upsort Careers" className="h-16 w-auto mb-4" />
          <h2 className="text-4xl font-bold uppercase mb-6">Upsort Career</h2>
          <p className="text-2xl font-semibold leading-relaxed max-w-xl mb-4">
            "At Upsort Career, we guide you in making confident, well-informed decisions about studying abroad.
            Our trusted consultants and AI-powered assessment ensure you're on the right path to your dream destination."
          </p>
          <p className="italic text-lg mt-2">— Your Trusted Pathway to Global Success</p>
        </div>
      </div>

      <div className="lg:w-1/2 flex justify-center items-center bg-white p-10">
        <form onSubmit={handleLoginSubmit} className="w-full max-w-md space-y-6 bg-gray-50 p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Login</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="relative">
              <label className="block text-gray-700 font-semibold mb-2">Password *</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                required
                onChange={handleInputChange}
              />
              <span
                className="absolute top-11 right-4 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
