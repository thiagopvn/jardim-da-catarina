'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'

interface CountdownProps {
  targetDate: Date
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      })
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  const timeUnits = [
    { label: 'Dias', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Minutos', value: timeLeft.minutes },
    { label: 'Segundos', value: timeLeft.seconds },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-candy-pink/30">
            <motion.div
              className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-candy-pink to-candy-lilac bg-clip-text text-transparent"
              key={unit.value}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              {String(unit.value).padStart(2, '0')}
            </motion.div>
            <div className="text-xs md:text-sm text-gray-600 font-elegant mt-1">
              {unit.label}
            </div>
          </div>

          {/* Decorative flower */}
          <div className="absolute -top-2 -right-2 text-xl animate-pulse">
            🌸
          </div>
        </motion.div>
      ))}
    </div>
  )
}