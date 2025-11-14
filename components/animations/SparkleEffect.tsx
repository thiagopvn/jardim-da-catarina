'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  color: string
}

export default function SparkleEffect() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const handlePointerMove = (e: PointerEvent) => {
      const newSparkle: Sparkle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 20 + 10,
        color: ['#FFD700', '#FFB6C1', '#E6E6FA', '#87CEEB'][Math.floor(Math.random() * 4)]
      }

      setSparkles(prev => [...prev.slice(-20), newSparkle])
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [isClient])

  if (!isClient) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute"
            initial={{
              x: sparkle.x - sparkle.size / 2,
              y: sparkle.y - sparkle.size / 2,
              scale: 0,
              opacity: 1,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [1, 1, 0],
              rotate: [0, 180, 360],
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
            style={{
              width: sparkle.size,
              height: sparkle.size,
            }}
          >
            <svg
              width={sparkle.size}
              height={sparkle.size}
              viewBox="0 0 24 24"
              fill={sparkle.color}
            >
              <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}