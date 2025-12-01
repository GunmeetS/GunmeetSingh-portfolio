"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import WelcomeLoader from "@/components/WelcomeLoader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";
import Experience from "@/components/Experience";

const MatrixBackground = dynamic(
  () => import("@/components/MatrixBackground"),
  {
    ssr: false,
    loading: () => null,
  }
);

const ParticleSystem = dynamic(() => import("@/components/ParticleSystem"), {
  ssr: false,
  loading: () => null,
});

const MouseTracker = dynamic(() => import("@/components/MouseTracker"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showEffects, setShowEffects] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem("theme");
    const isDark =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);

    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setShowEffects(true), 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted || loading) {
    return <WelcomeLoader />;
  }

  return (
    <div className="min-h-screen bg-cream-100 dark:bg-charcoal-900 transition-colors duration-300 overflow-x-hidden">
      {showEffects && (
        <>
          <MouseTracker />
          <MatrixBackground />
          <ParticleSystem />
        </>
      )}

      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />

      <AIChatbot />
    </div>
  );
}
