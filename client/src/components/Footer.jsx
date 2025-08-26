import React from "react";
import { Facebook, Twitter, Linkedin, Mail, HeartPulse } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-12 mt-10 shadow-md">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
            <HeartPulse size={30} className="text-[#FF5758]" />
            <h2 className="text-2xl font-bold text-[#FF5758]">ClinixAI</h2>
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
                  className="relative inline-block text-gray-600 hover:text-[#FF5758] transition-colors duration-200
                    after:content-[''] after:block after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-[#FF5758] after:to-red-500
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
                  className="relative inline-block text-gray-600 hover:text-[#FF5758] transition-colors duration-200
                    after:content-[''] after:block after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-[#FF5758] after:to-red-500
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
            {[<Mail />, <Facebook />, <Twitter />, <Linkedin />].map(
              (icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-full border border-gray-300 text-[#FF5758] hover:bg-[#FF5758] hover:text-white transition-transform duration-300 transform hover:scale-110"
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
        <span className="text-[#FF5758] font-semibold">ClinixAI</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
