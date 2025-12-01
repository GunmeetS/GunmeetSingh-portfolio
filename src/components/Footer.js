import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart } from '@/components/Icons'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: FiGithub, href: process.env.NEXT_PUBLIC_GITHUB_LINK, label: 'GitHub' },
    { icon: FiLinkedin, href: process.env.NEXT_PUBLIC_LINKEDIN_LINK, label: 'LinkedIn' },
    { icon: FiTwitter, href: process.env.NEXT_PUBLIC_TWITTER_LINK, label: 'Twitter' },
    { icon: FiMail, href: `mailto:${process.env.NEXT_PUBLIC_YOUR_EMAIL}`, label: 'Email' },
  ]

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-teal-900 to-gray-900 dark:from-black dark:via-charcoal-900 dark:to-black text-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10 animate-background">
        <div className="absolute inset-0 bg-animated" />
      </div>

      {/* Animated Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden bg-gray-800/20 dark:bg-transparent">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400 dark:via-teal-500 to-transparent animate-slide shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 sm:mb-12">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                {process.env.NEXT_PUBLIC_YOUR_NAME}
              </span>
            </h3>
            <p className="text-gray-300 dark:text-gray-400 text-sm sm:text-base mb-4">
              Full Stack Web Developer passionate about creating amazing web experiences.
            </p>
            <div className="flex justify-center md:justify-start items-center gap-2 text-sm text-gray-400">
              <span>Made with</span>
              <FiHeart className="text-red-500 animate-pulse" />
              <span>in India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-teal-400">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-teal-400 transition-colors text-sm sm:text-base inline-block hover:translate-x-1 transform duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div className="text-center md:text-right">
            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-teal-400">Connect With Me</h4>
            <div className="flex justify-center md:justify-end gap-3 sm:gap-4 mb-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-teal-600 transition-all transform hover:scale-110 hover:-translate-y-1 shadow-lg"
                  >
                    <Icon size={20} className="sm:w-6 sm:h-6" />
                  </a>
                )
              })}
            </div>
            <p className="text-gray-400 text-xs sm:text-sm">
              Open to full-time developer opportunities
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700/50 dark:border-gray-800 my-6 sm:my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-gray-400 text-xs sm:text-sm order-2 sm:order-1">
            © {currentYear} {process.env.NEXT_PUBLIC_YOUR_NAME}. All rights reserved.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-gray-400 order-1 sm:order-2">
            <span>Built with</span>
            <span className="px-2 py-1 bg-white/10 rounded-full text-teal-400 font-medium">Next.js</span>
            <span className="px-2 py-1 bg-white/10 rounded-full text-blue-400 font-medium">Tailwind CSS</span>
            <span className="px-2 py-1 bg-white/10 rounded-full text-indigo-400 font-medium">PostgreSQL</span>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes backgroundFloat {
          0%, 100% {
            background-position: 0% 0%, 100% 100%, 50% 0%;
          }
          33% {
            background-position: 100% 0%, 0% 50%, 30% 100%;
          }
          66% {
            background-position: 50% 100%, 100% 0%, 70% 50%;
          }
        }

        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .bg-animated {
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(20, 184, 166, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(20, 184, 166, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(20, 184, 166, 0.2) 0%, transparent 50%);
          background-size: 200% 200%;
          animation: backgroundFloat 15s ease-in-out infinite;
        }

        .animate-slide {
          animation: slide 3s linear infinite;
        }
      `}</style>
    </footer>
  )
}
