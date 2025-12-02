"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import confetti from "canvas-confetti"
import {
  FiMail,
  FiMapPin,
  FiSend,
  FiGithub,
  FiLinkedin,
  FiTwitter,
} from '@/components/Icons'
import { FadeIn, SlideLeft, SlideRight } from "@/components/ScrollAnimation"

export default function Contact() {
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    position: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [typedMessage, setTypedMessage] = useState("")
  const [savedName, setSavedName] = useState("")
  
  const typewriterRef = useRef(null)

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        router.push("/admin")
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [router])

  useEffect(() => {
    if (showSuccess && savedName) {
      const fullMessage = `Thank you ${savedName}! I'll review your message and get back to you soon.`
      let currentIndex = 0
      
      setTypedMessage("")
      
      if (typewriterRef.current) {
        clearInterval(typewriterRef.current)
      }

      typewriterRef.current = setInterval(() => {
        if (currentIndex < fullMessage.length) {
          setTypedMessage((prev) => fullMessage.substring(0, currentIndex + 1))
          currentIndex++
        } else {
          if (typewriterRef.current) {
            clearInterval(typewriterRef.current)
            typewriterRef.current = null
          }
        }
      }, 30) 

      return () => {
        if (typewriterRef.current) {
          clearInterval(typewriterRef.current)
          typewriterRef.current = null
        }
      }
    }
  }, [showSuccess, savedName])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSavedName(formData.name)
        
        triggerConfetti()
        setShowSuccess(true)

        setFormData({
          name: "",
          email: "",
          company: "",
          position: "",
          message: "",
        })

        setTimeout(() => {
          setShowSuccess(false)
          setSavedName("")
          setTypedMessage("")
        }, 6000) 

      } else {
        toast.error(data.error || "Failed to send message")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50 to-cream-100 dark:from-charcoal-800 dark:to-charcoal-900"
    >
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900 dark:text-white">
            Get In Touch
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          {/* Contact Info */}
          <SlideLeft delay={0.2} className="order-2 md:order-1">
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                Let&apos;s Connect
              </h3>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FiMail
                    className="text-teal-600 dark:text-teal-400 flex-shrink-0"
                    size={20}
                  />
                  <span className="text-sm sm:text-base break-all">
                    {process.env.NEXT_PUBLIC_YOUR_EMAIL}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FiMapPin
                    className="text-teal-600 dark:text-teal-400 flex-shrink-0"
                    size={20}
                  />
                  <span className="text-sm sm:text-base">
                    Available for Remote/Hybrid/On-site
                  </span>
                </div>
              </div>

              <div className="pt-4 sm:pt-6">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  Connect with me
                </h4>
                <div className="flex gap-3 sm:gap-4">
                  <a
                    href={process.env.NEXT_PUBLIC_GITHUB_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-teal-600 hover:text-white transition-colors"
                    aria-label="GitHub"
                  >
                    <FiGithub size={20} className="sm:w-6 sm:h-6" />
                  </a>
                  <a
                    href={process.env.NEXT_PUBLIC_LINKEDIN_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-teal-600 hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FiLinkedin size={20} className="sm:w-6 sm:h-6" />
                  </a>
                  <a
                    href={process.env.NEXT_PUBLIC_TWITTER_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-teal-600 hover:text-white transition-colors"
                    aria-label="Twitter"
                  >
                    <FiTwitter size={20} className="sm:w-6 sm:h-6" />
                  </a>
                </div>
              </div>
            </div>
          </SlideLeft>

          {/* Contact Form */}
          <SlideRight delay={0.4} className="order-1 md:order-2">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-charcoal-800 text-gray-900 dark:text-white transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-charcoal-800 text-gray-900 dark:text-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Company{" "}
                    <span className="text-gray-400 text-xs">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company name"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-charcoal-800 text-gray-900 dark:text-white transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="position"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Position{" "}
                    <span className="text-gray-400 text-xs">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="Your position"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-charcoal-800 text-gray-900 dark:text-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-charcoal-800 text-gray-900 dark:text-white resize-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 sm:py-3.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <>
                    <FiSend size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </SlideRight>
        </div>
      </div>

      {/* Success Celebration Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/80 z-[99999] flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-white dark:bg-charcoal-800 rounded-xl max-w-md w-full p-6 sm:p-8 text-center animate-scaleIn">
            <div className="text-5xl sm:text-6xl mb-4 animate-bounce">🎉</div>
            <h3 className="text-xl sm:text-2xl font-bold text-teal-600 dark:text-teal-400 mb-4">
              Message Sent Successfully!
            </h3>

            <div className="font-mono text-teal-600 dark:text-teal-400 text-base sm:text-lg mb-4 min-h-[80px] sm:min-h-[90px] flex items-center justify-center">
              <span>
                {typedMessage}
                <span className="animate-pulse">|</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6">
              Your message has been stored in PostgreSQL database
            </p>
            <button
              onClick={() => {
                setShowSuccess(false)
                setSavedName("")
                setTypedMessage("")
              }}
              className="px-6 py-2.5 sm:py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium text-sm sm:text-base"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }

        .animate-scaleIn {
          animation: scaleIn 0.5s ease;
        }
      `}</style>
    </section>
  )
}
