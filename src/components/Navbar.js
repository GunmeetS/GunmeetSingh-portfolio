"use client"

import { useState, useEffect } from 'react'
import { FiMenu, FiX, FiSun, FiMoon } from '@/components/Icons'

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' }, 
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const scrollTo = (href) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      const offset = 80 
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-charcoal-900/95 shadow-md' 
          : 'bg-cream-100/90 dark:bg-charcoal-900/90 shadow-sm'
      } backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <button
              onClick={() => scrollTo('#home')}
              className="text-2xl sm:text-3xl font-bold gradient-text hover:scale-105 transition-transform"
            >
              GS
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className="text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium text-sm xl:text-base relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 dark:bg-teal-400 transition-all group-hover:w-full"></span>
                </button>
              ))}
              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-lg bg-teal-100 dark:bg-teal-900 hover:bg-teal-200 dark:hover:bg-teal-800 transition-all hover:scale-110"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Buttons */}
            <div className="flex lg:hidden items-center space-x-2 sm:space-x-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 sm:p-2.5 rounded-lg bg-teal-100 dark:bg-teal-900 hover:bg-teal-200 dark:hover:bg-teal-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 sm:p-2.5 rounded-lg bg-teal-100 dark:bg-teal-900 hover:bg-teal-200 dark:hover:bg-teal-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Mobile Menu */}
          <div className="fixed top-16 sm:top-20 right-0 w-64 sm:w-72 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] bg-white dark:bg-charcoal-800 shadow-2xl z-40 lg:hidden animate-slide-in-right overflow-y-auto">
            <div className="p-4 sm:p-6 space-y-2">
              {navLinks.map((link, index) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className="block w-full text-left px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-teal-50 dark:hover:bg-teal-900 transition-all font-medium"
                  style={{
                    animation: `fadeIn 0.3s ease-out ${index * 0.1}s both`
                  }}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}
