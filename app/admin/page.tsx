'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'
import { motion } from 'framer-motion'
import { Users, UserCheck, UserX, Baby, LogOut, RefreshCw, Download } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface RSVP {
  id: string
  name: string
  willAttend: boolean
  adults: number
  children: number
  childrenNames?: string[]
  message?: string
  timestamp: any
}

export default function AdminPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [stats, setStats] = useState({
    totalConfirmed: 0,
    totalAdults: 0,
    totalChildren: 0,
    totalDeclined: 0,
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return

    // Real-time listener for RSVPs
    const q = query(collection(db, 'rsvps'), orderBy('timestamp', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rsvpData: RSVP[] = []
      let confirmedCount = 0
      let adultsCount = 0
      let childrenCount = 0
      let declinedCount = 0

      snapshot.forEach((doc) => {
        const data = doc.data()
        rsvpData.push({
          id: doc.id,
          ...data,
        } as RSVP)

        if (data.willAttend) {
          confirmedCount++
          adultsCount += data.adults || 0
          childrenCount += data.children || 0
        } else {
          declinedCount++
        }
      })

      setRsvps(rsvpData)
      setStats({
        totalConfirmed: confirmedCount,
        totalAdults: adultsCount,
        totalChildren: childrenCount,
        totalDeclined: declinedCount,
      })
    })

    return () => unsubscribe()
  }, [user])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const exportToCSV = () => {
    const headers = ['Nome', 'Confirmou', 'Adultos', 'Crianças', 'Nomes das Crianças', 'Mensagem', 'Data']
    const rows = rsvps.map(rsvp => [
      rsvp.name,
      rsvp.willAttend ? 'Sim' : 'Não',
      rsvp.adults || 0,
      rsvp.children || 0,
      rsvp.childrenNames && rsvp.childrenNames.length > 0 ? rsvp.childrenNames.join(', ') : '',
      rsvp.message || '',
      rsvp.timestamp ? format(rsvp.timestamp.toDate(), 'dd/MM/yyyy HH:mm', { locale: ptBR }) : ''
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `rsvps-catarina-${format(new Date(), 'yyyy-MM-dd')}.csv`
    link.click()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pastel-pink to-pastel-blue">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-candy-pink border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink via-pastel-lilac to-pastel-blue">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-magical text-candy-pink">
              Painel Administrativo
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="p-2 text-gray-600 hover:text-candy-pink transition-colors"
                title="Atualizar"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={exportToCSV}
                className="p-2 text-gray-600 hover:text-candy-blue transition-colors"
                title="Exportar CSV"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <UserCheck className="w-8 h-8 text-green-500" />
              <span className="text-3xl font-bold text-gray-800">
                {stats.totalAdults + stats.totalChildren}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Total Confirmados</h3>
            <p className="text-xs text-gray-500 mt-1">Adultos + Crianças</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-candy-pink" />
              <span className="text-3xl font-bold text-gray-800">
                {stats.totalAdults}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Total de Adultos</h3>
            <p className="text-xs text-gray-500 mt-1">Confirmados</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Baby className="w-8 h-8 text-candy-blue" />
              <span className="text-3xl font-bold text-gray-800">
                {stats.totalChildren}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Total de Crianças</h3>
            <p className="text-xs text-gray-500 mt-1">Confirmadas</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <UserX className="w-8 h-8 text-red-500" />
              <span className="text-3xl font-bold text-gray-800">
                {stats.totalDeclined}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Não Poderão Ir</h3>
            <p className="text-xs text-gray-500 mt-1">Respostas negativas</p>
          </motion.div>
        </div>

        {/* Tables */}
        <div className="space-y-8">
          {/* Confirmed Guests */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-green-600">
              <h2 className="text-xl font-bold text-white">Convidados Confirmados</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Adultos
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Crianças
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nomes das Crianças
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mensagem
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {rsvps
                    .filter(rsvp => rsvp.willAttend)
                    .map((rsvp) => (
                      <tr key={rsvp.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                          {rsvp.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 text-center">
                          {rsvp.adults || 0}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 text-center">
                          {rsvp.children || 0}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs break-words">
                          {rsvp.childrenNames && rsvp.childrenNames.length > 0
                            ? rsvp.childrenNames.join(', ')
                            : '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-md break-words whitespace-pre-wrap">
                          {rsvp.message || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {rsvp.timestamp
                            ? format(rsvp.timestamp.toDate(), 'dd/MM/yy HH:mm', { locale: ptBR })
                            : '-'}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {rsvps.filter(r => r.willAttend).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Nenhuma confirmação ainda
                </div>
              )}
            </div>
          </motion.div>

          {/* Declined Guests */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="px-6 py-4 bg-gradient-to-r from-red-500 to-red-600">
              <h2 className="text-xl font-bold text-white">Não Poderão Comparecer</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data da Resposta
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {rsvps
                    .filter(rsvp => !rsvp.willAttend)
                    .map((rsvp) => (
                      <tr key={rsvp.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                          {rsvp.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {rsvp.timestamp
                            ? format(rsvp.timestamp.toDate(), 'dd/MM/yyyy HH:mm', { locale: ptBR })
                            : '-'}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {rsvps.filter(r => !r.willAttend).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Nenhuma recusa ainda
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}