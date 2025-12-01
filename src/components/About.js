"use client"

import { useState, useEffect } from 'react'
import { FadeIn, SlideUp, SlideLeft } from '@/components/ScrollAnimation'

export default function About() {
  const [stats, setStats] = useState([
    { value: 0, label: 'Projects', target: 9 },
    { value: 0, label: 'Year Exp', target: 1 },
    { value: 0, label: 'Commits', target: 450 },
    { value: 0, label: 'Technologies', target: 14 },
  ])
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const animateStats = () => {
      if (hasAnimated) return
      setHasAnimated(true)
      
      stats.forEach((stat, index) => {
        const increment = stat.target / 50
        let current = 0
        
        const timer = setInterval(() => {
          current += increment
          if (current >= stat.target) {
            current = stat.target
            clearInterval(timer)
          }
          
          setStats(prev => {
            const newStats = [...prev]
            newStats[index] = { ...stat, value: Math.floor(current) }
            return newStats
          })
        }, 30)
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateStats()
        }
      },
      { threshold: 0.3 }
    )

    const element = document.querySelector('#about')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [hasAnimated, stats])

  return (
    <section 
      id="about" 
      className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-cream-100 dark:bg-charcoal-900"
    >
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900 dark:text-white">
            About Me
          </h2>
        </FadeIn>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Introduction Paragraphs */}
          <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-700 dark:text-gray-300">
            <SlideLeft delay={0.2}>
              <p className="leading-relaxed">
                I&apos;m a dedicated{' '}
                <span className="font-semibold text-teal-600 dark:text-teal-400">
                  Full Stack Web Developer
                </span>{' '}
                with{' '}
                <span className="font-semibold">more than 1 year of hands-on experience</span>{' '}
                building modern web applications using cutting-edge technologies.
              </p>
            </SlideLeft>
            
            <SlideLeft delay={0.4}>
              <p className="leading-relaxed">
                Throughout my journey, I&apos;ve worked on various projects ranging from CRM systems built with Laravel,
                scheduling tools, and financial management platforms built with Next.js, to creating
                robust backend APIs using Python.
              </p>
            </SlideLeft>
            
            <SlideLeft delay={0.6}>
              <p className="leading-relaxed">
                I&apos;m constantly learning and staying up-to-date with the latest web technologies,
                including React, Next.js, Python, and Laravel, while continuously improving my
                problem-solving and coding skills.
              </p>
            </SlideLeft>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8">
            {stats.map((stat, index) => (
              <SlideUp key={index} delay={0.8 + index * 0.1}>
                <div className="text-center p-4 sm:p-6 bg-white dark:bg-charcoal-800 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2">
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                    {stat.value}{(stat.label === 'Commits' || stat.label === 'Year Exp') ? '+' : ''}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
