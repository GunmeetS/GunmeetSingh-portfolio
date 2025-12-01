import { NextResponse } from 'next/server'
import crypto from 'crypto'

const validTokens = new Set()

export async function POST(request) {
  try {
    const { password } = await request.json()

    if (password === process.env.ADMIN_PASSWORD) {
      const token = crypto.randomBytes(32).toString('hex')
      
      validTokens.add(token)
      
      setTimeout(() => {
        validTokens.delete(token)
      }, 24 * 60 * 60 * 1000)

      return NextResponse.json({ 
        success: true,
        token 
      })
    }
    
    return NextResponse.json(
      { error: 'Invalid password' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

export function isValidToken(token) {
  return validTokens.has(token)
}

export function revokeToken(token) {
  validTokens.delete(token)
}
