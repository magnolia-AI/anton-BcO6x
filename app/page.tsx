'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageWall } from '@/components/message-wall'
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const { toast } = useToast()
  
  const showToast = () => {
    toast({
      title: "Welcome!",
      description: "Thanks for checking out our landing page.",
    })
  }

  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary-foreground bg-clip-text text-transparent">
            Welcome to Our Platform
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern solution for all your needs. Experience the future today with our innovative platform.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" onClick={showToast}>
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Amazing Features</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need in one powerful platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Easy to Use</CardTitle>
              <CardDescription>Intuitive interface designed for everyone</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our platform is designed with simplicity in mind, making it easy for anyone to get started quickly.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Powerful Tools</CardTitle>
              <CardDescription>Advanced features for professionals</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Access cutting-edge tools and features that help you accomplish more in less time.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Secure & Reliable</CardTitle>
              <CardDescription>Enterprise-grade security for your peace of mind</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Your data is protected with industry-leading security measures and 99.9% uptime guarantee.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Message Wall Section */}
      <MessageWall />

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground">Ready to Get Started?</h2>
          <p className="mt-4 text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Join thousands of satisfied users today and experience the difference.
          </p>
          <Button size="lg" variant="secondary" className="mt-8" onClick={showToast}>
            Create Your Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Our Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}


