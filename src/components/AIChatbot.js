"use client"

import { useState, useRef, useEffect } from 'react'
import { FiMessageCircle, FiX, FiSend, FiCpu } from 'react-icons/fi'

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hi! 👋 I'm ${process.env.NEXT_PUBLIC_YOUR_NAME}. Ask me anything about my skills, projects, education, or experience!`,
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage] 
        }),
      })

      const data = await response.json()

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again or email me at ' + process.env.NEXT_PUBLIC_YOUR_EMAIL,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const quickSuggestions = [
    "What are your skills?",
    "Tell me about your projects",
    "Your education?",
    "Work experience?",
  ]

  const handleQuickSuggestion = (suggestion) => {
    setInput(suggestion)
  }

  return (
    <>
      {/* Floating Button with Interview Me Badge */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="absolute -top-12 right-0 bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-lg animate-bounce">
            Interview Me! 🤖
            <div className="absolute bottom-0 right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900 transform translate-y-full"></div>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-br from-teal-500 to-teal-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all relative group"
            aria-label="Open AI Chat"
          >
            <FiMessageCircle size={28} />
            
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
              AI
            </span>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[95vw] sm:w-96 h-[600px] max-h-[85vh] bg-white dark:bg-charcoal-800 rounded-xl shadow-2xl z-50 flex flex-col border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-t-xl flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <FiCpu size={24} />
              </div>
              <div>
                <h3 className="font-bold">{process.env.NEXT_PUBLIC_YOUR_NAME}</h3>
                <p className="text-xs text-teal-100">Full Stack Developer</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <FiX size={22} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-charcoal-900">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-teal-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-charcoal-800 text-gray-900 dark:text-white rounded-bl-none shadow-md'
                  }`}
                >
                  {/* AI Icon for assistant messages */}
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-1">
                      <FiCpu className="text-teal-600 dark:text-teal-400 flex-shrink-0" size={14} />
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
                        {process.env.NEXT_PUBLIC_YOUR_NAME}
                      </span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {/* Loading Animation */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-charcoal-800 p-3 rounded-2xl rounded-bl-none shadow-md">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Auto-scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-charcoal-800">
            {/* Quick Suggestions */}
            {messages.length === 1 && (
              <div className="mb-3">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-semibold">
                  Quick questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleQuickSuggestion(suggestion)}
                      className="text-xs px-3 py-1.5 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors border border-teal-200 dark:border-teal-800"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Field */}
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-400"
                disabled={isLoading}
                autoFocus
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                aria-label="Send message"
              >
                <FiSend size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
