'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/hooks/use-toast'
import { Message, NewMessage } from '@/lib/schema'
import db from '@/lib/db'
import { desc } from 'drizzle-orm'
import { messages } from '@/lib/schema'

interface MessageWithId extends Message {
  id: number;
}

export function MessageWall() {
  const [name, setName] = useState('')
  const [messageText, setMessageText] = useState('')
  const [messagesList, setMessagesList] = useState<MessageWithId[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const fetchMessages = useCallback(async () => {
    try {
      const fetchedMessages = await db.select().from(messages).orderBy(desc(messages.createdAt))
      setMessagesList(fetchedMessages as MessageWithId[])
    } catch (error) {
      console.error('Failed to fetch messages:', error)
      toast({
        title: "Error",
        description: "Failed to load messages.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  // Load messages from database on component mount
  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim() || !messageText.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter both your name and a message.",
        variant: "destructive"
      })
      return
    }

    try {
      // Insert new message into database
      const newMessage: NewMessage = {
        name: name.trim(),
        message: messageText.trim(),
      }

      const result = await db.insert(messages).values(newMessage).returning()
      
      // Add new message to the top of the list
      setMessagesList(prev => [result[0] as MessageWithId, ...prev])
      
      // Reset form
      setName('')
      setMessageText('')
      
      toast({
        title: "Message Added",
        description: "Your message has been added to the wall!"
      })
    } catch (error) {
      console.error('Failed to add message:', error)
      toast({
        title: "Error",
        description: "Failed to add your message. Please try again.",
        variant: "destructive"
      })
    }
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Message Wall</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Leave a message for other visitors to see
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Message Form */}
          <Card>
            <CardHeader>
              <CardTitle>Leave a Message</CardTitle>
              <CardDescription>Share your thoughts with our community</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Leave your message here..."
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Posting..." : "Post Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Messages Display */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>See what others have shared</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Loading messages...</p>
                </div>
              ) : messagesList.length > 0 ? (
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {messagesList.map((msg) => (
                      <div key={msg.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold">{msg.name}</h3>
                          <span className="text-xs text-muted-foreground">
                            {msg.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="mt-2 text-sm">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No messages yet. Be the first to leave a message!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}




