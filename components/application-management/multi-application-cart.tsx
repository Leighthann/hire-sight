"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ShoppingCart, X, Building, MapPin, DollarSign, Send, Loader2, CheckCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for cart items
const mockCartItems = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "Remote",
    salary: "$120,000 - $150,000",
    matchScore: 95,
    coverLetter: "",
    selected: true,
    deadline: "2023-12-15",
  },
  {
    id: "3",
    title: "Full Stack Developer",
    company: "InnovateTech",
    location: "New York, NY",
    salary: "$130,000 - $160,000",
    matchScore: 82,
    coverLetter: "",
    selected: true,
    deadline: "2023-12-20",
  },
  {
    id: "5",
    title: "React Native Developer",
    company: "MobileApps Inc.",
    location: "Remote",
    salary: "$110,000 - $140,000",
    matchScore: 75,
    coverLetter: "",
    selected: true,
    deadline: "2023-12-10",
  },
]

export function MultiApplicationCart() {
  const [cartItems, setCartItems] = useState(mockCartItems)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const handleRemoveItem = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId))

    toast({
      title: "Removed from cart",
      description: "The job has been removed from your application cart.",
    })
  }

  const handleSelectItem = (itemId: string, selected: boolean) => {
    setCartItems(cartItems.map((item) => (item.id === itemId ? { ...item, selected } : item)))
  }

  const handleCoverLetterChange = (itemId: string, text: string) => {
    setCartItems(cartItems.map((item) => (item.id === itemId ? { ...item, coverLetter: text } : item)))
  }

  const handleSelectAll = (selected: boolean) => {
    setCartItems(cartItems.map((item) => ({ ...item, selected })))
  }

  const handleApplyAll = async () => {
    const selectedItems = cartItems.filter((item) => item.selected)

    if (selectedItems.length === 0) {
      toast({
        title: "No jobs selected",
        description: "Please select at least one job to apply.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsSuccess(true)

      toast({
        title: "Applications submitted successfully",
        description: `You've applied to ${selectedItems.length} job${selectedItems.length > 1 ? "s" : ""}.`,
      })

      // Reset after showing success state
      setTimeout(() => {
        setCartItems([])
        setIsSuccess(false)
      }, 3000)
    } catch (error) {
      toast({
        title: "Application failed",
        description: "There was an error submitting your applications. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calculate days remaining until deadline
  const getDaysRemaining = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5 text-blue-400" />
                <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                  Application Cart
                </CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-blue-950/30 text-blue-300 border-blue-800">
                  {cartItems.length} job{cartItems.length !== 1 && "s"}
                </Badge>
              </div>
            </div>
            <CardDescription className="text-gray-400">
              Apply to multiple jobs at once with personalized applications
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-gray-800 p-3">
                  <ShoppingCart className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-white">Your cart is empty</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Add jobs to your cart to apply to multiple positions at once.
                </p>
                <Button
                  className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  asChild
                >
                  <a href="/candidate/jobs">Browse Jobs</a>
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="selectAll"
                      checked={cartItems.every((item) => item.selected)}
                      onCheckedChange={(checked) => handleSelectAll(!!checked)}
                    />
                    <Label htmlFor="selectAll" className="text-sm text-gray-300">
                      Select All
                    </Label>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCartItems([])}
                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                  >
                    Clear All
                  </Button>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const daysRemaining = getDaysRemaining(item.deadline)
                    return (
                      <div
                        key={item.id}
                        className={cn(
                          "rounded-lg border bg-gray-800/30 overflow-hidden transition-all duration-200",
                          item.selected ? "border-blue-800/50" : "border-gray-700",
                          item.selected && "shadow-[0_0_15px_rgba(59,130,246,0.1)]",
                        )}
                      >
                        <div className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <Checkbox
                                id={`select-${item.id}`}
                                checked={item.selected}
                                onCheckedChange={(checked) => handleSelectItem(item.id, !!checked)}
                                className="mt-1"
                              />
                              <div>
                                <h3 className="font-medium text-white">{item.title}</h3>
                                <div className="flex flex-wrap gap-2 text-sm mt-1">
                                  <div className="flex items-center text-gray-400">
                                    <Building className="mr-1 h-3.5 w-3.5 text-gray-500" />
                                    {item.company}
                                  </div>
                                  <div className="flex items-center text-gray-400">
                                    <MapPin className="mr-1 h-3.5 w-3.5 text-gray-500" />
                                    {item.location}
                                  </div>
                                  <div className="flex items-center text-gray-400">
                                    <DollarSign className="mr-1 h-3.5 w-3.5 text-gray-500" />
                                    {item.salary}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center text-sm text-gray-400">
                                    <Clock className="mr-1 h-3.5 w-3.5" />
                                    <span
                                      className={cn(
                                        daysRemaining <= 3
                                          ? "text-red-400"
                                          : daysRemaining <= 7
                                            ? "text-amber-400"
                                            : "text-gray-400",
                                      )}
                                    >
                                      {daysRemaining} days
                                    </span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Application deadline: {new Date(item.deadline).toLocaleDateString()}</p>
                                </TooltipContent>
                              </Tooltip>

                              <div
                                className={cn(
                                  "text-sm font-medium px-2 py-1 rounded-full",
                                  item.matchScore >= 90
                                    ? "bg-green-900/30 text-green-400"
                                    : item.matchScore >= 80
                                      ? "bg-blue-900/30 text-blue-400"
                                      : "bg-amber-900/30 text-amber-400",
                                )}
                              >
                                {item.matchScore}% Match
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveItem(item.id)}
                                className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="mt-4 space-y-2">
                            <Label htmlFor={`cover-letter-${item.id}`} className="text-sm text-gray-300">
                              Cover Letter / Note (Optional)
                            </Label>
                            <Textarea
                              id={`cover-letter-${item.id}`}
                              placeholder="Add a personalized message for this application..."
                              value={item.coverLetter}
                              onChange={(e) => handleCoverLetterChange(item.id, e.target.value)}
                              className="h-24 bg-gray-900 border-gray-700 text-white resize-none focus:border-blue-700 focus:ring-blue-700/20"
                              disabled={!item.selected}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </CardContent>

          {cartItems.length > 0 && (
            <CardFooter className="flex justify-between border-t border-gray-800 pt-6">
              <Button
                variant="outline"
                onClick={() => setCartItems([])}
                disabled={isSubmitting || isSuccess}
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Clear Cart
              </Button>

              <Button
                onClick={handleApplyAll}
                disabled={isSubmitting || isSuccess || !cartItems.some((item) => item.selected)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Applied Successfully
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Apply to {cartItems.filter((item) => item.selected).length} Job
                    {cartItems.filter((item) => item.selected).length !== 1 && "s"}
                  </>
                )}
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </TooltipProvider>
  )
}

