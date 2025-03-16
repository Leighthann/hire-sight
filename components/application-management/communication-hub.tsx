"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  MessageSquare,
  Send,
  Paperclip,
  CheckCheck,
  Search,
  MoreHorizontal,
  FileText,
  Loader2,
  Plus,
  Smile,
  Image,
  Calendar,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for conversations
const mockConversations = [
  {
    id: "conv-1",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    companyLogo: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for your interest in the position. We'd like to schedule an initial phone interview.",
    lastMessageTime: "2023-11-28T14:30:00",
    unread: true,
    status: "active",
    messages: [
      {
        id: "msg-1",
        sender: "recruiter",
        senderName: "Sarah Johnson",
        senderAvatar: "/placeholder.svg?height=40&width=40",
        content:
          "Hi there! Thanks for applying to the Senior Frontend Developer position at TechCorp Inc. We were impressed with your resume and would like to schedule an initial phone interview to discuss your experience and the role in more detail.",
        timestamp: "2023-11-28T14:30:00",
        read: false,
      },
    ],
  },
  {
    id: "conv-2",
    jobTitle: "Full Stack Engineer",
    company: "InnovateTech",
    companyLogo: "/placeholder.svg?height=40&width=40",
    lastMessage: "Your technical assessment results were impressive. Let's schedule a follow-up interview.",
    lastMessageTime: "2023-11-25T10:15:00",
    unread: false,
    status: "active",
    messages: [
      {
        id: "msg-2",
        sender: "recruiter",
        senderName: "Michael Chen",
        senderAvatar: "/placeholder.svg?height=40&width=40",
        content: "Hello! Thank you for applying to the Full Stack Engineer position at InnovateTech.",
        timestamp: "2023-11-20T09:45:00",
        read: true,
      },
      {
        id: "msg-3",
        sender: "you",
        content:
          "Hi Michael, thank you for considering my application. I'm very interested in the position and look forward to discussing it further.",
        timestamp: "2023-11-20T10:30:00",
        read: true,
      },
      {
        id: "msg-4",
        sender: "recruiter",
        senderName: "Michael Chen",
        senderAvatar: "/placeholder.svg?height=40&width=40",
        content:
          "Great! We'd like you to complete a technical assessment as the next step. I've just sent the details to your email. Please complete it within the next 3 days.",
        timestamp: "2023-11-21T11:20:00",
        read: true,
      },
      {
        id: "msg-5",
        sender: "you",
        content: "I've received the assessment and will complete it by tomorrow. Thanks!",
        timestamp: "2023-11-21T14:05:00",
        read: true,
      },
      {
        id: "msg-6",
        sender: "recruiter",
        senderName: "Michael Chen",
        senderAvatar: "/placeholder.svg?height=40&width=40",
        content:
          "Your technical assessment results were impressive. Let's schedule a follow-up interview with our engineering team. Are you available next week?",
        timestamp: "2023-11-25T10:15:00",
        read: true,
        attachment: {
          type: "calendar",
          name: "Interview Invitation",
          url: "#",
        },
      },
    ],
  },
  {
    id: "conv-3",
    jobTitle: "UX/UI Designer",
    company: "DesignHub Co.",
    companyLogo: "/placeholder.svg?height=40&width=40",
    lastMessage: "We've reviewed your portfolio and would like to invite you for an interview.",
    lastMessageTime: "2023-11-15T16:20:00",
    unread: false,
    status: "archived",
    messages: [
      {
        id: "msg-7",
        sender: "recruiter",
        senderName: "Emma Rodriguez",
        senderAvatar: "/placeholder.svg?height=40&width=40",
        content: "We've reviewed your portfolio and would like to invite you for an interview.",
        timestamp: "2023-11-15T16:20:00",
        read: true,
      },
    ],
  },
]

// Mock data for message templates
const mockTemplates = [
  {
    id: "template-1",
    title: "Follow-up after application",
    content:
      "I wanted to follow up on my application for the [Position] role. I'm very interested in the opportunity and would appreciate any updates on my application status.",
  },
  {
    id: "template-2",
    title: "Thank you after interview",
    content:
      "Thank you for taking the time to interview me for the [Position] position. I enjoyed our conversation and am excited about the possibility of joining your team.",
  },
  {
    id: "template-3",
    title: "Request for feedback",
    content:
      "I appreciate your consideration for the [Position] role. If possible, I would value any feedback on my application or interview to help me improve for future opportunities.",
  },
]

export function CommunicationHub() {
  const [conversations, setConversations] = useState(mockConversations)
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [messageText, setMessageText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Get active conversation data
  const currentConversation = conversations.find((conv) => conv.id === activeConversation)

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    (conv) =>
      conv.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.company.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Scroll to bottom of messages when conversation changes or new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [activeConversation, conversations])

  // Mark conversation as read when opened
  useEffect(() => {
    if (activeConversation) {
      setConversations(
        conversations.map((conv) =>
          conv.id === activeConversation
            ? {
                ...conv,
                unread: false,
                messages: conv.messages.map((msg) => ({ ...msg, read: true })),
              }
            : conv,
        ),
      )
    }
  }, [activeConversation])

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (diffDays === 1) {
      return "Yesterday"
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: "short" })
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
  }

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!messageText.trim() || !activeConversation) return
    
    setIsLoading(true)
    
    try {
      // Create new message
      const newMessage = {
        id: `msg-${Date.now()}`,
        sender: "you",
        content: messageText.trim(),
        timestamp: new Date().toISOString(),
        read: true
      }
      
      // Update conversations
      setConversations(conversations.map(conv => 
        conv.id === activeConversation
          ? {
              ...conv,
              lastMessage: messageText.trim(),
              lastMessageTime: new Date().toISOString(),
              messages: [...conv.messages, newMessage]
            }
          : conv
      ))
      
      // Clear message input
      setMessageText("")
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate recruiter response after 2 seconds
      setTimeout(() => {
        const responseMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: "recruiter",
          senderName: currentConversation?.messages[0].senderName || "Recruiter",
          senderAvatar: currentConversation?.messages[0].senderAvatar || "/placeholder.svg?height=40&width=40",
          content: "Thanks for your message! I'll get back to you soon.",
          timestamp: new Date().toISOString(),
          read: true
        }
        
        setConversations(conversations.map(conv => 
          conv.id === activeConversation
            ? {
                ...conv,
                lastMessage: responseMessage.content,
                lastMessageTime: responseMessage.timestamp,
                messages: [...conv.messages, newMessage, responseMessage]
              }
            : conv
        ))\
      }, 2000)  newMessage, responseMessage]
              }
            : conv
        ))
      }, 2000)
}
finally
{
  setIsLoading(false)
}
}

// Handle inserting a template
const handleInsertTemplate = (templateContent: string) => {
  setMessageText(templateContent.replace("[Position]", currentConversation?.jobTitle || "position"))
}

// Handle file upload
const handleFileUpload = () => {
  // This would typically open a file picker and handle the upload
  console.log("File upload clicked")
}

return (
    <TooltipProvider>
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                  Communication Hub
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage all your application communications in one place
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
              {/* Conversations List */}
              <div className="border-r border-gray-800">
                <div className="p-4">
                  <div className="relative mb-4">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search conversations..."
                      className="pl-9 bg-gray-800/50 border-gray-700 text-white focus:border-blue-700 focus:ring-blue-700/20"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <Tabs defaultValue="active" className="w-full">
                      <TabsList className="bg-gray-800/50 border border-gray-700 w-full">
                        <TabsTrigger
                          value="active"
                          className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-indigo-500/20 data-[state=active]:text-white"
                        >
                          Active
                        </TabsTrigger>
                        <TabsTrigger
                          value="archived"
                          className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-indigo-500/20 data-[state=active]:text-white"
                        >
                          Archived
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
                
                <ScrollArea className="h-[calc(600px-120px)]">
                  <div className="px-2">
                    {filteredConversations.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <MessageSquare className="h-8 w-8 text-gray-500 mb-2" />
                        <p className="text-sm text-gray-400">No conversations found</p>
                      </div>
                    ) : (
                      filteredConversations.map((conv) => (
                        <div
                          key={conv.id}
                          className={cn(
                            "p-3 rounded-lg mb-2 cursor-pointer transition-colors",
                            activeConversation === conv.id
                              ? "bg-blue-900/20 border border-blue-700"
                              : "hover:bg-gray-800/70 border border-transparent",
                            conv.unread && "bg-gray-800/50"
                          )}
                          onClick={() => setActiveConversation(conv.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <Avatar className="h-10 w-10 rounded-md border border-gray-700">
                              <AvatarImage src={conv.companyLogo} alt={conv.company} />
                              <AvatarFallback className="rounded-md bg-gray-800 text-gray-400">
                                {conv.company.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <h3 className={cn(
                                  "font-medium truncate",
                                  conv.unread ? "text-white" : "text-gray-300"
                                )}>
                                  {conv.jobTitle}
                                </h3>
                                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                  {formatTimestamp(conv.lastMessageTime)}
                                </span>
                              </div>
                              <p className="text-sm text-gray-400 truncate">{conv.company}</p>
                              <p className={cn(
                                "text-sm truncate mt-1",
                                conv.unread ? "text-white font-medium" : "text-gray-400"
                              )}>
                                {conv.lastMessage}
                              </p>
                            </div>
                          </div>
                          {conv.unread && (
                            <div className="flex justify-end mt-1">
                              <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>
              
              {/* Conversation Detail */}
              <div className="col-span-2 flex flex-col h-full">
                {activeConversation && currentConversation ? (
                  <>
                    {/* Conversation Header */}
                    <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 rounded-md border border-gray-700">
                          <AvatarImage src={currentConversation.companyLogo} alt={currentConversation.company} />
                          <AvatarFallback className="rounded-md bg-gray-800 text-gray-400">
                            {currentConversation.company.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-white">{currentConversation.jobTitle}</h3>
                          <p className="text-sm text-gray-400">{currentConversation.company}</p>
                        </div>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-900 border-gray-700">
                          <DropdownMenuItem className="focus:bg-gray-800">
                            View Job Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="focus:bg-gray-800">
                            Mark as Unread
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-700" />
                          <DropdownMenuItem className="focus:bg-gray-800 text-red-400">
                            Archive Conversation
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {currentConversation.messages.map((message) => (
                          <div
                            key={message.id}
                            className={cn(
                              "flex",
                              message.sender === "you" ? "justify-end" : "justify-start"
                            )}
                          >
                            <div className={cn(
                              "max-w-[80%] rounded-lg p-3",
                              message.sender === "you"
                                ? "bg-blue-900/30 text-white"
                                : "bg-gray-800 text-white"
                            )}>
                              {message.sender === "recruiter" && (
                                <div className="flex items-center space-x-2 mb-1">
                                  <Avatar className="h-6 w-6 rounded-full">
                                    <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                                    <AvatarFallback className="bg-blue-800 text-blue-200">
                                      {message.senderName?.substring(0, 2)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm font-medium">{message.senderName}</span>
                                </div>
                              )}
                              
                              <div className="text-sm">{message.content}</div>
                              
                              {message.attachment && (
                                <div className="mt-2 p-2 rounded bg-gray-700/50 flex items-center space-x-2">
                                  {message.attachment.type === 'file' && <FileText className="h-4 w-4 text-blue-400" />}
                                  {message.attachment.type === 'image' && <Image className="h-4 w-4 text-blue-400" />}
                                  {message.attachment.type === 'calendar' && <Calendar className="h-4 w-4 text-blue-400" />}
                                  <span className="text-xs text-gray-300">{message.attachment.name}</span>
                                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-blue-400 hover:text-blue-300">
                                    View
                                  </Button>
                                </div>
                              )}
                              
                              <div className="flex items-center justify-end mt-1 space-x-1">
                                <span className="text-xs text-gray-500">
                                  {formatTimestamp(message.timestamp)}
                                </span>
                                {message.sender === "you" && (
                                  <CheckCheck className={cn(
                                    "h-3 w-3",
                                    message.read ? "text-blue-500" : "text-gray-500"
                                  )} />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                    
                    {/* Message Input */}
                    <div className="p-4 border-t border-gray-800">
                      <div className="flex items-end space-x-2">
                        <div className="flex-1">
                          <Textarea
                            placeholder="Type your message..."
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            className="min-h-[80px] bg-gray-800 border-gray-700 text-white resize-none focus:border-blue-700 focus:ring-blue-700/20"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                handleSendMessage()
                              }
                            }}
                          />
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-1">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-gray-400 hover:text-white"
                                    onClick={handleFileUpload}
                                  >
                                    <Paperclip className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Attach file</p>
                                </TooltipContent>
                              </Tooltip>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-gray-400 hover:text-white"
                                  >
                                    <Smile className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-gray-900 border-gray-700">
                                  <div className="grid grid-cols-6 gap-2 p-2">
                                    {["😊", "👍", "🙏", "💼", "📅", "🔍"].map((emoji) => (
                                      <Button
                                        key={emoji}
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => setMessageText(messageText + emoji)}
                                      >
                                        {emoji}
                                      </Button>
                                    ))}
                                  </div>
                                </DropdownMenuContent>
                              </DropdownMenu>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-gray-400 hover:text-white"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-gray-900 border-gray-700 w-64">
                                  <DropdownMenuLabel>Message Templates</DropdownMenuLabel>
                                  <DropdownMenuSeparator className="bg-gray-700" />
                                  {mockTemplates.map((template) => (
                                    <DropdownMenuItem
                                      key={template.id}
                                      className="focus:bg-gray-800"
                                      onClick={() => handleInsertTemplate(template.content)}
                                    >
                                      <div>
                                        <p className="text-sm font-medium text-white">{template.title}</p>
                                        <p className="text-xs text-gray-400 truncate">{template.content.substring(0, 40)}...</p>
                                      </div>
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            
                            <Button
                              type="button"
                              onClick={handleSendMessage}
                              disabled={!messageText.trim() || isLoading}
                              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                            >
                              {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <Send className="h-4 w-4 mr-2" />
                                  Send
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-4">
                    <div className="rounded-full bg-gray-800 p-4 mb-4">
                      <MessageSquare className="h-8 w-8 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-white">No conversation selected</h3>
                    <p className="text-sm text-gray-400 mt-2 max-w-md">
                      Select a conversation from the list to view messages or start a new conversation by applying to a job.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}

