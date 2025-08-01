'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageWall } from '@/components/message-wall'
import { useToast } from "@/hooks/use-toast"
import { motion } from 'framer-motion'
import Video from '@/components/video'

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
      <section className="relative overflow-hidden">
        {/* Background video */}
        <div className="absolute inset-0 z-0">
          <Video 
            src="https://assets.mixkit.co/videos/preview/mixkit-night-sky-with-stars-rotating-3638-large.mp4"
            className="w-full h-full object-cover"
            autoplay
            loop
            muted
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background"></div>
        </div>
        
        <div className="container mx-auto px-4 pt-32 pb-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary-foreground bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Welcome to Our Platform
            </motion.h1>
            <motion.p 
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              A modern solution for all your needs. Experience the future today with our innovative platform.
            </motion.p>
            <motion.div 
              className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button size="lg" onClick={showToast}>
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Amazing Features
          </motion.h2>
          <motion.p 
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Everything you need in one powerful platform
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Easy to Use</CardTitle>
                <CardDescription>Intuitive interface designed for everyone</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Our platform is designed with simplicity in mind, making it easy for anyone to get started quickly.</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Powerful Tools</CardTitle>
                <CardDescription>Advanced features for professionals</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Access cutting-edge tools and features that help you accomplish more in less time.</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Secure & Reliable</CardTitle>
                <CardDescription>Enterprise-grade security for your peace of mind</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Your data is protected with industry-leading security measures and 99.9% uptime guarantee.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            What Our Users Say
          </motion.h2>
          <motion.p 
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Don't just take our word for it
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[1, 2, 3].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">{item}</span>
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">User {item}</p>
                      <p className="text-sm text-muted-foreground">Company {item}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "This platform has completely transformed how we work. The features are intuitive and powerful."
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Message Wall Section */}
      <MessageWall />

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground">Ready to Get Started?</h2>
          <p className="mt-4 text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Join thousands of satisfied users today and experience the difference.
          </p>
          <Button size="lg" variant="secondary" className="mt-8" onClick={showToast}>
            Create Your Account
          </Button>
        </motion.div>
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







