'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { X, Baby, Send, Heart } from 'lucide-react'

interface RSVPFormData {
  name: string
  willAttend: boolean
  childrenCount: number
  childrenNames: string[]
  message?: string
}

interface RSVPModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function RSVPModal({ isOpen, onClose }: RSVPModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [willAttend, setWillAttend] = useState<boolean | null>(null)
  const [childrenCount, setChildrenCount] = useState(0)
  const [childrenNames, setChildrenNames] = useState<string[]>([])

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<RSVPFormData>()

  // Update children names array when count changes
  useEffect(() => {
    const newNames = Array(childrenCount).fill('').map((_, index) =>
      childrenNames[index] || ''
    )
    setChildrenNames(newNames)
  }, [childrenCount])

  const onSubmit = async (data: RSVPFormData) => {
    if (willAttend === null) return

    setIsSubmitting(true)

    try {
      const rsvpData = {
        name: data.name,
        willAttend,
        adults: willAttend ? 1 : 0, // Sempre 1 adulto se vai comparecer
        children: willAttend ? childrenCount : 0,
        childrenNames: willAttend && childrenCount > 0 ? childrenNames.filter(name => name.trim() !== '') : [],
        message: data.message || '',
        timestamp: serverTimestamp(),
      }

      await addDoc(collection(db, 'rsvps'), rsvpData)

      setIsSubmitted(true)
      reset()
      setChildrenCount(0)
      setChildrenNames([])

      // Close modal after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setWillAttend(null)
        onClose()
      }, 3000)
    } catch (error) {
      console.error('Error saving RSVP:', error)
      alert('Ocorreu um erro ao enviar sua confirmação. Por favor, tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChildNameChange = (index: number, value: string) => {
    const newNames = [...childrenNames]
    newNames[index] = value
    setChildrenNames(newNames)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
              >
                <X size={20} />
              </button>

              {/* Success Message */}
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="text-6xl mb-4"
                  >
                    🌸
                  </motion.div>
                  <h3 className="text-2xl font-elegant text-candy-pink mb-2">
                    {willAttend ? 'Sua presença iluminará nosso jardim!' : 'Que pena! Sentiremos sua falta!'}
                  </h3>
                  <p className="text-gray-600">
                    {willAttend ? 'Obrigado por confirmar presença!' : 'Obrigado por nos avisar!'}
                  </p>
                </motion.div>
              ) : (
                <div className="p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-magical text-center text-candy-pink mb-2">
                    Confirme Sua Presença
                  </h2>
                  <p className="text-center text-gray-600 mb-6 text-sm">
                    Para o Jardim Encantado da Princesa Catarina
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Seu Nome Completo
                      </label>
                      <input
                        {...register('name', { required: 'Por favor, insira seu nome' })}
                        className="w-full px-4 py-3 rounded-xl border border-candy-pink/30 focus:outline-none focus:ring-2 focus:ring-candy-pink/50 transition-all"
                        placeholder="Digite seu nome"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Attendance Selection */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Você poderá comparecer?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setWillAttend(true)}
                          className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                            willAttend === true
                              ? 'bg-gradient-to-r from-candy-pink to-candy-lilac text-white border-candy-pink shadow-lg'
                              : 'bg-white border-gray-300 hover:border-candy-pink'
                          }`}
                        >
                          <Heart size={24} />
                          <span className="font-medium">Sim, estarei lá!</span>
                        </motion.button>

                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setWillAttend(false)}
                          className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                            willAttend === false
                              ? 'bg-gray-500 text-white border-gray-500 shadow-lg'
                              : 'bg-white border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <X size={24} />
                          <span className="font-medium">Não poderei ir</span>
                        </motion.button>
                      </div>
                    </div>

                    {/* Children Count - Only show if attending */}
                    <AnimatePresence>
                      {willAttend === true && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          {/* Children Count */}
                          <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                              <Baby size={16} />
                              Quantas crianças? (opcional)
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="10"
                              value={childrenCount}
                              onChange={(e) => setChildrenCount(parseInt(e.target.value) || 0)}
                              className="w-full px-4 py-3 rounded-xl border border-candy-pink/30 focus:outline-none focus:ring-2 focus:ring-candy-pink/50"
                              placeholder="0"
                            />
                          </div>

                          {/* Children Names Fields */}
                          {childrenCount > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="space-y-3"
                            >
                              <p className="text-sm font-medium text-gray-700">
                                Nome{childrenCount > 1 ? 's' : ''} da{childrenCount > 1 ? 's' : ''} criança{childrenCount > 1 ? 's' : ''}:
                              </p>
                              {Array.from({ length: childrenCount }).map((_, index) => (
                                <motion.input
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  type="text"
                                  value={childrenNames[index] || ''}
                                  onChange={(e) => handleChildNameChange(index, e.target.value)}
                                  className="w-full px-4 py-2 rounded-xl border border-candy-pink/30 focus:outline-none focus:ring-2 focus:ring-candy-pink/50"
                                  placeholder={`Nome da ${index + 1}ª criança`}
                                />
                              ))}
                            </motion.div>
                          )}

                          {/* Message */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Mensagem para a Catarina (opcional)
                            </label>
                            <textarea
                              {...register('message')}
                              rows={3}
                              className="w-full px-4 py-3 rounded-xl border border-candy-pink/30 focus:outline-none focus:ring-2 focus:ring-candy-pink/50 resize-none"
                              placeholder="Deixe uma mensagem carinhosa..."
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    {willAttend !== null && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-candy-pink to-candy-lilac text-white font-medium py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send size={20} />
                            <span>Enviar Confirmação</span>
                          </>
                        )}
                      </motion.button>
                    )}
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}