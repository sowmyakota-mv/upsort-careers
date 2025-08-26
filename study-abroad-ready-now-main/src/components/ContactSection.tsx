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
      url: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`,
    },
    {
      name: "Outlook",
      url: `https://outlook.office.com/mail/deeplink/compose?to=${email}&subject=${subject}&body=${body}`,
    },
    {
      name: "Default Mail App",
      url: `mailto:${email}?subject=${subject}&body=${body}`,
    },
  ];

  return (
    <div>
      <div
        onClick={() => setShowOptions(true)}
        className="flex items-center gap-3 cursor-pointer hover:text-blue-400 transition-colors"
      >
        <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600">
          <Mail size={18} />
        </div>
        <span>{email}</span>
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
  const locations = ["Hyderabad", "Vijayawada", "Bangalore"];

  const contactMethods = [
    {
      icon: Phone,
      detail: "+91-9705131111",
      link: "tel:+919705131111",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: MessageCircle,
      detail: "WhatsApp Chat",
      link: "https://wa.me/919705131111",
      color: "from-teal-500 to-teal-600",
    },
    {
      icon: Clock,
      detail: "Mon-Sat, 9AM-8PM IST",
      link: "",
      color: "from-orange-500 to-orange-600",
    },
  ];

  // Instead of external pages, use section IDs on homepage
  const quickLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Assessment", id: "process" },
    { name: "Stories", id: "stories" },
  ];

  // Function to handle smooth scroll
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white scroll-smooth">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Heading + Paragraph */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-4"> 
            <MessageCircle className="w-4 h-4 mr-2" /> Get In Touch 
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">         
              Study Abroad Journey?
            </span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Get free consultation from our study abroad experts and take the
            first step towards your international education.
          </p>
        </div>

        {/* 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1 - Company Info */}
          <div>
            <h4 className="font-bold text-xl mb-4">Upsort Careers</h4>
            <p className="text-slate-300">
              Your trusted partner in achieving global education dreams.
            </p>
          </div>

          {/* Column 2 - Contacts */}
          <div>
            <h4 className="font-bold text-xl mb-4">Contacts</h4>
            <div className="space-y-4">
              {contactMethods.map((method, index) =>
                method.link ? (
                  <a
                    key={index}
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-blue-400 transition-colors"
                  >
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-r ${method.color}`}
                    >
                      <method.icon size={18} />
                    </div>
                    <span>{method.detail}</span>
                  </a>
                ) : (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-slate-300"
                  >
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-r ${method.color}`}
                    >
                      <method.icon size={18} />
                    </div>
                    <span>{method.detail}</span>
                  </div>
                )
              )}
              {/* Email */}
              <EmailChooser />
            </div>
          </div>

          {/* Column 3 - Locations */}
          <div>
            <h4 className="font-bold text-xl mb-4">Locations</h4>
            <div className="space-y-3">
              {locations.map((location, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-slate-300"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-red-500">
                    <MapPin size={18} />
                  </div>
                  <span>{location}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4 - Quick Links */}
          <div>
            <h4 className="font-bold text-xl mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleScroll(link.id)}
                    className="hover:text-blue-400 transition-colors text-left w-full"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 text-center text-slate-400 text-sm">
        © 2025 Upsort Careers. All rights reserved.
      </div>
    </footer>
  );
};

export default ContactSection;
