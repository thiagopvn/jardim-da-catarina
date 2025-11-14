'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface ButterflyData {
  id: number
  image: string
  size: number
  duration: number
  delay: number
  path: {
    x: number[]
    y: number[]
  }
  rotatePattern: number[]
  vibrateIntensity: number
}

const ButterflyAnimation: React.FC = () => {
  const [screenDimensions, setScreenDimensions] = useState({ width: 1920, height: 1080 })

  useEffect(() => {
    // Atualiza dimensões da tela
    const updateDimensions = () => {
      setScreenDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Função aprimorada para gerar trajetória sinuosa natural com vibrações
  const generateNaturalPath = (index: number, screenWidth: number, screenHeight: number) => {
    // Ajusta a amplitude baseado no tamanho da tela
    const amplitudeBase = screenWidth < 640 ? 60 : screenWidth < 1024 ? 100 : 150
    const amplitude = amplitudeBase + Math.random() * (screenWidth < 640 ? 40 : 80)

    // Frequência variada para cada borboleta
    const frequency = 0.3 + Math.random() * 0.7
    const phase = Math.random() * Math.PI * 2

    // Define diferentes padrões de movimento
    const movementPatterns = [
      'horizontal', 'vertical', 'diagonal', 'circular', 'zigzag', 'figure8'
    ]
    const pattern = movementPatterns[index % movementPatterns.length]

    // Mais pontos para trajetória mais suave
    const points = 12
    const xPoints: number[] = []
    const yPoints: number[] = []

    for (let i = 0; i <= points; i++) {
      const progress = i / points
      let x = 0
      let y = 0

      switch (pattern) {
        case 'horizontal':
          // Movimento horizontal com ondulação vertical
          x = screenWidth * progress
          y = screenHeight * 0.5 + Math.sin(progress * Math.PI * 2 * frequency + phase) * amplitude
          break

        case 'vertical':
          // Movimento vertical com ondulação horizontal
          x = screenWidth * 0.5 + Math.sin(progress * Math.PI * 2 * frequency + phase) * amplitude
          y = screenHeight * progress
          break

        case 'diagonal':
          // Movimento diagonal com ondulação
          x = screenWidth * progress + Math.sin(progress * Math.PI * 3 * frequency) * amplitude * 0.5
          y = screenHeight * progress + Math.cos(progress * Math.PI * 3 * frequency) * amplitude * 0.5
          break

        case 'circular':
          // Movimento circular pelo viewport
          const radius = Math.min(screenWidth, screenHeight) * 0.3
          x = screenWidth * 0.5 + Math.cos(progress * Math.PI * 2 + phase) * radius
          y = screenHeight * 0.5 + Math.sin(progress * Math.PI * 2 + phase) * radius
          break

        case 'zigzag':
          // Movimento em zigzag
          x = screenWidth * progress
          y = (screenHeight * 0.3) + (progress % 0.2 < 0.1 ? amplitude : -amplitude)
          break

        case 'figure8':
          // Movimento em forma de 8
          const t = progress * Math.PI * 2
          x = screenWidth * 0.5 + Math.sin(t) * amplitude * 1.5
          y = screenHeight * 0.5 + Math.sin(t * 2) * amplitude * 0.75
          break

        default:
          // Padrão sinuoso
          x = screenWidth * progress
          y = screenHeight * 0.5 + Math.sin(progress * Math.PI * 2 * frequency + phase) * amplitude
      }

      // Adiciona pequenas vibrações para simular voo natural
      const vibration = 5 + Math.random() * 10
      x += (Math.random() - 0.5) * vibration
      y += (Math.random() - 0.5) * vibration

      xPoints.push(x)
      yPoints.push(y)
    }

    return { x: xPoints, y: yPoints }
  }

  // Gera padrão de rotação único para cada borboleta
  const generateRotationPattern = () => {
    const rotations = []
    for (let i = 0; i < 8; i++) {
      rotations.push(Math.random() * 30 - 15) // -15 a 15 graus
    }
    return rotations
  }

  // Configuração das 15 borboletas com todas as imagens disponíveis
  const butterflies: ButterflyData[] = React.useMemo(() => {
    const allImages = [
      '/BORBOLETA3.png',
      '/BORBOLETA4.png',
      '/BORBOLETA5.png',
      '/BORBOLETA6.png',
      '/BORBOLETA7.png',
      '/BORBOLETA8.png',
      '/BORBOLETA9.png',
      '/BORBOLETA10.png',
      '/BORBOLETA11.png',
      '/BORBOLETA12.png',
      '/BORBOLETA13.png',
      '/BORBOLETA14.png',
      '/BORBOLETA15.png',
      '/BORBOLETA16.png',
      '/BORBOLETA17.png'
    ]

    // Limita número de borboletas baseado no tamanho da tela para melhor performance
    const butterflyCount = screenDimensions.width < 640 ? 8 : screenDimensions.width < 1024 ? 12 : 15
    const images = allImages.slice(0, butterflyCount)

    const sizeBase = screenDimensions.width < 640 ? 25 : screenDimensions.width < 1024 ? 35 : 45
    const sizeRange = screenDimensions.width < 640 ? 15 : screenDimensions.width < 1024 ? 25 : 35

    return images.map((image, i) => ({
      id: i,
      image: image,
      size: sizeBase + Math.random() * sizeRange, // Tamanhos responsivos variados
      duration: 18 + Math.random() * 12, // Duração entre 18-30s
      delay: i * 0.8 + Math.random() * 2, // Delay escalonado para entrada gradual
      path: generateNaturalPath(i, screenDimensions.width, screenDimensions.height),
      rotatePattern: generateRotationPattern(),
      vibrateIntensity: 3 + Math.random() * 5 // Intensidade de vibração variada
    }))
  }, [screenDimensions])

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {butterflies.map((butterfly) => (
        <motion.div
          key={butterfly.id}
          className="absolute"
          initial={{
            x: butterfly.path.x[0],
            y: butterfly.path.y[0],
            opacity: 0,
            scale: 0
          }}
          animate={{
            x: butterfly.path.x,
            y: butterfly.path.y,
            opacity: [0, 0.9, 1, 1, 1, 1, 1, 1, 0.9, 0],
            scale: [0, 1, 1.05, 1, 1, 1, 1, 1.05, 1, 0],
            rotate: butterfly.rotatePattern
          }}
          transition={{
            duration: butterfly.duration,
            delay: butterfly.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.05, 0.1, 0.3, 0.5, 0.7, 0.8, 0.9, 0.95, 1]
          }}
        >
          {/* Container para batimento de asas */}
          <motion.div
            animate={{
              rotateY: [0, 30, 0, -30, 0], // Batimento de asas
              scale: [1, 0.98, 1, 0.98, 1] // Leve pulsação
            }}
            transition={{
              duration: 0.3 + Math.random() * 0.2, // Velocidade variada do batimento
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: butterfly.size,
              height: butterfly.size
            }}
          >
            {/* Pequena vibração adicional */}
            <motion.div
              animate={{
                x: [-butterfly.vibrateIntensity, butterfly.vibrateIntensity],
                y: [-butterfly.vibrateIntensity, butterfly.vibrateIntensity]
              }}
              transition={{
                duration: 0.15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            >
              <Image
                src={butterfly.image}
                alt="Borboleta"
                width={butterfly.size}
                height={butterfly.size}
                className="drop-shadow-lg opacity-95"
                priority={butterfly.id < 5} // Prioriza carregamento das primeiras 5
              />
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

export default ButterflyAnimation