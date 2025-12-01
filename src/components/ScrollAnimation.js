"use client"

import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export function FadeIn({ children, delay = 0, duration = 0.6 }) {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

export function SlideUp({ children, delay = 0, duration = 0.6 }) {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: `opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

export function SlideLeft({ children, delay = 0, duration = 0.6 }) {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
        transition: `opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

export function SlideRight({ children, delay = 0, duration = 0.6 }) {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
        transition: `opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

export function ScaleIn({ children, delay = 0, duration = 0.6 }) {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.8)',
        transition: `opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

export function RotateIn({ children, delay = 0, duration = 0.6 }) {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'rotate(0deg)' : 'rotate(-10deg)',
        transition: `opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}
