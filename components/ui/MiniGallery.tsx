'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const MiniGallery = () => {
  const photos = [
    '/images/cat1.jpeg',
    '/images/cat2.jpeg',
    '/images/cat3.jpeg',
    '/images/cat4.jpeg',
    '/images/cat5.jpeg',
    '/images/cat6.jpeg'
  ]

  return (
    <section className="py-8 sm:py-12 px-4 relative">
      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Title */}
        <motion.h2
          className="text-2xl md:text-3xl font-magical text-candy-pink text-center mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Momentos Especiais da Nossa Princesa
        </motion.h2>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 max-w-2xl mx-auto">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={photo}
                alt={`Catarina - Foto ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 45vw, (max-width: 768px) 40vw, 300px"
                loading="lazy"
                quality={80}
              />

              {/* Decorative overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <div className="absolute bottom-2 right-2 text-white">
                  <span className="text-2xl">💕</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Decorative elements */}
        <motion.div
          className="flex justify-center gap-4 mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <span className="text-2xl animate-pulse">🌸</span>
          <span className="text-2xl animate-pulse delay-100">💕</span>
          <span className="text-2xl animate-pulse delay-200">🌸</span>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default MiniGallery