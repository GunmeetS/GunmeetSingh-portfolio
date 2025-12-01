/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect } from 'react'

export default function WelcomeLoader() {
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  const messages = [
    'Initializing portfolio...',
    'Loading components...',
    'Connecting to database...',
    'Almost ready...',
  ]

  // Detect theme
  useEffect(() => {
    setMounted(true)
    const isDark = document.documentElement.classList.contains('dark')
    setDarkMode(isDark)
  }, [])

  // Progress bar animation
  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          return 100
        }
        return prev + 2
      })
    }, 50)

    const messageTimer = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length)
    }, 700)

    return () => {
      clearInterval(progressTimer)
      clearInterval(messageTimer)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-teal-50 to-cream-100 dark:from-charcoal-900 dark:to-charcoal-800 flex items-center justify-center z-50 transition-colors duration-300">
      <div className="text-center">
        <div className="mb-8 loader-pulse">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse-slow">
            <span className="text-4xl font-bold text-white">GS</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4 gradient-text">
          Welcome
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8 h-6 animate-fade-in transition-colors">
          {messages[messageIndex]}
        </p>

        <div className="w-64 mx-auto">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden transition-colors">
            <div 
              className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 transition-colors">
            {progress}%
          </p>
        </div>

        <div className="mt-8">
          <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    </div>
  )
}
