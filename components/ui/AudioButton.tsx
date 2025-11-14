'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

interface AudioButtonProps {
  isMuted: boolean
  onClick: () => void
  isPlaying?: boolean
}

export default function AudioButton({ isMuted, onClick, isPlaying = false }: AudioButtonProps) {
  return (
    <>
      {/* Indicador pulsante quando a música está tocando */}
      {isPlaying && !isMuted && (
        <motion.div
          className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-candy-pink opacity-30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", bounce: 0.5 }}
        onClick={onClick}
        className="fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg bg-gradient-to-r from-candy-pink to-candy-lilac text-white hover:shadow-xl transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isMuted ? "Ativar som" : "Desativar som"}
        title={isMuted ? "Clique para ativar a música" : "Clique para desativar a música"}
      >
        <motion.div
          animate={{ rotate: isMuted ? 0 : [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {isMuted ? (
            <VolumeX size={24} className="text-white" />
          ) : (
            <Volume2 size={24} className="text-white" />
          )}
        </motion.div>
      </motion.button>

      {/* Tooltip inicial para incentivar interação */}
      {isMuted && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 2 }}
          className="fixed bottom-9 right-20 z-40 bg-white text-candy-pink px-3 py-1 rounded-lg shadow-md text-sm font-medium"
        >
          🎵 Clique para ouvir a música!
        </motion.div>
      )}
    </>
  )
}