import React, { useState } from "react";
import { Phone, Mail, MessageCircle, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmailChooser = () => {
  const [showOptions, setShowOptions] = useState(false);

  const email = "info@upsortcareers.com";
  const subject = "Inquiry";
  const body = "Hello, I would like to get in touch with you.";

  const emailApps = [
    {
      name: "Gmail",
      url: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`
    },
    {
      name: "Outlook",
      url: `https://outlook.office.com/mail/deeplink/compose?to=${email}&subject=${subject}&body=${body}`
    },
    {
      name: "Default Mail App",
      url: `mailto:${email}?subject=${subject}&body=${body}`
    }
  ];

  return (
    <div>
      <div
        onClick={() => setShowOptions(true)}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group cursor-pointer max-w-xs"
      >
        <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 mb-4 group-hover:scale-110 transition-transform">
          <Mail size={24} />
        </div>
        <h4 className="font-bold text-lg mb-2">Email</h4>
        <p className="text-slate-300">{email}</p>
      </div>

      {showOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg space-y-4">
            <h3 className="text-xl font-bold mb-4">Choose Email App</h3>
            {emailApps.map((app, index) => (
              <a
                key={index}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
              >
                {app.name}
              </a>
            ))}
            <Button
              onClick={() => setShowOptions(false)}
              className="mt-4 w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const ContactSection = () => {
  const locations = ["Mumbai", "Bangalore", "Hyderabad"];

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      detail: "+91-9705131111",
      link: "tel:+919705131111",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      detail: "+91-9705131111",
      link: "https://wa.me/919705131111",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: Clock,
      title: "Available",
      detail: "Monday-Saturday,9AM-8PM IST",
      link: "",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section
      id="contact"
      className="py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <MessageCircle className="w-4 h-4 mr-2" />
            Get In Touch
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
              Study Abroad Journey?
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Get free consultation from our study abroad experts and take the
            first step towards your international education.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold mb-8">
              Contact Our Study Abroad Experts
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link || "#"}
                  target={method.link ? "_blank" : undefined}
                  rel={method.link ? "noopener noreferrer" : undefined}
                  className="block"
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${method.color} mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <method.icon size={24} />
                    </div>
                    <h4 className="font-bold text-lg mb-2">{method.title}</h4>
                    <p className="text-slate-300">{method.detail}</p>
                  </div>
                </a>
              ))}

              
              <EmailChooser />
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-bold mb-8">Office Locations</h3>

            <div className="space-y-4">
              {locations.map((location, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-xl group-hover:scale-110 transition-transform">
                    <MapPin size={20} />
                  </div>
                  <span className="font-medium">{location}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
