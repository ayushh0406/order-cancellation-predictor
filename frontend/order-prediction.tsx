"use client"

import { useState, useEffect } from "react"
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
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OrderCancellationPredictor() {
  const [darkMode, setDarkMode] = useState(false)
  const [predicting, setPredicting] = useState(false)
  const [prediction, setPrediction] = useState<null | boolean>(null)
  const [formData, setFormData] = useState({
    deliveryTime: 30,
    orderValue: 500,
    cancellationHistory: 2,
    distance: 5,
    timeOfOrder: "18",
    paymentMethod: "card",
    addressIssues: false,
    peakHourOrder: false,
  })

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

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
    })
    setPrediction(null)
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
            Order Cancellation Predictor
          </motion.h1>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
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

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Card */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={cn("col-span-1 lg:col-span-2 rounded-3xl p-1", "bg-gradient-to-br from-purple-500 to-pink-500")}
          >
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
                  <Select value={formData.timeOfOrder} onValueChange={(value) => handleChange("timeOfOrder", value)}>
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
          </motion.div>

          {/* Prediction Result Card */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="col-span-1"
          >
            <div className={cn("rounded-3xl p-1", "bg-gradient-to-br from-blue-500 to-purple-500")}>
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
                        <p className="text-gray-500 dark:text-gray-400">This order has a high risk of cancellation</p>
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
                        <p className="text-gray-500 dark:text-gray-400">This order has a low risk of cancellation</p>
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
          </motion.div>
        </div>
      </div>
    </div>
  )
}

3