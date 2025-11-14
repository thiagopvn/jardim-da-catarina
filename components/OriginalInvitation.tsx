'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Calendar, Clock } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import BloomingFlower from '@/components/animations/BloomingFlower'
import ButterflyAnimation from '@/components/animations/ButterflyAnimation'
import SparkleEffect from '@/components/animations/SparkleEffect'
import Countdown from '@/components/ui/Countdown'
import MiniGallery from '@/components/ui/MiniGallery'
import RSVPModal from '@/components/forms/RSVPModal'

// Dynamic imports for heavy components
const ParallaxSection = dynamic(() => import('@/components/ui/ParallaxSection'), { ssr: false })

interface OriginalInvitationProps {
  showIntro?: boolean;
}

export default function OriginalInvitation({ showIntro = false }: OriginalInvitationProps) {
  const [showContent, setShowContent] = useState(!showIntro)
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false)

  // Party details
  const partyDate = new Date('2025-12-13T16:00:00') // Sábado, 13 de Dezembro de 2025 às 16h
  const partyLocation = {
    name: 'Condomínio Almirante Alves Câmara',
    address: 'Estrada do Dendê, 2030 - Moneró',
    city: 'Rio de Janeiro - RJ',
    mapUrl: 'https://www.google.com/maps/place/Condominio+Almirante+Alves+Camara/@-22.7962855,-43.2037894,17z/data=!3m1!4b1!4m6!3m5!1s0x99778efd1bf975:0x29b75e60cdab3295!8m2!3d-22.7962855!4d-43.2012145!16s%2Fg%2F11c6lfjkhl?entry=ttu&g_ep=EgoyMDI1MTExMS4wIKXMDSoASAFQAw%3D%3D'
  }

  const handleIntroComplete = () => {
    setTimeout(() => {
      setShowContent(true)
    }, 500)
  }

  return (
    <>
      <SparkleEffect />

      {/* Intro Animation - Only if showIntro is true */}
      {showIntro && (
        <AnimatePresence>
          {!showContent && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pastel-pink via-pastel-lilac to-pastel-blue"
              exit={{ opacity: 0 }}
            >
              <BloomingFlower onBloomComplete={handleIntroComplete} size={300} />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Main Content */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="min-h-screen relative overflow-hidden"
        >
          {/* New Butterfly Animation Component */}
          <ButterflyAnimation />

          {/* Hero Section - Garden Invitation Design - Mobile First */}
          <section className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12 relative bg-gradient-to-b from-pink-100 via-purple-50 to-green-50">
            {/* Grass Bottom */}
            <div className="absolute bottom-0 w-full h-24 sm:h-32 bg-gradient-to-t from-green-400 via-green-300 to-transparent z-0"></div>

            {/* Decorative Flowers */}
            <motion.div
              className="absolute top-5 left-5 sm:top-10 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <g transform="translate(50, 50)">
                  {[0, 72, 144, 216, 288].map((angle, i) => (
                    <ellipse
                      key={i}
                      cx="0"
                      cy="-20"
                      rx="15"
                      ry="25"
                      fill="#FFB6C1"
                      fillOpacity="0.9"
                      transform={`rotate(${angle})`}
                      className="drop-shadow-sm"
                    />
                  ))}
                  <circle cx="0" cy="0" r="12" fill="#FFD700" className="drop-shadow-sm" />
                </g>
              </svg>
            </motion.div>

            <motion.div
              className="absolute top-5 right-5 sm:top-10 sm:right-10 md:top-20 md:right-20 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.7, duration: 0.8, type: "spring" }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <g transform="translate(50, 50)">
                  {[0, 72, 144, 216, 288].map((angle, i) => (
                    <ellipse
                      key={i}
                      cx="0"
                      cy="-20"
                      rx="15"
                      ry="25"
                      fill="#E6E6FA"
                      fillOpacity="0.9"
                      transform={`rotate(${angle})`}
                      className="drop-shadow-sm"
                    />
                  ))}
                  <circle cx="0" cy="0" r="12" fill="#FFD700" className="drop-shadow-sm" />
                </g>
              </svg>
            </motion.div>

            <motion.div
              className="hidden sm:block absolute bottom-20 sm:bottom-40 left-5 sm:left-20 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.9, duration: 0.8, type: "spring" }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <g transform="translate(50, 50)">
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <ellipse
                      key={i}
                      cx="0"
                      cy="-15"
                      rx="12"
                      ry="20"
                      fill="#87CEEB"
                      fillOpacity="0.9"
                      transform={`rotate(${angle})`}
                      className="drop-shadow-sm"
                    />
                  ))}
                  <circle cx="0" cy="0" r="10" fill="#FFD700" className="drop-shadow-sm" />
                </g>
              </svg>
            </motion.div>

            <motion.div
              className="hidden sm:block absolute bottom-20 sm:bottom-32 right-5 sm:right-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.1, duration: 0.8, type: "spring" }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <g transform="translate(50, 50)">
                  {[0, 72, 144, 216, 288].map((angle, i) => (
                    <ellipse
                      key={i}
                      cx="0"
                      cy="-20"
                      rx="15"
                      ry="25"
                      fill="#FFB6C1"
                      fillOpacity="0.9"
                      transform={`rotate(${angle})`}
                      className="drop-shadow-sm"
                    />
                  ))}
                  <circle cx="0" cy="0" r="12" fill="#FFD700" className="drop-shadow-sm" />
                </g>
              </svg>
            </motion.div>

            {/* Top Flowers Row - Hidden on mobile */}
            <motion.div
              className="hidden sm:flex absolute top-0 w-full justify-center"
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <div className="flex gap-2 sm:gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} width="40" height="40" className="w-10 h-10 sm:w-12 sm:h-12 md:w-[60px] md:h-[60px] opacity-80" viewBox="0 0 100 100">
                    <g transform="translate(50, 50)">
                      {[0, 60, 120, 180, 240, 300].map((angle, j) => (
                        <ellipse
                          key={j}
                          cx="0"
                          cy="-15"
                          rx="12"
                          ry="20"
                          fill={i % 2 === 0 ? "#FFB6C1" : "#E6E6FA"}
                          transform={`rotate(${angle})`}
                        />
                      ))}
                      <circle cx="0" cy="0" r="8" fill="#FFD700" />
                    </g>
                  </svg>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center max-w-4xl mx-auto relative z-10 px-4"
            >
              {/* Welcome Text Above Photo - Responsive */}
              <motion.div
                className="mb-6 sm:mb-8 md:mb-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-pink-600 font-medium leading-relaxed px-2 sm:px-4 md:px-8">
                  <motion.span
                    className="block mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 drop-shadow-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    style={{ fontFamily: 'var(--font-dancing-script), cursive' }}
                  >
                    A flor mais linda do nosso jardim está completando seu primeiro aninho!
                  </motion.span>
                  <motion.span
                    className="block text-lg sm:text-xl md:text-2xl lg:text-3xl text-purple-600 font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.5 }}
                  >
                    Te convidamos para celebrar conosco esse momento especial, cheio de amor e ternura,
                  </motion.span>
                  <motion.span
                    className="block text-lg sm:text-xl md:text-2xl lg:text-3xl text-purple-600 font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                  >
                    no jardim encantado da princesa{' '}
                    <motion.span
                      className="inline-block font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-500 to-purple-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg relative mx-2"
                      style={{ fontFamily: 'var(--font-dancing-script), cursive' }}
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [-2, 2, -2]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <span className="absolute -top-2 -left-2 text-yellow-400 text-sm sm:text-base animate-pulse">✨</span>
                      <span className="absolute -top-2 -right-2 text-yellow-400 text-sm sm:text-base animate-pulse delay-200">⭐</span>
                      Catarina
                      <span className="absolute -bottom-2 -left-2 text-yellow-400 text-sm sm:text-base animate-pulse delay-300">⭐</span>
                      <span className="absolute -bottom-2 -right-2 text-yellow-400 text-sm sm:text-base animate-pulse delay-100">✨</span>
                      <span className="absolute -inset-2 blur-xl bg-pink-400/20 -z-10 rounded-lg"></span>
                    </motion.span>
                    <span className="text-2xl sm:text-3xl md:text-4xl ml-1">!</span>
                  </motion.span>
                </div>

                {/* Decorative Flower Elements */}
                <motion.div
                  className="flex justify-center gap-4 sm:gap-6 mt-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, type: "spring" }}
                >
                  <span className="text-3xl sm:text-4xl animate-pulse">🌸</span>
                  <span className="text-3xl sm:text-4xl animate-pulse delay-100">🌺</span>
                  <span className="text-3xl sm:text-4xl animate-pulse delay-200">🌸</span>
                </motion.div>
              </motion.div>

              {/* Central Photo with Frame - Responsive and Larger */}
              <motion.div
                className="relative mb-8 sm:mb-10"
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 1, duration: 1.5, type: "spring" }}
              >
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto rounded-full overflow-hidden shadow-2xl">
                  <Image
                    src="/CATARINAMOLDURA.png"
                    alt="Catarina"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                    sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                  />
                </div>
                {/* Badge "1 aninho" - Responsive and Adjusted */}
                <motion.div
                  className="absolute -bottom-4 sm:-bottom-5 md:-bottom-6 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2, type: "spring" }}
                >
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold">1 aninho</span>
                </motion.div>
              </motion.div>

              {/* Name Catarina - Responsive */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-pink-600 mb-6 sm:mb-8 drop-shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.8 }}
                style={{ fontFamily: 'var(--font-dancing-script), cursive' }}
              >
                Catarina
              </motion.h1>

              {/* Event Information - Responsive */}
              <motion.div
                className="text-center space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 0.8 }}
              >
                <div className="flex flex-row items-center justify-center gap-3 sm:gap-6 md:gap-8 text-green-700 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl">📅</span>
                    <div className="text-left">
                      <p className="font-semibold text-sm sm:text-base whitespace-nowrap">Sáb</p>
                      <p className="text-sm sm:text-base md:text-lg font-bold whitespace-nowrap">13 de dezembro</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <span className="text-xl sm:text-2xl">🌸</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl">⏰</span>
                    <div className="text-left">
                      <p className="font-semibold text-sm sm:text-base whitespace-nowrap">Começa</p>
                      <p className="text-sm sm:text-base md:text-lg font-bold whitespace-nowrap">às 16h</p>
                    </div>
                  </div>
                </div>

                <motion.div
                  className="mt-4 sm:mt-6 bg-white/80 backdrop-blur px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-2xl shadow-lg inline-block max-w-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 3.5, type: "spring" }}
                >
                  <p className="text-purple-700 font-semibold text-base sm:text-lg">
                    {partyLocation.name}
                  </p>
                  <p className="text-purple-600 text-sm sm:text-base">
                    {partyLocation.address}, {partyLocation.city}
                  </p>
                </motion.div>

                <motion.p
                  className="text-2xl sm:text-3xl font-bold text-green-600 mt-6 sm:mt-8"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 4, type: "spring", bounce: 0.5 }}
                >
                  Te esperamos! 💖
                </motion.p>
              </motion.div>
            </motion.div>
          </section>

          {/* Event Details Section - Responsive */}
          <section className="py-8 sm:py-12 px-4 relative">
            <motion.div
              className="max-w-4xl mx-auto relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-magical text-center text-candy-pink mb-6 sm:mb-8">
                  Informações da Festa
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <motion.div
                    className="text-center p-4 sm:p-6 bg-gradient-to-br from-pastel-pink to-white rounded-xl sm:rounded-2xl"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Calendar className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-candy-pink" />
                    <h3 className="font-elegant text-base sm:text-lg mb-1 sm:mb-2">Data</h3>
                    <p className="text-gray-700 text-sm sm:text-base">13 de Dezembro de 2025</p>
                    <p className="text-gray-600 text-xs sm:text-sm">Sábado</p>
                  </motion.div>

                  <motion.div
                    className="text-center p-4 sm:p-6 bg-gradient-to-br from-pastel-lilac to-white rounded-xl sm:rounded-2xl"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Clock className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-candy-lilac" />
                    <h3 className="font-elegant text-base sm:text-lg mb-1 sm:mb-2">Horário</h3>
                    <p className="text-gray-700 text-sm sm:text-base">16:00</p>
                    <p className="text-gray-600 text-xs sm:text-sm">às 20:00</p>
                  </motion.div>

                  <motion.div
                    className="text-center p-4 sm:p-6 bg-gradient-to-br from-pastel-blue to-white rounded-xl sm:rounded-2xl"
                    whileHover={{ scale: 1.05 }}
                  >
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-candy-blue" />
                    <h3 className="font-elegant text-base sm:text-lg mb-1 sm:mb-2">Local</h3>
                    <p className="text-gray-700 text-xs sm:text-sm">{partyLocation.name}</p>
                    <p className="text-gray-600 text-xs">{partyLocation.address}</p>
                  </motion.div>
                </div>

                <motion.a
                  href={partyLocation.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full sm:w-auto sm:mx-auto text-center bg-gradient-to-r from-candy-blue to-candy-mint text-white font-medium px-6 sm:px-8 py-2.5 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📍 Ver no Mapa
                </motion.a>
              </div>
            </motion.div>
          </section>

          {/* Countdown Section - Responsive */}
          <section className="py-8 sm:py-12 px-4 relative">
            <motion.div
              className="max-w-4xl mx-auto text-center relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-magical text-candy-pink mb-2">
                Faltam apenas...
              </h2>
              <Countdown targetDate={partyDate} />
            </motion.div>
          </section>

          {/* Mini Gallery Section */}
          <MiniGallery />

          {/* RSVP Section - Responsive */}
          <section className="py-8 sm:py-12 px-4 relative flex justify-center items-center">
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.button
                onClick={() => setIsRSVPModalOpen(true)}
                className="bg-gradient-to-r from-candy-pink to-candy-lilac text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">Confirmar Presença</span>
              </motion.button>
            </motion.div>
          </section>


          {/* Footer */}
          <footer className="py-12 px-4 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <p className="font-magical text-2xl text-candy-pink">
                Com amor,
              </p>
              <p className="font-elegant text-xl text-gray-700">
                Família de Catarina
              </p>
            </motion.div>
          </footer>
        </motion.div>
      )}

      {/* RSVP Modal */}
      <RSVPModal
        isOpen={isRSVPModalOpen}
        onClose={() => setIsRSVPModalOpen(false)}
      />
    </>
  )
}