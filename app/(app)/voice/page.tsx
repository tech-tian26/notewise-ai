"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mic, MicOff, Send, Volume2, Brain, User } from "lucide-react"
import { mockVoiceHistory } from "@/lib/mock-data"
import type { VoiceMessage } from "@/lib/types"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { speechToText, speakText } from "@/lib/azure-speech"
import ReactMarkdown from "react-markdown"


export default function VoicePage() {
  const [messages, setMessages] = useState<VoiceMessage[]>(mockVoiceHistory)
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(true)

  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!navigator.mediaDevices) {
        setSpeechSupported(false)
      }
    }
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [messages])

  async function toggleRecording() {
    try {
      setIsRecording(true)

      const text = await speechToText()

      setInput(text)

      setIsRecording(false)
    } catch (err) {
      setIsRecording(false)
      toast.error("Speech recognition failed")
    }
  }

  async function handleSend() {
    const question = input.trim()

    if (!question || isProcessing) return

    const userMessage: VoiceMessage = {
      id: `voice-${Date.now()}`,
      role: "user",
      content: question,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsProcessing(true)

    const res = await fetch("/api/voice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question })
    })

    const data = await res.json()
    const response = data.answer

    const assistantMessage: VoiceMessage = {
      id: `voice-${Date.now() + 1}`,
      role: "assistant",
      content: response ?? "",
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsProcessing(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }
  

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Voice Q&A
        </h2>
        <p className="text-sm text-muted-foreground">
          Ask questions about your notes using voice or text
        </p>
      </div>

      <Card className="flex flex-col min-h-[calc(100vh-120px)]">

        <ScrollArea ref={scrollRef} className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-4">

            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Mic className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Ask a question about your study materials
                </p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <Brain className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2.5",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  )}
                >
                  <div className="text-sm leading-relaxed whitespace-pre-line">
                    <div className="prose prose-invert max-w-none">
                      <ReactMarkdown>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </div>

                  {message.role === "assistant" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-1 h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                      onClick={() => speakText(message.content)}
                    >
                      <Volume2 className="mr-1 h-3 w-3" />
                      Listen
                    </Button>
                  )}
                </div>

                {message.role === "user" && (
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isProcessing && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <Brain className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>

                <div className="rounded-lg bg-muted px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

          </div>
        </ScrollArea>

        <CardContent className="border-t border-border py-2 px-4">
          <div className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 bg-background">

            {speechSupported && (
              <Button
                variant={isRecording ? "destructive" : "outline"}
                size="icon"
                className="h-9 w-9 shrink-0"
                onClick={toggleRecording}
              >
                {isRecording ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            )}

            <input
              placeholder={
                isRecording
                  ? "Listening..."
                  : "Type your question or use the mic..."
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isRecording}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />

            <Button
              size="icon"
              className="h-9 w-9 shrink-0"
              onClick={handleSend}
              disabled={!input.trim() || isProcessing}
            >
              <Send className="h-4 w-4" />
            </Button>

          </div>
        </CardContent>

      </Card>
    </div>
  )
}