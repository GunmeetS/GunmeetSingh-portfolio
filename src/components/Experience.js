"use client"

import { useState } from 'react'
import { FiBriefcase, FiCalendar, FiMapPin, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { SlideUp, SlideLeft, SlideRight } from '@/components/ScrollAnimation'

export default function Experience() {
  const [expandedId, setExpandedId] = useState(1) 

  const experiences = [
    {
      id: 1,
      company: "Alpha Tech Softwares",
      position: "Full Stack Web Developer",
      type: "Full-time",
      location: "Remote",
      duration: "Sept 2024 - December 2025",
      shortDescription: "Building web applications using Next.js, Laravel, and python technologies.",
      achievements: [
        "Developed 9 production-ready applications",
        "Implemented secure authentication & payment systems",
        "Built responsive UIs with Tailwind CSS",
        "Integrated third-party APIs (Stripe, Telegram, Email)",
      ],
      technologies: ["Next.js", "React", "TypeScript", "PostgreSQL", "Prisma", "Laravel"],
      current: true,
    },
    {
      id: 2,
      company: "Creed Infotech Private Limited",
      position: "Full Stack Web Developer",
      type: "Full-time",
      location: "Mohali, India",
      duration: "May 2024 - Aug 2024",
      shortDescription: "Building web applications using Next.js and React.",
      achievements: [
        "Convert Owner Personal Blog Site into Nextjs",
        "Single Dashboard of Managing Data of 4 Websites"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "React", "Node.js","Next.js"],
      current: false,
    }
  ]

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section
      id="experience"
      className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-charcoal-800"
    >
      <div className="max-w-7xl mx-auto">
        <SlideUp>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900 dark:text-white">
            Work Experience
          </h2>
        </SlideUp>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 via-teal-400 to-teal-300 dark:from-teal-600 dark:via-teal-700 dark:to-teal-800 hidden md:block" />

          {/* Experience Items */}
          <div className="space-y-4">
            {experiences.map((exp, index) => {
              const isExpanded = expandedId === exp.id
              
              return (
                <SlideUp key={exp.id} delay={index * 0.1}>
                  <div className="relative flex gap-4 md:gap-6">
                    {/* Timeline Dot */}
                    <div className="flex flex-col items-center flex-shrink-0 z-10">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all ${
                        isExpanded 
                          ? 'bg-gradient-to-br from-teal-500 to-teal-600 scale-110' 
                          : 'bg-gray-300 dark:bg-gray-700'
                      }`}>
                        <span className={`font-bold text-xs ${isExpanded ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                          {exp.duration.split(' - ')[0].split(' ')[1]}
                        </span>
                      </div>
                    </div>

                    {/* Content Card - Collapsible */}
                    <div className="flex-1">
                      <div
                        className={`bg-cream-50 dark:bg-charcoal-900 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden ${
                          isExpanded ? 'ring-2 ring-teal-500' : ''
                        }`}
                        onClick={() => toggleExpand(exp.id)}
                      >
                        {/* Always Visible Header */}
                        <div className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                  {exp.position}
                                </h3>
                                {exp.current && (
                                  <span className="px-2 py-0.5 bg-teal-500 text-white text-xs font-bold rounded-full">
                                    NOW
                                  </span>
                                )}
                              </div>
                              <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm mb-2">
                                {exp.company} • {exp.type}
                              </p>
                              
                              {/* Meta info - always visible */}
                              <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
                                <div className="flex items-center gap-1">
                                  <FiCalendar size={12} />
                                  <span>{exp.duration}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <FiMapPin size={12} />
                                  <span>{exp.location}</span>
                                </div>
                              </div>

                              {/* Short description - always visible */}
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                {exp.shortDescription}
                              </p>
                            </div>

                            {/* Collapse Icon */}
                            <button
                              className="ml-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleExpand(exp.id)
                              }}
                            >
                              {isExpanded ? (
                                <FiChevronUp className="text-teal-600" size={20} />
                              ) : (
                                <FiChevronDown className="text-gray-600 dark:text-gray-400" size={20} />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Expandable Content */}
                        <div
                          className={`transition-all duration-300 ease-in-out ${
                            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                            {/* Achievements */}
                            <div className="mb-4">
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                Key Achievements:
                              </h4>
                              <ul className="space-y-1.5">
                                {exp.achievements.map((achievement, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm"
                                  >
                                    <span className="text-teal-500 font-bold mt-0.5">•</span>
                                    <span>{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Technologies */}
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                Technologies:
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {exp.technologies.map((tech, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-medium rounded border border-teal-200 dark:border-teal-800"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SlideUp>
              )
            })}
          </div>
        </div>

        {/* Download Resume Button */}
        <SlideUp delay={0.4}>
          <div className="text-center mt-12">
            <a
              href="/Gunmeet_Singh.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <FiBriefcase size={20} />
              Download Resume
            </a>
          </div>
        </SlideUp>
      </div>
    </section>
  )
}
