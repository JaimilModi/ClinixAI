import React from "react";
import { Mail, Facebook, Instagram, HeartPulse, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-12 mt-10 shadow-md">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
            <HeartPulse size={30} className="text-teal-600" />
            <h2 className="text-2xl font-bold text-teal-600">ClinixAI</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto md:mx-0">
            Empowering healthcare with <br /> Artificial Intelligence 💡
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {["Home", "About", "Services", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="relative inline-block text-gray-600 hover:text-teal-600 transition-colors duration-200
                    after:content-[''] after:block after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-teal-400 after:to-purple-600
                    after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800">
            Resources
          </h3>
          <ul className="space-y-2 text-sm">
            {["Blogs", "FAQs", "Support", "Privacy Policy"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="relative inline-block text-gray-600 hover:text-teal-600 transition-colors duration-200
                    after:content-[''] after:block after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-teal-400 after:to-purple-600
                    after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800">
            Stay Connected
          </h3>
          <p className="text-sm text-gray-600 mb-4 max-w-xs mx-auto md:mx-0">
            Get the latest updates on healthcare AI innovations.
          </p>
          <div className="flex justify-center md:justify-start space-x-3">
            {[<Mail />, <Facebook />, <Twitter />, <Instagram />].map(
              (icon, i) => (
                <a
                  key={i}
                  href="#"
                  className={`p-3 rounded-full border border-gray-300 text-teal-600 
          transition-transform duration-500 transform 
          ${i === 0 ? "hover:scale-110 hover:translate-y-[-3px]" : ""}
          ${i === 1 ? "hover:scale-105 hover:rotate-6" : ""}
          ${
            i === 2
              ? "hover:scale-115 hover:rotate-12 hover:-translate-y-1"
              : ""
          }
          ${
            i === 3
              ? "hover:scale-110 hover:translate-y-[-2px] hover:rotate-3"
              : ""
          }
        `}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {icon}
                </a>
              )
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-teal-600 font-semibold">ClinixAI</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
