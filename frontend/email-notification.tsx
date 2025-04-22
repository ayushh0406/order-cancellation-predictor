"use client"

import type React from "react"

import { useState } from "react"
import { Mail, ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function EmailNotification() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [isValid, setIsValid] = useState(true)

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setIsValid(true) // Reset validation on change
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate email
    if (!validateEmail(email)) {
      setIsValid(false)
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate successful API response
      toast({
        title: "Email Sent Successfully!",
        description: "Order cancellation notification has been sent to " + email,
        variant: "default",
      })

      setEmail("")
    } catch (error) {
      // Handle error
      toast({
        title: "Failed to Send Email",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[400px] p-4 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-950/30 dark:to-blue-950/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card with glassmorphism effect */}
        <div className="relative p-1 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500">
          <div className="relative p-6 md:p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] backdrop-blur-xl backdrop-saturate-150 bg-white/80 dark:bg-gray-900/70">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-black tracking-tight border-b-4 border-black pb-2 mb-2">
                Order Cancellation Alert
              </h2>
              <p className="text-gray-600 dark:text-gray-300">Send a notification email about the cancelled order</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-lg font-bold block">
                  Recipient Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="customer@example.com"
                    value={email}
                    onChange={handleEmailChange}
                    className={`pl-10 h-12 text-lg border-3 border-black rounded-xl focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50 ${
                      !isValid ? "border-red-500 focus:ring-red-300" : ""
                    }`}
                  />
                </div>
                {!isValid && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm font-medium mt-1"
                  >
                    Please enter a valid email address
                  </motion.p>
                )}
              </div>

              {/* Send Button with 3D Neobrutalist style */}
              <Button
                type="submit"
                disabled={isLoading || email.length === 0}
                className="w-full h-14 text-lg font-bold border-4 border-black rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-2 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 text-white"
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}                      import { sendEmail } from '../utils/emailService';
                      
                      // In your function/route handler
                      await sendEmail('recipient@example.com');
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center"
                    >
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </motion.div>
                  ) : (
                    <motion.div
                      key="send"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center"
                    >
                      Send Email
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>

              {/* Additional information */}
              <div className="pt-4 border-t-2 border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  The customer will receive details about their cancelled order and refund information.
                </p>
              </div>
            </form>

            {/* Decorative elements */}
            <div className="absolute -top-3 -right-3 h-6 w-6 rounded-full bg-purple-500 border-2 border-black"></div>
            <div className="absolute -bottom-3 -left-3 h-6 w-6 rounded-full bg-pink-500 border-2 border-black"></div>
          </div>
        </div>

        {/* Example toast notifications (for demonstration) */}
        <div className="mt-8 space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center p-4 rounded-xl border-3 border-black bg-green-100 dark:bg-green-900/30 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <div>
              <h4 className="font-bold">Success Toast Example</h4>
              <p className="text-sm">Email sent successfully!</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center p-4 rounded-xl border-3 border-black bg-red-100 dark:bg-red-900/30 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <div>
              <h4 className="font-bold">Error Toast Example</h4>
              <p className="text-sm">Failed to send email. Try again.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

