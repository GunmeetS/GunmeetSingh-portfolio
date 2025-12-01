"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FiChevronLeft, FiChevronRight, FiLogOut, FiSearch, FiMail, FiUser, FiCalendar, FiClock } from '@/components/Icons'
import toast, { Toaster } from 'react-hot-toast'

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [messageCount, setMessageCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    const isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  useEffect(() => {
    const isAuth = sessionStorage.getItem('adminAuth') === 'true'
    if (isAuth) {
      setAuthenticated(true)
      fetchMessages(1)
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)

    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      sessionStorage.setItem('adminAuth', 'true')
      setAuthenticated(true)
      fetchMessages(1)
      toast.success('✅ Logged in successfully!')
    } else {
      toast.error('❌ Invalid password')
    }
    setLoading(false)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth')
    setAuthenticated(false)
    setPassword('')
    toast.success('👋 Logged out successfully')
    setTimeout(() => router.push('/'), 1000)
  }

  const fetchMessages = async (page = 1) => {
    setLoadingMessages(true)
    try {
      const response = await fetch(`/api/messages?page=${page}&limit=10`)
      const data = await response.json()
      setMessages(data.messages || [])
      setMessageCount(data.count || 0)
      setCurrentPage(data.page || 1)
      setTotalPages(data.totalPages || 1)
    } catch (error) {
      toast.error('Failed to load messages')
    } finally {
      setLoadingMessages(false)
    }
  }

  const filteredMessages = messages.filter(msg =>
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <Toaster position="top-center" />
        <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-2xl max-w-md w-full border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full mb-4">
              <span className="text-3xl">🔒</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Access
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Enter your password to access the dashboard
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                required
                autoFocus
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl hover:from-teal-700 hover:to-blue-700 transition-all disabled:opacity-50 font-semibold shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-xl">📊</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Admin Dashboard
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Manage your contacts</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              <FiLogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Messages</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{messageCount}</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center">
                <FiMail className="text-teal-600 dark:text-teal-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Current Page</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{currentPage}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <FiCalendar className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Pages</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{totalPages}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <FiUser className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Messages Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          {/* Search Bar */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Contact Messages
              </h2>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Messages List */}
          <div className="p-6">
            {loadingMessages ? (
              <div className="flex justify-center items-center py-16">
                <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
                  <FiMail className="text-gray-400" size={32} />
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                  {searchTerm ? 'No messages found' : 'No messages yet'}
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                  {searchTerm ? 'Try a different search term' : 'Messages will appear here when someone contacts you'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMessages.map((msg) => (
                  <div key={msg.id} className="p-5 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                          {msg.name}
                        </h4>
                        {msg.company && msg.position && (
                          <p className="text-sm text-teal-600 dark:text-teal-400 font-medium">
                            {msg.position} at {msg.company}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <FiClock size={14} />
                        {new Date(msg.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <FiMail size={16} />
                      <a href={`mailto:${msg.email}`} className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                        {msg.email}
                      </a>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && !searchTerm && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => fetchMessages(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  <FiChevronLeft size={18} />
                  Previous
                </button>
                
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Page <span className="text-gray-900 dark:text-white font-bold">{currentPage}</span> of <span className="text-gray-900 dark:text-white font-bold">{totalPages}</span>
                </span>
                
                <button
                  onClick={() => fetchMessages(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  Next
                  <FiChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
