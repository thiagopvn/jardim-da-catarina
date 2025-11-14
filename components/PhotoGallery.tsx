'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface PhotoGalleryProps {
  onComplete: () => void;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ onComplete }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const photos = [
    { src: '/Catarina1.png', alt: 'Catarina - Foto 1' },
    { src: '/catarina2.png', alt: 'Catarina - Foto 2' },
    { src: '/catarina3.png', alt: 'Catarina - Foto 3' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto((prev) => {
        if (prev === photos.length - 1) {
          setTimeout(() => {
            onComplete();
          }, 2000);
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [onComplete, photos.length]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPhoto}
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative"
        >
          <div className="relative w-[500px] h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={photos[currentPhoto].src}
              alt={photos[currentPhoto].alt}
              fill
              className="object-cover"
              priority
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
          </div>

          {/* Decorações animadas ao redor da foto */}
          <motion.div
            className="absolute -top-8 -left-8 w-16 h-16 bg-pink-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-8 -right-8 w-20 h-20 bg-purple-400 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -top-6 -right-6 w-12 h-12 bg-yellow-400 rounded-full"
            animate={{
              scale: [1, 1.4, 1],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Indicadores de fotos */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3">
        {photos.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentPhoto ? 'bg-pink-500' : 'bg-pink-300'
            }`}
            animate={{
              scale: index === currentPhoto ? 1.5 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;