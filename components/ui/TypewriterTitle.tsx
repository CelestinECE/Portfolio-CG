'use client'

import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

interface TypewriterTitleProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3'
  speed?: number
}

export default function TypewriterTitle({
  text,
  className = '',
  as: Tag = 'h2',
  speed = 60,
}: TypewriterTitleProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    if (!isInView) return

    let index = 0
    const interval = setInterval(() => {
      index++
      setDisplayedText(text.slice(0, index))
      if (index >= text.length) {
        clearInterval(interval)
        setIsDone(true)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [isInView, text, speed])

  // Curseur clignote puis disparaît après la fin de l'animation
  useEffect(() => {
    if (!isDone) return

    const timeout = setTimeout(() => {
      setShowCursor(false)
    }, 1500)

    return () => clearTimeout(timeout)
  }, [isDone])

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>
      {displayedText}
      {isInView && showCursor && (
        <span className="animate-blink text-accent">|</span>
      )}
    </Tag>
  )
}
