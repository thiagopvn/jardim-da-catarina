'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Book, Shirt, Footprints, Heart, X } from 'lucide-react'

interface GiftCategory {
  id: string
  icon: React.ReactNode
  title: string
  suggestions: string[]
  color: string
}

const giftCategories: GiftCategory[] = [
  {
    id: 'toys',
    icon: <Gift size={24} />,
    title: 'Brinquedos Educativos',
    suggestions: [
      'Blocos de montar grandes e coloridos',
      'Livros musicais interativos',
      'Brinquedos de encaixe',
      'Pelúcias macias e seguras',
      'Instrumentos musicais infantis'
    ],
    color: 'from-candy-pink to-pink-400'
  },
  {
    id: 'books',
    icon: <Book size={24} />,
    title: 'Livros Infantis',
    suggestions: [
      'Livros de banho',
      'Livros com texturas diferentes',
      'Livros com sons de animais',
      'Contos de fadas ilustrados',
      'Livros de atividades para colorir'
    ],
    color: 'from-candy-lilac to-purple-400'
  },
  {
    id: 'clothes',
    icon: <Shirt size={24} />,
    title: 'Roupinhas',
    suggestions: [
      'Vestidos tamanho 2 anos',
      'Conjuntos de verão',
      'Pijamas confortáveis',
      'Meias antiderrapantes',
      'Chapéus e tiaras'
    ],
    color: 'from-candy-blue to-blue-400'
  },
  {
    id: 'shoes',
    icon: <Footprints size={24} />,
    title: 'Sapatinhos',
    suggestions: [
      'Sandálias tamanho 19/20',
      'Tênis confortáveis para os primeiros passos',
      'Sapatilhas delicadas',
      'Chinelos antiderrapantes',
      'Botas de chuva coloridas'
    ],
    color: 'from-candy-mint to-green-400'
  }
]

export default function GiftSuggestions() {
  const [selectedCategory, setSelectedCategory] = useState<GiftCategory | null>(null)

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl md:text-3xl font-magical text-candy-pink mb-2">
          Sugestões de Presentes
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Clique em uma categoria para ver as sugestões
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {giftCategories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
            className={`bg-gradient-to-br ${category.color} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all`}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="bg-white/20 p-3 rounded-full">
                {category.icon}
              </div>
              <span className="font-medium text-sm">{category.title}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
              onClick={() => setSelectedCategory(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md z-50"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`bg-gradient-to-br ${selectedCategory.color} p-3 rounded-full text-white`}>
                      {selectedCategory.icon}
                    </div>
                    <h3 className="text-xl font-elegant text-gray-800">
                      {selectedCategory.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-3">
                  {selectedCategory.suggestions.map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <Heart size={16} className="text-candy-pink mt-1 flex-shrink-0" />
                      <p className="text-gray-700 text-sm md:text-base">
                        {suggestion}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 text-center text-xs text-gray-500 italic"
                >
                  "Sua presença é o melhor presente!"
                </motion.p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}