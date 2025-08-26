import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="fixed z-50 w-full flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 
      bg-gradient-to-r from-white-100 to-pink-200 backdrop-blur-xl"
    >
      <img
        src="/ClinixAI.png"
        alt="ClinixAI Logo"
        className="w-28 sm:w-40 cursor-pointer transition-transform duration-300 hover:scale-110 hover:rotate-1"
        onClick={() => navigate("/")}
      />

      <div className="hidden sm:flex items-center gap-10">
        {[
          { label: "Home", path: "/" },
          { label: "Write Symptom", path: "/write-symptom" },
          { label: "Review Report", path: "/review-report" },
        ].map((link, i) => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            className="relative text-primary font-semibold 
        transition duration-300 group 
        hover:scale-110 hover:rotate-1"
            style={{
              animation: `fadeIn 0.5s ease forwards`,
              animationDelay: `${i * 0.15}s`,
            }}
          >
            <span className="group-hover:text-primary transition">
              {link.label}
            </span>

            <span
              className="absolute left-0 -bottom-1 w-0 h-[2px] bg-primary 
        transition-all duration-300 group-hover:w-full"
            ></span>
          </button>
        ))}

        {user ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <button
            onClick={openSignIn}
            aria-label="Sign in"
            className="flex items-center gap-2 rounded-full text-sm cursor-pointer 
        bg-primary hover:bg-primary/90 transition-all duration-300 
        px-6 py-2 text-white shadow-md hover:shadow-xl 
        hover:scale-110 active:scale-95"
          >
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        )}
      </div>

      <div className="sm:hidden flex items-center gap-3">
        {user ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <button
            onClick={openSignIn}
            aria-label="Sign in"
            className="flex items-center gap-2 rounded-full text-xs cursor-pointer 
          bg-primary hover:bg-primary/90 transition-all duration-300 
          px-4 py-1.5 text-white shadow-md hover:shadow-xl 
          hover:scale-105 active:scale-95"
          >
            Get Started
          </button>
        )}

        <Menu
          className="w-8 h-8 cursor-pointer text-primary"
          onClick={() => setMenuOpen(true)}
        />
      </div>

      <div
        className={`fixed inset-0 w-full min-h-screen 
    transform transition-all duration-500 ease-in-out
    ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"} 
    sm:hidden z-50`}
      >
        <div
          className={`absolute inset-0 bg-white/30 backdrop-blur-[20px] transition-all duration-500 
      ${menuOpen ? "opacity-100" : "opacity-0"}`}
        ></div>

        <div
          className={`relative flex flex-col items-center justify-center gap-10 h-full 
      transform transition-all duration-500 ease-in-out
      ${menuOpen ? "scale-100" : "scale-110 opacity-0"}`}
        >
          <div className="absolute top-6 right-6">
            <X
              className="w-8 h-8 cursor-pointer text-primary transition-transform duration-500 ease-in-out hover:rotate-180 hover:scale-110 active:rotate-360"
              onClick={() => setMenuOpen(false)}
            />
          </div>

          <button
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
            className="text-2xl font-bold text-primary hover:scale-110 hover:tracking-wide transition-transform duration-300"
          >
            Home
          </button>
          <button
            onClick={() => {
              navigate("/write-symptom");
              setMenuOpen(false);
            }}
            className="text-2xl font-bold text-primary hover:scale-110 hover:tracking-wide transition-transform duration-300"
          >
            Write Symptom
          </button>
          <button
            onClick={() => {
              navigate("/review-report");
              setMenuOpen(false);
            }}
            className="text-2xl font-bold text-primary hover:scale-110 hover:tracking-wide transition-transform duration-300"
          >
            Review Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
