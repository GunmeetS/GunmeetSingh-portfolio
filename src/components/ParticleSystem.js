"use client"

import { useEffect, useRef, useState } from 'react'

export default function ParticleSystem() {
  const canvasRef = useRef(null)
  const [debug, setDebug] = useState({
    initialized: false,
    canvasSize: 'not set',
    particleCount: 0,
    error: null,
  })

  useEffect(() => {
    try {
      const canvas = canvasRef.current

      if (!canvas) {
        setDebug(d => ({ ...d, error: 'Canvas element not found' }))
        return
      }

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        setDebug(d => ({ ...d, error: 'Failed to get 2D context' }))
        return
      }

      // Set canvas to full window size
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const size = `${canvas.width}x${canvas.height}`

      // Create particles
      const particles = []
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 2 + 1,
        })
      }

      setDebug(d => ({
        ...d,
        initialized: true,
        canvasSize: size,
        particleCount: particles.length,
      }))

      // Animation loop
      let frameCount = 0
      const animate = () => {
        frameCount++

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw and update particles
        particles.forEach(p => {
          p.x += p.vx
          p.y += p.vy

          // Bounce
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1

          // Clamp
          p.x = Math.max(0, Math.min(canvas.width, p.x))
          p.y = Math.max(0, Math.min(canvas.height, p.y))

          // Draw BRIGHT TEAL - VERY VISIBLE
          ctx.fillStyle = '#14b8a6'
          ctx.globalAlpha = 0.8
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
          ctx.globalAlpha = 1.0
        })

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i]
            const p2 = particles[j]
            const dx = p1.x - p2.x
            const dy = p1.y - p2.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < 100) {
              ctx.strokeStyle = `rgba(20, 184, 166, 0.4)`
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
            }
          }
        }


        requestAnimationFrame(animate)
      }

      animate()

    } catch (error) {
      setDebug(d => ({ ...d, error: error.message }))
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          background: 'transparent',
        }}
      />
    </>
  )
}