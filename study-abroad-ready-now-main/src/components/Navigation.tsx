import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, User, UserCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Assessment", href: "#process" },
    { label: "Process", href: "#process" },
    { label: "Stories", href: "#stories" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex items-center">
            <img
              src="/lovable-uploads/Upsort-career.png"
              alt="Upsort Careers"
              className="h-10 w-auto"
            />
            <span className="ml-3 text-xl font-bold text-slate-800">Upsort Careers</span>
          </div>

          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}

           <Button
  onClick={() => {
    setIsMenuOpen(false);
    navigate("/register");
  }}
  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
>
  Register
</Button>

          </div>

          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-700 hover:text-slate-900 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left px-3 py-2 text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  {item.label}
                </button>
              ))}

              
              <div className="border-t border-slate-100 mt-3 pt-3 px-3">
                
                  <Button
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/register");
                    }}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                  >
                    Register
                  </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
