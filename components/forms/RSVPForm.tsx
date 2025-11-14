'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Check, X, Users, Baby, Send } from 'lucide-react'

interface RSVPFormData {
  name: string
  willAttend: boolean
  adults?: number
  children?: number
  message?: string
}

export default function RSVPForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [willAttend, setWillAttend] = useState<boolean | null>(null)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<RSVPFormData>()

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true)

    try {
      await addDoc(collection(db, 'rsvps'), {
        ...data,
        willAttend,
        adults: willAttend ? (data.adults || 0) : 0,
        children: willAttend ? (data.children || 0) : 0,
        timestamp: serverTimestamp(),
      })

      setIsSubmitted(true)
      reset()

      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setWillAttend(null)
      }, 5000)
    } catch (error) {
      console.error('Error saving RSVP:', error)
      alert('Ocorreu um erro ao enviar sua confirmação. Por favor, tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl"
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
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 max-w-lg mx-auto"
    >
      <h2 className="text-2xl md:text-3xl font-magical text-center text-candy-pink mb-6">
        Confirme Sua Presença
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setWillAttend(true)}
              className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                willAttend === true
                  ? 'bg-candy-pink text-white border-candy-pink'
                  : 'bg-white border-gray-300 hover:border-candy-pink'
              }`}
            >
              <Check size={20} />
              <span className="font-medium">Sim, estarei lá!</span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setWillAttend(false)}
              className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                willAttend === false
                  ? 'bg-gray-500 text-white border-gray-500'
                  : 'bg-white border-gray-300 hover:border-gray-400'
              }`}
            >
              <X size={20} />
              <span className="font-medium">Não poderei ir</span>
            </motion.button>
          </div>
        </div>

        {/* Guest Count - Only show if attending */}
        <AnimatePresence>
          {willAttend === true && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Users size={16} />
                    Adultos (incluindo você)
                  </label>
                  <input
                    {...register('adults', {
                      min: { value: 1, message: 'Mínimo 1 adulto' },
                      max: { value: 10, message: 'Máximo 10 adultos' }
                    })}
                    type="number"
                    min="1"
                    max="10"
                    defaultValue="1"
                    className="w-full px-4 py-3 rounded-xl border border-candy-pink/30 focus:outline-none focus:ring-2 focus:ring-candy-pink/50"
                  />
                  {errors.adults && (
                    <p className="text-red-500 text-xs mt-1">{errors.adults.message}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Baby size={16} />
                    Crianças
                  </label>
                  <input
                    {...register('children', {
                      min: { value: 0, message: 'Mínimo 0' },
                      max: { value: 10, message: 'Máximo 10 crianças' }
                    })}
                    type="number"
                    min="0"
                    max="10"
                    defaultValue="0"
                    className="w-full px-4 py-3 rounded-xl border border-candy-pink/30 focus:outline-none focus:ring-2 focus:ring-candy-pink/50"
                  />
                  {errors.children && (
                    <p className="text-red-500 text-xs mt-1">{errors.children.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem (opcional)
                </label>
                <textarea
                  {...register('message')}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-candy-pink/30 focus:outline-none focus:ring-2 focus:ring-candy-pink/50 resize-none"
                  placeholder="Deixe uma mensagem carinhosa para a Catarina..."
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
    </motion.div>
  )
}