import { NextRequest, NextResponse } from 'next/server'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || body.willAttend === undefined) {
      return NextResponse.json(
        { error: 'Nome e confirmação são obrigatórios' },
        { status: 400 }
      )
    }

    // Save to Firestore
    const docRef = await addDoc(collection(db, 'rsvps'), {
      name: body.name,
      willAttend: body.willAttend,
      adults: body.willAttend ? (body.adults || 1) : 0, // Sempre pelo menos 1 adulto se confirmou presença
      children: body.willAttend ? (body.children || 0) : 0,
      childrenNames: body.childrenNames || [], // Novo campo para nomes das crianças
      message: body.message || '',
      timestamp: serverTimestamp(),
    })

    return NextResponse.json(
      {
        success: true,
        id: docRef.id,
        message: body.willAttend
          ? 'Presença confirmada com sucesso!'
          : 'Obrigado por nos avisar!'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('RSVP API Error:', error)
    return NextResponse.json(
      { error: 'Erro ao processar confirmação' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}