'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface BloomingFlowerProps {
  onBloomComplete?: () => void
  size?: number
  color?: string
}

export default function BloomingFlower({
  onBloomComplete,
  size = 300,
  color = '#FFB6C1'
}: BloomingFlowerProps) {
  // Generate colors for gradient petals
  const petalColors = [
    '#FFB6C1', // Pink
    '#FFC0CB', // Light Pink
    '#FFD4E1', // Lighter Pink
    '#FFAEC1', // Darker Pink
    '#FF91A4', // Rose
    '#FFA8B5', // Medium Pink
    '#FFBEC9', // Soft Pink
    '#FFC5D0', // Pale Pink
  ]

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0.3] }}
        transition={{ duration: 2 }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />
      </motion.div>

      <svg
        width={size}
        height={size}
        viewBox="0 0 300 300"
        className="filter drop-shadow-2xl"
      >
        <defs>
          {/* Define gradients for each petal */}
          {petalColors.map((color, index) => (
            <radialGradient key={`gradient-${index}`} id={`petalGradient${index}`}>
              <stop offset="0%" stopColor={color} stopOpacity="1" />
              <stop offset="100%" stopColor={color} stopOpacity="0.6" />
            </radialGradient>
          ))}

          {/* Center gradient */}
          <radialGradient id="centerGradient">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
            <stop offset="50%" stopColor="#FFA500" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.8" />
          </radialGradient>
        </defs>

        {/* Flower petals - using path for more realistic petal shape */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, index) => (
          <motion.g
            key={`petal-${index}`}
            transform={`rotate(${rotation} 150 150)`}
          >
            <motion.path
              d="M 150 100 Q 130 50 150 30 Q 170 50 150 100"
              fill={`url(#petalGradient${index})`}
              stroke={petalColors[index]}
              strokeWidth="0.5"
              opacity="0.9"
              initial={{
                scale: 0,
                rotate: -45,
                y: 20
              }}
              animate={{
                scale: 1,
                rotate: 0,
                y: 0
              }}
              transition={{
                delay: index * 0.12,
                duration: 0.8,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              style={{
                transformOrigin: '150px 100px',
              }}
            />
            {/* Inner petal layer for depth */}
            <motion.path
              d="M 150 110 Q 135 70 150 50 Q 165 70 150 110"
              fill={`${petalColors[index]}88`}
              opacity="0.6"
              initial={{
                scale: 0,
                rotate: -30,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                delay: index * 0.12 + 0.1,
                duration: 0.6,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              style={{
                transformOrigin: '150px 110px',
              }}
            />
          </motion.g>
        ))}

        {/* Flower center - multi-layered for depth */}
        <motion.g>
          {/* Outer center ring */}
          <motion.circle
            cx="150"
            cy="150"
            r="35"
            fill="url(#centerGradient)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.8,
              duration: 0.6,
              type: "spring",
              stiffness: 200,
            }}
          />

          {/* Middle center circle */}
          <motion.circle
            cx="150"
            cy="150"
            r="25"
            fill="#FFD700"
            opacity="0.9"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 1,
              duration: 0.5,
              type: "spring",
              stiffness: 250,
            }}
          />

          {/* Inner center detail */}
          <motion.circle
            cx="150"
            cy="150"
            r="15"
            fill="#FFA500"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 1.2,
              duration: 0.4,
              type: "spring",
              stiffness: 300,
            }}
          />

          {/* Center highlight */}
          <motion.circle
            cx="145"
            cy="145"
            r="8"
            fill="#FFF5E6"
            opacity="0.7"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 1.4,
              duration: 0.3,
            }}
          />
        </motion.g>
      </svg>

      {/* Sparkles and particles around the flower */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * Math.PI * 2) / 12
        const radius = 120
        const x = 50 + (radius * Math.cos(angle) * 100) / size
        const y = 50 + (radius * Math.sin(angle) * 100) / size

        return (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute pointer-events-none"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
              rotate: [0, 180, 360],
            }}
            transition={{
              delay: 1.6 + i * 0.08,
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: "easeInOut",
            }}
          >
            <span className="text-xl md:text-2xl">✨</span>
          </motion.div>
        )
      })}

      {/* Additional floating petals effect */}
      {[...Array(5)].map((_, i) => {
        const randomDelay = 2 + i * 0.3
        const randomX = Math.random() * 40 - 20
        const randomY = Math.random() * 40 - 20

        return (
          <motion.div
            key={`floating-petal-${i}`}
            className="absolute pointer-events-none"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 0.3, 0],
              x: randomX,
              y: randomY,
              rotate: [0, 360],
            }}
            transition={{
              delay: randomDelay,
              duration: 3,
              ease: "easeOut",
            }}
          >
            <span className="text-2xl md:text-3xl">🌸</span>
          </motion.div>
        )
      })}

      {/* Success callback after animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        onAnimationComplete={() => {
          if (onBloomComplete) {
            setTimeout(onBloomComplete, 500)
          }
        }}
      />
    </motion.div>
  )
}