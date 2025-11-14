'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ButterflyProps {
  id: number
  startX: number
  startY: number
  color?: string
}

const Butterfly: React.FC<ButterflyProps> = ({ id, startX, startY, color = '#FFD700' }) => {
  const [path, setPath] = useState<{ x: number; y: number }[]>([])

  useEffect(() => {
    // Generate random flight path
    const generatePath = () => {
      const points = []
      const numPoints = 5 + Math.floor(Math.random() * 3)

      for (let i = 0; i < numPoints; i++) {
        points.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight
        })
      }

      setPath(points)
    }

    generatePath()
    const interval = setInterval(generatePath, 15000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="absolute pointer-events-none z-50"
      initial={{ x: startX, y: startY, scale: 0, opacity: 0 }}
      animate={{
        x: path.map(p => p.x),
        y: path.map(p => p.y),
        scale: 1,
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{
        duration: 15,
        times: [0, 0.1, 0.5, 0.9, 1],
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div
        animate={{
          rotateY: [0, 180, 360],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "linear"
        }}
        className="relative"
      >
        {/* Butterfly wings */}
        <svg width="40" height="40" viewBox="0 0 40 40" className="filter drop-shadow-lg">
          <g transform="translate(20, 20)">
            {/* Left wing */}
            <motion.ellipse
              cx="-8"
              cy="0"
              rx="10"
              ry="15"
              fill={color}
              fillOpacity="0.8"
              animate={{
                ry: [15, 18, 15],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            {/* Right wing */}
            <motion.ellipse
              cx="8"
              cy="0"
              rx="10"
              ry="15"
              fill={color}
              fillOpacity="0.8"
              animate={{
                ry: [15, 18, 15],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            {/* Body */}
            <rect x="-2" y="-10" width="4" height="20" fill="#4A4A4A" rx="2" />
          </g>
        </svg>

        {/* Sparkle trail */}
        <motion.div
          className="absolute -top-2 -left-2"
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: id * 0.2,
          }}
        >
          ✨
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Butterfly