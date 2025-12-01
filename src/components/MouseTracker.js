"use client"

import { useEffect, useRef } from 'react'

export default function MouseTracker() {
  const trackerRef = useRef(null)
  const dotsRef = useRef([])

  useEffect(() => {
    const tracker = trackerRef.current
    if (!tracker) return

    // Create animated dots that follow mouse
    const createDot = (x, y) => {
      const dot = document.createElement('div')
      dot.className = 'mouse-tracker-dot'
      dot.style.left = x + 'px'
      dot.style.top = y + 'px'
      tracker.appendChild(dot)
      
      let life = 30 // frames to live
      const animate = () => {
        life--
        dot.style.opacity = life / 30
        dot.style.transform = `translate(-50%, -50%) scale(${1 - (30 - life) / 30})`
        
        if (life > 0) {
          requestAnimationFrame(animate)
        } else {
          dot.remove()
        }
      }
      animate()
    }

    // Track mouse movement
    const handleMouseMove = (e) => {
      // Create dot every 5 pixels
      if (Math.random() > 0.3) {
        createDot(e.clientX, e.clientY)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      {/* Mouse tracker container - visible on all sections */}
      <div
        ref={trackerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />

      {/* CSS for the dots */}
      <style>{`
        .mouse-tracker-dot {
          position: fixed;
          width: 5px;
          height: 5px;
          background: radial-gradient(circle, #14b8a6 0%, #0d9488 100%);
          border-radius: 50%;
          pointer-events: none;
          box-shadow: 0 0 10px rgba(20, 184, 166, 0.6);
          opacity: 1;
          transition: none;
        }
      `}</style>
    </>
  )
}
