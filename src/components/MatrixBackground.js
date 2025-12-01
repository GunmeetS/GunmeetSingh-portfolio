"use client"

import { useEffect, useRef, useState } from 'react'

export default function MatrixBackground() {
  const canvasRef = useRef(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    try {
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        return
      }

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
      const fontSize = 14
      const columns = Math.ceil(canvas.width / fontSize)
      const drops = []

      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * (canvas.height / fontSize)
      }

      let animationId = null

      function draw() {
        // Semi-transparent background for fade effect
        ctx.fillStyle = 'rgba(252, 252, 249, 0.05)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = '#14b8a6'
        ctx.font = `${fontSize}px monospace`

        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)]
          const xPos = i * fontSize
          const yPos = drops[i] * fontSize

          ctx.fillText(text, xPos, yPos)

          // Reset drop position
          if (yPos > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          }
          drops[i]++
        }
      }

      const interval = setInterval(draw, 50)

      const handleResize = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }

      window.addEventListener('resize', handleResize)

      return () => {
        clearInterval(interval)
        window.removeEventListener('resize', handleResize)
      }
    } catch (error) {
    }
  }, [isClient])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-10 dark:opacity-20 z-0"
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
      }}
    />
  )
}