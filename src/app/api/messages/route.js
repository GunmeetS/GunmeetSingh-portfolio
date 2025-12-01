import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    const { isValidToken } = await import('../admin/login/route')
    
    if (!token || !isValidToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid or missing token' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    // Use select to fetch only needed fields
    const [messages, count] = await Promise.all([
      prisma.contact.findMany({
        take: limit,
        skip: skip,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          company: true,
          position: true,
          message: true,
          createdAt: true,
          // Don't fetch ipAddress and userAgent unless needed
        },
      }),
      prisma.contact.count(),
    ])

    return NextResponse.json({
      messages,
      count,
      page,
      totalPages: Math.ceil(count / limit),
    })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

