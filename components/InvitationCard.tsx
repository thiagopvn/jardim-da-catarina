'use client';

import React from 'react';
import { motion } from 'framer-motion';

const InvitationCard = () => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="max-w-2xl mx-auto p-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 100,
          damping: 10
        }}
      >
        {/* Flores decorativas animadas */}
        <div className="absolute -top-10 -left-10">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <span className="text-6xl">🌸</span>
          </motion.div>
        </div>
        <div className="absolute -top-10 -right-10">
          <motion.div
            animate={{
              rotate: [0, -360],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <span className="text-6xl">🌺</span>
          </motion.div>
        </div>
        <div className="absolute -bottom-10 -left-10">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <span className="text-6xl">🌼</span>
          </motion.div>
        </div>
        <div className="absolute -bottom-10 -right-10">
          <motion.div
            animate={{
              rotate: [0, -360],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <span className="text-6xl">🌻</span>
          </motion.div>
        </div>

        {/* Conteúdo do convite */}
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Catarina
          </motion.h1>

          <motion.div
            className="text-3xl text-gray-700 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            está fazendo
          </motion.div>

          <motion.div
            className="text-8xl font-bold text-pink-500"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 1,
              duration: 0.6,
              type: "spring",
              stiffness: 200,
              damping: 10
            }}
          >
            1 ANO!
          </motion.div>

          <motion.div
            className="space-y-4 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <p className="text-xl text-gray-700">
              Venha celebrar este momento especial conosco!
            </p>

            <div className="bg-pink-50 p-6 rounded-2xl space-y-3">
              <div className="flex items-center justify-center gap-2 text-lg">
                <span className="text-2xl">📅</span>
                <span className="font-semibold text-gray-800">Data: </span>
                <span className="text-gray-700">[Adicione a data aqui]</span>
              </div>

              <div className="flex items-center justify-center gap-2 text-lg">
                <span className="text-2xl">⏰</span>
                <span className="font-semibold text-gray-800">Horário: </span>
                <span className="text-gray-700">[Adicione o horário aqui]</span>
              </div>

              <div className="flex items-center justify-center gap-2 text-lg">
                <span className="text-2xl">📍</span>
                <span className="font-semibold text-gray-800">Local: </span>
                <span className="text-gray-700">[Adicione o local aqui]</span>
              </div>
            </div>

            <motion.div
              className="pt-6"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <p className="text-2xl font-bold text-purple-600">
                Sua presença tornará este dia ainda mais especial!
              </p>
            </motion.div>
          </motion.div>

          {/* Animação de confete */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
                initial={{
                  x: Math.random() * 400 - 200,
                  y: -20,
                  rotate: 0
                }}
                animate={{
                  y: 600,
                  rotate: Math.random() * 720,
                  x: Math.random() * 400 - 200
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear"
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default InvitationCard;