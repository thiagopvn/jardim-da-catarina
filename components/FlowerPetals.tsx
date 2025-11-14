'use client';

import React from 'react';
import { motion } from 'framer-motion';

const FlowerPetals = () => {
  const petals = Array.from({ length: 8 });

  return (
    <div className="relative w-64 h-64">
      {/* Centro da flor */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-16 h-16 bg-yellow-400 rounded-full shadow-lg z-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      </div>

      {/* Pétalas */}
      {petals.map((_, index) => {
        const angle = (index * 360) / petals.length;
        return (
          <motion.div
            key={index}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ rotate: angle, scale: 0 }}
            animate={{
              rotate: [angle, angle + 360],
              scale: [0, 1, 1, 0]
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              times: [0, 0.3, 0.7, 1],
              delay: index * 0.1
            }}
          >
            <div
              className="absolute w-20 h-32 bg-gradient-to-t from-pink-400 to-pink-600 rounded-full shadow-lg"
              style={{
                transform: `translateY(-60px)`,
                clipPath: 'ellipse(50% 80% at 50% 100%)',
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default FlowerPetals;