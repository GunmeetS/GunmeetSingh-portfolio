"use client";

import { useState, useEffect } from "react";
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from "@/components/Icons";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const fullText =
    "Seeking opportunities to contribute and grow with a passionate development team";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.substring(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 md:pt-18 lg:pt-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50 via-cream-100 to-teal-100 dark:from-charcoal-900 dark:via-charcoal-800 dark:to-teal-900"
    >
      <div className="max-w-5xl mx-auto text-center relative z-10 w-full">
        <div className="animate-fade-in space-y-4 sm:space-y-6">
          {/* Greeting */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 animate-slide-down">
            Hi, I&apos;m
          </p>

          {/* Name */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight">
            <span className="gradient-text">
              {process.env.NEXT_PUBLIC_YOUR_NAME}
            </span>
          </h1>

          {/* Title */}
          <h2 className="text-xl sm:text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-4 sm:mb-6 leading-snug px-2">
            {process.env.NEXT_PUBLIC_JOB_TITLE}
          </h2>

          {/* Typed Text */}
          <div className="mb-6 sm:mb-8 md:mb-10 px-2">
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto min-h-[3rem] sm:min-h-[4rem] md:min-h-[5rem] leading-relaxed">
              {typedText}
              <span className="animate-pulse text-teal-600">|</span>
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 md:gap-6 justify-center mb-8 sm:mb-10 md:mb-12 px-2">
            <button
              onClick={() => scrollToSection("#projects")}
              className="w-full xs:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold text-sm sm:text-base md:text-lg active:scale-95"
            >
              View My Work
            </button>
            <a
              href="/resume.pdf"
              download
              className="w-full xs:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 border-2 border-teal-600 text-teal-600 dark:text-teal-400 dark:border-teal-400 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-all font-semibold text-sm sm:text-base md:text-lg text-center active:scale-95"
            >
              Download Resume
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 sm:gap-5 md:gap-6 justify-center mb-8 sm:mb-10 md:mb-12 px-2">
            <a
              href={process.env.NEXT_PUBLIC_GITHUB_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 sm:p-3.5 md:p-4 bg-white dark:bg-gray-800 rounded-full hover:bg-teal-100 dark:hover:bg-teal-900 transition-all transform hover:scale-110 shadow-md hover:shadow-lg active:scale-95"
              aria-label="GitHub"
            >
              <FiGithub
                size={20}
                className="sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-700 dark:text-gray-300"
              />
            </a>
            <a
              href={process.env.NEXT_PUBLIC_LINKEDIN_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 sm:p-3.5 md:p-4 bg-white dark:bg-gray-800 rounded-full hover:bg-teal-100 dark:hover:bg-teal-900 transition-all transform hover:scale-110 shadow-md hover:shadow-lg active:scale-95"
              aria-label="LinkedIn"
            >
              <FiLinkedin
                size={20}
                className="sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-700 dark:text-gray-300"
              />
            </a>
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_YOUR_EMAIL}`}
              className="p-3 sm:p-3.5 md:p-4 bg-white dark:bg-gray-800 rounded-full hover:bg-teal-100 dark:hover:bg-teal-900 transition-all transform hover:scale-110 shadow-md hover:shadow-lg active:scale-95"
              aria-label="Email"
            >
              <FiMail
                size={20}
                className="sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-700 dark:text-gray-300"
              />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce pt-4 sm:pt-6">
            <button
              onClick={() => scrollToSection("#about")}
              aria-label="Scroll to next section"
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-full p-2"
            >
              <FiArrowDown
                size={28}
                className="sm:w-8 sm:h-8 md:w-9 md:h-9 mx-auto text-teal-500 dark:text-teal-400"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
