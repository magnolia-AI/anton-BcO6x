'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/hooks/use-toast'

interface Message {
  id: string
  name: string
  message: string
  timestamp: Date
}

export function MessageWall() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const { toast } = useToast()

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('messageWallMessages')
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
        setMessages(parsedMessages)
      } catch (e) {
        console.error('Failed to parse messages from localStorage', e)
      }
    }
  }, [])

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('messageWallMessages', JSON.stringify(messages))
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim() || !message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter both your name and a message.",
        variant: "destructive"
      })
      return
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [newMessage, ...prev])
    
    // Reset form
    setName('')
    setMessage('')
    
    toast({
      title: "Message Added",
      description: "Your message has been added to the wall!"
    })
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
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Leave your message here..."
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Post Message
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
              {messages.length > 0 ? (
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div key={msg.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold">{msg.name}</h3>
                          <span className="text-xs text-muted-foreground">
                            {msg.timestamp.toLocaleDateString()}
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
