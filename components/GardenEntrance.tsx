'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ButterflyProps {
  id: number;
  src: string;
  delay: number;
}

const Butterfly: React.FC<ButterflyProps> = ({ id, src, delay }) => {
  // Gerar trajetória única para cada borboleta
  const generateComplexPath = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const points = 12; // Muitos pontos para trajetória fluida
    const xPath = [];
    const yPath = [];

    for (let i = 0; i <= points; i++) {
      // Garantir que as borboletas cubram TODA a tela
      const xVariation = isMobile
        ? Math.random() * (window.innerWidth + 100) - 50 // Mobile: extrapolar além das bordas
        : Math.random() * window.innerWidth;

      const yVariation = isMobile
        ? Math.random() * (window.innerHeight + 100) - 50 // Mobile: cobrir toda altura
        : Math.random() * window.innerHeight;

      xPath.push(xVariation);
      yPath.push(yVariation);
    }

    return { xPath, yPath };
  };

  const [path] = useState(generateComplexPath());

  return (
    <motion.div
      className="fixed pointer-events-none"
      style={{ zIndex: 100 + id }}
      initial={{
        x: -100,
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
        scale: 0,
        opacity: 0
      }}
      animate={{
        x: path.xPath,
        y: path.yPath,
        scale: [0, 1, 1.2, 1, 1.1, 1, 0.8, 1, 0],
        opacity: [0, 1, 1, 1, 1, 1, 1, 1, 0],
        rotate: path.xPath.map(() => (Math.random() - 0.5) * 60)
      }}
      transition={{
        duration: 15 + Math.random() * 10, // Duração variada 15-25s
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.1, 0.2, 0.4, 0.5, 0.7, 0.8, 0.9, 1]
      }}
    >
      <motion.div
        animate={{
          scaleX: [1, 0.7, 1, 0.8, 1],
          scaleY: [1, 1.3, 1, 1.2, 1],
          rotateY: [0, 180, 0, -180, 0]
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Image
          src={src}
          alt="Borboleta"
          width={60}
          height={60}
          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 drop-shadow-xl"
          priority
        />
      </motion.div>
    </motion.div>
  );
};

const FlowerDecoration: React.FC<{ position: string; delay: number }> = ({ position, delay }) => {
  return (
    <motion.div
      className={`absolute ${position} w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24`}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay, duration: 0.8, type: "spring" }}
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
  );
};

export default function GardenEntrance({ onComplete }: { onComplete: () => void }) {
  const [showContent, setShowContent] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Definir tamanho da janela
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 8000);

    return () => {
      window.removeEventListener('resize', updateSize);
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // 10 borboletas com imagens duplicadas
  const butterflies = [
    { id: 1, src: '/BORBOLETA3.png', delay: 0 },
    { id: 2, src: '/BORBOLETA4.png', delay: 0.5 },
    { id: 3, src: '/BORBOLETA5.png', delay: 1 },
    { id: 4, src: '/BORBOLETA6.png', delay: 1.5 },
    { id: 5, src: '/BORBOLETA7.png', delay: 2 },
    { id: 6, src: '/BORBOLETA3.png', delay: 2.5 },
    { id: 7, src: '/BORBOLETA4.png', delay: 3 },
    { id: 8, src: '/BORBOLETA5.png', delay: 3.5 },
    { id: 9, src: '/BORBOLETA6.png', delay: 4 },
    { id: 10, src: '/BORBOLETA7.png', delay: 4.5 }
  ];

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-pink-100 via-purple-50 to-green-50 overflow-hidden">
      {/* Container para borboletas - posição fixed para cobrir toda viewport */}
      <div className="fixed inset-0 pointer-events-none">
        {butterflies.map((butterfly) => (
          <Butterfly
            key={butterfly.id}
            id={butterfly.id}
            src={butterfly.src}
            delay={butterfly.delay}
          />
        ))}
      </div>

      {/* Fundo com grama */}
      <div className="absolute bottom-0 w-full h-20 sm:h-24 md:h-32 bg-gradient-to-t from-green-400 via-green-300 to-transparent"></div>

      {/* Flores decorativas responsivas */}
      <FlowerDecoration position="top-5 left-5 sm:top-10 sm:left-10" delay={0.5} />
      <FlowerDecoration position="top-10 right-5 sm:top-20 sm:right-20" delay={0.7} />
      <FlowerDecoration position="bottom-20 left-5 sm:bottom-40 sm:left-20" delay={0.9} />
      <FlowerDecoration position="bottom-16 right-5 sm:bottom-32 sm:right-10" delay={1.1} />

      {/* Conteúdo principal */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
          >
            {/* Flores superiores decorativas responsivas */}
            <motion.div
              className="absolute top-0 w-full flex justify-center overflow-hidden"
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <div className="flex gap-2 sm:gap-3 md:gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} width="40" height="40" viewBox="0 0 100 100"
                    className="opacity-80 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
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

            {/* Moldura com foto da Catarina - Responsiva */}
            <motion.div
              className="relative mb-6 sm:mb-8"
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 1, duration: 1.5, type: "spring" }}
            >
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 sm:border-6 md:border-8 border-pink-300 shadow-2xl">
                <Image
                  src="/CATARINAMOLDURA.png"
                  alt="Catarina"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Badge "1 aninho" */}
              <motion.div
                className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2, type: "spring" }}
              >
                <span className="text-base sm:text-lg md:text-xl font-bold">1 aninho</span>
              </motion.div>
            </motion.div>

            {/* Nome Catarina - Responsivo */}
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl font-script text-pink-600 mb-6 sm:mb-8 drop-shadow-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Catarina
            </motion.h1>

            {/* Informações do evento - Mobile First */}
            <motion.div
              className="text-center space-y-4 w-full max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 0.8 }}
            >
              {/* Versão Mobile */}
              <div className="sm:hidden space-y-3">
                <div className="flex items-center justify-center gap-2 text-green-700">
                  <span className="text-2xl">📅</span>
                  <div>
                    <p className="text-lg font-bold">Sáb, 13 de dezembro</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-green-700">
                  <span className="text-2xl">⏰</span>
                  <div>
                    <p className="text-lg font-bold">às 16h</p>
                  </div>
                </div>
              </div>

              {/* Versão Desktop */}
              <div className="hidden sm:flex items-center justify-center gap-6 md:gap-8 text-green-700 text-base sm:text-lg">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl">📅</span>
                  <div>
                    <p className="font-semibold">Sáb</p>
                    <p className="text-lg sm:text-xl font-bold">13 de dezembro</p>
                  </div>
                </div>
                <span className="text-xl sm:text-2xl">🌸</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl">⏰</span>
                  <div>
                    <p className="font-semibold">Começa</p>
                    <p className="text-lg sm:text-xl font-bold">às 16h</p>
                  </div>
                </div>
              </div>

              <motion.div
                className="mt-4 sm:mt-6 bg-white/80 backdrop-blur px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 3.5, type: "spring" }}
              >
                <p className="text-purple-700 font-semibold text-base sm:text-lg">
                  Condomínio Almirante Alves Câmara
                </p>
                <p className="text-purple-600 text-sm sm:text-base">
                  Estrada do Dendê, 2030 - Moneró
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

            {/* Botão para continuar - Responsivo */}
            <motion.button
              onClick={onComplete}
              className="mt-6 sm:mt-8 bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.5, duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="inline-block">Entrar no Jardim Encantado</span>
              <span className="ml-2">🦋</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Adicionar link para a fonte Dancing Script */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');
      `}</style>
    </div>
  );
}