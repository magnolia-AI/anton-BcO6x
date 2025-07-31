import { NextResponse } from 'next/server'
import { messages } from '@/lib/schema'
import { db } from '@/lib/db'
import { desc } from 'drizzle-orm'
import { z } from 'zod'

const messageSchema = z.object({
  name: z.string().min(1).max(255),
  message: z.string().min(1)
})

export async function GET() {
  try {
    const fetchedMessages = await db.select().from(messages).orderBy(desc(messages.createdAt))
    return NextResponse.json(fetchedMessages)
  } catch (error) {
    console.error('Failed to fetch messages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = messageSchema.safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Invalid input data', details: validatedData.error.flatten() },
        { status: 400 }
      )
    }

    const newMessage = await db.insert(messages).values({
      name: validatedData.data.name,
      message: validatedData.data.message
    }).returning()
    return NextResponse.json(newMessage[0])
  } catch (error) {
    console.error('Failed to add message:', error)
    return NextResponse.json(
      { error: 'Failed to add message' },
      { status: 500 }
    )
  }
}

