"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CreditCard,
  Wallet,
  IndianRupee,
  Clock,
  MapPin,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Moon,
  Sun,
  Mail,
  ArrowRight,
  Loader2,
  ArrowLeft,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OrderCancellationSystem() {
  const [darkMode, setDarkMode] = useState(false)
  const [predicting, setPredicting] = useState(false)
  const [prediction, setPrediction] = useState<null | boolean>(null)
  const [showEmailNotification, setShowEmailNotification] = useState(false)
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isValid, setIsValid] = useState(true)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    deliveryTime: 30,
    orderValue: 500,
    cancellationHistory: 2,
    distance: 5,
    timeOfOrder: "18",
    paymentMethod: "card",
    addressIssues: false,
    peakHourOrder: false,
    customerEmail: "",
  })

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    if (newMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  // Handle form input changes
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Handle prediction
  const handlePredict = () => {
    setPredicting(true)
    setPrediction(null)

    // Simulate prediction calculation
    setTimeout(() => {
      // Simple algorithm for demo purposes
      const riskScore =
        formData.cancellationHistory * 20 +
        (formData.distance > 10 ? 20 : 0) +
        (formData.addressIssues ? 30 : 0) +
        (formData.peakHourOrder ? 15 : 0) -
        formData.orderValue / 100

      setPrediction(riskScore > 50)
      setPredicting(false)
    }, 2000)
  }

  // Reset form
  const handleClear = () => {
    setFormData({
      deliveryTime: 30,
      orderValue: 500,
      cancellationHistory: 2,
      distance: 5,
      timeOfOrder: "18",
      paymentMethod: "card",
      addressIssues: false,
      peakHourOrder: false,
      customerEmail: "",
    })
    setPrediction(null)
    setShowEmailNotification(false)
  }

  // Show email notification form
  const handleShowEmailForm = () => {
    setShowEmailNotification(true)
    setEmail(formData.customerEmail)
  }

  // Go back to prediction
  const handleBackToPrediction = () => {
    setShowEmailNotification(false)
  }

  // Validate email
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  // Handle email change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setIsValid(true) // Reset validation on change
  }

  // Handle email submission
  const handleSubmitEmail = async (e: React.FormEvent) => {
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
        title: "Cancellation Alert Sent!",
        description: "Order cancellation notification has been sent to " + email,
        variant: "default",
      })

      // Reset and go back to prediction view
      setEmail("")
      setShowEmailNotification(false)
      setPrediction(null)
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
    <div
      className={cn(
        "min-h-screen w-full p-4 md:p-8 transition-colors duration-300",
        darkMode ? "bg-gray-900" : "bg-gray-100",
      )}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header with dark mode toggle */}
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={cn("text-3xl md:text-4xl font-black tracking-tight", darkMode ? "text-white" : "text-gray-900")}
          >
            {showEmailNotification ? "Order Cancellation Alert" : "Order Cancellation Predictor"}
          </motion.h1>

          <Button
            variant="outline"
            size="icon"
            onClick={toggleDarkMode}
            className={cn(
              "rounded-full border-4 transition-all duration-300",
              darkMode
                ? "border-purple-500 bg-gray-800 text-white hover:bg-gray-700"
                : "border-orange-400 bg-white text-gray-900 hover:bg-gray-100",
            )}
          >
            {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {!showEmailNotification ? (
            /* Prediction System */
            <motion.div
              key="prediction-system"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Form Card */}
              <div className="col-span-1 lg:col-span-2 rounded-3xl p-1 bg-gradient-to-br from-purple-500 to-pink-500">
                <div
                  className={cn(
                    "h-full rounded-2xl p-6 md:p-8",
                    "border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
                    "backdrop-blur-xl backdrop-saturate-150",
                    darkMode ? "bg-gray-800/70 text-white" : "bg-white/80 text-gray-900",
                  )}
                >
                  <h2 className="text-2xl font-bold mb-6 border-b-4 border-black pb-2">Order Details</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Delivery Time */}
                    <div className="space-y-2">
                      <Label htmlFor="deliveryTime" className="text-lg font-bold">
                        Delivery Time (minutes)
                      </Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                        <Input
                          id="deliveryTime"
                          type="number"
                          value={formData.deliveryTime}
                          onChange={(e) => handleChange("deliveryTime", Number(e.target.value))}
                          className={cn(
                            "pl-10 h-12 text-lg",
                            "border-3 border-black rounded-xl",
                            "focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50",
                            darkMode ? "bg-gray-700" : "bg-white",
                          )}
                        />
                      </div>
                    </div>

                    {/* Order Value */}
                    <div className="space-y-2">
                      <Label htmlFor="orderValue" className="text-lg font-bold">
                        Order Value (₹)
                      </Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                        <Input
                          id="orderValue"
                          type="number"
                          value={formData.orderValue}
                          onChange={(e) => handleChange("orderValue", Number(e.target.value))}
                          className={cn(
                            "pl-10 h-12 text-lg",
                            "border-3 border-black rounded-xl",
                            "focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50",
                            darkMode ? "bg-gray-700" : "bg-white",
                          )}
                        />
                      </div>
                    </div>

                    {/* Cancellation History */}
                    <div className="space-y-2 md:col-span-2">
                      <div className="flex justify-between">
                        <Label htmlFor="cancellationHistory" className="text-lg font-bold">
                          Cancellation History
                        </Label>
                        <span className="font-mono font-bold text-lg">{formData.cancellationHistory}</span>
                      </div>
                      <Slider
                        id="cancellationHistory"
                        value={[formData.cancellationHistory]}
                        min={0}
                        max={10}
                        step={1}
                        onValueChange={(value) => handleChange("cancellationHistory", value[0])}
                        className={cn("h-6", darkMode ? "bg-gray-700" : "bg-gray-200")}
                      />
                    </div>

                    {/* Distance */}
                    <div className="space-y-2">
                      <Label htmlFor="distance" className="text-lg font-bold">
                        Distance (km)
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                        <Input
                          id="distance"
                          type="number"
                          value={formData.distance}
                          onChange={(e) => handleChange("distance", Number(e.target.value))}
                          className={cn(
                            "pl-10 h-12 text-lg",
                            "border-3 border-black rounded-xl",
                            "focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50",
                            darkMode ? "bg-gray-700" : "bg-white",
                          )}
                        />
                      </div>
                    </div>

                    {/* Time of Order */}
                    <div className="space-y-2">
                      <Label htmlFor="timeOfOrder" className="text-lg font-bold">
                        Time of Order
                      </Label>
                      <Select
                        value={formData.timeOfOrder}
                        onValueChange={(value) => handleChange("timeOfOrder", value)}
                      >
                        <SelectTrigger
                          id="timeOfOrder"
                          className={cn(
                            "h-12 text-lg",
                            "border-3 border-black rounded-xl",
                            "focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50",
                            darkMode ? "bg-gray-700" : "bg-white",
                          )}
                        >
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => (
                            <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                              {i.toString().padStart(2, "0")}:00
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-2">
                      <Label htmlFor="paymentMethod" className="text-lg font-bold">
                        Payment Method
                      </Label>
                      <Select
                        value={formData.paymentMethod}
                        onValueChange={(value) => handleChange("paymentMethod", value)}
                      >
                        <SelectTrigger
                          id="paymentMethod"
                          className={cn(
                            "h-12 text-lg",
                            "border-3 border-black rounded-xl",
                            "focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50",
                            darkMode ? "bg-gray-700" : "bg-white",
                          )}
                        >
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="card">
                            <div className="flex items-center">
                              <CreditCard className="mr-2 h-4 w-4" />
                              Card
                            </div>
                          </SelectItem>
                          <SelectItem value="cash">
                            <div className="flex items-center">
                              <Wallet className="mr-2 h-4 w-4" />
                              Cash
                            </div>
                          </SelectItem>
                          <SelectItem value="upi">
                            <div className="flex items-center">
                              <IndianRupee className="mr-2 h-4 w-4" />
                              UPI
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Customer Email (New Field) */}
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="customerEmail" className="text-lg font-bold">
                        Customer Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                        <Input
                          id="customerEmail"
                          type="email"
                          placeholder="customer@example.com"
                          value={formData.customerEmail}
                          onChange={(e) => handleChange("customerEmail", e.target.value)}
                          className={cn(
                            "pl-10 h-12 text-lg",
                            "border-3 border-black rounded-xl",
                            "focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50",
                            darkMode ? "bg-gray-700" : "bg-white",
                          )}
                        />
                      </div>
                    </div>

                    {/* Address Issues */}
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="addressIssues" className="text-lg font-bold">
                        Address Issues
                      </Label>
                      <Switch
                        id="addressIssues"
                        checked={formData.addressIssues}
                        onCheckedChange={(checked) => handleChange("addressIssues", checked)}
                        className={cn("data-[state=checked]:bg-purple-500", "border-3 border-black h-6 w-12")}
                      />
                    </div>

                    {/* Peak Hour Order */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="peakHourOrder"
                        checked={formData.peakHourOrder}
                        onCheckedChange={(checked) =>
                          handleChange("peakHourOrder", checked === "indeterminate" ? false : checked)
                        }
                        className={cn(
                          "h-6 w-6 rounded-md border-3 border-black",
                          "data-[state=checked]:bg-purple-500",
                          "focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50",
                        )}
                      />
                      <Label htmlFor="peakHourOrder" className="text-lg font-bold">
                        Peak Hour Order
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prediction Result Card */}
              <div className="col-span-1">
                <div className="rounded-3xl p-1 bg-gradient-to-br from-blue-500 to-purple-500">
                  <div
                    className={cn(
                      "h-full rounded-2xl p-6 md:p-8",
                      "border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
                      "backdrop-blur-xl backdrop-saturate-150",
                      darkMode ? "bg-gray-800/70 text-white" : "bg-white/80 text-gray-900",
                    )}
                  >
                    <h2 className="text-2xl font-bold mb-6 border-b-4 border-black pb-2">Prediction Result</h2>

                    <div className="flex flex-col items-center justify-center h-[300px]">
                      <AnimatePresence mode="wait">
                        {predicting ? (
                          <motion.div
                            key="predicting"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="flex flex-col items-center"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                            >
                              <RefreshCw className="h-16 w-16 text-purple-500" />
                            </motion.div>
                            <p className="mt-4 text-xl font-bold">Analyzing order data...</p>
                          </motion.div>
                        ) : prediction === null ? (
                          <motion.div
                            key="waiting"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="text-center"
                          >
                            <p className="text-xl font-bold mb-2">Click "Predict" to analyze</p>
                            <p className="text-gray-500 dark:text-gray-400">
                              Fill in the order details and click the predict button
                            </p>
                          </motion.div>
                        ) : prediction ? (
                          <motion.div
                            key="cancel"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="text-center"
                          >
                            <motion.div
                              animate={{
                                boxShadow: ["0 0 0 0 rgba(239, 68, 68, 0)", "0 0 0 20px rgba(239, 68, 68, 0)"],
                              }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                              className="inline-flex rounded-full bg-red-100 p-4 mb-4"
                            >
                              <AlertTriangle className="h-16 w-16 text-red-500" />
                            </motion.div>
                            <h3 className="text-2xl font-black text-red-500 mb-2">Likely to be Cancelled</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">
                              This order has a high risk of cancellation
                            </p>

                            {/* Send notification button */}
                            <Button
                              onClick={handleShowEmailForm}
                              className={cn(
                                "mt-2",
                                "border-3 border-black rounded-xl",
                                "bg-gradient-to-r from-red-500 to-orange-500",
                                "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                                "hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                                "transition-all duration-150",
                                "text-white",
                              )}
                            >
                              <Mail className="mr-2 h-4 w-4" />
                              Send Cancellation Alert
                            </Button>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="safe"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="text-center"
                          >
                            <motion.div
                              animate={{
                                boxShadow: ["0 0 0 0 rgba(34, 197, 94, 0)", "0 0 0 20px rgba(34, 197, 94, 0)"],
                              }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                              className="inline-flex rounded-full bg-green-100 p-4 mb-4"
                            >
                              <CheckCircle className="h-16 w-16 text-green-500" />
                            </motion.div>
                            <h3 className="text-2xl font-black text-green-500 mb-2">Safe Order</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                              This order has a low risk of cancellation
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* CTA Buttons */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <Button
                        onClick={handlePredict}
                        disabled={predicting}
                        className={cn(
                          "h-14 text-lg font-bold",
                          "border-4 border-black rounded-xl",
                          "bg-gradient-to-r from-purple-500 to-pink-500",
                          "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
                          "hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                          "active:translate-y-2 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                          "transition-all duration-150",
                          "text-white",
                        )}
                      >
                        Predict
                      </Button>

                      <Button
                        onClick={handleClear}
                        variant="outline"
                        className={cn(
                          "h-14 text-lg font-bold",
                          "border-4 border-black rounded-xl",
                          "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
                          "hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                          "active:translate-y-2 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                          "transition-all duration-150",
                          darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900",
                        )}
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Email Notification Form */
            <motion.div
              key="email-notification"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-md mx-auto"
            >
              {/* Back button */}
              <Button onClick={handleBackToPrediction} variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Prediction
              </Button>

              {/* Card with glassmorphism effect */}
              <div className="relative p-1 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500">
                <div className="relative p-6 md:p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] backdrop-blur-xl backdrop-saturate-150 bg-white/80 dark:bg-gray-900/70">
                  {/* Header */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-black tracking-tight border-b-4 border-black pb-2 mb-2">
                      Order Cancellation Alert
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Send a notification email about the cancelled order
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmitEmail} className="space-y-6">
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
                            initial={{ opacity: 0 }}
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

